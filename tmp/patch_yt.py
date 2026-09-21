with open('public/assets/index-D4DSCKUz.js', 'r', encoding='utf-8') as f:
    code = f.read()

# 1. Update ia(e)
target_ia = 'function ia(e){if(!e)return"";const s=String(e).trim();if(/^[\\w-]{11}$/.test(s))return s;try{const m=s.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|shorts\\/|live\\/))([\\w-]{11})/i)||s.match(/[?&]v=([\\w-]{11})/i);return m?m[1]:""}catch{return""}}'

new_ia = '''function ia(e){
  if(!e) return "";
  const s = String(e).trim();
  if(/^[\\w-]{11}$/.test(s)) return s;
  try {
    const m = s.match(/(?:youtu\\.be\\/|youtube\\.com\\/(?:embed\\/|v\\/|watch\\?v=|shorts\\/|live\\/|e\\/|user\\/[^\\/]+\\/u\\/\\d+\\/))([\\w-]{11})/i) || s.match(/[?&]v=([\\w-]{11})/i);
    if (m && m[1]) return m[1];
    const u = new URL(s.startsWith('http') ? s : 'https://' + s);
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\\//, '').slice(0, 11);
      if (/^[\\w-]{11}$/.test(id)) return id;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v && /^[\\w-]{11}$/.test(v)) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      for (const p of parts) {
        if (/^[\\w-]{11}$/.test(p)) return p;
      }
    }
    return "";
  } catch { return ""; }
}'''

if target_ia in code:
    code = code.replace(target_ia, new_ia, 1)
    print("Replaced ia successfully")
else:
    print("target_ia not found")

# 2. Update ca(e)
pos_ca = code.find('function ca(e){')
pos_ca_end = code.find('const a=document.createElement("div");', pos_ca)
target_ca_block = code[pos_ca:pos_ca_end]

new_ca_block = '''function ca(e){
  const t = document.createElement("article");
  t.className = "portal-media-card";
  const n = document.createElement("div");
  n.className = "portal-media-visual";
  const o = Qn(e), isFb = _isFacebookVideo(e.url), isTikTok = _isTikTokVideo(e.url);
  if (o === "image") {
    const u = document.createElement("img");
    u.src = mt(e.url);
    u.alt = e.title || "ภาพพระธาตุพนม";
    u.loading = "lazy";
    u.decoding = "async";
    const l = document.createElement("button");
    l.type = "button";
    l.setAttribute("aria-label", `ขยายภาพ ${e.title || "พระธาตุพนม"}`);
    l.append(u);
    l.addEventListener("click", () => da(e));
    n.append(l);
  } else if (isFb) {
    n.style.aspectRatio = "16/9";
    n.style.maxHeight = "260px";
    n.style.overflow = "hidden";
    const ifr = document.createElement("iframe");
    ifr.src = _getFacebookEmbedUrl(e.url);
    ifr.title = e.title || "วิดีโอ Facebook พระธาตุพนม";
    ifr.loading = "lazy";
    ifr.allow = "autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen";
    ifr.allowFullscreen = true;
    ifr.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;";
    n.append(ifr);
  } else if (isTikTok) {
    n.style.aspectRatio = "9/16";
    n.style.maxHeight = "360px";
    n.style.overflow = "hidden";
    const ifr = document.createElement("iframe");
    ifr.src = _getTikTokEmbedUrl(e.url);
    ifr.title = e.title || "วิดีโอ TikTok พระธาตุพนม";
    ifr.loading = "lazy";
    ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
    ifr.allowFullscreen = true;
    ifr.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;";
    n.append(ifr);
  } else {
    n.style.aspectRatio = "16/9";
    const u = ia(e.url), l = Yn(e.url);
    if (u) {
      const btn = document.createElement("button");
      btn.type = "button";
      btn.className = "portal-yt-trigger";
      btn.setAttribute("aria-label", `เล่นวิดีโอ YouTube ${e.title || "พระธาตุพนม"}`);
      btn.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;padding:0;border:none;background:#110d1d;cursor:pointer;display:block;overflow:hidden;";
      
      const d = document.createElement("img");
      d.src = `https://i.ytimg.com/vi/${encodeURIComponent(u)}/hqdefault.jpg`;
      d.alt = e.title || "วิดีโอ YouTube พระธาตุพนม";
      d.loading = "lazy";
      d.style.cssText = "width:100%;height:100%;object-fit:cover;display:block;";
      d.onerror = () => {
        d.onerror = () => {
          d.onerror = null;
          d.src = `https://img.youtube.com/vi/${encodeURIComponent(u)}/default.jpg`;
        };
        d.src = `https://img.youtube.com/vi/${encodeURIComponent(u)}/0.jpg`;
      };
      
      const h = document.createElement("span");
      h.className = "portal-play-icon";
      h.textContent = "▶";
      btn.append(d, h);
      
      btn.addEventListener("click", () => {
        n.replaceChildren();
        const ifr = document.createElement("iframe");
        ifr.src = `https://www.youtube.com/embed/${encodeURIComponent(u)}?autoplay=1&rel=0&playsinline=1&enablejsapi=1`;
        ifr.title = e.title || "วิดีโอ YouTube พระธาตุพนม";
        ifr.loading = "lazy";
        ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
        ifr.allowFullscreen = true;
        ifr.referrerPolicy = "strict-origin-when-cross-origin";
        ifr.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;";
        
        const fallbackBar = document.createElement("div");
        fallbackBar.style.cssText = "position:absolute;bottom:0;left:0;right:0;background:rgba(0,0,0,0.85);padding:5px 10px;display:flex;justify-content:space-between;align-items:center;font-size:0.75rem;color:#f6e6b4;z-index:5;";
        fallbackBar.innerHTML = `<span>▶ YouTube</span><a href="https://www.youtube.com/watch?v=${encodeURIComponent(u)}" target="_blank" rel="noopener noreferrer" style="color:#ffd57e;text-decoration:underline;">เปิดใน YouTube ↗</a>`;
        
        n.append(ifr, fallbackBar);
      });
      n.append(btn);
    } else {
      const m = document.createElement("a");
      m.href = H(e.url) || "#";
      m.target = "_blank";
      m.rel = "noopener noreferrer";
      m.setAttribute("aria-label", `เปิดวิดีโอ ${e.title || "พระธาตุพนม"}`);
      if (l) {
        const d = document.createElement("img");
        d.src = mt(e.url);
        d.alt = "";
        d.loading = "lazy";
        m.append(d);
      } else if (/\\.(mp4|webm)(\\?|$)/i.test(e.url || "")) {
        const d = document.createElement("video");
        d.src = H(e.url);
        d.preload = "metadata";
        d.muted = true;
        m.append(d);
      }
      const h = document.createElement("span");
      h.className = "portal-play-icon";
      h.textContent = "▶";
      m.append(h);
      n.append(m);
    }
  }
'''

if len(target_ca_block) > 0:
    code = code.replace(target_ca_block, new_ca_block, 1)
    print("Replaced ca block successfully")
else:
    print("target_ca_block empty")

with open('public/assets/index-D4DSCKUz.js', 'w', encoding='utf-8') as f:
    f.write(code)

print("Finished successfully")
