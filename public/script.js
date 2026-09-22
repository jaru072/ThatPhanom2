// Circular-safe JSON.stringify guard
(function() {
  if (window.__jsonSafeInstalled) return;
  window.__jsonSafeInstalled = true;
  const _orig = JSON.stringify;
  JSON.stringify = function(val, replacer, space) {
    const seen = new WeakSet();
    const safeReplacer = function(k, v) {
      if (v !== null && typeof v === "object") {
        if (typeof v.toDate === "function") {
          try { return v.toDate().toISOString(); } catch (_) {}
        }
        if (typeof v.path === "string" && v.firestore) return v.path;
        if (seen.has(v)) return undefined;
        seen.add(v);
      }
      if (typeof replacer === "function") return replacer.call(this, k, v);
      return v;
    };
    try {
      if (Array.isArray(replacer)) return _orig(val, replacer, space);
      return _orig(val, safeReplacer, space);
    } catch (_) {
      try {
        const seen2 = new WeakSet();
        return _orig(val, (k, v) => {
          if (v !== null && typeof v === "object") {
            if (seen2.has(v)) return undefined;
            seen2.add(v);
          }
          return v;
        }, space);
      } catch (__) {
        return "{}";
      }
    }
  };
})();

// Internationalization & Language Switcher
const I18N_TH = {
  "trialLabel": "",
  "brand": "พระธาตุพนม สู่มรดกโลก",
  "searchAction": "ค้นหา",
  "navHome": "หน้าหลัก",
  "navHistory": "เรื่องราว",
  "navWorld": "สู่มรดกโลก",
  "navResources": "โครงการ",
  "navMilestones": "หมุดหมายสำคัญ",
  "navVideos": "วิดีโอ",
  "navCommunity": "ชุมชน",
  "photo": "ภาพพระธาตุพนม",
  "eyebrow": "ศรัทธาแห่งลุ่มน้ำโขง · มรดกของมวลมนุษยชาติ",
  "title": "พระธาตุพนม สู่มรดกโลก",
  "lead": "ร่วมสืบสานปูชนียสถานอันเป็นศูนย์รวมศรัทธาของผู้คนไทย–ลาว และชุมชนลุ่มน้ำโขง ให้คงคุณค่าทั้งกายภาพและจิตวิญญาณสู่คนรุ่นต่อไป",
  "learn": "เรียนรู้เส้นทางมรดกโลก",
  "watch": "ชมเรื่องราว",
  "commentPrompt": "ร่วมแบ่งปันความประทับใจหรือข้อเสนอแนะ...",
  "commentAction": "แสดงความคิดเห็น",
  "projectsKicker": "โครงการเพื่อพระธาตุพนม",
  "projectsTitle": "โครงการทั้งหมด",
  "projectsIntro": "เลือกโครงการเพื่อดูรายละเอียด กิจกรรม สื่อ เอกสาร และช่องทางร่วมบุญของแต่ละโครงการ",
  "muchalindaHome": "หน้าหลัก",
  "supportingProjects": "โครงการสนับสนุน",
  "muchalindaShort": "บูรณะสระมุจลินท์",
  "supportingWorldHeritage": "โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก",
  "muchalindaTitle": "โครงการบูรณะสระมุจลินท์ (สระพังทอง)",
  "muchalindaLead": "พลิกฟื้นแหล่งน้ำศักดิ์สิทธิ์อายุกว่า 1,000 ปี เพื่ออนุรักษ์ภูมิทัศน์ประวัติศาสตร์และสนับสนุนเส้นทางพระธาตุพนมสู่มรดกโลก",
  "projectInProgress": "กำลังดำเนินงาน",
  "projectOverview": "ภาพรวม",
  "projectHistory": "ความเป็นมา",
  "projectObjectives": "วัตถุประสงค์",
  "projectProgress": "ความคืบหน้า",
  "projectDonation": "ร่วมบุญ",
  "muchalindaConceptCaption": "ภาพประกอบแนวคิด ไม่ใช่ภาพบันทึกสภาพปัจจุบัน",
  "projectHistoryKicker": "กว่า 1,000 ปีแห่งศรัทธา",
  "muchalindaHistoryTitle": "ความเป็นมาและความสำคัญ",
  "muchalindaHistoryText": "ตามตำนานอุรังคธาตุ สระมุจลินท์ หรือสระพังทอง ขุดขึ้นเพื่อนำดินไปทำอิฐสร้างองค์พระธาตุพนม และเป็นแหล่งน้ำศักดิ์สิทธิ์ของชุมชนสองฝั่งโขงสืบเนื่องมาอย่างยาวนาน",
  "muchalindaRestorationKicker": "พ.ศ. 2568 เป็นต้นไป",
  "muchalindaRestorationTitle": "การฟื้นฟูและอนุรักษ์ภูมิทัศน์",
  "muchalindaRestorationText": "ฟื้นฟูระบบน้ำ ปรับปรุงภูมิทัศน์โดยรอบให้ร่มรื่น และประดิษฐานพระพุทธอุรังคธาตุพนมนาคา มหาจักรีสิรินธร ณ เกาะกลางสระ เพื่อสืบสานพุทธศรัทธาและรองรับผู้มาเยือนจากทั่วโลก",
  "muchalindaSlide2Title": "สระน้ำศักดิ์สิทธิ์และดินอิฐพันปีแห่งภูกำพร้า",
  "muchalindaSlide2Text": "ตามตำนานอุรังคธาตุ ชุมชนโบราณขุดสระเพื่อนำดินไปทำอิฐสร้างและบูรณะองค์พระธาตุพนม ต่อเนื่องเป็นแหล่งน้ำศักดิ์สิทธิ์คู่สองฝั่งโขง",
  "projectFacts": "ข้อมูลโครงการ",
  "projectLocationLabel": "สถานที่",
  "projectLocation": "วัดพระธาตุพนมวรมหาวิหาร จังหวัดนครพนม",
  "projectStartLabel": "เริ่มดำเนินการ",
  "projectStart": "1 พฤษภาคม 2568",
  "projectPurposeLabel": "ความเชื่อมโยง",
  "projectPurpose": "อนุรักษ์ภูมิทัศน์และคุณค่าที่เกี่ยวเนื่องกับพระธาตุพนม",
  "projectObjectivesKicker": "เป้าหมายของการบูรณะ",
  "projectObjectivesTitle": "อนุรักษ์พื้นที่ศักดิ์สิทธิ์ให้มีชีวิตต่อไป",
  "objectiveOneTitle": "อนุรักษ์มรดก",
  "objectiveOneText": "ฟื้นฟูสระโบราณ ระบบน้ำ และภูมิทัศน์โดยรอบอย่างเหมาะสม",
  "objectiveTwoTitle": "สร้างแหล่งเรียนรู้",
  "objectiveTwoText": "ถ่ายทอดเรื่องราวพระพุทธศาสนา ประวัติศาสตร์ และวัฒนธรรมแก่เยาวชน",
  "objectiveThreeTitle": "สืบสานพุทธศรัทธา",
  "objectiveThreeText": "ประดิษฐานพระพุทธอุรังคธาตุพนมนาคา มหาจักรีสิรินธร ณ เกาะกลางสระ",
  "projectProgressKicker": "ลำดับการดำเนินงาน",
  "projectProgressTitle": "จากการเริ่มบูรณะสู่ภูมิทัศน์แห่งศรัทธา",
  "projectTimeOne": "1 พ.ค. 2568",
  "projectTimeOneTitle": "เริ่มงานบูรณะ",
  "projectTimeOneText": "ปรับปรุงระบบน้ำ ระบายน้ำ และเตรียมโครงสร้างพื้นฐาน",
  "projectTimeTwo": "14 ก.ย. 2568",
  "projectTimeTwoTitle": "พิธีบวงสรวง",
  "projectTimeTwoText": "เปิดโครงการอย่างเป็นทางการด้วยความร่วมมือจากทุกภาคส่วน",
  "projectTimeThree": "มิ.ย. 2569",
  "projectTimeThreeTitle": "ปรับภูมิทัศน์สีเขียว",
  "projectTimeThreeText": "ปลูกต้นไม้และเพิ่มความร่มรื่นรอบสระมุจลินท์",
  "projectTimeFour": "ปัจจุบัน",
  "projectTimeFourTitle": "ดำเนินงานต่อเนื่อง",
  "projectTimeFourText": "ก่อสร้าง ตกแต่งสถาปัตยกรรม และเตรียมพื้นที่โดยรอบ",
  "projectDonationKicker": "ร่วมเป็นส่วนหนึ่งของการอนุรักษ์",
  "projectDonationTitle": "ร่วมบุญกับโครงการ",
  "projectDonationText": "เลือกดูรายละเอียดบัญชีตามวัตถุประสงค์ของการร่วมบุญ และโปรดตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง",
  "projectDonationSafety": "ไม่มี QR Code บนเว็บไซต์ เพื่อให้ผู้ร่วมบุญตรวจสอบเลขบัญชีและชื่อบัญชีจากภาพต้นฉบับได้อย่างชัดเจน",
  "backToWorldHeritage": "← กลับสู่โครงการพระธาตุพนม สู่มรดกโลก",
  "projectSource": "ตรวจสอบข้อมูลจากสำนักงานประชาสัมพันธ์จังหวัดนครพนม ↗",
  "statusLabel": "สถานะปัจจุบัน",
  "statusTitle": "อยู่ในบัญชีรายชื่อเบื้องต้นของศูนย์มรดกโลก",
  "statusText": "ประเทศไทยเสนอเมื่อ 2 กุมภาพันธ์ 2560 ในประเภทมรดกทางวัฒนธรรม ตามเกณฑ์ (i), (ii) และ (vi) ปัจจุบันยังอยู่ในกระบวนการเตรียมความพร้อมเพื่อเสนอขึ้นทะเบียน",
  "unesco": "ตรวจสอบกับ UNESCO ↗",
  "storyKicker": "เรื่องราวแห่งศรัทธา",
  "storyTitle": "พระธาตุที่มีชีวิตของคนสองฝั่งโขง",
  "storyIntro": "พระธาตุพนมมิใช่เพียงโบราณสถาน หากเป็นพื้นที่ศักดิ์สิทธิ์ที่ศรัทธา ประวัติศาสตร์ ศิลปกรรม และวิถีชุมชนดำเนินต่อเนื่องร่วมกันมาอย่างยาวนาน",
  "faithTitle": "พระอุรังคธาตุและความเชื่อ",
  "faithText": "ตามตำนานอุรังคธาตุ เชื่อว่าพระมหากัสสปะได้นำพระอุรังคธาตุ หรือพระบรมสารีริกธาตุส่วนพระอุระ มาประดิษฐาน ณ ภูกำพร้า พระธาตุพนมจึงเป็นตัวแทนแห่งองค์พระสัมมาสัมพุทธเจ้าในใจของพุทธศาสนิกชน",
  "artTitle": "ร่องรอยศิลปกรรม",
  "artText": "หลักฐานทางโบราณคดีชี้ถึงโครงสร้างอิฐชั้นในราวพุทธศตวรรษที่ 12–13 และการสืบต่อรูปแบบศิลปกรรมหลายยุค จนก่อเกิดอัตลักษณ์เฉพาะของลุ่มน้ำโขง",
  "peopleTitle": "ศูนย์รวมผู้คน",
  "peopleText": "ผู้คนหลากหลายชาติพันธุ์จากไทย ลาว และภูมิภาคใกล้เคียงร่วมสักการะ บูรณะ และสืบทอดประเพณี ทำให้พระธาตุพนมเป็นสายใยทางวัฒนธรรมที่ข้ามพรมแดน",
  "timelineKicker": "หมุดหมายสำคัญ",
  "timelineTitle": "อดีตที่หล่อหลอมอนาคต",
  "t1time": "ราวพุทธศตวรรษที่ 12–13",
  "t1title": "โครงสร้างยุคแรก",
  "t1text": "หลักฐานจากการขุดค้นระบุอายุห้องอิฐชั้นในราวคริสต์ศตวรรษที่ 7–8",
  "t2title": "โบราณสถานของชาติ",
  "t2text": "กรมศิลปากรประกาศขึ้นทะเบียนเพื่อการอนุรักษ์และคุ้มครอง",
  "t3title": "ล้มและฟื้นคืน",
  "t3text": "องค์พระธาตุล้มจากพายุฝน ก่อนบูรณะด้วยความร่วมแรงร่วมใจจากทั่วประเทศและภูมิภาค",
  "t4title": "ก้าวสู่เวทีโลก",
  "t4text": "ได้รับการบรรจุในบัญชีรายชื่อเบื้องต้น ภายใต้ชื่อ Phra That Phanom, its related historic buildings and associated landscape",
  "criteriaKicker": "คุณค่าโดดเด่นเป็นสากล",
  "criteriaTitle": "เหตุใดพระธาตุพนมจึงควรเป็นมรดกโลก",
  "criteriaIntro": "ข้อเสนอในบัญชีเบื้องต้นของ UNESCO ระบุคุณค่าตามเกณฑ์ทางวัฒนธรรม 3 ข้อ ซึ่งสะท้อนทั้งฝีมือมนุษย์ การแลกเปลี่ยนทางวัฒนธรรม และความเชื่อที่ยังมีชีวิต",
  "c1title": "ผลงานสร้างสรรค์อันเป็นเลิศ",
  "c1text": "สถาปัตยกรรมพุทธศิลป์ที่ผสานรากศิลปะโบราณกับจิตวิญญาณและงานช่างแห่งลุ่มน้ำโขงอย่างมีเอกลักษณ์",
  "c2title": "การแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",
  "c2text": "วิวัฒนาการยาวนานของรูปแบบพระธาตุ แสดงการพบกันของความเชื่อท้องถิ่นกับพุทธศาสนา และส่งอิทธิพลต่อศิลปกรรมอีสาน",
  "c3title": "สัมพันธ์กับความเชื่อที่ยังดำรงอยู่",
  "c3text": "เชื่อมโยงโดยตรงกับการบูชาพระบรมสารีริกธาตุ ตำนานอุรังคธาตุ และประเพณีศักดิ์สิทธิ์ที่ชุมชนยังสืบทอด",
  "processTitle": "งานที่ต้องทำร่วมกัน",
  "processKicker": "จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน",
  "processText": "การขึ้นทะเบียนไม่ใช่เพียงการยอมรับชื่อเสียง แต่คือคำมั่นที่จะอนุรักษ์คุณค่าเดิม วางระบบบริหารจัดการ และเปิดพื้นที่ให้ทุกภาคส่วนมีส่วนร่วมอย่างแท้จริง",
  "s1title": "กำหนดคุณค่าและขอบเขต",
  "s1text": "ศึกษาองค์ประกอบสำคัญ พื้นที่หลัก และพื้นที่กันชน",
  "s2title": "จัดทำแผนอนุรักษ์และบริหาร",
  "s2text": "คุ้มครองโบราณสถาน ภูมิทัศน์ ประเพณี และวิถีชุมชนอย่างสมดุล",
  "s3title": "สร้างการมีส่วนร่วม",
  "s3text": "คณะสงฆ์ ชุมชน นักวิชาการ ภาครัฐ ภาคเอกชน และเยาวชนร่วมกำหนดอนาคต",
  "s4title": "จัดทำเอกสารเสนอชื่อ",
  "s4text": "รวบรวมหลักฐานและแผนงานเป็น Nomination Dossier เพื่อเข้าสู่การพิจารณาตามกระบวนการ UNESCO",
  "quote": "มรดกโลกเริ่มต้นจากการที่คนในพื้นที่เห็นคุณค่า ร่วมกันดูแล และส่งต่อศรัทธาอย่างรู้เท่าทันการเปลี่ยนแปลง",
  "videosKicker": "เสียงจากผู้คนและชุมชน",
  "videosTitle": "ชมเรื่องราวพระธาตุพนม",
  "videosIntro": "สารคดีสั้น ข่าว และบทเพลงที่ถ่ายทอดคุณค่าทั้งด้านประวัติศาสตร์ ศรัทธา และพลังของผู้คนสองฝั่งโขง",
  "report": "รายงานข่าว",
  "v1": "ผลักดัน “พระธาตุพนม” สู่มรดกโลก",
  "shortDoc": "สารคดีสั้น",
  "v2": "พระธาตุพนม สู่มรดกโลก",
  "song": "บทเพลงไทย–ลาว",
  "v3": "พระธาตุพนม สู่มรดกโลก (ພະທາດພະນົມສູ່ມໍລະດົກໂລກ)",
  "resourcesKicker": "ศูนย์รวมข้อมูลโครงการ",
  "resourcesTitle": "ติดตาม เรียนรู้ และร่วมสืบสาน",
  "resourcesIntro": "รวมสื่อ ข่าวกิจกรรม เอกสารเผยแพร่ และช่องทางร่วมบุญของโครงการไว้ในพื้นที่เดียว",
  "mediaLibrary": "คลังสื่อทั้งหมด",
  "newsEvents": "ข่าวและกิจกรรม",
  "documents": "เอกสาร",
  "donation": "ร่วมบุญ",
  "mediaKicker": "ภาพและวิดีโอ",
  "mediaTitle": "คลังสื่อทั้งหมด",
  "mediaIntro": "รวบรวมสื่อจากทุกหัวข้อของโครงการ ค้นดูเรื่องราวผ่านภาพและวิดีโอได้จากที่เดียว",
  "newsKicker": "ความเคลื่อนไหว",
  "newsTitle": "ข่าวและกิจกรรม",
  "newsIntro": "ติดตามข่าวสาร กิจกรรม และความร่วมมือที่ขับเคลื่อนโครงการ",
  "documentsKicker": "องค์ความรู้และหลักฐาน",
  "documentsTitle": "เอกสารเผยแพร่",
  "documentsIntro": "เอกสารอ้างอิง รายงาน และข้อมูลสำหรับศึกษาเส้นทางสู่มรดกโลก",
  "donationKicker": "ร่วมสืบสานอย่างโปร่งใส",
  "donationTitle": "ร่วมบุญกับโครงการ",
  "donationIntro": "ช่องทางสนับสนุนจะระบุวัตถุประสงค์ ผู้รับผิดชอบ และรายละเอียดที่ตรวจสอบได้อย่างชัดเจน",
  "shareKicker": "ร่วมเป็นส่วนหนึ่งของการสืบสาน",
  "shareTitle": "เรียนรู้คุณค่า เคารพพื้นที่ และบอกต่ออย่างถูกต้อง",
  "share": "แบ่งปันเว็บไซต์",
  "currentProject": "โครงการปัจจุบัน",
  "currentProjectText": "ร่วมอนุรักษ์คุณค่าทางกายภาพและจิตวิญญาณของศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",
  "viewAllProjects": "ดูโครงการทั้งหมด",
  "quickAccess": "เข้าถึงอย่างรวดเร็ว",
  "supportHeritage": "ร่วมสืบสานมรดกแห่งศรัทธา",
  "supportHeritageDesc": "ร่วมทำบุญสมทบทุนเพื่อบูรณะและผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลก",
  "donationDetails": "ดูรายละเอียด",
  "railFootnote": "ข้อมูลสำหรับการศึกษาและร่วมสืบสานคุณค่าพระธาตุพนม สู่มรดกโลก",
  "footerSub": "องค์ความรู้เพื่อศรัทธาและการอนุรักษ์อย่างยั่งยืน",
  "sources": "แหล่งข้อมูล",
  "note": "เว็บไซต์นี้สรุปและเรียบเรียงจากแหล่งข้อมูลที่ระบุ เพื่อเผยแพร่ความรู้ ไม่ใช่เว็บไซต์อย่างเป็นทางการของ UNESCO",
  "sidebarProjectsTitle": "โครงการทั้งหมด",
  "accountLoginBtn": "เข้าสู่ระบบ",
  "trialBrand": "พระธาตุพนม สู่มรดกโลก",
  "menuAndManagement": "เมนูและการจัดการ",
  "avatarVisitor": "ผู้เยี่ยมชม",
  "notLoggedIn": "ยังไม่ได้เข้าสู่ระบบ",
  "roleGuest": "บุคคลทั่วไป",
  "loginWithGoogle": "เข้าสู่ระบบด้วย Google",
  "projectMapMenu": "ผังโครงการ",
  "siteStatusMenu": "สถานะการเผยแพร่",
  "backupRestoreMenu": "สำรองและกู้คืนข้อมูล",
  "chatWithAdminMenu": "แชทกับผู้ดูแล",
  "loginNote": "ทุกคนเข้าชมเว็บไซต์ได้โดยไม่ต้องเข้าสู่ระบบ การเข้าสู่ระบบใช้สำหรับจัดการเนื้อหา แสดงความคิดเห็น และแชทเท่านั้น",
  "loadingCatalog": "กำลังเตรียมข้อมูล...",
  "manageProjectsBtn": "จัดการโครงการ",
  "emptyProjects": "กำลังเตรียมรายการโครงการ...",
  "driveVideoTitle": "วิดีโอล่าสุดจากคลังสื่อโครงการ",
  "driveVideoSubtitle": "รายการนี้อัปเดตอัตโนมัติจากโฟลเดอร์ Videos ใน Google Drive",
  "filterAll": "ทั้งหมด",
  "filterImages": "รูปภาพ",
  "filterVideos": "วิดีโอ",
  "emptyMedia": "กำลังเตรียมคลังสื่อ...",
  "emptyNews": "ยังไม่มีข่าวหรือกิจกรรมที่เผยแพร่",
  "emptyDocs": "ยังไม่มีเอกสารที่เผยแพร่",
  "emptyDonation": "ยังไม่มีช่องทางร่วมบุญที่เผยแพร่",
  "communityKicker": "เสียงจากชุมชน",
  "communityTitle": "ความคิดเห็นและกำลังใจ",
  "communitySubtitle": "ร่วมแบ่งปันความประทับใจ ข้อเสนอแนะ และพลังสนับสนุนการอนุรักษ์พระธาตุพนม",
  "commentFormLabel": "แสดงความคิดเห็น",
  "commentAboutLabel": "เกี่ยวกับ",
  "commentOptStory": "เรื่องราวแห่งศรัทธา",
  "commentOptCriteria": "คุณค่าโดดเด่นเป็นสากล",
  "commentOptMilestones": "หมุดหมายสำคัญ",
  "commentOptGeneral": "ภาพรวมเว็บไซต์",
  "commentSubmitBtn": "ส่งความคิดเห็น",
  "emptyComments": "ยังไม่มีความคิดเห็น เป็นคนแรกที่ร่วมส่งกำลังใจได้เลย",
  "sidebarAddButtonText": "＋ เพิ่มหัวข้อใหม่",
  "sidebarTrashButtonText": "🗑 ถังพัก",
  "railAddButtonText": "＋ เพิ่มหัวข้อใหม่",
  "railTrashButtonText": "🗑 ถังพัก",
  "searchPlaceholder": "ค้นหาเรื่องราว โครงการ หรือกิจกรรม",
  "commentPlaceholder": "เข้าสู่ระบบด้วย Google เพื่อร่วมแสดงความคิดเห็น",
  "generalManageBtn": "จัดการ"
};

