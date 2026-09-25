// @ts-nocheck
import { defineConfig, Plugin } from 'vite';
import https from 'node:https';

function driveAlbumPlugin(): Plugin {
  return {
    name: 'drive-album-api',
    configureServer(server) {
      server.middlewares.use('/api/drive-album', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const folderId = url.searchParams.get('folderId') || '1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU';
        try {
          const files = await fetchGoogleDriveFolderFiles(folderId);
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=60');
          res.end(JSON.stringify({ success: true, folderId, count: files.length, files }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ success: false, error: String(error) }));
        }
      });
    },
    configurePreviewServer(server) {
      server.middlewares.use('/api/drive-album', async (req, res) => {
        const url = new URL(req.url || '', `http://${req.headers.host || 'localhost'}`);
        const folderId = url.searchParams.get('folderId') || '1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU';
        try {
          const files = await fetchGoogleDriveFolderFiles(folderId);
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.setHeader('Cache-Control', 'public, max-age=60');
          res.end(JSON.stringify({ success: true, folderId, count: files.length, files }));
        } catch (error) {
          res.statusCode = 500;
          res.setHeader('Content-Type', 'application/json; charset=utf-8');
          res.end(JSON.stringify({ success: false, error: String(error) }));
        }
      });
    }
  };
}

async function fetchGoogleDriveFolderFiles(folderId: string): Promise<any[]> {
  const foldersToScan = [folderId || '1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU'];
  // Also ensure our known subfolder is in the scan list if parent folder is given
  if (foldersToScan[0] === '1GNmlzvw4LOnykU28T6x7TkxKUNKR-07N') {
    foldersToScan.push('1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU');
  }
  const scanned = new Set<string>();
  const files: any[] = [];
  const seenFileIds = new Set<string>();

  while (foldersToScan.length > 0) {
    const currentId = foldersToScan.shift();
    if (!currentId || scanned.has(currentId)) continue;
    scanned.add(currentId);

    try {
      const html = await new Promise<string>((resolve, reject) => {
        https.get(`https://drive.google.com/drive/folders/${currentId}`, {
          headers: { 'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64)' }
        }, (res) => {
          let data = '';
          res.on('data', chunk => data += chunk);
          res.on('end', () => resolve(data));
        }).on('error', reject);
      });

      const ivdMatch = html.match(/window\x5b\x27_DRIVE_ivd\x27\x5d\s*=\s*\x27([^\x27]+)\x27/);
      if (ivdMatch) {
        const unescaped = ivdMatch[1].replace(/\\x([0-9A-Fa-f]{2})/g, (_, hex) => String.fromCharCode(parseInt(hex, 16)));
        try {
          const parsed = JSON.parse(unescaped);
          if (Array.isArray(parsed) && Array.isArray(parsed[0])) {
            for (const item of parsed[0]) {
              if (!Array.isArray(item) || !item[0] || !item[2] || !item[3]) continue;
              const id = item[0];
              const name = item[2];
              const mimeType = item[3];

              // Nested subfolder detection
              if (mimeType === 'application/vnd.google-apps.folder') {
                if (name.includes('อัลบั้ม') || name.includes('ผู้ร่วมบุญ') || name === 'อัลบั้มรูปภาพผู้ร่วมบุญ') {
                  foldersToScan.push(id);
                }
              } else if (mimeType.startsWith('image/')) {
                if (seenFileIds.has(id)) continue;
                seenFileIds.add(id);

                const cleanTitle = name.replace(/\.[^.]+$/, '').replace(/^\s*\d{1,6}(?:[\s._-]+)+/, '').trim();
                const title = cleanTitle ? (cleanTitle === 'merit' ? 'ภาพผู้ร่วมบุญ ' + name.replace(/\.[^.]+$/, '') : cleanTitle) : name.replace(/\.[^.]+$/, '');
                const uploadedTime = Number(item[9]) || Number(item[10]) || 0;
                files.push({
                  id: 'drive_' + id,
                  driveFileId: id,
                  name,
                  title,
                  uploadedTime,
                  createdTime: item[9] ? new Date(item[9]).toISOString() : undefined,
                  modifiedTime: item[10] ? new Date(item[10]).toISOString() : undefined,
                  url: `https://lh3.googleusercontent.com/d/${id}`,
                  fallbackUrl: `https://drive.google.com/thumbnail?id=${id}&sz=w1600`,
                  thumbnailUrl: `https://lh3.googleusercontent.com/d/${id}=w800`,
                  webViewLink: `https://drive.google.com/file/d/${id}/view`,
                  mimeType,
                  size: item[13] || 0,
                  section: 'muchalinda',
                  placement: 'album',
                  driveFolderName: 'อัลบั้มรูปภาพผู้ร่วมบุญ',
                  source: 'google-drive',
                  enabled: true,
                  published: true
                });
              }
            }
          }
        } catch (e) {
          console.error('Failed to parse Google Drive folder items:', e);
        }
      }
    } catch (e) {
      console.error('Error fetching drive folder:', currentId, e);
    }
  }

  // Sort files by upload time on Google Drive (latest upload first: newest date & time at the beginning on the left)
  files.sort((a, b) => {
    const timeA = Number(a.uploadedTime) || (a.createdTime ? new Date(a.createdTime).getTime() : 0);
    const timeB = Number(b.uploadedTime) || (b.createdTime ? new Date(b.createdTime).getTime() : 0);
    if (timeA !== timeB) return timeB - timeA;
    return String(b.name || '').localeCompare(String(a.name || ''), 'th', { numeric: true });
  });
  return files;
}

export default defineConfig({
  plugins: [driveAlbumPlugin()],
  server: {
    host: '0.0.0.0',
    port: 3000,
    strictPort: false,
    hmr: false,
  },
  preview: {
    host: '0.0.0.0',
    port: 3000,
  },
  build: {
    outDir: 'dist',
    emptyOutDir: true,
  },
});

