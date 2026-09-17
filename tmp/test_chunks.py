import os

def check_chunks():
    with open('public/assets/index-D4DSCKUz.js', 'r', encoding='utf-8') as f:
        js = f.read()

    # 1. Slider: YouTube direct button
    idx1 = js.find(';const ytd=document.createElement("a");ytd.href=`https://www.youtube.com/watch?v=')
    end1 = js.find('h.append(ytd)', idx1) + len('h.append(ytd)')
    c_ytd = js[idx1:end1]

    # 2. Slider: Expand button
    idx2 = js.find(';const expBtn=document.createElement("button");expBtn.type="button",expBtn.className="slide-expand-btn"')
    end2 = js.find('h.append(expBtn)', idx2) + len('h.append(expBtn)')
    c_exp = js[idx2:end2]

    # 3. Slider: Facebook direct button
    idx3 = js.find(';const fbd=document.createElement("a");fbd.href=l.url,fbd.target="_blank"')
    end3 = js.find('h.append(fbd)', idx3) + len('h.append(fbd)')
    c_fbd = js[idx3:end3]

    # 4. Portal-media-card: YouTube
    idx4 = js.find('btnWrap.append(expBtn,yl),a.append(btnWrap)')
    start4 = js.rfind('const btnWrap=', 0, idx4)
    end4 = idx4 + len('btnWrap.append(expBtn,yl),a.append(btnWrap)')
    c_p_yt = js[start4:end4]

    # 5. Portal-media-card: Facebook
    idx5 = js.find('btnWrap.append(expBtn,fbl),a.append(btnWrap)')
    start5 = js.rfind('const btnWrap=', 0, idx5)
    end5 = idx5 + len('btnWrap.append(expBtn,fbl),a.append(btnWrap)')
    c_p_fb = js[start5:end5]

    # 6. Video section: YouTube
    idx6 = js.find('if(u){const ytl=document.createElement("a");ytl.href="https://www.youtube.com/watch?v="+encodeURIComponent(u);')
    end6 = js.find('a.append(ytl)}', idx6) + len('a.append(ytl)}')
    c_v_yt = js[idx6:end6]

    # 7. Video section: Facebook
    idx7 = js.find('else if(fb){const fbl=document.createElement("a");fbl.href=o.url;fbl.target="_blank";')
    end7 = js.find('a.append(fbl)}', idx7) + len('a.append(fbl)}')
    c_v_fb = js[idx7:end7]

    # 8. renderMediaVisual: YouTube
    idx8 = js.find('const ytl=document.createElement("a");ytl.href="https://www.youtube.com/watch?v="+encodeURIComponent(ytId);')
    end8 = js.find('wrap.appendChild(ytl)}', idx8) + len('wrap.appendChild(ytl)}')
    c_m_yt = js[idx8:end8]

    # 9. renderMediaVisual: Facebook
    idx9 = js.find('const fbl=document.createElement("a");fbl.href=url;fbl.target="_blank";')
    end9 = js.find('wrap.appendChild(fbl)}', idx9) + len('wrap.appendChild(fbl)}')
    c_m_fb = js[idx9:end9]

    # 10. Lightbox: Facebook
    idx10 = js.find('if(origLink){origLink.href=e.url;origLink.innerHTML=\'<svg viewBox="0 0 24 24" width="16" height="16"')
    end10 = js.find('เปิดดูบน Facebook ↗\'}}', idx10) + len('เปิดดูบน Facebook ↗\'}}')
    c_lb_fb = js[idx10:end10]

    # 11. Lightbox: YouTube
    idx11 = js.find('if(origLink){origLink.href=`https://www.youtube.com/watch?v=${encodeURIComponent(isYt)}`;origLink.innerHTML="▶ เปิดดูบน YouTube ↗"}')
    end11 = idx11 + len('if(origLink){origLink.href=`https://www.youtube.com/watch?v=${encodeURIComponent(isYt)}`;origLink.innerHTML="▶ เปิดดูบน YouTube ↗"}')
    c_lb_yt = js[idx11:end11]

    chunks = [
        ('Slider YouTube btn', c_ytd),
        ('Slider Expand btn', c_exp),
        ('Slider Facebook btn', c_fbd),
        ('Portal YouTube btn', c_p_yt),
        ('Portal Facebook btn', c_p_fb),
        ('Video section YouTube btn', c_v_yt),
        ('Video section Facebook btn', c_v_fb),
        ('renderMediaVisual YouTube btn', c_m_yt),
        ('renderMediaVisual Facebook btn', c_m_fb),
        ('Lightbox Facebook btn', c_lb_fb),
        ('Lightbox YouTube btn', c_lb_yt)
    ]

    for name, c in chunks:
        print(f'{name}: len={len(c)}, found={c in js}')

if __name__ == '__main__':
    check_chunks()