const I18N_LO = {
  "brand": "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
  "navHistory": "ເລື່ອງລາວ",
  "navWorld": "ສູ່ມໍລະດົກໂລກ",
  "navVideos": "ວິດີໂອ",
  "photo": "ພາບພະທາດພະນົມ",
  "eyebrow": "ສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ · ມໍລະດົກຂອງມວນມະນຸດ",
  "title": "ພະທາດພະນົມ<br>ສູ່ມໍລະດົກໂລກ",
  "lead": "ຮ່ວມສືບສານປູຊະນີຍະສະຖານອັນເປັນສູນລວມສັດທາຂອງຊາວໄທ–ລາວ ແລະຊຸມຊົນລຸ່ມນ້ຳຂອງ ໃຫ້ຄົງຄຸນຄ່າທັງດ້ານກາຍະພາບ ແລະຈິດວິນຍານສູ່ຄົນຮຸ່ນຕໍ່ໄປ",
  "learn": "ຮຽນຮູ້ເສັ້ນທາງມໍລະດົກໂລກ",
  "watch": "ຊົມເລື່ອງລາວ",
  "statusLabel": "ສະຖານະປັດຈຸບັນ",
  "statusTitle": "ຢູ່ໃນບັນຊີລາຍຊື່ເບື້ອງຕົ້ນຂອງສູນມໍລະດົກໂລກ",
  "statusText": "ປະເທດໄທສະເໜີເມື່ອ 2 ກຸມພາ 2017 ໃນປະເພດມໍລະດົກທາງວັດທະນະທຳ ຕາມເກນ (i), (ii) ແລະ (vi) ປັດຈຸບັນຍັງຢູ່ໃນຂະບວນການກະກຽມເພື່ອສະເໜີຂຶ້ນທະບຽນ",
  "unesco": "ກວດສອບກັບ UNESCO ↗",
  "storyKicker": "ເລື່ອງລາວແຫ່ງສັດທາ",
  "storyTitle": "ພະທາດທີ່ມີຊີວິດຂອງຄົນສອງຝັ່ງຂອງ",
  "storyIntro": "ພະທາດພະນົມບໍ່ແມ່ນພຽງບູຮານສະຖານ ແຕ່ເປັນພື້ນທີ່ສັກສິດທີ່ສັດທາ ປະຫວັດສາດ ສິລະປະ ແລະວິຖີຊຸມຊົນດຳເນີນຮ່ວມກັນມາຢ່າງຍາວນານ",
  "faithTitle": "ພະອຸຣັງຄະທາດ ແລະຄວາມເຊື່ອ",
  "faithText": "ຕາມຕຳນານອຸຣັງຄະທາດ ເຊື່ອວ່າພະມະຫາກັດສະປະໄດ້ນຳພະບໍລົມມະສາຣີຣິກະທາດສ່ວນພະອຸຣະມາປະດິດສະຖານທີ່ພູກຳພ້າ",
  "artTitle": "ຮ່ອງຮອຍສິລະປະ",
  "artText": "ຫຼັກຖານໂບຮານຄະດີຊີ້ເຖິງໂຄງສ້າງດິນຈີ່ຊັ້ນໃນປະມານຄຣິດສະຕະວັດທີ 7–8 ແລະການສືບຕໍ່ຮູບແບບສິລະປະຫຼາຍຍຸກ",
  "peopleTitle": "ສູນລວມຜູ້ຄົນ",
  "peopleText": "ຜູ້ຄົນຫຼາຍຊາດພັນຈາກໄທ ລາວ ແລະພູມິພາກໃກ້ຄຽງ ຮ່ວມສັກກາລະ ບູລະນະ ແລະສືບທອດປະເພນີ",
  "timelineKicker": "ໝຸດໝາຍສຳຄັນ",
  "timelineTitle": "ອະດີດທີ່ຫຼໍ່ຫຼອມອະນາຄົດ",
  "t1time": "ປະມານຄຣິດສະຕະວັດທີ 7–8",
  "t1title": "ໂຄງສ້າງຍຸກທຳອິດ",
  "t1text": "ຫຼັກຖານການຂຸດຄົ້ນລະບຸອາຍຸຫ້ອງດິນຈີ່ຊັ້ນໃນ",
  "t2title": "ບູຮານສະຖານຂອງຊາດ",
  "t2text": "ກົມສິລະປາກອນປະກາດຂຶ້ນທະບຽນເພື່ອການອະນຸລັກ",
  "t3title": "ລົ້ມ ແລະຟື້ນຄືນ",
  "t3text": "ອົງພະທາດລົ້ມຈາກພາຍຸຝົນ ກ່ອນບູລະນະດ້ວຍຄວາມຮ່ວມໃຈຈາກທົ່ວພູມິພາກ",
  "t4title": "ກ້າວສູ່ເວທີໂລກ",
  "t4text": "ໄດ້ຮັບການບັນຈຸໃນບັນຊີລາຍຊື່ເບື້ອງຕົ້ນ",
  "criteriaKicker": "ຄຸນຄ່າໂດດເດັ່ນເປັນສາກົນ",
  "criteriaTitle": "ເຫດໃດພະທາດພະນົມຈຶ່ງຄວນເປັນມໍລະດົກໂລກ",
  "criteriaIntro": "ຂໍ້ສະເໜີໃນບັນຊີເບື້ອງຕົ້ນຂອງ UNESCO ລະບຸຄຸນຄ່າຕາມເກນວັດທະນະທຳ 3 ຂໍ້",
  "c1title": "ຜົນງານສ້າງສັນອັນເປັນເລີດ",
  "c1text": "ສະຖາປັດຕະຍະກຳພຸດທະສິນທີ່ຜະສົມຮາກສິລະປະບູຮານກັບຈິດວິນຍານແຫ່ງລຸ່ມນ້ຳຂອງ",
  "c2title": "ການແລກປ່ຽນຄຸນຄ່າຂ້າມວັດທະນະທຳ",
  "c2text": "ວິວັດທະນາການຍາວນານຂອງຮູບແບບພະທາດ ສະແດງການພົບກັນຂອງຄວາມເຊື່ອທ້ອງຖິ່ນກັບພຸດທະສາສະໜາ",
  "c3title": "ສຳພັນກັບຄວາມເຊື່ອທີ່ຍັງດຳລົງ",
  "c3text": "ເຊື່ອມໂຍງກັບການບູຊາພະບໍລົມມະສາຣີຣິກະທາດ ຕຳນານອຸຣັງຄະທາດ ແລະປະເພນີສັກສິດ",
  "processKicker": "ຈາກບັນຊີເບື້ອງຕົ້ນສູ່ການຂຶ້ນທະບຽນ",
  "processTitle": "ວຽກທີ່ຕ້ອງເຮັດຮ່ວມກັນ",
  "processText": "ການຂຶ້ນທະບຽນຄືຄຳໝັ້ນທີ່ຈະອະນຸລັກຄຸນຄ່າ ວາງລະບົບບໍລິຫານ ແລະໃຫ້ທຸກພາກສ່ວນມີສ່ວນຮ່ວມ",
  "s1title": "ກຳນົດຄຸນຄ່າ ແລະຂອບເຂດ",
  "s1text": "ສຶກສາອົງປະກອບສຳຄັນ ພື້ນທີ່ຫຼັກ ແລະພື້ນທີ່ກັນຊົນ",
  "s2title": "ຈັດທຳແຜນອະນຸລັກ ແລະບໍລິຫານ",
  "s2text": "ຄຸ້ມຄອງບູຮານສະຖານ ພູມສັນຖານ ປະເພນີ ແລະວິຖີຊຸມຊົນ",
  "s3title": "ສ້າງການມີສ່ວນຮ່ວມ",
  "s3text": "ຄະນະສົງ ຊຸມຊົນ ນັກວິຊາການ ພາກລັດ ເອກະຊົນ ແລະເຍົາວະຊົນຮ່ວມກຳນົດອະນາຄົດ",
  "s4title": "ຈັດທຳເອກະສານສະເໜີຊື່",
  "s4text": "ລວບລວມຫຼັກຖານ ແລະແຜນງານເພື່ອເຂົ້າສູ່ການພິຈາລະນາຕາມຂະບວນການ UNESCO",
  "quote": "ມໍລະດົກໂລກເລີ່ມຈາກຄົນໃນພື້ນທີ່ເຫັນຄຸນຄ່າ ຮ່ວມກັນດູແລ ແລະສົ່ງຕໍ່ສັດທາຢ່າງຮູ້ເທົ່າທັນການປ່ຽນແປງ",
  "videosKicker": "ສຽງຈາກຜູ້ຄົນ ແລະຊຸມຊົນ",
  "videosTitle": "ຊົມເລື່ອງລາວພະທາດພະນົມ",
  "videosIntro": "ສາລະຄະດີສັ້ນ ຂ່າວ ແລະບົດເພງທີ່ຖ່າຍທອດຄຸນຄ່າດ້ານປະຫວັດສາດ ສັດທາ ແລະພະລັງຂອງຄົນສອງຝັ່ງຂອງ",
  "report": "ລາຍງານຂ່າວ",
  "shortDoc": "ສາລະຄະດີສັ້ນ",
  "song": "ບົດເພງໄທ–ລາວ",
  "v1": "ຜັກດັນ ‘ພະທາດພະນົມ’ ສູ່ມໍລະດົກໂລກ",
  "v2": "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
  "v3": "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
  "shareKicker": "ຮ່ວມເປັນສ່ວນໜຶ່ງຂອງການສືບສານ",
  "shareTitle": "ຮຽນຮູ້ຄຸນຄ່າ ເຄົາລົບພື້ນທີ່ ແລະບອກຕໍ່ຢ່າງຖືກຕ້ອງ",
  "share": "ແບ່ງປັນເວັບໄຊ",
  "footerSub": "ອົງຄວາມຮູ້ເພື່ອສັດທາ ແລະການອະນຸລັກຢ່າງຍືນຍົງ",
  "sources": "ແຫຼ່ງຂໍ້ມູນ",
  "note": "ເວັບໄຊນີ້ສະຫຼຸບ ແລະຮຽບຮຽງຈາກແຫຼ່ງຂໍ້ມູນທີ່ລະບຸ ເພື່ອເຜີຍແຜ່ຄວາມຮູ້ ບໍ່ແມ່ນເວັບໄຊທາງການຂອງ UNESCO",
  "trialLabel": "",
  "searchAction": "ຄົ້ນຫາ",
  "navHome": "ໜ້າຫຼັກ",
  "navResources": "ໂຄງການ",
  "navMilestones": "ໝຸດໝາຍສຳຄັນ",
  "navCommunity": "ຊຸມຊົນ",
  "commentPrompt": "ຮ່ວມແບ່ງປັນຄວາມປະທັບໃຈ ຫຼືຂໍ້ສະເໜີແນະ...",
  "commentAction": "ສະແດງຄວາມຄິດເຫັນ",
  "projectsKicker": "ໂຄງການເພື່ອພະທາດພະນົມ",
  "projectsTitle": "ໂຄງການທັງໝົດ",
  "projectsIntro": "ເລືອກໂຄງການເພື່ອເບິ່ງລາຍລະອຽດ ກິດຈະກຳ ສື່ມວນຊົນ ແລະຄວາມຄືບໜ້າການດຳເນີນງານຢ່າງຕໍ່ເນື່ອງ",
  "muchalindaHome": "ໜ້າຫຼັກ",
  "supportingProjects": "ໂຄງການສະໜັບສະໜູນ",
  "muchalindaShort": "ບູລະນະສະມຸດຈະລິນ",
  "supportingWorldHeritage": "ໂຄງການສະໜັບສະໜູນພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ",
  "muchalindaTitle": "ໂຄງການບູລະນະສະມຸດຈະລິນ (ສະພັງທອງ)",
  "muchalindaLead": "ຟື້ນຟູແຫຼ່ງນ້ຳສັກສິດອາຍຸກວ່າ 1,000 ປີ ເພື່ອການບໍລິຫານຈັດການນ້ຳຢ່າງຮອບດ້ານ ຄົງໄວ້ເຊິ່ງພູມທັດວັດທະນະທຳ ແລະພື້ນທີ່ຈິດວິນຍານຂອງຊຸມຊົນ",
  "projectInProgress": "ກຳລັງດຳເນີນງານ",
  "projectOverview": "ພາບລວມ",
  "projectHistory": "ຄວາມເປັນມາ",
  "projectObjectives": "ເປົ້າໝາຍ",
  "projectProgress": "ຄວາມຄືບໜ້າ",
  "projectFacts": "ຂໍ້ມູນສຳຄັນ",
  "projectDonation": "ຮ່ວມສົມທົບທຶນ",
  "backToWorldHeritage": "← ກັບສູ່ໂຄງການພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ",
  "projectPurposeLabel": "ເປົ້າໝາຍໂຄງການ",
  "projectPurpose": "ບູລະນະຟື້ນຟູພູມທັດແຫຼ່ງນ້ຳສັກສິດ ແລະອະນຸລັກຄຸນຄ່າປະຫວັດສາດ",
  "projectLocationLabel": "ສະຖານທີ່ດຳເນີນງານ",
  "projectLocation": "ວັດພະທາດພະນົມ ວໍລະມະຫາວິຫານ ຈັງຫວັດນະຄອນພະນົມ",
  "projectStartLabel": "ໄລຍະເລີ່ມຕົ້ນ",
  "projectStart": "ໄລຍະທີ 1 ດຳເນີນການຈັດການແຫຼ່ງນ້ຳ",
  "projectSource": "ແຫຼ່ງຂໍ້ມູນ: ບັນທຶກການບູລະນະ ແລະເອກະສານປະຊາສຳພັນວັດພະທາດພະນົມ",
  "projectHistoryKicker": "ກວ່າ 1,000 ປີແຫ່ງສັດທາ",
  "muchalindaHistoryTitle": "ຄວາມເປັນມາ ແລະຄວາມສຳຄັນ",
  "muchalindaHistoryText": "ຕາມຕຳນານອຸຣັງຄະທາດ ສະມຸດຈະລິນ ຫຼືສະພັງທອງ ຂຸດຂຶ້ນເພື່ອນຳດິນໄປເຮັດດິນຈີ່ສ້າງອົງພະທາດພະນົມ ແລະເປັນແຫຼ່ງນ້ຳສັກສິດຂອງຊຸມຊົນສອງຝັ່ງຂອງສືບເນື່ອງມາຢ່າງຍາວນານ",
  "muchalindaRestorationKicker": "ພ.ສ. 2568 ເປັນຕົ້ນໄປ",
  "muchalindaRestorationTitle": "ການຟື້ນຟູ ແລະອະນຸລັກພູມທັດ",
  "muchalindaRestorationText": "ຟື້ນຟູລະບົບນ້ຳ ປັບປຸງພູມທັດອ້ອມຮອບໃຫ້ຮົ່ມເຢັນ ແລະປະດິດສະຖານພະພຸດທະອຸຣັງຄະທາດພະນົມນາຄາ ມະຫາຈັກກຣີສິຣິນທອນ ທີ່ເກາະກາງສະ ເພື່ອສືບສານພຸດທະສັດທາ ແລະຮອງຮັບຜູ້ມາຢ້ຽມຢາມຈາກທົ່ວໂລກ",
  "muchalindaSlide2Title": "ສະນ້ຳສັກສິດ ແລະດິນຈີ່ພັນປີແຫ່ງພູກຳພ້າ",
  "muchalindaSlide2Text": "ຕາມຕຳນານອຸຣັງຄະທາດ ຊຸມຊົນບູຮານຂຸດສະເພື່ອນຳດິນໄປເຮັດດິນຈີ່ສ້າງ ແລະບູລະນະອົງພະທາດພະນົມ ຕໍ່ເນື່ອງເປັນແຫຼ່ງນ້ຳສັກສິດຄູ່ສອງຝັ່ງຂອງ",
  "muchalindaConceptCaption": "ແນວຄິດການອອກແບບພູມທັດເຊື່ອມໂຍງສິລະປະພະຍານາກຂະແມແລະລ້ານຊ້າງ",
  "projectObjectivesKicker": "ພາລະກິດ ແລະເປົ້າໝາຍ",
  "projectObjectivesTitle": "ເປົ້າໝາຍການດຳເນີນງານ",
  "objectiveOneTitle": "1. ຟື້ນຟູຄຸນນະພາບນ້ຳ ແລະລະບົບນິເວດ",
  "objectiveOneText": "ປັບປຸງຄຸນນະພາບນ້ຳໃຫ້ໃສສະອາດ ສ້າງລະບົບບຳບັດນ້ຳແບບທຳມະຊາດ ແລະປັບປຸງຂອບສະໃຫ້ໝັ້ນຄົງ",
  "objectiveTwoTitle": "2. ຍົກລະດັບພູມທັດ ແລະສະຖາປັດຕະຍະກຳ",
  "objectiveTwoText": "ສ້າງທາງຍ່າງ ສາລາພັກຜ່ອນ ແລະລະບົບໄຟສ່ອງສະຫວ່າງທີ່ກົມກືນກັບສິລະປະພຸດທະບູຊາ",
  "objectiveThreeTitle": "3. ສືບສານພິທີກຳ ແລະວິຖີຊຸມຊົນ",
  "objectiveThreeText": "ຟື້ນຟູພິທີກຳບູຊາສາຍນ້ຳ ແລະສົ່ງເສີມການມີສ່ວນຮ່ວມຂອງປະຊາຊົນໃນການດູແລຮັກສາຢ່າງຍືນຍົງ",
  "projectProgressKicker": "ຂັ້ນຕອນ ແລະກຳນົດການ",
  "projectProgressTitle": "ຄວາມຄືບໜ້າການດຳເນີນງານ",
  "projectTimeOne": "ໄລຍະທີ 1",
  "projectTimeOneTitle": "ສຳຫຼວດໂບຮານຄະດີ ແລະອອກແບບລວມ",
  "projectTimeOneText": "ສຳຫຼວດຊັ້ນດິນ ວັດແທກຂອບເຂດ ແລະຮັບຟັງຄວາມຄິດເຫັນຈາກຊຸມຊົນ",
  "projectTimeTwo": "ໄລຍະທີ 2",
  "projectTimeTwoTitle": "ຂຸດລອກຕະກອນ ແລະເສີມຄວາມແຂງແຮງ",
  "projectTimeTwoText": "ກຳຈັດຕະກອນເກົ່າ ບູລະນະຄັນດິນ ແລະວາງລະບົບລະບາຍນ້ຳ",
  "projectTimeThree": "ໄລຍະທີ 3",
  "projectTimeThreeTitle": "ປັບປຸງພູມທັດ ແລະສິ່ງອຳນວຍຄວາມສະດວກ",
  "projectTimeThreeText": "ສ້າງທາງຍ່າງ ປູກຕົ້ນໄມ້ມຸງຄຸນ ແລະຕິດຕັ້ງປ້າຍໃຫ້ຄວາມຮູ້",
  "projectTimeFour": "ໄລຍະທີ 4",
  "projectTimeFourTitle": "ສົມໂພດ ແລະມອບໝາຍການດູແລ",
  "projectTimeFourText": "ຈັດພິທີສົມໂພດສະມຸດຈະລິນ ແລະຕັ້ງຄະນະກຳມະການຊຸມຊົນຮ່ວມດູແລ",
  "projectDonationKicker": "ຮ່ວມສ້າງບຸນບາຣະມີ",
  "projectDonationTitle": "ຮ່ວມສົມທົບທຶນບູລະນະສະມຸດຈະລິນ",
  "projectDonationText": "ຮ່ວມເປັນເຈົ້າພາບຈັດຊື້ອຸປະກອນ ລະບົບບຳບັດນ້ຳ ແລະວັດສະດຸກໍ່ສ້າງຕາມກຳລັງສັດທາ",
  "projectDonationSafety": "ເງິນບໍລິຈາກທັງໝົດເຂົ້າບັນຊີໂຄງການວັດພະທາດພະນົມໂດຍກົງ ໂປ່ງໃສ ແລະກວດສອບໄດ້",
  "supportHeritage": "ສະໜັບສະໜູນພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
  "supportHeritageDesc": "ຮ່ວມເປັນພະລັງໃນການອະນຸລັກ ພັດທະນາ ແລະເຜີຍແຜ່ຄຸນຄ່າພະທາດພະນົມໃຫ້ຍືນຍົງສືບໄປ",
  "donationDetails": "ເບິ່ງລາຍລະອຽດ",
  "newsKicker": "ຂ່າວສານ ແລະຄວາມຄືບໜ້າ",
  "newsTitle": "ຂ່າວສານຫຼ້າສຸດ",
  "newsIntro": "ຕິດຕາມຂ່າວສານ ກິດຈະກຳງານບຸນ ແລະຄວາມຄືບໜ້າການສະເໜີຂຶ້ນທະບຽນມໍລະດົກໂລກ",
  "newsEvents": "ກິດຈະກຳ ແລະງານບຸນ",
  "mediaKicker": "ຄັງສື່ມວນຊົນ",
  "mediaTitle": "ພາບ ແລະວິດີໂອ",
  "mediaIntro": "ຮວບຮວມພາບຖ່າຍປະຫວັດສາດ ວິດີໂອສາລະຄະດີ ແລະພາບມຸມສູງອັນງົດງາມ",
  "mediaLibrary": "ຄັງສື່ທັງໝົດ",
  "documentsKicker": "ເອກະສານ ແລະວິຊາການ",
  "documentsTitle": "ເອກະສານທາງການ",
  "documentsIntro": "ເອກະສານສະເໜີຂຶ້ນທະບຽນ ງານວິໄຈໂບຮານຄະດີ ແລະແຜນການຄຸ້ມຄອງມໍລະດົກ",
  "documents": "ດາວໂຫຼດເອກະສານ",
  "donationKicker": "ສັດທາ ແລະການໃຫ້",
  "donationTitle": "ຮ່ວມສະໜັບສະໜູນມູນນິທິ",
  "donationIntro": "ທຸກການສະໜັບສະໜູນຊ່ວຍຂັບເຄື່ອນການອະນຸລັກ ແລະການສຶກສາເພື່ອຄົນຮຸ່ນຫຼັງ",
  "donation": "ຮ່ວມບໍລິຈາກ",
  "resourcesKicker": "ສູນການຮຽນຮູ້",
  "resourcesTitle": "ຄັງຄວາມຮູ້ ແລະເອກະສານ",
  "resourcesIntro": "ສູນຮວບຮວມເອກະສານປະຫວັດສາດ ສື່ການຮຽນຮູ້ ແລະຂໍ້ມູນຄົບຖ້ວນ",
  "currentProject": "ໂຄງການເດັ່ນໃນຂະນະນີ້",
  "currentProjectText": "ກຳລັງດຳເນີນການບູລະນະສະມຸດຈະລິນ (ສະພັງທອງ) ເພື່ອຄືນຄວາມສົມບູນສູ່ພື້ນທີ່ສັກສິດ",
  "quickAccess": "ເຂົ້າເຖິງດ່ວນ",
  "viewAllProjects": "ເບິ່ງໂຄງການທັງໝົດ",
  "sidebarProjectsTitle": "ໂຄງການທັງໝົດ",
  "accountLoginBtn": "ເຂົ້າສູ່ລະບົບ",
  "trialBrand": "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ",
  "menuAndManagement": "ເມນູແລະການຈັດການ",
  "avatarVisitor": "ຜູ້ຢ້ຽມຊົມ",
  "notLoggedIn": "ຍັງບໍ່ໄດ້ເຂົ້າສູ່ລະບົບ",
  "roleGuest": "ບຸກຄົນທົ່ວໄປ",
  "loginWithGoogle": "ເຂົ້າສູ່ລະບົບດ້ວຍ Google",
  "projectMapMenu": "ຜັງໂຄງການ",
  "siteStatusMenu": "ສະຖານະການເຜີຍແຜ່",
  "backupRestoreMenu": "ສຳຮອງແລະກູ້ຄືນຂໍ້ມູນ",
  "chatWithAdminMenu": "ແຊັດກັບຜູ້ດູແລ",
  "loginNote": "ທຸກຄົນເຂົ້າຊົມເວັບໄຊໄດ້ໂດຍບໍ່ຕ້ອງເຂົ້າສູ່ລະບົບ ການເຂົ້າສູ່ລະບົບໃຊ້ສຳລັບຈັດການເນື້ອຫາ ສະແດງຄວາມຄິດເຫັນ ແລະແຊັດເທົ່ານັ້ນ",
  "loadingCatalog": "ກຳລັງກຽມຂໍ້ມູນ...",
  "manageProjectsBtn": "ຈັດການໂຄງການ",
  "emptyProjects": "ກຳລັງກຽມລາຍການໂຄງການ...",
  "driveVideoTitle": "ວິດີໂອຫຼ້າສຸດຈາກຄັງສື່ໂຄງການ",
  "driveVideoSubtitle": "ລາຍການນີ້ອັບເດດອັດຕະໂນມັດຈາກໂຟລເດີ Videos ໃນ Google Drive",
  "filterAll": "ທັງໝົດ",
  "filterImages": "ຮູບພາບ",
  "filterVideos": "ວິດີໂອ",
  "emptyMedia": "ກຳລັງກຽມຄັງສື່...",
  "emptyNews": "ຍັງບໍ່ມີຂ່າວຫຼືກິດຈະກຳທີ່ເຜີຍແຜ່",
  "emptyDocs": "ຍັງບໍ່ມີເອກະສານທີ່ເຜີຍແຜ່",
  "emptyDonation": "ຍັງບໍ່ມີຊ່ອງທາງຮ່ວມບຸນທີ່ເຜີຍແຜ່",
  "communityKicker": "ສຽງຈາກຊຸມຊົນ",
  "communityTitle": "ຄວາມຄິດເຫັນແລະກຳລັງໃຈ",
  "communitySubtitle": "ຮ່ວມແບ່ງປັນຄວາມປະທັບໃຈ ຂໍ້ສະເໜີແນະ ແລະພະລັງສະໜັບສະໜູນການອະນຸລັກພະທາດພະນົມ",
  "commentFormLabel": "ສະແດງຄວາມຄິດເຫັນ",
  "commentAboutLabel": "ກ່ຽວກັບ",
  "commentOptStory": "ເລື່ອງລາວແຫ່ງສັດທາ",
  "commentOptCriteria": "ຄຸນຄ່າໂດດເດັ່ນເປັນສາກົນ",
  "commentOptMilestones": "ໝຸດໝາຍສຳຄັນ",
  "commentOptGeneral": "ພາບລວມເວັບໄຊ",
  "commentSubmitBtn": "ສົ່ງຄວາມຄິດເຫັນ",
  "emptyComments": "ຍັງບໍ່ມີຄວາມຄິດເຫັນ ເປັນຄົນທຳອິດທີ່ຮ່ວມສົ່ງກຳລັງໃຈໄດ້ເລີຍ",
  "sidebarAddButtonText": "＋ ເພີ່ມຫົວຂໍ້ໃໝ່",
  "sidebarTrashButtonText": "🗑 ຖັງພັກ",
  "railAddButtonText": "＋ ເພີ່ມຫົວຂໍ້ໃໝ່",
  "railTrashButtonText": "🗑 ຖັງພັກ",
  "railFootnote": "ຂໍ້ມູນສຳລັບການສຶກສາ ແລະຮ່ວມສືບສານຄຸນຄ່າພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ",
  "searchPlaceholder": "ຄົ້ນຫາເລື່ອງລາວ ໂຄງການ ຫຼືກິດຈະກຳ",
  "commentPlaceholder": "ເຂົ້າສູ່ລະບົບດ້ວຍ Google ເພື່ອຮ່ວມສະແດງຄວາມຄິດເຫັນ",
  "generalManageBtn": "ຈັດການ"
};

const I18N_EN = {
  "trialLabel": "",
  "brand": "Phra That Phanom to World Heritage",
  "searchAction": "Search",
  "navHome": "Home",
  "navHistory": "History",
  "navWorld": "World Heritage",
  "navResources": "Projects",
  "navMilestones": "Milestones",
  "navVideos": "Videos",
  "navCommunity": "Community",
  "commentPrompt": "Share your thoughts or suggestions...",
  "commentAction": "Comment",
  "photo": "Photo of Phra That Phanom",
  "eyebrow": "Faith of the Mekong · Heritage of Humanity",
  "title": "Phra That Phanom<br>to World Heritage",
  "lead": "Preserving the sacred stupa and spiritual center of Thai-Lao communities across the Mekong River, safeguarding its physical and spiritual values for future generations.",
  "learn": "Explore World Heritage Path",
  "watch": "Watch Stories",
  "quickAccess": "Quick Access",
  "viewAllProjects": "View All Projects",
  "statusLabel": "Current Status",
  "statusTitle": "On UNESCO World Heritage Tentative List",
  "statusText": "Submitted by Thailand on February 2, 2017 under cultural criteria (i), (ii), and (vi). Currently in the dossier preparation process for World Heritage nomination.",
  "unesco": "Check with UNESCO ↗",
  "storyKicker": "Story of Faith",
  "storyTitle": "A Living Stupa of the Mekong People",
  "storyIntro": "Phra That Phanom is not merely an ancient monument, but a sacred sanctuary where living faith, history, art, and vibrant communities have flourished together for centuries.",
  "faithTitle": "The Urangathat and Sacred Beliefs",
  "faithText": "According to the Urangathat legend, Venerable Maha Kassapa brought the breastbone relic of Lord Buddha to be enshrined at Phu Kampha, establishing eternal faith across both banks of the Mekong River.",
  "artTitle": "Artistic Traces & Heritage",
  "artText": "Archaeological evidence confirms internal brick structures dating back to the 7th–8th centuries CE, followed by evolving architectural styles creating a unique Mekong valley aesthetic.",
  "peopleTitle": "Center of Diverse Communities",
  "peopleText": "Peoples of diverse ethnicities from Thailand, Laos, and neighboring lands gather to pay homage, restore, and preserve these sacred traditions through living cultural practices.",
  "timelineKicker": "Historical Milestones",
  "timelineTitle": "A Past Shaping the Future",
  "t1time": "Around 7th–8th Century CE",
  "t1title": "First-Period Structure",
  "t1text": "Archaeological excavations confirmed early internal brick chambers from the early historic era.",
  "t2title": "National Ancient Monument",
  "t2text": "Officially designated as a registered national ancient monument by the Fine Arts Department for heritage preservation.",
  "t3title": "Collapse and Rebirth",
  "t3text": "The stupa collapsed during severe storms in 1975, subsequently restored through profound devotion from across the region.",
  "t4title": "Stepping onto World Stage",
  "t4text": "Inscribed onto the UNESCO World Heritage Tentative List, preparing for nomination as a World Heritage site.",
  "criteriaKicker": "Outstanding Universal Value",
  "criteriaTitle": "Why Phra That Phanom Deserves World Heritage Status",
  "criteriaIntro": "The UNESCO Tentative List proposal highlights three cultural criteria, reflecting human masterpiece, cross-cultural exchange, and enduring living faith.",
  "c1title": "Masterpiece of Human Creative Genius",
  "c1text": "Distinctive Buddhist architecture blending ancient artistic roots with the spiritual ethos and artisanal craftsmanship of the Mekong River basin.",
  "c2title": "Important Exchange of Human Values",
  "c2text": "Long evolutionary history demonstrating the profound intersection of indigenous beliefs with Buddhism, influencing Isan and Lao religious art.",
  "c3title": "Direct Association with Living Traditions",
  "c3text": "Directly linked to relic veneration, the Urangathat chronicles, and living sacred pilgrimage festivals upheld continuously by generations.",
  "processKicker": "From Tentative List to Inscription",
  "processTitle": "Shared Responsibility & Stewardship",
  "processText": "Nomination is a solemn commitment to preserve heritage value, establish integrated management, and engage all local and international stakeholders.",
  "s1title": "Defining Values & Boundaries",
  "s1text": "Studying core attributes, delineating the nominated property and protective buffer zones.",
  "s2title": "Conservation & Management Plan",
  "s2text": "Managing ancient monuments, historical landscapes, sacred rites, and traditional community ways of life.",
  "s3title": "Community Engagement & Synergy",
  "s3text": "Monastics, communities, scholars, government, private sectors, and youth unite in shaping a sustainable future.",
  "s4title": "Nomination Dossier Preparation",
  "s4text": "Compiling archaeological, historical, and management evidence for formal evaluation by UNESCO and ICOMOS.",
  "quote": "World heritage begins when local communities recognize its profound value, care for it together, and pass on living faith with wisdom.",
  "projectsKicker": "Initiatives for Phra That Phanom",
  "projectsTitle": "All Projects",
  "projectsIntro": "Select a project to explore details, activities, multimedia, and continuous restoration progress.",
  "supportingProjects": "Supporting Initiatives",
  "muchalindaHome": "Home",
  "muchalindaShort": "Muchalinda Pond Restoration",
  "supportingWorldHeritage": "Supporting Phra That Phanom to World Heritage",
  "muchalindaTitle": "Muchalinda Pond Restoration Project (Sa Phang Thong)",
  "muchalindaLead": "Revitalizing a sacred water reservoir over 1,000 years old to restore holistic water management, historical dignity, and community spiritual space.",
  "projectInProgress": "In Progress",
  "projectOverview": "Overview",
  "projectHistory": "Background",
  "projectObjectives": "Objectives",
  "projectProgress": "Progress",
  "projectFacts": "Key Facts",
  "projectDonation": "Contribute",
  "backToWorldHeritage": "← Back to Phra That Phanom World Heritage Portal",
  "projectPurposeLabel": "Initiative Goal",
  "projectPurpose": "Restore sacred landscape and conserve historical water bodies",
  "projectLocationLabel": "Site Location",
  "projectLocation": "Wat Phra That Phanom Woramahawihan, Nakhon Phanom",
  "projectStartLabel": "Commencement",
  "projectStart": "Phase 1 - Under active management",
  "projectSource": "Reference: Official restoration records & Buddhist heritage announcements",
  "projectHistoryKicker": "Over 1,000 Years of Faith",
  "muchalindaHistoryTitle": "Historical Background & Significance",
  "muchalindaHistoryText": "According to the Urangathat chronicles, Muchalinda Pond (Sa Phang Thong) was excavated to provide clay for bricks to construct Phra That Phanom, and has served as a sacred water reservoir for communities along both banks of the Mekong.",
  "muchalindaRestorationKicker": "2025 Onwards",
  "muchalindaRestorationTitle": "Landscape Restoration & Conservation",
  "muchalindaRestorationText": "Revitalizing the water system, enhancing serene landscape surroundings, and enshrining Phra Phuttha Urangathat Phanom Nakha Maha Chakri Sirindhorn on the central island to sustain Buddhist faith and welcome pilgrims from around the world.",
  "muchalindaSlide2Title": "Sacred Well and Millennium-Old Brick Clay of Phu Kampha",
  "muchalindaSlide2Text": "According to the Urangathat chronicles, ancient communities excavated the pond for clay to craft bricks for building and restoring Phra That Phanom, enduring as a sacred reservoir across the Mekong.",
  "muchalindaConceptCaption": "Landscape design conceptualizing traditional Naga ponds in Khmer and Lan Xang iconography",
  "projectObjectivesKicker": "Mission & Goals",
  "projectObjectivesTitle": "Target Outcomes",
  "objectiveOneTitle": "1. Restore Ecological Purity",
  "objectiveOneText": "Purify the water reservoir, reconstruct embankments, and improve eco-friendly filtration systems.",
  "objectiveTwoTitle": "2. Landscape & Architectural Dignity",
  "objectiveTwoText": "Upgrade walking pavilions, ceremonial grounds, and night illuminations honoring Buddhist art.",
  "objectiveThreeTitle": "3. Community Cultural Heritage",
  "objectiveThreeText": "Revive sacred ceremonies and foster community participation in sustainable cultural stewardship.",
  "projectProgressKicker": "Timeline & Execution",
  "projectProgressTitle": "Restoration Phases",
  "projectTimeOne": "Phase 1",
  "projectTimeOneTitle": "Archaeological Survey & Boundary Planning",
  "projectTimeOneText": "Conducting sub-surface surveys, environmental assessments, and multi-stakeholder design consensus.",
  "projectTimeTwo": "Phase 2",
  "projectTimeTwoTitle": "Sediment Removal & Embankment Reinforcement",
  "projectTimeTwoText": "Clearing aquatic sediments, restoring ancient stone retaining walls, and stabilizing soil foundations.",
  "projectTimeThree": "Phase 3",
  "projectTimeThreeTitle": "Cultural Landscape & Public Amenities",
  "projectTimeThreeText": "Developing viewing paths, spiritual reflection areas, interpretive signages, and accessibility facilities.",
  "projectTimeFour": "Phase 4",
  "projectTimeFourTitle": "Consecration & Ongoing Stewardship",
  "projectTimeFourText": "Organizing merit-making consecration ceremonies and establishing community-monastic maintenance protocols.",
  "projectDonationKicker": "Support the Cause",
  "projectDonationTitle": "Contribute to Muchalinda Restoration",
  "projectDonationText": "Support restoration materials, water purification equipment, and site conservation through official temple channels.",
  "projectDonationSafety": "Contributions directly support designated restoration accounts under Wat Phra That Phanom.",
  "supportHeritage": "Support Phra That Phanom Heritage",
  "supportHeritageDesc": "Join the merit in conserving sacred monuments, ancient sites, and educational outreach for World Heritage inscription.",
  "donationDetails": "View Details",
  "newsKicker": "News & Updates",
  "newsTitle": "Latest Information",
  "newsIntro": "Updates on conservation projects, Buddhist ceremonies, and progress toward World Heritage listing.",
  "newsEvents": "Activities & Events",
  "mediaKicker": "Multimedia Gallery",
  "mediaTitle": "Images & Videos",
  "mediaIntro": "Explore photographic archives, video documentaries, and panoramic views of sacred Buddhist sites.",
  "mediaLibrary": "Media Archive",
  "videosKicker": "Voices of Community & Heritage",
  "videosTitle": "Watch Video Documentaries",
  "videosIntro": "Short documentaries, broadcast reports, and heritage songs expressing faith and unity along the Mekong.",
  "report": "News Report",
  "shortDoc": "Documentary",
  "song": "Thai-Lao Song",
  "v1": "Propelling Phra That Phanom to World Heritage",
  "v2": "Phra That Phanom: Journey to World Heritage",
  "v3": "Phra That Phanom towards UNESCO Inscription",
  "documentsKicker": "Academic Resources",
  "documentsTitle": "Documents & Dossiers",
  "documentsIntro": "Official nomination dossiers, archaeological research papers, and heritage conservation guidelines.",
  "documents": "Download Documents",
  "donationKicker": "Generosity & Merit",
  "donationTitle": "Support the Foundation",
  "donationIntro": "Donations directly support conservation works, archaeological studies, and educational activities.",
  "donation": "Contribute Merit",
  "resourcesKicker": "Heritage Hub",
  "resourcesTitle": "Knowledge & Archives",
  "resourcesIntro": "Consolidated documents, historical media archives, and learning resources on Phra That Phanom.",
  "currentProject": "Featured Initiative",
  "currentProjectText": "Currently undertaking the comprehensive restoration of Muchalinda Pond (Sa Phang Thong) to preserve sacred grounds.",
  "shareKicker": "Join the Mission",
  "shareTitle": "Learn, Respect, and Share",
  "share": "Share Website",
  "footerSub": "Wisdom for Faith and Sustainable Conservation",
  "sources": "Sources",
  "note": "This website compiles information for educational and heritage appreciation purposes and is not an official UNESCO website.",
  "sidebarProjectsTitle": "All Projects",
  "accountLoginBtn": "Sign In",
  "trialBrand": "Phra That Phanom to World Heritage",
  "menuAndManagement": "Menu & Management",
  "avatarVisitor": "Visitor",
  "notLoggedIn": "Not signed in",
  "roleGuest": "Guest",
  "loginWithGoogle": "Sign in with Google",
  "projectMapMenu": "Project Diagram",
  "siteStatusMenu": "Publishing Status",
  "backupRestoreMenu": "Backup & Restore",
  "chatWithAdminMenu": "Chat with Admin",
  "loginNote": "Everyone can browse the site without signing in. Signing in is only for content management, comments, and chat.",
  "loadingCatalog": "Loading data...",
  "manageProjectsBtn": "Manage Projects",
  "emptyProjects": "Loading projects...",
  "driveVideoTitle": "Latest Videos from Project Media Archive",
  "driveVideoSubtitle": "This list updates automatically from the Videos folder in Google Drive",
  "filterAll": "All",
  "filterImages": "Images",
  "filterVideos": "Videos",
  "emptyMedia": "Loading media archive...",
  "emptyNews": "No news or events published yet",
  "emptyDocs": "No documents published yet",
  "emptyDonation": "No donation channels published yet",
  "communityKicker": "Voices from the Community",
  "communityTitle": "Comments & Support",
  "communitySubtitle": "Share your impressions, feedback, and support for the preservation of Phra That Phanom.",
  "commentFormLabel": "Share your thoughts",
  "commentAboutLabel": "Topic",
  "commentOptStory": "Story of Faith",
  "commentOptCriteria": "Universal Value",
  "commentOptMilestones": "Key Milestones",
  "commentOptGeneral": "General Website",
  "commentSubmitBtn": "Post Comment",
  "emptyComments": "No comments yet. Be the first to share your support!",
  "sidebarAddButtonText": "＋ Add New Topic",
  "sidebarTrashButtonText": "🗑 Trash",
  "railAddButtonText": "＋ Add New Topic",
  "railTrashButtonText": "🗑 Trash",
  "railFootnote": "Information compiled for educational and heritage appreciation purposes.",
  "searchPlaceholder": "Search stories, projects, or activities",
  "commentPlaceholder": "Sign in with Google to leave a comment",
  "generalManageBtn": "Manage"
};

const I18N_LANGS = {
  th: { label: "ไทย", dict: I18N_TH, title: "พระธาตุพนม สู่มรดกโลก" },
  lo: { label: "ລາວ", dict: I18N_LO, title: "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ" },
  en: { label: "English", dict: I18N_EN, title: "Phra That Phanom to World Heritage" }
};

function setLanguage(lang) {
  const config = I18N_LANGS[lang] || I18N_LANGS.th;
  document.documentElement.lang = lang;
  
  // Determine if a user is currently logged in
  const authUser = window._appState?.user;
  const accountBtn = document.getElementById("accountButton");
  const isUserLoggedIn = !!(
    authUser ||
    (accountBtn && accountBtn.dataset.userLoggedIn === "true") ||
    (accountBtn && accountBtn.textContent && !["เข้าสู่ระบบ", "Sign In", "ເຂົ້າສູ່ລະບົບ", "กำลังเปิดบัญชี Google..."].includes(accountBtn.textContent.trim()))
  );

  // Update all data-i18n elements
  document.querySelectorAll("[data-i18n]").forEach((el) => {
    const key = el.dataset.i18n;

    // Preserve logged-in user information on account elements
    if (el.id === "accountButton") {
      if (isUserLoggedIn) {
        if (authUser && (authUser.displayName || authUser.email)) {
          el.textContent = authUser.displayName || authUser.email;
        }
        return;
      }
    } else if (el.id === "accountName") {
      if (isUserLoggedIn) {
        if (authUser && (authUser.displayName || authUser.email)) {
          el.textContent = authUser.displayName || authUser.email;
        }
        return;
      }
    } else if (el.id === "loginMenuText") {
      if (isUserLoggedIn) {
        const logoutLabels = { th: "ออกจากระบบ", lo: "ອອກຈາກລະບົບ", en: "Sign Out" };
        el.textContent = logoutLabels[lang] || logoutLabels.th;
        return;
      }
    } else if (el.id === "accountRole") {
      if (isUserLoggedIn) {
        return;
      }
    } else if (el.id === "accountAvatar") {
      if (isUserLoggedIn && (el.querySelector("img") || (el.textContent && el.textContent.trim() !== "ผู้เยี่ยมชม"))) {
        return;
      }
    }

    if (config.dict && config.dict[key]) {
      el.innerHTML = config.dict[key];
    } else if (I18N_TH[key]) {
      el.innerHTML = I18N_TH[key];
    }
  });

  // Update placeholders
  const searchInput = document.getElementById("siteSearchInput");
  if (searchInput && config.dict && config.dict.searchPlaceholder) {
    searchInput.placeholder = config.dict.searchPlaceholder;
  }
  const commentText = document.getElementById("commentText");
  if (commentText && config.dict && config.dict.commentPlaceholder) {
    commentText.placeholder = config.dict.commentPlaceholder;
  }

  // Update current language label in dropdown
  const labelEl = document.getElementById("currentLanguageLabel");
  if (labelEl) {
    labelEl.textContent = config.label;
  }

  // Update active state on option buttons
  document.querySelectorAll(".language-option").forEach((opt) => {
    const optLang = opt.getAttribute("data-lang");
    const isActive = optLang === lang;
    opt.classList.toggle("active", isActive);
    opt.setAttribute("aria-selected", isActive ? "true" : "false");
  });

  // Update page title
  document.title = config.title;
  localStorage.setItem("thatphanom_lang", lang);

  // Dispatch custom event for CMS or dynamic components to re-render
  window.dispatchEvent(new CustomEvent("portal:languageChange", { detail: { lang } }));
  if (typeof window.updateAuthUI === "function") {
    try { window.updateAuthUI(); } catch (_) {}
  }
  if (typeof window.renderSiteSectionsCMS === "function") {
    try { window.renderSiteSectionsCMS(); } catch (_) {}
  }
}

window.I18N_LANGS = I18N_LANGS;
window.I18N_TH = I18N_TH;
window.I18N_LO = I18N_LO;
window.I18N_EN = I18N_EN;
window.setLanguage = setLanguage;

function _initLanguageDropdown() {
  const dropdownBtn = document.getElementById("languageDropdownButton");
  const menu = document.getElementById("languageMenu");

  function closeMenu() {
    if (menu) menu.hidden = true;
    if (dropdownBtn) dropdownBtn.setAttribute("aria-expanded", "false");
  }

  function toggleMenu() {
    if (!menu) return;
    const isExpanded = dropdownBtn && dropdownBtn.getAttribute("aria-expanded") === "true";
    menu.hidden = isExpanded;
    if (dropdownBtn) dropdownBtn.setAttribute("aria-expanded", isExpanded ? "false" : "true");
  }

  if (dropdownBtn) {
    dropdownBtn.onclick = (e) => {
      e.stopPropagation();
      toggleMenu();
    };
  }

  // Option selection
  document.querySelectorAll(".language-option").forEach((opt) => {
    opt.onclick = (e) => {
      e.stopPropagation();
      const selectedLang = opt.getAttribute("data-lang") || "th";
      setLanguage(selectedLang);
      closeMenu();
    };
  });

  // Close when clicking outside
  document.addEventListener("click", (e) => {
    if (menu && !menu.hidden && !e.target.closest("#languageDropdown")) {
      closeMenu();
    }
  });

  // Restore saved language preference or initialize default
  const savedLang = localStorage.getItem("thatphanom_lang") || "th";
  setLanguage(savedLang);
}

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _initLanguageDropdown);
} else {
  _initLanguageDropdown();
}

// Core interactions and UI navigation helpers
function _initUiHelpers() {
  const progressBar = document.getElementById("progressBar");
  if (progressBar) {
    window.addEventListener("scroll", () => {
      const scrollTotal = document.documentElement.scrollHeight - window.innerHeight;
      if (scrollTotal > 0) {
        const percent = (window.scrollY / scrollTotal) * 100;
        progressBar.style.width = percent + "%";
      }
    }, { passive: true });
  }

  const scrollTopBtn = document.getElementById("scrollToTopButton");
  if (scrollTopBtn) {
    scrollTopBtn.addEventListener("click", () => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }

  const scrollBottomBtn = document.getElementById("scrollToBottomButton");
  if (scrollBottomBtn) {
    scrollBottomBtn.addEventListener("click", () => {
      window.scrollTo({ top: document.documentElement.scrollHeight, behavior: "smooth" });
    });
  }

  // Web Share API บนปุ่มแบ่งปันเว็บไซต์ (#shareButton)
  const shareBtn = document.getElementById("shareButton");
  if (shareBtn) {
    shareBtn.addEventListener("click", async () => {
      const curLang = document.documentElement.lang || localStorage.getItem("thatphanom_lang") || "th";
      
      let shareTitle = document.title || "พระธาตุพนม สู่มรดกโลก";
      let shareText = "พระธาตุพนม สู่มรดกโลก - ร่วมเรียนรู้คุณค่าและสืบสานจิตวิญญาณแห่งลุ่มน้ำโขง";
      if (curLang === "lo") {
        shareTitle = "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ";
        shareText = "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ - ຮ່ວມສືບສານປູຊະນີຍະສະຖານອັນເປັນສູນລວມສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ";
      } else if (curLang === "en") {
        shareTitle = "Phra That Phanom to World Heritage";
        shareText = "Phra That Phanom to World Heritage - Discover the spiritual and architectural values of the Sacred Relic.";
      }

      const shareUrl = window.location.href;
      const shareData = {
        title: shareTitle,
        text: shareText,
        url: shareUrl
      };

      const showToastMsg = (msg, tone = "") => {
        const toast = document.getElementById("toast");
        if (toast) {
          toast.textContent = msg;
          toast.dataset.tone = tone;
          toast.classList.add("show");
          clearTimeout(showToastMsg._timer);
          showToastMsg._timer = setTimeout(() => {
            toast.classList.remove("show");
          }, 3000);
        }
      };

      const copyFallback = async () => {
        let copied = false;
        try {
          if (navigator.clipboard && navigator.clipboard.writeText) {
            await navigator.clipboard.writeText(shareUrl);
            copied = true;
          } else {
            const tempInput = document.createElement("input");
            tempInput.value = shareUrl;
            tempInput.style.position = "fixed";
            tempInput.style.opacity = "0";
            document.body.appendChild(tempInput);
            tempInput.select();
            copied = document.execCommand("copy");
            document.body.removeChild(tempInput);
          }
        } catch (_) {
          copied = false;
        }

        if (copied) {
          const copyMsg = curLang === "en" 
            ? "Website link copied to clipboard!" 
            : curLang === "lo" 
            ? "ຄັດລອກລິ້ງເວັບໄຊສຳເລັດແລ້ວ!" 
            : "คัดลอกลิงก์เว็บไซต์เรียบร้อยแล้ว!";
          showToastMsg(copyMsg);
        } else {
          const failMsg = curLang === "en"
            ? "Unable to share or copy link"
            : curLang === "lo"
            ? "ບໍ່ສາມາດແບ່ງປັນຫຼືຄັດລອກລິ້ງໄດ້"
            : "ไม่สามารถแบ่งปันหรือคัดลอกลิงก์ได้";
          showToastMsg(failMsg, "error");
        }
      };

      if (navigator.share) {
        try {
          if (!navigator.canShare || navigator.canShare(shareData)) {
            await navigator.share(shareData);
            return;
          }
        } catch (err) {
          if (err && err.name === "AbortError") {
            return;
          }
        }
      }
      await copyFallback();
    });
  }

  // Navigation active state and click handler
  let _scriptNavLock = 0;
  let _scriptActive = "#top";

  const updateNavActive = (target) => {
    if (target === undefined || target === null) return;
    let raw = String(target).trim();
    if (!raw || raw === "#" || raw === "#top" || raw === "top" || raw === "header") {
      raw = "top";
    } else {
      raw = raw.replace(/^#/, "");
    }
    const targetHash = "#" + raw;
    _scriptActive = targetHash;

    const links = document.querySelectorAll("#mainTopNav a, .mobile-bottom-nav a");
    let matched = false;
    links.forEach(a => {
      const href = (a.getAttribute("href") || "").trim();
      const navTarget = (a.dataset.navTarget || "").trim();
      const aRaw = navTarget || (href.startsWith("#") ? href.substring(1) : href);
      const isMatch = (raw === "top" && (aRaw === "top" || aRaw === "" || href === "#top" || href === "#")) ||
                      (aRaw === raw || href === targetHash);
      if (isMatch && !matched) {
        a.classList.add("active");
        matched = true;
      } else {
        a.classList.remove("active");
      }
    });
    if (!matched && raw === "top" && links.length > 0) {
      links[0].classList.add("active");
    }
  };

  document.addEventListener("click", (e) => {
    const link = e.target.closest("#mainTopNav a, .mobile-bottom-nav a");
    if (!link) return;
    const href = (link.getAttribute("href") || "").trim();
    if (href.startsWith("#")) {
      _scriptNavLock = Date.now() + 1200;
      updateNavActive(href);
    }
  });

  window.addEventListener("hashchange", () => {
    if (location.hash) {
      _scriptNavLock = Date.now() + 1000;
      updateNavActive(location.hash);
    }
  });
}

// ============================================================================
// ระบบหยุดวิดีโออัตโนมัติเมื่อเลื่อนหน้าจอ (2 ระดับ) และเมื่อเปลี่ยนสไลด์
// รองรับการขยายวิดีโอเต็มจอ ทั้ง Fullscreen API และหน้าต่างขยาย Lightbox
// ============================================================================
(function initVideoAutoPauseEngine() {
  /**
   * ตรวจสอบว่าหน้าจอกำลังแสดงผลในโหมดเต็มจอ (Fullscreen) หรือไม่
   */
  function isFullscreenActive() {
    return !!(
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement
    );
  }

  /**
   * ตรวจสอบว่าองค์ประกอบนี้กำลังแสดงผลเต็มจอ หรืออยู่ภายในองค์ประกอบที่กำลังเต็มจอหรือไม่
   */
  function isElementInFullscreen(el) {
    const fsEl =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;
    if (!fsEl || !el) return false;
    return fsEl === el || fsEl.contains(el) || el.contains(fsEl);
  }

  /**
   * ตรวจสอบว่าองค์ประกอบนี้อยู่ภายในไดอะล็อกที่กำลังเปิดอยู่ (เช่น กล่องขยายวิดีโอ Lightbox) หรือไม่
   */
  function isElementInOpenDialog(el) {
    if (!el) return false;
    const dlg = el.closest ? el.closest("dialog") : null;
    return !!(dlg && dlg.open);
  }

  /**
   * ฟังก์ชันหยุดเล่นและตัดเสียงวิดีโอทุกประเภทในคอนเทนเนอร์ที่กำหนดทันที
   * ตรวจสอบเฉพาะวิดีโอที่เริ่มเล่นแล้วเท่านั้น เพื่อคงภาพปกเริ่มต้นไว้ ไม่ให้กลายเป็นจอดำ
   */
  function stopMediaInElement(container) {
    if (!container) return;

    // รีเซ็ตการเลื่อนหลุดพิกัดแนวนอน (Horizontal scroll offset) ให้กลับมาที่ 0 เสมอ
    try {
      if (container.scrollLeft) {
        container.scrollLeft = 0;
      }
    } catch (_) {}

    // หากองค์ประกอบหรือคอนเทนเนอร์นี้กำลังอยู่ในโหมดเต็มจอ หรือเปิดอยู่ในไดอะล็อกขยาย ไม่ต้องสั่งหยุด
    if (isElementInFullscreen(container) || isElementInOpenDialog(container)) {
      return;
    }

    // 1. จัดการ HTML5 Video (สั่งหยุดทุกคลิปวิดีโอที่กำลังเล่นอยู่)
    const videos = container.tagName === "VIDEO" ? [container] : Array.from(container.querySelectorAll("video"));
    videos.forEach((v) => {
      if (isElementInFullscreen(v) || isElementInOpenDialog(v)) return;
      try {
        if (!v.paused) {
          v.pause();
        }
      } catch (_) {}
    });

    // 2. จัดการ iframe (YouTube, Google Drive, Facebook, TikTok)
    const iframes = container.tagName === "IFRAME" ? [container] : Array.from(container.querySelectorAll("iframe"));
    iframes.forEach((ifr) => {
      if (isElementInFullscreen(ifr) || isElementInOpenDialog(ifr)) return;

      const src = ifr.getAttribute("src") || ifr.src || "";
      if (!src || src === "about:blank") return;

      const isYt = src.includes("youtube.com") || src.includes("youtube-nocookie.com") || src.includes("youtu.be");

      // บันทึก URL ต้นฉบับที่สะอาด (ตัด autoplay ออก) ไว้เสมอ
      if (!ifr.dataset.originalSrc || ifr.dataset.originalSrc === "about:blank") {
        let cleanSrc = src.replace(/[?&]autoplay=[^&]+/g, "").replace(/[?&]rel=0/g, "");
        if (cleanSrc.endsWith("?") || cleanSrc.endsWith("&")) {
          cleanSrc = cleanSrc.slice(0, -1);
        }
        ifr.dataset.originalSrc = cleanSrc;
      }

      // พยายามส่งคำสั่ง pause & stop ผ่าน postMessage
      try {
        ifr.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}', "*");
        ifr.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":[]}', "*");
        ifr.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}', "*");
        ifr.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":[]}', "*");
      } catch (_) {}

      // สำหรับ YouTube: คำสั่ง postMessage ด้านบนสั่งหยุดเล่นและตัดเสียงเรียบร้อยแล้ว
      // ห้ามเปลี่ยน src เป็น about:blank และห้ามสร้างปุ่มเล่นซ้อนทับโดยเด็ดขาด
      // เพื่อคงตัวเล่น YouTube ดั้งเดิมไว้ ไม่ให้เกิดจอดำ จอขาว หรือข้อผิดพลาดเมื่อเลื่อนหน้าจอกลับมา
      if (isYt) {
        const slide = ifr.closest(".media-slide, .media-stage, .portal-media-visual") || container;
        if (slide) {
          const oldBtn = slide.querySelector(".media-play-button");
          if (oldBtn) oldBtn.remove();
        }
        return;
      }
    });
  }

  // ส่งออกฟังก์ชันไว้ที่ window เพื่อให้สคริปต์สไลเดอร์เรียกใช้ได้โดยตรง
  window.pauseMediaInElement = stopMediaInElement;
  window.stopMediaInElement = stopMediaInElement;

  // ตัวเลือกสำหรับค้นหากล่องวิดีโอ กล่องการ์ดเนื้อหา กล่องสไลด์ และกล่องรายงานข่าว
  const TARGET_SELECTOR = [
    ".media-slider",
    ".media-slide",
    ".media-stage",
    ".support-project-hero-media",
    "#muchalindaHeroMedia",
    ".muchalinda-hero-slider",
    ".portal-content-card",
    ".news-card",
    ".portal-media-card",
    ".portal-media-visual",
    ".sidebar-item-card",
    ".sidebar-item",
    ".rail-card",
    "#selectedProjectMedia",
    "#selectedProjectDetail",
    ".support-project-detail",
    "#muchalinda-project",
    "#portalNewsList article",
    "video",
    "iframe[src*='youtube']",
    "iframe[src*='drive.google.com']",
    "iframe[src*='facebook.com']",
    "iframe[src*='tiktok.com']"
  ].join(", ");

  // ==========================================================================
  // ระดับที่ 1: ตัวตรวจจับระยะการมองเห็นของสายตา (Intersection Observer)
  // ==========================================================================
  let sightObserver = null;
  if ("IntersectionObserver" in window) {
    sightObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const target = entry.target;
          // หากผู้ใช้กำลังขยายเต็มจอ หรือเปิดในหน้าต่างขยายวิดีโอ ไม่ต้องสั่งหยุด
          if (isElementInFullscreen(target) || isElementInOpenDialog(target)) {
            return;
          }

          // เมื่อมองเห็นในหน้าจอ ให้ฟื้นฟูเฉพาะ iframe ที่อยู่ในสไลด์ที่กำลัง active หรือไม่ได้อยู่ในสไลเดอร์
          if (entry.isIntersecting && entry.intersectionRatio > 0.15) {
            const ifrs = target.tagName === "IFRAME" ? [target] : Array.from(target.querySelectorAll("iframe"));
            ifrs.forEach((i) => {
              i.dataset.mediaStopped = "false";
              const parentSlide = i.closest(".media-slide");
              if (!parentSlide || parentSlide.classList.contains("active")) {
                const orig = i.dataset.originalSrc;
                if (orig && (i.src === "about:blank" || !i.src || i.getAttribute("src") === "about:blank")) {
                  i.src = orig;
                }
              }
              const parentBox = i.closest(".media-slide, .media-stage, .portal-media-visual") || target;
              if (parentBox) {
                const pb = parentBox.querySelector(".media-play-button");
                if (pb) pb.remove();
              }
            });
          }

          // หากกล่องวิดีโอเลื่อนพ้นขอบสายตา (ไม่ตัดผ่านหน้าจอ หรือสัดส่วนต่ำกว่า 5%)
          if (!entry.isIntersecting || entry.intersectionRatio <= 0.05) {
            stopMediaInElement(target);
          }
        });
      },
      {
        root: null, // ใช้หน้าต่างหน้าจอ (Viewport)
        rootMargin: "0px",
        threshold: [0, 0.05, 0.2]
      }
    );
  }

  // ==========================================================================
  // ระดับที่ 2: ตัวคำนวณพิกัดการเลื่อนหน้าจอ (Scroll & Viewport Coordinate Calculator)
  // ==========================================================================
  let isScrollCheckScheduled = false;

  function calculateViewportCoordinates() {
    isScrollCheckScheduled = false;

    // ถ้ากำลังอยู่ในโหมดเต็มจอของเบราว์เซอร์
    const fsEl =
      document.fullscreenElement ||
      document.webkitFullscreenElement ||
      document.mozFullScreenElement ||
      document.msFullscreenElement;

    const windowHeight = window.innerHeight || document.documentElement.clientHeight;
    const windowWidth = window.innerWidth || document.documentElement.clientWidth;

    const elements = document.querySelectorAll(TARGET_SELECTOR);
    elements.forEach((el) => {
      // หากอยู่ในโหมดเต็มจอ หรือเป็นส่วนหนึ่งของโหมดเต็มจอ ห้ามสั่งหยุด
      if (fsEl && (fsEl === el || fsEl.contains(el) || el.contains(fsEl))) {
        return;
      }

      // หากอยู่ในหน้าต่างขยายวิดีโอ (dialog ที่เปิดอยู่) ห้ามสั่งหยุด
      if (isElementInOpenDialog(el)) {
        return;
      }

      // ตรวจสอบการถูกซ่อนด้วย CSS display: none หรือ visibility: hidden
      const style = window.getComputedStyle ? window.getComputedStyle(el) : null;
      if (style && (style.display === "none" || style.visibility === "hidden")) {
        const hasMedia = el.tagName === "VIDEO" || el.tagName === "IFRAME" || el.querySelector("video, iframe");
        if (hasMedia) {
          stopMediaInElement(el);
        }
        return;
      }

      // คำนวณพิกัดกรอบตำแหน่งสัมพัทธ์กับหน้าจอ
      const rect = el.getBoundingClientRect();
      if (rect.width === 0 && rect.height === 0) {
        return;
      }

      const isOutOfScreen = (
        rect.bottom <= 0 ||            // เลื่อนพ้นขอบบนของหน้าจอ
        rect.top >= windowHeight ||    // เลื่อนพ้นขอบล่างของหน้าจอ
        rect.right <= 0 ||             // เลื่อนพ้นขอบซ้ายของหน้าจอ
        rect.left >= windowWidth       // เลื่อนพ้นขอบขวาของหน้าจอ
      );

      if (isOutOfScreen) {
        stopMediaInElement(el);
      } else {
        const ifrs = el.tagName === "IFRAME" ? [el] : Array.from(el.querySelectorAll("iframe"));
        ifrs.forEach((i) => {
          i.dataset.mediaStopped = "false";
          const parentSlide = i.closest(".media-slide");
          if (!parentSlide || parentSlide.classList.contains("active")) {
            const orig = i.dataset.originalSrc;
            if (orig && (i.src === "about:blank" || !i.src || i.getAttribute("src") === "about:blank")) {
              i.src = orig;
            }
          }
          const parentBox = i.closest(".media-slide, .media-stage, .portal-media-visual") || el;
          if (parentBox) {
            const pb = parentBox.querySelector(".media-play-button");
            if (pb) pb.remove();
          }
        });
      }
    });
  }

  function scheduleCoordinateCheck() {
    if (!isScrollCheckScheduled) {
      // หากอยู่ในโหมดเต็มจอ ไม่ต้องสั่งตรวจสอบพิกัดพื้นหลัง
      if (isFullscreenActive()) {
        return;
      }
      isScrollCheckScheduled = true;
      requestAnimationFrame(calculateViewportCoordinates);
    }
  }

  // ติดตั้งตัวตรวจจับอีเวนต์การเลื่อนหน้าจอและปรับขนาดหน้าจอ
  window.addEventListener("scroll", scheduleCoordinateCheck, { passive: true });
  window.addEventListener("resize", scheduleCoordinateCheck, { passive: true });
  window.addEventListener("orientationchange", scheduleCoordinateCheck, { passive: true });
  window.addEventListener("hashchange", () => {
    registerTargets();
    scheduleCoordinateCheck();
  });
  window.addEventListener("popstate", () => {
    registerTargets();
    scheduleCoordinateCheck();
  });

  // จัดการเมื่อเข้าหรือออกจากโหมดเต็มจอ
  document.addEventListener("fullscreenchange", () => {
    if (isFullscreenActive()) {
      isScrollCheckScheduled = false;
    } else {
      setTimeout(scheduleCoordinateCheck, 250);
    }
  });
  document.addEventListener("webkitfullscreenchange", () => {
    if (isFullscreenActive()) {
      isScrollCheckScheduled = false;
    } else {
      setTimeout(scheduleCoordinateCheck, 250);
    }
  });

  // ลงทะเบียนองค์ประกอบเป้าหมายเข้าสู่ตัวตรวจจับระดับที่ 1
  function registerTargets(root) {
    const scope = root || document;

    // ทำความสะอาดปุ่มจำลองที่อาจตกค้างอยู่ใน DOM
    scope.querySelectorAll(".media-play-button").forEach((btn) => btn.remove());

    // ตรวจสอบและเปิดใช้งาน enablejsapi=1 สำหรับ iframe ยูทูบ เพื่อให้ postMessage ควบคุมการหยุดเล่นได้เสมอ
    const ifrs = scope.querySelectorAll("iframe");
    ifrs.forEach((ifr) => {
      try {
        const src = ifr.getAttribute("src") || ifr.src || "";
        const isYt = src.includes("youtube.com") || src.includes("youtube-nocookie.com") || src.includes("youtu.be");
        if (isYt && src !== "about:blank" && !src.includes("enablejsapi=1")) {
          const delim = src.includes("?") ? "&" : "?";
          ifr.src = src + delim + "enablejsapi=1";
        }
        if (isYt && (!ifr.dataset.originalSrc || ifr.dataset.originalSrc === "about:blank")) {
          ifr.dataset.originalSrc = ifr.getAttribute("src") || ifr.src;
        }
        // หาก iframe เคยถูกตั้งเป็น about:blank ให้คืนค่า URL ดั้งเดิมทันที
        if (isYt && (src === "about:blank" || !src) && ifr.dataset.originalSrc) {
          ifr.src = ifr.dataset.originalSrc;
        }
      } catch (_) {}
    });

    if (!sightObserver) return;
    const targets = scope.querySelectorAll(TARGET_SELECTOR);
    targets.forEach((target) => {
      // ไม่ลงทะเบียนองค์ประกอบที่อยู่ใน dialog ขยายวิดีโอ
      if (isElementInOpenDialog(target)) return;
      sightObserver.observe(target);
    });
  }

  // ==========================================================================
  // ระบบหยุดวิดีโออัตโนมัติเมื่อเปลี่ยนสไลด์: กด Next, Previous, ตัวเลขนับสไลด์ หรือปัดหน้าจอ
  // ==========================================================================
  function handleSlideChangeAction(e) {
    // ตรวจสอบการกดปุ่มเปลี่ยนสไลด์: Previous, Next, ตัวเลขนับสไลด์ หรือจุด pagination
    const arrowOrCounter = e.target.closest(
      ".slider-arrow.prev, .slider-arrow.next, .slider-arrow, .slider-counter, [data-slide-prev], [data-slide-next], [data-slide-counter], .slide-dot, .slider-dot"
    );
    if (arrowOrCounter) {
      const slider = arrowOrCounter.closest(".media-slider, [data-slider], .slider-container");
      if (slider) {
        // ค้นหาสไลด์ที่กำลังแสดงผลอยู่ปัจจุบัน แล้วสั่งหยุดวิดีโอทันทีก่อนจะเปลี่ยนสไลด์
        const activeSlide = slider.querySelector(".media-slide.active, .slide.active");
        if (activeSlide) {
          stopMediaInElement(activeSlide);
        }
      }
    }
  }

  // ตรวจจับการกดปุ่มเล่นวิดีโอ เพื่อบันทึกสถานะว่าวิดีโอถูกกดเล่นจริง
  document.addEventListener(
    "click",
    (e) => {
      const playBtn = e.target.closest(".media-play-button");
      if (playBtn) {
        const slide = playBtn.closest(".media-slide, .media-stage, .slider-container");
        if (slide) {
          const ifr = slide.querySelector("iframe");
          if (ifr) {
            ifr.dataset.mediaActivated = "true";
          }
        }
      }
    },
    true
  );

  document.addEventListener("click", handleSlideChangeAction, true);

  // ตรวจจับการใช้นิ้วปัดหน้าจอบนมือถือ (Mobile Touch Swipe) บนกล่องสไลด์
  let touchStartX = null;
  let touchStartY = null;
  let activeTouchSlider = null;

  document.addEventListener(
    "touchstart",
    (e) => {
      if (e.touches && e.touches.length === 1) {
        const slider = e.target.closest(".media-slider, [data-slider], .media-stage");
        if (slider) {
          activeTouchSlider = slider;
          touchStartX = e.touches[0].clientX;
          touchStartY = e.touches[0].clientY;
        }
      }
    },
    { passive: true }
  );

  document.addEventListener(
    "touchend",
    (e) => {
      if (touchStartX !== null && touchStartY !== null && activeTouchSlider) {
        const touchEndX = e.changedTouches && e.changedTouches.length ? e.changedTouches[0].clientX : touchStartX;
        const touchEndY = e.changedTouches && e.changedTouches.length ? e.changedTouches[0].clientY : touchStartY;
        const dx = touchEndX - touchStartX;
        const dy = touchEndY - touchStartY;

        // หากมีการปัดแนวนอนระยะเกิน 35px และชัดเจนกว่าแนวตั้ง
        if (Math.abs(dx) >= 35 && Math.abs(dx) > Math.abs(dy)) {
          const currentSlide = activeTouchSlider.querySelector(".media-slide.active, .slide.active");
          if (currentSlide) {
            stopMediaInElement(currentSlide);
          }
        }
      }
      touchStartX = null;
      touchStartY = null;
      activeTouchSlider = null;
    },
    { passive: true }
  );

  document.addEventListener(
    "touchcancel",
    () => {
      touchStartX = null;
      touchStartY = null;
      activeTouchSlider = null;
    },
    { passive: true }
  );

  // เฝ้าสังเกตเนื้อหาที่โหลดมาใหม่ เช่น ข่าวสาร หรือสื่อโครงการจากฐานข้อมูล และการเปิด/ปิดแท็บโครงการ
  if ("MutationObserver" in window) {
    const domObserver = new MutationObserver((mutations) => {
      let shouldReRegister = false;
      mutations.forEach((m) => {
        if ((m.addedNodes && m.addedNodes.length > 0) || m.type === "attributes") {
          shouldReRegister = true;
        }
      });
      if (shouldReRegister) {
        registerTargets();
        scheduleCoordinateCheck();
      }
    });
    domObserver.observe(document.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ["hidden", "class", "style"]
    });
  }

  // เริ่มต้นการตรวจจับเมื่อโครงสร้างหน้าเว็บพร้อม
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", () => {
      registerTargets();
      scheduleCoordinateCheck();
    });
  } else {
    registerTargets();
    scheduleCoordinateCheck();
  }
})();

// ============================================================================
// ตัวควบคุมสไลเดอร์โครงการบูรณะสระมุจลินท์ และสไลเดอร์แบบกำหนดเอง
// ============================================================================
(function initMuchalindaCustomSliders() {
  function setupSlider(slider) {
    if (!slider || slider.dataset.customSliderActive === "true") return;
    slider.dataset.customSliderActive = "true";

    const slides = Array.from(slider.querySelectorAll(".media-slide"));
    if (slides.length <= 1) return;

    const prevBtn = slider.querySelector(".slider-arrow.prev");
    const nextBtn = slider.querySelector(".slider-arrow.next");
    const counter = slider.querySelector(".slider-counter");

    let currentIndex = slides.findIndex((s) => s.classList.contains("active"));
    if (currentIndex < 0) currentIndex = 0;

    function goToSlide(idx) {
      if (idx < 0) idx = slides.length - 1;
      if (idx >= slides.length) idx = 0;
      currentIndex = idx;

      slides.forEach((s, i) => {
        s.classList.toggle("active", i === currentIndex);
      });

      if (counter) {
        counter.textContent = `${currentIndex + 1} / ${slides.length}`;
        counter.setAttribute("aria-label", `สไลด์ที่ ${currentIndex + 1} จากทั้งหมด ${slides.length}`);
      }
    }

    if (prevBtn) {
      prevBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentIndex - 1);
      });
    }

    if (nextBtn) {
      nextBtn.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
    }

    if (counter) {
      counter.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        goToSlide(currentIndex + 1);
      });
      counter.addEventListener("keydown", (e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          goToSlide(currentIndex + 1);
        }
      });
    }

    // รองรับปุ่มลูกศรคีย์บอร์ด ซ้าย/ขวา
    slider.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        e.preventDefault();
        goToSlide(currentIndex - 1);
      } else if (e.key === "ArrowRight") {
        e.preventDefault();
        goToSlide(currentIndex + 1);
      }
    });
  }

  function scanSliders() {
    document.querySelectorAll("[data-slider-custom]").forEach(setupSlider);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", scanSliders);
  } else {
    scanSliders();
  }
  window.addEventListener("load", scanSliders);

  document.addEventListener(
    "click",
    (e) => {
      const arrow = e.target.closest(".slider-arrow.prev, .slider-arrow.next, .slider-counter");
      if (arrow) {
        const slider = arrow.closest("[data-slider-custom]");
        if (slider && slider.dataset.customSliderActive !== "true") {
          setupSlider(slider);
        }
      }
    },
    true
  );
  // รองรับการคลิกปุ่ม "อัพเดท" (media-update-button) ของกล่องสไลด์และกล่องการ์ดโครงการสระมุจลินท์
  document.addEventListener("click", (e) => {
    const updateBtn = e.target.closest(".media-update-button");
    if (!updateBtn) return;
    const section = updateBtn.dataset.section;
    if (!section) return;

    if (typeof window._openMediaManager === "function") {
      e.preventDefault();
      e.stopPropagation();
      window._openMediaManager(section);
    } else {
      const manageDlg = document.getElementById("manageDialog");
      if (manageDlg && typeof manageDlg.showModal === "function") {
        e.preventDefault();
        e.stopPropagation();
        const titleEl = document.getElementById("manageDialogTitle");
        const secSelect = document.getElementById("mediaSection");
        const secNames = window._MEDIA_SECTION_NAMES || {};
        if (titleEl) titleEl.textContent = `อัพเดท — ${secNames[section] || section}`;
        if (secSelect) secSelect.value = section;
        manageDlg.showModal();
      }
    }
  });

  // ==========================================
  // Interactive Site Map (Admin Drag & Drop)
  // ==========================================
  function _initInteractiveSiteMap() {
    const treeDialog = document.getElementById("treeDialog");
    const treeWorkspace = document.getElementById("treeWorkspace");
    const mapBtn = document.getElementById("treeViewMapBtn");
    const listBtn = document.getElementById("treeViewListBtn");
    const sitemapContainer = document.getElementById("interactiveSiteMap");
    const siteTree = document.getElementById("siteTree");
    const boardEl = document.getElementById("sitemapBoard");
    const searchInput = document.getElementById("sitemapSearchInput");
    const clearSearchBtn = document.getElementById("clearSitemapSearch");
    const filterChips = document.getElementById("sitemapFilterChips");

    let currentFilter = "all";
    let searchQuery = "";
    let draggedNodeId = null;
    let draggedSourceParentId = null;
    let draggedType = null; // 'card' | 'lane'

    // สลับมุมมองระหว่าง ผัง Interactive กับ ผังรายการ
    function setViewMode(mode) {
      if (!mapBtn || !listBtn || !sitemapContainer || !siteTree || !treeWorkspace) return;
      if (mode === "map") {
        mapBtn.classList.add("active");
        mapBtn.setAttribute("aria-selected", "true");
        listBtn.classList.remove("active");
        listBtn.setAttribute("aria-selected", "false");
        sitemapContainer.hidden = false;
        siteTree.hidden = true;
        treeWorkspace.classList.add("mode-sitemap");
        renderInteractiveSiteMap();
      } else {
        listBtn.classList.add("active");
        listBtn.setAttribute("aria-selected", "true");
        mapBtn.classList.remove("active");
        mapBtn.setAttribute("aria-selected", "false");
        siteTree.hidden = false;
        sitemapContainer.hidden = true;
        treeWorkspace.classList.remove("mode-sitemap");
        if (typeof window._renderSiteTree === "function") {
          window._renderSiteTree();
        }
      }
    }

    if (mapBtn && listBtn) {
      mapBtn.addEventListener("click", () => setViewMode("map"));
      listBtn.addEventListener("click", () => setViewMode("list"));
    }

    // ตัวค้นหาและตัวกรอง
    if (searchInput) {
      searchInput.addEventListener("input", (e) => {
        searchQuery = (e.target.value || "").trim().toLowerCase();
        if (clearSearchBtn) clearSearchBtn.hidden = !searchQuery;
        renderInteractiveSiteMap();
      });
    }

    if (clearSearchBtn && searchInput) {
      clearSearchBtn.addEventListener("click", () => {
        searchInput.value = "";
        searchQuery = "";
        clearSearchBtn.hidden = true;
        searchInput.focus();
        renderInteractiveSiteMap();
      });
    }

    if (filterChips) {
      filterChips.addEventListener("click", (e) => {
        const chip = e.target.closest(".sitemap-filter-chip");
        if (!chip) return;
        filterChips.querySelectorAll(".sitemap-filter-chip").forEach((c) => c.classList.remove("active"));
        chip.classList.add("active");
        currentFilter = chip.dataset.filter || "all";
        renderInteractiveSiteMap();
      });
    }

    // ไอคอนและชื่อประเภท
    const TYPE_ICONS = {
      project: "🏛️",
      page: "▤",
      news: "◫",
      media: "▣",
      document: "▧",
      donation: "♡",
      folder: "◇",
      link: "↗",
    };

    function getNodeIcon(type) {
      return TYPE_ICONS[type] || "▤";
    }

    // ฟังก์ชันเรนเดอร์ Interactive Site Map
    function renderInteractiveSiteMap() {
      if (!boardEl) return;
      const appState = window._appState;
      if (!appState || !Array.isArray(appState.siteNodes)) {
        boardEl.innerHTML = '<p class="empty-state">กำลังเชื่อมต่อข้อมูลผังโครงการ...</p>';
        return;
      }

      const allNodes = appState.siteNodes.filter((n) => !n.deletedAt);
      if (!allNodes.length) {
        boardEl.innerHTML =
          '<div class="sitemap-empty-lane-hint">ยังไม่มีหัวข้อในผัง กดปุ่ม “＋ เพิ่มโครงการ” ด้านบนเพื่อเริ่มต้น</div>';
        return;
      }

      // หาโหนดหลักระดับบนสุด (Top-level projects / folders)
      // โหนดที่เป็น root หรือโหนดที่มี parentId เป็น "" หรือ "site-root" หรือ type === "project"
      let rootProjects = allNodes.filter(
        (n) =>
          n.type === "project" ||
          n.parentId === "" ||
          n.parentId === "site-root" ||
          !allNodes.some((p) => p.id === n.parentId)
      );

      // เรียงลำดับโครงการหลัก
      rootProjects.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title).localeCompare(String(b.title), "th"));

      // สร้าง Map สำหรับค้นหาโหนดลูก
      const childrenMap = new Map();
      allNodes.forEach((n) => {
        const pid = n.parentId || "";
        if (!childrenMap.has(pid)) childrenMap.set(pid, []);
        childrenMap.get(pid).push(n);
      });
      childrenMap.forEach((list) => {
        list.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title).localeCompare(String(b.title), "th"));
      });

      // กรองตามการค้นหาและประเภท
      boardEl.innerHTML = "";

      let displayedLanesCount = 0;

      rootProjects.forEach((proj, projIdx) => {
        // หาโหนดลูกทั้งหมดภายใต้โครงการนี้
        const directChildren = childrenMap.get(proj.id) || [];
        // รวมโหนดลูกของลูกด้วยถ้ามี
        const laneItems = [];
        function collectChildren(parentId) {
          const subs = childrenMap.get(parentId) || [];
          subs.forEach((sub) => {
            laneItems.push(sub);
            collectChildren(sub.id);
          });
        }
        collectChildren(proj.id);

        // ตรวจสอบตัวกรองและการค้นหา
        let filteredItems = laneItems.filter((item) => {
          if (currentFilter !== "all" && item.type !== currentFilter) return false;
          if (searchQuery) {
            const matchTitle = (item.title || "").toLowerCase().includes(searchQuery);
            const matchSlug = (item.slug || "").toLowerCase().includes(searchQuery);
            const matchDesc = (item.description || "").toLowerCase().includes(searchQuery);
            if (!matchTitle && !matchSlug && !matchDesc) return false;
          }
          return true;
        });

        const projMatchesSearch =
          !searchQuery ||
          (proj.title || "").toLowerCase().includes(searchQuery) ||
          (proj.slug || "").toLowerCase().includes(searchQuery);

        if (!projMatchesSearch && !filteredItems.length && searchQuery) {
          return; // ซ่อนโครงการนี้หากไม่ตรงเงื่อนไขค้นหา
        }

        displayedLanesCount++;

        // สร้างคอลัมน์โครงการ (Lane)
        const lane = document.createElement("div");
        lane.className = "sitemap-lane";
        lane.dataset.laneId = proj.id;
        lane.dataset.order = String(proj.order || (projIdx + 1) * 10);
        lane.draggable = true;

        // Lane Header
        const head = document.createElement("div");
        head.className = "sitemap-lane-head";

        const titleGroup = document.createElement("div");
        titleGroup.className = "sitemap-lane-title-group";

        const dragHandle = document.createElement("span");
        dragHandle.className = "sitemap-drag-handle";
        dragHandle.title = "ลากเพื่อสลับลำดับโครงการ";
        dragHandle.textContent = "⠿";

        const numBadge = document.createElement("span");
        numBadge.className = "sitemap-lane-num";
        numBadge.textContent = `#${projIdx + 1}`;

        const iconEl = document.createElement("span");
        iconEl.className = "sitemap-lane-icon";
        iconEl.textContent = getNodeIcon(proj.type);

        const titleEl = document.createElement("h4");
        titleEl.className = "sitemap-lane-title";
        titleEl.textContent = proj.title || "โครงการไม่มีชื่อ";
        titleEl.title = `${proj.title || ""} (${proj.id})`;

        titleGroup.append(dragHandle, numBadge, iconEl, titleEl);

        const laneActions = document.createElement("div");
        laneActions.className = "sitemap-lane-actions";

        // ปุ่มเลื่อนโครงการ (สำหรับมือถือ / Touch)
        const moveLeftBtn = document.createElement("button");
        moveLeftBtn.type = "button";
        moveLeftBtn.textContent = "◀";
        moveLeftBtn.title = "เลื่อนโครงการไปทางซ้าย";
        moveLeftBtn.disabled = projIdx === 0;
        moveLeftBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          reorderSiblingNodes(rootProjects, projIdx, -1, "สลับลำดับโครงการหลักแล้ว");
        });

        const moveRightBtn = document.createElement("button");
        moveRightBtn.type = "button";
        moveRightBtn.textContent = "▶";
        moveRightBtn.title = "เลื่อนโครงการไปทางขวา";
        moveRightBtn.disabled = projIdx === rootProjects.length - 1;
        moveRightBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          reorderSiblingNodes(rootProjects, projIdx, 1, "สลับลำดับโครงการหลักแล้ว");
        });

        // ปุ่มแก้ไขโครงการ
        const editBtn = document.createElement("button");
        editBtn.type = "button";
        editBtn.textContent = "✎ แก้ไข";
        editBtn.addEventListener("click", (e) => {
          e.stopPropagation();
          if (typeof window._selectTreeNode === "function") {
            window._selectTreeNode(proj.id);
          }
        });

        laneActions.append(moveLeftBtn, moveRightBtn, editBtn);
        head.append(titleGroup, laneActions);

        // Lane Drop Zone (กล่องสำหรับวางการ์ดลูก)
        const dropZone = document.createElement("div");
        dropZone.className = "sitemap-drop-zone";
        dropZone.dataset.targetParentId = proj.id;

        if (filteredItems.length === 0) {
          const emptyHint = document.createElement("div");
          emptyHint.className = "sitemap-empty-lane-hint";
          emptyHint.textContent = searchQuery
            ? "ไม่พบหัวข้อย่อยที่ตรงกับการค้นหา"
            : "ลากหัวข้อมาวางที่นี่ หรือกด ＋ เพิ่มโหนดย่อย";
          dropZone.append(emptyHint);
        } else {
          filteredItems.forEach((item, itemIdx) => {
            const card = document.createElement("div");
            card.className = "sitemap-card";
            if (appState.selectedTreeNodeId === item.id) {
              card.classList.add("selected");
            }
            card.dataset.nodeId = item.id;
            card.dataset.parentId = item.parentId || proj.id;
            card.dataset.order = String(item.order || (itemIdx + 1) * 10);
            card.draggable = true;

            // Card Left
            const cardLeft = document.createElement("div");
            cardLeft.className = "sitemap-card-left";

            const cardGrip = document.createElement("span");
            cardGrip.className = "sitemap-drag-handle";
            cardGrip.title = "ลากเพื่อจัดลำดับหรือย้ายโครงการ";
            cardGrip.textContent = "⠿";

            const cardNum = document.createElement("span");
            cardNum.className = "sitemap-card-num";
            cardNum.textContent = `#${projIdx + 1}.${itemIdx + 1}`;

            const cardIcon = document.createElement("span");
            cardIcon.className = "sitemap-card-icon";
            cardIcon.textContent = getNodeIcon(item.type);

            const cardMeta = document.createElement("div");
            cardMeta.className = "sitemap-card-meta";

            const cardTitle = document.createElement("span");
            cardTitle.className = "sitemap-card-title";
            cardTitle.textContent = item.title || "ไม่มีชื่อ";

            const cardSub = document.createElement("div");
            cardSub.className = "sitemap-card-sub";

            const pubBadge = document.createElement("span");
            pubBadge.className = `sitemap-badge-pub ${item.published ? "published" : "draft"}`;
            pubBadge.textContent = item.published ? "เผยแพร่แล้ว" : "ฉบับร่าง";
            cardSub.append(pubBadge);

            if (item.contentType && item.contentRef) {
              const linkBadge = document.createElement("span");
              linkBadge.className = "sitemap-badge-link";
              linkBadge.textContent = "เชื่อมข้อมูล";
              cardSub.append(linkBadge);
            }

            cardMeta.append(cardTitle, cardSub);
            cardLeft.append(cardGrip, cardNum, cardIcon, cardMeta);

            // Card Actions
            const cardActions = document.createElement("div");
            cardActions.className = "sitemap-card-actions";

            // ปุ่มเลื่อนขึ้น / ลงบนมือถือ
            const upBtn = document.createElement("button");
            upBtn.type = "button";
            upBtn.className = "sitemap-card-btn";
            upBtn.textContent = "▲";
            upBtn.title = "เลื่อนขึ้น";
            upBtn.disabled = itemIdx === 0;
            upBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              reorderSiblingNodes(filteredItems, itemIdx, -1, "เลื่อนลำดับหัวข้อขึ้นแล้ว");
            });

            const downBtn = document.createElement("button");
            downBtn.type = "button";
            downBtn.className = "sitemap-card-btn";
            downBtn.textContent = "▼";
            downBtn.title = "เลื่อนลง";
            downBtn.disabled = itemIdx === filteredItems.length - 1;
            downBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              reorderSiblingNodes(filteredItems, itemIdx, 1, "เลื่อนลำดับหัวข้อลงแล้ว");
            });

            // ปุ่มย้ายโครงการ (เปิดหน้าต่างเลือกโครงการปลายทาง)
            const moveBtn = document.createElement("button");
            moveBtn.type = "button";
            moveBtn.className = "sitemap-card-btn";
            moveBtn.textContent = "↔";
            moveBtn.title = "ย้ายไปโครงการอื่น";
            moveBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              showMoveNodePrompt(item, rootProjects);
            });

            // ปุ่มแก้ไข
            const cardEditBtn = document.createElement("button");
            cardEditBtn.type = "button";
            cardEditBtn.className = "sitemap-card-btn";
            cardEditBtn.textContent = "✎";
            cardEditBtn.title = "แก้ไข";
            cardEditBtn.addEventListener("click", (e) => {
              e.stopPropagation();
              if (typeof window._selectTreeNode === "function") {
                window._selectTreeNode(item.id);
              }
            });

            cardActions.append(upBtn, downBtn, moveBtn, cardEditBtn);

            // คลิกที่การ์ดเพื่อเปิดฟอร์มแก้ไข
            card.addEventListener("click", () => {
              if (typeof window._selectTreeNode === "function") {
                window._selectTreeNode(item.id);
              }
            });

            card.append(cardLeft, cardActions);
            dropZone.append(card);
          });
        }

        // Lane Footer (ปุ่มเพิ่มโหนดย่อย)
        const foot = document.createElement("div");
        foot.className = "sitemap-lane-foot";
        const addSubBtn = document.createElement("button");
        addSubBtn.type = "button";
        addSubBtn.className = "sitemap-add-sub-btn";
        addSubBtn.textContent = "＋ เพิ่มโหนดย่อยในโครงการนี้";
        addSubBtn.addEventListener("click", () => {
          if (typeof window._addNewTreeNode === "function") {
            window._addNewTreeNode(proj.id, "page");
          }
        });
        foot.append(addSubBtn);

        lane.append(head, dropZone, foot);
        boardEl.append(lane);
      });

      // กล่องปุ่มเพิ่มโครงการใหม่ที่ส่วนท้าย
      const addLaneCard = document.createElement("button");
      addLaneCard.type = "button";
      addLaneCard.className = "sitemap-add-lane-card";
      addLaneCard.innerHTML =
        '<span style="font-size:1.8rem;line-height:1;">＋</span><strong style="font-size:0.95rem;">เพิ่มโครงการใหม่</strong><span style="font-size:0.78rem;opacity:0.8;">สร้างหัวข้อโครงการระดับหลัก</span>';
      addLaneCard.addEventListener("click", () => {
        if (typeof window._addNewTreeNode === "function") {
          window._addNewTreeNode("", "project");
        }
      });
      boardEl.append(addLaneCard);

      // ติดตั้งระบบ Drag & Drop บน Board
      setupDragAndDropEvents();
    }

    // ฟังก์ชันเลื่อนลำดับด้วยปุ่ม (สำหรับสัมผัสและปุ่มลัด)
    async function reorderSiblingNodes(list, index, delta, successMsg) {
      const targetIndex = index + delta;
      if (targetIndex < 0 || targetIndex >= list.length) return;
      const current = list[index];
      const target = list[targetIndex];
      if (!current || !target) return;

      const updates = [
        { id: current.id, order: Number(target.order) || (targetIndex + 1) * 10, parentId: current.parentId },
        { id: target.id, order: Number(current.order) || (index + 1) * 10, parentId: target.parentId },
      ];

      if (typeof window._saveNodeReorder === "function") {
        await window._saveNodeReorder(updates, successMsg);
      }
    }

    // ฟังก์ชันย้ายโหนดข้ามโครงการแบบมีกล่องเลือก (Move prompt for touch/accessibility)
    function showMoveNodePrompt(node, projects) {
      const availableProjects = projects.filter((p) => p.id !== node.id && p.id !== node.parentId);
      if (!availableProjects.length) {
        if (typeof window._showPortalToast === "function") {
          window._showPortalToast("ไม่มีโครงการอื่นให้ย้าย", "error");
        }
        return;
      }

      const promptDialog = document.createElement("dialog");
      promptDialog.className = "tree-dialog";
      promptDialog.style.maxWidth = "440px";
      promptDialog.style.padding = "20px";
      promptDialog.style.borderRadius = "12px";

      const currentProj = projects.find((p) => p.id === node.parentId);
      const currentName = currentProj ? currentProj.title : "โหนดหลัก";

      promptDialog.innerHTML = `
        <div style="display:flex;flex-direction:column;gap:14px;">
          <div style="display:flex;justify-content:space-between;align-items:center;">
            <h3 style="margin:0;font-size:1.1rem;color:#171329;">ย้ายหัวข้อไปยังโครงการอื่น</h3>
            <button type="button" class="icon-button" style="border:0;background:transparent;font-size:1.2rem;cursor:pointer;">×</button>
          </div>
          <p style="margin:0;font-size:0.86rem;color:#555060;">
            หัวข้อ: <strong>${node.title}</strong><br>
            ปัจจุบันอยู่ใต้: <em>${currentName}</em>
          </p>
          <label style="display:flex;flex-direction:column;gap:6px;font-size:0.86rem;font-weight:600;color:#171329;">
            เลือกโครงการปลายทาง
            <select id="_targetMoveProjSelect" style="padding:8px 10px;border-radius:6px;border:1px solid #ccc;font-size:0.9rem;">
              ${availableProjects.map((p) => `<option value="${p.id}">${p.title} (${p.id})</option>`).join("")}
            </select>
          </label>
          <div style="display:flex;justify-content:flex-end;gap:8px;margin-top:8px;">
            <button type="button" id="_cancelMoveBtn" class="button secondary" style="padding:6px 14px;border-radius:6px;">ยกเลิก</button>
            <button type="button" id="_confirmMoveBtn" class="button primary" style="padding:6px 14px;border-radius:6px;background:#9f731c;color:#fff;">ยืนยันการย้าย</button>
          </div>
        </div>
      `;

      document.body.appendChild(promptDialog);
      promptDialog.showModal();

      const closeDialog = () => {
        promptDialog.close();
        promptDialog.remove();
      };

      promptDialog.querySelector(".icon-button").addEventListener("click", closeDialog);
      promptDialog.querySelector("#_cancelMoveBtn").addEventListener("click", closeDialog);

      promptDialog.querySelector("#_confirmMoveBtn").addEventListener("click", async () => {
        const select = promptDialog.querySelector("#_targetMoveProjSelect");
        const newParentId = select ? select.value : "";
        if (!newParentId) return;

        closeDialog();

        // คำนวณลำดับท้ายสุดของโครงการปลายทาง
        const appState = window._appState;
        const targetSiblings = (appState?.siteNodes || []).filter(
          (n) => (n.parentId || "") === newParentId && !n.deletedAt
        );
        const maxOrder = targetSiblings.reduce((max, s) => Math.max(max, Number(s.order) || 0), 0);
        const newOrder = maxOrder + 10;

        if (typeof window._saveNodeReorder === "function") {
          await window._saveNodeReorder(
            [{ id: node.id, parentId: newParentId, order: newOrder }],
            `ย้ายหัวข้อไปยังโครงการเรียบร้อยแล้ว`
          );
        }
      });
    }

    // ติดตั้ง Event Drag & Drop
    function setupDragAndDropEvents() {
      if (!boardEl) return;

      // 1. จัดการการ์ดย่อย (Cards)
      const cards = boardEl.querySelectorAll(".sitemap-card");
      cards.forEach((card) => {
        card.addEventListener("dragstart", (e) => {
          draggedNodeId = card.dataset.nodeId;
          draggedSourceParentId = card.dataset.parentId;
          draggedType = "card";
          card.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", draggedNodeId);
        });

        card.addEventListener("dragend", () => {
          card.classList.remove("is-dragging");
          cleanDropIndicators();
          draggedNodeId = null;
          draggedSourceParentId = null;
          draggedType = null;
        });

        card.addEventListener("dragover", (e) => {
          if (draggedType !== "card" || !draggedNodeId || draggedNodeId === card.dataset.nodeId) return;
          e.preventDefault();
          e.stopPropagation();
          e.dataTransfer.dropEffect = "move";

          const rect = card.getBoundingClientRect();
          const midY = rect.top + rect.height / 2;
          card.classList.remove("drag-over-top", "drag-over-bottom");
          if (e.clientY < midY) {
            card.classList.add("drag-over-top");
          } else {
            card.classList.add("drag-over-bottom");
          }
        });

        card.addEventListener("dragleave", (e) => {
          card.classList.remove("drag-over-top", "drag-over-bottom");
        });

        card.addEventListener("drop", async (e) => {
          if (draggedType !== "card" || !draggedNodeId || draggedNodeId === card.dataset.nodeId) return;
          e.preventDefault();
          e.stopPropagation();

          const targetNodeId = card.dataset.nodeId;
          const targetParentId = card.dataset.parentId;
          const rect = card.getBoundingClientRect();
          const isBefore = e.clientY < rect.top + rect.height / 2;

          card.classList.remove("drag-over-top", "drag-over-bottom");
          await handleCardDrop(draggedNodeId, targetNodeId, targetParentId, isBefore);
        });
      });

      // 2. จัดการโซนวางของโครงการ (Lane Drop Zones)
      const dropZones = boardEl.querySelectorAll(".sitemap-drop-zone");
      dropZones.forEach((zone) => {
        zone.addEventListener("dragover", (e) => {
          if (draggedType !== "card" || !draggedNodeId) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          zone.classList.add("drag-over");
        });

        zone.addEventListener("dragleave", (e) => {
          zone.classList.remove("drag-over");
        });

        zone.addEventListener("drop", async (e) => {
          if (draggedType !== "card" || !draggedNodeId) return;
          // ถ้า drop ตกที่ตัวการ์ด จะถูกจับโดย card.drop แล้ว
          if (e.target.closest(".sitemap-card")) return;

          e.preventDefault();
          e.stopPropagation();
          zone.classList.remove("drag-over");

          const targetParentId = zone.dataset.targetParentId;
          if (!targetParentId) return;

          await handleCardDropIntoLane(draggedNodeId, targetParentId);
        });
      });

      // 3. จัดการสลับลำดับโครงการหลัก (Lanes)
      const lanes = boardEl.querySelectorAll(".sitemap-lane");
      lanes.forEach((lane) => {
        lane.addEventListener("dragstart", (e) => {
          // ถ้ากำลังลากการ์ดย่อยในคอลัมน์ ไม่ให้เริ่ม drag ของ lane
          if (e.target.closest(".sitemap-card")) return;
          draggedNodeId = lane.dataset.laneId;
          draggedType = "lane";
          lane.classList.add("is-dragging");
          e.dataTransfer.effectAllowed = "move";
          e.dataTransfer.setData("text/plain", draggedNodeId);
        });

        lane.addEventListener("dragend", () => {
          lane.classList.remove("is-dragging");
          cleanDropIndicators();
          draggedNodeId = null;
          draggedType = null;
        });

        lane.addEventListener("dragover", (e) => {
          if (draggedType !== "lane" || !draggedNodeId || draggedNodeId === lane.dataset.laneId) return;
          e.preventDefault();
          e.dataTransfer.dropEffect = "move";
          lane.classList.add("drag-over");
        });

        lane.addEventListener("dragleave", () => {
          lane.classList.remove("drag-over");
        });

        lane.addEventListener("drop", async (e) => {
          if (draggedType !== "lane" || !draggedNodeId || draggedNodeId === lane.dataset.laneId) return;
          e.preventDefault();
          lane.classList.remove("drag-over");

          const targetLaneId = lane.dataset.laneId;
          await handleLaneReorder(draggedNodeId, targetLaneId);
        });
      });
    }

    function cleanDropIndicators() {
      document.querySelectorAll(".drag-over-top, .drag-over-bottom, .drag-over").forEach((el) => {
        el.classList.remove("drag-over-top", "drag-over-bottom", "drag-over");
      });
    }

    // ประมวลผลเมื่อปล่อยการ์ดลงบนการ์ดอื่น
    async function handleCardDrop(sourceId, targetId, targetParentId, insertBefore) {
      const appState = window._appState;
      if (!appState || !Array.isArray(appState.siteNodes)) return;

      // ตรวจสอบการวนซ้ำ (ห้ามย้ายแม่ไปไว้ใต้ลูกของตัวเอง)
      if (typeof window._getTreeDescendants === "function") {
        const descendants = window._getTreeDescendants(sourceId);
        if (descendants.has(targetParentId) || descendants.has(targetId)) {
          if (typeof window._showPortalToast === "function") {
            window._showPortalToast("ไม่สามารถย้ายหัวข้อหลักไปไว้ใต้หัวข้อย่อยของตนเองได้", "error");
          }
          return;
        }
      }

      // ดึงพี่น้องทั้งหมดในโฟลเดอร์ปลายทาง
      let siblings = appState.siteNodes
        .filter((n) => (n.parentId || "") === targetParentId && !n.deletedAt && n.id !== sourceId)
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title).localeCompare(String(b.title), "th"));

      const targetIdx = siblings.findIndex((s) => s.id === targetId);
      const insertIdx = targetIdx < 0 ? siblings.length : insertBefore ? targetIdx : targetIdx + 1;

      const sourceNode = appState.siteNodes.find((n) => n.id === sourceId);
      if (!sourceNode) return;

      const updatedSource = { ...sourceNode, parentId: targetParentId };
      siblings.splice(insertIdx, 0, updatedSource);

      // กำหนดค่า order ใหม่ทีละ 10
      const updates = siblings.map((node, idx) => ({
        id: node.id,
        order: (idx + 1) * 10,
        parentId: targetParentId,
      }));

      const isMovedToDifferentProject = sourceNode.parentId !== targetParentId;
      const successMsg = isMovedToDifferentProject ? "ย้ายหัวข้อไปยังโครงการใหม่แล้ว" : "จัดเรียงลำดับหัวข้อเรียบร้อยแล้ว";

      if (typeof window._saveNodeReorder === "function") {
        await window._saveNodeReorder(updates, successMsg);
      }
    }

    // ประมวลผลเมื่อปล่อยการ์ดลงบนโซนว่างของโครงการ
    async function handleCardDropIntoLane(sourceId, targetParentId) {
      const appState = window._appState;
      if (!appState || !Array.isArray(appState.siteNodes)) return;

      if (typeof window._getTreeDescendants === "function") {
        const descendants = window._getTreeDescendants(sourceId);
        if (descendants.has(targetParentId)) {
          if (typeof window._showPortalToast === "function") {
            window._showPortalToast("ไม่สามารถย้ายหัวข้อหลักไปไว้ใต้หัวข้อย่อยของตนเองได้", "error");
          }
          return;
        }
      }

      const sourceNode = appState.siteNodes.find((n) => n.id === sourceId);
      if (!sourceNode) return;

      let siblings = appState.siteNodes
        .filter((n) => (n.parentId || "") === targetParentId && !n.deletedAt && n.id !== sourceId)
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

      siblings.push(sourceNode);

      const updates = siblings.map((node, idx) => ({
        id: node.id,
        order: (idx + 1) * 10,
        parentId: targetParentId,
      }));

      if (typeof window._saveNodeReorder === "function") {
        await window._saveNodeReorder(updates, "ย้ายหัวข้อเข้าโครงการเรียบร้อยแล้ว");
      }
    }

    // ประมวลผลเมื่อสลับโครงการหลัก (Lanes)
    async function handleLaneReorder(sourceLaneId, targetLaneId) {
      const appState = window._appState;
      if (!appState || !Array.isArray(appState.siteNodes)) return;

      let rootProjects = appState.siteNodes
        .filter(
          (n) =>
            !n.deletedAt &&
            (n.type === "project" ||
              n.parentId === "" ||
              n.parentId === "site-root" ||
              !appState.siteNodes.some((p) => p.id === n.parentId))
        )
        .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

      const sourceIdx = rootProjects.findIndex((p) => p.id === sourceLaneId);
      const targetIdx = rootProjects.findIndex((p) => p.id === targetLaneId);
      if (sourceIdx < 0 || targetIdx < 0) return;

      const [removed] = rootProjects.splice(sourceIdx, 1);
      rootProjects.splice(targetIdx, 0, removed);

      const updates = rootProjects.map((p, idx) => ({
        id: p.id,
        order: (idx + 1) * 10,
        parentId: p.parentId || "",
      }));

      if (typeof window._saveNodeReorder === "function") {
        await window._saveNodeReorder(updates, "จัดเรียงลำดับโครงการหลักเรียบร้อยแล้ว");
      }
    }

    // 4. ติดตั้งระบบ Drag & Drop บนผังรายการต้นไม้แบบดั้งเดิม (#siteTree)
    function setupSiteTreeDragAndDrop() {
      if (!siteTree) return;

      siteTree.addEventListener("dragstart", (e) => {
        const nodeBtn = e.target.closest(".tree-node");
        if (!nodeBtn) return;
        draggedNodeId = nodeBtn.dataset.nodeId;
        draggedSourceParentId = nodeBtn.dataset.parentId;
        nodeBtn.classList.add("is-dragging");
        e.dataTransfer.effectAllowed = "move";
        e.dataTransfer.setData("text/plain", draggedNodeId);
      });

      siteTree.addEventListener("dragend", (e) => {
        const nodeBtn = e.target.closest(".tree-node");
        if (nodeBtn) nodeBtn.classList.remove("is-dragging");
        cleanDropIndicators();
        draggedNodeId = null;
        draggedSourceParentId = null;
      });

      siteTree.addEventListener("dragover", (e) => {
        const nodeBtn = e.target.closest(".tree-node");
        if (!nodeBtn || !draggedNodeId || nodeBtn.dataset.nodeId === draggedNodeId) return;
        e.preventDefault();
        e.dataTransfer.dropEffect = "move";

        const rect = nodeBtn.getBoundingClientRect();
        const midY = rect.top + rect.height / 2;
        nodeBtn.classList.remove("drag-over-top", "drag-over-bottom");
        if (e.clientY < midY) {
          nodeBtn.classList.add("drag-over-top");
        } else {
          nodeBtn.classList.add("drag-over-bottom");
        }
      });

      siteTree.addEventListener("dragleave", (e) => {
        const nodeBtn = e.target.closest(".tree-node");
        if (nodeBtn) nodeBtn.classList.remove("drag-over-top", "drag-over-bottom");
      });

      siteTree.addEventListener("drop", async (e) => {
        const nodeBtn = e.target.closest(".tree-node");
        if (!nodeBtn || !draggedNodeId || nodeBtn.dataset.nodeId === draggedNodeId) return;
        e.preventDefault();
        nodeBtn.classList.remove("drag-over-top", "drag-over-bottom");

        const targetNodeId = nodeBtn.dataset.nodeId;
        const targetParentId = nodeBtn.dataset.parentId;
        const rect = nodeBtn.getBoundingClientRect();
        const isBefore = e.clientY < rect.top + rect.height / 2;

        await handleCardDrop(draggedNodeId, targetNodeId, targetParentId, isBefore);
      });
    }

    setupSiteTreeDragAndDrop();

    // เผยแพร่ฟังก์ชันให้ระบบอื่นเรียกใช้งาน
    window._renderInteractiveSiteMap = renderInteractiveSiteMap;

    // ตรวจสอบการเปิด dialog
    if (treeDialog) {
      const observer = new MutationObserver(() => {
        if (treeDialog.open) {
          renderInteractiveSiteMap();
        }
      });
      observer.observe(treeDialog, { attributes: true, attributeFilter: ["open"] });
    }
  }

  // เรียกใช้งานทันทีเมื่อโหลดเสร็จ
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", _initInteractiveSiteMap);
  } else {
    _initInteractiveSiteMap();
  }
})();

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _initUiHelpers);
} else {
  _initUiHelpers();
}