function _thaiTimestamp(){const d=new Date(),y=d.getFullYear()+543,m=String(d.getMonth()+1).padStart(2,"0"),day=String(d.getDate()).padStart(2,"0"),h=String(d.getHours()).padStart(2,"0"),min=String(d.getMinutes()).padStart(2,"0"),s=String(d.getSeconds()).padStart(2,"0");return `${y}${m}${day}_${h}${min}${s}`;}import{initializeApp as Mn,getApps as ir,getApp as sr}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";import{getAuth as Bn,setPersistence as lr,browserLocalPersistence as dr,onAuthStateChanged as Rn,signOut as cr,GoogleAuthProvider as ur,signInWithPopup as pr}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";import{initializeFirestore as _initFS,getFirestore as Pn,onSnapshot as ae,query as te,orderBy as fe,limit as Zt,getDoc as ge,setDoc as V,serverTimestamp as I,writeBatch as pe,doc as j,deleteField as K,updateDoc as en,addDoc as Re,collection as be,deleteDoc as dt,getDocs as Se,where as gt}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";import{getStorage as Un,uploadBytes as Ot,ref as ce,getDownloadURL as zt,deleteObject as De}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";import{getFunctions as mr,httpsCallable as hr}from"https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";(function(){const t=document.createElement("link").relList;if(t&&t.supports&&t.supports("modulepreload"))return;for(const a of document.querySelectorAll('link[rel="modulepreload"]'))o(a);new MutationObserver(a=>{for(const r of a)if(r.type==="childList")for(const s of r.addedNodes)s.tagName==="LINK"&&s.rel==="modulepreload"&&o(s)}).observe(document,{childList:!0,subtree:!0});function n(a){const r={};return a.integrity&&(r.integrity=a.integrity),a.referrerPolicy&&(r.referrerPolicy=a.referrerPolicy),a.crossOrigin==="use-credentials"?r.credentials="include":a.crossOrigin==="anonymous"?r.credentials="omit":r.credentials="same-origin",r}function o(a){if(a.ep)return;a.ep=!0;const r=n(a);fetch(a.href,r)}})();

/* Hoisted Core App State Variables & Functions */
window._MEDIA_SECTION_NAMES = {
  hero: "ภาพหลักด้านบน",
  storyFeature: "พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา",
  storyArt: "พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",
  storyPeople: "พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",
  criteriaOne: "คุณค่าโดดเด่นหมายเลข 1",
  criteriaTwo: "คุณค่าโดดเด่นหมายเลข 2",
  criteriaThree: "คุณค่าโดดเด่นหมายเลข 3",
  processOverview: "สไลด์ภาพรวม — งานที่ต้องทำร่วมกัน",
  processOne: "งานที่ต้องทำร่วมกัน ข้อ 1",
  processTwo: "งานที่ต้องทำร่วมกัน ข้อ 2",
  processThree: "งานที่ต้องทำร่วมกัน ข้อ 3",
  processFour: "งานที่ต้องทำร่วมกัน ข้อ 4",
  milestoneOne: "หมุดหมายสำคัญ ข้อ 1",
  milestoneTwo: "หมุดหมายสำคัญ ข้อ 2",
  milestoneThree: "หมุดหมายสำคัญ ข้อ 3",
  milestoneFour: "หมุดหมายสำคัญ ข้อ 4",
  story: "เรื่องราวแห่งศรัทธา",
  criteria: "คุณค่าโดดเด่นเป็นสากล",
  milestones: "หมุดหมายสำคัญ",
  videos: "คลังวิดีโอ",
  muchalindaHero: "ภาพนำ — โครงการบูรณะสระมุจลินท์",
  muchalindaShowcase: "สไลด์ภาพและแนวคิด — โครงการบูรณะสระมุจลินท์",
  muchalindaCardHistory: "ความเป็นมาและความสำคัญ (สระมุจลินท์ การ์ด 1)",
  muchalindaCardRestoration: "การฟื้นฟูและอนุรักษ์ภูมิทัศน์ (สระมุจลินท์ การ์ด 2)",
  muchalindaDonation: "ร่วมบุญ — โครงการบูรณะสระมุจลินท์",
  general: "ทั่วไป"
};
let _navScrollLockUntil = 0;
let _currentActiveTarget = "#top";

const _DEFAULT_TOP_NAV = [
  { id: "nav-top", titleTh: "หน้าหลัก", titleLo: "ໜ້າຫຼັກ", titleEn: "Home", targetUrl: "#top", order: 10, published: true, icon: "home" },
  { id: "nav-history", titleTh: "เรื่องราว", titleLo: "ເລື່ອງລາວ", titleEn: "Story", targetUrl: "#history", order: 20, published: true, icon: "book" },
  { id: "nav-world", titleTh: "สู่มรดกโลก", titleLo: "ສູ່ມໍລະດົກໂລກ", titleEn: "World Heritage", targetUrl: "#world-heritage", order: 30, published: true, icon: "globe" },
  { id: "nav-projects", titleTh: "โครงการ", titleLo: "ໂຄງການ", titleEn: "Projects", targetUrl: "#projects", order: 40, published: true, icon: "folder" }
];

const _MUCHALINDA_TOP_NAV = [
  { id: "nav-main-portal", titleTh: "← หน้าหลัก", titleLo: "← ໜ້າຫຼັກພະທາດພະນົມ", titleEn: "← Main Portal", targetUrl: "#top", order: 5, published: true, icon: "home", isReturn: true },
  { id: "nav-mucha-overview", titleTh: "ภาพรวม", titleLo: "ພາບລວມ", titleEn: "Overview", targetUrl: "#muchalinda-project", order: 10, published: true, icon: "globe" },
  { id: "nav-mucha-history", titleTh: "ความเป็นมา", titleLo: "ความเปนมา", titleEn: "History", targetUrl: "#muchalinda-history", order: 20, published: true, icon: "book" },
  { id: "nav-mucha-objectives", titleTh: "วัตถุประสงค์", titleLo: "ວັດຖຸປະສົງ", titleEn: "Objectives", targetUrl: "#muchalinda-objectives", order: 30, published: true, icon: "folder" },
  { id: "nav-mucha-progress", titleTh: "ความคืบหน้า", titleLo: "ຄວາມຄືບໜ້າ", titleEn: "Progress", targetUrl: "#muchalinda-progress", order: 40, published: true, icon: "newspaper" },
  { id: "nav-mucha-donation", titleTh: "ร่วมบุญ", titleLo: "ຮ່ວມບຸນ", titleEn: "Donation", targetUrl: "#muchalinda-donation", order: 50, published: true, icon: "heart" },
  { id: "nav-mucha-album", titleTh: "อัลบั้มรูปภาพ", titleLo: "ອັນບັ້ມຮູບພາບ", titleEn: "Photo Album", targetUrl: "#muchalinda-album", order: 60, published: true, icon: "film" }
];

let _forcedMuchalindaMode = null;
function _isMuchalindaActiveMode() {
  if (_forcedMuchalindaMode !== null) return _forcedMuchalindaMode;
  if (location.hostname.toLowerCase().includes("muchalin")) return true;
  const hash = location.hash || "";
  return hash === "#muchalinda-project" || hash.startsWith("#muchalinda-");
}
function _setMuchalindaActiveMode(active) {
  _forcedMuchalindaMode = (active === null ? null : Boolean(active));
}
/* Site Maintenance & Publishing Control */
let _sitePublished = false;
let _siteStatusLoaded = false;

function _updateSiteStatusUI() {
  const queryFn = (typeof c === "function" ? c : (typeof i === "function" ? i : (s => document.querySelector(s))));
  const isAdmin = (typeof Y === "function" && Y()) || (typeof D === "function" && D()) || (typeof _checkIsAdmin === "function" && _checkIsAdmin());
  const overlay = queryFn("#maintenanceOverlay");
  const badge = queryFn("#siteStatusBadge");
  const toggle = queryFn("#sitePublishedToggle");
  const label = queryFn("#statusSwitchLabel");
  const sub = queryFn("#statusSwitchSub");
  
  if (badge) {
    badge.textContent = _sitePublished ? "เผยแพร่แล้ว" : "กำลังพัฒนา";
    badge.style.color = _sitePublished ? "#79c28b" : "#efd98e";
  }
  if (toggle) {
    toggle.checked = _sitePublished;
  }
  if (label && sub) {
    if (_sitePublished) {
      label.textContent = "สถานะปัจจุบัน: เปิดเผยแพร่สาธารณะ";
      sub.textContent = "ทุกคนสามารถเข้าชมเนื้อหาเว็บไซต์ได้ตามปกติ";
    } else {
      label.textContent = "สถานะปัจจุบัน: กำลังพัฒนา";
      sub.textContent = "บุคคลทั่วไปจะเห็นหน้าจอ กำลังพัฒนา โปรดเข้ามาชมใหม่ภายหลัง";
    }
  }
  // Handle overlay visibility
  if (overlay) {
    if (isAdmin) {
      overlay.hidden = true;
    } else {
      overlay.hidden = _sitePublished;
    }
  }
}

const Ht={apiKey:"AIzaSyBN2djvFSWNyoDpg8158rukRy1BhBXc090",authDomain:"that-phanom.firebaseapp.com",projectId:"that-phanom",storageBucket:"that-phanom.firebasestorage.app",messagingSenderId:"1003681232767",appId:"1:1003681232767:web:d928d98fb33c913c310c4a",measurementId:"G-GDH4154GNT"},tn="jaru072@gmail.com",Ke="world-heritage",U={users:"users",projects:"projects",members:"members",media:"media",content:"content",siteNodes:"siteNodes",comments:"comments",chats:"chatThreads",settings:"settings"},ie={hero:"ภาพหลักด้านบน",storyFeature:"พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา",storyArt:"พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",storyPeople:"พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",criteriaOne:"คุณค่าโดดเด่นหมายเลข 1",criteriaTwo:"คุณค่าโดดเด่นหมายเลข 2",criteriaThree:"คุณค่าโดดเด่นหมายเลข 3",processOverview:"สไลด์ภาพรวม — งานที่ต้องทำร่วมกัน",processOne:"งานที่ต้องทำร่วมกัน ข้อ 1",processTwo:"งานที่ต้องทำร่วมกัน ข้อ 2",processThree:"งานที่ต้องทำร่วมกัน ข้อ 3",processFour:"งานที่ต้องทำร่วมกัน ข้อ 4",milestoneOne:"หมุดหมายสำคัญ ข้อ 1",milestoneTwo:"หมุดหมายสำคัญ ข้อ 2",milestoneThree:"หมุดหมายสำคัญ ข้อ 3",milestoneFour:"หมุดหมายสำคัญ ข้อ 4",story:"เรื่องราวแห่งศรัทธา",criteria:"คุณค่าโดดเด่นเป็นสากล",milestones:"หมุดหมายสำคัญ",videos:"คลังวิดีโอจาก Google Drive",muchalindaHero:"ภาพนำ — โครงการบูรณะสระมุจลินท์",muchalindaShowcase:"สไลด์ภาพและแนวคิด — โครงการบูรณะสระมุจลินท์",muchalindaCardHistory:"ความเป็นมาและความสำคัญ (สระมุจลินท์ การ์ด 1)",muchalindaCardRestoration:"การฟื้นฟูและอนุรักษ์ภูมิทัศน์ (สระมุจลินท์ การ์ด 2)",muchalindaDonation:"ร่วมบุญ — โครงการบูรณะสระมุจลินท์"},vt=[{id:"seed-story-photo",section:"story",type:"image",title:"องค์พระธาตุพนม ศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-story-video",section:"story",type:"video",title:"บทเพลงพระธาตุพนม สู่มรดกโลก ไทย–ลาว",url:"https://www.youtube.com/watch?v=bcmI5siLdzQ",order:20},{id:"seed-criteria-video",section:"criteria",type:"video",title:"รายงานการผลักดันพระธาตุพนม สู่มรดกโลก",url:"https://www.youtube.com/watch?v=ldhfgggHQxY",order:10},{id:"seed-milestones-video",section:"milestones",type:"video",title:"พระธาตุพนม สู่มรดกโลก — สารคดีสั้น",url:"https://www.youtube.com/watch?v=3Cws-7bMvHE",order:10}],wt={id:"seed-story-feature-photo",section:"story",placement:"feature01",type:"image",title:"องค์พระธาตุพนม ศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",description:"ปูชนียสถานสำคัญที่เชื่อมโยงศรัทธา ประวัติศาสตร์ และวิถีชีวิตของผู้คนสองฝั่งโขง",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},Ge={id:"seed-story-art-photo",section:"story",placement:"feature02",type:"image",title:"ร่องรอยศิลปกรรมแห่งลุ่มน้ำโขง",description:"รูปแบบสถาปัตยกรรมและงานช่างที่สืบทอดและพัฒนาผ่านหลายยุคสมัย",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},Ye={id:"seed-story-people-photo",section:"story",placement:"feature03",type:"image",title:"ศูนย์รวมศรัทธาของผู้คนสองฝั่งโขง",description:"พระธาตุพนมเชื่อมโยงผู้คนไทย ลาว และชุมชนลุ่มน้ำโขงผ่านศรัทธาและประเพณีที่สืบต่อกันมา",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},Qe={id:"seed-criteria-one-photo",section:"criteria",placement:"criterion01",type:"image",title:"ผลงานสร้างสรรค์อันเป็นเลิศ",description:"สถาปัตยกรรมพุทธศิลป์ที่ผสานรากศิลปะโบราณกับจิตวิญญาณและงานช่างแห่งลุ่มน้ำโขงอย่างมีเอกลักษณ์",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},Je={id:"seed-criteria-two-photo",section:"criteria",placement:"criterion02",type:"image",title:"การแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",description:"วิวัฒนาการของรูปแบบพระธาตุสะท้อนการพบกันของความเชื่อท้องถิ่นกับพุทธศาสนา",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},Xe={id:"seed-criteria-three-photo",section:"criteria",placement:"criterion03",type:"image",title:"สัมพันธ์กับความเชื่อที่ยังดำรงอยู่",description:"เชื่อมโยงกับการบูชาพระบรมสารีริกธาตุ ตำนานอุรังคธาตุ และประเพณีศักดิ์สิทธิ์ที่ยังสืบทอด",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},me=[{id:"seed-process-one-photo",section:"process",placement:"step01",type:"image",title:"กำหนดคุณค่าและขอบเขต",description:"ศึกษาองค์ประกอบสำคัญ พื้นที่หลัก และพื้นที่กันชน",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-process-two-photo",section:"process",placement:"step02",type:"image",title:"จัดทำแผนอนุรักษ์และบริหาร",description:"คุ้มครองโบราณสถาน ภูมิทัศน์ ประเพณี และวิถีชุมชนอย่างสมดุล",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-process-three-photo",section:"process",placement:"step03",type:"image",title:"สร้างการมีส่วนร่วม",description:"คณะสงฆ์ ชุมชน นักวิชาการ ภาครัฐ ภาคเอกชน และเยาวชนร่วมกำหนดอนาคต",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-process-four-photo",section:"process",placement:"step04",type:"image",title:"จัดทำเอกสารเสนอชื่อ",description:"รวบรวมหลักฐานและแผนงานเป็น Nomination Dossier เพื่อเข้าสู่กระบวนการ UNESCO",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10}],Ze={id:"seed-process-overview-photo",section:"process",placement:"overview",type:"image",title:"งานที่ต้องทำร่วมกัน",description:"จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน ทุกภาคส่วนร่วมอนุรักษ์และส่งต่อคุณค่าพระธาตุพนม",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},he=[{id:"seed-milestone-one-photo",section:"milestones",placement:"milestone01",type:"image",title:"โครงสร้างยุคแรก",description:"หลักฐานจากการขุดค้นระบุอายุห้องอิฐชั้นในราวคริสต์ศตวรรษที่ 7–8",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-milestone-two-photo",section:"milestones",placement:"milestone02",type:"image",title:"โบราณสถานของชาติ",description:"กรมศิลปากรประกาศขึ้นทะเบียนเพื่อการอนุรักษ์และคุ้มครอง",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-milestone-three-photo",section:"milestones",placement:"milestone03",type:"image",title:"ล้มและฟื้นคืน",description:"องค์พระธาตุล้มจากพายุฝน ก่อนบูรณะด้วยความร่วมแรงร่วมใจจากทั่วประเทศและภูมิภาค",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},{id:"seed-milestone-four-photo",section:"milestones",placement:"milestone04",type:"image",title:"ก้าวสู่เวทีโลก",description:"ได้รับการบรรจุในบัญชีรายชื่อเบื้องต้นเมื่อวันที่ 2 กุมภาพันธ์ พ.ศ. 2560",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10}],jn={id:"seed-hero-photo",section:"story",placement:"hero",type:"image",title:"องค์พระธาตุพนม",description:"พระธาตุพนม ปูชนียสถานสำคัญและศูนย์รวมศรัทธาของผู้คนสองฝั่งโขง",url:"https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",order:10},et=[{id:"seed-muchalinda-donation",section:"muchalinda",placement:"donation",type:"image",title:"ร่วมบุญบูรณะสระมุจลินท์",description:"ธนาคารออมสิน สาขาธาตุพนม เลขที่บัญชี 0204-613-1196-9 โปรดตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง",url:"assets/donation-muchalinda.png",order:10},{id:"seed-muchalinda-road-drainage",section:"muchalinda",placement:"donation",type:"image",title:"ร่วมบุญปรับปรุงถนนและระบบระบายน้ำ",description:"ธนาคารออมสิน สาขาธาตุพนม เลขที่บัญชี 0204-889-2517-1 โปรดตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง",url:"assets/donation-road-drainage.jpg",order:20}],tt={id:"seed-muchalinda-hero",section:"muchalinda",placement:"hero",type:"image",title:"ภาพประกอบแนวคิดสระมุจลินท์",description:"ภาพประกอบแนวคิดเพื่อสื่อบรรยากาศหลังการบูรณะและปรับภูมิทัศน์ ไม่ใช่ภาพบันทึกสภาพปัจจุบัน",url:"assets/muchalinda-hero.webp",originalUrl:"assets/muchalinda-hero-original.png",order:10},p={user:null,role:"guest",media:[...vt,wt,Ge,Ye,Qe,Je,Xe,Ze,...me,...he,tt,...et],mediaInitialized:!1,mediaLoaded:!1,usingFallbackMedia:!0,slideIndex:{hero:0,storyFeature:0,storyArt:0,storyPeople:0,criteriaOne:0,criteriaTwo:0,criteriaThree:0,processOverview:0,processOne:0,processTwo:0,processThree:0,processFour:0,milestoneOne:0,milestoneTwo:0,milestoneThree:0,milestoneFour:0,story:0,criteria:0,milestones:0,muchalindaHero:0,muchalindaShowcase:0,muchalindaCardHistory:0,muchalindaCardRestoration:0,muchalindaDonation:0},slideAutoStopped:{hero:!1,storyFeature:!1,storyArt:!1,storyPeople:!1,criteriaOne:!1,criteriaTwo:!1,criteriaThree:!1,processOverview:!1,processOne:!1,processTwo:!1,processThree:!1,processFour:!1,milestoneOne:!1,milestoneTwo:!1,milestoneThree:!1,milestoneFour:!1,story:!1,criteria:!1,milestones:!1,muchalindaHero:!1,muchalindaShowcase:!1,muchalindaCardHistory:!1,muchalindaCardRestoration:!1,muchalindaDonation:!1},editingMedia:null,manageSection:"",siteNodes:[],portalContent:[],driveSyncStatus:null,driveSyncBusy:!1,selectedTreeNodeId:"",treeShowTrash:!1,activeChatUid:null,unsubMessages:null,unsubThreads:null},fr=5500,gr=30*1024*1024,wn=10*1024*1024,Wt=new Map;let We,we,X,ke,En,qt;try{if(Object.values(Ht).some(e=>!e||String(e).startsWith("PASTE_")))throw new Error("Firebase web configuration is incomplete");We=Mn(Ht),we=Bn(We),X=Pn(We),ke=Un(We),En=mr(We,"asia-southeast1"),qt=hr(En,"syncDriveMediaNow"),lr(we,dr).catch(e=>console.warn("Auth persistence unavailable",e))}catch(e){console.error("Firebase initialization failed",e)}const c=(e,t=document)=>t.querySelector(e),Lt=(e,t=document)=>[...t.querySelectorAll(e)],Y=()=>p.role==="admin",Vt=()=>p.role==="admin"||p.role==="manager",Ne=e=>({admin:"Admin",manager:"Manager",user:"User",guest:"บุคคลทั่วไป"})[e]||"User",br=()=>be(X,U.users),yr=e=>j(X,U.users,e),nn=()=>j(X,U.projects,Ke),Ee=e=>be(nn(),e),Q=(e,t)=>j(nn(),e,t),$n=e=>Q(U.members,e),Fn=e=>be(Q(U.chats,e),"messages");function A(e,t=""){const n=c("#toast");n.textContent=e,n.dataset.tone=t,n.classList.add("show"),clearTimeout(A.timer),A.timer=setTimeout(()=>n.classList.remove("show"),2600)}function rn(e){const t=e!=null&&e.toDate?e.toDate():e?new Date(e):new Date;return new Intl.DateTimeFormat("th-TH",{dateStyle:"medium",timeStyle:"short"}).format(t)}function ye(e){try{const t=String(e||"").trim();if(!t)return"";const n=new URL(t,location.href);return n.origin===location.origin||n.protocol==="https:"?n.href:""}catch{return""}}function _isFacebookVideo(e){if(!e||typeof e!=="string")return!1;const t=e.trim().toLowerCase();if(!t.includes("facebook.com")&&!t.includes("fb.watch")&&!t.includes("fb.gg"))return!1;return/(?:facebook\.com\/(?:reel\/|watch\/?(?:\?|$)|.*?\/videos\/|video\.php|share\/[rv]\/)|fb\.watch\/)/i.test(t)}function _isFacebookReel(e){if(!e||typeof e!=="string")return!1;const t=e.trim().toLowerCase();return t.includes("/reel/")||t.includes("/share/r/")||t.includes("reel_id")}function _getFacebookEmbedUrl(e){if(!_isFacebookVideo(e))return"";const t=String(e).trim();return"https://www.facebook.com/plugins/video.php?href="+encodeURIComponent(t)+"&show_text=false&width=auto"}function _getTikTokId(e){if(!e||typeof e!=="string")return"";const t=e.trim();const m=t.match(/(?:tiktok\.com\/(?:@[^/]+\/video\/|v\/|embed(?:\/v2)?\/|player\/v1\/)|\/video\/|\/v\/)(\d+)/i);return m?m[1]:""}function _isTikTokVideo(e){return!!_getTikTokId(e)}function _getTikTokEmbedUrl(e){const id=_getTikTokId(e);return id?"https://www.tiktok.com/player/v1/"+encodeURIComponent(id):""}function On(e){return ia(e)}function nt(e){try{const t=new URL(e),n=t.hostname.toLowerCase();if(n!=="drive.google.com"&&n!=="www.drive.google.com")return"";const o=t.pathname.split("/").filter(Boolean),a=o.indexOf("file");if(a!==-1&&o[a+1]==="d")return/^[\w-]{10,200}$/.test(o[a+2]||"")?o[a+2]:"";const r=t.searchParams.get("id")||"";return/^[\w-]{10,200}$/.test(r)?r:""}catch{return""}}function Tn(e){try{const t=new URL(e).hostname.toLowerCase();return t==="drive.google.com"||t==="www.drive.google.com"}catch{return!1}}function an(e){const t=nt(e);return t?`https://lh3.googleusercontent.com/d/${encodeURIComponent(t)}`:e}function J(e){return e.section==="story"&&e.placement==="hero"?"hero":e.section==="story"&&e.placement==="feature01"?"storyFeature":e.section==="story"&&e.placement==="feature02"?"storyArt":e.section==="story"&&e.placement==="feature03"?"storyPeople":e.section==="criteria"&&e.placement==="criterion01"?"criteriaOne":e.section==="criteria"&&e.placement==="criterion02"?"criteriaTwo":e.section==="criteria"&&e.placement==="criterion03"?"criteriaThree":e.section==="process"&&e.placement==="overview"?"processOverview":e.section==="process"&&e.placement==="step01"?"processOne":e.section==="process"&&e.placement==="step02"?"processTwo":e.section==="process"&&e.placement==="step03"?"processThree":e.section==="process"&&e.placement==="step04"?"processFour":e.section==="milestones"&&e.placement==="milestone01"?"milestoneOne":e.section==="milestones"&&e.placement==="milestone02"?"milestoneTwo":e.section==="milestones"&&e.placement==="milestone03"?"milestoneThree":e.section==="milestones"&&e.placement==="milestone04"?"milestoneFour":e.section==="muchalinda"&&e.placement==="hero"?"muchalindaHero":e.section==="muchalinda"&&e.placement==="showcase"?"muchalindaShowcase":e.section==="muchalinda"&&e.placement==="history"?"muchalindaCardHistory":e.section==="muchalinda"&&e.placement==="restoration"?"muchalindaCardRestoration":e.section==="muchalinda"&&e.placement==="donation"?"muchalindaDonation":e.section}async function vr(e){if("createImageBitmap"in window)try{const n=await createImageBitmap(e,{imageOrientation:"from-image"});return{source:n,width:n.width,height:n.height,cleanup:()=>n.close()}}catch{}const t=URL.createObjectURL(e);try{const n=new Image;return n.decoding="async",n.src=t,await n.decode(),{source:n,width:n.naturalWidth,height:n.naturalHeight,cleanup:()=>URL.revokeObjectURL(t)}}catch(n){throw URL.revokeObjectURL(t),n}}async function compressImageToWebp(e,t=2560,n=2100,o=.86){if(!e)return e;if(!e.type.startsWith("image/")&&!/\.(jpe?g|png|webp|gif|bmp|tiff)$/i.test(e.name))return e;if(e.size>gr)throw new Error("รูปภาพต้นฉบับต้องมีขนาดไม่เกิน 30 MB");const a=await vr(e);try{const r=Math.min(1,t/a.width,n/a.height),s=Math.max(1,Math.round(a.width*r)),u=Math.max(1,Math.round(a.height*r)),l=document.createElement("canvas");l.width=s,l.height=u;const m=l.getContext("2d",{alpha:!0});if(!m)throw new Error("อุปกรณ์นี้ไม่รองรับการปรับขนาดรูปภาพ");m.imageSmoothingEnabled=!0,m.imageSmoothingQuality="high",m.drawImage(a.source,0,0,s,u);const h=await new Promise(k=>l.toBlob(k,"image/webp",o));if(!h)throw new Error("ไม่สามารถบีบอัดรูปภาพเป็น WebP ได้");if(h.size>wn)throw new Error("รูปภาพยังมีขนาดเกิน 10 MB หลังบีบอัด กรุณาเลือกรูปอื่น");if(e.type==="image/webp"&&r===1&&h.size>=e.size&&e.size<=wn)return e;const d=e.name.replace(/\.[^.]+$/,"").replace(/[^a-zA-Z0-9._-]/g,"_")||"image";return new File([h],`${d}.webp`,{type:"image/webp",lastModified:Date.now()})}finally{a.cleanup()}}async function wr(e,t){const n=["storyFeature","storyArt","storyPeople","criteriaOne","criteriaTwo","criteriaThree","processOverview","processOne","processTwo","processThree","processFour","milestoneOne","milestoneTwo","milestoneThree","milestoneFour","muchalindaHero","muchalindaShowcase","muchalindaCardHistory","muchalindaCardRestoration","muchalindaDonation"].includes(t)?{maxWidth:2400,maxHeight:2100,quality:.86}:{maxWidth:2560,maxHeight:1800,quality:.86};return await compressImageToWebp(e,n.maxWidth,n.maxHeight,n.quality)}function Z(e,t,n=""){const o=document.createElement("div");return o.className=`media-slider${n?` ${n}`:""}`,o.dataset.slider=t,o.setAttribute("aria-label",`สไลด์สื่อ: ${ie[t]}`),o.tabIndex=0,o.innerHTML='<div class="media-stage"></div>',e.append(o),o}function ee(e,t,n){const o=document.createElement("button");o.className=`${n} role-only`,o.type="button",o.hidden=!0,o.dataset.section=t,o.textContent="อัพเดท",o.setAttribute("aria-label",`อัพเดทสื่อ: ${ie[t]}`),o.addEventListener("click",()=>Ct(t)),e.append(o)}function Er(){const e=c("#heroMedia");e&&(Z(e,"hero","hero-media-slider"),ee(e,"hero","media-update-button hero-update-button"));const t=c("#storyFeatureMedia");t&&(Z(t,"storyFeature","story-feature-slider"),ee(c("#storyFeatureCard"),"storyFeature","media-update-button feature-media-add"));const n=c("#storyArtMedia");n&&(Z(n,"storyArt","story-mini-slider"),ee(c("#storyArtCard"),"storyArt","media-update-button feature-media-add"));const o=c("#storyPeopleMedia");o&&(Z(o,"storyPeople","story-mini-slider"),ee(c("#storyPeopleCard"),"storyPeople","media-update-button feature-media-add")),[{host:c("#criteriaOneMedia"),card:c("#criteriaOneCard"),key:"criteriaOne"},{host:c("#criteriaTwoMedia"),card:c("#criteriaTwoCard"),key:"criteriaTwo"},{host:c("#criteriaThreeMedia"),card:c("#criteriaThreeCard"),key:"criteriaThree"}].forEach(({host:h,card:d,key:f})=>{!h||!d||(Z(h,f,"criteria-card-slider"),ee(d,f,"media-update-button feature-media-add"))});const a=c("#processOverviewMedia");a&&(Z(a,"processOverview","process-overview-slider"),ee(a,"processOverview","media-update-button process-overview-update")),[{host:c("#processOneMedia"),card:c("#processOneCard"),key:"processOne"},{host:c("#processTwoMedia"),card:c("#processTwoCard"),key:"processTwo"},{host:c("#processThreeMedia"),card:c("#processThreeCard"),key:"processThree"},{host:c("#processFourMedia"),card:c("#processFourCard"),key:"processFour"}].forEach(({host:h,card:d,key:f})=>{!h||!d||(Z(h,f,"process-step-slider"),ee(d,f,"media-update-button feature-media-add"))});const r=c("#milestonesOverviewMedia");r&&(Z(r,"milestones","milestones-overview-slider"),ee(r,"milestones","media-update-button milestones-overview-update")),[{host:c("#milestoneOneMedia"),card:c("#milestoneOneCard"),key:"milestoneOne"},{host:c("#milestoneTwoMedia"),card:c("#milestoneTwoCard"),key:"milestoneTwo"},{host:c("#milestoneThreeMedia"),card:c("#milestoneThreeCard"),key:"milestoneThree"},{host:c("#milestoneFourMedia"),card:c("#milestoneFourCard"),key:"milestoneFour"}].forEach(({host:h,card:d,key:f})=>{!h||!d||(Z(h,f,"milestone-card-slider"),ee(d,f,"media-update-button feature-media-add"))});const s=c("#history");if(s){const h=Z(s,"story","story-section-slider");ee(h,"story","media-update-button section-slider-update")}const u=c("#world-heritage");if(u){const h=Z(u,"criteria","criteria-section-slider");ee(h,"criteria","media-update-button section-slider-update")}const l=c("#muchalindaDonationMedia");if(l){const h=Z(l,"muchalindaDonation","muchalinda-donation-slider");ee(h,"muchalindaDonation","media-update-button section-slider-update")}const m=c("#muchalindaHeroMedia");if(m){const h=Z(m,"muchalindaHero","muchalinda-hero-slider");ee(h,"muchalindaHero","media-update-button section-slider-update")}const mShow=c("#muchalinda-history");if(mShow){const uBtn=mShow.querySelector(".media-update-button");if(uBtn){uBtn.addEventListener("click",()=>Ct("muchalindaShowcase"))}else{ee(mShow,"muchalindaShowcase","media-update-button milestones-overview-update")}}[{host:c("#muchalindaCardHistoryMedia"),card:c("#muchalindaCardHistory"),key:"muchalindaCardHistory"},{host:c("#muchalindaCardRestorationMedia"),card:c("#muchalindaCardRestoration"),key:"muchalindaCardRestoration"}].forEach(({host:h,card:d,key:f})=>{!h||!d||(Z(h,f,"milestone-card-slider"),ee(d,f,"media-update-button feature-media-add"))});qe()}function qe(){Object.keys(ie).forEach(zn),Tr(),Et(),ln(),renderMuchalindaAlbum()}function Tr(){const e=c("#driveVideoSection"),t=c("#driveVideoGallery");if(!e||!t)return;const n=p.media.filter(o=>J(o)==="videos"&&(o.type==="video"||_isFacebookVideo(o.url)||_isTikTokVideo(o.url)||On(o.url)||nt(o.url))&&o.enabled!==!1&&o.published!==!1).sort((o,a)=>(Number(o.order)||0)-(Number(a.order)||0)||String(o.title||"").localeCompare(String(a.title||""),"th"));e.hidden=!n.length,t.replaceChildren(),n.forEach(o=>{const a=document.createElement("article");a.className="video-card drive-video-card";const r=document.createElement("div");r.className="video-frame";const s=ye(o.url),u=On(o.url),fb=_isFacebookVideo(o.url),tt=_isTikTokVideo(o.url),l=o.source==="google-drive"?"":nt(o.url);if(u){const d=document.createElement("iframe");d.src="https://www.youtube-nocookie.com/embed/"+u,d.title=o.title||"วิดีโอพระธาตุพนม",d.loading="lazy",d.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",d.allowFullscreen=!0,r.append(d)}else if(fb){const isReel=_isFacebookReel(o.url);if(isReel)r.style.aspectRatio="9/16";const d=document.createElement("iframe");d.src=_getFacebookEmbedUrl(o.url),d.title=o.title||"วิดีโอ Facebook พระธาตุพนม",d.loading="lazy",d.allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen",d.allowFullscreen=!0,d.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;",r.append(d)}else if(tt){r.style.aspectRatio="9/16";const d=document.createElement("iframe");d.src=_getTikTokEmbedUrl(o.url),d.title=o.title||"วิดีโอ TikTok พระธาตุพนม",d.loading="lazy",d.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",d.allowFullscreen=!0,d.style.cssText="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;",r.append(d)}else if(l){const d=document.createElement("iframe");d.src="https://drive.google.com/file/d/"+encodeURIComponent(l)+"/preview",d.title=o.title||"วิดีโอพระธาตุพนมจาก Google Drive",d.loading="lazy",d.allow="autoplay; fullscreen",d.allowFullscreen=!0,r.append(d)}else if(s){const d=document.createElement("video");d.src=s,d.controls=!0,d.preload="metadata",d.playsInline=!0,d.setAttribute("controlsList","nodownload"),r.append(d)}if(!r.childElementCount){const d=document.createElement("p");d.className="video-unavailable",d.textContent="ไม่สามารถเปิดวิดีโอนี้ได้",r.append(d)}const m=document.createElement("p");m.className="video-type",m.textContent=o.source==="google-drive"?"Google Drive · ซิงก์อัตโนมัติ":(fb?"Facebook / Reels · วิดีโอ":"วิดีโอเพิ่มเติม");const h=document.createElement("h3");h.textContent=_getDynamicText(o,"title")||(document.documentElement.lang==="en"?"Phra That Phanom Video":document.documentElement.lang==="lo"?"ວິດີໂອພະທາດພະນົມ":"วิดีโอพระธาตุพนม"),a.append(r,m,h);if(!l&&s){const exl=document.createElement("a");exl.href=s;exl.target="_blank";exl.rel="noopener noreferrer";exl.className="youtube-open-link";exl.textContent="เปิดดูวิดีโอ ↗";a.append(exl)}t.append(a)})}const _defaultDrivePhotos = [
  {
    id: "drive_1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9",
    driveFileId: "1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9",
    name: "001-merit.jpg",
    title: "ภาพผู้ร่วมบุญ 001-merit",
    uploadedTime: 1790131324050,
    createdTime: "2026-09-22T08:02:04.050Z",
    url: "https://lh3.googleusercontent.com/d/1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9",
    fallbackUrl: "https://drive.google.com/thumbnail?id=1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9&sz=w1600",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9=w800",
    webViewLink: "https://drive.google.com/file/d/1d4HpBb_91rrgMTXR_s9VLaLkKa8jy-T9/view",
    mimeType: "image/jpeg",
    section: "muchalinda",
    placement: "album",
    driveFolderName: "อัลบั้มรูปภาพผู้ร่วมบุญ",
    source: "google-drive",
    enabled: true,
    published: true,
    order: 10
  },
  {
    id: "drive_1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5",
    driveFileId: "1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5",
    name: "002-merit.jpg",
    title: "ภาพผู้ร่วมบุญ 002-merit",
    uploadedTime: 1790302769492,
    createdTime: "2026-09-24T07:39:29.492Z",
    url: "https://lh3.googleusercontent.com/d/1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5",
    fallbackUrl: "https://drive.google.com/thumbnail?id=1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5&sz=w1600",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5=w800",
    webViewLink: "https://drive.google.com/file/d/1FesuS1nDJ0j9gSO9c5QhUyyM9zbIHXb5/view",
    mimeType: "image/jpeg",
    section: "muchalinda",
    placement: "album",
    driveFolderName: "อัลบั้มรูปภาพผู้ร่วมบุญ",
    source: "google-drive",
    enabled: true,
    published: true,
    order: 20
  },
  {
    id: "drive_13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z",
    driveFileId: "13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z",
    name: "ร่วมบุญ3.jpg",
    title: "ร่วมบุญ3",
    uploadedTime: 1790327347913,
    createdTime: "2026-09-25T09:09:07.913Z",
    modifiedTime: "2026-09-25T09:19:21.825Z",
    url: "https://lh3.googleusercontent.com/d/13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z",
    fallbackUrl: "https://drive.google.com/thumbnail?id=13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z&sz=w1600",
    thumbnailUrl: "https://lh3.googleusercontent.com/d/13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z=w800",
    webViewLink: "https://drive.google.com/file/d/13GtFdNLjcf-KOjU9u99sxk1qqirBBq-z/view",
    mimeType: "image/jpeg",
    size: 158191,
    section: "muchalinda",
    placement: "album",
    driveFolderName: "อัลบั้มรูปภาพผู้ร่วมบุญ",
    source: "google-drive",
    enabled: true,
    published: true,
    order: 30
  }
];

let _driveAlbumCache = [];
try {
  const _savedAlbum = localStorage.getItem("thatphanom_drive_album_cache");
  if (_savedAlbum) {
    const _pAlbum = JSON.parse(_savedAlbum);
    if (Array.isArray(_pAlbum)) _driveAlbumCache = _pAlbum;
  }
} catch (_) {}

function _formatThaiDateTime(ts) {
  if (!ts) return "";
  try {
    const d = new Date(Number(ts));
    if (isNaN(d.getTime())) return "";
    const day = d.getDate();
    const months = ["ม.ค.", "ก.พ.", "มี.ค.", "เม.ย.", "พ.ค.", "มิ.ย.", "ก.ค.", "ส.ค.", "ก.ย.", "ต.ค.", "พ.ย.", "ธ.ค."];
    const month = months[d.getMonth()];
    const year = d.getFullYear() + 543;
    const hours = String(d.getHours()).padStart(2, "0");
    const mins = String(d.getMinutes()).padStart(2, "0");
    return `${day} ${month} ${year} เวลา ${hours}:${mins} น.`;
  } catch {
    return "";
  }
}

let _driveAlbumFetchStarted = false;
let _lastDriveFetchTime = 0;
async function fetchLatestDriveAlbum(force = false) {
  const now = Date.now();
  if (!force && now - _lastDriveFetchTime < 15000) return _driveAlbumCache.length;
  _lastDriveFetchTime = now;
  try {
    const res = await fetch("/api/drive-album?folderId=1DmhMAaiazfnXIiOZ5Hu4E_du_oCZZNCU");
    const json = await res.json();
    if (json && json.success && Array.isArray(json.files) && json.files.length) {
      _driveAlbumCache = json.files;
      try {
        localStorage.setItem("thatphanom_drive_album_cache", JSON.stringify(_driveAlbumCache));
      } catch(_) {}

      if (p && Array.isArray(p.media)) {
        const existingMap = new Map(p.media.map(x => [x.driveFileId || x.id, x]));
        json.files.forEach((f, idx) => {
          const key = f.driveFileId || f.id;
          if (!existingMap.has(key)) {
            p.media.push({ ...f, order: (idx + 1) * 10 });
            existingMap.set(key, f);
          } else {
            const existing = existingMap.get(key);
            if (f.uploadedTime && !existing.uploadedTime) existing.uploadedTime = f.uploadedTime;
            if (f.url && !existing.url) existing.url = f.url;
            if (f.name && !existing.name) existing.name = f.name;
            if (f.title && !existing.title) existing.title = f.title;
          }
        });
      }
      renderMuchalindaAlbum();
      return json.files.length;
    }
  } catch (err) {
    console.warn("Drive album fetch:", err);
  }
  return _driveAlbumCache.length;
}

// Start initial background fetch immediately on script evaluation
setTimeout(() => { fetchLatestDriveAlbum(); }, 500);

function renderMuchalindaAlbum(){
  const e=document.getElementById("muchalinda-album"),
    t=document.getElementById("muchalindaAlbumGallery"),
    n=document.getElementById("muchalindaAlbumEmpty"),
    o=document.getElementById("muchalindaAlbumCounter"),
    a=document.getElementById("muchalindaAlbumSearch"),
    r=document.getElementById("muchalindaAlbumSyncBtn");
  if(!t)return;

  // Make sure default drive photos and cache are in p.media
  if (p && Array.isArray(p.media)) {
    const existing = new Set(p.media.map(x => x.driveFileId || x.id));
    [..._defaultDrivePhotos, ..._driveAlbumCache].forEach(dp => {
      if (!existing.has(dp.id) && !existing.has(dp.driveFileId)) {
        p.media.push(dp);
        existing.add(dp.driveFileId || dp.id);
      }
    });
  }

  // Trigger background sync on first render and periodic auto-refresh
  if (!_driveAlbumFetchStarted) {
    _driveAlbumFetchStarted = true;
    fetchLatestDriveAlbum();
    setInterval(() => { fetchLatestDriveAlbum(); }, 30000);
  }

  // Wire sync button
  if(r&&!r._wired){
    r._wired=!0;
    r.addEventListener("click",async()=>{
      r.disabled=!0;
      r.textContent="กำลังซิงก์ภาพจาก Drive...";
      try{
        const count = await fetchLatestDriveAlbum(true);
        if (typeof Cr=="function") {
          try { await Cr(); } catch(_) {}
        }
        if (typeof B === "function") {
          B("ซิงก์ภาพจาก Google Drive เรียบร้อยแล้ว (" + (count || (p.media||[]).filter(x=>x.placement==="album").length) + " ภาพ)", "info");
        }
      }catch(u){
        console.error("Sync error:",u);
      }finally{
        r.disabled=!1;
        r.innerHTML="<span>⟳ ซิงก์ภาพจาก Drive</span>";
      }
    });
  }

  // Combine default, cached, and p.media sources so files are never lost
  const combined = [
    ..._defaultDrivePhotos,
    ..._driveAlbumCache,
    ...(p && Array.isArray(p.media) ? p.media : [])
  ];
  const uniquePhotos = [];
  const seenIds = new Set();
  for (const u of combined) {
    if (!u) continue;
    const l = u.driveFileId || u.id || u.url;
    if (!l || seenIds.has(l)) continue;
    seenIds.add(l);
    uniquePhotos.push(u);
  }

  const m=uniquePhotos.filter(u=>{
    if(u.enabled===!1||u.published===!1)return!1;
    const isImg=(u.type==="image"||!u.type)&&!Qn(u).includes("video");
    const isAlbum=u.section==="muchalinda"&&u.placement==="album"||
      u.section==="muchalinda"&&(
        u.folderKey==="muchalindaAlbum"||
        u.driveFolderName==="อัลบั้มรูปภาพผู้ร่วมบุญ"||
        String(u.storagePath||"").includes("muchalindaAlbum")||
        String(u.storagePath||"").includes("อัลบั้มรูปภาพผู้ร่วมบุญ")
      );
    return isImg&&isAlbum;
  }).sort((u,l)=>{
    // Sort strictly by upload date/time on Google Drive (oldest first: 001, 002, 003...)
    const timeU = Number(u.uploadedTime) || (u.createdTime ? new Date(u.createdTime).getTime() : 0);
    const timeL = Number(l.uploadedTime) || (l.createdTime ? new Date(l.createdTime).getTime() : 0);
    if (timeU !== timeL) return timeU - timeL;
    return (Number(u.order)||0)-(Number(l.order)||0)||String(u.name||u.title||"").localeCompare(String(l.name||l.title||""),"th");
  });

  const c=(a?a.value:"").trim().toLowerCase();
  const f=c?m.filter(u=>{
    const l=String(u.title||"").toLowerCase(),
      h=String(u.description||"").toLowerCase(),
      g=String(u.name||u.driveName||"").toLowerCase();
    return l.includes(c)||h.includes(c)||g.includes(c);
  }):m;

  if(o){
    o.textContent=m.length===0?"0 ภาพ":c?`พบ ${f.length} จาก ${m.length} ภาพ`:`${m.length} ภาพ`;
  }

  if(a&&!a._wired){
    a._wired=!0;
    a.addEventListener("input",()=>renderMuchalindaAlbum());
  }

  if(m.length===0){
    t.innerHTML="";
    if(n)n.hidden=!1;
    return;
  }

  if(n)n.hidden=!0;
  t.innerHTML="";

  if(f.length===0){
    const u=document.createElement("p");
    u.className="resource-empty";
    u.style.gridColumn="1 / -1";
    u.style.textAlign="center";
    u.style.padding="32px 0";
    u.textContent=`ไม่พบภาพที่ตรงกับ “${c}”`;
    t.appendChild(u);
    return;
  }

  f.forEach((u,l)=>{
    const h=document.createElement("article");
    h.className="album-photo-card";
    h.setAttribute("role","button");
    h.setAttribute("tabindex","0");
    h.setAttribute("aria-label",u.title||`ภาพที่ ${l+1}`);

    const g=document.createElement("div");
    g.className="album-photo-thumb-wrap";

    const b=document.createElement("img");
    b.className="album-photo-thumb";
    b.referrerPolicy="no-referrer";
    b.src=u.thumbnailUrl||u.url||u.storagePath||"";
    b.alt=u.title||"ภาพผู้ร่วมบุญ โครงการบูรณะสระมุจลินท์";
    b.loading="lazy";
    b.onerror=()=>{
      if(u.url&&b.src!==u.url)b.src=u.url;
      else if(u.fallbackUrl&&b.src!==u.fallbackUrl)b.src=u.fallbackUrl;
      else if(u.driveFileId&&!b.src.includes("drive.google.com/thumbnail")){
        b.src="https://drive.google.com/thumbnail?id=" + u.driveFileId + "&sz=w800";
      }
    };

    g.appendChild(b);
    h.appendChild(g);

    const q=()=>{
      const thaiTime = _formatThaiDateTime(u.uploadedTime);
      const timePart = thaiTime ? ` · วันที่และเวลาอัปโหลด: ${thaiTime}` : "";
      const fullDesc = `ลำดับที่ ${l+1} · โฟลเดอร์: พระธาตุพนม สู่มรดกโลก/โครงการบูรณะสระมุจลินท์/อัลบั้มรูปภาพผู้ร่วมบุญ${timePart}`;
      typeof window.openImageLightbox=="function"&&window.openImageLightbox({
        url: u.url||u.storagePath||"",
        title: u.title||`ภาพผู้ร่วมบุญ ${l+1}`,
        description: fullDesc,
        webViewLink: u.webViewLink || (u.driveFileId ? `https://drive.google.com/file/d/${u.driveFileId}/view` : "")
      });
    };

    h.addEventListener("click",q);
    h.addEventListener("keydown",x=>{(x.key==="Enter"||x.key===" ")&&(x.preventDefault(),q())});
    t.appendChild(h);
  });
}
function Et(){const e=c("#driveSyncState"),t=c("#driveSyncSummary"),n=c("#syncDriveButton");if(!e||!t||!n)return;const o=p.driveSyncStatus,a=p.driveSyncBusy?"running":(o==null?void 0:o.status)||"idle",r={idle:"ยังไม่เคยซิงก์",running:"กำลังซิงก์",success:"ซิงก์สำเร็จ",error:"ต้องตรวจสอบ"};if(e.dataset.state=a,e.textContent=r[a]||"รอตรวจสอบ",n.disabled=p.driveSyncBusy,n.setAttribute("aria-busy",String(p.driveSyncBusy)),p.driveSyncBusy||a==="running"){t.textContent="ระบบกำลังอ่านรายการไฟล์และอัปเดตคลังสื่อ กรุณารอสักครู่";return}if(!o){t.textContent="ระบบจะตรวจ Google Drive ทุก 5 นาที หรือกดซิงก์ทันทีได้";return}const s=o.counts||{};if(a==="success"){const u=o.lastSuccessAt?rn(o.lastSuccessAt):"ล่าสุด";t.textContent="ซิงก์ "+u+" · พบ "+(s.discovered||0)+" · เพิ่ม "+(s.created||0)+" · อัปเดต "+(s.updated||0)+" · ลบ "+(s.deleted||0)}else t.textContent=o.lastError||"ซิงก์ไม่สำเร็จ กรุณาตรวจสิทธิ์โฟลเดอร์ Google Drive"}async function Cr(){if(!Y())return A("เฉพาะ Admin เท่านั้นที่สั่งซิงก์ได้","error");if(!qt)return A("ยังเชื่อมต่อระบบซิงก์ไม่ได้","error");p.driveSyncBusy=!0,Et();try{const t=(await qt()).data||{};if(t.skipped)A("มีรอบซิงก์กำลังทำงานอยู่");else{const n=t.counts||{};A("ซิงก์สำเร็จ: เพิ่ม "+(n.created||0)+" · อัปเดต "+(n.updated||0)+" · ลบ "+(n.deleted||0))}}catch(e){console.error("Drive sync failed",e);const t=String(e.code||"");t.includes("unauthenticated")?A("กรุณาเข้าสู่ระบบใหม่ก่อนสั่งซิงก์","error"):t.includes("permission-denied")?A("บัญชีนี้ไม่มีสิทธิ์สั่งซิงก์","error"):A("ซิงก์ Google Drive ไม่สำเร็จ กรุณาลองใหม่","error")}finally{p.driveSyncBusy=!1,Et()}}function _getDynamicText(item, field) {
  if (!item) return "";
  const curLang = document.documentElement.lang || "th";
  const loKey = field + "_lo";
  const enKey = field + "_en";
  const loAltKey = field + "Lo";
  const enAltKey = field + "En";
  if (curLang === "lo") {
    if (item[loKey]) return item[loKey];
    if (item[loAltKey]) return item[loAltKey];
  } else if (curLang === "en") {
    if (item[enKey]) return item[enKey];
    if (item[enAltKey]) return item[enAltKey];
  }
  const rawTh = item[field] || item[field + "_th"] || item[field + "Th"] || "";
  if (curLang !== "th" && rawTh && window._seedMultiLangMap && window._seedMultiLangMap[rawTh.trim()]) {
    const mapped = window._seedMultiLangMap[rawTh.trim()][curLang];
    if (mapped) return mapped;
  }
  return rawTh;
}
window._seedMultiLangMap = {
  "องค์พระธาตุพนม": { en: "Phra That Phanom Stupa", lo: "ອົງພະທາດພະນົມ" },
  "ร่องรอยศิลปกรรมแห่งลุ่มน้ำโขง": { en: "Traces of Mekong Basin Art", lo: "ຮ່ອງຮອຍສິລະປະແຫ່ງລຸ່ມນ້ຳຂອງ" },
  "ศูนย์รวมศรัทธาของผู้คนสองฝั่งโขง": { en: "Spiritual Center of Mekong Peoples", lo: "ສູນລວມສັດທາຂອງຜູ້ຄົນສອງຝັ່ງຂອງ" },
  "ผลงานสร้างสรรค์อันเป็นเลิศ": { en: "Masterpiece of Human Creative Genius", lo: "ຜົນງານສ້າງສັນອັນເປັນເລີດ" },
  "การแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม": { en: "Interchange of Human Cultural Values", lo: "ການແລກປ່ຽນຄຸນຄ່າຂ້າມວັດທະນະທຳ" },
  "สัมพันธ์กับความเชื่อที่ยังดำรงอยู่": { en: "Living Sacred Traditions and Beliefs", lo: "ສຳພັນກັບຄວາມເຊື່ອທີ່ຍັງດຳລົງຢູ່" },
  "งานที่ต้องทำร่วมกัน": { en: "Collaborative Action Plan", lo: "ວຽກທີ່ต้องເຮັດຮ່ວມກັນ" },
  "กำหนดคุณค่าและขอบเขต": { en: "Define Values and Boundaries", lo: "ກຳນົດຄຸນຄ່າ ແລະຂອບເຂດ" },
  "จัดทำแผนอนุรักษ์": { en: "Draft Heritage Conservation Plan", lo: "ສ້າງແຜນອະນຸລັກ" },
  "มีส่วนร่วมของชุมชน": { en: "Foster Community Engagement", lo: "ການມີສ່ວນຮ່ວມຂອງຊຸມຊົນ" },
  "เสนอเอกสารฉบับสมบูรณ์": { en: "Submit Final UNESCO Nomination Dossier", lo: "ສະເໜີເອກະສານສະບັບສົມບູນ" },
  "โครงสร้างยุคแรก": { en: "Early Historical Period Structures", lo: "ໂຄງສ້າງຍຸກທຳອິດ" },
  "การบูรณะใหญ่": { en: "Major Historical Restoration", lo: "ການບູລະນະໃຫຍ່" },
  "เหตุการณ์ล้มและบูรณะ": { en: "Collapse and National Reconstruction", lo: "ເຫດການພັງທະລາຍ ແລະການບູລະນະ" },
  "ก้าวสู่มรดกโลก": { en: "March Towards UNESCO World Heritage", lo: "ກ້າວສູ່ມໍລະດົກໂລກ" },
  "ภาพประกอบแนวคิดสระมุจลินท์": { en: "Muchalinda Pond Concept", lo: "ພາບແນວຄິດສະມຸດຈະລິນ" },
  "ร่วมบุญบูรณะสระมุจลินท์": { en: "Support Muchalinda Restoration", lo: "ຮ່ວມບຸນບູລະນະສະມຸດຈະລິນ" },
  "วิดีโอพระธาตุพนม": { en: "Phra That Phanom Video Archive", lo: "ວິດີໂອພະທາດພະນົມ" }
};

function zn(e){const t=document.querySelector(`[data-slider="${e}"]`);if(!t)return;const n=p.media.filter(l=>J(l)===e&&l.enabled!==!1&&l.published!==!1),o={hero:[jn],storyArt:[Ge],storyPeople:[Ye],criteriaOne:[Qe],criteriaTwo:[Je],criteriaThree:[Xe],processOverview:[Ze],processOne:[me[0]],processTwo:[me[1]],processThree:[me[2]],processFour:[me[3]],milestoneOne:[he[0]],milestoneTwo:[he[1]],milestoneThree:[he[2]],milestoneFour:[he[3]],muchalindaHero:[tt],muchalindaShowcase:[tt],muchalindaCardHistory:[tt],muchalindaCardRestoration:[tt],muchalindaDonation:et},a=(!n.length&&o[e]?o[e]:n).sort((l,m)=>(l.order||0)-(m.order||0));let r="";try{r=(document.documentElement.lang||"th")+"|"+JSON.stringify(a.map(l=>[String(l?.id||""),String(l?.url||""),String(_getDynamicText(l,"title")||""),String(l?.type||""),Number(l?.order||0)]))}catch(_){r=(document.documentElement.lang||"th")+"|"+a.length}const s=t.querySelectorAll(".media-slide");if(t.dataset.renderedSig===r&&s.length===a.length&&a.length>0)return;t.dataset.renderedSig=r,on(e),t.onkeydown=null;const u=c(".media-stage",t);if(!u)return;if(u.replaceChildren(),!a.length){const l=document.createElement("div");l.className="slider-empty",l.textContent=Y()?"ยังไม่มีสื่อในหัวข้อนี้ กดปุ่มอัพเดทเพื่อเพิ่ม":"กำลังเตรียมรูปภาพและวิดีโอ",u.append(l);return}if(p.slideIndex[e]=Math.min(p.slideIndex[e]||0,a.length-1),a.forEach((l,m)=>{const h=document.createElement("figure");h.className=`media-slide${m===p.slideIndex[e]?" active":""}`;const fb=_isFacebookVideo(l.url),tt=_isTikTokVideo(l.url),f=On(l.url)||ia(l.url),k=nt(l.url),isDirectVid=!fb&&!tt&&!f&&!k&&(l.type==="video"||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(l.url)),d=ye(l.type==="image"?an(l.url):l.url);if(k){const v=document.createElement("iframe"),T=`https://drive.google.com/file/d/${encodeURIComponent(k)}/preview`;v.dataset.sliderKey=e;v.dataset.originalSrc=T,v.src=m===p.slideIndex[e]?T:"about:blank",v.title=l.title||"วิดีโอพระธาตุพนมจาก Google Drive",v.loading="lazy",v.allow="autoplay; fullscreen",v.allowFullscreen=!0,v.referrerPolicy="strict-origin-when-cross-origin",h.append(v);const C=document.createElement("button");C.type="button",C.className="media-play-button",C.setAttribute("aria-label",`เปิดเครื่องเล่นวิดีโอ ${l.title||"พระธาตุพนม"}`),C.innerHTML='<span aria-hidden="true">▶</span> ชมวิดีโอ',C.addEventListener("click",M=>{M.stopPropagation(),ve(e),v.src=`${v.dataset.originalSrc||T}?autoplay=1`,C.remove()}),h.append(C)}else if(f){const v=document.createElement("iframe"),yts=`https://www.youtube-nocookie.com/embed/${f}?enablejsapi=1&origin=${encodeURIComponent(location.origin)}`;v.dataset.originalSrc=yts,v.src=m===p.slideIndex[e]?yts:"about:blank",v.title=l.title||"วิดีโอพระธาตุพนม",v.loading="lazy",v.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",v.allowFullscreen=!0,v.dataset.sliderKey=e,h.append(v);const T=document.createElement("button");T.type="button",T.className="media-play-button",T.setAttribute("aria-label",`เล่นวิดีโอ ${l.title||"พระธาตุพนม"}`),T.innerHTML='<span aria-hidden="true">▶</span> ชมวิดีโอ',T.addEventListener("click",C=>{C.stopPropagation(),ve(e),v.src=`${v.dataset.originalSrc||yts}&autoplay=1&rel=0`,T.remove()}),h.append(T)}else if(fb){const v=document.createElement("iframe"),fbs=_getFacebookEmbedUrl(l.url);v.dataset.sliderKey=e;v.dataset.originalSrc=fbs,v.src=m===p.slideIndex[e]?fbs:"about:blank",v.title=l.title||"วิดีโอพระธาตุพนมจาก Facebook",v.loading="lazy",v.allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen",v.allowFullscreen=!0,v.style.cssText="width:100%;height:100%;min-width:100%;min-height:100%;border:none;display:block;",h.append(v)}else if(tt){const v=document.createElement("iframe"),tts=_getTikTokEmbedUrl(l.url);v.dataset.sliderKey=e;v.dataset.originalSrc=tts,v.src=m===p.slideIndex[e]?tts:"about:blank",v.title=l.title||"วิดีโอพระธาตุพนมจาก TikTok",v.loading="lazy",v.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",v.allowFullscreen=!0,v.style.cssText="width:100%;height:100%;min-width:100%;min-height:100%;border:none;display:block;",h.append(v);const T=document.createElement("button");T.type="button",T.className="media-play-button",T.setAttribute("aria-label",`เล่นวิดีโอ ${l.title||"พระธาตุพนม"}`),T.innerHTML='<span aria-hidden="true">▶</span> ชมวิดีโอ',T.addEventListener("click",C=>{C.stopPropagation(),ve(e),v.src=`${v.dataset.originalSrc||tts}?autoplay=1`,T.remove()}),h.append(T);const ttk=document.createElement("a");ttk.href=l.url,ttk.target="_blank",ttk.rel="noopener noreferrer",ttk.className="slide-youtube-direct-btn",ttk.style.cssText="position:absolute; bottom:16px; right:16px; z-index:4; display:inline-flex; align-items:center; gap:6px; background:rgba(23,19,41,0.88); color:#ff0050; border:1px solid rgba(255,0,80,0.5); border-radius:999px; padding:6px 14px; font-size:0.82rem; font-weight:600; text-decoration:none; backdrop-filter:blur(6px); box-shadow:0 4px 14px rgba(0,0,0,0.35); transition:all 0.2s ease;",ttk.innerHTML="เปิดดูใน TikTok ↗",h.append(ttk)}else if(isDirectVid&&d){const v=document.createElement("video");v.src=d,v.controls=!0,v.preload="metadata",v.addEventListener("play",()=>ve(e),{once:!0}),h.append(v)}else if(d){h.classList.add("image-slide");const v=document.createElement("img");v.src=d,v.alt="",v.loading="lazy",v.decoding="async",v.className="media-image-backdrop",v.setAttribute("aria-hidden","true");const T=document.createElement("img");T.src=d,T.alt=l.title||"ภาพพระธาตุพนม",T.loading="lazy",T.decoding="async",T.className="expandable-media",T.tabIndex=0,T.setAttribute("role","button"),T.setAttribute("aria-label",`ขยายภาพ ${l.title||"พระธาตุพนม"}`),T.addEventListener("click",()=>{ve(e),Cn(l)}),T.addEventListener("keydown",C=>{C.key!=="Enter"&&C.key!==" "||(C.preventDefault(),ve(e),Cn(l))}),h.append(v,T)}else{const v=document.createElement("div");v.className="slider-empty",v.textContent="ไม่สามารถแสดงสื่อนี้ได้",h.append(v)}const E=document.createElement("figcaption");E.className="media-caption";const _sTitle=_getDynamicText(l,"title")||"",_sDesc=_getDynamicText(l,"description")||"";if(_sDesc){const _h4=document.createElement("h4");_h4.className="media-caption-title";_h4.textContent=_sTitle;const _p=document.createElement("p");_p.className="media-caption-desc";_p.textContent=_sDesc;E.append(_h4,_p);}else{E.textContent=_sTitle;}h.append(E);u.append(h)}),a.length>1){const l=document.createElement("button");l.type="button",l.className="slider-arrow prev",l.setAttribute("aria-label","ภาพก่อนหน้า"),l.textContent="‹";const m=document.createElement("button");m.type="button",m.className="slider-arrow next",m.setAttribute("aria-label","ภาพถัดไป"),m.textContent="›";const h=document.createElement("span");h.className="slider-counter",h.style.cursor="pointer",h.setAttribute("role","button"),h.setAttribute("tabindex","0"),h.setAttribute("title","คลิกเพื่อเปลี่ยนสไลด์ถัดไป"),h.setAttribute("aria-label",`สไลด์ที่ ${p.slideIndex[e]+1} จากทั้งหมด ${a.length} คลิกเพื่อเปลี่ยนสไลด์`),h.textContent=`${p.slideIndex[e]+1} / ${a.length}`,l.addEventListener("click",()=>rt(e,-1,a.length,!0)),m.addEventListener("click",()=>rt(e,1,a.length,!0)),h.addEventListener("click",()=>{rt(e,1,a.length,!0)}),h.addEventListener("keydown",ev=>{if(ev.key==="Enter"||ev.key===" "){ev.preventDefault();rt(e,1,a.length,!0)}}),t.querySelectorAll(".slider-arrow, .slider-counter").forEach(el=>el.remove()),t.append(l,m,h),kr(t,u,e,a.length),Hn(e,a.length);try{if(typeof _renderSiteSectionsCMS==="function")_renderSiteSectionsCMS(); window.dispatchEvent(new CustomEvent("portal:dataReload"));}catch(_){}}}function on(e){clearTimeout(Wt.get(e)),Wt.delete(e)}function ve(e){if(e){p.slideAutoStopped[e]=!0,on(e)}}if(!window._ytSlideStopAttached){window._ytSlideStopAttached=!0;window.addEventListener("blur",()=>{const act=document.activeElement;if(act&&act.tagName==="IFRAME"){const sKey=act.dataset.sliderKey||(act.closest("[data-slider]")?.dataset.slider);if(sKey)ve(sKey);else Object.keys(p.slideAutoStopped).forEach(k=>ve(k))}});window.addEventListener("message",ev=>{try{let d=ev.data;if(typeof d==="string"&&d.startsWith("{"))d=JSON.parse(d);if(d&&((d.event==="onStateChange"&&(d.info===1||d.info===3))||(d.info&&d.info.playerState===1))){document.querySelectorAll("iframe").forEach(ifr=>{if(ifr.contentWindow===ev.source){const sKey=ifr.dataset.sliderKey||(ifr.closest("[data-slider]")?.dataset.slider);if(sKey)ve(sKey)}})}}catch(_){}})}function Hn(e,t){on(e),!(t<2||p.slideAutoStopped[e]||document.hidden||matchMedia("(prefers-reduced-motion: reduce)").matches)&&Wt.set(e,setTimeout(()=>rt(e,1,t,!1),fr))}function kr(e,t,n,o){let a=null,r=null;t.addEventListener("pointerdown",s=>{ve(n),s.pointerType!=="mouse"&&!s.target.closest("button, iframe, video")&&(a=s.clientX,r=s.clientY)});t.addEventListener("pointerup",s=>{if(a===null||r===null)return;const u=s.clientX-a,l=s.clientY-r;a=null,r=null,Math.abs(u)>=40&&Math.abs(u)>Math.abs(l)&&rt(n,u<0?1:-1,o,!0)});t.addEventListener("pointercancel",()=>{a=null,r=null});let tx=null,ty=null;t.addEventListener("touchstart",s=>{if(s.touches&&s.touches.length===1&&!s.target.closest("button, iframe, video")){tx=s.touches[0].clientX;ty=s.touches[0].clientY;}},{passive:!0});t.addEventListener("touchend",s=>{if(tx===null||ty===null)return;const ex=s.changedTouches&&s.changedTouches.length?s.changedTouches[0].clientX:tx;const ey=s.changedTouches&&s.changedTouches.length?s.changedTouches[0].clientY:ty;const dx=ex-tx,dy=ey-ty;tx=null;ty=null;if(Math.abs(dx)>=40&&Math.abs(dx)>Math.abs(dy)){ve(n);rt(n,dx<0?1:-1,o,!0);}},{passive:!0});t.addEventListener("touchcancel",()=>{tx=null;ty=null;},{passive:!0});e.onkeydown=s=>{s.key!=="ArrowLeft"&&s.key!=="ArrowRight"||(s.preventDefault(),rt(n,s.key==="ArrowRight"?1:-1,o,!0))}}function rt(e,t,n,o=!1){o&&ve(e);const a=document.querySelector(`[data-slider="${e}"]`);if(!a)return;const r=a.querySelectorAll(".media-slide");if(r.length===0)return;let domActiveIdx=-1;r.forEach((sl,idx)=>{if(sl.classList.contains("active"))domActiveIdx=idx;});const currentIdx=domActiveIdx>=0?domActiveIdx:((typeof p.slideIndex[e]==="number")?p.slideIndex[e]:0);const total=r.length||n||1;const nextIdx=((currentIdx+t)%total+total)%total;p.slideIndex[e]=nextIdx;r.forEach((sl,idx)=>{if(idx===nextIdx){sl.classList.add("active");sl.querySelectorAll("iframe").forEach(ifr=>{const orig=ifr.dataset.originalSrc;if(orig&&(ifr.src==="about:blank"||!ifr.src||ifr.getAttribute("src")==="about:blank")){ifr.src=orig}})}else{sl.classList.remove("active");sl.querySelectorAll("iframe").forEach(ifr=>{try{ifr.contentWindow.postMessage('{"event":"command","func":"pauseVideo","args":""}',"*")}catch(_){}try{ifr.contentWindow.postMessage('{"event":"command","func":"stopVideo","args":""}',"*")}catch(_){}const curSrc=ifr.dataset.originalSrc||ifr.getAttribute("src")||ifr.src;if(curSrc&&curSrc!=="about:blank"){ifr.dataset.originalSrc=curSrc,ifr.src="about:blank"}});sl.querySelectorAll("video").forEach(v=>{try{v.pause(),v.currentTime=0}catch(_){}})}});const cs=a.querySelectorAll(".slider-counter");cs.forEach(s=>{s.textContent=`${nextIdx+1} / ${total}`;s.setAttribute("aria-label",`สไลด์ที่ ${nextIdx+1} จากทั้งหมด ${total} คลิกเพื่อเปลี่ยนสไลด์`)});o||Hn(e,total)}function Cn(e){if(!e)return;if(_isFacebookVideo(e.url)||_isTikTokVideo(e.url)||ia(e.url)||nt(e.url)){da(e);return}const t=ye(an(e.originalUrl||e.url));if(!t)return;da({...e,url:t})}function xr(){const e=c("#sideMenu"),t=c("#menuBackdrop"),n=o=>{e.classList.toggle("open",o),e.setAttribute("aria-hidden",String(!o)),c("#menuButton").setAttribute("aria-expanded",String(o)),t.hidden=!o};c("#menuButton").addEventListener("click",()=>n(!e.classList.contains("open"))),c("#closeMenuButton").addEventListener("click",()=>n(!1)),t.addEventListener("click",()=>n(!1)),document.addEventListener("keydown",o=>{o.key==="Escape"&&n(!1)}),c("#accountButton")?.addEventListener("click",()=>p.user?n(!0):Tt()),c("#loginMenuButton").addEventListener("click",async()=>{p.user?(await cr(we),n(!1)):await Tt()}),c("#editorMenuButton").addEventListener("click",()=>{n(!1),Ct()}),c("#treeMenuButton").addEventListener("click",()=>{n(!1),Qr()}),c("#siteStatusMenuButton")&&c("#siteStatusMenuButton").addEventListener("click",()=>{n(!1),_openSiteStatusDialog()}),c("#backupRestoreMenuButton")&&c("#backupRestoreMenuButton").addEventListener("click",()=>{n(!1),_openBackupRestoreDialog()}),c("#chatMenuButton").addEventListener("click",()=>{n(!1),dn()})}async function Tt(){if(!we)return A("ยังไม่สามารถเชื่อมต่อระบบสมาชิกได้","error");const e=c("#accountButton");e&&(e.disabled=!0,e.textContent="กำลังเปิดบัญชี Google...");try{const t=new ur;t.setCustomParameters({prompt:"select_account"}),await pr(we,t)}catch(t){console.error(t),t.code==="auth/unauthorized-domain"?A("ต้องเพิ่มโดเมนเว็บไซต์นี้ใน Firebase Authorized domains","error"):t.code!=="auth/popup-closed-by-user"&&A("เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง","error")}finally{e&&(e.disabled=!1),p.user||Kt()}}async function Ir(e){var l,m,h;const t=((l=e.email)==null?void 0:l.toLowerCase())===tn,n=yr(e.uid),o=$n(e.uid);let a=null,r=null;try{[a,r]=await Promise.all([ge(n),ge(o)])}catch(d){console.warn("Read user profile warning",d)}const s=(h=r&&r.data())==null?void 0:h.role,u=t?"admin":["admin","manager","user"].includes(s)?s:"user";try{await V(n,{email:e.email||"",displayName:e.displayName||"",photoURL:e.photoURL||"",globalRole:t?"admin":((m=a&&a.data())==null?void 0:m.globalRole)||"user",lastLoginAt:I(),...a&&a.exists()?{}:{createdAt:I()}},{merge:!0})}catch(d){console.warn("Save user document warning",d)}try{await V(o,{role:u,email:e.email||"",displayName:e.displayName||"",lastLoginAt:I(),...r&&r.exists()?{}:{joinedAt:I()}},{merge:!0})}catch(d){console.warn("Save member document warning",d)}return u}function Kt(){const e=!!p.user;const curLang=document.documentElement.lang||"th";const loginTxt=(window.I18N_LANGS&&window.I18N_LANGS[curLang]?.dict?.accountLoginBtn)||"เข้าสู่ระบบ";const notLoggedTxt=(window.I18N_LANGS&&window.I18N_LANGS[curLang]?.dict?.notLoggedIn)||"ยังไม่ได้เข้าสู่ระบบ";const logoutTxt=curLang==="lo"?"ອອກຈາກລະບົບ":curLang==="en"?"Sign Out":"ออกจากระบบ";const loginWithGoogleTxt=(window.I18N_LANGS&&window.I18N_LANGS[curLang]?.dict?.loginWithGoogle)||"เข้าสู่ระบบด้วย Google";const guestAvatarTxt=(window.I18N_LANGS&&window.I18N_LANGS[curLang]?.dict?.avatarVisitor)||"ผู้เยี่ยมชม";const accBtn=c("#accountButton");if(accBtn){if(e){accBtn.dataset.userLoggedIn="true";const _uN=(p.user.displayName||p.user.email||"").trim();accBtn.textContent=_uN.length>5?_uN.slice(0,5):_uN;accBtn.title=_uN}else{delete accBtn.dataset.userLoggedIn;accBtn.textContent=loginTxt;accBtn.removeAttribute("title")}}const accName=c("#accountName");if(accName){if(e){accName.dataset.userLoggedIn="true";accName.textContent=p.user.displayName||p.user.email}else{delete accName.dataset.userLoggedIn;accName.textContent=notLoggedTxt}}c("#accountRole").textContent=Ne(p.role),c("#loginMenuText").textContent=e?logoutTxt:loginWithGoogleTxt,c("#editorRoleBadge").textContent=Ne(p.role),c("#editorMenuButton").hidden=!Y(),c("#treeMenuButton").hidden=!Y(),(c("#siteStatusMenuButton")&&(c("#siteStatusMenuButton").hidden=!Y())),(c("#backupRestoreMenuButton")&&(c("#backupRestoreMenuButton").hidden=!Y())),_updateSiteStatusUI();const t=c("#accountAvatar");if(t.replaceChildren(),e&&ye(p.user.photoURL||"")){const n=document.createElement("img");n.src=p.user.photoURL,n.alt="",t.append(n)}else t.textContent=e?(p.user.displayName||p.user.email||"U").slice(0,2):guestAvatarTxt;Lt(".media-update-button").forEach(n=>n.hidden=!Y()),c("#commentText").placeholder=e?"เขียนความคิดเห็นอย่างสุภาพและสร้างสรรค์":"เข้าสู่ระบบด้วย Google เพื่อร่วมแสดงความคิดเห็น",c("#commentText").disabled=!e,c("#chatInput").disabled=!e,qe()}window.updateAuthUI=Kt;async function Lr(){if(!Y())return;const e=Q(U.settings,"content"),n=(await ge(e)).data()||{};if(n.mediaInitialized&&n.storyFeatureInitialized&&n.storyArtInitialized&&n.storyPeopleInitialized&&n.criteriaCardsInitialized&&n.processOverviewInitialized&&n.processStepsInitialized&&n.milestoneCardsInitialized&&n.heroInitialized&&n.muchalindaHeroInitialized&&n.muchalindaDonationInitialized)return;const o=pe(X);[...n.mediaInitialized?[]:vt,...n.storyFeatureInitialized?[]:[wt],...n.storyArtInitialized?[]:[Ge],...n.storyPeopleInitialized?[]:[Ye],...n.criteriaCardsInitialized?[]:[Qe,Je,Xe],...n.processOverviewInitialized?[]:[Ze],...n.processStepsInitialized?[]:me,...n.milestoneCardsInitialized?[]:he,...n.heroInitialized?[]:[jn],...n.muchalindaHeroInitialized?[]:[tt],...n.muchalindaDonationInitialized?[]:et].forEach(r=>{const s={section:r.section,placement:r.placement||"",type:r.type,title:r.title,description:r.description||"",url:r.url,order:r.order,createdBy:p.user.uid,createdByEmail:p.user.email,createdAt:I(),updatedAt:I()};r.originalUrl&&(s.originalUrl=r.originalUrl),o.set(Q(U.media,r.id),s)}),o.set(nn(),{key:Ke,title:"พระธาตุพนม สู่มรดกโลก",visibility:"public",updatedAt:I()},{merge:!0}),o.set(e,{mediaInitialized:!0,storyFeatureInitialized:!0,storyArtInitialized:!0,storyPeopleInitialized:!0,criteriaCardsInitialized:!0,processOverviewInitialized:!0,processStepsInitialized:!0,milestoneCardsInitialized:!0,heroInitialized:!0,muchalindaHeroInitialized:!0,muchalindaDonationInitialized:!0,initializedAt:I(),initializedBy:p.user.uid},{merge:!0}),await o.commit()}function Sr(){X&&(ae(Q(U.settings,"content"),e=>{p.mediaInitialized=!!(e.exists()&&e.data().mediaInitialized),p.mediaInitialized&&p.mediaLoaded&&p.usingFallbackMedia&&(p.media=[],p.usingFallbackMedia=!1,qe())},e=>console.warn("Settings unavailable",e.code)),ae(Q(U.settings,"driveMediaSync"),e=>{p.driveSyncStatus=e.exists()?e.data():null,Et()},e=>console.warn("Drive sync status unavailable",e.code)),ae(te(Ee(U.media),fe("order","asc")),e=>{var n;const t=e.docs.map(o=>({id:o.id,...o.data()}));if(p.mediaLoaded=!0,p.usingFallbackMedia=!(t.length||p.mediaInitialized),p.media=t.length||p.mediaInitialized?t:[...vt,wt,Ge,Ye,Qe,Je,Xe,Ze,...me,...he,tt,...et],qe(),(n=c("#treeDialog"))!=null&&n.open&&p.siteNodes.length){Te();const o=p.siteNodes.find(a=>a.id===p.selectedTreeNodeId)||null;o&&at(o)}},e=>{console.warn("Media unavailable",e.code),p.media=[...vt,wt,Ge,Ye,Qe,Je,Xe,Ze,...me,...he,tt,...et],qe()}),ae(te(Ee(U.comments),fe("createdAt","desc"),Zt(50)),e=>{_r(e.docs.map(t=>({id:t.id,...t.data()})))},e=>console.warn("Comments unavailable",e.code)))}function sn(e="story",t=null){if(!Y())return A("เฉพาะ Admin เท่านั้นที่จัดการสื่อได้","error");p.editingMedia=t,c("#mediaId").value=(t==null?void 0:t.id)||"",c("#mediaSection").value=t?J(t):e,c("#mediaType").value=(t==null?void 0:t.type)||"image",c("#mediaTitle").value=(t==null?void 0:t.title)||"",c("#mediaTitleLo")&&(c("#mediaTitleLo").value=(t==null?void 0:t.title_lo)||""),c("#mediaTitleEn")&&(c("#mediaTitleEn").value=(t==null?void 0:t.title_en)||""),c("#mediaDescription").value=(t==null?void 0:t.description)||"",c("#mediaDescriptionLo")&&(c("#mediaDescriptionLo").value=(t==null?void 0:t.description_lo)||""),c("#mediaDescriptionEn")&&(c("#mediaDescriptionEn").value=(t==null?void 0:t.description_en)||"");if(typeof _switchMediaLangTab==="function")_switchMediaLangTab("th"),c("#mediaUrl").value=t!=null&&t.url?ye(t.url):"",c("#mediaFile").value="";const n=c("#mediaFormStatus");n&&(n.hidden=!0,n.textContent=""),c("#mediaSection").disabled=!!p.manageSection,c("#mediaDialogTitle").textContent=t?"แก้ไขรูปภาพหรือวิดีโอ":"เพิ่มรูปภาพหรือวิดีโอ",c("#mediaDialog").showModal()}function ln(){const e=c("#manageMediaList");if(!e)return;e.replaceChildren();const n=new Map;p.media.forEach(o=>{const a=J(o);n.has(a)||n.set(a,[]);n.get(a).push(o)});n.forEach(o=>{o.sort((a,r)=>(Number(a.order)||0)-(Number(r.order)||0)||String(a.id).localeCompare(String(r.id)))});let t=p.manageSection?(n.get(p.manageSection)||[]).slice():[];if(!p.manageSection){n.forEach(o=>t.push(...o))}if(!t.length){e.innerHTML='<p class="empty-state">ยังไม่มีรายการสื่อ</p>';return}t.forEach(o=>{const a=n.get(J(o))||[],r=a.findIndex(T=>T.id===o.id),s=document.createElement("div");s.className="manage-media-row";const u=o.source==="google-drive";s.classList.toggle("is-drive",u);const l=document.createElement("div"),m=document.createElement("strong");m.textContent=o.title||"ไม่มีชื่อ";const h=document.createElement("span");h.textContent=`${ie[J(o)]||o.section} · ${o.type==="image"?"รูปภาพ":"วิดีโอ"} · ลำดับ ${r+1} จาก ${a.length}`;l.append(m,h);if(u){h.textContent=(ie[J(o)]||o.section)+" · "+(o.type==="image"?"รูปภาพ":"วิดีโอ")+" · Google Drive"}const d=document.createElement("div");if(d.className="row-actions",u){const T=document.createElement("span");T.className="media-source-badge",T.textContent="จัดการจาก Drive",d.append(T);const C=ye(o.driveWebViewLink||"");if(C){const M=document.createElement("a");M.className="drive-source-link",M.href=C,M.target="_blank",M.rel="noopener",M.textContent="เปิดไฟล์ ↗",d.append(M)}s.append(l,d),e.append(s);return}const f=document.createElement("button");f.type="button",f.className="order-button",f.textContent="↑",f.title="เลื่อนสื่อขึ้นหนึ่งตำแหน่ง",f.setAttribute("aria-label",`เลื่อน “${o.title||"สื่อนี้"}” ขึ้นหนึ่งตำแหน่ง`),f.disabled=r<=0,f.addEventListener("click",()=>kn(o,-1));const k=document.createElement("button");k.type="button",k.className="order-button",k.textContent="↓",k.title="เลื่อนสื่อลงหนึ่งตำแหน่ง",k.setAttribute("aria-label",`เลื่อน “${o.title||"สื่อนี้"}” ลงหนึ่งตำแหน่ง`),k.disabled=r<0||r===a.length-1,k.addEventListener("click",()=>kn(o,1));const E=document.createElement("button");E.type="button",E.textContent="แก้ไข",E.addEventListener("click",()=>sn(J(o),o));const v=document.createElement("button");v.type="button",v.className="delete",v.textContent="ลบ",v.addEventListener("click",()=>cn("ลบสื่อนี้?",`“${o.title}” จะถูกลบออกจากเว็บไซต์`,()=>Nr(o)));d.append(f,k,E,v),s.append(l,d),e.append(s)})}async function kn(e,t){if(!Y()||![-1,1].includes(t))return;if(e.source==="google-drive")return A("เปลี่ยนลำดับด้วยการใส่เลขนำหน้าชื่อไฟล์ใน Google Drive","error");const n=J(e),o=p.media.filter(u=>J(u)===n).sort((u,l)=>(Number(u.order)||0)-(Number(l.order)||0)||String(u.id).localeCompare(String(l.id))),a=o.findIndex(u=>u.id===e.id),r=a+t;if(a<0||r<0||r>=o.length)return;if(o.length>499)return A("รายการสื่อมีจำนวนมากเกินกว่าจะจัดลำดับพร้อมกัน","error");[o[a],o[r]]=[o[r],o[a]];const numItems=o.length,newOrders=new Array(numItems),fixedIndices=[];for(let i=0;i<numItems;i++){if(o[i].source==="google-drive"){fixedIndices.push(i);newOrders[i]=Number(o[i].order)||(i+1)*10}}if(fixedIndices.length===0){for(let i=0;i<numItems;i++){newOrders[i]=(i+1)*10}}else{for(let k=0;k<fixedIndices.length-1;k++){const i1=fixedIndices[k],i2=fixedIndices[k+1];if(newOrders[i2]<=newOrders[i1]){newOrders[i2]=newOrders[i1]+10}}const firstFixed=fixedIndices[0],firstVal=newOrders[firstFixed],stepBefore=firstVal>0?firstVal/(firstFixed+1):10;for(let i=0;i<firstFixed;i++){newOrders[i]=Math.round(((i+1)*stepBefore)*100)/100}for(let k=0;k<fixedIndices.length-1;k++){const i1=fixedIndices[k],i2=fixedIndices[k+1],v1=newOrders[i1],v2=newOrders[i2],cnt=i2-i1-1,step=(v2-v1)/(cnt+1);for(let i=1;i<=cnt;i++){newOrders[i1+i]=Math.round((v1+step*i)*100)/100}}const lastFixed=fixedIndices[fixedIndices.length-1],lastVal=newOrders[lastFixed];for(let i=lastFixed+1;i<numItems;i++){newOrders[i]=lastVal+(i-lastFixed)*10}}const updates=[],oldOrders=new Map();o.forEach((item,idx)=>{if(item.source!=="google-drive"){const assigned=Number(newOrders[idx]);if(Number(item.order)!==assigned){oldOrders.set(item.id,item.order);updates.push({item,newOrder:assigned})}}});if(!updates.length)return;updates.forEach(({item,newOrder})=>{item.order=newOrder});ln();Lt(".manage-media-row button").forEach(u=>{u.disabled=!0});try{const u=pe(X);updates.forEach(({item,newOrder})=>{u.update(Q(U.media,item.id),{order:newOrder,updatedAt:I(),updatedBy:p.user?p.user.uid:"admin"})});await u.commit();A(t<0?"เลื่อนสื่อขึ้นแล้ว":"เลื่อนสื่อลงแล้ว")}catch(err){console.error("Reorder failed:",err);updates.forEach(({item})=>{if(oldOrders.has(item.id)){item.order=oldOrders.get(item.id)}});A("เปลี่ยนลำดับสื่อไม่สำเร็จ","error")}finally{ln()}}async function Dr(e){if(e.preventDefault(),!Y())return;const t=p.editingMedia,n=c("#mediaForm"),o=c("#saveMediaButton"),a=[];let r=!1;o.disabled=!0,o.textContent="กำลังบันทึก...";const s=c("#mediaFormStatus");s&&(s.hidden=!0,s.textContent="");try{const u=c("#mediaSection").value,l={storyFeature:"feature01",storyArt:"feature02",storyPeople:"feature03",criteriaOne:"criterion01",criteriaTwo:"criterion02",criteriaThree:"criterion03",processOverview:"overview",processOne:"step01",processTwo:"step02",processThree:"step03",processFour:"step04",milestoneOne:"milestone01",milestoneTwo:"milestone02",milestoneThree:"milestone03",milestoneFour:"milestone04",muchalindaHero:"hero",muchalindaShowcase:"showcase",muchalindaCardHistory:"history",muchalindaCardRestoration:"restoration",muchalindaDonation:"donation"},m=["criteriaOne","criteriaTwo","criteriaThree"].includes(u),h=["processOverview","processOne","processTwo","processThree","processFour"].includes(u),d=["milestoneOne","milestoneTwo","milestoneThree","milestoneFour"].includes(u),f=["muchalindaHero","muchalindaShowcase","muchalindaCardHistory","muchalindaCardRestoration","muchalindaDonation"].includes(u),k=u==="hero"||l[u]?m?"criteria":h?"process":d?"milestones":f?"muchalinda":"story":u,E=u==="hero"?"hero":l[u]||"";let v=c("#mediaType").value;const T=c("#mediaTitle").value.trim(),C=c("#mediaDescription").value.trim(),M=c("#mediaFile").files[0],q=c("#mediaUrl").value.trim();let N=q||(t==null?void 0:t.url)||"";if(_isFacebookVideo(N)||_isTikTokVideo(N)||ia(N)||nt(N)||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(N)){v="video"};let w=(t==null?void 0:t.storagePath)||"";const _oldUrlPath=(t!=null&&t.url&&typeof t.url==="string"&&t.url.includes("firebasestorage.googleapis.com"))?decodeURIComponent((t.url.split("/o/")[1]||"").split("?")[0]):"";const R=[t==null?void 0:t.storagePath,t==null?void 0:t.originalStoragePath,_oldUrlPath].filter(Boolean);if(!ie[u]||!["image","video"].includes(v)||!T)throw new Error("กรุณากรอกข้อมูลให้ครบ");if(M){const $=M.type.startsWith("image/"),W=M.type.startsWith("video/");if(v==="image"&&!$||v==="video"&&!W)throw new Error("ประเภทไฟล์ไม่ตรงกับที่เลือก");if(v==="video"&&M.size>100*1024*1024)throw new Error("วิดีโอต้องมีขนาดไม่เกิน 100 MB");const _targetMediaRef=t?Q(U.media,t.id):j(Ee(U.media));const _mediaDocId=_targetMediaRef.id;if(v==="image"){o.textContent="กำลังปรับภาพคุณภาพสูง...";const g=await wr(M,u);w=`projects/${Ke}/media/${p.user.uid}/${_mediaDocId}.webp`,o.textContent="กำลังอัปโหลดรูปภาพ...";const x=await Ot(ce(ke,w),g,{contentType:g.type});a.push(w),N=await zt(x.ref)}else{const _mext=M.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g,"")||"mp4";w=`projects/${Ke}/media/${p.user.uid}/${_mediaDocId}.${_mext}`,o.textContent="กำลังอัปโหลดวิดีโอ...";const b=await Ot(ce(ke,w),M,{contentType:M.type});a.push(w),N=await zt(b.ref)}}else q&&q!==(t==null?void 0:t.url)&&(w="");if(!ye(N))throw new Error("กรุณาใส่ลิงก์ https:// หรือเลือกไฟล์");if(!M&&v==="video"&&Tn(N)&&!nt(N))throw new Error("ลิงก์ Google Drive ไม่ถูกต้อง กรุณาใช้ลิงก์แชร์ของไฟล์วิดีโอ");if(!M&&v==="image"&&Tn(N)){if(!nt(N))throw new Error("ลิงก์ Google Drive ไม่ถูกต้อง กรุณาใช้ลิงก์แชร์ของไฟล์รูปภาพ");N=an(N)}const P={section:k,placement:E,type:v,title:T,title_lo:(c("#mediaTitleLo")?.value.trim())||"",title_en:(c("#mediaTitleEn")?.value.trim())||"",description:C,description_lo:(c("#mediaDescriptionLo")?.value.trim())||"",description_en:(c("#mediaDescriptionEn")?.value.trim())||"",url:N,storagePath:w,order:(t==null?void 0:t.order)||Date.now(),updatedAt:I(),updatedBy:p.user.uid};const _saveMediaRef=(typeof _targetMediaRef!=="undefined"&&_targetMediaRef)?_targetMediaRef:(t?Q(U.media,t.id):j(Ee(U.media)));t?await en(_saveMediaRef,{...P,originalUrl:K(),originalStoragePath:K()}):await V(_saveMediaRef,{...P,createdAt:I(),createdBy:p.user.uid,createdByEmail:p.user.email||""}),r=!0;const S=[w].filter(Boolean),O=R.filter($=>!S.includes($));await Promise.allSettled(O.map($=>De(ce(ke,$)))),n.reset(),c("#mediaDialog").close(),A(t?"แก้ไขสื่อเรียบร้อยแล้ว":"เพิ่มสื่อเรียบร้อยแล้ว")}catch(u){console.error(u),r||await Promise.allSettled(a.map(h=>De(ce(ke,h))));const m=(u==null?void 0:u.code)==="permission-denied"||(u==null?void 0:u.code)==="storage/unauthorized"?"Firebase ยังไม่อนุญาตให้บันทึกสื่อในหัวข้อนี้ กรุณา Publish firestore.rules รุ่นล่าสุด แล้วลองอีกครั้ง":u.message||"บันทึกสื่อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง";s&&(s.textContent=m,s.hidden=!1),A(m,"error")}finally{o.disabled=!1,o.textContent="บันทึก"}}async function Nr(e){if(Y()){if(e.source==="google-drive")return A("ลบไฟล์นี้จาก Google Drive แล้วระบบจะนำออกในรอบซิงก์ถัดไป","error");try{await dt(Q(U.media,e.id));const t=[e.storagePath,e.originalStoragePath].filter(Boolean);await Promise.allSettled(t.map(n=>De(ce(ke,n)))),A("ลบสื่อเรียบร้อยแล้ว")}catch(t){console.error(t),A("ลบสื่อไม่สำเร็จ","error")}}}window._openMediaManager=function(sec){return Ct(sec)};window._appState=p;window._saveNodeReorder=async function(items,successMsg="จัดเรียงลำดับหัวข้อเรียบร้อยแล้ว"){if(!Y())return!1;if(!Array.isArray(items)||!items.length)return!0;const batch=pe(X),now=I();items.forEach(item=>{const updateData={order:Number(item.order),updatedAt:now,updatedBy:p.user.uid};typeof item.parentId!=="undefined"&&(updateData.parentId=item.parentId||""),batch.update(se(item.id),updateData);const local=p.siteNodes.find(n=>n.id===item.id);local&&(local.order=Number(item.order),typeof item.parentId!=="undefined"&&(local.parentId=item.parentId||""))});try{await batch.commit(),Te(),typeof window._renderInteractiveSiteMap==="function"&&window._renderInteractiveSiteMap(),A(successMsg);return!0}catch(err){console.error("Save reorder failed:",err),A("จัดเรียงลำดับไม่สำเร็จ กรุณาลองใหม่อีกครั้ง","error"),await pt();return!1}};window._refreshSiteTree=(...args)=>pt(...args);window._selectTreeNode=(...args)=>Dt(...args);window._renderSiteTree=(...args)=>Te(...args);window._getNodeChildren=(...args)=>Pe(...args);window._getActiveNodes=(...args)=>Ve(...args);window._getTreeDescendants=(...args)=>St(...args);window._showPortalToast=(...args)=>A(...args);window._isPortalAdmin=(...args)=>Y(...args);Object.defineProperty(window,"_nodeTypes",{get:()=>xn,configurable:!0});window._addNewTreeNode=(...args)=>Ln(...args);window._openTreeDialog=(...args)=>Qr(...args);async function Ct(e=""){Y()&&(p.manageSection=ie[e]?e:"",c("#manageRoleText").textContent=`เข้าสู่ระบบในสิทธิ์ ${Ne(p.role)}`,c("#manageDialogTitle").textContent=p.manageSection?`อัพเดท — ${ie[p.manageSection]}`:"Edit Web",c("#manageSectionText").textContent=p.manageSection?"เพิ่ม แก้ไข หรือลบสื่อของหัวข้อนี้":"จัดการสื่อทุกหัวข้อและกำหนดสิทธิ์ผู้ใช้",c("#userRoleSection").hidden=!!p.manageSection,c("#addMediaButton").textContent=p.manageSection?"＋ เพิ่มสื่อในหัวข้อนี้":"＋ เพิ่มรูปภาพหรือวิดีโอ",ln(),c("#manageDialog").showModal(),p.manageSection||await Ar())}async function Ar(){const e=c("#userList");e.innerHTML='<p class="empty-state">กำลังโหลดรายชื่อผู้ใช้...</p>';try{const[t,n]=await Promise.all([Se(te(br(),fe("email","asc"))),Se(Ee(U.members))]),o=new Map(n.docs.map(a=>[a.id,a.data()]));e.replaceChildren(),t.forEach(a=>{var d,f;const r={id:a.id,...a.data(),role:((d=o.get(a.id))==null?void 0:d.role)||(a.data().globalRole==="admin"?"admin":"user")},s=document.createElement("div");s.className="user-row";const u=document.createElement("div"),l=document.createElement("strong");l.textContent=r.displayName||r.email||"ผู้ใช้";const m=document.createElement("span");m.textContent=r.email||"",u.append(l,m);const h=document.createElement("select");["user","manager","admin"].forEach(k=>{const E=document.createElement("option");E.value=k,E.textContent=Ne(k),E.selected=r.role===k,h.append(E)}),((f=r.email)==null?void 0:f.toLowerCase())===tn&&(h.disabled=!0),h.addEventListener("change",async()=>{try{const k={role:h.value,roleUpdatedAt:I(),roleUpdatedBy:p.user.uid};await V($n(r.id),{...k,email:r.email||"",displayName:r.displayName||""},{merge:!0}),A("ปรับสิทธิ์ผู้ใช้เรียบร้อยแล้ว")}catch{h.value=r.role||"user",A("ปรับสิทธิ์ไม่สำเร็จ","error")}}),s.append(u,h),e.append(s)}),e.children.length||(e.innerHTML='<p class="empty-state">ยังไม่มีผู้ใช้เข้าสู่ระบบ</p>')}catch(t){console.error(t),e.innerHTML='<p class="empty-state">ไม่สามารถโหลดรายชื่อผู้ใช้ได้</p>'}}function _r(e){const t=c("#commentList");if(t.replaceChildren(),!e.length){t.innerHTML='<p class="empty-state">ยังไม่มีความคิดเห็น เป็นคนแรกที่ร่วมส่งกำลังใจได้เลย</p>';return}e.forEach(n=>{const o=document.createElement("article");o.className="comment-card";const a=document.createElement("header"),r=document.createElement("strong");r.textContent=n.authorName||"ผู้ใช้งาน";const s=document.createElement("span");s.textContent=`${ie[n.section]||"ภาพรวมเว็บไซต์"} · ${rn(n.createdAt)}`;const u=document.createElement("p");if(u.textContent=n.text||"",a.append(r,s),o.append(a,u),Y()||p.user&&n.authorId===p.user.uid){const l=document.createElement("button");l.className="small-delete",l.type="button",l.title="ลบความคิดเห็น",l.textContent="ลบ",l.addEventListener("click",()=>cn("ลบความคิดเห็น?","ความคิดเห็นนี้จะถูกนำออกจากเว็บไซต์",async()=>{try{await dt(Q(U.comments,n.id))}catch{A("ลบความคิดเห็นไม่สำเร็จ","error")}})),o.append(l)}t.append(o)})}async function Mr(e){if(e.preventDefault(),!p.user)return Tt();const t=c("#commentText").value.trim();if(!t)return A("กรุณาเขียนความคิดเห็น");const n=c("#commentForm button[type=submit]");n.disabled=!0;try{await Re(Ee(U.comments),{text:t,section:c("#commentSection").value,authorId:p.user.uid,authorName:p.user.displayName||p.user.email||"ผู้ใช้งาน",authorEmail:p.user.email||"",createdAt:I()}),c("#commentText").value="",A("ส่งความคิดเห็นเรียบร้อยแล้ว")}catch(o){console.error(o),A("ส่งความคิดเห็นไม่สำเร็จ","error")}finally{n.disabled=!1}}function dn(){if(c("#chatPanel").classList.add("open"),c("#chatPanel").setAttribute("aria-hidden","false"),!p.user){c("#chatMessages").innerHTML='<p class="empty-state">กรุณาเข้าสู่ระบบด้วย Google เพื่อสนทนากับ Admin หรือ Manager</p>',c("#chatSubtitle").textContent="เข้าสู่ระบบเพื่อเริ่มสนทนา";return}Vt()?Wn():(c("#chatThreadList").hidden=!0,p.activeChatUid=p.user.uid,c("#chatSubtitle").textContent="สนทนากับ Admin และ Manager",Gt(p.user.uid))}function Wn(){c("#chatThreadList").hidden=!1,p.unsubThreads&&p.unsubThreads(),p.unsubThreads=ae(te(Ee(U.chats),fe("updatedAt","desc"),Zt(30)),e=>{const t=c("#chatThreadList");if(t.replaceChildren(),e.empty){t.innerHTML='<p class="empty-state">ยังไม่มีข้อความจากผู้ใช้</p>',c("#chatMessages").innerHTML='<p class="empty-state">เมื่อมีผู้ใช้ส่งข้อความ รายการสนทนาจะปรากฏที่นี่</p>';return}if(e.forEach(n=>{const o={id:n.id,...n.data()},a=document.createElement("button");a.className=`thread-button${p.activeChatUid===o.id?" active":""}`,a.type="button";const r=document.createElement("strong");r.textContent=o.ownerName||o.ownerEmail||"ผู้ใช้";const s=document.createElement("span");s.textContent=o.lastMessage||"",a.append(r,s),a.addEventListener("click",()=>{p.activeChatUid=o.id,c("#chatSubtitle").textContent=o.ownerName||o.ownerEmail||"ผู้ใช้",Gt(o.id),Wn()}),t.append(a)}),!p.activeChatUid&&e.docs[0]){p.activeChatUid=e.docs[0].id;const n=e.docs[0].data();c("#chatSubtitle").textContent=n.ownerName||n.ownerEmail||"ผู้ใช้",Gt(p.activeChatUid)}},e=>{console.error(e),c("#chatThreadList").innerHTML='<p class="empty-state">ไม่สามารถโหลดรายการสนทนาได้</p>'})}function Gt(e){p.unsubMessages&&p.unsubMessages(),p.unsubMessages=ae(te(Fn(e),fe("createdAt","asc"),Zt(100)),t=>{const n=c("#chatMessages");n.replaceChildren(),t.empty&&(n.innerHTML='<p class="empty-state">เริ่มบทสนทนาได้เลย ข้อความจะส่งถึงทีมผู้ดูแล</p>'),t.forEach(o=>{var l;const a=o.data(),r=document.createElement("div");r.className=`chat-message${a.senderId===((l=p.user)==null?void 0:l.uid)?" mine":""}`;const s=document.createElement("span");s.textContent=a.text||"";const u=document.createElement("small");u.textContent=`${a.senderName||Ne(a.senderRole)} · ${rn(a.createdAt)}`,r.append(s,u),n.append(r)}),n.scrollTop=n.scrollHeight},t=>{console.error(t),c("#chatMessages").innerHTML='<p class="empty-state">ไม่สามารถโหลดข้อความได้</p>'})}async function Br(e){if(e.preventDefault(),!p.user)return Tt();const t=c("#chatInput").value.trim(),n=Vt()?p.activeChatUid:p.user.uid;if(!t)return;if(!n)return A("กรุณาเลือกผู้สนทนา","error");const o=c("#chatForm button");o.disabled=!0;try{const a=Q(U.chats,n),r=await ge(a),s=Vt()?r.data()||{ownerId:n}:{ownerId:p.user.uid,ownerName:p.user.displayName||p.user.email||"ผู้ใช้",ownerEmail:p.user.email||""};await V(a,{...s,lastMessage:t.slice(0,160),updatedAt:I(),...r.exists()?{}:{createdAt:I()}},{merge:!0}),await Re(Fn(n),{text:t,senderId:p.user.uid,senderName:p.user.displayName||p.user.email||Ne(p.role),senderRole:p.role,createdAt:I()}),c("#chatInput").value=""}catch(a){console.error(a),A("ส่งข้อความไม่สำเร็จ","error")}finally{o.disabled=!1}}const xn={project:{label:"โครงการ",icon:"◆"},page:{label:"หน้าเนื้อหา",icon:"▤"},news:{label:"ข่าวและกิจกรรม",icon:"◫"},media:{label:"ภาพและวิดีโอ",icon:"▣"},document:{label:"เอกสาร",icon:"▧"},donation:{label:"ร่วมบุญ",icon:"♡"},link:{label:"ลิงก์ภายนอก",icon:"↗"},folder:{label:"หมวดหมู่",icon:"◇"}},ct={"project:world-heritage":{label:"ข้อมูลโครงการพระธาตุพนม สู่มรดกโลก",kind:"project",ref:"world-heritage"},"media:all":{label:"รูปภาพและวิดีโอทั้งหมด",kind:"media",ref:"all"},"media:hero":{label:"ภาพหลักด้านบน",kind:"media",ref:"hero"},"media:storyFeature":{label:"พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา",kind:"media",ref:"storyFeature"},"media:storyArt":{label:"พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",kind:"media",ref:"storyArt"},"media:storyPeople":{label:"พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",kind:"media",ref:"storyPeople"},"media:criteriaOne":{label:"คุณค่าโดดเด่นหมายเลข 1",kind:"media",ref:"criteriaOne"},"media:criteriaTwo":{label:"คุณค่าโดดเด่นหมายเลข 2",kind:"media",ref:"criteriaTwo"},"media:criteriaThree":{label:"คุณค่าโดดเด่นหมายเลข 3",kind:"media",ref:"criteriaThree"},"media:processOverview":{label:"สไลด์ภาพรวม — งานที่ต้องทำร่วมกัน",kind:"media",ref:"processOverview"},"media:processOne":{label:"งานที่ต้องทำร่วมกัน ข้อ 1",kind:"media",ref:"processOne"},"media:processTwo":{label:"งานที่ต้องทำร่วมกัน ข้อ 2",kind:"media",ref:"processTwo"},"media:processThree":{label:"งานที่ต้องทำร่วมกัน ข้อ 3",kind:"media",ref:"processThree"},"media:processFour":{label:"งานที่ต้องทำร่วมกัน ข้อ 4",kind:"media",ref:"processFour"},"media:milestoneOne":{label:"หมุดหมายสำคัญ ข้อ 1",kind:"media",ref:"milestoneOne"},"media:milestoneTwo":{label:"หมุดหมายสำคัญ ข้อ 2",kind:"media",ref:"milestoneTwo"},"media:milestoneThree":{label:"หมุดหมายสำคัญ ข้อ 3",kind:"media",ref:"milestoneThree"},"media:milestoneFour":{label:"หมุดหมายสำคัญ ข้อ 4",kind:"media",ref:"milestoneFour"},"media:story":{label:"เรื่องราวแห่งศรัทธา",kind:"media",ref:"story"},"media:criteria":{label:"คุณค่าโดดเด่นเป็นสากล",kind:"media",ref:"criteria"},"media:milestones":{label:"หมุดหมายสำคัญ",kind:"media",ref:"milestones"},"media:videos":{label:"คลังวิดีโอจาก Google Drive",kind:"media",ref:"videos"},"media:muchalindaHero":{label:"ภาพนำ — โครงการบูรณะสระมุจลินท์",kind:"media",ref:"muchalindaHero"},"media:muchalindaDonation":{label:"ร่วมบุญ — โครงการบูรณะสระมุจลินท์",kind:"media",ref:"muchalindaDonation"},"content:news":{label:"ข่าวและกิจกรรมของโครงการ",kind:"content",ref:"news"},"content:document":{label:"เอกสารเผยแพร่ของโครงการ",kind:"content",ref:"document"},"content:donation":{label:"ช่องทางร่วมบุญของโครงการ",kind:"content",ref:"donation"}},ut=()=>Ee(U.siteNodes),se=e=>Q(U.siteNodes,e),Rr=e=>xn[e]||xn.page,Ve=()=>p.siteNodes.filter(e=>!e.deletedAt);function Pr(e){return String(e||"").trim().toLowerCase().replace(/[^a-z0-9]+/g,"-").replace(/^-+|-+$/g,"").slice(0,100)}function Pe(e,t=!1){return p.siteNodes.filter(n=>(n.parentId||"")===(e||"")&&(t||!n.deletedAt)).sort((n,o)=>(Number(n.order)||0)-(Number(o.order)||0)||String(n.title).localeCompare(String(o.title),"th"))}function St(e){const t=new Set,n=o=>Pe(o,!0).forEach(a=>{t.has(a.id)||(t.add(a.id),n(a.id))});return n(e),t}async function Ur(){if(!(await Se(ut())).empty)return;const t=[{id:"site-root",parentId:"",type:"folder",title:"พระธาตุพนม",slug:"that-phanom",order:10,published:!1,description:"โหนดหลักของเว็บไซต์และทุกโครงการ"},{id:"project-world-heritage",parentId:"site-root",type:"project",title:"พระธาตุพนม สู่มรดกโลก",slug:"world-heritage",order:10,published:!1,description:"โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม",contentType:"project",contentRef:"world-heritage"},{id:"page-hero",parentId:"project-world-heritage",type:"media",title:"ภาพหลักด้านบน",slug:"hero",order:5,published:!1,description:"สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์",contentType:"media",contentRef:"hero"},{id:"page-history",parentId:"project-world-heritage",type:"page",title:"ความเป็นมา",slug:"history",order:10,published:!1,description:"ประวัติความเป็นมาของพระธาตุพนม",contentType:"media",contentRef:"story"},{id:"page-story-feature",parentId:"project-world-heritage",type:"media",title:"พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา",slug:"story-feature",order:15,published:!1,description:"สื่อเด่นในพื้นที่หมายเลข 01",contentType:"media",contentRef:"storyFeature"},{id:"page-story-art",parentId:"project-world-heritage",type:"media",title:"พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",slug:"story-art",order:16,published:!1,description:"สื่อในพื้นที่หมายเลข 02",contentType:"media",contentRef:"storyArt"},{id:"page-story-people",parentId:"project-world-heritage",type:"media",title:"พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",slug:"story-people",order:17,published:!1,description:"สื่อในพื้นที่หมายเลข 03",contentType:"media",contentRef:"storyPeople"},{id:"page-value",parentId:"project-world-heritage",type:"page",title:"คุณค่าโดดเด่นเป็นสากล",slug:"outstanding-value",order:20,published:!1,description:"เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก",contentType:"media",contentRef:"criteria"},{id:"page-criteria-one",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 1",slug:"criteria-one",order:10,published:!1,description:"สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ",contentType:"media",contentRef:"criteriaOne"},{id:"page-criteria-two",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 2",slug:"criteria-two",order:20,published:!1,description:"สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",contentType:"media",contentRef:"criteriaTwo"},{id:"page-criteria-three",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 3",slug:"criteria-three",order:30,published:!1,description:"สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่",contentType:"media",contentRef:"criteriaThree"},{id:"page-process",parentId:"project-world-heritage",type:"folder",title:"งานที่ต้องทำร่วมกัน",slug:"shared-work",order:25,published:!1,description:"จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน"},{id:"page-process-overview",parentId:"page-process",type:"media",title:"สไลด์ภาพรวมงานที่ต้องทำร่วมกัน",slug:"process-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน",contentType:"media",contentRef:"processOverview"},{id:"page-process-one",parentId:"page-process",type:"media",title:"1 กำหนดคุณค่าและขอบเขต",slug:"process-one",order:10,published:!1,description:"สื่อประกอบงานข้อ 1",contentType:"media",contentRef:"processOne"},{id:"page-process-two",parentId:"page-process",type:"media",title:"2 จัดทำแผนอนุรักษ์และบริหาร",slug:"process-two",order:20,published:!1,description:"สื่อประกอบงานข้อ 2",contentType:"media",contentRef:"processTwo"},{id:"page-process-three",parentId:"page-process",type:"media",title:"3 สร้างการมีส่วนร่วม",slug:"process-three",order:30,published:!1,description:"สื่อประกอบงานข้อ 3",contentType:"media",contentRef:"processThree"},{id:"page-process-four",parentId:"page-process",type:"media",title:"4 จัดทำเอกสารเสนอชื่อ",slug:"process-four",order:40,published:!1,description:"สื่อประกอบงานข้อ 4",contentType:"media",contentRef:"processFour"},{id:"page-milestones",parentId:"project-world-heritage",type:"folder",title:"หมุดหมายสำคัญ",slug:"milestones",order:30,published:!1,description:"อดีตที่หล่อหลอมอนาคต"},{id:"page-milestones-overview",parentId:"page-milestones",type:"media",title:"สไลด์ภาพรวมหมุดหมายสำคัญ",slug:"milestones-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ",contentType:"media",contentRef:"milestones"},{id:"page-milestone-one",parentId:"page-milestones",type:"media",title:"1 โครงสร้างยุคแรก",slug:"milestone-one",order:10,published:!1,description:"ราวพุทธศตวรรษที่ 12–13",contentType:"media",contentRef:"milestoneOne"},{id:"page-milestone-two",parentId:"page-milestones",type:"media",title:"2 โบราณสถานของชาติ",slug:"milestone-two",order:20,published:!1,description:"พ.ศ. 2478",contentType:"media",contentRef:"milestoneTwo"},{id:"page-milestone-three",parentId:"page-milestones",type:"media",title:"3 ล้มและฟื้นคืน",slug:"milestone-three",order:30,published:!1,description:"พ.ศ. 2518–2522",contentType:"media",contentRef:"milestoneThree"},{id:"page-milestone-four",parentId:"page-milestones",type:"media",title:"4 ก้าวสู่เวทีโลก",slug:"milestone-four",order:40,published:!1,description:"2 ก.พ. 2560",contentType:"media",contentRef:"milestoneFour"},{id:"page-news",parentId:"project-world-heritage",type:"news",title:"ข่าวและกิจกรรม",slug:"news",order:40,published:!1,description:"ข่าวสารและกิจกรรมของโครงการ"},{id:"page-media",parentId:"project-world-heritage",type:"media",title:"ภาพและวิดีโอ",slug:"media",order:50,published:!1,description:"คลังภาพและวิดีโอของโครงการ",contentType:"media",contentRef:"all"},{id:"page-documents",parentId:"project-world-heritage",type:"document",title:"เอกสาร",slug:"documents",order:60,published:!1,description:"เอกสารอ้างอิงและเอกสารเผยแพร่"},{id:"page-donation",parentId:"project-world-heritage",type:"donation",title:"ร่วมบุญ",slug:"donation",order:70,published:!1,description:"ข้อมูลการร่วมบุญกับโครงการ"}],n=pe(X);t.forEach(o=>n.set(se(o.id),{...o,createdAt:I(),createdBy:p.user.uid,updatedAt:I(),updatedBy:p.user.uid})),await n.commit()}async function jr(){const e=Q(U.settings,"site-tree-layout-v7");if((await ge(e)).exists())return;const n=await Se(ut()),o=new Map(n.docs.map(s=>[s.id,s.data()])),a=[{id:"site-root",parentId:"",type:"folder",title:"พระธาตุพนม",slug:"that-phanom",order:10,published:!1,description:"โหนดหลักของเว็บไซต์และทุกโครงการ",contentType:K(),contentRef:K()},{id:"project-world-heritage",parentId:"site-root",type:"project",title:"พระธาตุพนม สู่มรดกโลก",slug:"world-heritage",order:10,published:!1,description:"โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม",contentType:"project",contentRef:"world-heritage"},{id:"page-hero",parentId:"project-world-heritage",type:"media",title:"ภาพหลักด้านบน",slug:"hero",order:10,published:!1,description:"สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์",contentType:"media",contentRef:"hero"},{id:"page-history",parentId:"project-world-heritage",type:"folder",title:"เรื่องราวแห่งศรัทธา",slug:"story",order:20,published:!1,description:"รูปภาพและวิดีโอในหัวข้อเรื่องราวแห่งศรัทธา",contentType:K(),contentRef:K()},{id:"page-story-feature",parentId:"page-history",type:"media",title:"พื้นที่หมายเลข 01",slug:"story-feature",order:10,published:!1,description:"สื่อเด่นในพื้นที่หมายเลข 01",contentType:"media",contentRef:"storyFeature"},{id:"page-story-art",parentId:"page-history",type:"media",title:"พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",slug:"story-art",order:20,published:!1,description:"สื่อในพื้นที่หมายเลข 02",contentType:"media",contentRef:"storyArt"},{id:"page-story-people",parentId:"page-history",type:"media",title:"พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",slug:"story-people",order:30,published:!1,description:"สื่อในพื้นที่หมายเลข 03",contentType:"media",contentRef:"storyPeople"},{id:"page-story-slider",parentId:"page-history",type:"media",title:"สไลด์เรื่องราวแห่งศรัทธา",slug:"story-slider",order:40,published:!1,description:"รูปภาพและวิดีโอในสไลด์เรื่องราวแห่งศรัทธา",contentType:"media",contentRef:"story"},{id:"page-value",parentId:"project-world-heritage",type:"page",title:"คุณค่าโดดเด่นเป็นสากล",slug:"outstanding-value",order:30,published:!1,description:"เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก",contentType:"media",contentRef:"criteria"},{id:"page-criteria-one",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 1",slug:"criteria-one",order:10,published:!1,description:"สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ",contentType:"media",contentRef:"criteriaOne"},{id:"page-criteria-two",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 2",slug:"criteria-two",order:20,published:!1,description:"สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",contentType:"media",contentRef:"criteriaTwo"},{id:"page-criteria-three",parentId:"page-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 3",slug:"criteria-three",order:30,published:!1,description:"สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่",contentType:"media",contentRef:"criteriaThree"},{id:"page-process",parentId:"project-world-heritage",type:"folder",title:"งานที่ต้องทำร่วมกัน",slug:"shared-work",order:35,published:!1,description:"จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน",contentType:K(),contentRef:K()},{id:"page-process-overview",parentId:"page-process",type:"media",title:"สไลด์ภาพรวมงานที่ต้องทำร่วมกัน",slug:"process-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน",contentType:"media",contentRef:"processOverview"},{id:"page-process-one",parentId:"page-process",type:"media",title:"1 กำหนดคุณค่าและขอบเขต",slug:"process-one",order:10,published:!1,description:"สื่อประกอบงานข้อ 1",contentType:"media",contentRef:"processOne"},{id:"page-process-two",parentId:"page-process",type:"media",title:"2 จัดทำแผนอนุรักษ์และบริหาร",slug:"process-two",order:20,published:!1,description:"สื่อประกอบงานข้อ 2",contentType:"media",contentRef:"processTwo"},{id:"page-process-three",parentId:"page-process",type:"media",title:"3 สร้างการมีส่วนร่วม",slug:"process-three",order:30,published:!1,description:"สื่อประกอบงานข้อ 3",contentType:"media",contentRef:"processThree"},{id:"page-process-four",parentId:"page-process",type:"media",title:"4 จัดทำเอกสารเสนอชื่อ",slug:"process-four",order:40,published:!1,description:"สื่อประกอบงานข้อ 4",contentType:"media",contentRef:"processFour"},{id:"page-milestones",parentId:"project-world-heritage",type:"folder",title:"หมุดหมายสำคัญ",slug:"milestones",order:40,published:!1,description:"อดีตที่หล่อหลอมอนาคต",contentType:K(),contentRef:K()},{id:"page-milestones-overview",parentId:"page-milestones",type:"media",title:"สไลด์ภาพรวมหมุดหมายสำคัญ",slug:"milestones-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ",contentType:"media",contentRef:"milestones"},{id:"page-milestone-one",parentId:"page-milestones",type:"media",title:"1 โครงสร้างยุคแรก",slug:"milestone-one",order:10,published:!1,description:"ราวพุทธศตวรรษที่ 12–13",contentType:"media",contentRef:"milestoneOne"},{id:"page-milestone-two",parentId:"page-milestones",type:"media",title:"2 โบราณสถานของชาติ",slug:"milestone-two",order:20,published:!1,description:"พ.ศ. 2478",contentType:"media",contentRef:"milestoneTwo"},{id:"page-milestone-three",parentId:"page-milestones",type:"media",title:"3 ล้มและฟื้นคืน",slug:"milestone-three",order:30,published:!1,description:"พ.ศ. 2518–2522",contentType:"media",contentRef:"milestoneThree"},{id:"page-milestone-four",parentId:"page-milestones",type:"media",title:"4 ก้าวสู่เวทีโลก",slug:"milestone-four",order:40,published:!1,description:"2 ก.พ. 2560",contentType:"media",contentRef:"milestoneFour"},{id:"page-media",parentId:"project-world-heritage",type:"folder",title:"คลังสื่อทั้งหมด",slug:"media",order:50,published:!1,description:"พื้นที่เตรียมจัดหมวดหมู่คลังสื่อ",contentType:K(),contentRef:K()},{id:"page-news",parentId:"project-world-heritage",type:"news",title:"ข่าวและกิจกรรม",slug:"news",order:60,published:!1,description:"ข่าวสารและกิจกรรมของโครงการ"},{id:"page-documents",parentId:"project-world-heritage",type:"document",title:"เอกสาร",slug:"documents",order:70,published:!1,description:"เอกสารอ้างอิงและเอกสารเผยแพร่"},{id:"page-donation",parentId:"project-world-heritage",type:"donation",title:"ร่วมบุญ",slug:"donation",order:80,published:!1,description:"ข้อมูลการร่วมบุญกับโครงการ"}],r=pe(X);a.forEach(s=>r.set(se(s.id),{...s,deletedAt:K(),deletedBy:K(),updatedAt:I(),updatedBy:p.user.uid,...o.has(s.id)?{}:{createdAt:I(),createdBy:p.user.uid}},{merge:!0})),r.set(e,{completedAt:I(),completedBy:p.user.uid,version:7}),await r.commit()}async function $r(){const e=Q(U.settings,"site-tree-content-v8");if((await ge(e)).exists())return;const n=[["page-media","media","all"],["page-news","content","news"],["page-documents","content","document"],["page-donation","content","donation"]],o=pe(X);n.forEach(([a,r,s])=>o.set(se(a),{contentType:r,contentRef:s,updatedAt:I(),updatedBy:p.user.uid},{merge:!0})),o.set(e,{completedAt:I(),completedBy:p.user.uid,version:8}),await o.commit()}async function Fr(){const e=Q(U.settings,"site-tree-muchalinda-v10");if((await ge(e)).exists())return;const o=(await Se(ut())).docs.find(u=>{const l=u.data(),m=`${l.slug||""} ${l.title||""}`.toLowerCase();return l.type==="project"&&(m.includes("muchalinda")||m.includes("mujalin")||m.includes("มุจลิน"))}),a=(o==null?void 0:o.id)||"project-muchalinda-restoration",r=(o==null?void 0:o.data())||{},s=pe(X);s.set(se(a),{parentId:"project-world-heritage",type:"project",title:r.title||"บูรณะสระมุจลินท์",slug:r.slug||"muchalinda-restoration",order:Number(r.order)||20,published:!!r.published,description:r.description||"โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก เพื่อฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์และภูมิทัศน์ประวัติศาสตร์",contentType:"project",contentRef:"muchalinda",updatedAt:I(),updatedBy:p.user.uid,...o?{}:{createdAt:I(),createdBy:p.user.uid}},{merge:!0}),[{id:"page-muchalinda-overview",type:"media",title:"ภาพรวมโครงการ",slug:"overview",order:10,description:"ภาพและวิดีโอภาพรวมโครงการบูรณะสระมุจลินท์",contentType:"media",contentRef:"muchalindaHero"},{id:"page-muchalinda-history",type:"page",title:"ความเป็นมา",slug:"history",order:20,description:"ประวัติและความสำคัญของสระมุจลินท์"},{id:"page-muchalinda-objectives",type:"page",title:"วัตถุประสงค์",slug:"objectives",order:30,description:"วัตถุประสงค์ของการบูรณะและการอนุรักษ์"},{id:"page-muchalinda-progress",type:"page",title:"ความคืบหน้า",slug:"progress",order:40,description:"ลำดับเหตุการณ์และความคืบหน้าของโครงการ"},{id:"page-muchalinda-donation",type:"media",title:"ร่วมบุญกับโครงการ",slug:"donation",order:50,description:"รูปภาพ วิดีโอ และข้อมูลช่องทางร่วมบุญ",contentType:"media",contentRef:"muchalindaDonation"}].forEach(u=>s.set(se(u.id),{...u,parentId:a,published:!!r.published,updatedAt:I(),updatedBy:p.user.uid,createdAt:I(),createdBy:p.user.uid},{merge:!0})),s.set(e,{completedAt:I(),completedBy:p.user.uid,version:10,projectId:a}),await s.commit()}function Or(){return[{id:"fallback-site-root",parentId:"",type:"folder",title:"พระธาตุพนม",slug:"that-phanom",order:10,published:!1,description:"โหนดหลักของเว็บไซต์"},{id:"fallback-project",parentId:"fallback-site-root",type:"project",title:"พระธาตุพนม สู่มรดกโลก",slug:"world-heritage",order:10,published:!1,description:"โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม"},{id:"fallback-hero",parentId:"fallback-project",type:"media",title:"ภาพหลักด้านบน",slug:"hero",order:10,published:!1,description:"สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์",contentType:"media",contentRef:"hero"},{id:"fallback-story",parentId:"fallback-project",type:"folder",title:"เรื่องราวแห่งศรัทธา",slug:"story",order:20,published:!1,description:"รูปภาพและวิดีโอในหัวข้อเรื่องราวแห่งศรัทธา"},{id:"fallback-feature",parentId:"fallback-story",type:"media",title:"พื้นที่หมายเลข 01",slug:"story-feature",order:10,published:!1,description:"สื่อเด่นในพื้นที่หมายเลข 01",contentType:"media",contentRef:"storyFeature"},{id:"fallback-story-art",parentId:"fallback-story",type:"media",title:"พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม",slug:"story-art",order:20,published:!1,description:"สื่อในพื้นที่หมายเลข 02",contentType:"media",contentRef:"storyArt"},{id:"fallback-story-people",parentId:"fallback-story",type:"media",title:"พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน",slug:"story-people",order:30,published:!1,description:"สื่อในพื้นที่หมายเลข 03",contentType:"media",contentRef:"storyPeople"},{id:"fallback-story-slider",parentId:"fallback-story",type:"media",title:"สไลด์เรื่องราวแห่งศรัทธา",slug:"story-slider",order:40,published:!1,description:"รูปภาพและวิดีโอในสไลด์เรื่องราวแห่งศรัทธา",contentType:"media",contentRef:"story"},{id:"fallback-value",parentId:"fallback-project",type:"page",title:"คุณค่าโดดเด่นเป็นสากล",slug:"outstanding-value",order:30,published:!1,description:"เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก",contentType:"media",contentRef:"criteria"},{id:"fallback-criteria-one",parentId:"fallback-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 1",slug:"criteria-one",order:10,published:!1,description:"สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ",contentType:"media",contentRef:"criteriaOne"},{id:"fallback-criteria-two",parentId:"fallback-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 2",slug:"criteria-two",order:20,published:!1,description:"สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",contentType:"media",contentRef:"criteriaTwo"},{id:"fallback-criteria-three",parentId:"fallback-value",type:"media",title:"คุณค่าโดดเด่นหมายเลข 3",slug:"criteria-three",order:30,published:!1,description:"สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่",contentType:"media",contentRef:"criteriaThree"},{id:"fallback-process",parentId:"fallback-project",type:"folder",title:"งานที่ต้องทำร่วมกัน",slug:"shared-work",order:35,published:!1,description:"จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน"},{id:"fallback-process-overview",parentId:"fallback-process",type:"media",title:"สไลด์ภาพรวมงานที่ต้องทำร่วมกัน",slug:"process-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน",contentType:"media",contentRef:"processOverview"},{id:"fallback-process-one",parentId:"fallback-process",type:"media",title:"1 กำหนดคุณค่าและขอบเขต",slug:"process-one",order:10,published:!1,description:"สื่อประกอบงานข้อ 1",contentType:"media",contentRef:"processOne"},{id:"fallback-process-two",parentId:"fallback-process",type:"media",title:"2 จัดทำแผนอนุรักษ์และบริหาร",slug:"process-two",order:20,published:!1,description:"สื่อประกอบงานข้อ 2",contentType:"media",contentRef:"processTwo"},{id:"fallback-process-three",parentId:"fallback-process",type:"media",title:"3 สร้างการมีส่วนร่วม",slug:"process-three",order:30,published:!1,description:"สื่อประกอบงานข้อ 3",contentType:"media",contentRef:"processThree"},{id:"fallback-process-four",parentId:"fallback-process",type:"media",title:"4 จัดทำเอกสารเสนอชื่อ",slug:"process-four",order:40,published:!1,description:"สื่อประกอบงานข้อ 4",contentType:"media",contentRef:"processFour"},{id:"fallback-milestones",parentId:"fallback-project",type:"folder",title:"หมุดหมายสำคัญ",slug:"milestones",order:40,published:!1,description:"อดีตที่หล่อหลอมอนาคต"},{id:"fallback-milestones-overview",parentId:"fallback-milestones",type:"media",title:"สไลด์ภาพรวมหมุดหมายสำคัญ",slug:"milestones-overview",order:5,published:!1,description:"รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ",contentType:"media",contentRef:"milestones"},{id:"fallback-milestone-one",parentId:"fallback-milestones",type:"media",title:"1 โครงสร้างยุคแรก",slug:"milestone-one",order:10,published:!1,description:"ราวพุทธศตวรรษที่ 12–13",contentType:"media",contentRef:"milestoneOne"},{id:"fallback-milestone-two",parentId:"fallback-milestones",type:"media",title:"2 โบราณสถานของชาติ",slug:"milestone-two",order:20,published:!1,description:"พ.ศ. 2478",contentType:"media",contentRef:"milestoneTwo"},{id:"fallback-milestone-three",parentId:"fallback-milestones",type:"media",title:"3 ล้มและฟื้นคืน",slug:"milestone-three",order:30,published:!1,description:"พ.ศ. 2518–2522",contentType:"media",contentRef:"milestoneThree"},{id:"fallback-milestone-four",parentId:"fallback-milestones",type:"media",title:"4 ก้าวสู่เวทีโลก",slug:"milestone-four",order:40,published:!1,description:"2 ก.พ. 2560",contentType:"media",contentRef:"milestoneFour"},{id:"fallback-muchalinda",parentId:"fallback-project",type:"project",title:"บูรณะสระมุจลินท์",slug:"muchalinda-restoration",order:50,published:!1,description:"โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก"},{id:"fallback-muchalinda-overview",parentId:"fallback-muchalinda",type:"page",title:"ภาพรวมโครงการ",slug:"overview",order:10,published:!1,description:"ภาพรวมโครงการบูรณะสระมุจลินท์"},{id:"fallback-muchalinda-history",parentId:"fallback-muchalinda",type:"page",title:"ความเป็นมา",slug:"history",order:20,published:!1,description:"ประวัติและความสำคัญของสระมุจลินท์"},{id:"fallback-muchalinda-objectives",parentId:"fallback-muchalinda",type:"page",title:"วัตถุประสงค์",slug:"objectives",order:30,published:!1,description:"วัตถุประสงค์ของการบูรณะ"},{id:"fallback-muchalinda-progress",parentId:"fallback-muchalinda",type:"page",title:"ความคืบหน้า",slug:"progress",order:40,published:!1,description:"ลำดับเหตุการณ์ของโครงการ"},{id:"fallback-muchalinda-donation",parentId:"fallback-muchalinda",type:"media",title:"ร่วมบุญกับโครงการ",slug:"donation",order:50,published:!1,description:"รูปภาพ วิดีโอ และข้อมูลช่องทางร่วมบุญ",contentType:"media",contentRef:"muchalindaDonation"}]}async function pt(){if(!Y())return;const e=c("#siteTree");e.innerHTML='<p class="empty-state">กำลังโหลดผังโครงการ...</p>';try{await Ur(),await jr(),await $r(),await Fr();const t=await Se(ut());p.siteNodes=t.docs.map(n=>({id:n.id,...n.data()})),Te()}catch(t){console.error("Site tree unavailable",t),p.siteNodes=Or(),Te();const n=document.createElement("div");n.className="tree-rule-notice",n.innerHTML="<strong>กำลังแสดงผังโครงการฉบับทดลอง</strong><span>หากต้องการบันทึก เพิ่ม แก้ไข หรือลบโหนด ให้ Publish firestore.rules แล้วเปิดหน้านี้ใหม่</span>",e.append(n)}}function Te(){var u;const e=c("#siteTree");e.replaceChildren();const t=Ve(),n=((u=t.find(l=>!l.parentId&&l.type==="folder"))==null?void 0:u.id)||"site-root",o=p.treeShowTrash?p.siteNodes.filter(l=>l.deletedAt):t.filter(l=>l.id!==n),a=p.treeShowTrash?0:o.reduce((l,m)=>l+qn(m).length+Vn(m).length,0);if(c("#treeListTitle").textContent=p.treeShowTrash?"ถังขยะ":"ผังที่ใช้งาน",c("#treeNodeCount").textContent=p.treeShowTrash?`${o.length} รายการ`:`${o.length} หัวข้อ · ${a} รายการที่เชื่อม`,c("#treeTrashButton").textContent=p.treeShowTrash?"← กลับไปผัง":"ถังขยะ",c("#addRootProjectButton").hidden=p.treeShowTrash,c("#addChildNodeButton").hidden=p.treeShowTrash,!o.length){e.innerHTML=`<p class="empty-state">${p.treeShowTrash?"ถังขยะว่าง":"ยังไม่มีผังโครงการ"}</p>`;return}if(p.treeShowTrash){const l=document.createElement("div");l.className="tree-trash-list",o.sort((m,h)=>String(m.title).localeCompare(String(h.title),"th")).forEach(m=>{const row=document.createElement("div");row.className="rail-trash-row";row.innerHTML=`<div class="rail-trash-meta"><strong>${nr(m.title||"ไม่มีชื่อหัวข้อ")}</strong><span>ย้ายเมื่อ: ${_e(m.deletedAt)||"เมื่อสักครู่"}</span></div><button type="button" class="button secondary small tree-restore-btn">กู้คืน</button><button type="button" class="button danger small tree-perm-btn">ลบถาวร</button>`;row.querySelector(".tree-restore-btn").addEventListener("click",()=>Gr(m));row.querySelector(".tree-perm-btn").addEventListener("click",()=>{cn("ยืนยันการลบถาวร",`ต้องการลบหัวข้อ “${m.title||"หัวข้อนี้"}” และรูปภาพสื่อทั้งหมดอย่างถาวรใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้อีก`,async()=>{try{await _permanentlyDeleteTreeNode(m.id)}catch(err){console.error(err);A("ลบรายการไม่สำเร็จ","error");}})});l.append(row);}),e.append(l);return}const assignNums=(parentId,prefix="")=>{Pe(parentId).forEach((nd,idx)=>{const num=prefix?`${prefix}.${idx+1}`:String(idx+1);nd.nodeNumber=num;assignNums(nd.id,num);})};const s=t.find(l=>l.id===n);assignNums(s?s.id:"","");const r=(l,m,prefix="")=>{const h=document.createDocumentFragment();return Pe(l).forEach((d,idx)=>{const num=d.nodeNumber||(prefix?`${prefix}.${idx+1}`:String(idx+1));const f=document.createElement("div");f.className="tree-branch",f.append(In(d,m,num)),f.append(zr(d,m+1,num)),f.append(Hr(d,m+1)),f.append(r(d.id,m+1,num)),h.append(f)}),h};e.append(r(s?s.id:"",0,""));try{window._renderInteractiveSiteMap&&window._renderInteractiveSiteMap()}catch(_e){}}function In(e,t,num){const n=document.createElement("button");n.type="button",n.className=`tree-node${p.selectedTreeNodeId===e.id?" selected":""}`,n.style.setProperty("--tree-depth",Math.min(t,8)),n.dataset.nodeId=e.id,n.dataset.parentId=e.parentId||"",n.draggable=!e.deletedAt;const grip=document.createElement("span");grip.className="tree-node-drag-handle",grip.title="ลากเพื่อจัดลำดับ",grip.textContent="⠿";const o=Rr(e.type),a=document.createElement("span");a.className="tree-node-icon",a.textContent=o.icon;const r=document.createElement("span");r.className="tree-node-copy";const s=document.createElement("strong");const badge=num?`<span class="tree-node-num-badge" style="display:inline-block;padding:1px 6px;margin-right:6px;border-radius:4px;background:rgba(239,217,142,0.22);color:#9f731c;border:1px solid rgba(159,115,28,0.3);font-size:0.75rem;font-weight:700;">#${num}</span>`:"";s.innerHTML=`${badge}${e.title||"ไม่มีชื่อ"}`;const u=document.createElement("small"),l=!!ct[`${e.contentType||""}:${e.contentRef||""}`];return u.textContent=e.deletedAt?`${o.label} · อยู่ในถังขยะ`:`${o.label} · รหัส: ${e.id} · ${e.published?"พร้อมเผยแพร่":"ฉบับร่าง"}${l?" · เชื่อมข้อมูลแล้ว":""}`,r.append(s,u),n.append(grip,a,r),n.addEventListener("click",()=>Dt(e.id)),n}function qn(e){return e.deletedAt||e.contentType!=="media"?[]:(e.contentRef==="all"?[...p.media]:p.media.filter(n=>J(n)===e.contentRef)).sort((n,o)=>(Number(n.order)||0)-(Number(o.order)||0)||String(n.title||n.id).localeCompare(String(o.title||o.id),"th"))}function zr(e,t,num){const n=document.createDocumentFragment();if(e.contentType!=="media")return n;const o=qn(e);if(!o.length){const a=document.createElement("div");return a.className="tree-media-empty",a.style.setProperty("--tree-depth",Math.min(t,8)),a.textContent="ยังไม่มีรูปภาพหรือวิดีโอในหัวข้อนี้",n.append(a),n}return o.forEach(a=>{const r=document.createElement("button");r.type="button",r.className="tree-node tree-media-reference",r.style.setProperty("--tree-depth",Math.min(t,8));const s=document.createElement("span");s.className="tree-node-icon",s.textContent=a.type==="image"?"▧":"▶";const u=document.createElement("span");u.className="tree-node-copy";const l=document.createElement("strong");l.textContent=(num?`[#${num}] `:"")+(a.title||(a.type==="image"?"รูปภาพ":"วิดีโอ"));const m=document.createElement("small");m.textContent=`${a.type==="image"?"รูปภาพ":"วิดีโอ"} · ${a.storagePath?"ไฟล์คลาวด์":"ลิงก์ภายนอก"} · คลิกเพื่อแก้ไข`,u.append(l,m),r.append(s,u),r.addEventListener("click",()=>{p.manageSection=J(a),c("#treeDialog").close(),sn(p.manageSection,a)}),n.append(r)}),n}function Vn(e){return e.deletedAt||e.contentType!=="content"?[]:p.portalContent.filter(t=>t.kind===e.contentRef).sort((t,n)=>(Number(t.order)||0)-(Number(n.order)||0)||String(t.title||t.id).localeCompare(String(n.title||n.id),"th"))}function Hr(e,t){const n=document.createDocumentFragment();if(e.contentType!=="content")return n;const o=Vn(e);if(!o.length){const a=document.createElement("div");return a.className="tree-media-empty",a.style.setProperty("--tree-depth",Math.min(t,8)),a.textContent="ยังไม่มีรายการในหัวข้อนี้",n.append(a),n}return o.forEach(a=>{const r=document.createElement("button");r.type="button",r.className="tree-node tree-media-reference tree-content-reference",r.style.setProperty("--tree-depth",Math.min(t,8));const s=document.createElement("span");s.className="tree-node-icon",s.textContent=a.kind==="document"?"PDF":a.kind==="donation"?"♡":"◫";const u=document.createElement("span");u.className="tree-node-copy";const l=document.createElement("strong");l.textContent=a.title||"ไม่มีชื่อ";const m=document.createElement("small");m.textContent=`${a.published?"เผยแพร่แล้ว":"ฉบับร่าง"} · คลิกเพื่อจัดการ`,u.append(l,m),r.append(s,u),r.addEventListener("click",()=>{c("#treeDialog").close(),window.dispatchEvent(new CustomEvent("open-portal-manager",{detail:{kind:a.kind,itemId:a.id}}))}),n.append(r)}),n}function Kn(e=null,t=""){const n=c("#treeNodeParent"),o=e?St(e.id):new Set;e&&o.add(e.id),n.replaceChildren();const a=document.createElement("option");a.value="",a.textContent="— ระดับบนสุด —",n.append(a);const r=(s,u)=>Pe(s).forEach(l=>{if(!o.has(l.id)){const m=document.createElement("option");m.value=l.id,m.textContent=`${"— ".repeat(u)}${l.nodeNumber?`[#${l.nodeNumber}] `:""}${l.title}`,n.append(m),r(l.id,u+1)}});r("",0),n.value=t||""}function Dt(e){const t=p.siteNodes.find(n=>n.id===e);if(!t)return;const permBtn=c("#permDeleteTreeNodeButton");p.selectedTreeNodeId=e,Te(),c("#treeEditorEmpty").hidden=!0,c("#treeEditorForm").hidden=!1,c("#treeNodeId").value=t.id,c("#treeNodeTitle").value=t.title||"",c("#treeNodeType").value=t.type||"page",c("#treeNodeSlug").value=t.slug||"",c("#treeNodeDescription").value=t.description||"",c("#treeContentLink").value=ct[`${t.contentType||""}:${t.contentRef||""}`]?`${t.contentType}:${t.contentRef}`:"",c("#treeNodeUrl").value=t.url||"",(c("#treeNodeOpenBehavior")&&(c("#treeNodeOpenBehavior").value=t.openBehavior||"center")),c("#treeNodePublished").checked=!!t.published,Kn(t,t.parentId||""),c("#treeEditorTitle").textContent=t.nodeNumber?`แก้ไขหัวข้อ #${t.nodeNumber} (${t.title||""})`:"แก้ไขหัวข้อ",c("#treeNodeStatus").textContent=(t.nodeNumber?`หมายเลขผัง: #${t.nodeNumber} · `:"")+(t.deletedAt?"อยู่ในถังขยะ":t.published?"พร้อมเผยแพร่":"ฉบับร่าง"),c("#deleteTreeNodeButton").hidden=!!t.deletedAt,c("#restoreTreeNodeButton").hidden=!t.deletedAt,permBtn&&(permBtn.hidden=!t.deletedAt),Lt("#treeEditorForm input, #treeEditorForm select, #treeEditorForm textarea, #treeEditorForm button").forEach(n=>{["restoreTreeNodeButton","permDeleteTreeNodeButton"].includes(n.id)||(n.disabled=!!t.deletedAt)}),t.deletedAt&&(c("#restoreTreeNodeButton").disabled=!1,permBtn&&(permBtn.disabled=!1)),at(t),qr(t)}function Ln(e="",t="page"){p.selectedTreeNodeId="",Te(),c("#treeEditorEmpty").hidden=!0,c("#treeEditorForm").hidden=!1,c("#treeEditorForm").reset(),c("#treeNodeId").value="",c("#treeNodeType").value=t,c("#treeContentLink").value="",Kn(null,e),c("#treeEditorTitle").textContent=t==="project"?"เพิ่มโครงการ":"เพิ่มโหนดย่อย",c("#treeNodeStatus").textContent="รายการใหม่",c("#deleteTreeNodeButton").hidden=!0,c("#restoreTreeNodeButton").hidden=!0,Lt("#treeEditorForm input, #treeEditorForm select, #treeEditorForm textarea, #treeEditorForm button").forEach(n=>n.disabled=!1),c("#moveTreeNodeUp").disabled=!0,c("#moveTreeNodeDown").disabled=!0,at(),c("#treeNodeTitle").focus()}function at(e=null){const t=c("#treeContentLink").value,n=ct[t],o=c("#treeLinkedContent");if(o.hidden=!n,!n)return;c("#treeLinkedContentTitle").textContent=n.label;let a="อ้างอิงข้อมูลเดิมโดยไม่สร้างสำเนา";n.kind==="media"?a=`พบรูปภาพและวิดีโอเดิม ${n.ref==="all"?p.media.length:p.media.filter(s=>J(s)===n.ref).length} รายการ`:n.kind==="content"&&(a=`พบข้อมูลที่เชื่อมแล้ว ${p.portalContent.filter(s=>s.kind===n.ref).length} รายการ`),c("#treeLinkedContentMeta").textContent=a,c("#openLinkedContentButton").disabled=!!(e!=null&&e.deletedAt)}function Wr(){const e=ct[c("#treeContentLink").value];if(!e)return A("โหนดนี้ยังไม่ได้เชื่อมข้อมูลเดิม","error");c("#treeDialog").close(),e.kind==="media"&&e.ref!=="all"?Ct(e.ref):e.kind==="content"?window.dispatchEvent(new CustomEvent("open-portal-manager",{detail:{kind:e.ref}})):Ct()}function qr(e){const t=Pe(e.parentId||""),n=t.findIndex(o=>o.id===e.id);c("#moveTreeNodeUp").disabled=!!e.deletedAt||n<=0,c("#moveTreeNodeDown").disabled=!!e.deletedAt||n<0||n>=t.length-1}async function Vr(e){if(e.preventDefault(),!Y())return;const t=c("#treeNodeId").value,n=p.siteNodes.find(f=>f.id===t)||null,o=c("#treeNodeParent").value,a=c("#treeNodeTitle").value.trim(),r=Pr(c("#treeNodeSlug").value||a);if(!a)return A("กรุณาใส่ชื่อหัวข้อ","error");if(n&&(o===n.id||St(n.id).has(o)))return A("ย้ายหัวข้อไปไว้ใต้ตัวเองหรือโหนดย่อยไม่ได้","error");if(Ve().find(f=>f.id!==t&&(f.parentId||"")===o&&f.slug===r))return A("ชื่อ URL ซ้ำกับหัวข้ออื่นในระดับเดียวกัน","error");const u=Pe(o).filter(f=>f.id!==t),l=n?se(n.id):j(ut()),m=ct[c("#treeContentLink").value]||null,h={parentId:o,type:c("#treeNodeType").value,title:a,slug:r||`node-${Date.now()}`,description:c("#treeNodeDescription").value.trim(),url:ye(c("#treeNodeUrl").value.trim())||"",openBehavior:(c("#treeNodeOpenBehavior")?c("#treeNodeOpenBehavior").value:"center"),published:c("#treeNodePublished").checked,contentType:(m==null?void 0:m.kind)||K(),contentRef:(m==null?void 0:m.ref)||K(),order:n&&(n.parentId||"")===o?Number(n.order)||10:(u.length+1)*10,updatedAt:I(),updatedBy:p.user.uid,...n?{}:{createdAt:I(),createdBy:p.user.uid}},d=c("#treeEditorForm button[type=submit]");d.disabled=!0;try{await V(l,h,{merge:!0}),await pt(),Dt(l.id),A(n?"บันทึกการแก้ไขแล้ว":"เพิ่มหัวข้อแล้ว")}catch(f){console.error(f),A("บันทึกผังไม่สำเร็จ","error")}finally{d.disabled=!1}}async function Sn(e){const t=p.siteNodes.find(s=>s.id===p.selectedTreeNodeId);if(!t||t.deletedAt)return;const n=Pe(t.parentId||""),o=n.findIndex(s=>s.id===t.id),a=n[o+e];if(!a)return;const r=pe(X);r.update(se(t.id),{order:Number(a.order)||(o+e+1)*10,updatedAt:I(),updatedBy:p.user.uid}),r.update(se(a.id),{order:Number(t.order)||(o+1)*10,updatedAt:I(),updatedBy:p.user.uid});try{await r.commit(),await pt(),Dt(t.id)}catch(s){console.error(s),A("เลื่อนลำดับไม่สำเร็จ","error")}}async function Kr(e){const t=[e.id,...St(e.id)].slice(0,450),n=pe(X);t.forEach(o=>n.update(se(o),{deletedAt:I(),deletedBy:p.user.uid,updatedAt:I(),updatedBy:p.user.uid})),await n.commit(),p.selectedTreeNodeId="",c("#treeEditorForm").hidden=!0,c("#treeEditorEmpty").hidden=!1,await pt(),A("ย้ายหัวข้อและโหนดย่อยไปถังขยะแล้ว")}async function Gr(e){var a;const t=new Set([e.id,...St(e.id)]);let n=e.parentId||"";for(;n;)t.add(n),n=((a=p.siteNodes.find(r=>r.id===n))==null?void 0:a.parentId)||"";const o=pe(X);[...t].slice(0,450).forEach(r=>o.update(se(r),{deletedAt:K(),deletedBy:K(),updatedAt:I(),updatedBy:p.user.uid}));try{await o.commit(),p.treeShowTrash=!1,await pt(),Dt(e.id),A("กู้คืนหัวข้อแล้ว")}catch(r){console.error(r),A("กู้คืนไม่สำเร็จ","error")}}function Yr(){const e=p.siteNodes.map(({createdAt:a,updatedAt:r,deletedAt:s,...u})=>({...u,createdAt:a!=null&&a.toDate?a.toDate().toISOString():a||null,updatedAt:r!=null&&r.toDate?r.toDate().toISOString():r||null,deletedAt:s!=null&&s.toDate?s.toDate().toISOString():s||null}));let _exportStr="{}";try{_exportStr=JSON.stringify({exportedAt:new Date().toISOString(),project:Ke,nodes:e},null,2)}catch(_){try{_exportStr=JSON.stringify({exportedAt:new Date().toISOString(),project:Ke,nodes:Array.isArray(e)?e.map(x=>({id:x.id,title:x.title,slug:x.slug,type:x.type,parentId:x.parentId})):[]},null,2)}catch(__){_exportStr="{}"}}const t=new Blob([_exportStr],{type:"application/json"}),n=URL.createObjectURL(t),o=document.createElement("a");o.href=n,o.download=`that-phanom-site-tree-${new Date().toISOString().slice(0,10)}.json`,o.click(),URL.revokeObjectURL(n)}async function Qr(){if(!Y())return A("เฉพาะ Admin เท่านั้นที่จัดการผังโครงการได้","error");p.treeShowTrash=!1,p.selectedTreeNodeId="",c("#treeEditorForm").hidden=!0,c("#treeEditorEmpty").hidden=!1,c("#treeDialog").showModal(),await pt()}
async function _getMediaPathsForNode(nodeId){
  const paths = [];
  const targetNode = p.siteNodes.find(n => n.id === nodeId);
  if (!targetNode) return paths;
  const descendantIds = new Set([nodeId, ...St(nodeId)]);
  const allNodes = p.siteNodes.filter(n => descendantIds.has(n.id));
  allNodes.forEach(node => {
    if (node.contentType === "media") {
      const mediaList = node.contentRef === "all" ? [...p.media] : p.media.filter(m => J(m) === node.contentRef);
      mediaList.forEach(m => {
        if (m.storagePath) paths.push(m.storagePath);
        if (m.originalStoragePath) paths.push(m.originalStoragePath);
      });
    }
  });
  return [...new Set(paths.filter(Boolean))];
}

async function _deleteStoragePaths(paths){
  if (!paths || !paths.length) return;
  const unique = [...new Set(paths.filter(Boolean))];
  await Promise.allSettled(unique.map(async pth => {
    try { await De(ce(ke, pth)); } catch(e){}
    try { await De(ce(yt, pth)); } catch(e){}
  }));
}

async function _permanentlyDeleteTreeNode(nodeId){
  if (!Y()) return;
  const target = p.siteNodes.find(n => n.id === nodeId);
  if (!target) return;
  const descendantIds = [nodeId, ...St(nodeId)];
  try {
    const paths = await _getMediaPathsForNode(nodeId);
    if (paths.length) await _deleteStoragePaths(paths);
  } catch(e) {
    console.warn("Storage files cleanup error:", e);
  }
  const batch = pe(X);
  descendantIds.forEach(id => {
    batch.delete(se(id));
  });
  await batch.commit();
  p.selectedTreeNodeId = "";
  c("#treeEditorForm").hidden = true;
  c("#treeEditorEmpty").hidden = false;
  await pt();
  Te();
  A("ลบหัวข้อและรูปภาพสื่อทั้งหมดอย่างถาวรแล้ว");
}
function cn(e,t,n){const o=c("#confirmDialog");c("#confirmTitle").textContent=e,c("#confirmMessage").textContent=t,o.open&&o.close(),o.showModal();const a=()=>{o.open&&o.close()};c("#confirmCancel").onclick=a,c("#confirmOk").onclick=async()=>{c("#confirmOk").disabled=!0;try{await n()}finally{c("#confirmOk").disabled=!1,a()}}}function Jr(){xr(),Er(),c("#closeTreeButton").addEventListener("click",()=>c("#treeDialog").close()),c("#treeEditorForm").addEventListener("submit",Vr),c("#treeContentLink").addEventListener("change",()=>at(p.siteNodes.find(e=>e.id===p.selectedTreeNodeId)||null)),c("#openLinkedContentButton").addEventListener("click",Wr),c("#addRootProjectButton").addEventListener("click",()=>{const e=Ve().find(t=>t.id==="site-root"||!t.parentId&&t.type==="folder");Ln((e==null?void 0:e.id)||"","project")}),c("#addChildNodeButton").addEventListener("click",()=>{const e=p.siteNodes.find(n=>n.id===p.selectedTreeNodeId&&!n.deletedAt),t=Ve().find(n=>n.type==="project")||Ve()[0];Ln((e==null?void 0:e.id)||(t==null?void 0:t.id)||"","page")}),c("#treeTrashButton").addEventListener("click",()=>{p.treeShowTrash=!p.treeShowTrash,p.selectedTreeNodeId="",c("#treeEditorForm").hidden=!0,c("#treeEditorEmpty").hidden=!1,Te()}),c("#exportTreeButton").addEventListener("click",Yr),c("#treeBackupRestoreButton")&&c("#treeBackupRestoreButton").addEventListener("click",()=>{_openBackupRestoreDialog()}),c("#moveTreeNodeUp").addEventListener("click",()=>Sn(-1)),c("#moveTreeNodeDown").addEventListener("click",()=>Sn(1)),c("#deleteTreeNodeButton").addEventListener("click",()=>{const e=p.siteNodes.find(t=>t.id===p.selectedTreeNodeId);e&&cn("ย้ายไปถังขยะ",`หัวข้อ “${e.title}” และโหนดย่อยทั้งหมดจะถูกซ่อน แต่ยังกู้คืนได้`,async()=>{try{await Kr(e)}catch(t){console.error(t),A("ย้ายไปถังขยะไม่สำเร็จ","error")}})}),c("#restoreTreeNodeButton").addEventListener("click",()=>{const e=p.siteNodes.find(t=>t.id===p.selectedTreeNodeId);e&&Gr(e)}),c("#permDeleteTreeNodeButton")?.addEventListener("click",()=>{const e=p.siteNodes.find(t=>t.id===p.selectedTreeNodeId);e&&cn("ยืนยันการลบถาวร",`ต้องการลบหัวข้อ “${e.title||"หัวข้อนี้"}” และรูปภาพสื่อทั้งหมดอย่างถาวรใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้อีก`,async()=>{try{await _permanentlyDeleteTreeNode(e.id)}catch(t){console.error(t),A("ลบรายการไม่สำเร็จ","error");}})}),c("#addMediaButton").addEventListener("click",()=>sn(p.manageSection||"story")),c("#syncDriveButton").addEventListener("click",Cr),c("#mediaForm").addEventListener("submit",Dr),c("#closeMediaButton").addEventListener("click",()=>c("#mediaDialog").close()),c("#cancelMediaButton").addEventListener("click",()=>c("#mediaDialog").close()),c("#mediaDialog").addEventListener("close",()=>{c("#mediaSection").disabled=!1}),c("#closeLightboxButton").addEventListener("click",()=>{const vb=document.getElementById("lightboxVideoContainer");if(vb){vb.innerHTML="";vb.style.display="none";}c("#imageLightbox").close()}),c("#imageLightbox").addEventListener("click",e=>{e.target===c("#imageLightbox")&&c("#imageLightbox").close()}),c("#imageLightbox").addEventListener("close",()=>{c("#lightboxImage").src="";const vb=document.getElementById("lightboxVideoContainer");if(vb){vb.innerHTML="";vb.style.display="none";}}),c("#commentForm").addEventListener("submit",Mr),c("#floatingChatButton").addEventListener("click",dn),c("#closeChatButton").addEventListener("click",()=>{c("#chatPanel").classList.remove("open"),c("#chatPanel").setAttribute("aria-hidden","true")}),c("#chatForm").addEventListener("submit",Br),document.addEventListener("visibilitychange",()=>{Object.keys(ie).forEach(e=>zn(e))}),window.addEventListener("portal-content-updated",e=>{var t;if(p.portalContent=Array.isArray(e.detail)?e.detail:[],(t=c("#treeDialog"))!=null&&t.open&&p.siteNodes.length){Te();const n=p.siteNodes.find(o=>o.id===p.selectedTreeNodeId)||null;n&&at(n)}})}Jr();Sr();we?Rn(we,async e=>{var t;if(p.user=e,p.role="guest",e)try{p.role=await Ir(e)}catch(n){console.error("Profile setup failed",n),p.role=((t=e.email)==null?void 0:t.toLowerCase())===tn?"admin":"user",A("เข้าสู่ระบบแล้ว แต่ยังเชื่อมต่อข้อมูลสิทธิ์ไม่ได้","error")}Kt(),c("#chatPanel").classList.contains("open")&&dn();
  try {
    if (typeof _updateAdminDOMState === "function") _updateAdminDOMState();
    if (typeof Me === "function") Me();
    if (typeof Be === "function") Be();
    if (typeof _renderTopNavItems === "function") _renderTopNavItems();
    if (typeof _renderSidebarProjects === "function") _renderSidebarProjects();
    if (typeof _renderSiteSectionsCMS === "function") _renderSiteSectionsCMS();
  } catch(err) { console.warn("Admin DOM sync error:", err); }
}):Kt();const Xr="jaru072@gmail.com",oe="world-heritage",Zr={media:"page-media",news:"page-news",document:"page-documents",donation:"page-donation"},Yt={media:"คลังสื่อทั้งหมด",news:"ข่าวและกิจกรรม",document:"เอกสาร",donation:"ร่วมบุญ"},Gn={
  get media(){const l=document.documentElement.lang;return l==="en"?"No media in archive":l==="lo"?"ຍັງບໍ່ມີສື່ໃນຄັງ":"ยังไม่มีสื่อในคลัง"},
  get news(){const l=document.documentElement.lang;return l==="en"?"No news or events published yet":l==="lo"?"ຍັງບໍ່ມີຂ່າວຫຼືກິດຈະກຳທີ່ເຜີຍແຜ່":"ยังไม่มีข่าวหรือกิจกรรมที่เผยแพร่"},
  get document(){const l=document.documentElement.lang;return l==="en"?"No documents published yet":l==="lo"?"ຍັງບໍ່ມີເອກະສານທີ່ເຜີຍແຜ່":"ยังไม่มีเอกสารที่เผยแพร่"},
  get donation(){const l=document.documentElement.lang;return l==="en"?"No donation channels published yet":l==="lo"?"ຍັງບໍ່ມີຊ່ອງທາງຮ່ວມບຸນທີ່ເຜີຍແຜ່":"ยังไม่มีช่องทางร่วมบุญที่เผยแพร่"}
},kt={id:"project-world-heritage",parentId:"site-root",type:"project",title:"พระธาตุพนม สู่มรดกโลก",description:"โครงการผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลกทางวัฒนธรรม",slug:"world-heritage",contentType:"project",contentRef:"world-heritage",order:10,published:!0,fallback:!0},ea={id:"project-muchalinda-restoration",parentId:"project-world-heritage",type:"project",title:"บูรณะสระมุจลินท์",description:"โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก เพื่อฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์และภูมิทัศน์ประวัติศาสตร์",slug:"muchalinda-restoration",contentType:"project",contentRef:"muchalinda",order:20,published:!1,fallback:!0},ta={hero:"#top",story:"#history",storyFeature:"#history",storyArt:"#history",storyPeople:"#history",criteria:"#world-heritage",criteriaOne:"#world-heritage",criteriaTwo:"#world-heritage",criteriaThree:"#world-heritage",processOverview:"#world-heritage",processOne:"#world-heritage",processTwo:"#world-heritage",processThree:"#world-heritage",processFour:"#world-heritage",milestones:"#milestones",milestoneOne:"#milestones",milestoneTwo:"#milestones",milestoneThree:"#milestones",milestoneFour:"#milestones",muchalindaDonation:"#muchalinda-donation",all:"#media-library"},ot=[{id:"default-project",type:"project",template:"project",kicker:"โครงการปัจจุบัน",kicker_lo:"ໂຄງການປັດຈຸບັນ",kicker_en:"Current Project",title:"พระธาตุพนม สู่มรดกโลก",title_lo:"ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",title_en:"Phra That Phanom to World Heritage",description:"ร่วมอนุรักษ์คุณค่าทางกายภาพและจิตวิญญาณของศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",description_lo:"ຮ່ວມອະນຸລັກຄຸນຄ່າທາງກາຍະພາບ ແລະຈິດວິນຍານຂອງສູນລວມສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ",description_en:"Safeguarding the cultural and spiritual values of the sacred Mekong heritage site.",buttonText:"ดูโครงการทั้งหมด",buttonText_lo:"ເບິ່ງໂຄງການທັງໝົດ",buttonText_en:"View All Projects",buttonUrl:"#projects",openExternal:!1,theme:"gold",icon:"🏛",projectScope:"world-heritage",published:!0,order:10,fallback:!0},{id:"default-quick",type:"quick",template:"quick",kicker:"เข้าถึงอย่างรวดเร็ว",kicker_lo:"ເຂົ້າເຖິງຢ່າງໄວ",kicker_en:"Quick Access",title:"ทางลัดคลังข้อมูลและกิจกรรม",title_lo:"ທາງລັດຄັງຂໍ້ມູນ ແລະກິດຈະກຳ",title_en:"Direct Shortcuts & Archives",description:"เข้าสู่ข่าวสารและกิจกรรม คลังสื่อ และเอกสารเผยแพร่ที่สำคัญได้อย่างรวดเร็ว",description_lo:"ເຂົ້າສູ່ຂ່າວສານ ກິດຈະກຳ ຄັງສື່ ແລະເອກະສານສຳຄັນຢ່າງໄວວາ",description_en:"Quickly browse latest updates, photo/video media library, and published documents.",buttonText:"ดูคลังสื่อทั้งหมด",buttonText_lo:"ເບິ່ງຄັງສື່ທັງໝົດ",buttonText_en:"View Media Library",buttonUrl:"#media-library",openExternal:!1,theme:"standard",icon:"✦",projectScope:"world-heritage",published:!0,order:20,fallback:!0},{id:"default-donate",type:"donation",template:"donation",kicker:"ร่วมบุญ",kicker_lo:"ຮ່ວມບຸນ",kicker_en:"Donation",title:"ร่วมสืบสานมรดกแห่งศรัทธา",title_lo:"ຮ່ວມສືບສານມໍລະດົກແຫ່ງສັດທາ",title_en:"Support the Sacred Heritage",description:"ร่วมทำบุญสมทบทุนเพื่อบูรณะและผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลก",description_lo:"ຮ່ວມເຮັດບຸນສົມທົບທຶນเพื่อบູລະນະ และผักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลก",description_en:"Participate in merit-making and supporting conservation efforts transparently.",buttonText:"ดูรายละเอียด",buttonText_lo:"ເບິ່ງລາຍລະອຽດ",buttonText_en:"View Donation Details",buttonUrl:"#donation",openExternal:!1,theme:"maroon",icon:"♥",projectScope:"world-heritage",published:!0,order:30,fallback:!0}],na={custom:{kicker:"หัวข้อใหม่",kicker_lo:"",kicker_en:"",title:"หัวข้อประชาสัมพันธ์",title_lo:"",title_en:"",description:"รายละเอียดหัวข้อประชาสัมพันธ์",description_lo:"",description_en:"",icon:"✦",buttonText:"ดูรายละเอียด",buttonText_lo:"",buttonText_en:"",buttonUrl:"#",theme:"standard"},news:{kicker:"ข่าวด่วน",kicker_lo:"ຂ່າວດ່ວນ",kicker_en:"Breaking News",title:"ประกาศข่าวสารสำคัญ",title_lo:"ປະກາດຂ່າວສານສຳຄັນ",title_en:"Important Announcement",description:"ติดตามความเคลื่อนไหวและประกาศล่าสุดของโครงการ",description_lo:"ຕິດຕາມຄວາມເຄື່ອນໄຫວ ແລະປະກາດຫຼ້າສຸດຂອງໂຄງການ",description_en:"Stay updated with the latest project news and announcements.",icon:"📢",buttonText:"อ่านข่าวทั้งหมด",buttonText_lo:"ອ່ານຂ່າວທັງໝົດ",buttonText_en:"Read All News",buttonUrl:"#news-events",theme:"standard"},schedule:{kicker:"กำหนดการ",kicker_lo:"ກຳນົດການ",kicker_en:"Schedule",title:"กำหนดการและกิจกรรม",title_lo:"ກຳນົດການ ແລະກິດຈະກຳ",title_en:"Schedule & Events",description:"ตารางเวลาและกำหนดการจัดกิจกรรมสำคัญของโครงการ",description_lo:"ຕາຕະລາງເວລາ ແລະກຳນົດການຈັດກິດຈະກຳສຳຄັນຂອງໂຄງການ",description_en:"Timetable and upcoming key events of the project.",icon:"📅",buttonText:"ดูกำหนดการ",buttonText_lo:"ເບິ່ງກຳນົດການ",buttonText_en:"View Schedule",buttonUrl:"#timeline",theme:"standard"},ceremony:{kicker:"พิธีสำคัญ",kicker_lo:"ພິທີສຳຄັນ",kicker_en:"Ceremony",title:"พิธีสมโภชและบำเพ็ญกุศล",title_lo:"ພິທີສົມໂພດ ແລະບຳເພັນກຸສົນ",title_en:"Sacred Ceremony",description:"ขอเชิญพุทธศาสนิกชนร่วมพิธีสำคัญเพื่อความเป็นสิริมงคล",description_lo:"ຂໍເຊີນພຸດທະສາສະນິກະຊົນຮ່ວມພິທີສຳຄັນເພື່ອຄວາມເປັນສິລິມຸງຄຸນ",description_en:"Invitation to attend sacred merit-making ceremony.",icon:"🙏",buttonText:"รายละเอียดพิธี",buttonText_lo:"ລາຍລະອຽດພິທີ",buttonText_en:"Ceremony Details",buttonUrl:"#history",theme:"gold"},live:{kicker:"ถ่ายทอดสด",kicker_lo:"ຖ່າຍທອດສົດ",kicker_en:"Live Stream",title:"ถ่ายทอดสดกิจกรรมและพิธีกรรม",title_lo:"ຖ່າຍທອດສົດກິດຈະກຳ ແລະພິທີກຳ",title_en:"Live Broadcast",description:"รับชมบรรยากาศพิธีสำคัญและการจัดงานแบบเรียลไทม์",description_lo:"ຮັບຊົມບັນຍາກາດພິທີສຳຄັນ ແລະງານແບບທັນເວລາ",description_en:"Watch real-time live broadcast of key ceremonies and events.",icon:"🔴",buttonText:"รับชมถ่ายทอดสด",buttonText_lo:"ຮັບຊົມຖ່າຍທອດສົດ",buttonText_en:"Watch Live",buttonUrl:"#media-library",theme:"dark"},document:{kicker:"เอกสารสำคัญ",kicker_lo:"ເອກະສານສຳຄັນ",kicker_en:"Documents",title:"เอกสารประกอบและรายงาน",title_lo:"ເອກະສານประกอบ ແລະລາຍງານ",title_en:"Reports & Documents",description:"ดาวน์โหลดเอกสารวิชาการ แบบแปลน และรายงานการดำเนินงาน",description_lo:"ດາວໂຫຼດເອກະສານວິຊາການ ແບບແປນ ແລະລາຍງານການດຳເນີນງານ",description_en:"Download official research papers, architectural plans, and progress reports.",icon:"📄",buttonText:"ดาวน์โหลดเอกสาร",buttonText_lo:"ດາວໂຫຼດເອກະສານ",buttonText_en:"Download Docs",buttonUrl:"#documents",theme:"standard"},muchalindaDonation:{kicker:"ร่วมบุญสระมุจลินท์",kicker_lo:"ຮ່ວມບຸນສະມຸດຈະລິນ",kicker_en:"Muchalinda Donation",title:"ร่วมบุญบูรณะสระมุจลินท์",title_lo:"ຮ່ວມບຸນບູລະນະສະມຸດຈະລິນ",title_en:"Restore Muchalinda Pond",description:"ร่วมสมทบทุนบูรณะสระมุจลินท์เพื่อถวายเป็นพุทธบูชา ณ วัดพระธาตุพนมวรมหาวิหาร",icon:"♡",buttonText:"ร่วมบุญโครงการ",buttonText_lo:"ຮ່ວມບຸນໂຄງການ",buttonText_en:"Make a Merit",buttonUrl:"#muchalinda-donation",theme:"gold"},muchalindaAlbum:{kicker:"อัลบั้มผู้ร่วมบุญ",kicker_lo:"ອະລະບັ້ມຜູ້ຮ່ວມບຸນ",kicker_en:"Merit Makers Album",title:"อัลบั้มรูปภาพผู้ร่วมบุญ",title_lo:"ອະລະບັ້ມຮູບພາບຜູ້ຮ່ວມບຸນ",title_en:"Muchalinda Merit Makers Album",description:"ภาพอนุโมทนาบัตรและภาพผู้ร่วมบุญโครงการบูรณะสระมุจลินท์จาก Google Drive",icon:"📷",buttonText:"ดูอัลบั้มภาพ",buttonText_lo:"ເບິ່ງອະລະບັ້ມຮູບ",buttonText_en:"View Album",buttonUrl:"#muchalinda-album",theme:"standard"},donation:{kicker:"ร่วมบุญ",kicker_lo:"ຮ່ວມບຸນ",kicker_en:"Donation",title:"ร่วมสืบสานมรดกแห่งศรัทธา",title_lo:"ຮ່ວມສືບສານມໍລະດົກແຫ່ງສັດທາ",title_en:"Support the Heritage",description:"ร่วมอนุรักษ์และสนับสนุนการดำเนินงานเพื่อการอนุรักษ์อย่างโปร่งใส",description_lo:"ຮ່ວມອະນຸລັກ ແລະສະໜັບສະໜູນการດຳເນີນງານເພື່ອການອະນຸລັກຢ່າງໂປ່ງໃສ",description_en:"Join in supporting preservation and development with full transparency.",icon:"♥",buttonText:"ดูช่องทางร่วมบุญ",buttonText_lo:"ເບິ່ງຊ່ອງທາງຮ່ວມບຸນ",buttonText_en:"View Channels",buttonUrl:"#donation",theme:"maroon"},project:{kicker:"โครงการปัจจุบัน",kicker_lo:"ໂຄງການປັດຈຸບັນ",kicker_en:"Current Project",title:"พระธาตุพนม สู่มรดกโลก",title_lo:"ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",title_en:"Phra That Phanom to World Heritage",description:"ร่วมอนุรักษ์คุณค่าทางกายภาพและจิตวิญญาณของศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",description_lo:"ຮ່ວມອະນຸລັກຄຸນຄ່າທາງກາຍະພາບ ແລະຈິດວິນຍານຂອງສູນລວມສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ",description_en:"Help safeguard the physical and spiritual values of this centre of Mekong faith.",icon:"🏛",buttonText:"ดูโครงการทั้งหมด",buttonText_lo:"ເບິ່ງໂຄງການທັງໝົດ",buttonText_en:"View All Projects",buttonUrl:"#projects",theme:"gold"},quick:{kicker:"ทางลัดเข้าถึง",kicker_lo:"ທາງລັດເຂົ້າເຖິງ",kicker_en:"Quick Access",title:"เข้าถึงอย่างรวดเร็ว",title_lo:"ເຂົ້າເຖິງຢ່າງໄວ",title_en:"Quick Access",description:"ทางลัดสู่เนื้อหา ข่าวสาร และกิจกรรมสำคัญของโครงการ",description_lo:"ທາງລັດສູ່ເນື້ອຫາ ຂ່າວສານ ແລະກິດຈະກຳສຳຄັນຂອງໂຄງການ",description_en:"Shortcut to key project resources, updates, and activities.",icon:"✦",buttonText:"ดูคลังสื่อทั้งหมด",buttonText_lo:"ເບິ່ງຄັງສື່ທັງໝົດ",buttonText_en:"View Media Library",buttonUrl:"#media-library",theme:"standard"}},ra={custom:{title:"หัวข้อกำหนดเอง",title_lo:"",title_en:"",description:"รายละเอียดหัวข้อ",description_lo:"",description_en:"",icon:"📌",url:"#",theme:"standard"},nav:{title:"สารบัญและทางลัด",title_lo:"ສາຣະບານ ແລະທາງລັດ",title_en:"Navigation & Shortcuts",description:"ทางลัดเข้าถึงส่วนต่างๆ ของเว็บไซต์",description_lo:"ທາງລັດເຂົ້າເຖິງພາກສ່ວນຕ່າງໆ ຂອງເວັບໄຊ",description_en:"Quick links to main sections",icon:"✦",url:"#history",theme:"standard"},history:{title:"ประวัติความเป็นมา",title_lo:"ປະຫວັດຄວາມເປັນມາ",title_en:"Historical Background",description:"มรดกสองฝั่งโขง อารยธรรมฟากฟ้า",description_lo:"ມໍລະດົກສອງຝັ່ງຂອງ ອາຣະຍະທຳຟາກຟ້າ",description_en:"Heritage of the Mekong Basin",icon:"🏛",url:"#history",theme:"gold"},worldheritage:{title:"สู่มรดกโลกยูเนสโก",title_lo:"ສູ່ມໍລະດົກໂລກຢູເນສໂກ",title_en:"UNESCO World Heritage",description:"เกณฑ์ความโดดเด่นสากล (OUV)",description_lo:"ເກນຄວາມໂດດເດັ່ນສາກົນ (OUV)",description_en:"Outstanding Universal Value",icon:"📜",url:"#world-heritage",theme:"gold"},muchalinda:{title:"สระพญามุจลินท์",title_lo:"ສະພະຍາມຸຈລິນ",title_en:"Muchalinda Sacred Pond",description:"แหล่งน้ำศักดิ์สิทธิ์และงานบูรณะ",description_lo:"ແຫຼ່ງນ້ຳສັກສິດ ແລະງານບູຣະນະ",description_en:"Sacred Water & Restoration",icon:"💧",url:"#muchalinda-project",theme:"maroon"},milestones:{title:"หมุดหมายและไทม์ไลน์",title_lo:"ໝຸດໝາຍ ແລະໄທມ໌ໄລນ໌",title_en:"Milestones & Timeline",description:"ลำดับขั้นตอนและการดำเนินงาน",description_lo:"ລຳດັບຂັ້ນຕອນ ແລະການດຳເນີນງານ",description_en:"Key stages and progress timeline",icon:"📅",url:"#milestones",theme:"standard"},news:{title:"ข่าวสารและกิจกรรม",title_lo:"ຂ່າວສານ ແລະກິດຈະກຳ",title_en:"News & Activities",description:"ความเคลื่อนไหวและประชาสัมพันธ์",description_lo:"ຄວາມເຄື່ອນໄຫວ ແລະປະຊາສຳພັນ",description_en:"Latest updates and announcements",icon:"📢",url:"#news-events",theme:"standard"},document:{title:"คลังเอกสารและรายงาน",title_lo:"ຄັງເອກະສານ ແລະລາຍງານ",title_en:"Document Archive",description:"ดาวน์โหลดเอกสารวิชาการ",description_lo:"ດາວໂຫຼດເອກະສານວິຊາການ",description_en:"Download research & official files",icon:"📄",url:"#documents",theme:"standard"},donation:{title:"ช่องทางร่วมทำบุญ",title_lo:"ຊ່ອງທາງຮ່ວມເຮັດບຸນ",title_en:"Donations & Merit",description:"ร่วมสมทบทุนกองทุนสืบสานมรดก",description_lo:"ຮ່ວມສົມທົບທຶນກອງທຶນສືບສານມໍລະດົກ",description_en:"Contribute to heritage foundation",icon:"♥",url:"#donation",theme:"maroon"},contact:{title:"ติดต่อเรา / สื่อสังคม",title_lo:"ຕິດຕໍ່ພວກເຮົາ / ສື່ສັງຄົມ",title_en:"Contact & Social Media",description:"ช่องทางสื่อสารทางการ",description_lo:"ຊ່ອງທາງສື່ສານທາງການ",description_en:"Official communication channels",icon:"facebook",url:"https://facebook.com",theme:"dark"}},un=ir().length?sr():Mn(Ht),aa=Bn(un),Ie=(()=>{try{return _initFS(un,{experimentalForceLongPolling:!0})}catch(_){return Pn(un)}})(),yt=Un(un),pn=j(Ie,"projects",oe),it=be(pn,"content"),oa=be(pn,"media"),Qt=be(pn,"siteNodes"),le=be(Ie,"railCards"),de=be(Ie,"sidebarItems"),_topNavCol=be(Ie,"topNavItems"),_siteSectionsCol=be(Ie,"siteSections"),L={user:null,role:"guest",items:[],media:[],nodes:[],railCards:[],sidebarItems:[],mediaFilter:"all",manageKind:"media",editingItem:null,editingRailCard:null,editingSidebarItem:null,unsubContent:null,unsubNodes:null,unsubMedia:null,unsubRailCards:null,unsubSidebarItems:null},i=e=>document.querySelector(e),z=e=>[...document.querySelectorAll(e)],D=()=>{try{if(typeof _checkIsAdmin==="function")return _checkIsAdmin();return L.role==="admin"||(L.user&&(L.user.email==="jaru072@gmail.com"||(L.user.email&&L.user.email.toLowerCase()==="jaru072@gmail.com")));}catch{return L.role==="admin";}};function H(e){try{const t=String(e||"").trim();if(!t)return"";const n=new URL(t,location.href);return n.origin===location.origin||n.protocol==="https:"?n.href:""}catch{return""}}function Yn(e){try{const t=new URL(e);if(!["drive.google.com","www.drive.google.com"].includes(t.hostname.toLowerCase()))return"";const n=t.pathname.match(/\/file\/d\/([\w-]{10,200})/);return(n==null?void 0:n[1])||(/^[\w-]{10,200}$/.test(t.searchParams.get("id")||"")?t.searchParams.get("id"):"")}catch{return""}}function mt(e){const t=Yn(e);return t?`https://lh3.googleusercontent.com/d/${encodeURIComponent(t)}`:H(e)}function ia(e){
  if(!e) return "";
  const s = String(e).trim();
  if(/^[\w-]{11}$/.test(s)) return s;
  try {
    const m = s.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/|e\/|user\/[^\/]+\/u\/\d+\/))([\w-]{11})/i) || s.match(/[?&]v=([\w-]{11})/i);
    if (m && m[1]) return m[1];
    const u = new URL(s.startsWith('http') ? s : 'https://' + s);
    if (u.hostname.includes('youtu.be')) {
      const id = u.pathname.replace(/^\//, '').slice(0, 11);
      if (/^[\w-]{11}$/.test(id)) return id;
    }
    if (u.hostname.includes('youtube.com')) {
      const v = u.searchParams.get('v');
      if (v && /^[\w-]{11}$/.test(v)) return v;
      const parts = u.pathname.split('/').filter(Boolean);
      for (const p of parts) {
        if (/^[\w-]{11}$/.test(p)) return p;
      }
    }
    return "";
  } catch { return ""; }
}function B(e,t=""){const n=i("#toast");n.textContent=e,n.dataset.tone=t,n.classList.add("show"),clearTimeout(B.timer),B.timer=setTimeout(()=>n.classList.remove("show"),3e3)}function mn(e){if(!e)return"";const t=e!=null&&e.toDate?e.toDate():new Date(`${e}T00:00:00`);if(Number.isNaN(t.getTime()))return"";const n=document.documentElement.lang==="en"?"en-GB":document.documentElement.lang==="lo"?"lo-LA":"th-TH";return new Intl.DateTimeFormat(n,{day:"numeric",month:"long",year:"numeric"}).format(t)}function Nt(e){return L.nodes.find(t=>t.id===Zr[e])||null}function sa(e){var t;return D()||!!((t=Nt(e))!=null&&t.published)}function la(){let e=0;["media","news","document","donation"].forEach(n=>{const o=sa(n),a=i(`[data-resource-section="${n}"]`),r=i(`[data-resource-link="${n}"]`);if(a&&(a.hidden=!o),r&&(r.hidden=!o),o&&(e+=1),a&&D()){const s=a.querySelector(".resource-status"),u=Nt(n);s&&(s.textContent=u!=null&&u.published?"พร้อมเผยแพร่":"ฉบับร่าง",s.classList.toggle("published",!!(u!=null&&u.published)))}}),i("#project-resources").hidden=!D()&&e===0;const t=i("[data-resource-navigation]");t&&(t.hidden=!D()&&e===0),z(".portal-admin-only").forEach(n=>{n.hidden=!D()})}function Qn(e){if(!e)return "image";if(e.type==="image"||(e.mimeType&&e.mimeType.startsWith("image/"))||/\.(jpg|jpeg|png|webp|gif|avif)(\?.*)?$/i.test(e.name||e.url||""))return "image";if(e.type==="video"||(e.mimeType&&e.mimeType.startsWith("video/"))||_isFacebookVideo(e.url)||_isTikTokVideo(e.url)||ia(e.url)||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(e.url))return "video";if(nt(e.url))return e.section==="videos"?"video":"image";return e.type||"image"}function da(e){const dlg=i("#imageLightbox");if(!dlg)return;const t=mt(e.url),_isImg=Qn(e)==="image",isFb=!_isImg&&_isFacebookVideo(e.url),isTikTok=!_isImg&&_isTikTokVideo(e.url),isYt=!_isImg&&ia(e.url),isDrive=!_isImg&&nt(e.url),imgEl=i("#lightboxImage"),vidBox=i("#lightboxVideoContainer"),origLink=i("#lightboxOriginalLink");i("#lightboxTitle").textContent=e.title||(isTikTok?"วิดีโอ TikTok":(isFb?"วิดีโอ Facebook":(isYt?"วิดีโอ YouTube":"ภาพพระธาตุพนม")));i("#lightboxDescription").textContent=e.description||"";i("#lightboxDescription").hidden=!e.description;if(isFb){if(imgEl)imgEl.style.display="none";const isReel=_isFacebookReel(e.url);if(vidBox){vidBox.style.display="block";vidBox.style.maxWidth=isReel?"440px":"860px";vidBox.innerHTML=`<div style="position:relative;width:100%;aspect-ratio:${isReel?"9/16":"16/9"};max-height:80vh;border-radius:12px;overflow:hidden;background:#000;margin:0 auto;"><iframe src="${_getFacebookEmbedUrl(e.url)}" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;" allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe></div>`}if(origLink){origLink.style.display="none"}}else if(isTikTok){if(imgEl)imgEl.style.display="none";if(vidBox){vidBox.style.display="block";vidBox.style.maxWidth="440px";vidBox.innerHTML=`<div style="position:relative;width:100%;aspect-ratio:9/16;max-height:80vh;border-radius:12px;overflow:hidden;background:#000;margin:0 auto;"><iframe src="${_getTikTokEmbedUrl(e.url)}?autoplay=1" style="position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe></div>`}if(origLink){origLink.style.display="inline-flex";origLink.href=e.url;origLink.textContent="เปิดดูใน TikTok ↗"}}else if(isYt){if(imgEl)imgEl.style.display="none";if(vidBox){vidBox.style.display="block";vidBox.innerHTML=`<div style="position:relative;width:100%;aspect-ratio:16/9;max-height:75vh;border-radius:12px;overflow:hidden;background:#000;margin:0 auto;"><iframe src="https://www.youtube-nocookie.com/embed/${encodeURIComponent(isYt)}?autoplay=1" style="width:100%;height:100%;border:none;display:block;" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen" allowfullscreen></iframe></div>`}if(origLink){origLink.style.display="none"}}else if(isDrive){if(imgEl)imgEl.style.display="none";if(vidBox){vidBox.style.display="block";vidBox.innerHTML=`<div style="position:relative;width:100%;aspect-ratio:16/9;max-height:75vh;border-radius:12px;overflow:hidden;background:#000;margin:0 auto;"><iframe src="https://drive.google.com/file/d/${encodeURIComponent(isDrive)}/preview" style="width:100%;height:100%;border:none;display:block;" allow="autoplay; fullscreen" allowfullscreen></iframe></div>`}if(origLink){origLink.style.display="none"}}else{if(vidBox){vidBox.style.display="none";vidBox.innerHTML=""}if(imgEl){imgEl.style.display="block";imgEl.referrerPolicy="no-referrer";imgEl.src=t||"";imgEl.alt=e.title||"ภาพพระธาตุพนม"}if(origLink){origLink.style.display="";origLink.href=e.webViewLink||t||"#";origLink.textContent=e.webViewLink?"เปิดดูใน Google Drive ↗":"เปิดภาพขนาดใหญ่ ↗"}}dlg.showModal()};window.openImageLightbox=da;window.openLightboxMedia=da;function ca(e){
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
    ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
    ifr.allowFullscreen = true;
    ifr.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;";
    n.append(ifr);
  } else {
    n.style.aspectRatio = "16/9";
    const u = ia(e.url), l = Yn(e.url);
    if (u) {
      const renderTrigger = () => {
        n.replaceChildren();
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "portal-yt-trigger";
        btn.setAttribute("aria-label", `เล่นวิดีโอ YouTube ${e.title || "พระธาตุพนม"}`);
        btn.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;padding:0;border:none;background:#110d1d;cursor:pointer;display:block;overflow:hidden;";
        
        const d = document.createElement("img");
        d.src = `https://i.ytimg.com/vi/${encodeURIComponent(u)}/hqdefault.jpg`;
        d.alt = e.title || "วิดีโอ YouTube พระธาตุพนม";
        d.loading = "lazy";
        d.decoding = "async";
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
          ifr.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen";
          ifr.allowFullscreen = true;
          ifr.referrerPolicy = "strict-origin-when-cross-origin";
          ifr.style.cssText = "position:absolute;top:0;left:0;width:100%;height:100%;border:none;display:block;background:#000;";
          ifr.onerror = () => {
            renderTrigger();
          };
          n.append(ifr);
        });
        n.append(btn);
      };
      renderTrigger();
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
      } else if (/\.(mp4|webm)(\?|$)/i.test(e.url || "")) {
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
const a=document.createElement("div");a.className="portal-media-copy";const chk=document.getElementById("mediaShowCaptionCheckbox");if(chk&&!chk.checked){a.style.display="none";}const curLang=document.documentElement.lang||"th";const secLabel=window._MEDIA_SECTION_NAMES?.[e.section]||"";if(secLabel){const r=document.createElement("span");r.textContent=secLabel;a.append(r);}const s=document.createElement("h4");const fallbackTitle=curLang==="en"?"Media Item":curLang==="lo"?"ລາຍການສື່":"รายการสื่อ";s.textContent=e.title||fallbackTitle;a.append(s);if(e.description){const p=document.createElement("p");p.style.cssText="margin:4px 0 0;font-size:0.85rem;color:var(--muted,#666);line-height:1.4;";p.textContent=e.description;a.append(p);}return t.append(n,a),t}function _getMediaDedupeKey(item){if(!item)return"";const raw=String(item.url||item.originalUrl||"").trim(),storage=String(item.storagePath||"").trim();if(!raw&&storage)return"storage:"+storage;if(!raw)return item.id?"id:"+item.id:"";const yt=raw.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|shorts\/|live\/))([\w-]{11})/i)||raw.match(/[?&]v=([\w-]{11})/i);if(yt)return"yt:"+yt[1];const dr=raw.match(/\/file\/d\/([\w-]{10,200})/i)||raw.match(/[?&]id=([\w-]{10,200})/i);if(dr)return"drive:"+dr[1];if(/(?:facebook\.com|fb\.watch|fb\.gg)/i.test(raw)){const clean=raw.replace(/[?&](?:mibextid|fbclid|ref|rdid|s|sfnsn|extid)=[^&#]*/gi,"").replace(/\?&/,"?").replace(/[?&]$/,"").replace(/\/+$/,"");const fb=clean.match(/\/(?:reel|videos|watch\/?\?v=|video\.php\?v=|share\/[rv])\/([a-zA-Z0-9_-]+)/i);if(fb)return"fb:"+fb[1];return"fb:"+clean.toLowerCase()}try{const u=new URL(raw,"https://local"),cleanPath=(u.origin+u.pathname).toLowerCase().replace(/\/+$/,""),cleanSearch=u.search.replace(/[?&](?:v|t|token|ts)=[^&#]*/gi,"").replace(/\?&/,"?").replace(/[?&]$/,"");return"url:"+cleanPath+cleanSearch}catch{return"raw:"+raw.toLowerCase().replace(/\/+$/,"")}}function _updateMediaTopicDropdown() {
  const wrapper = document.getElementById("mediaTopicFilterWrapper");
  const select = document.getElementById("mediaTopicSelect");
  if (!wrapper || !select) return;
  const currentType = L.mediaFilter || "all";
  if (currentType === "all") {
    wrapper.style.display = "none";
    L.mediaTopicFilter = "all";
    return;
  }
  wrapper.style.display = "inline-flex";
  const items = (L.media || []).filter(n => Qn(n) === currentType);
  const topicsMap = new Map();
  items.forEach(n => {
    const sec = n.section || "general";
    if (!topicsMap.has(sec)) {
      const label = window._MEDIA_SECTION_NAMES?.[sec] || n.sectionLabel || sec;
      topicsMap.set(sec, label);
    }
  });
  const currentVal = L.mediaTopicFilter || select.value || "all";
  select.innerHTML = `<option value="all">ทุกหัวข้อ (${items.length})</option>`;
  topicsMap.forEach((label, sec) => {
    const opt = document.createElement("option");
    opt.value = sec;
    opt.textContent = label;
    select.appendChild(opt);
  });
  if (topicsMap.has(currentVal)) {
    select.value = currentVal;
    L.mediaTopicFilter = currentVal;
  } else {
    select.value = "all";
    L.mediaTopicFilter = "all";
  }
}

function xt(){
  const e = i("#portalMediaGrid");
  if (!e) return;
  _updateMediaTopicDropdown();
  const seen = new Set();
  const currentTopic = L.mediaTopicFilter || "all";
  const t = (L.media || []).filter(n => {
    if (L.mediaFilter !== "all" && Qn(n) !== L.mediaFilter) return false;
    if (L.mediaFilter !== "all" && currentTopic !== "all") {
      const nSec = n.section || "general";
      if (nSec !== currentTopic) return false;
    }
    const k = _getMediaDedupeKey(n);
    if (!k) return true;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });
  e.replaceChildren();
  t.forEach(n => e.append(ca(n)));
  t.length || (e.innerHTML = `<p class="resource-empty">${Gn.media}</p>`);
}
function hn(e){if(!D())return null;const t=document.createElement("span");return t.className=`content-card-status${e.published?" published":""}`,t.textContent=e.published?"เผยแพร่แล้ว":"ฉบับร่าง",t}function ua(e){const t=document.createElement("article");const curLang=document.documentElement.lang||"th";const cTitle=_getDynamicText(e,"title")||(curLang==="en"?"News & Activities":curLang==="lo"?"ຂ່າວສານ ແລະກິດຈະກຳ":"ข่าวและกิจกรรม");const cDesc=_getDynamicText(e,"description")||"";const cMeta=mn(e.eventDate||e.createdAt)||(curLang==="en"?"Project News":curLang==="lo"?"ຂ່າວໂຄງການ":"ข่าวโครงการ");if(t.className="portal-content-card news-card",H(e.imageUrl)){const l=document.createElement("img");l.src=mt(e.imageUrl),l.alt=cTitle,l.loading="lazy",t.append(l)}const n=document.createElement("div"),o=document.createElement("div");o.className="portal-content-meta";const a=document.createElement("time");a.textContent=cMeta,o.append(a);const r=hn(e);r&&o.append(r);const s=document.createElement("h4");s.textContent=cTitle;const u=document.createElement("p");if(u.textContent=cDesc,n.append(o,s,u),H(e.actionUrl)){const isYt=ia(e.actionUrl);const isFb=_isFacebookVideo(e.actionUrl);const isTikTok=_isTikTokVideo(e.actionUrl);const l=document.createElement("a");l.className="portal-action-link"+(isFb?" facebook-action-link":isTikTok?" tiktok-action-link":"");l.href=isYt?`https://www.youtube.com/watch?v=${encodeURIComponent(isYt)}`:H(e.actionUrl);l.target="_blank";l.rel="noopener noreferrer";const readMoreLabel=curLang==="en"?"Read more ↗":curLang==="lo"?"ອ່ານລາຍລະອຽດ ↗":"อ่านรายละเอียด ↗";const ytLabel=curLang==="en"?"Watch on YouTube ↗":curLang==="lo"?"ເບິ່ງເທິງ YouTube ↗":"ดูวิดีโอบน YouTube ↗";const fbLabel=curLang==="en"?"Watch on Facebook ↗":curLang==="lo"?"ເບິ່ງເທິງ Facebook ↗":"ดูวิดีโอบน Facebook ↗";const ttLabel=curLang==="en"?"Watch on TikTok ↗":curLang==="lo"?"ເບິ່ງເທິງ TikTok ↗":"ดูวิดีโอบน TikTok ↗";l.textContent=isYt?ytLabel:(isFb?fbLabel:isTikTok?ttLabel:readMoreLabel);n.append(l)}return t.append(n),t}function pa(e){const t=document.createElement("article");t.className="portal-document-row";const curLang=document.documentElement.lang||"th";const cTitle=_getDynamicText(e,"title")||(curLang==="en"?"Document":curLang==="lo"?"ເອກະສານ":"เอกสาร");const cDesc=_getDynamicText(e,"description")||"";const cMeta=mn(e.eventDate||e.createdAt)||(curLang==="en"?"Project Document":curLang==="lo"?"ເອກະສານໂຄງການ":"เอกสารโครงการ");const n=document.createElement("span");n.className="document-icon",n.textContent="PDF";const o=document.createElement("div"),a=document.createElement("div");a.className="portal-content-meta";const r=document.createElement("span");r.textContent=cMeta,a.append(r);const s=hn(e);s&&a.append(s);const u=document.createElement("h4");u.textContent=cTitle;const l=document.createElement("p");l.textContent=cDesc,o.append(a,u,l);const m=document.createElement("a");const openDocLabel=curLang==="en"?"Open document":curLang==="lo"?"ເປີດເອກະສານ":"เปิดเอกสาร";const noFileLabel=curLang==="en"?"No file yet":curLang==="lo"?"ຍັງບໍ່ມີໄຟລ໌":"ยังไม่มีไฟล์";return m.className="button secondary",m.href=H(e.actionUrl)||"#",m.target="_blank",m.rel="noopener",m.textContent=H(e.actionUrl)?openDocLabel:noFileLabel,H(e.actionUrl)||m.setAttribute("aria-disabled","true"),t.append(n,o,m),t}function ma(e){const t=document.createElement("article");const curLang=document.documentElement.lang||"th";const cTitle=_getDynamicText(e,"title")||(curLang==="en"?"Support Project":curLang==="lo"?"ຮ່ວມບຸນກັບໂຄງການ":"ร่วมบุญกับโครงการ");const cDesc=_getDynamicText(e,"description")||"";const cMeta=curLang==="en"?"Support Phra That Phanom":curLang==="lo"?"ຮ່ວມສືບສານພະທາດພະນົມ":"ร่วมสืบสานพระธาตุพนม";if(t.className="portal-content-card donation-card",H(e.imageUrl)){const l=document.createElement("img");l.src=mt(e.imageUrl),l.alt=cTitle,l.loading="lazy",t.append(l)}const n=document.createElement("div"),o=document.createElement("div");o.className="portal-content-meta";const a=document.createElement("span");a.textContent=cMeta,o.append(a);const r=hn(e);r&&o.append(r);const s=document.createElement("h4");s.textContent=cTitle;const u=document.createElement("p");if(u.textContent=cDesc,n.append(o,s,u),H(e.actionUrl)){const l=document.createElement("a");const btnLabel=curLang==="en"?"View donation details":curLang==="lo"?"ເບິ່ງລາຍລະອຽດການຮ່ວມບຸນ":"ดูรายละเอียดการร่วมบุญ";l.className="button primary",l.href=H(e.actionUrl),l.target="_blank",l.rel="noopener",l.textContent=btnLabel,n.append(l)}return t.append(n),t}function Jn(e){return L.items.filter(t=>t.kind===e&&(D()||t.published)).sort((t,n)=>String(n.eventDate||"").localeCompare(String(t.eventDate||""))||(Number(t.order)||0)-(Number(n.order)||0))}function Xn(){[["news","#portalNewsList",ua],["document","#portalDocumentList",pa],["donation","#portalDonationList",ma]].forEach(([t,n,o])=>{const a=i(n),r=Jn(t);a.replaceChildren(),r.forEach(s=>a.append(o(s))),r.length||(a.innerHTML=`<p class="resource-empty">${Gn[t]}</p>`)})}function It(){const e=document.documentElement.lang;return e==="en"?{published:"Published",draft:"Draft · Admin only",current:"Current project",open:"Open project",website:"Project website ↗",noSections:"No project sections have been added yet",story:"Story of faith",heritage:"World Heritage journey",media:"Media and documents",community:"Community",count:t=>`${t} project${t===1?"":"s"}`}:e==="lo"?{published:"ເຜີຍແຜ່ແລ້ວ",draft:"ສະບັບຮ່າງ · ສະເພາະ Admin",current:"ໂຄງການປັດຈຸບັນ",open:"ເປີດໂຄງການ",website:"ເວັບໄຊໂຄງການ ↗",noSections:"ຍັງບໍ່ມີຫົວຂໍ້ໃນໂຄງການນີ້",story:"ເລື່ອງລາວແຫ່ງສັດທາ",heritage:"ເສັ້ນທາງມໍລະດົກໂລກ",media:"ສື່ ແລະເອກະສານ",community:"ຊຸມຊົນ",count:t=>`${t} ໂຄງການ`}:{published:"เผยแพร่แล้ว",draft:"ฉบับร่าง · เฉพาะ Admin",current:"โครงการปัจจุบัน",open:"เปิดโครงการ",website:"เว็บไซต์โครงการ ↗",noSections:"ยังไม่มีหัวข้อภายในโครงการนี้",story:"เรื่องราวแห่งศรัทธา",heritage:"เส้นทางมรดกโลก",media:"สื่อและเอกสาร",community:"ชุมชน",count:t=>`${t} โครงการ`}}function ha(e){const t=H(e.url);return t||(e.type==="news"?"#news-events":e.type==="document"?"#documents":e.type==="donation"?"#donation":e.contentType==="project"&&e.contentRef===oe?"#project-resources":ta[e.contentRef]||"")}function Zn(e){const t=`${(e==null?void 0:e.id)||""} ${(e==null?void 0:e.slug)||""} ${(e==null?void 0:e.title)||""}`.toLowerCase();return t.includes("muchalinda")||t.includes("mujalin")||t.includes("มุจลิน")}function Ae(e){
  const isOpen = !!e;
  _setMuchalindaActiveMode(isOpen);
  document.body.classList.toggle("support-project-open", isOpen);
  const t = i("#muchalinda-project");
  if (t) t.hidden = !isOpen;
  if (!isOpen && t && typeof window.stopMediaInElement === "function") {
    window.stopMediaInElement(t);
  }

  // Force re-render of rail cards, sidebar items, sidebar project list, and top nav
  const railContainer = i("#railCardsContainer");
  if (railContainer) delete railContainer.dataset.renderedSig;
  const sidebarContainer = i("#sidebarItemsContainer");
  if (sidebarContainer) delete sidebarContainer.dataset.renderedSig;
  const projectsContainer = i("#sidebarProjectsList") || i("#sidebarProjectsNav");
  if (projectsContainer) delete projectsContainer.dataset.renderedSig;

  if (typeof _renderTopNavItems === "function") _renderTopNavItems();
  if (typeof _renderSidebarProjects === "function") _renderSidebarProjects();
  if (typeof Be === "function") Be();
  if (typeof Me === "function") Me();
  if (typeof _updateAdminDOMState === "function") _updateAdminDOMState();
}
function fa(e){
  const t = i("#muchalinda-project");
  const isMuchalinda = Zn(e);
  const targetUrl = H(e.url);
  const openBehavior = e.openBehavior || "center";

  // If set to open external link and has URL
  if (openBehavior === "external" && targetUrl) {
    const tempLink = document.createElement("a");
    tempLink.href = targetUrl;
    tempLink.target = "_blank";
    tempLink.rel = "noopener noreferrer";
    document.body.appendChild(tempLink);
    tempLink.click();
    tempLink.remove();
    return;
  }

  // If Muchalinda project
  if (isMuchalinda && t) {
    i("#selectedProjectDetail").hidden = !0;
    Ae(!0);
    t.scrollIntoView({behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start"});
    history.replaceState(null, "", "#muchalinda-project");
    if (typeof _renderTopNavItems === "function") _renderTopNavItems();
    return;
  }

  // For other projects: reset Ae
  Ae(!1);
  if (typeof _renderTopNavItems === "function") _renderTopNavItems();const n=It(),o=e.id===kt.id||e.contentRef===oe||e.slug===oe,a=i("#selectedProjectDetail");i("#selectedProjectStatus").textContent=o?n.current:e.published?n.published:n.draft;const _dLang=document.documentElement.lang||"th";let _dTitle=e.title||"โครงการพระธาตุพนม";let _dDesc=e.description||"";if(o){_dTitle=_dLang==="en"?"Phra That Phanom to World Heritage":_dLang==="lo"?"ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ":"พระธาตุพนม สู่มรดกโลก";_dDesc=_dLang==="en"?"Project pushing Wat Phra That Phanom to UNESCO World Heritage inscription.":_dLang==="lo"?"ໂຄງການຜັກດັນພະທາດພະນົມຂຶ້ນທະບຽນເປັນມໍລະດົກໂລກທາງວັດທະນະທຳ":(e.description||"โครงการผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลกทางวัฒนธรรม");}else{if(_dLang==="lo"&&e.title_lo)_dTitle=e.title_lo;else if(_dLang==="en"&&e.title_en)_dTitle=e.title_en;if(_dLang==="lo"&&e.description_lo)_dDesc=e.description_lo;else if(_dLang==="en"&&e.description_en)_dDesc=e.description_en;}i("#selectedProjectTitle").textContent=_dTitle;i("#selectedProjectDescription").textContent=_dDesc;const medBox=i("#selectedProjectMedia");if(medBox){medBox.replaceChildren();let targetUrl="";if(e.url&&(_isFacebookVideo(e.url)||_isTikTokVideo(e.url)||ia(e.url)||nt(e.url)||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(e.url))){targetUrl=e.url}else{const childWithMedia=L.nodes.find(l=>l.parentId===e.id&&!l.deletedAt&&l.url&&(_isFacebookVideo(l.url)||_isTikTokVideo(l.url)||ia(l.url)||nt(l.url)||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(l.url)));if(childWithMedia){targetUrl=childWithMedia.url}else if(e.contentRef){const found=p.media.find(m=>J(m)===e.contentRef&&m.enabled!==!1&&m.published!==!1&&(_isFacebookVideo(m.url)||_isTikTokVideo(m.url)||ia(m.url)||nt(m.url)));if(found)targetUrl=found.url}}if(targetUrl){const rendered=renderCardMedia(targetUrl,e.title,false);if(rendered){medBox.append(rendered);medBox.hidden=false}else{medBox.hidden=true}}else{medBox.hidden=true}}const r=i("#selectedProjectLinks");r.replaceChildren();const s=new Set;L.nodes.filter(l=>l.parentId===e.id&&!l.deletedAt).sort((l,m)=>(Number(l.order)||0)-(Number(m.order)||0)).forEach(l=>{const m=ha(l);if(!m||s.has(m))return;s.add(m);const h=document.createElement("a");h.href=m;if(_isFacebookVideo(m)||_isFacebookVideo(l.url)){h.innerHTML='<svg viewBox="0 0 24 24" width="14" height="14" fill="currentColor" aria-hidden="true" style="vertical-align:middle;margin-right:4px;"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'+(l.title||"วิดีโอ Facebook ↗")}else{h.textContent=l.title||"ดูรายละเอียด"}m.startsWith("https://")&&(h.target="_blank",h.rel="noopener"),r.append(h)}),o&&[["#history",n.story],["#world-heritage",n.heritage],["#project-resources",n.media],["#community",n.community]].forEach(([l,m])=>{if(s.has(l))return;s.add(l);const h=document.createElement("a");h.href=l,h.textContent=m,r.append(h)});const u=H(e.url);if(u&&!s.has(u)){const l=document.createElement("a");l.href=u,l.target="_blank",l.rel="noopener",l.textContent=_isFacebookVideo(u)?"วิดีโอ Facebook ↗":n.website,r.append(l)}if(!r.children.length){const l=document.createElement("span");l.textContent=n.noSections,r.append(l)}a.hidden=!1,a.scrollIntoView({behavior:matchMedia("(prefers-reduced-motion: reduce)").matches?"auto":"smooth",block:"nearest"})}function ga(e){const t=It(),n=e.id===kt.id||e.contentRef===oe||e.slug===oe,o=document.createElement("article");o.className="project-catalog-card";const a=document.createElement("div");a.className="project-card-cover";const r=document.createElement("p");r.className=`project-status${!e.published&&!n?" draft":""}`,r.textContent=n?t.current:e.published?t.published:t.draft;const s=document.createElement("img");s.src="assets/logo.png",s.alt="",a.append(r,s);const u=document.createElement("div");u.className="project-card-copy";const l=document.createElement("h3");const m=document.createElement("p");
  const cLang = document.documentElement.lang || "th";
  let cTitle = e.title || "โครงการพระธาตุพนม";
  let cDesc = e.description || "";
  if (n) {
    cTitle = cLang === "en" ? "Phra That Phanom to World Heritage" : cLang === "lo" ? "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ" : "พระธาตุพนม สู่มรดกโลก";
    cDesc = cLang === "en" ? "Project pushing Wat Phra That Phanom to UNESCO World Heritage inscription." : cLang === "lo" ? "ໂຄງການຜັກດັນພະທາດພະນົມຂຶ້ນທະບຽນເປັນມໍລະດົກໂລກທາງວັດທະນະທຳ" : (e.description || "โครงการผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลกทางวัฒนธรรม");
  } else if (Zn(e)) {
    cTitle = cLang === "en" ? "Muchalinda Pond Restoration" : cLang === "lo" ? "ໂຄງການບູລະນະສະມຸດຈະລິນ" : (e.title || "บูรณะสระมุจลินท์");
    cDesc = cLang === "en" ? "Restoring the sacred 1,000-year-old pond to preserve the historic landscape." : cLang === "lo" ? "ຟື້ນຟູແຫຼ່ງນ້ຳສັກສິດອາຍຸກວ່າ 1,000 ປີ ເພື່ອອະນຸລັກພູມິທັດປະຫວັດສາດ" : (e.description || "");
  } else {
    if (cLang === "lo" && e.title_lo) cTitle = e.title_lo;
    else if (cLang === "en" && e.title_en) cTitle = e.title_en;
    if (cLang === "lo" && e.description_lo) cDesc = e.description_lo;
    else if (cLang === "en" && e.description_en) cDesc = e.description_en;
  }
  l.textContent = cTitle;
  m.textContent = cDesc;const h=document.createElement("div");h.className="project-card-actions";
const f=H(e.url);
const isOpenExternal = e.openBehavior === "external" && !!f;

if (isOpenExternal) {
  const d=document.createElement("a");
  d.className="project-card-open external-link-btn";
  d.href=f;
  d.target="_blank";
  d.rel="noopener noreferrer";
  d.innerHTML=`${t.open} ↗`;
  h.append(d);
} else {
  const d=document.createElement("button");
  d.type="button";
  d.className="project-card-open";
  d.textContent=t.open;
  d.addEventListener("click",()=>fa(e));
  h.append(d);
}

if (f) {
  const k=document.createElement("a");
  k.className="project-card-external";
  k.href=f;
  k.target="_blank";
  k.rel="noopener noreferrer";
  k.textContent=t.website;
  h.append(k);
}return u.append(l,m,h),o.append(u),o}function er(){const e=i("#projectCatalogGrid");if(!e)return;const t=document.documentElement.lang||"th",n=L.nodes.filter(r=>r.type==="project"&&!r.deletedAt).sort((r,s)=>(Number(r.order)||0)-(Number(s.order)||0)||String(r.title||"").localeCompare(String(s.title||""),"th"));n.some(r=>r.contentRef===oe||r.slug===oe||r.id===kt.id)||n.unshift(kt),D()&&!n.some(Zn)&&n.push(ea);const a=`${t}|${D()}|`+n.map(r=>`${r.id}:${r.title}:${r.order}`).join("|");if(e.dataset.renderedSig===a&&e.children.length>0){i("#projectCatalogCount").textContent=It().count(n.length),i("#manageProjectsButton").hidden=!D();return}e.dataset.renderedSig=a,e.replaceChildren(),n.forEach(r=>e.append(ga(r))),i("#projectCatalogCount").textContent=It().count(n.length),i("#manageProjectsButton").hidden=!D()}let jt=!1;function bt(){jt||(jt=!0,requestAnimationFrame(()=>{jt=!1,At()}))}function At(){var e;la(),er(),xt(),Xn(),Me(),Be(),_renderSidebarProjects(),(e=i("#contentManageDialog"))!=null&&e.open&&tr()}let _hasInitialContentLoaded = false,
    _hasInitialNodesLoaded = false,
    _hasInitialMediaLoaded = false,
    _hasInitialRailLoaded = false,
    _hasInitialSidebarLoaded = false,
    _hasInitialTopNavLoaded = false,
    _hasInitialSiteSectionsLoaded = false;

function _notifyUpdateAvailable() {
  try {
    const btns = [
      document.getElementById("portalRefreshBtn"),
      document.getElementById("sidebarRefreshBtn"),
      document.getElementById("railRefreshBtn")
    ].filter(Boolean);
    btns.forEach(b => b.classList.add("has-updates"));
  } catch (e) {}
}

function ba() {
  ["unsubContent", "unsubNodes", "unsubMedia", "unsubRailCards", "unsubSidebarItems", "unsubTopNav", "unsubSiteSections"].forEach(e => {
    L[e] && L[e](), L[e] = null;
  });
}

function ya() {
  ba();
  const e = D() ? te(it, fe("order", "asc")) : te(it, gt("published", "==", !0)),
        t = D() ? te(Qt, fe("order", "asc")) : te(Qt, gt("published", "==", !0));

  L.unsubContent = ae(e, a => {
    L.items = a.docs.map(r => ({ id: r.id, ...r.data() }));
    window.dispatchEvent(new CustomEvent("portal-content-updated", { detail: L.items }));
    if (!_hasInitialContentLoaded) {
      _hasInitialContentLoaded = true;
      bt();
    } else {
      _notifyUpdateAvailable();
    }
  }, a => {
    console.warn("Project content unavailable", a.code);
    L.items = [];
    if (!_hasInitialContentLoaded) {
      _hasInitialContentLoaded = true;
      bt();
    }
  });

  L.unsubNodes = ae(t, a => {
    L.nodes = a.docs.map(r => ({ id: r.id, ...r.data() })).filter(r => !r.deletedAt);
    if (!_hasInitialNodesLoaded) {
      _hasInitialNodesLoaded = true;
      bt();
    } else {
      _notifyUpdateAvailable();
    }
  }, a => {
    console.warn("Published project sections unavailable", a.code);
    L.nodes = [];
    if (!_hasInitialNodesLoaded) {
      _hasInitialNodesLoaded = true;
      bt();
    }
  });

  L.unsubMedia = ae(te(oa, fe("order", "asc")), a => {
    L.media = a.docs.map(r => ({ id: r.id, ...r.data() }));
    if (!_hasInitialMediaLoaded) {
      _hasInitialMediaLoaded = true;
      xt();
    } else {
      _notifyUpdateAvailable();
    }
  }, a => console.warn("Media library unavailable", a.code));

  const n = D() ? le : te(le, gt("published", "==", !0));
  L.unsubRailCards = ae(n, a => {
    L.railCards = a.docs.map(r => ({ id: r.id, ...r.data() }));
    if (!_hasInitialRailLoaded) {
      _hasInitialRailLoaded = true;
      Me();
    } else {
      _notifyUpdateAvailable();
    }
  }, a => {
    console.warn("Rail cards unavailable", a.code);
    L.railCards = [];
    if (!_hasInitialRailLoaded) {
      _hasInitialRailLoaded = true;
      Me();
    }
  });

  const o = D() ? de : te(de, gt("published", "==", !0));
  L.unsubSidebarItems = ae(o, a => {
    L.sidebarItems = a.docs.map(r => ({ id: r.id, ...r.data() }));
    if (!_hasInitialSidebarLoaded) {
      _hasInitialSidebarLoaded = true;
      Be();
    } else {
      _notifyUpdateAvailable();
    }
  }, a => {
    console.warn("Sidebar items unavailable", a.code);
    L.sidebarItems = [];
    if (!_hasInitialSidebarLoaded) {
      _hasInitialSidebarLoaded = true;
      Be();
    }
  });

  const _topNavQuery = D() ? _topNavCol : te(_topNavCol, gt("published", "==", true));
  L.unsubTopNav = ae(_topNavQuery, a => {
    L.topNav = a.docs.map(r => ({ id: r.id, ...r.data() })).filter(r => !r.deletedAt).sort((x, y) => (Number(x.order) || 0) - (Number(y.order) || 0));
    if (!_hasInitialTopNavLoaded) {
      _hasInitialTopNavLoaded = true;
      _renderTopNavItems();
    } else {
      _notifyUpdateAvailable();
    }
  }, err => {
    console.warn("Top nav unavailable", err.code);
    L.topNav = [];
    _renderTopNavItems();
  });

  const _sectionsQuery = _siteSectionsCol;
  L.unsubSiteSections = ae(_sectionsQuery, a => {
    L.siteSections = a.docs.map(r => ({ id: r.id, ...r.data() }));
    try {
      localStorage.setItem("thatphanom_site_sections_cache", JSON.stringify(L.siteSections));
    } catch (_) {}
    _renderSiteSectionsCMS();
  }, err => {
    console.warn("Site sections unavailable", err.code);
    _renderSiteSectionsCMS();
  });
}
async function va(e){var t,n;if(!e)return"guest";if(((t=e.email)==null?void 0:t.toLowerCase())===Xr){try{const o=j(Ie,"projects",oe,"members",e.uid),a=j(Ie,"users",e.uid);Promise.allSettled([V(a,{email:e.email,displayName:e.displayName||"",globalRole:"admin",lastLoginAt:I()},{merge:!0}),V(o,{role:"admin",email:e.email,displayName:e.displayName||"",lastLoginAt:I()},{merge:!0})]).catch(()=>{})}catch{}return"admin"}try{const o=await ge(j(Ie,"projects",oe,"members",e.uid));return["admin","manager","user"].includes((n=o.data())==null?void 0:n.role)?o.data().role:"user"}catch{return"user"}}function Jt(e,t=null){L.editingItem=t,i("#contentEditorForm").reset(),i("#contentItemId").value=(t==null?void 0:t.id)||"",i("#contentItemKind").value=e,i("#contentItemTitle").value=(t==null?void 0:t.title)||"",i("#contentItemTitleLo")&&(i("#contentItemTitleLo").value=(t==null?void 0:t.title_lo)||""),i("#contentItemTitleEn")&&(i("#contentItemTitleEn").value=(t==null?void 0:t.title_en)||""),i("#contentItemDate").value=(t==null?void 0:t.eventDate)||"",i("#contentItemDescription").value=(t==null?void 0:t.description)||"",i("#contentItemDescriptionLo")&&(i("#contentItemDescriptionLo").value=(t==null?void 0:t.description_lo)||""),i("#contentItemDescriptionEn")&&(i("#contentItemDescriptionEn").value=(t==null?void 0:t.description_en)||"");if(typeof _switchContentLangTab==="function")_switchContentLangTab("th"),i("#contentItemImageUrl").value=(t==null?void 0:t.imageUrl)||"",i("#contentItemActionUrl").value=(t==null?void 0:t.actionUrl)||"",i("#contentItemPublished").checked=!!(t!=null&&t.published),i("#contentEditorTitle").textContent=`${t?"แก้ไข":"เพิ่ม"}${Yt[e]}`,i("#contentDateField").hidden=e==="donation",i("#contentImageUrlField").hidden=e==="document",i("#contentActionUrlLabel").textContent=e==="document"?"ลิงก์เอกสาร":e==="donation"?"ลิงก์รายละเอียดหรือช่องทางร่วมบุญ":"ลิงก์อ่านรายละเอียดเพิ่มเติม";const n=i("#contentItemFile");n.value="",e==="document"?(n.accept="application/pdf",i("#contentFileLabel").textContent="ไฟล์ PDF",i("#contentFileHelp").textContent="รองรับ PDF ไม่เกิน 20 MB"):(n.accept="image/jpeg,image/png,image/webp",i("#contentFileLabel").textContent="รูปภาพประกอบ",i("#contentFileHelp").textContent="รองรับ JPG, PNG และ WebP ไม่เกิน 10 MB"),i("#contentEditorStatus").hidden=!0,i("#contentEditDialog").showModal()}function tr(){const e=L.manageKind,t=Nt(e);i("#contentManageTitle").textContent=`จัดการ${Yt[e]}`,i("#contentSectionStatus").textContent=t!=null&&t.published?"พร้อมเผยแพร่ — ผู้ชมมองเห็นหัวข้อนี้":"ฉบับร่าง — เห็นเฉพาะ Admin",i("#toggleContentSectionButton").textContent=t!=null&&t.published?"เปลี่ยนเป็นฉบับร่าง":"แสดงต่อผู้ชม",i("#addContentItemButton").textContent=e==="media"?"เปิดหน้าจัดการสื่อ":"＋ เพิ่มรายการ";const n=i("#contentManageList");if(n.replaceChildren(),e==="media"){const a=document.createElement("p");a.className="content-manage-note",a.textContent=`คลังนี้รวบรวมสื่อเดิมทั้งหมด ${L.media.length} รายการโดยอัตโนมัติ การเพิ่ม แก้ไข หรือลบ ใช้หน้าจัดการสื่อเดิม`,n.append(a);return}const o=Jn(e);o.forEach(a=>{const r=document.createElement("div");r.className="content-manage-row";const s=document.createElement("div"),u=document.createElement("strong");u.textContent=a.title||Yt[e];const l=document.createElement("span");l.textContent=`${a.published?"เผยแพร่แล้ว":"ฉบับร่าง"}${a.eventDate?` · ${mn(a.eventDate)}`:""}`,s.append(u,l);const m=document.createElement("div");m.className="row-actions";const h=document.createElement("button");h.type="button",h.textContent="แก้ไข",h.addEventListener("click",()=>Jt(e,a));const d=document.createElement("button");d.type="button",d.className="delete",d.textContent="ลบ",d.addEventListener("click",()=>Ta(a)),m.append(h,d),r.append(s,m),n.append(r)}),o.length||(n.innerHTML='<p class="resource-empty">ยังไม่มีรายการ กด “เพิ่มรายการ” เพื่อเริ่มต้น</p>')}function Dn(e){D()&&(L.manageKind=e,tr(),i("#contentManageDialog").showModal())}async function wa(){const e=Nt(L.manageKind);if(!e)return B("ไม่พบหัวข้อนี้ในผัง กรุณาเปิดผังโครงการอีกครั้ง","error");const t=i("#toggleContentSectionButton");t.disabled=!0;try{await en(j(Qt,e.id),{published:!e.published,updatedAt:I(),updatedBy:L.user.uid}),B(e.published?"เปลี่ยนเป็นฉบับร่างแล้ว":"เปิดแสดงหัวข้อนี้ต่อผู้ชมแล้ว")}catch(n){console.error(n),B("เปลี่ยนสถานะหัวข้อไม่สำเร็จ","error")}finally{t.disabled=!1}}async function Ea(e){if(e.preventDefault(),!D())return;const t=i("#contentItemKind").value,n=i("#contentItemTitle").value.trim(),o=i("#contentItemDescription").value.trim(),a=i("#contentItemFile").files[0],r=L.editingItem,s=[];let u=mt(i("#contentItemImageUrl").value.trim()),l=H(i("#contentItemActionUrl").value.trim()),m=(r==null?void 0:r.storagePath)||"";const h=i("#contentEditorStatus"),d=i("#saveContentItemButton");h.hidden=!0,d.disabled=!0,d.textContent="กำลังบันทึก...";try{if(!n||!o||!["news","document","donation"].includes(t))throw new Error("กรุณากรอกชื่อเรื่องและรายละเอียดให้ครบ");if(a){const k=a.type==="application/pdf",E=a.type.startsWith("image/")||/^image\/(jpeg|png|webp)$/.test(a.type)||/\.(jpe?g|png|webp)$/i.test(a.name);if(t==="document"&&(!k||a.size>20*1024*1024))throw new Error("เอกสารต้องเป็น PDF และมีขนาดไม่เกิน 20 MB");if(t!=="document"&&!E)throw new Error("รูปภาพต้องเป็น JPG, PNG หรือ WebP");let uploadFile=a;if(t!=="document"){d.textContent="กำลังบีบอัดรูปภาพเป็น WebP...";uploadFile=await compressImageToWebp(a);}const _targetContentRef=r?j(it,r.id):j(it);const _contentDocId=_targetContentRef.id;const _cext=k?"pdf":"webp";m=`projects/${oe}/content/${L.user.uid}/${_contentDocId}.${_cext}`;d.textContent="กำลังอัปโหลดไฟล์...";const T=await Ot(ce(yt,m),uploadFile,{contentType:uploadFile.type});s.push(m);const C=await zt(T.ref);t==="document"?l=C:u=C}else r&&(t==="document"?l!==(r.actionUrl||""):u!==(r.imageUrl||""))&&(m="");if(t==="document"&&!l)throw new Error("กรุณาใส่ลิงก์เอกสารหรืออัปโหลดไฟล์ PDF");const f={kind:t,title:n,title_lo:(i("#contentItemTitleLo")?.value.trim())||"",title_en:(i("#contentItemTitleEn")?.value.trim())||"",description:o,description_lo:(i("#contentItemDescriptionLo")?.value.trim())||"",description_en:(i("#contentItemDescriptionEn")?.value.trim())||"",eventDate:i("#contentItemDate").value||"",imageUrl:u,actionUrl:l,storagePath:m,published:i("#contentItemPublished").checked,order:(r==null?void 0:r.order)||Date.now(),updatedAt:I(),updatedBy:L.user.uid};const _saveContentRef=(typeof _targetContentRef!=="undefined"&&_targetContentRef)?_targetContentRef:(r?j(it,r.id):j(it));r?await en(_saveContentRef,f):await V(_saveContentRef,{...f,createdAt:I(),createdBy:L.user.uid,createdByEmail:L.user.email||""});const _oldCPath=(r!=null&&r.storagePath)?r.storagePath:((r!=null&&r.imageUrl&&typeof r.imageUrl==="string"&&r.imageUrl.includes("firebasestorage.googleapis.com"))?decodeURIComponent((r.imageUrl.split("/o/")[1]||"").split("?")[0]):"");_oldCPath&&_oldCPath!==m&&await De(ce(yt,_oldCPath)).catch(()=>{}),i("#contentEditDialog").close(),B(r?"แก้ไขรายการเรียบร้อยแล้ว":"เพิ่มรายการเรียบร้อยแล้ว")}catch(f){console.error(f),await Promise.allSettled(s.map(E=>De(ce(yt,E))));const k=(f==null?void 0:f.code)==="permission-denied"||(f==null?void 0:f.code)==="storage/unauthorized";h.textContent=k?"กรุณา Publish firestore.rules และ storage.rules รุ่นล่าสุดใน Firebase แล้วลองใหม่":f.message||"บันทึกรายการไม่สำเร็จ",h.hidden=!1,B(h.textContent,"error")}finally{d.disabled=!1,d.textContent="บันทึก"}}async function Ta(e){if(!(!D()||!window.confirm(`ลบ “${e.title}” ใช่หรือไม่?`)))try{await dt(j(it,e.id)),e.storagePath&&await De(ce(yt,e.storagePath)).catch(()=>{}),B("ลบรายการเรียบร้อยแล้ว")}catch(t){console.error(t),B("ลบรายการไม่สำเร็จ","error")}}function nr(e){return e?String(e).replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#039;"):""}function _e(e){if(!e)return"";const t=e!=null&&e.toDate?e.toDate():new Date(e);if(Number.isNaN(t.getTime()))return"";const n=["มกราคม","กุมภาพันธ์","มีนาคม","เมษายน","พฤษภาคม","มิถุนายน","กรกฎาคม","สิงหาคม","กันยายน","ตุลาคม","พฤศจิกายน","ธันวาคม"],o=t.getDate(),a=n[t.getMonth()],r=t.getFullYear()+543,s=String(t.getHours()).padStart(2,"0"),u=String(t.getMinutes()).padStart(2,"0");return`${o} ${a} ${r} เวลา ${s}:${u} น.`}function _t(e,t,n,o="ยืนยัน"){const a=i("#confirmDialog");if(!a){window.confirm(`${e}
${t}`)&&n();return}i("#confirmTitle").textContent=e,i("#confirmMessage").textContent=t;const r=i("#confirmOk");r&&(r.textContent=o),a.open&&a.close(),a.showModal();const s=()=>{a.open&&a.close()};i("#confirmCancel").onclick=s,i("#confirmOk").onclick=async()=>{i("#confirmOk").disabled=!0;try{await n()}finally{i("#confirmOk").disabled=!1,s()}}}function xe(e,t,n){if(n==="lo"){const o=e[`${t}_lo`];if(o&&String(o).trim())return o}else if(n==="en"){const o=e[`${t}_en`];if(o&&String(o).trim())return o}return e[t]||""}const _MUCHALINDA_DEFAULT_RAIL_CARDS = [
  {
    id: "default-mucha-rail-overview",
    type: "project",
    template: "project",
    kicker: "โครงการบูรณะ",
    kicker_lo: "ໂຄງການບູຣະນະ",
    kicker_en: "Restoration Project",
    title: "บูรณะสระมุจลินท์",
    title_lo: "ບູລະນະສະມຸດຈະລິນ",
    title_en: "Muchalinda Pond Restoration",
    description: "ฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์และปรับปรุงภูมิทัศน์ประวัติศาสตร์ สนับสนุนพระธาตุพนมสู่มรดกโลก",
    description_lo: "ຟື້ນຟູແຫຼ່ງນ້ຳສັກສິດ ແລະປັບປຸງພູມິທັດປະຫວັດສາດ ສະໜັບສະໜູນພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
    description_en: "Revitalizing the sacred water basin and historic landscape supporting Phra That Phanom World Heritage.",
    buttonText: "ดูข้อมูลโครงการ",
    buttonText_lo: "ເບິ່ງຂໍ້ມູນໂຄງການ",
    buttonText_en: "View Project Info",
    buttonUrl: "#muchalinda-project",
    openExternal: false,
    theme: "maroon",
    icon: "💧",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 10,
    fallback: true
  },
  {
    id: "default-mucha-rail-donate",
    type: "donation",
    template: "donation",
    kicker: "ร่วมบุญบูรณะ",
    kicker_lo: "ຮ່ວມບຸນບູຣະນະ",
    kicker_en: "Project Merit",
    title: "สมทบทุนบูรณะสระพังทอง",
    title_lo: "ສົມທົບທຶນບູລະນະສະພັງທອງ",
    title_en: "Support Muchalinda Restoration",
    description: "ร่วมเป็นส่วนหนึ่งในการอนุรักษ์และพัฒนาสระมุจลินท์ให้งดงามและยั่งยืนสืบไป",
    description_lo: "ຮ່ວມເປັນສ່ວນໜຶ່ງໃນການອະນຸລັກ ແລະພັດທະນາສະມຸດຈະລິນໃຫ້ງົດງາມ ແລະຍືນຍົງ",
    description_en: "Support the ongoing heritage preservation and conservation efforts for Muchalinda Sacred Pond.",
    buttonText: "ช่องทางร่วมบุญ",
    buttonText_lo: "ຊ່ອງທາງຮ່ວມບຸນ",
    buttonText_en: "Donation Channels",
    buttonUrl: "#muchalinda-donate",
    openExternal: false,
    theme: "gold",
    icon: "♥",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 20,
    fallback: true
  },
  {
    id: "default-mucha-rail-history",
    type: "quick",
    template: "quick",
    kicker: "ประวัติศาสตร์พันปี",
    kicker_lo: "ປະຫວັດສາດພັນປີ",
    kicker_en: "Sacred History",
    title: "ความเป็นมาสระน้ำศักดิ์สิทธิ์",
    title_lo: "ຄວາມເປັນມາແຫຼ່ງນ້ຳສັກສິດ",
    title_en: "History of Sacred Water",
    description: "ศึกษาเรื่องราวน้ำสรงพระธาตุพนมและน้ำศักดิ์สิทธิ์ในพระราชพิธีสำคัญของแผ่นดิน",
    description_lo: "ສຶກສາເລື່ອງຣາວນ້ຳສົງພະທາດພະນົມ ແລະນ້ຳສັກສິດໃນພະລາຊະພິທີສຳຄັນ",
    description_en: "Discover the thousand-year spiritual legacy and sacred water used in royal ceremonies.",
    buttonText: "อ่านประวัติศาสตร์",
    buttonText_lo: "ອ່ານປະຫວັດສາດ",
    buttonText_en: "Read History",
    buttonUrl: "#muchalinda-history",
    openExternal: false,
    theme: "standard",
    icon: "🏛",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 30,
    fallback: true
  }
];

function Ue(){
  const isMucha = _isMuchalindaActiveMode();
  const rawCards = (L.railCards || []);
  if (isMucha) {
    const muchaCards = rawCards.filter(c => c.projectScope === "muchalinda-restoration" || c.projectScope === "muchalinda");
    const merged = [];
    const handledIds = new Set();
    _MUCHALINDA_DEFAULT_RAIL_CARDS.forEach(def => {
      const customMatch = muchaCards.find(c => c.id === def.id || (c.type === def.type && c.template === def.template));
      if (customMatch) {
        handledIds.add(customMatch.id);
        merged.push({ ...def, ...customMatch, title: customMatch.title || def.title, description: customMatch.description || def.description, kicker: customMatch.kicker || def.kicker, buttonText: customMatch.buttonText || def.buttonText });
      } else {
        merged.push(def);
      }
    });
    muchaCards.forEach(c => {
      if (!handledIds.has(c.id)) {
        merged.push(c);
      }
    });
    return merged.sort((a,b) => (Number(a.order)||0) - (Number(b.order)||0));
  }
  // World heritage mode (normal site)
  const e = rawCards.filter(c => c.projectScope !== "muchalinda-restoration" && c.projectScope !== "muchalinda").map(a => {
    const r = ot.find(s => s.id === a.id);
    return r ? { ...r, ...a, title: a.title || r.title, description: a.description || r.description, kicker: a.kicker || r.kicker, buttonText: a.buttonText || r.buttonText } : a;
  });
  const t = new Set(e.map(a => a.id));
  const n = ot.filter(a => !t.has(a.id));
  return [...e, ...n].sort((a, r) => (Number(a.order) || 0) - (Number(r.order) || 0));
}
const Le={facebook:{name:"เฟซบุ๊ก",className:"badge-facebook",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>'},line:{name:"ไลน์",className:"badge-line",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>'},tiktok:{name:"ติ๊กต็อก",className:"badge-tiktok",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>'},instagram:{name:"อินสตาแกรม",className:"badge-instagram",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>'},youtube:{name:"ยูทูบ",className:"badge-youtube",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>'},link:{name:"เว็บไซต์",className:"badge-link",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>'},phone:{name:"โทรศัพท์",className:"badge-phone",svg:'<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M6.62 10.79a15.053 15.053 0 0 0 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/></svg>'}},Ca={ก:"ກ",ข:"ຂ",ฃ:"ຂ",ค:"ຄ",ฅ:"ຄ",ฆ:"ຄ",ง:"ງ",จ:"ຈ",ฉ:"ຊ",ช:"ຊ",ซ:"ຊ",ฌ:"ຊ",ญ:"ຍ",ฎ:"ດ",ฏ:"ຕ",ฐ:"ຖ",ฑ:"ທ",ฒ:"ທ",ณ:"ນ",ด:"ດ",ต:"ຕ",ถ:"ຖ",ท:"ທ",ธ:"ທ",น:"ນ",บ:"ບ",ป:"ປ",ผ:"ຜ",ฝ:"ຝ",พ:"ພ",ฟ:"ຟ",ภ:"ພ",ม:"ມ",ย:"ຍ",ร:"ລ",ฤ:"ຣຶ",ล:"ລ",ว:"ວ",ศ:"ສ",ษ:"ສ",ส:"ສ",ห:"ຫ",ฬ:"ລ",อ:"ອ",ฮ:"ຮ",ะ:"ະ","ั":"ັ",า:"າ",ำ:"ຳ","ิ":"ິ","ี":"ີ","ึ":"ຶ","ื":"ື","ุ":"ຸ","ู":"ູ",เ:"ເ",แ:"ແ",โ:"ໂ",ใ:"ໃ",ไ:"ໄ","่":"່","้":"້","๊":"໊","๋":"໋","็":"ັ","์":"໌",ๆ:"ໆ",ฯ:"ຯ","๐":"໐","๑":"໑","๒":"໒","๓":"໓","๔":"໔","๕":"໕","๖":"໖","๗":"໗","๘":"໘","๙":"໙"},rr=[["พระธาตุพนม สู่มรดกโลก","ພຣະທາດພະນົມ ສູ່ມໍຣະດົກໂລກ"],["พระธาตุพนม","ພຣະທາດພະນົມ"],["สู่มรดกโลก","ສູ່ມໍຣະດົກໂລກ"],["มรดกโลก","ມໍຣະດົກໂລກ"],["สระมุจลินท์","ສະມຸຈລິນ"],["โครงการบูรณะ","ໂຄງການບູຣະນະ"],["โครงการปัจจุบัน","ໂຄງການປັດຈຸບັນ"],["โครงการ","ໂຄງການ"],["ดูโครงการทั้งหมด","ເບິ່ງໂຄງການທັງໝົດ"],["เข้าถึงอย่างรวดเร็ว","ເຂົ້າເຖິງຢ່າງວ່ອງໄວ"],["ข่าวและกิจกรรม","ຂ່າວສານ ແລະ ກິດຈະກຳ"],["ข่าวสาร","ຂ່າວສານ"],["ข่าวด่วน","ຂ່າວດ່ວນ"],["ประชาสัมพันธ์","ປະຊາສຳພັນ"],["กำหนดการและกิจกรรม","ກຳນົດການ ແລະ ກິດຈະກຳ"],["กำหนดการ","ກຳນົດການ"],["พิธีสำคัญ","ພິທີສຳຄັນ"],["ถ่ายทอดสด","ຖ່າຍທອດສົດ"],["เอกสารสำคัญ","ເອກະສານສຳຄັນ"],["เอกสารเผยแพร่","ເອກະສານເຜີຍແຜ່"],["คลังสื่อทั้งหมด","ຄັງສື່ທັງໝົດ"],["คลังสื่อ","ຄັງສື່"],["ร่วมบุญ","ຮ່ວມບຸນ"],["ร่วมสืบสานมรดกแห่งศรัทธา","ຮ່ວມສືບສານມໍຣະດົກແຫ່ງສັດທາ"],["ดูรายละเอียด","ເບິ່ງລາຍລະອຽດ"],["ดูทั้งหมด","ເບິ່ງທັງໝົດ"],["ทางลัด","ທາງລັດ"],["ข้อมูลโครงการ","ຂໍ້ມູນໂຄງການ"],["ติดตามเรา","ຕິດຕາມພວກເຮົາ"],["ติดตามบน Facebook","ຕິດຕາມໃນ Facebook"],["ติดตามบน TikTok","ຕິດຕາມໃນ TikTok"],["ติดตามบน Instagram","ຕິດຕາມໃນ Instagram"],["รับชมบน YouTube","ຮັບຊົມໃນ YouTube"],["เพิ่มเพื่อน LINE","ເພີ່ມເພື່ອນ LINE"],["ติดตาม","ຕິດຕາມ"],["ติดต่อเรา","ຕິດຕໍ່ພວກເຮົາ"],["ติดต่อ","ຕິດຕໍ່"],["ชมวิดีโอ","ຊົມວິດີໂອ"],["อ่านต่อ","ອ່ານຕໍ່"],["อ่านข่าวทั้งหมด","ອ່ານຂ່າວທັງໝົດ"],["ดูกำหนดการ","ເບິ່ງກຳນົດການ"],["ดาวน์โหลดเอกสาร","ດາວໂຫຼດເອກະສານ"],["ดูช่องทางร่วมบุญ","ເບິ່ງຊ່ອງທາງຮ່ວມບຸນ"],["เพิ่มเพื่อน","ເພີ່ມເພື່ອນ"],["เฟซบุ๊กทางการ","ເຟສບຸກທາງການ"],["เฟซบุ๊ก","ເຟສບຸກ"],["ไลน์","ໄລນ໌"],["ติ๊กต็อก","ຕິກຕັອກ"],["อินสตาแกรม","ອິນສະຕາແກຣມ"],["ยูทูบทางการ","ຢູທູບທາງການ"],["ยูทูบ","ຢູທູບ"]],Nn=[["พระธาตุพนม สู่มรดกโลก","Phra That Phanom to World Heritage"],["พระธาตุพนม","Phra That Phanom"],["สู่มรดกโลก","to World Heritage"],["มรดกโลก","World Heritage"],["สระมุจลินท์","Muchalinda Pond"],["โครงการบูรณะสระมุจลินท์","Muchalinda Pond Restoration Project"],["โครงการปัจจุบัน","Current Project"],["ดูโครงการทั้งหมด","View All Projects"],["เข้าถึงอย่างรวดเร็ว","Quick Access"],["ข่าวและกิจกรรม","News & Events"],["ข่าวด่วน","Breaking News"],["ประชาสัมพันธ์","Announcement"],["กำหนดการและกิจกรรม","Schedule & Events"],["กำหนดการ","Schedule"],["พิธีสำคัญ","Sacred Ceremony"],["ถ่ายทอดสด","Live Broadcast"],["เอกสารสำคัญ","Important Documents"],["เอกสารเผยแพร่","Publications"],["คลังสื่อทั้งหมด","Media Library"],["คลังสื่อ","Media Library"],["ร่วมบุญ","Make Merit"],["ร่วมสืบสานมรดกแห่งศรัทธา","Support Heritage of Faith"],["ดูรายละเอียด","View Details"],["ดูทั้งหมด","View All"],["ทางลัดคลังข้อมูลและกิจกรรม","Direct Shortcuts & Archives"],["ทางลัดเข้าถึง","Quick Access"],["ข้อมูลโครงการ","Project Information"],["ติดตามเรา","Follow Us"],["ติดตามบน Facebook","Follow on Facebook"],["ติดตามบน TikTok","Follow on TikTok"],["ติดตามบน Instagram","Follow on Instagram"],["รับชมบน YouTube","Watch on YouTube"],["เพิ่มเพื่อน LINE","Add LINE Official"],["ติดตาม","Follow"],["ติดต่อเรา","Contact Us"],["ติดต่อ","Contact"],["อ่านข่าวทั้งหมด","Read All News"],["ดูกำหนดการ","View Schedule"],["รับชมถ่ายทอดสด","Watch Live"],["ดาวน์โหลดเอกสาร","Download Docs"],["ดูช่องทางร่วมบุญ","View Donation Channels"],["เพิ่มเพื่อน","Add Friend"],["เฟซบุ๊กทางการ","Official Facebook"],["ยูทูบทางการ","Official YouTube"]];function ka(e){if(!e)return"";let t=String(e);for(const[o,a]of rr)t=t.replaceAll(o,a);let n="";for(const o of t)n+=Ca[o]||o;return n}async function ne(e){var o;if(!e||!e.trim())return"";const t=e.trim(),n=rr.find(([a])=>a===t);if(n)return n[1];try{const a=new AbortController,r=setTimeout(()=>a.abort(),2600),s=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=th|lo`,{signal:a.signal});if(clearTimeout(r),s.ok){const u=await s.json(),l=(o=u==null?void 0:u.responseData)==null?void 0:o.translatedText;if(l&&/[\u0E80-\u0EFF]/.test(l)&&!l.toLowerCase().includes("mymemory"))return l}}catch{}return ka(t)}async function re(e){var a;if(!e||!e.trim())return"";const t=e.trim(),n=Nn.find(([r])=>r===t);if(n)return n[1];try{const r=new AbortController,s=setTimeout(()=>r.abort(),2800),u=await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(t)}&langpair=th|en`,{signal:r.signal});if(clearTimeout(s),u.ok){const l=await u.json(),m=(a=l==null?void 0:l.responseData)==null?void 0:a.translatedText;if(m&&!m.toLowerCase().includes("mymemory")&&m!==t)return m}}catch{}let o=t;for(const[r,s]of Nn)o=o.replaceAll(r,s);return o}window._translateThToLo=ne;window._translateThToEn=re;let $t=!1;async function xa(e=!1){var l,m,h,d;if($t)return;const t=((l=i("#railCardKickerTh"))==null?void 0:l.value.trim())||"",n=((m=i("#railCardTitleTh"))==null?void 0:m.value.trim())||"",o=((h=i("#railCardDescTh"))==null?void 0:h.value.trim())||"",a=((d=i("#railCardBtnTh"))==null?void 0:d.value.trim())||"";if(!n&&!o&&!t&&!a)return;const r=i("#railTranslateStatus"),s=i("#railTranslateStatusText"),u=i("#railAutoTranslateBtn");r&&s&&(r.hidden=!1,s.textContent="🌐 กำลังแปลภาษาลาวและอังกฤษ..."),u&&(u.disabled=!0),$t=!0;try{const[f,k,E,v,T,C,M,q]=await Promise.all([t?ne(t):Promise.resolve(""),t?re(t):Promise.resolve(""),n?ne(n):Promise.resolve(""),n?re(n):Promise.resolve(""),o?ne(o):Promise.resolve(""),o?re(o):Promise.resolve(""),a?ne(a):Promise.resolve(""),a?re(a):Promise.resolve("")]),N=i("#railCardKickerLo"),w=i("#railCardTitleLo"),R=i("#railCardDescLo"),P=i("#railCardBtnLo"),S=i("#railCardKickerEn"),O=i("#railCardTitleEn"),$=i("#railCardDescEn"),W=i("#railCardBtnEn");N&&(e||!N.dataset.customized)&&(N.value=f),w&&(e||!w.dataset.customized)&&(w.value=E),R&&(e||!R.dataset.customized)&&(R.value=T),P&&(e||!P.dataset.customized)&&(P.value=M),S&&(e||!S.dataset.customized)&&(S.value=k),O&&(e||!O.dataset.customized)&&(O.value=v),$&&(e||!$.dataset.customized)&&($.value=C),W&&(e||!W.dataset.customized)&&(W.value=q),s&&(s.textContent="✓ แปลภาษาลาวและอังกฤษสำเร็จ",setTimeout(()=>{r&&(r.hidden=!0)},3500))}catch(f){console.error("Auto-translate rail fields error:",f),s&&(s.textContent="ระบบแปลภาษาพร้อมใช้งาน",setTimeout(()=>{r&&(r.hidden=!0)},3e3))}finally{$t=!1,u&&(u.disabled=!1)}}let Ft=!1;async function Ia(e=!1){var s,u;if(Ft)return;const t=((s=i("#sidebarItemTitleTh"))==null?void 0:s.value.trim())||"",n=((u=i("#sidebarItemDescTh"))==null?void 0:u.value.trim())||"";if(!t&&!n)return;const o=i("#sidebarTranslateStatus"),a=i("#sidebarTranslateStatusText"),r=i("#sidebarAutoTranslateBtn");o&&a&&(o.hidden=!1,a.textContent="🌐 กำลังแปลภาษาลาวและอังกฤษ..."),r&&(r.disabled=!0),Ft=!0;try{const[l,m,h,d]=await Promise.all([t?ne(t):Promise.resolve(""),t?re(t):Promise.resolve(""),n?ne(n):Promise.resolve(""),n?re(n):Promise.resolve("")]),f=i("#sidebarItemTitleLo"),k=i("#sidebarItemDescLo"),E=i("#sidebarItemTitleEn"),v=i("#sidebarItemDescEn");f&&(e||!f.dataset.customized)&&(f.value=l),k&&(e||!k.dataset.customized)&&(k.value=h),E&&(e||!E.dataset.customized)&&(E.value=m),v&&(e||!v.dataset.customized)&&(v.value=d),a&&(a.textContent="✓ แปลภาษาลาวและอังกฤษสำเร็จ",setTimeout(()=>{o&&(o.hidden=!0)},3500))}catch(l){console.error("Auto-translate sidebar fields error:",l),a&&(a.textContent="ระบบแปลภาษาพร้อมใช้งาน",setTimeout(()=>{o&&(o.hidden=!0)},3e3))}finally{Ft=!1,r&&(r.disabled=!1)}}function renderCardMedia(mediaUrl,title,isSidebar){const url=(mediaUrl||"").trim();if(!url)return null;const wrap=document.createElement("div");wrap.className=isSidebar?"sidebar-item-media-box":"rail-card-media-box",wrap.style.width="100%",wrap.style.borderRadius="8px",wrap.style.overflow="hidden",wrap.style.marginTop="8px",wrap.style.background="rgba(0,0,0,0.15)";const ytId=ia(url),isFb=_isFacebookVideo(url),isTikTok=_isTikTokVideo(url),driveId=nt(url),isDirectVideo=!isFb&&!isTikTok&&!driveId&&( /\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(url)||url.includes("/videos%2F")||(!url.includes("facebook.com")&&!url.includes("fb.watch")&&!url.includes("tiktok.com")&&url.includes("/video")) );if(driveId){const ifr=document.createElement("iframe");ifr.src="https://drive.google.com/file/d/"+encodeURIComponent(driveId)+"/preview",ifr.title=title||"วิดีโอ Drive ประกอบ",ifr.loading="lazy",ifr.allow="autoplay; fullscreen",ifr.allowFullscreen=!0,ifr.style.width="100%",ifr.style.aspectRatio="16/9",ifr.style.border="none",ifr.style.display="block",wrap.appendChild(ifr)}else if(ytId){const ifr=document.createElement("iframe");ifr.src="https://www.youtube-nocookie.com/embed/"+ytId,ifr.title=title||"วิดีโอประกอบ",ifr.loading="lazy",ifr.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",ifr.allowFullscreen=!0,ifr.style.width="100%",ifr.style.aspectRatio="16/9",ifr.style.border="none",ifr.style.display="block",wrap.appendChild(ifr)}else if(isFb){const isReel=_isFacebookReel(url);const ifr=document.createElement("iframe");ifr.src=_getFacebookEmbedUrl(url),ifr.title=title||"วิดีโอ Facebook ประกอบ",ifr.loading="lazy",ifr.allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share; fullscreen",ifr.allowFullscreen=!0,ifr.style.width="100%",ifr.style.aspectRatio=isReel?"9/16":"16/9",ifr.style.border="none",ifr.style.display="block",wrap.appendChild(ifr)}else if(isTikTok){const ifr=document.createElement("iframe");ifr.src=_getTikTokEmbedUrl(url),ifr.title=title||"วิดีโอ TikTok ประกอบ",ifr.loading="lazy",ifr.allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share; fullscreen",ifr.allowFullscreen=!0,ifr.style.width="100%",ifr.style.aspectRatio="9/16",ifr.style.border="none",ifr.style.display="block",wrap.appendChild(ifr)}else if(isDirectVideo){const vid=document.createElement("video");vid.src=url,vid.controls=!0,vid.preload="metadata",vid.style.width="100%",vid.style.maxHeight=isSidebar?"200px":"240px",vid.style.display="block",wrap.appendChild(vid)}else{const img=document.createElement("img"),cleanUrl=mt(url);img.src=cleanUrl,img.alt=title||"ภาพประกอบ",img.loading="lazy",img.className=isSidebar?"sidebar-item-image":"rail-card-image",img.style.width="100%",img.style.maxHeight=isSidebar?"200px":"220px",img.style.objectFit="cover",img.style.display="block",img.style.cursor="zoom-in",img.title="คลิกเพื่อดูภาพขยายเต็มจอ",img.addEventListener("click",ev=>{ev.preventDefault(),ev.stopPropagation(),da({url:cleanUrl,title:title||""})}),img.onerror=()=>{wrap.style.display="none"},wrap.appendChild(img)}return wrap};function Me(){const e=i("#railCardsContainer");if(!e)return;const t=document.documentElement.lang||"th",o=_isMuchalindaActiveMode()?"muchalinda-restoration":"world-heritage",a=Ue(),r=a.filter(d=>!!d.deletedAt),s=i("#railTrashCount");s&&(s.textContent=String(r.length));const u=i("#railAdminToolbar");u&&(u.hidden=!D());const l=new Date,m=a.filter(d=>!d.deletedAt).filter(d=>!(d.published===!1||d.scheduled&&(d.startDate&&new Date(d.startDate)>l||d.endDate&&new Date(d.endDate)<l))).sort((d,f)=>(Number(d.order)||0)-(Number(f.order)||0)),h=`${t}|${D()}|${o}|`+m.map(d=>{var f;return[d.id,d.order,((f=d.updatedAt)==null?void 0:f.seconds)||d.updatedAt||"",d.titleTh||d.title||"",d.descTh||d.description||"",d.theme||"",d.type||"",d.published].join(":")}).join(";");if(!(e.dataset.renderedSig===h&&e.children.length>0)){if(e.dataset.renderedSig=h,e.innerHTML="",m.length===0){D()&&(e.innerHTML='<p class="resource-empty" style="padding:20px;text-align:center;background:#fff;border-radius:8px">ยังไม่มีหัวข้อที่แสดงผล กด “เพิ่มหัวข้อใหม่” ด้านล่างเพื่อเริ่มสร้าง</p>');return}m.forEach(d=>{const f=document.createElement("section"),k=d.theme&&d.theme!=="standard"?`theme-${d.theme}`:"",E=d.type==="project"?"project-card":d.type==="donate"||d.type==="donation"?"donate-card":d.type==="quick"?"quick-card":"";if(f.className=`rail-card ${E} ${k}`.trim(),f.dataset.railId=d.id,D()){f.classList.add("is-admin-draggable"),f.setAttribute("draggable","true"),f.addEventListener("dragstart",w=>{w.dataTransfer.setData("text/plain",d.id),f.classList.add("is-dragging")}),f.addEventListener("dragend",()=>{f.classList.remove("is-dragging"),z(".rail-card").forEach(w=>w.classList.remove("drag-over"))}),f.addEventListener("dragover",w=>{w.preventDefault(),f.classList.add("drag-over")}),f.addEventListener("dragleave",()=>{f.classList.remove("drag-over")}),f.addEventListener("drop",w=>{w.preventDefault(),f.classList.remove("drag-over");const R=w.dataTransfer.getData("text/plain");R&&R!==d.id&&_a(R,d.id)});if(d.published===!1){const w=document.createElement("span");w.className="rail-card-status-badge status-draft",w.textContent="ฉบับร่าง (ไม่แสดงต่อผู้ชม)",f.appendChild(w)}else if(d.scheduled){const w=document.createElement("span"),R=d.startDate&&new Date(d.startDate)>l,P=d.endDate&&new Date(d.endDate)<l;R?(w.className="rail-card-status-badge status-scheduled",w.textContent=`รอเริ่ม: ${_e(d.startDate)}`):P?(w.className="rail-card-status-badge status-expired",w.textContent=`หมดเวลา: ${_e(d.endDate)}`):(w.className="rail-card-status-badge status-scheduled",w.textContent="กำลังแสดงผลตามกำหนดเวลา"),f.appendChild(w)}}const v=xe(d,"kicker",t),T=xe(d,"title",t),C=xe(d,"description",t),M=xe(d,"buttonText",t)||"ดูรายละเอียด";const Hdr=document.createElement("div");Hdr.className="rail-card-top-row";const LeftBox=document.createElement("div");LeftBox.className="rail-card-top-left";let hasIconOrKicker=!1;if(d.type==="donation"||d.type==="donate"||d.template==="donation"){const w=document.createElement("span");w.className="heart-icon",w.textContent=d.icon||"♥",w.setAttribute("aria-hidden","true"),LeftBox.appendChild(w),hasIconOrKicker=!0}else if(d.icon&&!d.imageUrl){const w=document.createElement("span"),R=String(d.icon).toLowerCase().trim(),P=Le[R];P?(w.className=`rail-card-icon-badge ${P.className}`,w.innerHTML=P.svg):(w.className="rail-card-icon-badge",w.textContent=d.icon),w.setAttribute("aria-hidden","true"),LeftBox.appendChild(w),hasIconOrKicker=!0}if(v){const w=document.createElement("p");w.className="rail-label",w.textContent=v,LeftBox.appendChild(w),hasIconOrKicker=!0}Hdr.appendChild(LeftBox);if(D()){const N=document.createElement("button");N.type="button",N.className="rail-card-gear",N.title="จัดการหัวข้อนี้",N.setAttribute("aria-label","จัดการหัวข้อนี้"),N.textContent="⚙",N.addEventListener("click",w=>{w.preventDefault(),w.stopPropagation(),ar(d.id)}),Hdr.appendChild(N)}if(hasIconOrKicker||D()){f.appendChild(Hdr)}const N=document.createElement("h2");if(N.textContent=T,f.appendChild(N),(d.imageUrl||d.mediaUrl)){const mElem=renderCardMedia(d.imageUrl||d.mediaUrl,T,!1);mElem&&f.appendChild(mElem)}if(C){const w=document.createElement("p");w.className=d.type==="donation"||d.type==="donate"||d.template==="donation"?"donate-card-desc":"",w.textContent=C,f.appendChild(w)}const _railBtnUrl=(d.buttonUrl||"").trim();if(_railBtnUrl&&_railBtnUrl!=="#"){const w=document.createElement("a");w.className=`rail-button ${(d.theme==="maroon"||d.type==="donation"||d.type==="donate"||d.template==="donation")?"light":""}`.trim(),w.href=_railBtnUrl,w.textContent=M||"ดูรายละเอียด",d.openExternal&&(w.target="_blank",w.rel="noopener"),f.appendChild(w)}e.appendChild(f)})}}function ar(e){L.editingRailCard=e;const t=i("#railCardDialog");if(!t)return;const n=i("#railCardDialogTitle"),o=e==="new";n&&(n.textContent=o?"เพิ่มหัวข้อใหม่":"จัดการหัวข้อนี้"),z(".rail-lang-tab").forEach(l=>l.classList.toggle("active",l.dataset.railTab==="th")),i("#railPaneTh").hidden=!1,i("#railPaneTh").classList.add("active"),i("#railPaneLo").hidden=!0,i("#railPaneLo").classList.remove("active"),i("#railPaneEn").hidden=!0,i("#railPaneEn").classList.remove("active");const a=Ue(),r=o?null:a.find(l=>l.id===e)||ot.find(l=>l.id===e)||null;i("#railCardId").value=o?"new":(r==null?void 0:r.id)||e,i("#railCardOrder").value=o?(a.length+1)*10:(r==null?void 0:r.order)||10,i("#railCardOrderDisplay").textContent=`ลำดับที่ ${o?a.length+1:Math.max(1,a.findIndex(l=>l.id===e)+1)}`,i("#railCardTemplateSelect").value=(r==null?void 0:r.template)||(r==null?void 0:r.type)||"custom",i("#railCardVisualTheme").value=(r==null?void 0:r.theme)||"standard",i("#railCardKickerTh").value=(r==null?void 0:r.kicker)||"",i("#railCardKickerLo").value=(r==null?void 0:r.kicker_lo)||"",i("#railCardKickerEn").value=(r==null?void 0:r.kicker_en)||"",i("#railCardTitleTh").value=(r==null?void 0:r.title)||"",i("#railCardTitleLo").value=(r==null?void 0:r.title_lo)||"",i("#railCardTitleEn").value=(r==null?void 0:r.title_en)||"",i("#railCardDescTh").value=(r==null?void 0:r.description)||"",i("#railCardDescLo").value=(r==null?void 0:r.description_lo)||"",i("#railCardDescEn").value=(r==null?void 0:r.description_en)||"",i("#railCardBtnTh").value=(r==null?void 0:r.buttonText)||"",i("#railCardBtnLo").value=(r==null?void 0:r.buttonText_lo)||"",i("#railCardBtnEn").value=(r==null?void 0:r.buttonText_en)||"",["KickerLo","KickerEn","TitleLo","TitleEn","DescLo","DescEn","BtnLo","BtnEn"].forEach(l=>{const m=i(`#railCard${l}`);m&&(o||!m.value?delete m.dataset.customized:m.dataset.customized="true")});const s=i("#railTranslateStatus");s&&(s.hidden=!0),i("#railCardIcon").value=(r==null?void 0:r.icon)||"✦",i("#railCardImageUrl").value=(r==null?void 0:r.imageUrl)||(r==null?void 0:r.mediaUrl)||"";const _rcf=i("#railCardFile");_rcf&&(_rcf.value="");i("#railCardButtonUrl").value=(r==null?void 0:r.buttonUrl)||"",window.syncAdminUrlLinkBtn&&window.syncAdminUrlLinkBtn(i("#railCardButtonUrl"),i("#railCardGoLinkBtn")),i("#railCardOpenExternal").value=r!=null&&r.openExternal?"true":"false",i("#railCardProjectScope").value=(r==null?void 0:r.projectScope)||(_isMuchalindaActiveMode()?"muchalinda-restoration":"all"),i("#railCardPublished").checked=r?r.published!==!1:!0;const u=!!(r!=null&&r.scheduled);i("#railCardScheduled").checked=u,i("#railScheduleFields").hidden=!u,i("#railCardStartDate").value=(r==null?void 0:r.startDate)||"",i("#railCardEndDate").value=(r==null?void 0:r.endDate)||"",i("#railCardDeleteBtn").hidden=o,i("#railEditorStatus").hidden=!0,t.open&&t.close(),t.showModal()}function La(e){const t=na[e];t&&(i("#railCardVisualTheme").value=t.theme,i("#railCardKickerTh").value=t.kicker,i("#railCardKickerLo").value=t.kicker_lo,i("#railCardKickerEn").value=t.kicker_en,i("#railCardTitleTh").value=t.title,i("#railCardTitleLo").value=t.title_lo,i("#railCardTitleEn").value=t.title_en,i("#railCardDescTh").value=t.description,i("#railCardDescLo").value=t.description_lo,i("#railCardDescEn").value=t.description_en,i("#railCardIcon").value=t.icon,i("#railCardBtnTh").value=t.buttonText,i("#railCardBtnLo").value=t.buttonText_lo,i("#railCardBtnEn").value=t.buttonText_en,i("#railCardButtonUrl").value=t.buttonUrl,window.syncAdminUrlLinkBtn&&window.syncAdminUrlLinkBtn(i("#railCardButtonUrl"),i("#railCardGoLinkBtn")))}async function Sa(e){var l,m,h,d,f,k,E,v,T,C,M,q,N,w,R,P;if(e.preventDefault(),!D())return;const t=i("#railEditorStatus"),n=i("#saveRailCardButton");if(!L.user){t.textContent="กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลก่อนบันทึกข้อมูล",t.hidden=!1;return}const o=i("#railCardId").value,a=i("#railCardTitleTh").value.trim(),r=i("#railCardDescTh").value.trim(),s=i("#railCardKickerTh").value.trim(),u=i("#railCardBtnTh").value.trim();if(!a){t.textContent="กรุณากรอกชื่อหัวข้อภาษาไทย",t.hidden=!1;return}n.disabled=!0,t.textContent="กำลังตรวจสอบและบันทึกข้อมูล...",t.hidden=!1;try{let S=i("#railCardTitleLo").value.trim(),O=i("#railCardTitleEn").value.trim(),$=i("#railCardKickerLo").value.trim(),W=i("#railCardKickerEn").value.trim(),y=i("#railCardDescLo").value.trim(),g=i("#railCardDescEn").value.trim(),b=i("#railCardBtnLo").value.trim(),x=i("#railCardBtnEn").value.trim();try{!S&&a&&(S=await ne(a)),!O&&a&&(O=await re(a)),!y&&r&&(y=await ne(r)),!g&&r&&(g=await re(r)),!$&&s&&($=await ne(s)),!W&&s&&(W=await re(s)),!b&&u&&(b=await ne(u)),!x&&u&&(x=await re(u))}catch(G){console.warn("Auto translation skipped:",G)}let savedRailMediaUrl=((v=(E=i("#railCardImageUrl"))==null?void 0:E.value)==null?void 0:v.trim())||"";const _railFile=(i("#railCardFile")||{}).files&&i("#railCardFile").files[0];if(_railFile){const _fname=_railFile.name.replace(/[^a-zA-Z0-9._-]/g,"_")||"media";const _isVid=_railFile.type.startsWith("video/")||/\.(mp4|webm)$/i.test(_fname);let _uploadRailFile=_railFile;if(_isVid){if(_railFile.size>100*1024*1024)throw new Error("ไฟล์วิดีโอมีขนาดเกิน 100 MB");}else{t.textContent="กำลังบีบอัดรูปภาพเป็น WebP...";_uploadRailFile=await compressImageToWebp(_railFile);}t.textContent="กำลังอัปโหลดไฟล์สื่อ...";let _targetRailDocRef=o!=="new"?j(le,o):j(le);let _railCardDocId=_targetRailDocRef.id;const _rext=_isVid?(_uploadRailFile.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g,"")||"mp4"):"webp";const _fpath=`projects/${oe}/media/${L.user.uid}/rail_${_railCardDocId}.${_rext}`;const _upRes=await Ot(ce(yt,_fpath),_uploadRailFile,{contentType:_uploadRailFile.type});savedRailMediaUrl=await zt(_upRes.ref);}const _=((l=i("#railCardTemplateSelect"))==null?void 0:l.value)||"custom",F={type:_,template:_,title:a,title_lo:S||"",title_en:O||"",kicker:s||"",kicker_lo:$||"",kicker_en:W||"",description:r,description_lo:y||"",description_en:g||"",buttonText:u||"ดูรายละเอียด",buttonText_lo:b||"",buttonText_en:x||"",buttonUrl:((h=(m=i("#railCardButtonUrl"))==null?void 0:m.value)==null?void 0:h.trim())||"",openExternal:((d=i("#railCardOpenExternal"))==null?void 0:d.value)==="true",icon:((k=(f=i("#railCardIcon"))==null?void 0:f.value)==null?void 0:k.trim())||"✦",imageUrl:H(savedRailMediaUrl),mediaUrl:H(savedRailMediaUrl),theme:((T=i("#railCardVisualTheme"))==null?void 0:T.value)||"standard",projectScope:((C=i("#railCardProjectScope"))==null?void 0:C.value)||"all",published:!!((M=i("#railCardPublished"))!=null&&M.checked),scheduled:!!((q=i("#railCardScheduled"))!=null&&q.checked),startDate:((N=i("#railCardStartDate"))==null?void 0:N.value)||"",endDate:((w=i("#railCardEndDate"))==null?void 0:w.value)||"",order:Number((R=i("#railCardOrder"))==null?void 0:R.value)||10,updatedAt:I(),deletedAt:null};if(o!=="new"){const _oldCard=Ue().find(cd=>cd.id===o)||ot.find(cd=>cd.id===o);const _oldUrl=_oldCard==null?void 0:(_oldCard.mediaUrl||_oldCard.imageUrl);if(_oldUrl&&typeof _oldUrl==="string"&&_oldUrl.includes("firebasestorage.googleapis.com")&&_oldUrl!==savedRailMediaUrl&&savedRailMediaUrl){const _oldP=decodeURIComponent((_oldUrl.split("/o/")[1]||"").split("?")[0]);_oldP&&await De(ce(yt,_oldP)).catch(()=>{});}};const _saveRailRef=(typeof _targetRailDocRef!=="undefined"&&_targetRailDocRef)?_targetRailDocRef:(o!=="new"?j(le,o):j(le));o==="new"?(F.createdAt=I(),F.createdBy=((P=L.user)==null?void 0:P.uid)||"admin",await V(_saveRailRef,F),B("เพิ่มหัวข้อใหม่เรียบร้อยแล้ว")):(await V(j(le,o),F,{merge:!0}),B("บันทึกข้อมูลหัวข้อเรียบร้อยแล้ว")),i("#railCardDialog").close()}catch(S){console.error("Save rail card error:",S);const O=(S==null?void 0:S.code)==="permission-denied"||(S==null?void 0:S.code)==="storage/unauthorized";t.textContent=O?"ไม่มีสิทธิ์บันทึกข้อมูลหรืออัปโหลดไฟล์ กรุณาตรวจสอบสถานะผู้ดูแลระบบ":(S==null?void 0:S.message)||"เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง",t.hidden=!1}finally{n.disabled=!1}}function Da(){if(!D())return;const e=i("#railCardId").value;if(!e||e==="new")return;const n=Ue().find(a=>a.id===e)||ot.find(a=>a.id===e),o=(n==null?void 0:n.title)||"หัวข้อนี้";_t("ยืนยันการย้ายไปถังพัก",`ต้องการย้าย “${o}” ไปยังถังพักหรือไม่? (รายการจะไม่แสดงบนหน้าเว็บ แต่ท่านสามารถเปิดดูและกู้คืนได้ทุกเมื่อจากปุ่มถังพัก)`,async()=>{try{const a={...n||{},id:e,order:Number(n==null?void 0:n.order)||10,deletedAt:I(),published:!1,updatedAt:I()};await V(j(le,e),a,{merge:!0}),i("#railCardDialog").close(),B(`ย้าย “${o}” ไปยังถังพักเรียบร้อยแล้ว`)}catch(a){console.error("Trash rail card error:",a),B("ไม่สามารถย้ายไปยังถังพักได้","error")}},"ย้ายไปถังพัก")}function fn(){if(!D())return;const e=i("#railTrashDialog"),t=i("#railTrashList");if(!e||!t)return;const o=Ue().filter(a=>!!a.deletedAt);t.innerHTML="",o.length===0?t.innerHTML='<p class="resource-empty">ไม่มีรายการในถังพัก</p>':o.forEach(a=>{const r=document.createElement("div");r.className="rail-trash-row",r.innerHTML=`
        <div class="rail-trash-meta">
          <strong>${nr(a.title||"ไม่มีชื่อหัวข้อ")}</strong>
          <span>ย้ายเมื่อ: ${_e(a.deletedAt)||"เมื่อสักครู่"}</span>
        </div>
        <button type="button" class="button secondary small rail-restore-btn">กู้คืน</button>
        <button type="button" class="button danger small rail-perm-btn">ลบถาวร</button>
      `,r.querySelector(".rail-restore-btn").addEventListener("click",()=>Na(a.id)),r.querySelector(".rail-perm-btn").addEventListener("click",()=>Aa(a.id,a.title)),t.appendChild(r)}),e.open&&e.close(),e.showModal()}async function Na(e){if(D())try{const t=ot.find(a=>a.id===e),n=(L.railCards||[]).find(a=>a.id===e),o={...t||{},...n||{},deletedAt:null,published:!0,updatedAt:I()};await V(j(le,e),o,{merge:!0}),B("กู้คืนหัวข้อเรียบร้อยแล้ว"),fn()}catch(t){console.error("Restore rail card error:",t),B("กู้คืนรายการไม่สำเร็จ","error")}}function Aa(e,t){if(!D())return;const card=ot.find(x=>x.id===e)||(L.railCards||[]).find(x=>x.id===e);_t("ยืนยันการลบถาวร",`ต้องการลบหัวข้อ “${t||"หัวข้อนี้"}” และรูปภาพสื่อทั้งหมดอย่างถาวรใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้อีก`,async()=>{try{if(card){const pths=[card.storagePath,card.imageUrl&&card.imageUrl.includes("firebasestorage.googleapis.com")?decodeURIComponent((card.imageUrl.split("/o/")[1]||"").split("?")[0]):""].filter(Boolean);if(pths.length)await _deleteStoragePaths(pths);}await dt(j(le,e)),B("ลบหัวข้อและรูปภาพสื่อทั้งหมดอย่างถาวรแล้ว"),fn()}catch(n){console.error("Perm delete rail card error:",n),B("ลบรายการไม่สำเร็จ","error")}},"ลบถาวร")}async function _a(e,t){if(!D())return;const n=Ue(),o=n.findIndex(s=>s.id===e),a=n.findIndex(s=>s.id===t);if(o===-1||a===-1||o===a)return;const[r]=n.splice(o,1);n.splice(a,0,r);for(let s=0;s<n.length;s++){const u=n[s],l=(s+1)*10;u.order=l,await V(j(le,u.id),{...u,order:l,updatedAt:I()},{merge:!0})}B("จัดเรียงลำดับหัวข้อเรียบร้อยแล้ว")}async function An(e){if(!D())return;const t=i("#railCardId").value;if(!t||t==="new")return;const n=Ue(),o=n.findIndex(m=>m.id===t);if(o===-1)return;const a=e==="up"?o-1:o+1;if(a<0||a>=n.length){B(e==="up"?"อยู่อันดับแรกแล้ว":"อยู่อันดับสุดท้ายแล้ว");return}const r=n[o],s=n[a],u=r.order||(o+1)*10,l=s.order||(a+1)*10;r.order=l,s.order=u,await V(j(le,r.id),{...r,order:l,updatedAt:I()},{merge:!0}),await V(j(le,s.id),{...s,order:u,updatedAt:I()},{merge:!0}),i("#railCardOrder").value=l,i("#railCardOrderDisplay").textContent=`ลำดับที่ ${a+1}`,B("ปรับลำดับหัวข้อเรียบร้อยแล้ว")}const _MUCHALINDA_DEFAULT_SIDEBAR_ITEMS = [
  {
    id: "default-mucha-nav",
    title: "สารบัญโครงการ",
    title_lo: "ສາຣະບານໂຄງການ",
    title_en: "Project Overview",
    description: "ภาพรวมและสารบัญโครงการสระมุจลินท์",
    description_lo: "ພາບລວມ ແລະສາຣະບານໂຄງການ",
    description_en: "Muchalinda Project overview & directory",
    icon: "💧",
    url: "#muchalinda-project",
    theme: "maroon",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 10,
    fallback: true
  },
  {
    id: "default-mucha-history",
    title: "ความเป็นมาสระมุจลินท์",
    title_lo: "ຄວາມເປັນມາ",
    title_en: "Sacred Pond History",
    description: "สระพังทอง แหล่งน้ำศักดิ์สิทธิ์พันปี",
    description_lo: "ສະພັງທອງ ແຫຼ່ງນ້ຳສັກສິດພັນປີ",
    description_en: "Thousand-year Sacred Water Heritage",
    icon: "🏛",
    url: "#muchalinda-history",
    theme: "gold",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 20,
    fallback: true
  },
  {
    id: "default-mucha-objectives",
    title: "เป้าหมายและแผนบูรณะ",
    title_lo: "ເປົ້າໝາຍ ແລະແຜນງານ",
    title_en: "Goals & Roadmap",
    description: "แผนการบูรณะและพัฒนาภูมิทัศน์อย่างยั่งยืน",
    description_lo: "ແຜນການບູຣະນະ ແລະພັດທະນາພູມິທັດ",
    description_en: "Sustainable Restoration and Landscape Roadmap",
    icon: "📜",
    url: "#muchalinda-objectives",
    theme: "standard",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 30,
    fallback: true
  },
  {
    id: "default-mucha-donate-link",
    title: "ร่วมบุญบูรณะสระพังทอง",
    title_lo: "ຮ່ວມບຸນບູຣະນະ",
    title_en: "Support Restoration",
    description: "ร่วมเป็นเจ้าภาพสมทบทุนกองทุนสระมุจลินท์",
    description_lo: "ຮ່ວມເປັນເຈົ້າພາບສົມທົບທຶນ",
    description_en: "Participate in the conservation merit fund",
    icon: "♥",
    url: "#muchalinda-donate",
    theme: "gold",
    projectScope: "muchalinda-restoration",
    published: true,
    order: 40,
    fallback: true
  }
];

const _WORLD_HERITAGE_DEFAULT_SIDEBAR_ITEMS = [
  {
    id: "default-sb-nav",
    title: "สารบัญและทางลัด",
    title_lo: "ສາຣະບານ ແລະທາງລັດ",
    title_en: "Navigation & Shortcuts",
    description: "ทางลัดเข้าถึงส่วนต่างๆ ของเว็บไซต์",
    description_lo: "ທາງລັດເຂົ້າເຖິງພາກສ່ວນຕ່າງໆ",
    description_en: "Quick links to main sections",
    icon: "✦",
    url: "#history",
    theme: "standard",
    projectScope: "world-heritage",
    published: true,
    order: 10,
    fallback: true
  },
  {
    id: "default-sb-history",
    title: "ประวัติความเป็นมา",
    title_lo: "ປະຫວັດຄວາມເປັນມາ",
    title_en: "Historical Background",
    description: "มรดกสองฝั่งโขง อารยธรรมฟากฟ้า",
    description_lo: "ມໍລະດົກສອງຝັ່ງຂອງ",
    description_en: "Heritage of the Mekong Basin",
    icon: "🏛",
    url: "#history",
    theme: "gold",
    projectScope: "world-heritage",
    published: true,
    order: 20,
    fallback: true
  },
  {
    id: "default-sb-unesco",
    title: "สู่มรดกโลกยูเนสโก",
    title_lo: "ສູ່ມໍລະດົກໂລກຢູເນສໂກ",
    title_en: "UNESCO World Heritage",
    description: "เกณฑ์ความโดดเด่นสากล (OUV)",
    description_lo: "ເກນຄວາມໂດດເດັ່ນສາກົນ (OUV)",
    description_en: "Outstanding Universal Value",
    icon: "📜",
    url: "#world-heritage",
    theme: "gold",
    projectScope: "world-heritage",
    published: true,
    order: 30,
    fallback: true
  }
];

function je(){
  const isMucha = _isMuchalindaActiveMode();
  const rawItems = (L.sidebarItems || []);
  if (isMucha) {
    const muchaItems = rawItems.filter(item => item.projectScope === "muchalinda-restoration" || item.projectScope === "muchalinda");
    const merged = [];
    const handledIds = new Set();
    _MUCHALINDA_DEFAULT_SIDEBAR_ITEMS.forEach(def => {
      const customMatch = muchaItems.find(item => item.id === def.id || (item.url && item.url.trim() === def.url.trim()));
      if (customMatch) {
        handledIds.add(customMatch.id);
        merged.push({ ...def, ...customMatch, title: customMatch.title || def.title, description: customMatch.description || def.description });
      } else {
        merged.push(def);
      }
    });
    muchaItems.forEach(item => {
      if (!handledIds.has(item.id)) {
        merged.push(item);
      }
    });
    return merged.sort((e,t)=>(Number(e.order)||0)-(Number(t.order)||0));
  }
  // World heritage items
  const mainItems = rawItems.filter(item => item.projectScope !== "muchalinda-restoration" && item.projectScope !== "muchalinda");
  const mergedMain = [];
  const handledMainIds = new Set();
  _WORLD_HERITAGE_DEFAULT_SIDEBAR_ITEMS.forEach(def => {
    const customMatch = mainItems.find(item => item.id === def.id || (item.url && item.url.trim() === def.url.trim()));
    if (customMatch) {
      handledMainIds.add(customMatch.id);
      mergedMain.push({ ...def, ...customMatch, title: customMatch.title || def.title, description: customMatch.description || def.description });
    } else {
      mergedMain.push(def);
    }
  });
  mainItems.forEach(item => {
    if (!handledMainIds.has(item.id)) {
      mergedMain.push(item);
    }
  });
  return mergedMain.sort((e,t)=>(Number(e.order)||0)-(Number(t.order)||0));
}
function Ma(e){var n;const t=ra[e];t&&(i("#sidebarItemVisualTheme")&&(i("#sidebarItemVisualTheme").value=t.theme||"standard"),i("#sidebarItemTitleTh")&&(i("#sidebarItemTitleTh").value=t.title||""),i("#sidebarItemTitleLo")&&(i("#sidebarItemTitleLo").value=t.title_lo||""),i("#sidebarItemTitleEn")&&(i("#sidebarItemTitleEn").value=t.title_en||""),i("#sidebarItemDescTh")&&(i("#sidebarItemDescTh").value=t.description||""),i("#sidebarItemDescLo")&&(i("#sidebarItemDescLo").value=t.description_lo||""),i("#sidebarItemDescEn")&&(i("#sidebarItemDescEn").value=t.description_en||""),i("#sidebarItemIcon")&&(i("#sidebarItemIcon").value=t.icon||"📌"),i("#sidebarItemUrl")&&(i("#sidebarItemUrl").value=t.url||""),i("#sidebarItemOpenExternal")&&(i("#sidebarItemOpenExternal").value=(n=t.url)!=null&&n.startsWith("http")?"true":"false"),st(t.icon||"📌"))}function st(e){const t=i("#sidebarItemIconPreview");if(!t)return;const n=String(e||"").toLowerCase().trim(),o=Le[n];if(o){t.className=`sidebar-item-icon ${o.className}`,t.innerHTML=o.svg,t.style.color="#fff",t.style.fontSize="";const a=t.querySelector("svg");a&&(a.style.width="20px",a.style.height="20px")}else t.className="sidebar-item-icon",t.innerHTML="",t.textContent=e||"📌",t.style.color="var(--gold)",t.style.fontSize="1.3rem";z("#sidebarIconChips .rail-chip").forEach(a=>{a.classList.toggle("active",a.dataset.icon===n||a.dataset.icon===e)})}const ue={phone:{name:"โทรศัพท์",placeholder:"วางเบอร์โทรศัพท์ เช่น tel:042-xxx-xxx หรือ 042-xxx-xxx"},facebook:{name:"เฟซบุ๊ก",placeholder:"วางลิงก์เฟซบุ๊ก เช่น https://facebook.com/..."},line:{name:"ไลน์",placeholder:"วางลิงก์ไลน์ เช่น https://line.me/... หรือ https://lin.ee/..."},tiktok:{name:"ติ๊กต็อก",placeholder:"วางลิงก์ติ๊กต็อก เช่น https://www.tiktok.com/@..."},instagram:{name:"อินสตาแกรม",placeholder:"วางลิงก์อินสตาแกรม เช่น https://instagram.com/..."},youtube:{name:"ยูทูบ",placeholder:"วางลิงก์ยูทูบ เช่น https://youtube.com/..."},link:{name:"เว็บไซต์",placeholder:"วางลิงก์เว็บไซต์ เช่น https://..."}};function lt(e="facebook",t=""){const n=document.createElement("div");n.className="social-link-row",n.style.display="flex",n.style.gap="8px",n.style.alignItems="center",n.style.marginBottom="8px";const o=document.createElement("span");o.className="sidebar-item-icon",o.style.width="36px",o.style.height="36px",o.style.borderRadius="8px",o.style.flexShrink="0",o.style.boxShadow="0 2px 5px rgba(0,0,0,0.12)";function a(h){const d=String(h||"facebook").toLowerCase().trim(),f=Le[d];if(f){o.className=`sidebar-item-icon ${f.className}`,o.innerHTML=f.svg,o.style.color="#fff",o.style.fontSize="";const k=o.querySelector("svg");k&&(k.style.width="20px",k.style.height="20px")}else o.className="sidebar-item-icon",o.innerHTML="",o.textContent=h||"🔗",o.style.color="var(--gold)",o.style.fontSize="1.2rem"}a(e);const r=document.createElement("select");r.className="social-icon-select",r.style.padding="9px 12px",r.style.border="1px solid rgba(23,19,41,.18)",r.style.borderRadius="4px",r.style.background="#fff",r.style.flex="0 0 140px",[{value:"phone",text:"📞 เบอร์โทรศัพท์"},{value:"facebook",text:"เฟซบุ๊ก"},{value:"line",text:"ไลน์"},{value:"tiktok",text:"ติ๊กต็อก"},{value:"instagram",text:"อินสตาแกรม"},{value:"youtube",text:"ยูทูบ"},{value:"link",text:"เว็บไซต์ทั่วไป"}].forEach(h=>{const d=document.createElement("option");d.value=h.value,d.textContent=h.text,h.value===e&&(d.selected=!0),r.appendChild(d)});const u=document.createElement("input");u.type="url",u.className="social-url-input";const l=ue[e]||ue.facebook;u.placeholder=l.placeholder,u.value=t,u.style.flex="1",u.style.padding="9px 12px",u.style.border="1px solid rgba(23,19,41,.18)",u.style.borderRadius="4px",r.addEventListener("change",()=>{a(r.value);const h=ue[r.value]||ue.link;u.placeholder=h.placeholder}),u.addEventListener("input",()=>{var d,f;const h=String(((d=i("#sidebarItemIcon"))==null?void 0:d.value)||"").toLowerCase().trim();(r.value===h||!((f=i("#sidebarItemUrl"))!=null&&f.value))&&i("#sidebarItemUrl")&&(i("#sidebarItemUrl").value=u.value)});const m=document.createElement("button");return m.type="button",m.className="button danger",m.textContent="ลบ",m.style.padding="9px 14px",m.onclick=()=>n.remove(),n.appendChild(o),n.appendChild(r),n.appendChild(u),n.appendChild(m),n}function Xt(e){var u;const t=String(e||"").toLowerCase().trim();if(!ue[t])return;const n=ue[t],o=i("#sidebarItemUrlLabel");o&&o.childNodes&&o.childNodes[0]&&(o.childNodes[0].textContent=`ลิงก์${n.name} (URL) `);const a=i("#sidebarItemUrl");a&&(a.placeholder=n.placeholder);const r=i("#sidebarItemOpenExternal");r&&(r.value="true");const s=i("#sidebarSocialLinksWrapper");if(s){let l=null;s.querySelectorAll(".social-link-row").forEach(d=>{const f=d.querySelector(".social-icon-select");f&&f.value===t&&(l=d)}),l||(l=lt(t,((u=a==null?void 0:a.value)==null?void 0:u.trim())||""),s.appendChild(l));const h=l.querySelector(".social-url-input");h&&(h.focus(),h.style.transition="box-shadow 0.3s, border-color 0.3s",h.style.borderColor="var(--gold)",h.style.boxShadow="0 0 0 3px rgba(203,166,75,0.35)",setTimeout(()=>{h.style.borderColor="",h.style.boxShadow=""},1400))}}function gn(e=""){const t=document.createElement("div");t.className="image-url-row",t.style.display="flex",t.style.gap="8px",t.style.alignItems="center",t.style.marginBottom="8px";const n=document.createElement("img");n.style.width="40px",n.style.height="40px",n.style.objectFit="cover",n.style.borderRadius="4px",n.style.border="1px solid rgba(23,19,41,.15)",n.style.background="#f4f4f5",n.style.flexShrink="0";const o=(e||"").trim();n.style.display=o?"block":"none",o&&(n.src=o),n.onerror=()=>{n.style.display="none"};const a=document.createElement("input");a.type="url",a.className="sidebar-image-url-input",a.placeholder="วางลิงก์รูปภาพประกอบ (https://...)",a.value=o,a.style.flex="1",a.style.padding="9px 12px",a.style.border="1px solid rgba(23,19,41,.18)",a.style.borderRadius="4px",a.addEventListener("input",()=>{const s=a.value.trim();s?(n.src=s,n.style.display="block"):n.style.display="none"});const r=document.createElement("button");return r.type="button",r.className="button danger",r.textContent="ลบ",r.style.padding="9px 14px",r.onclick=()=>t.remove(),t.appendChild(n),t.appendChild(a),t.appendChild(r),t}function Ba(){const e=i("#addSidebarSocialLinkBtn");e&&!e.dataset.bound&&(e.dataset.bound="true",e.addEventListener("click",()=>{var a;const o=i("#sidebarSocialLinksWrapper");if(o){const r=lt();o.appendChild(r),(a=r.querySelector(".social-url-input"))==null||a.focus()}})),z("#sidebarSocialQuickChips button").forEach(o=>{o.dataset.bound||(o.dataset.bound="true",o.addEventListener("click",()=>{const a=o.dataset.social;a&&(i("#sidebarItemIcon").value=a,st(a),Xt(a))}))});const t=i("#sidebarItemUrl");t&&!t.dataset.bound&&(t.dataset.bound="true",t.addEventListener("input",o=>{var s;const a=o.target.value.trim(),r=String(((s=i("#sidebarItemIcon"))==null?void 0:s.value)||"").toLowerCase().trim();if(ue[r]){const u=Array.from(z("#sidebarSocialLinksWrapper .social-link-row")).find(l=>{var m;return((m=l.querySelector(".social-icon-select"))==null?void 0:m.value)===r});if(u){const l=u.querySelector(".social-url-input");l&&l.value!==a&&(l.value=a)}}}));const n=i("#addSidebarImageUrlBtn");n&&!n.dataset.bound&&(n.dataset.bound="true",n.addEventListener("click",()=>{const o=i("#sidebarImageUrlsWrapper");o&&o.appendChild(gn())}))}function Be(){const e=i("#sidebarItemsContainer");if(!e)return;const t=document.documentElement.lang||"th",o=_isMuchalindaActiveMode()?"muchalinda-restoration":"world-heritage",a=je(),r=a.filter(d=>!!d.deletedAt),s=i("#sidebarTrashCount");s&&(s.textContent=String(r.length));const u=i("#sidebarAdminToolbar");u&&(u.hidden=!D());const l=new Date,m=a.filter(d=>!d.deletedAt).filter(d=>D()?!0:!(d.published===!1||d.projectScope&&d.projectScope!=="all"&&d.projectScope!==o||d.scheduled&&(d.startDate&&new Date(d.startDate)>l||d.endDate&&new Date(d.endDate)<l))),h=`${t}|${D()}|${o}|`+m.map(d=>{var f;return[d.id,d.order,((f=d.updatedAt)==null?void 0:f.seconds)||d.updatedAt||"",d.titleTh||d.title||"",d.descTh||d.description||"",d.theme||"",d.icon||"",d.published].join(":")}).join(";");if(!(e.dataset.renderedSig===h&&e.children.length>0)){if(e.dataset.renderedSig=h,e.innerHTML="",m.length===0){D()&&(e.innerHTML='<p class="resource-empty" style="padding:20px 8px;text-align:center;color:#8f899b;border:1px dashed rgba(255,255,255,0.2);border-radius:8px;font-size:0.85rem;margin:10px 0;">ยังไม่มีหัวข้อแถบซ้าย กด “เพิ่มหัวข้อใหม่” ด้านล่างเพื่อเริ่มสร้าง</p>');return}m.forEach(d=>{const f=(d.url||"").trim(),k=!!(f&&f!=="#"),E=document.createElement("div"),v=d.theme&&d.theme!=="standard"?`theme-${d.theme}`:"";E.className=`sidebar-item ${v}`.trim(),E.style.display="flex",E.style.flexDirection="column",E.style.gap="6px",E.style.width="100%",E.style.padding="16px 8px",E.style.borderBottom="1px solid rgba(255,255,255,0.06)",E.style.color="#fff",E.style.textAlign="left",E.style.transition="background 0.2s",k&&(E.style.cursor="pointer",E.onmouseenter=()=>E.style.background="rgba(255,255,255,0.06)",E.onmouseleave=()=>E.style.background="transparent",E.onclick=y=>{y.target.closest(".sidebar-item-gear")||y.target.closest(".social-mini-link")||(d.openExternal?window.open(f,"_blank"):window.location.href=f)}),E.dataset.sidebarId=d.id,D()&&(E.classList.add("is-admin-draggable"),E.setAttribute("draggable","true"),E.addEventListener("dragstart",y=>{y.dataTransfer.setData("text/plain",d.id),E.style.opacity="0.4"}),E.addEventListener("dragend",()=>{E.style.opacity="1",document.querySelectorAll(".sidebar-item").forEach(y=>y.style.borderTop="")}),E.addEventListener("dragover",y=>{y.preventDefault(),E.style.borderTop="2px solid var(--gold)"}),E.addEventListener("dragleave",()=>{E.style.borderTop=""}),E.addEventListener("drop",y=>{y.preventDefault(),E.style.borderTop="";const g=y.dataTransfer.getData("text/plain");g&&g!==d.id&&$a(g,d.id)}));const T=document.createElement("div");T.style.display="flex",T.style.alignItems="flex-start",T.style.gap="12px",T.style.width="100%";const C=document.createElement("span"),M=String(d.icon||"").toLowerCase().trim(),q=Le[M];if(q){C.className=`sidebar-item-icon ${q.className}`,C.innerHTML=q.svg,C.style.flex="0 0 32px",C.style.width="32px",C.style.height="32px",C.style.borderRadius="8px",C.style.display="grid",C.style.placeItems="center",C.style.marginTop="2px",C.style.boxShadow="0 2px 6px rgba(0,0,0,0.25)";const y=C.querySelector("svg");y&&(y.style.width="18px",y.style.height="18px")}else C.className="sidebar-item-icon",C.textContent=d.icon||"📌",C.style.flex="0 0 32px",C.style.width="32px",C.style.height="32px",C.style.display="flex",C.style.alignItems="center",C.style.justifyContent="center",C.style.color="var(--gold)",C.style.fontSize="1.4rem",C.style.marginTop="2px";const N=xe(d,"title",t)||d.title||"ไม่มีชื่อหัวข้อ",w=document.createElement("strong");if(w.className="sidebar-item-title",w.textContent=N,w.style.flex="1 1 auto",w.style.fontSize="1.05rem",w.style.fontWeight="600",w.style.lineHeight="1.4",w.style.whiteSpace="normal",w.style.wordBreak="break-word",T.appendChild(C),T.appendChild(w),D()){const y=document.createElement("button");y.type="button",y.className="sidebar-item-gear icon-button",y.title="จัดการหัวข้อนี้",y.setAttribute("aria-label","จัดการหัวข้อนี้"),y.textContent="⚙",y.style.flex="0 0 38px",y.style.width="38px",y.style.height="38px",y.style.fontSize="1.2rem",y.style.background="transparent",y.style.color="#cba64b",y.style.border="none",y.style.borderRadius="0",y.style.boxShadow="none",y.style.cursor="pointer",y.style.display="grid",y.style.placeItems="center",y.addEventListener("click",g=>{g.preventDefault(),g.stopPropagation(),or(d.id)}),T.appendChild(y)}E.appendChild(T);const R=xe(d,"description",t)||d.description||"";if(R){const y=document.createElement("small");y.className="sidebar-item-desc",y.textContent=R,y.style.display="block",y.style.color="var(--gold-light)",y.style.fontSize="0.85rem",y.style.lineHeight="1.5",y.style.whiteSpace="normal",y.style.wordBreak="break-word",E.appendChild(y)}const _sbMediaUrl=(d.imageUrl||d.mediaUrl||(Array.isArray(d.imageUrls)&&d.imageUrls[0])||"").trim();if(_sbMediaUrl){const _sbMediaElem=renderCardMedia(_sbMediaUrl,N,!0);_sbMediaElem&&E.appendChild(_sbMediaElem)}const O=[],$=new Set;d.socialLinks&&Array.isArray(d.socialLinks)&&d.socialLinks.forEach(y=>{if(y&&y.url&&typeof y.url=="string"&&y.url.trim()){const g=String(y.icon||"facebook").toLowerCase().trim();$.has(g)||(O.push({icon:g,url:y.url.trim()}),$.add(g))}});const W=String(d.icon||"").toLowerCase().trim();if(Le[W]&&f&&!$.has(W)&&(O.unshift({icon:W,url:f}),$.add(W)),O.length>0){const y=document.createElement("div");y.className="sidebar-social-links-row",y.style.display="flex",y.style.flexWrap="wrap",y.style.alignItems="center",y.style.gap="6px",y.style.marginTop="8px",O.forEach(g=>{const b=document.createElement("a");b.href=H(g.url)||"#",b.target="_blank",b.rel="noopener noreferrer";const x=String(g.icon||"facebook").toLowerCase().trim(),_=Le[x];if(_){b.className=`social-mini-link ${_.className}`,b.title=_.name||x,b.innerHTML=_.svg;const F=b.querySelector("svg");F&&(F.style.width="18px",F.style.height="18px")}else b.className="social-mini-link badge-link",b.title="ลิงก์ภายนอก",b.textContent="🔗",b.style.fontSize="14px";b.style.display="inline-flex",b.style.alignItems="center",b.style.justifyContent="center",b.style.width="32px",b.style.height="32px",b.style.borderRadius="8px",b.style.boxShadow="0 2px 5px rgba(0,0,0,0.25)",b.style.transition="transform 0.2s, filter 0.2s, box-shadow 0.2s",b.onmouseenter=()=>{b.style.filter="brightness(1.15)",b.style.transform="translateY(-2px)",b.style.boxShadow="0 4px 10px rgba(0,0,0,0.4)"},b.onmouseleave=()=>{b.style.filter="none",b.style.transform="none",b.style.boxShadow="0 2px 5px rgba(0,0,0,0.25)"},b.addEventListener("click",F=>F.stopPropagation()),y.appendChild(b)}),y.children.length>0&&E.appendChild(y)}if(D()){const y="display:inline-block; align-self:flex-start; padding:4px 8px; border-radius:4px; font-size:0.75rem; margin-top:4px; font-weight:600;";if(d.published===!1){const g=document.createElement("span");g.textContent="ฉบับร่าง ยังไม่เผยแพร่",g.style.cssText=y+"background:rgba(255,255,255,0.1); color:#cfcad7;",E.appendChild(g)}else if(d.scheduled){const g=document.createElement("span"),b=d.startDate&&new Date(d.startDate)>l,x=d.endDate&&new Date(d.endDate)<l;b?(g.textContent=`รอเริ่ม: ${_e(d.startDate)}`,g.style.cssText=y+"background:rgba(255,193,7,0.15); color:#ffd54f;"):x?(g.textContent=`หมดเวลา: ${_e(d.endDate)}`,g.style.cssText=y+"background:rgba(244,67,54,0.15); color:#ef9a9a;"):(g.textContent="กำลังแสดงผลตามเวลา",g.style.cssText=y+"background:rgba(76,175,80,0.15); color:#a5d6a7;"),E.appendChild(g)}}e.appendChild(E)})}}function or(e){if(!D())return;L.editingSidebarItem=e;const t=i("#sidebarItemDialog"),n=i("#sidebarItemForm");if(!t||!n)return;Ba();const o=!e||e==="new",a=i("#sidebarItemDialogTitle");a&&(a.textContent=o?"เพิ่มหัวข้อใหม่ (แถบซ้าย)":"จัดการหัวข้อนี้ (แถบซ้าย)"),z(".sidebar-lang-tab").forEach(v=>v.classList.toggle("active",v.dataset.sidebarTab==="th")),i("#sidebarPaneTh").hidden=!1,i("#sidebarPaneTh").classList.add("active"),i("#sidebarPaneLo").hidden=!0,i("#sidebarPaneLo").classList.remove("active"),i("#sidebarPaneEn").hidden=!0,i("#sidebarPaneEn").classList.remove("active");const r=je().filter(v=>!v.deletedAt),s=o?null:r.find(v=>v.id===e)||(L.sidebarItems||[]).find(v=>v.id===e)||null;i("#sidebarItemId").value=o?"new":(s==null?void 0:s.id)||e,i("#sidebarItemOrder").value=o?(r.length+1)*10:(s==null?void 0:s.order)||10;const u=o?r.length:r.findIndex(v=>v.id===e);i("#sidebarItemOrderDisplay").textContent=`ลำดับที่ ${u+1} จาก ${o?r.length+1:r.length}`,i("#sidebarItemTemplateSelect").value=(s==null?void 0:s.template)||"custom",i("#sidebarItemVisualTheme").value=(s==null?void 0:s.theme)||"standard",i("#sidebarItemTitleTh").value=(s==null?void 0:s.title_th)||(s==null?void 0:s.title)||"",i("#sidebarItemTitleLo").value=(s==null?void 0:s.title_lo)||"",i("#sidebarItemTitleEn").value=(s==null?void 0:s.title_en)||"",i("#sidebarItemDescTh").value=(s==null?void 0:s.description_th)||(s==null?void 0:s.description)||"",i("#sidebarItemDescLo").value=(s==null?void 0:s.description_lo)||"",i("#sidebarItemDescEn").value=(s==null?void 0:s.description_en)||"",["TitleLo","TitleEn","DescLo","DescEn"].forEach(v=>{const T=i(`#sidebarItem${v}`);T&&(o||!T.value?delete T.dataset.customized:T.dataset.customized="true")});const l=i("#sidebarTranslateStatus");l&&(l.hidden=!0);const m=String((s==null?void 0:s.icon)||"📌").toLowerCase().trim();i("#sidebarItemIcon").value=(s==null?void 0:s.icon)||"📌",st(i("#sidebarItemIcon").value),i("#sidebarItemUrl").value=(s==null?void 0:s.url)||"",window.syncAdminUrlLinkBtn&&window.syncAdminUrlLinkBtn(i("#sidebarItemUrl"),i("#sidebarItemGoLinkBtn"));const _smu=i("#sidebarItemMediaUrl");_smu&&(_smu.value=(s==null?void 0:s.imageUrl)||(s==null?void 0:s.mediaUrl)||(Array.isArray(s==null?void 0:s.imageUrls)&&s.imageUrls[0])||"");const _sbf=i("#sidebarItemFile");_sbf&&(_sbf.value="");i("#sidebarItemOpenExternal").value=s!=null&&s.openExternal?"true":"false";const h=i("#sidebarItemUrlLabel"),d=ue[m];d?(h&&h.childNodes&&h.childNodes[0]&&(h.childNodes[0].textContent=`ลิงก์${d.name} (URL) `),i("#sidebarItemUrl")&&(i("#sidebarItemUrl").placeholder=d.placeholder)):(h&&h.childNodes&&h.childNodes[0]&&(h.childNodes[0].textContent="ลิงก์ปลายทาง (URL หรือ #anchor ภายในเว็บ) "),i("#sidebarItemUrl")&&(i("#sidebarItemUrl").placeholder="เช่น #history, #milestones, หรือ https://...")),i("#sidebarItemProjectScope").value=(s==null?void 0:s.projectScope)||(_isMuchalindaActiveMode()?"muchalinda-restoration":"all"),i("#sidebarItemPublished").checked=s?s.published!==!1:!0;const f=!!(s!=null&&s.scheduled);i("#sidebarItemScheduled").checked=f,i("#sidebarScheduleFields").hidden=!f,i("#sidebarItemStartDate").value=(s==null?void 0:s.startDate)||"",i("#sidebarItemEndDate").value=(s==null?void 0:s.endDate)||"",i("#sidebarItemDeleteBtn").hidden=o,i("#sidebarItemMoveUpBtn").disabled=o||u<=0,i("#sidebarItemMoveDownBtn").disabled=o||u>=r.length-1,i("#sidebarItemStatus").hidden=!0;const k=i("#sidebarSocialLinksWrapper");if(k){k.innerHTML="";let v=!1;s!=null&&s.socialLinks&&Array.isArray(s.socialLinks)&&s.socialLinks.length>0&&s.socialLinks.forEach(T=>{T&&(T.url||T.icon)&&(k.appendChild(lt(T.icon||"facebook",T.url||"")),v=!0)}),!v&&d&&(s!=null&&s.url)&&k.appendChild(lt(m,s.url))}const E=i("#sidebarImageUrlsWrapper");if(E){E.innerHTML="";const T=(Array.isArray(s==null?void 0:s.imageUrls)&&s.imageUrls.length>0?s.imageUrls:s!=null&&s.imageUrl?[s.imageUrl]:[]).map(C=>typeof C=="string"?C.trim():"").filter(Boolean);T.length>0&&T.forEach(C=>{E.appendChild(gn(C))})}t.open&&t.close(),t.showModal()}async function Ra(e){var s,u,l,m,h,d,f,k,E,v,T,C,M,q,N,w,R,P,S,O,$,W,y,g,b,x,_,F;if(e.preventDefault(),!D()){B("ต้องเข้าสู่ระบบในฐานะผู้ดูแลระบบเพื่อบันทึกข้อมูล","error");return}const t=i("#saveSidebarItemButton"),n=i("#sidebarItemStatus"),o=i("#sidebarItemId").value;if(!L.user){n.textContent="กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลก่อนบันทึกข้อมูล",n.hidden=!1;return}const a=((u=(s=i("#sidebarItemTitleTh"))==null?void 0:s.value)==null?void 0:u.trim())||"",r=((m=(l=i("#sidebarItemDescTh"))==null?void 0:l.value)==null?void 0:m.trim())||"";if(!a){n.textContent="กรุณากรอกชื่อหัวข้อภาษาไทย",n.hidden=!1;return}try{t.disabled=!0,n.textContent="กำลังตรวจสอบและบันทึกข้อมูล...",n.hidden=!1;let G=((d=(h=i("#sidebarItemTitleLo"))==null?void 0:h.value)==null?void 0:d.trim())||"",$e=((k=(f=i("#sidebarItemTitleEn"))==null?void 0:f.value)==null?void 0:k.trim())||"",Mt=((v=(E=i("#sidebarItemDescLo"))==null?void 0:E.value)==null?void 0:v.trim())||"",Bt=((C=(T=i("#sidebarItemDescEn"))==null?void 0:T.value)==null?void 0:C.trim())||"";try{!G&&a&&(G=await ne(a)),!$e&&a&&($e=await re(a)),!Mt&&r&&(Mt=await ne(r)),!Bt&&r&&(Bt=await re(r))}catch{}const Rt=((q=(M=i("#sidebarItemUrl"))==null?void 0:M.value)==null?void 0:q.trim())||"",Ce=[],Pt=new Set;document.querySelectorAll("#sidebarSocialLinksWrapper .social-link-row").forEach(Oe=>{const ze=Oe.querySelector(".social-icon-select"),He=Oe.querySelector(".social-url-input"),yn=ze?ze.value:"facebook",vn=He?He.value.trim():"";vn&&(Ce.push({icon:yn,url:vn}),Pt.add(yn))});const ht=String(((N=i("#sidebarItemIcon"))==null?void 0:N.value)||"").toLowerCase().trim();Rt&&ue[ht]&&!Pt.has(ht)&&(Ce.unshift({icon:ht,url:Rt}),Pt.add(ht));let ft=Rt;!ft&&Ce.length>0&&(ft=Ce[0].url);let savedSidebarMediaUrl=((i("#sidebarItemMediaUrl")||{}).value||"").trim();const _sidebarFile=(i("#sidebarItemFile")||{}).files&&i("#sidebarItemFile").files[0];if(_sidebarFile){const _fname=_sidebarFile.name.replace(/[^a-zA-Z0-9._-]/g,"_")||"media";const _isVid=_sidebarFile.type.startsWith("video/")||/\.(mp4|webm)$/i.test(_fname);let _uploadSidebarFile=_sidebarFile;if(_isVid){if(_sidebarFile.size>100*1024*1024)throw new Error("ไฟล์วิดีโอมีขนาดเกิน 100 MB");}else{n.textContent="กำลังบีบอัดรูปภาพเป็น WebP...";_uploadSidebarFile=await compressImageToWebp(_sidebarFile);}n.textContent="กำลังอัปโหลดไฟล์สื่อ...";let _targetSidebarDocRef=o!=="new"?j(de,o):j(de);let _sidebarDocId=_targetSidebarDocRef.id;const _sext=_isVid?(_uploadSidebarFile.name.split(".").pop().toLowerCase().replace(/[^a-z0-9]/g,"")||"mp4"):"webp";const _fpath=`projects/${oe}/media/${L.user.uid}/sidebar_${_sidebarDocId}.${_sext}`;const _upRes=await Ot(ce(yt,_fpath),_uploadSidebarFile,{contentType:_uploadSidebarFile.type});savedSidebarMediaUrl=await zt(_upRes.ref);}const Ut=savedSidebarMediaUrl?[savedSidebarMediaUrl]:[];const Fe={template:((w=i("#sidebarItemTemplateSelect"))==null?void 0:w.value)||"custom",theme:((R=i("#sidebarItemVisualTheme"))==null?void 0:R.value)||"standard",title:a,title_th:a,title_lo:G,title_en:$e,description:r,description_th:r,description_lo:Mt,description_en:Bt,url:ft,imageUrls:Ut,imageUrl:savedSidebarMediaUrl,mediaUrl:savedSidebarMediaUrl,socialLinks:Ce,openExternal:!!(((P=i("#sidebarItemOpenExternal"))==null?void 0:P.value)==="true"||Ce.length>0&&ft.startsWith("http")),icon:((O=(S=i("#sidebarItemIcon"))==null?void 0:S.value)==null?void 0:O.trim())||"📌",projectScope:(($=i("#sidebarItemProjectScope"))==null?void 0:$.value)||"all",published:!!((W=i("#sidebarItemPublished"))!=null&&W.checked),scheduled:!!((y=i("#sidebarItemScheduled"))!=null&&y.checked),startDate:((g=i("#sidebarItemStartDate"))==null?void 0:g.value)||"",endDate:((b=i("#sidebarItemEndDate"))==null?void 0:b.value)||"",order:Number((x=i("#sidebarItemOrder"))==null?void 0:x.value)||10,updatedAt:I(),deletedAt:null};if(o!=="new"){const _oldSide=je().find(si=>si.id===o);const _oldUrl=_oldSide==null?void 2:(_oldSide.mediaUrl||_oldSide.imageUrl);if(_oldUrl&&typeof _oldUrl==="string"&&_oldUrl.includes("firebasestorage.googleapis.com")&&_oldUrl!==savedSidebarMediaUrl&&savedSidebarMediaUrl){const _oldP=decodeURIComponent((_oldUrl.split("/o/")[1]||"").split("?")[0]);_oldP&&await De(ce(yt,_oldP)).catch(()=>{});}};const _saveSidebarRef=(typeof _targetSidebarDocRef!=="undefined"&&_targetSidebarDocRef)?_targetSidebarDocRef:(o!=="new"?j(de,o):j(de));o==="new"?(Fe.createdAt=I(),Fe.createdBy=((_=L.user)==null?void 0:_.uid)||"admin",Fe.createdByEmail=((F=L.user)==null?void 0:F.email)||"",await V(_saveSidebarRef,Fe),B("เพิ่มหัวข้อแถบซ้ายเรียบร้อยแล้ว")):(await V(j(de,o),Fe,{merge:!0}),B("บันทึกข้อมูลหัวข้อแถบซ้ายเรียบร้อยแล้ว")),i("#sidebarItemDialog").close()}catch(G){console.error("Save sidebar item error:",G);const $e=(G==null?void 0:G.code)==="permission-denied"||(G==null?void 0:G.code)==="storage/unauthorized";n.textContent=$e?"ไม่มีสิทธิ์บันทึกข้อมูลหรืออัปโหลดไฟล์ กรุณาตรวจสอบสถานะผู้ดูแลระบบ":(G==null?void 0:G.message)||"เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง",n.hidden=!1}finally{t.disabled=!1}}function Pa(){if(!D())return;const e=i("#sidebarItemId").value;if(!e||e==="new")return;const n=je().find(a=>a.id===e),o=(n==null?void 0:n.title)||"หัวข้อนี้";_t("ยืนยันการย้ายไปถังพัก",`ต้องการย้าย “${o}” ไปยังถังพักหรือไม่? (รายการจะไม่แสดงบนหน้าเว็บ แต่ท่านสามารถเปิดดูและกู้คืนได้ทุกเมื่อจากปุ่มถังพัก)`,async()=>{try{const a={...n||{},id:e,order:Number(n==null?void 0:n.order)||10,deletedAt:I(),published:!1,updatedAt:I()};await V(j(de,e),a,{merge:!0}),i("#sidebarItemDialog").close(),B(`ย้าย “${o}” ไปยังถังพักเรียบร้อยแล้ว`)}catch(a){console.error("Trash sidebar item error:",a),B("ไม่สามารถย้ายไปยังถังพักได้","error")}},"ย้ายไปถังพัก")}function bn(){if(!D())return;const e=i("#sidebarTrashDialog"),t=i("#sidebarTrashList");if(!e||!t)return;const o=je().filter(a=>!!a.deletedAt);t.innerHTML="",o.length===0?t.innerHTML='<p class="resource-empty">ไม่มีรายการในถังพัก</p>':o.forEach(a=>{const r=document.createElement("div");r.className="rail-trash-row",r.innerHTML=`
        <div class="rail-trash-meta">
          <strong>${nr(a.title||"ไม่มีชื่อหัวข้อ")}</strong>
          <span>ย้ายเมื่อ: ${_e(a.deletedAt)||"เมื่อสักครู่"}</span>
        </div>
        <button type="button" class="button secondary small sidebar-restore-btn">กู้คืน</button>
        <button type="button" class="button danger small sidebar-perm-btn">ลบถาวร</button>
      `,r.querySelector(".sidebar-restore-btn").addEventListener("click",()=>Ua(a.id)),r.querySelector(".sidebar-perm-btn").addEventListener("click",()=>ja(a.id,a.title)),t.appendChild(r)}),e.open&&e.close(),e.showModal()}async function Ua(e){if(D())try{const n={...(L.sidebarItems||[]).find(o=>o.id===e)||{},deletedAt:null,published:!0,updatedAt:I()};await V(j(de,e),n,{merge:!0}),B("กู้คืนหัวข้อเรียบร้อยแล้ว"),bn()}catch(t){console.error("Restore sidebar item error:",t),B("กู้คืนรายการไม่สำเร็จ","error")}}function ja(e,t){if(!D())return;const item=(L.sidebarItems||[]).find(x=>x.id===e);_t("ยืนยันการลบถาวร",`ต้องการลบหัวข้อ “${t||"หัวข้อนี้"}” และรูปภาพสื่อทั้งหมดอย่างถาวรใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้อีก`,async()=>{try{if(item){const pths=[item.storagePath,item.imageUrl&&item.imageUrl.includes("firebasestorage.googleapis.com")?decodeURIComponent((item.imageUrl.split("/o/")[1]||"").split("?")[0]):""].filter(Boolean);if(pths.length)await _deleteStoragePaths(pths);}await dt(j(de,e)),B("ลบหัวข้อและรูปภาพสื่อทั้งหมดอย่างถาวรแล้ว"),bn()}catch(n){console.error("Perm delete sidebar item error:",n),B("ลบรายการไม่สำเร็จ","error")}},"ลบถาวร")}async function $a(e,t){if(!D())return;const n=je().filter(s=>!s.deletedAt),o=n.findIndex(s=>s.id===e),a=n.findIndex(s=>s.id===t);if(o===-1||a===-1||o===a)return;const[r]=n.splice(o,1);n.splice(a,0,r);for(let s=0;s<n.length;s++){const u=n[s],l=(s+1)*10;u.order=l,await V(j(de,u.id),{...u,order:l,updatedAt:I()},{merge:!0})}B("จัดเรียงลำดับหัวข้อเรียบร้อยแล้ว")}async function _n(e){if(!D())return;const t=i("#sidebarItemId").value;if(!t||t==="new")return;const n=je().filter(m=>!m.deletedAt),o=n.findIndex(m=>m.id===t);if(o===-1)return;const a=e==="up"?o-1:o+1;if(a<0||a>=n.length){B(e==="up"?"อยู่อันดับแรกแล้ว":"อยู่อันดับสุดท้ายแล้ว");return}const r=n[o],s=n[a],u=r.order||(o+1)*10,l=s.order||(a+1)*10;r.order=l,s.order=u,await V(j(de,r.id),{...r,order:l,updatedAt:I()},{merge:!0}),await V(j(de,s.id),{...s,order:u,updatedAt:I()},{merge:!0}),i("#sidebarItemOrder").value=l,i("#sidebarItemOrderDisplay").textContent=`ลำดับที่ ${a+1} จาก ${n.length}`,B("ปรับลำดับหัวข้อเรียบร้อยแล้ว")}function Fa(){var e,t,n,o,a,r,s,u,l,m,h,d,f,k,E,v,T,C,M,q,N,w,R,P,S,O,$,W,y;(e=i("#manageProjectsButton"))==null||e.addEventListener("click",()=>{var g;return(g=i("#treeMenuButton"))==null?void 0:g.click()}),(t=i("#closeSelectedProjectDetail"))==null||t.addEventListener("click",()=>{i("#selectedProjectDetail").hidden=!0}),z('[href="#projects"]').forEach(g=>g.addEventListener("click",()=>{Ae(!1)})),z('.brand[href="#top"], .sidebar-profile[href="#top"]').forEach(g=>g.addEventListener("click",()=>Ae(!1))),z(".support-project-tabs a").forEach(g=>g.addEventListener("click",()=>{z(".support-project-tabs a").forEach(b=>b.classList.toggle("active",b===g))})),z(".portal-manage-button").forEach(g=>g.addEventListener("click",()=>Dn(g.dataset.manageKind))),z("[data-media-filter]").forEach(g=>g.addEventListener("click",()=>{L.mediaFilter=g.dataset.mediaFilter;L.mediaTopicFilter="all";z("[data-media-filter]").forEach(b=>b.classList.toggle("active",b===g));xt()}));const _mTopicSel=document.getElementById("mediaTopicSelect");if(_mTopicSel&&!_mTopicSel._wired){_mTopicSel._wired=true;_mTopicSel.addEventListener("change",(evt)=>{L.mediaTopicFilter=evt.target.value;xt()});}const _mShowChk=document.getElementById("mediaShowCaptionCheckbox");if(_mShowChk&&!_mShowChk._wired){_mShowChk._wired=true;_mShowChk.addEventListener("change",()=>{document.querySelectorAll("#portalMediaGrid .portal-media-copy").forEach(cp=>{cp.style.display=_mShowChk.checked?"block":"none"});});};i("#closeContentManageButton").addEventListener("click",()=>i("#contentManageDialog").close()),i("#toggleContentSectionButton").addEventListener("click",wa),i("#addContentItemButton").addEventListener("click",()=>{var g;L.manageKind==="media"?(i("#contentManageDialog").close(),(g=i("#editorMenuButton"))==null||g.click()):Jt(L.manageKind)}),i("#closeContentEditButton").addEventListener("click",()=>i("#contentEditDialog").close()),i("#cancelContentEditButton").addEventListener("click",()=>i("#contentEditDialog").close()),i("#contentEditorForm").addEventListener("submit",Ea),(n=i("#sidebarAddButton"))==null||n.addEventListener("click",()=>or("new")),(o=i("#addSidebarSocialLinkBtn"))==null||o.addEventListener("click",()=>{var g;(g=i("#sidebarSocialLinksWrapper"))==null||g.appendChild(lt())}),(a=i("#addSidebarImageUrlBtn"))==null||a.addEventListener("click",()=>{var g;(g=i("#sidebarImageUrlsWrapper"))==null||g.appendChild(gn())}),(r=i("#sidebarTrashButton"))==null||r.addEventListener("click",bn),(s=i("#closeSidebarTrashDialogButton"))==null||s.addEventListener("click",()=>{var g;return(g=i("#sidebarTrashDialog"))==null?void 0:g.close()}),(u=i("#closeSidebarItemDialogButton"))==null||u.addEventListener("click",()=>{var g;return(g=i("#sidebarItemDialog"))==null?void 0:g.close()}),(l=i("#cancelSidebarItemButton"))==null||l.addEventListener("click",()=>{var g;return(g=i("#sidebarItemDialog"))==null?void 0:g.close()}),(m=i("#sidebarItemForm"))==null||m.addEventListener("submit",Ra),(h=i("#sidebarItemDeleteBtn"))==null||h.addEventListener("click",Pa),(d=i("#sidebarItemMoveUpBtn"))==null||d.addEventListener("click",()=>_n("up")),(f=i("#sidebarItemMoveDownBtn"))==null||f.addEventListener("click",()=>_n("down")),(k=i("#sidebarItemScheduled"))==null||k.addEventListener("change",g=>{i("#sidebarScheduleFields").hidden=!g.target.checked}),(E=i("#sidebarItemTemplateSelect"))==null||E.addEventListener("change",g=>{Ma(g.target.value)}),(v=i("#sidebarItemIcon"))==null||v.addEventListener("input",g=>{st(g.target.value)}),z("#sidebarIconChips .rail-chip").forEach(g=>{g.addEventListener("click",()=>{const b=g.dataset.icon;if(i("#sidebarItemIcon").value=b,st(b),z("#sidebarIconChips .rail-chip").forEach(x=>{x.classList.toggle("active",x===g)}),b==="📞"||b==="☎️"||b==="📱"||b==="phone"){const x=i("#sidebarItemTitleTh"),_=i("#sidebarItemDescTh");x.value.trim()||(x.value="ติดต่อสอบถาม"),_.value.trim()||(_.value="ติดต่อสอบถามข้อมูลทางโทรศัพท์");const F=i("#sidebarItemUrl");F&&!F.value.trim()&&(F.placeholder="เช่น tel:042-xxx-xxx หรือ 042-xxx-xxx"),b==="phone"&&Xt("phone")}else if(["facebook","line","tiktok","instagram","youtube","link"].includes(b)){i("#sidebarItemOpenExternal").value="true";const x=i("#sidebarItemTitleTh"),_=i("#sidebarItemDescTh");x.value.trim()||(b==="facebook"?x.value="เฟซบุ๊กทางการ":b==="line"?x.value="ไลน์ออฟฟิเชียล":b==="tiktok"?x.value="ติ๊กต็อก":b==="instagram"?x.value="อินสตาแกรม":b==="youtube"?x.value="ยูทูบทางการ":b==="link"&&(x.value="เว็บไซต์ทางการ")),_.value.trim()||(b==="facebook"?_.value="ติดตามข่าวสารและกิจกรรมทางเฟซบุ๊ก":b==="line"?_.value="สอบถามข้อมูลและรับการแจ้งเตือนทางไลน์":b==="tiktok"?_.value="ชมคลิปสั้นและไฮไลท์บรรยากาศทางติ๊กต็อก":b==="instagram"?_.value="ชมภาพประทับใจทางอินสตาแกรม":b==="youtube"?_.value="ชมคลิปบันทึกและถ่ายทอดสดทางยูทูบ":b==="link"&&(_.value="เข้าชมเว็บไซต์ข้อมูลทางการ")),Xt(b)}})}),["TitleLo","TitleEn","DescLo","DescEn"].forEach(g=>{var b;(b=i(`#sidebarItem${g}`))==null||b.addEventListener("input",x=>{x.target.value.trim()?x.target.dataset.customized="true":delete x.target.dataset.customized})}),(T=i("#sidebarAutoTranslateBtn"))==null||T.addEventListener("click",()=>{Ia(!0)}),z(".sidebar-lang-tab").forEach(g=>{g.addEventListener("click",()=>{const b=g.dataset.sidebarTab;z(".sidebar-lang-tab").forEach(x=>x.classList.toggle("active",x===g)),i("#sidebarPaneTh").hidden=b!=="th",i("#sidebarPaneTh").classList.toggle("active",b==="th"),i("#sidebarPaneLo").hidden=b!=="lo",i("#sidebarPaneLo").classList.toggle("active",b==="lo"),i("#sidebarPaneEn").hidden=b!=="en",i("#sidebarPaneEn").classList.toggle("active",b==="en")})}),(C=i("#railAddButton"))==null||C.addEventListener("click",()=>ar("new")),(M=i("#railTrashButton"))==null||M.addEventListener("click",fn),(q=i("#closeRailTrashDialogButton"))==null||q.addEventListener("click",()=>{var g;return(g=i("#railTrashDialog"))==null?void 0:g.close()}),(N=i("#closeRailCardDialogButton"))==null||N.addEventListener("click",()=>{var g;return(g=i("#railCardDialog"))==null?void 0:g.close()}),(w=i("#cancelRailCardButton"))==null||w.addEventListener("click",()=>{var g;return(g=i("#railCardDialog"))==null?void 0:g.close()}),(R=i("#railEditorForm"))==null||R.addEventListener("submit",Sa),(P=i("#railCardDeleteBtn"))==null||P.addEventListener("click",Da),(S=i("#railCardMoveUpBtn"))==null||S.addEventListener("click",()=>An("up")),(O=i("#railCardMoveDownBtn"))==null||O.addEventListener("click",()=>An("down")),($=i("#railCardScheduled"))==null||$.addEventListener("change",g=>{i("#railScheduleFields").hidden=!g.target.checked}),(W=i("#railCardTemplateSelect"))==null||W.addEventListener("change",g=>{La(g.target.value)}),z(".rail-chip").forEach(g=>{g.addEventListener("click",()=>{const b=g.dataset.icon;if(i("#railCardIcon").value=b,["facebook","line","tiktok","instagram","youtube"].includes(b)){i("#railCardOpenExternal").value="true";const x=i("#railCardTitleTh"),_=i("#railCardKickerTh"),F=i("#railCardBtnTh");_.value.trim()||(_.value="ติดตามเรา"),x.value.trim()||(b==="facebook"?x.value="เฟซบุ๊กทางการ":b==="line"?x.value="ไลน์ออฟฟิเชียล":b==="tiktok"?x.value="ติ๊กต็อก":b==="instagram"?x.value="อินสตาแกรม":b==="youtube"&&(x.value="ยูทูบทางการ")),F.value.trim()||(b==="line"?F.value="เพิ่มเพื่อน":b==="youtube"?F.value="ชมวิดีโอ":F.value="ติดตาม")}})}),["KickerLo","KickerEn","TitleLo","TitleEn","DescLo","DescEn","BtnLo","BtnEn"].forEach(g=>{var b;(b=i(`#railCard${g}`))==null||b.addEventListener("input",x=>{x.target.value.trim()?x.target.dataset.customized="true":delete x.target.dataset.customized})}),(y=i("#railAutoTranslateBtn"))==null||y.addEventListener("click",()=>{xa(!0)}),z(".rail-lang-tab").forEach(g=>{g.addEventListener("click",()=>{const b=g.dataset.railTab;z(".rail-lang-tab").forEach(x=>x.classList.toggle("active",x===g)),i("#railPaneTh").hidden=b!=="th",i("#railPaneTh").classList.toggle("active",b==="th"),i("#railPaneLo").hidden=b!=="lo",i("#railPaneLo").classList.toggle("active",b==="lo"),i("#railPaneEn").hidden=b!=="en",i("#railPaneEn").classList.toggle("active",b==="en")})}),z(".language-option").forEach(g=>g.addEventListener("click",()=>setTimeout(()=>{er(),xt(),Xn(),Me(),Be()},0))),window.addEventListener("open-portal-manager",g=>{var _;const b=(_=g.detail)==null?void 0:_.kind;if(!["media","news","document","donation"].includes(b))return;Dn(b);const x=L.items.find(F=>{var G;return F.id===((G=g.detail)==null?void 0:G.itemId)});x&&Jt(b,x)})}Fa();
const _isSubdomainMuchalin = location.hostname.toLowerCase().includes("muchalin");
if (_isSubdomainMuchalin || location.hash === "#muchalinda-project" || location.hash.startsWith("#muchalinda-")) {
  Ae(!0);
}window.addEventListener("hashchange", () => {
  const hash = location.hash || "";
  const isMuchaHash = hash === "#muchalinda-project" || hash.startsWith("#muchalinda-");
  if (isMuchaHash !== _isMuchalindaActiveMode()) {
    Ae(isMuchaHash);
    Me();
    Be();
  }
});window.addEventListener("portal:dataReload",()=>{At(),Me(),Be()});window.addEventListener("portal:languageChange",()=>{Kt();Me();Be();At();if(typeof qe==="function")qe();if(typeof Xn==="function")Xn();if(typeof _renderTopNavItems==="function")_renderTopNavItems();if(typeof _renderSidebarProjects==="function")_renderSidebarProjects();if(typeof _renderSiteSectionsCMS==="function")_renderSiteSectionsCMS();});At();Rn(aa, async e => {
  L.user = e;
  L.role = await va(e);
  ya();
  At();
  if (typeof Me === "function") Me();
  if (typeof Be === "function") Be();
  if (typeof _renderTopNavItems === "function") _renderTopNavItems();
  if (typeof _renderSidebarProjects === "function") _renderSidebarProjects();
  if (typeof _renderSiteSectionsCMS === "function") _renderSiteSectionsCMS();
  if (typeof _updateAdminDOMState === "function") _updateAdminDOMState();
  console.log("[Auth/Init Debug]", {
    hostname: location.hostname,
    isMuchalinda: _isMuchalindaActiveMode(),
    user: e ? e.email : null,
    role: L.role,
    isAdmin: typeof _checkIsAdmin === "function" ? _checkIsAdmin() : false
  });
});


function _initSiteStatusListener() {
  if (X) {
    ae(Q(U.settings, "siteStatus"), (docSnap) => {
      _siteStatusLoaded = true;
      if (docSnap.exists()) {
        const d = docSnap.data();
        _sitePublished = d.published === true;
      } else {
        _sitePublished = false;
      }
      _updateSiteStatusUI();
    }, (err) => {
      console.warn("Site status unavailable, defaulting to maintenance", err);
      _sitePublished = false;
      _updateSiteStatusUI();
    });
  } else {
    _sitePublished = false;
    _updateSiteStatusUI();
  }
}

function _openSiteStatusDialog() {
  const dlg = c("#siteStatusDialog");
  if (!dlg) return;
  _updateSiteStatusUI();
  dlg.showModal();
}

function _closeSiteStatusDialog() {
  const dlg = c("#siteStatusDialog");
  if (dlg && dlg.open) dlg.close();
}

async function _handleToggleSitePublished(e) {
  const target = e.target;
  const newStatus = target.checked;
  const isAdmin = Y() || (typeof D === "function" && D());
  if (!isAdmin) {
    target.checked = !newStatus;
    A("เฉพาะผู้ดูแลระบบเท่านั้นที่สามารถเปลี่ยนสถานะได้", "error");
    return;
  }
  target.disabled = true;
  try {
    const statusRef = Q(U.settings, "siteStatus");
    await V(statusRef, {
      published: newStatus,
      updatedAt: I(),
      updatedBy: p.user ? p.user.uid : "admin"
    }, { merge: true });
    _sitePublished = newStatus;
    _updateSiteStatusUI();
    A(newStatus ? "เปิดเผยแพร่เว็บไซต์เรียบร้อยแล้ว" : "ตั้งค่าเว็บไซต์เป็นโหมดกำลังพัฒนาเรียบร้อยแล้ว", "success");
  } catch (err) {
    console.error("Failed to update site status", err);
    target.checked = !newStatus;
    A("ไม่สามารถบันทึกสถานะได้ กรุณาลองใหม่อีกครั้ง", "error");
  } finally {
    target.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = c("#closeSiteStatusDialog");
  const closeBtn2 = c("#closeSiteStatusBtn");
  const toggle = c("#sitePublishedToggle");
  const mLoginBtn = c("#maintenanceLoginBtn");

  if (closeBtn) closeBtn.addEventListener("click", _closeSiteStatusDialog);
  if (closeBtn2) closeBtn2.addEventListener("click", _closeSiteStatusDialog);
  if (toggle) toggle.addEventListener("change", _handleToggleSitePublished);
  if (mLoginBtn) mLoginBtn.addEventListener("click", () => Tt());
});

// Also trigger immediately if DOM is already loaded
setTimeout(() => {
  const closeBtn = c("#closeSiteStatusDialog");
  const closeBtn2 = c("#closeSiteStatusBtn");
  const toggle = c("#sitePublishedToggle");
  const mLoginBtn = c("#maintenanceLoginBtn");

  if (closeBtn) closeBtn.addEventListener("click", _closeSiteStatusDialog);
  if (closeBtn2) closeBtn2.addEventListener("click", _closeSiteStatusDialog);
  if (toggle) toggle.addEventListener("change", _handleToggleSitePublished);
  if (mLoginBtn) mLoginBtn.addEventListener("click", () => Tt());
}, 500);

_initSiteStatusListener();


/* Backup and Restore System for Admin */
function _openBackupRestoreDialog() {
  const dlg = c("#backupRestoreDialog");
  if (!dlg) return;
  const statusEl = c("#backupStatusText");
  if (statusEl) statusEl.hidden = true;
  const rStatusEl = c("#restoreStatusText");
  if (rStatusEl) rStatusEl.hidden = true;
  const fileInput = c("#restoreBackupFileInput");
  if (fileInput) fileInput.value = "";
  const nameEl = c("#chosenRestoreFileName");
  if (nameEl) nameEl.textContent = "ยังไม่ได้เลือกไฟล์";
  const startBtn = c("#startRestoreButton");
  if (startBtn) startBtn.disabled = true;
  dlg.showModal();
}

function _closeBackupRestoreDialog() {
  const dlg = c("#backupRestoreDialog");
  if (dlg && dlg.open) dlg.close();
}

async function _handleExportFullBackup() {
  const isAdmin = Y() || (typeof D === "function" && D());
  if (!isAdmin) {
    A("เฉพาะ Admin เท่านั้นที่สามารถสำรองข้อมูลได้", "error");
    return;
  }
  const btn = c("#exportFullBackupButton");
  const statusEl = c("#backupStatusText");
  if (btn) btn.disabled = true;
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.textContent = "กำลังรวบรวมข้อมูลทั้งหมดจากระบบคลาวด์...";
  }

  try {
    const serializeDocs = (snap) => snap.docs.map(doc => {
      const data = doc.data();
      const clean = {};
      for (const [k, v] of Object.entries(data)) {
        if (v && typeof v.toDate === "function") {
          try { clean[k] = v.toDate().toISOString(); } catch (_) { clean[k] = String(v); }
        } else if (v && typeof v === "object" && typeof v.path === "string" && v.firestore) {
          clean[k] = v.path;
        } else if (v && typeof v === "object") {
          try {
            clean[k] = JSON.parse(JSON.stringify(v));
          } catch (_) {
            clean[k] = null;
          }
        } else {
          clean[k] = v;
        }
      }
      return { id: doc.id, ...clean };
    });

    const [nodesSnap, contentSnap, mediaSnap, railSnap, sidebarSnap, topNavSnap, sectionsSnap] = await Promise.all([
      Se(Qt),
      Se(it),
      Se(oa),
      Se(le),
      Se(de),
      Se(_topNavCol),
      Se(_siteSectionsCol)
    ]);

    const backupData = {
      version: "1.0",
      project: "that-phanom-heritage",
      exportedAt: new Date().toISOString(),
      counts: {
        siteNodes: nodesSnap.size,
        content: contentSnap.size,
        media: mediaSnap.size,
        railCards: railSnap.size,
        sidebarItems: sidebarSnap.size,
        topNavItems: topNavSnap.size,
        siteSections: sectionsSnap.size
      },
      collections: {
        siteNodes: serializeDocs(nodesSnap),
        content: serializeDocs(contentSnap),
        media: serializeDocs(mediaSnap),
        railCards: serializeDocs(railSnap),
        sidebarItems: serializeDocs(sidebarSnap),
        topNavItems: serializeDocs(topNavSnap),
        siteSections: serializeDocs(sectionsSnap)
      }
    };

    const blob = new Blob([JSON.stringify(backupData, null, 2)], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    const dateStr = new Date().toISOString().slice(0, 10);
    a.href = url;
    a.download = `that-phanom-backup-${dateStr}.json`;
    a.click();
    URL.revokeObjectURL(url);

    if (statusEl) {
      statusEl.textContent = `สำรองข้อมูลสำเร็จเรียบร้อย (${backupData.counts.siteNodes + backupData.counts.content + backupData.counts.media + backupData.counts.railCards + backupData.counts.sidebarItems} รายการ)`;
    }
    A("ดาวน์โหลดไฟล์สำรองข้อมูลสำเร็จ", "success");
  } catch (err) {
    console.error("Backup failed", err);
    if (statusEl) statusEl.textContent = "เกิดข้อผิดพลาดในการสำรองข้อมูล";
    A("สำรองข้อมูลไม่สำเร็จ: " + (err.message || ""), "error");
  } finally {
    if (btn) btn.disabled = false;
  }
}

let _parsedRestoreData = null;

function _handleRestoreFileSelected(e) {
  const file = e.target.files && e.target.files[0];
  const nameEl = c("#chosenRestoreFileName");
  const startBtn = c("#startRestoreButton");
  const statusEl = c("#restoreStatusText");
  _parsedRestoreData = null;

  if (!file) {
    if (nameEl) nameEl.textContent = "ยังไม่ได้เลือกไฟล์";
    if (startBtn) startBtn.disabled = true;
    return;
  }

  if (nameEl) nameEl.textContent = `${file.name} (${(file.size / 1024).toFixed(1)} KB)`;

  const reader = new FileReader();
  reader.onload = (evt) => {
    try {
      const data = JSON.parse(evt.target.result);
      if (!data.collections && !data.nodes) {
        throw new Error("รูปแบบไฟล์สำรองไม่ถูกต้อง ไม่พบคอลเลกชันข้อมูล");
      }
      _parsedRestoreData = data;
      if (startBtn) startBtn.disabled = false;
      if (statusEl) {
        statusEl.hidden = false;
        const totalItems = data.collections ? 
          Object.values(data.collections).reduce((sum, arr) => sum + (Array.isArray(arr) ? arr.length : 0), 0) : 
          (Array.isArray(data.nodes) ? data.nodes.length : 0);
        statusEl.textContent = `ตรวจสอบไฟล์สำเร็จ: พร้อมกู้คืน ${totalItems} รายการ`;
      }
    } catch (err) {
      console.error(err);
      if (statusEl) {
        statusEl.hidden = false;
        statusEl.textContent = "ไฟล์ไม่ถูกต้อง: " + err.message;
      }
      if (startBtn) startBtn.disabled = true;
      A("ไฟล์สำรองไม่ถูกต้อง", "error");
    }
  };
  reader.readAsText(file);
}

async function _handleExecuteRestore() {
  const isAdmin = Y() || (typeof D === "function" && D());
  if (!isAdmin) {
    A("เฉพาะ Admin เท่านั้นที่สามารถกู้คืนข้อมูลได้", "error");
    return;
  }
  if (!_parsedRestoreData) {
    A("กรุณาเลือกไฟล์สำรองก่อน", "error");
    return;
  }

  const startBtn = c("#startRestoreButton");
  const statusEl = c("#restoreStatusText");
  if (startBtn) startBtn.disabled = true;
  if (statusEl) {
    statusEl.hidden = false;
    statusEl.textContent = "กำลังกู้คืนข้อมูลเข้าสู่ฐานข้อมูลคลาวด์...";
  }

  try {
    const data = _parsedRestoreData;
    let restoredCount = 0;

    const restoreList = async (items, collectionRef) => {
      if (!Array.isArray(items) || items.length === 0) return;
      for (let i = 0; i < items.length; i += 400) {
        const chunk = items.slice(i, i + 400);
        const batch = pe(Ie);
        for (const item of chunk) {
          const { id, ...payload } = item;
          if (!id) continue;
          // Convert date strings back to Timestamp if needed
          for (const key of Object.keys(payload)) {
            if (payload[key] === null || payload[key] === undefined) {
              delete payload[key];
            }
          }
          const docRef = j(collectionRef, id);
          batch.set(docRef, payload, { merge: true });
          restoredCount++;
        }
        await batch.commit();
      }
    };

    if (data.collections) {
      if (data.collections.siteNodes) await restoreList(data.collections.siteNodes, Qt);
      if (data.collections.content) await restoreList(data.collections.content, it);
      if (data.collections.media) await restoreList(data.collections.media, oa);
      if (data.collections.railCards) await restoreList(data.collections.railCards, le);
      if (data.collections.sidebarItems) await restoreList(data.collections.sidebarItems, de);
      if (data.collections.topNavItems) await restoreList(data.collections.topNavItems, _topNavCol);
      if (data.collections.siteSections) await restoreList(data.collections.siteSections, _siteSectionsCol);
    } else if (data.nodes) {
      // Legacy exportTree format
      await restoreList(data.nodes, Qt);
    }

    if (statusEl) {
      statusEl.textContent = `กู้คืนข้อมูลสำเร็จทั้งหมด ${restoredCount} รายการ`;
    }
    A(`กู้คืนข้อมูลสำเร็จ (${restoredCount} รายการ)`, "success");
    window.dispatchEvent(new CustomEvent("portal:dataReload"));
  } catch (err) {
    console.error("Restore failed", err);
    if (statusEl) statusEl.textContent = "เกิดข้อผิดพลาดในการกู้คืน: " + err.message;
    A("กู้คืนข้อมูลไม่สำเร็จ: " + (err.message || ""), "error");
  } finally {
    if (startBtn) startBtn.disabled = false;
  }
}

document.addEventListener("DOMContentLoaded", () => {
  const closeBtn = c("#closeBackupRestoreDialog");
  const closeBtn2 = c("#closeBackupRestoreBtn");
  const exportBtn = c("#exportFullBackupButton");
  const chooseBtn = c("#chooseRestoreFileBtn");
  const fileInput = c("#restoreBackupFileInput");
  const startRestoreBtn = c("#startRestoreButton");

  if (closeBtn) closeBtn.addEventListener("click", _closeBackupRestoreDialog);
  if (closeBtn2) closeBtn2.addEventListener("click", _closeBackupRestoreDialog);
  if (exportBtn) exportBtn.addEventListener("click", _handleExportFullBackup);
  if (chooseBtn && fileInput) chooseBtn.addEventListener("click", () => fileInput.click());
  if (fileInput) fileInput.addEventListener("change", _handleRestoreFileSelected);
  if (startRestoreBtn) startRestoreBtn.addEventListener("click", _handleExecuteRestore);
});

setTimeout(() => {
  const closeBtn = c("#closeBackupRestoreDialog");
  const closeBtn2 = c("#closeBackupRestoreBtn");
  const exportBtn = c("#exportFullBackupButton");
  const chooseBtn = c("#chooseRestoreFileBtn");
  const fileInput = c("#restoreBackupFileInput");
  const startRestoreBtn = c("#startRestoreButton");

  if (closeBtn) closeBtn.addEventListener("click", _closeBackupRestoreDialog);
  if (closeBtn2) closeBtn2.addEventListener("click", _closeBackupRestoreDialog);
  if (exportBtn) exportBtn.addEventListener("click", _handleExportFullBackup);
  if (chooseBtn && fileInput) chooseBtn.addEventListener("click", () => fileInput.click());
  if (fileInput) fileInput.addEventListener("change", _handleRestoreFileSelected);
  if (startRestoreBtn) startRestoreBtn.addEventListener("click", _handleExecuteRestore);
}, 500);


/* Dynamic Sidebar Projects Navigation */
function _renderSidebarProjects() {
  const container = i("#sidebarProjectsList");
  if (!container) return;
  
  // Get all project nodes
  const projects = L.nodes.filter(r => r.type === "project" && !r.deletedAt).sort((r, s) => (Number(r.order) || 0) - (Number(s.order) || 0) || String(r.title || "").localeCompare(String(s.title || ""), "th"));
  if (!projects.some(r => r.contentRef === oe || r.slug === oe || r.id === kt.id)) {
    projects.unshift(kt);
  }
  if ((D() || _isMuchalindaActiveMode()) && !projects.some(Zn)) {
    projects.push(ea);
  }

  const currentHash = location.hash || "#top";
  const sig = `${document.documentElement.lang || "th"}|${D()}|${currentHash}|` + projects.map(p => `${p.id}:${p.title}:${p.order}:${p.published}`).join("|");
  if (container.dataset.renderedSig === sig && container.children.length > 0) {
    return;
  }
  container.dataset.renderedSig = sig;
  container.innerHTML = "";

  projects.forEach((proj, idx) => {
    const isMain = proj.id === kt.id || proj.contentRef === oe || proj.slug === oe;
    const isMuchalinda = Zn(proj);

    const a = document.createElement("a");
    let targetHash = "#projects";
    if (isMain) {
      targetHash = "#top";
    } else if (isMuchalinda) {
      targetHash = "#muchalinda-project";
    } else {
      targetHash = `#project-${proj.id}`;
    }
    const isMuchaMode = _isMuchalindaActiveMode();
    const isActive = isMuchaMode ? isMuchalinda : (isMain ? (!currentHash || currentHash === "#top" || currentHash === "#world-heritage" || currentHash === "#history" || currentHash === "#milestones" || currentHash === "#projects") : (currentHash === targetHash));
    if (isActive) a.className = "active";
    a.href = targetHash;
    a.dataset.navTarget = targetHash.replace("#", "");

    // Project icon
    const iconSpan = document.createElement("span");
    iconSpan.className = "nav-icon";
    if (isMain) {
      iconSpan.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>`;
    } else if (isMuchalinda) {
      iconSpan.innerHTML = `<span style="font-size:1.1rem;line-height:1;display:inline-block;">💧</span>`;
    } else {
      iconSpan.innerHTML = `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6l2 3h8v11H4z"></path></svg>`;
    }

    // Label
    const textSpan = document.createElement("span");
    textSpan.style.whiteSpace = "normal";
    textSpan.style.lineHeight = "1.35";
    textSpan.style.display = "-webkit-box";
    textSpan.style.webkitLineClamp = "2";
    textSpan.style.webkitBoxOrient = "vertical";
    textSpan.style.overflow = "hidden";

    const curProjLang = document.documentElement.lang || "th";
    let displayTitle = proj.title || "โครงการ";
    if (isMain) {
      displayTitle = curProjLang === "en" ? "Phra That Phanom to World Heritage" : curProjLang === "lo" ? "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ" : "พระธาตุพนม สู่มรดกโลก";
    } else if (isMuchalinda) {
      displayTitle = curProjLang === "en" ? "Muchalinda Pond Restoration" : curProjLang === "lo" ? "ບູລະນະສະມຸດຈະລິນ" : "บูรณะสระมุจลินท์";
    } else {
      if (curProjLang === "lo" && proj.title_lo) displayTitle = proj.title_lo;
      else if (curProjLang === "en" && proj.title_en) displayTitle = proj.title_en;
    }
    textSpan.textContent = displayTitle;

    a.appendChild(iconSpan);
    a.appendChild(textSpan);

    const projUrl = H(proj.url);
    const isProjExternal = proj.openBehavior === "external" && !!projUrl;
    if (isProjExternal) {
      a.href = projUrl;
      a.target = "_blank";
      a.rel = "noopener noreferrer";
    } else {
      a.addEventListener("click", (evt) => {
        if (isMain) {
          evt.preventDefault();
          history.pushState(null, "", "#top");
          Ae(false);
          const topEl = i("#top") || document.body;
          if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
          window.scrollTo({ top: 0, behavior: "smooth" });
          _renderSidebarProjects();
        } else if (isMuchalinda) {
          evt.preventDefault();
          history.pushState(null, "", "#muchalinda-project");
          Ae(true);
          const t = i("#muchalinda-project");
          if (t) t.scrollIntoView({ behavior: "smooth", block: "start" });
          _renderSidebarProjects();
        } else {
          fa(proj);
        }
      });
    }    container.appendChild(a);
  });
}

window.addEventListener("hashchange", () => {
  _renderSidebarProjects();
});


/* ==========================================================================
   DYNAMIC TOP NAV & CENTER SECTIONS CMS & UNIVERSAL GEAR CONTROLS
   ========================================================================== */



function _getMergedTopNavItems() {
  const customItems = (L.topNav && Array.isArray(L.topNav)) ? L.topNav.filter(r => !r.deletedAt) : [];
  if (customItems.length === 0) {
    return _DEFAULT_TOP_NAV;
  }
  const result = [];
  const handledIds = new Set();
  const handledTargets = new Set();

  _DEFAULT_TOP_NAV.forEach(def => {
    const customMatch = customItems.find(c => c.id === def.id || (c.targetUrl && c.targetUrl.trim() === def.targetUrl.trim()));
    if (customMatch) {
      handledIds.add(customMatch.id);
      if (customMatch.targetUrl) handledTargets.add(customMatch.targetUrl.trim());
      if (customMatch.published !== false) {
        result.push({ ...def, ...customMatch });
      }
    } else {
      result.push(def);
    }
  });

  customItems.forEach(c => {
    if (!handledIds.has(c.id) && (!c.targetUrl || !handledTargets.has(c.targetUrl.trim()))) {
      if (c.published !== false) {
        result.push(c);
      }
    }
  });

  result.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  return result;
}

function _getAllTopNavItemsForManager() {
  const customItems = (L.topNav && Array.isArray(L.topNav)) ? L.topNav.filter(r => !r.deletedAt) : [];
  const result = [];
  const handledIds = new Set();
  const handledTargets = new Set();

  _DEFAULT_TOP_NAV.forEach(def => {
    const customMatch = customItems.find(c => c.id === def.id || (c.targetUrl && c.targetUrl.trim() === def.targetUrl.trim()));
    if (customMatch) {
      handledIds.add(customMatch.id);
      if (customMatch.targetUrl) handledTargets.add(customMatch.targetUrl.trim());
      result.push({ ...def, ...customMatch, isDefault: true });
    } else {
      result.push({ ...def, isDefault: true });
    }
  });

  customItems.forEach(c => {
    if (!handledIds.has(c.id) && (!c.targetUrl || !handledTargets.has(c.targetUrl.trim()))) {
      result.push({ ...c, isDefault: false });
    }
  });

  result.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
  return result;
}

function _getTopNavSvgIcon(iconName) {
  if (iconName === "book") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h16v15H4z"></path><path d="M8 2v6M16 2v6M8 12h8M8 16h5"></path></svg>`;
  } else if (iconName === "globe") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><circle cx="12" cy="12" r="9"></circle><path d="M3 12h18M12 3a15 15 0 0 1 0 18M12 3a15 15 0 0 0 0 18"></path></svg>`;
  } else if (iconName === "folder") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4 5h6l2 3h8v11H4z"></path></svg>`;
  } else if (iconName === "video") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><rect x="3" y="5" width="18" height="14" rx="2"></rect><path d="m10 9 5 3-5 3z"></path></svg>`;
  } else if (iconName === "heart") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"></path></svg>`;
  } else if (iconName === "newspaper") {
    return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19 20H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v1m2 13a2 2 0 0 1-2-2V7m2 13a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-2m-4-3H9M7 8h6m-6 4h10m-10 4h4"></path></svg>`;
  }
  // Default home icon
  return `<svg viewBox="0 0 24 24" aria-hidden="true"><path d="m3 11 9-8 9 8"></path><path d="M5 10v10h14V10"></path></svg>`;
}



function _updateTopNavActiveState(targetUrlOrId) {
  if (targetUrlOrId === undefined || targetUrlOrId === null) return;
  let raw = String(targetUrlOrId).trim();
  if (!raw || raw === "#" || raw === "#top" || raw === "top" || raw === "header") {
    raw = "top";
  } else {
    raw = raw.replace(/^#/, "");
  }
  const targetHash = "#" + raw;
  _currentActiveTarget = targetHash;

  const desktopLinks = document.querySelectorAll("#mainTopNav a");
  const mobileLinks = document.querySelectorAll(".mobile-bottom-nav a");

  const applyActive = (links) => {
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

  if (desktopLinks.length > 0) applyActive(desktopLinks);
  if (mobileLinks.length > 0) applyActive(mobileLinks);
}



function _updateSubdomainBrandUI() {
  const isMucha = _isMuchalindaActiveMode();
  const lang = document.documentElement.lang || "th";
  
  // Update Topbar Brand
  document.querySelectorAll(".site-header .brand").forEach(b => {
    const strong = b.querySelector("strong");
    const small = b.querySelector("small");
    if (isMucha) {
      if (strong) strong.textContent = (lang === "en" ? "Muchalinda Pond Restoration" : lang === "lo" ? "ໂຄງການບູລະນະສະມຸດຈະລິນ" : "บูรณะสระมุจลินท์");
      if (small) small.textContent = (lang === "en" ? "Sacred Pond Project" : lang === "lo" ? "ແຫຼ່ງນ້ຳສັກສິດ" : "โครงการฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์");
    } else {
      if (strong) strong.textContent = (lang === "en" ? "Phra That Phanom to World Heritage" : lang === "lo" ? "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ" : "พระธาตุพนม สู่มรดกโลก");
      if (small) small.textContent = "";
    }
  });

  // Update Sidebar Brand Profile
  document.querySelectorAll(".sidebar-profile").forEach(sp => {
    const strong = sp.querySelector("strong");
    const small = sp.querySelector("small");
    if (isMucha) {
      if (strong) strong.textContent = (lang === "en" ? "Muchalinda Pond" : lang === "lo" ? "ສະມຸດຈະລິນ" : "บูรณะสระมุจลินท์");
      if (small) small.textContent = (lang === "en" ? "Heritage Restoration" : lang === "lo" ? "ບູລະນະແຫຼ່ງນ້ຳ" : "โครงการบูรณะสระพังทอง");
    } else {
      if (strong) strong.textContent = (lang === "en" ? "Phra That Phanom" : lang === "lo" ? "ພະທາດພະນົມ ສູ່ມໍລະດົກໂລກ" : "พระธาตุพนม สู่มรดกโลก");
      if (small) small.textContent = "";
    }
  });
}

function _renderTopNavItems() {
  _updateSubdomainBrandUI();
  const topNav = i("#mainTopNav");
  const bottomNav = i(".mobile-bottom-nav");
  const isMuchalinda = _isMuchalindaActiveMode();
  const items = isMuchalinda ? _MUCHALINDA_TOP_NAV : _getMergedTopNavItems();
  const lang = document.documentElement.lang || "th";
  const currentTarget = _currentActiveTarget || location.hash || "#top";
  // 1. Render Top Nav (Desktop & Scrollable Bar)
  if (topNav) {
    const gearBtn = i("#topNavGearBtn");
    const existingLinks = topNav.querySelectorAll("a");
    existingLinks.forEach(a => a.remove());

    items.forEach(item => {
      const a = document.createElement("a");
      a.href = item.targetUrl || "#";
      const targetId = (item.targetUrl || "").replace(/^#/, "");
      a.dataset.navTarget = targetId;
      const label = (lang === "en" && item.titleEn) ? item.titleEn : (lang === "lo" && (item.titleLo || item.title_lo)) ? (item.titleLo || item.title_lo) : (item.titleTh || item.title || "");
      a.innerHTML = `${_getTopNavSvgIcon(item.icon)}<span>${label}</span>`;

      if (item.targetUrl && item.targetUrl.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      a.addEventListener("click", () => {
        if (item.targetUrl && item.targetUrl.startsWith("#")) {
          _navScrollLockUntil = Date.now() + 1200;
          _updateTopNavActiveState(item.targetUrl);
        }
      });

      if (gearBtn) {
        topNav.insertBefore(a, gearBtn);
      } else {
        topNav.appendChild(a);
      }
    });

    if (gearBtn) {
      gearBtn.hidden = !_checkIsAdmin();
    }
  }

  // 2. Render Mobile Bottom Nav
  if (bottomNav) {
    bottomNav.innerHTML = "";
    items.forEach(item => {
      const a = document.createElement("a");
      a.href = item.targetUrl || "#";
      const targetId = (item.targetUrl || "").replace(/^#/, "");
      a.dataset.navTarget = targetId;
      const label = (lang === "en" && item.titleEn) ? item.titleEn : (lang === "lo" && (item.titleLo || item.title_lo)) ? (item.titleLo || item.title_lo) : (item.titleTh || item.title || "");
      a.innerHTML = `${_getTopNavSvgIcon(item.icon)}<span>${label}</span>`;

      if (item.targetUrl && item.targetUrl.startsWith("http")) {
        a.target = "_blank";
        a.rel = "noopener noreferrer";
      }

      a.addEventListener("click", () => {
        if (item.targetUrl && item.targetUrl.startsWith("#")) {
          _navScrollLockUntil = Date.now() + 1200;
          _updateTopNavActiveState(item.targetUrl);
        }
      });

      bottomNav.appendChild(a);
    });
  }

  _updateTopNavActiveState(currentTarget);
}

document.addEventListener("click", (e) => {
  // 1. Check if user clicked any link returning to main portal or navigating away from Muchalinda
  const anyLink = e.target.closest("a");
  if (anyLink) {
    const href = (anyLink.getAttribute("href") || "").trim();
    const isBackLink = anyLink.matches("[data-i18n='backToWorldHeritage']") || 
                       anyLink.matches("[data-i18n='muchalindaHome']") || 
                       anyLink.id === "nav-main-portal" || 
                       anyLink.dataset.navTarget === "top" ||
                       href === "#top" || href === "#projects" || href === "#world-heritage";

    if (_isMuchalindaActiveMode() && isBackLink && !href.startsWith("#muchalinda-")) {
      // If user clicked link to go back to main portal
      if (href === "#top" || href === "#projects" || anyLink.matches("[data-i18n='backToWorldHeritage']") || anyLink.matches("[data-i18n='muchalindaHome']") || anyLink.id === "nav-main-portal") {
        e.preventDefault();
        history.pushState(null, "", "#top");
        Ae(false);
        const topEl = i("#top") || document.body;
        if (topEl) topEl.scrollIntoView({ behavior: "smooth", block: "start" });
        window.scrollTo({ top: 0, behavior: "smooth" });
        return;
      } else {
        Ae(false);
      }
    }
  }

  const link = e.target.closest("#mainTopNav a, .mobile-bottom-nav a");
  if (!link) return;
  const href = (link.getAttribute("href") || "").trim();
  if (href.startsWith("#")) {
    _navScrollLockUntil = Date.now() + 1200;
    _updateTopNavActiveState(href);
  }
});

window.addEventListener("hashchange", () => {
  const hash = location.hash || "";
  const isMuchaHash = hash === "#muchalinda-project" || hash.startsWith("#muchalinda-");
  if (!isMuchaHash && _isMuchalindaActiveMode()) {
    Ae(false);
  } else if (isMuchaHash && !_isMuchalindaActiveMode()) {
    Ae(true);
  }
  if (hash) {
    _navScrollLockUntil = Date.now() + 1000;
    _updateTopNavActiveState(hash);
  }
});
let _navScrollSpyTicking = false;
function _runNavScrollSpy() {
  if (Date.now() < _navScrollLockUntil) return;
  const scrollY = window.scrollY || window.pageYOffset || 0;
  if (scrollY < 120) {
    _updateTopNavActiveState("#top");
    return;
  }
  const scrollHeight = document.documentElement.scrollHeight;
  const clientHeight = window.innerHeight;
  if (scrollY + clientHeight >= scrollHeight - 50) {
    const allLinks = [...document.querySelectorAll("#mainTopNav a")];
    for (let idx = allLinks.length - 1; idx >= 0; idx--) {
      const h = (allLinks[idx].getAttribute("href") || "").trim();
      if (h.startsWith("#") && h !== "#top" && h !== "#") {
        _updateTopNavActiveState(h);
        return;
      }
    }
  }

  const navLinks = document.querySelectorAll("#mainTopNav a, .mobile-bottom-nav a");
  const targets = [];
  navLinks.forEach(l => {
    const h = (l.getAttribute("href") || "").trim();
    if (h.startsWith("#") && h.length > 1 && h !== "#top") {
      const targetId = h.substring(1);
      const el = document.getElementById(targetId);
      if (el && !targets.some(t => t.id === targetId)) {
        targets.push({ id: targetId, href: h, el: el });
      }
    }
  });

  const headerOffset = 180;
  let candidateHref = null;
  let bestTop = -999999;

  for (const t of targets) {
    const rect = t.el.getBoundingClientRect();
    if (rect.top <= headerOffset && rect.bottom > 60) {
      if (rect.top > bestTop) {
        bestTop = rect.top;
        candidateHref = t.href;
      }
    }
  }

  if (candidateHref) {
    _updateTopNavActiveState(candidateHref);
  }
}

window.addEventListener("scroll", () => {
  if (!_navScrollSpyTicking) {
    _navScrollSpyTicking = true;
    requestAnimationFrame(() => {
      _runNavScrollSpy();
      _navScrollSpyTicking = false;
    });
  }
}, { passive: true });


/* Manage Top Nav Dialog */
function _openTopNavDialog() {
  const dlg = i("#topNavManageDialog");
  if (!dlg) return;
  _renderTopNavManagerList();
  const form = i("#topNavEditForm");
  if (form) form.style.display = "none";
  dlg.showModal();
}

function _closeTopNavDialog() {
  const dlg = i("#topNavManageDialog");
  if (dlg) dlg.close();
}

function _switchTopNavLangTab(lang) {
  document.querySelectorAll(".top-nav-lang-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.topNavTab === lang);
  });
  const panes = [
    { id: "#topNavPaneTh", key: "th" },
    { id: "#topNavPaneLo", key: "lo" },
    { id: "#topNavPaneEn", key: "en" }
  ];
  panes.forEach(p => {
    const el = i(p.id);
    if (el) {
      el.style.display = (p.key === lang) ? "block" : "none";
      el.hidden = (p.key !== lang);
    }
  });
}

async function _autoTranslateTopNav() {
  const thInput = i("#topNavTitleTh");
  const textTh = thInput ? thInput.value.trim() : "";
  if (!textTh) {
    if (typeof A === "function") A("กรุณากรอกชื่อเมนูภาษาไทยก่อนกดแปลภาษา", "warning");
    return;
  }
  const statusBox = i("#topNavTranslateStatus");
  const statusText = i("#topNavTranslateStatusText");
  const btn = i("#topNavAutoTranslateBtn");
  if (statusBox && statusText) {
    statusBox.hidden = false;
    statusBox.style.display = "inline-flex";
    statusText.textContent = "🌐 กำลังแปลภาษาลาวและอังกฤษ...";
  }
  if (btn) btn.disabled = true;
  try {
    const [lo, en] = await Promise.all([
      ne(textTh),
      re(textTh)
    ]);
    const loInput = i("#topNavTitleLo");
    const enInput = i("#topNavTitleEn");
    if (loInput && lo) loInput.value = lo;
    if (enInput && en) enInput.value = en;
    if (statusText) {
      statusText.textContent = "✓ แปลภาษาลาวและอังกฤษสำเร็จ";
      setTimeout(() => {
        if (statusBox) {
          statusBox.hidden = true;
          statusBox.style.display = "none";
        }
      }, 3000);
    }
  } catch (err) {
    console.warn("Top nav translate error:", err);
    if (statusText) statusText.textContent = "ไม่สามารถแปลภาษาได้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    if (btn) btn.disabled = false;
  }
}

function _renderTopNavManagerList() {
  const table = i("#topNavItemsTable");
  const countEl = i("#topNavTotalCount");
  if (!table) return;
  const items = _getAllTopNavItemsForManager();
  if (countEl) countEl.textContent = String(items.length);
  table.innerHTML = "";

  items.forEach((item, index) => {
    const row = document.createElement("div");
    row.style.display = "flex";
    row.style.alignItems = "center";
    row.style.justifyContent = "space-between";
    row.style.padding = "10px 14px";
    row.style.background = "#fff";
    row.style.border = "1px solid #e2e0db";
    row.style.borderRadius = "8px";
    row.style.gap = "10px";

    const left = document.createElement("div");
    left.style.display = "flex";
    left.style.alignItems = "center";
    left.style.gap = "12px";

    const orderBadge = document.createElement("span");
    orderBadge.style.cssText = "font-weight:700; color:#cba64b; font-size:0.85rem; width:24px;";
    orderBadge.textContent = `#${item.order || index + 1}`;

    const textWrap = document.createElement("div");
    const name = document.createElement("strong");
    name.style.cssText = "display:flex; align-items:center; gap:6px; font-size:0.92rem; color:#171329; flex-wrap:wrap;";
    name.textContent = item.titleTh || item.title || "เมนู";

    if (item.isDefault) {
      const defaultTag = document.createElement("span");
      defaultTag.style.cssText = "font-size:0.7rem; font-weight:600; padding:2px 6px; background:#f4f1e9; border:1px solid rgba(203,166,75,0.4); border-radius:4px; color:#8b231f;";
      defaultTag.textContent = "เมนูหลักระบบ";
      name.appendChild(defaultTag);
    }

    const sub = document.createElement("span");
    sub.style.cssText = "display:block; font-size:0.8rem; color:#696579; margin-top:2px;";
    const loPart = (item.titleLo || item.title_lo) ? ` · 🇱🇦 ${item.titleLo || item.title_lo}` : "";
    const enPart = (item.titleEn || item.title_en) ? ` · 🇬🇧 ${item.titleEn || item.title_en}` : "";
    sub.textContent = `${item.targetUrl || "#"}${loPart}${enPart} ${item.published === false ? "· (ซ่อนไว้)" : ""}`;

    textWrap.appendChild(name);
    textWrap.appendChild(sub);
    left.appendChild(orderBadge);
    left.appendChild(textWrap);

    const actions = document.createElement("div");
    actions.style.display = "flex";
    actions.style.gap = "6px";

    const editBtn = document.createElement("button");
    editBtn.type = "button";
    editBtn.className = "button secondary";
    editBtn.style.padding = "4px 10px";
    editBtn.style.fontSize = "0.82rem";
    editBtn.textContent = "✏ แก้ไข";
    editBtn.addEventListener("click", () => _editTopNavItem(item));

    const delBtn = document.createElement("button");
    delBtn.type = "button";
    delBtn.className = "button danger";
    delBtn.style.padding = "4px 8px";
    delBtn.style.fontSize = "0.82rem";
    delBtn.textContent = "🗑";
    delBtn.title = item.isDefault ? "ซ่อนเมนูนี้" : "ลบเมนูนี้";
    delBtn.addEventListener("click", () => _deleteTopNavItem(item));

    actions.appendChild(editBtn);
    actions.appendChild(delBtn);
    row.appendChild(left);
    row.appendChild(actions);
    table.appendChild(row);
  });
}

function _editTopNavItem(item) {
  const form = i("#topNavEditForm");
  if (!form) return;
  form.style.display = "block";
  i("#topNavFormTitle").textContent = item ? (item.isDefault ? "แก้ไขเมนูหลัก" : "แก้ไขเมนู") : "เพิ่มเมนูใหม่";
  i("#topNavEditId").value = item ? item.id : "";
  i("#topNavTitleTh").value = item ? (item.titleTh || item.title || "") : "";
  const loInput = i("#topNavTitleLo");
  if (loInput) loInput.value = item ? (item.titleLo || item.title_lo || "") : "";
  const enInput = i("#topNavTitleEn");
  if (enInput) enInput.value = item ? (item.titleEn || item.title_en || "") : "";
  i("#topNavTargetUrl").value = item ? (item.targetUrl || "") : "";
  
  const statusBox = i("#topNavTranslateStatus");
  if (statusBox) {
    statusBox.hidden = true;
    statusBox.style.display = "none";
  }
  _switchTopNavLangTab("th");

  const iconInput = i("#topNavIcon");
  if (iconInput) iconInput.value = item ? (item.icon || "home") : "home";

  let nextOrder = 50;
  if (!item) {
    const existing = _getAllTopNavItemsForManager();
    const maxOrder = existing.reduce((max, x) => Math.max(max, Number(x.order) || 0), 0);
    nextOrder = maxOrder + 10;
  }
  i("#topNavOrder").value = item ? (item.order || 10) : nextOrder;
  i("#topNavPublished").checked = item ? (item.published !== false) : true;
  form.scrollIntoView({ behavior: "smooth" });
}

async function _saveTopNavItem(e) {
  e.preventDefault();
  if (!_checkIsAdmin()) {
    if (typeof B === "function") B("เฉพาะ Admin เท่านั้นที่จัดการเมนูได้", "error");
    else if (typeof A === "function") A("เฉพาะ Admin เท่านั้นที่จัดการเมนูได้", "error");
    return;
  }
  const idVal = i("#topNavEditId").value.trim();
  const id = idVal || ("nav-" + Date.now().toString(36));
  const docRef = j(_topNavCol, id);
  const iconVal = i("#topNavIcon") ? i("#topNavIcon").value : "home";
  const titleTh = i("#topNavTitleTh").value.trim();
  let titleLo = i("#topNavTitleLo") ? i("#topNavTitleLo").value.trim() : "";
  let titleEn = i("#topNavTitleEn") ? i("#topNavTitleEn").value.trim() : "";

  // Auto-translate if empty on save
  try {
    if (!titleLo && titleTh) titleLo = await ne(titleTh);
    if (!titleEn && titleTh) titleEn = await re(titleTh);
  } catch (err) {
    console.warn("Top nav auto-translate on save skipped:", err);
  }

  const payload = {
    titleTh: titleTh,
    titleLo: titleLo,
    title_lo: titleLo,
    titleEn: titleEn,
    title_en: titleEn,
    targetUrl: i("#topNavTargetUrl").value.trim(),
    icon: iconVal,
    order: Number(i("#topNavOrder").value) || 10,
    published: i("#topNavPublished").checked,
    updatedAt: I()
  };
  try {
    await V(docRef, payload, { merge: true });
    if (!L.topNav) L.topNav = [];
    const existingIndex = L.topNav.findIndex(x => x.id === id);
    if (existingIndex >= 0) {
      L.topNav[existingIndex] = { ...L.topNav[existingIndex], ...payload, id };
    } else {
      L.topNav.push({ ...payload, id });
    }
    _renderTopNavItems();
    _renderTopNavManagerList();
    A("บันทึกข้อมูลเมนูสำเร็จ", "success");
    i("#topNavEditForm").style.display = "none";
  } catch (err) {
    console.error("Save topNav error:", err);
    A("ไม่สามารถบันทึกเมนูได้: " + err.message, "error");
  }
}

async function _deleteTopNavItem(item) {
  if (!_checkIsAdmin()) {
    if (typeof B === "function") B("เฉพาะ Admin เท่านั้นที่ลบเมนูได้", "error");
    else if (typeof A === "function") A("เฉพาะ Admin เท่านั้นที่ลบเมนูได้", "error");
    return;
  }
  const actionName = item.isDefault ? "ซ่อนเมนู" : "ลบเมนู";
  if (!confirm(`คุณต้องการ${actionName} "${item.titleTh || item.title}" หรือไม่?`)) return;
  try {
    const docRef = j(_topNavCol, item.id);
    await V(docRef, { deletedAt: I(), published: false }, { merge: true });
    if (L.topNav) {
      const idx = L.topNav.findIndex(x => x.id === item.id);
      if (idx >= 0) L.topNav[idx].deletedAt = I();
    }
    _renderTopNavItems();
    _renderTopNavManagerList();
    A(`${actionName}เรียบร้อยแล้ว`, "success");
  } catch (err) {
    console.error("Delete topNav error:", err);
    A("ไม่สามารถดำเนินการได้: " + err.message, "error");
  }
}



/* ==========================================================================
   CENTER SECTIONS CMS (INLINE GEAR FOR HERO, STORY, MILESTONES, WORLD, ETC.)
   ========================================================================== */

function _checkIsAdmin() {
  const adminP = typeof Y === "function" && Y();
  const roleL = (L && L.role === "admin");
  const roleP = (typeof p !== "undefined" && p && p.role === "admin");
  const roleV = (typeof v !== "undefined" && v && v.role === "admin");
  const authUser = (typeof aa !== "undefined" && aa && aa.currentUser) || (typeof we !== "undefined" && we && we.currentUser) || (L && L.user) || (typeof p !== "undefined" && p && p.user) || (typeof v !== "undefined" && v && v.user);
  const emailUser = Boolean(authUser && authUser.email && authUser.email.toLowerCase() === "jaru072@gmail.com");
  let storageAdmin = false;
  try {
    for (let i = 0; i < localStorage.length; i++) {
      const k = localStorage.key(i);
      if (k && k.startsWith("firebase:authUser:")) {
        const d = JSON.parse(localStorage.getItem(k) || "{}");
        if (d && d.email && d.email.toLowerCase() === "jaru072@gmail.com") {
          storageAdmin = true;
          break;
        }
      }
    }
  } catch (_) {}
  return Boolean(adminP || roleL || roleP || roleV || emailUser || storageAdmin);
}

function _updateAdminDOMState() {
  if (typeof _bindRefreshButtons === "function") _bindRefreshButtons();
  const isAdmin = _checkIsAdmin();
  if (document.body) {
    document.body.classList.toggle("is-admin", isAdmin);
  }
  const adminEls = document.querySelectorAll(".portal-admin-only, .section-gear-btn, .admin-gear-btn, .rail-card-gear, .sidebar-item-gear, .topnav-gear-btn");
  adminEls.forEach(el => {
    el.hidden = !isAdmin;
    if (!isAdmin) {
      el.style.setProperty("display", "none", "important");
    } else {
      if (el.classList.contains("portal-refresh-btn") || el.id === "portalRefreshBtn") {
        el.style.setProperty("display", "inline-flex", "important");
      } else {
        el.style.removeProperty("display");
      }
    }
  });

  // Hide or show sidebar and rail toolbars (ปุ่มเพิ่มหัวข้อใหม่ และ ถังพัก ทั้งสองฝั่ง)
  const sidebarToolbar = document.getElementById("sidebarAdminToolbar");
  if (sidebarToolbar) {
    sidebarToolbar.hidden = !isAdmin;
    if (!isAdmin) {
      sidebarToolbar.style.setProperty("display", "none", "important");
    } else {
      sidebarToolbar.style.removeProperty("display");
    }
  }
  const railToolbar = document.getElementById("railAdminToolbar");
  if (railToolbar) {
    railToolbar.hidden = !isAdmin;
    if (!isAdmin) {
      railToolbar.style.setProperty("display", "none", "important");
    } else {
      railToolbar.style.removeProperty("display");
    }
  }
}

const _targetAliases = {
  storyFeature: "storyFeatureCard",
  storyArt: "storyArtCard",
  storyPeople: "storyPeopleCard",
  milestoneOne: "milestoneOneCard",
  milestoneTwo: "milestoneTwoCard",
  milestoneThree: "milestoneThreeCard",
  milestoneFour: "milestoneFourCard",
  criteriaOne: "criteriaOneCard",
  criteriaTwo: "criteriaTwoCard",
  criteriaThree: "criteriaThreeCard",
  processOne: "processOneCard",
  processTwo: "processTwoCard",
  processThree: "processThreeCard",
  processFour: "processFourCard",
  voices: "voices",
  muchalindaHero: "muchalindaHero",
  muchalindaShowcase: "muchalinda-history",
  muchalindaOverview: "muchalinda-history",
  muchalindaHistory: "muchalindaCardHistory",
  muchalindaCardHistory: "muchalindaCardHistory",
  muchalindaFacts: "muchalindaCardRestoration",
  muchalindaCardRestoration: "muchalindaCardRestoration",
  muchalindaObjectives: "muchalinda-objectives",
  objectiveOne: "objectiveOneCard",
  objectiveTwo: "objectiveTwoCard",
  objectiveThree: "objectiveThreeCard",
  muchalindaProgress: "muchalinda-progress",
  progressOne: "progressOneCard",
  progressTwo: "progressTwoCard",
  progressThree: "progressThreeCard",
  progressFour: "progressFourCard",
  muchalindaDonation: "muchalinda-donation",
  muchalindaAlbum: "muchalinda-album",
  donationOne: "donationOneCard",
  donationTwo: "donationTwoCard",
  footer: "siteFooter"
};

const _sectionNames = {
  hero: "ภาพและข้อความนำ (Hero)",
  projects: "โครงการเพื่อพระธาตุพนม (Projects)",
  status: "สถานะปัจจุบัน (Status)",
  history: "เรื่องราวแห่งศรัทธา (History - หัวข้อหลัก)",
  storyFeature: "เรื่องราว: พระอุรังคธาตุและความเชื่อ",
  storyArt: "เรื่องราว: ร่องรอยศิลปกรรม",
  storyPeople: "เรื่องราว: ศูนย์รวมผู้คน",
  milestones: "หมุดหมายสำคัญ (Milestones - หัวข้อหลัก)",
  milestoneOne: "หมุดหมาย 1: โครงสร้างยุคแรก",
  milestoneTwo: "หมุดหมาย 2: โบราณสถานของชาติ",
  milestoneThree: "หมุดหมาย 3: ล้มและฟื้นคืน",
  milestoneFour: "หมุดหมาย 4: ก้าวสู่เวทีโลก",
  "world-heritage": "สู่มรดกโลก (World Heritage - หัวข้อหลัก)",
  criteriaOne: "เกณฑ์คุณค่า 1: ผลงานสร้างสรรค์อันเป็นเลิศ",
  criteriaTwo: "เกณฑ์คุณค่า 2: การแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",
  criteriaThree: "เกณฑ์คุณค่า 3: สัมพันธ์กับความเชื่อที่ยังดำรงอยู่",
  processOne: "ขั้นตอน 1: กำหนดคุณค่าและขอบเขต",
  processTwo: "ขั้นตอน 2: จัดทำแผนอนุรักษ์และบริหาร",
  processThree: "ขั้นตอน 3: สร้างการมีส่วนร่วม",
  processFour: "ขั้นตอน 4: จัดทำเอกสารเสนอชื่อ",
  voices: "คำคมและเสียงสะท้อน (Quote)",
  videos: "ชมเรื่องราวพระธาตุพนม (วิดีโอ)",
  community: "ชุมชนและข้อเสนอแนะ",
  muchalindaHero: "สระมุจลินท์: หัวข้อและข้อความนำโครงการ (Hero)",
  muchalindaShowcase: "สระมุจลินท์: สื่อสไลด์ภาพและแนวคิดโครงการ",
  muchalindaHistory: "สระมุจลินท์: ความเป็นมาและความสำคัญ (หมุดหมาย 1)",
  muchalindaCardHistory: "สระมุจลินท์: ความเป็นมาและความสำคัญ (หมุดหมาย 1)",
  muchalindaFacts: "สระมุจลินท์: การฟื้นฟูและอนุรักษ์ภูมิทัศน์ (หมุดหมาย 2)",
  muchalindaCardRestoration: "สระมุจลินท์: การฟื้นฟูและอนุรักษ์ภูมิทัศน์ (หมุดหมาย 2)",
  muchalindaObjectives: "สระมุจลินท์: เป้าหมายการบูรณะ (หัวข้อ)",
  objectiveOne: "สระมุจลินท์ วัตถุประสงค์ 1: อนุรักษ์มรดก",
  objectiveTwo: "สระมุจลินท์ วัตถุประสงค์ 2: สร้างแหล่งเรียนรู้",
  objectiveThree: "สระมุจลินท์ วัตถุประสงค์ 3: สืบสานพุทธศรัทธา",
  muchalindaProgress: "สระมุจลินท์: ลำดับการดำเนินงาน (หัวข้อ)",
  progressOne: "สระมุจลินท์ ความคืบหน้า 1: เริ่มงานบูรณะ",
  progressTwo: "สระมุจลินท์ ความคืบหน้า 2: พิธีบวงสรวง",
  progressThree: "สระมุจลินท์ ความคืบหน้า 3: ปรับภูมิทัศน์สีเขียว",
  progressFour: "สระมุจลินท์ ความคืบหน้า 4: ดำเนินงานต่อเนื่อง",
  muchalindaDonation: "สระมุจลินท์: ร่วมบุญกับโครงการ (หัวข้อ)",
  donationOne: "สระมุจลินท์ ร่วมบุญ 1: บูรณะสระมุจลินท์",
  donationTwo: "สระมุจลินท์ ร่วมบุญ 2: สร้างถนนรอบสระมุจลินท์",
  muchalindaAlbum: "สระมุจลินท์: อัลบั้มรูปภาพผู้ร่วมบุญ (Google Drive)",
  footer: "ข้อมูลส่วนท้ายเว็บไซต์ (Footer)"
};

function _findSectionEl(id) {
  if (!id) return null;
  const alias = _targetAliases[id] || id;
  let el = document.getElementById(alias) || document.getElementById(id);
  if (el) return el;
  const btn = document.querySelector('[data-section-target="' + id + '"]') || document.querySelector('[data-section-target="' + alias + '"]');
  if (btn) {
    el = btn.closest(".story-feature-card, .story-mini-card, .milestone-media-card, .criteria-media-card, .process-step-card, article, li, section, aside, footer, blockquote, div.milestones-overview-media, div.hero-photo, div");
    if (el) return el;
  }
  return document.querySelector('.' + id) || document.querySelector('.' + alias);
}

function _renderSiteSectionsCMS() {
  const isAdmin = _checkIsAdmin();
  _updateAdminDOMState();
  if (!L.siteSections || L.siteSections.length === 0) {
    try {
      const cached = localStorage.getItem("thatphanom_site_sections_cache");
      if (cached) {
        L.siteSections = JSON.parse(cached);
      }
    } catch (_) {}
  }
  if (!L.siteSections || L.siteSections.length === 0) return;

  const rawLang = (document.documentElement.lang || "th").toLowerCase();
  const curLang = rawLang.startsWith("lo") ? "lo" : (rawLang.startsWith("en") ? "en" : "th");
  const dict = (window.I18N_LANGS && window.I18N_LANGS[curLang]?.dict) || (curLang === "lo" ? window.I18N_LO : curLang === "en" ? window.I18N_EN : window.I18N_TH) || {};

  L.siteSections.forEach(sec => {
    if (!sec || !sec.id) return;
    const sectionEl = _findSectionEl(sec.id);
    if (!sectionEl) return;

    let placeholderBar = document.getElementById('placeholder-' + sec.id);
    if (sec.published === false) {
      sectionEl.hidden = true;
      sectionEl.style.setProperty("display", "none", "important");
      if (!isAdmin) {
        if (placeholderBar) placeholderBar.style.setProperty("display", "none", "important");
        return;
      } else {
        if (!placeholderBar && (sectionEl.tagName === "SECTION" || sectionEl.tagName === "ARTICLE" || sectionEl.tagName === "LI")) {
          placeholderBar = document.createElement("div");
          placeholderBar.id = 'placeholder-' + sec.id;
          placeholderBar.className = "portal-admin-only cms-hidden-section-notice";
          placeholderBar.style.cssText = "display:flex; justify-content:space-between; align-items:center; background:#fffbe6; border:1.5px dashed #faad14; border-radius:10px; padding:12px 20px; margin:16px auto; max-width:1180px; box-shadow:0 2px 8px rgba(0,0,0,0.05);";
          const sName = _sectionNames[sec.id] || sec.title || sec.id;
          placeholderBar.innerHTML = '<div style="display:flex; align-items:center; gap:12px;"><span style="font-size:1.3rem;">👁️</span><div><strong style="color:#d46b08; font-size:0.95rem; display:block;">[ซ่อนการแสดงผล] ' + sName + '</strong><span style="color:#8c6114; font-size:0.8rem;">ส่วนนี้ถูกปิดการแสดงผลบนเว็บไซต์ (บุคคลทั่วไปมองไม่เห็น)</span></div></div><button class="section-gear-btn admin-gear-btn portal-admin-only" type="button" data-section-target="' + sec.id + '" title="ตั้งค่า/เปิดแสดงผลส่วนนี้" style="position:static !important; width:38px !important; height:38px !important; font-size:1.15rem !important;">⚙</button>';
          sectionEl.parentNode.insertBefore(placeholderBar, sectionEl.nextSibling);
        } else if (placeholderBar) {
          placeholderBar.style.removeProperty("display");
          placeholderBar.hidden = false;
        }
        return;
      }
    } else {
      sectionEl.hidden = false;
      sectionEl.style.removeProperty("display");
      if (placeholderBar) {
        placeholderBar.style.setProperty("display", "none", "important");
        placeholderBar.hidden = true;
      }
    }

    const hasTitle = (curLang === "lo" ? typeof sec.title_lo === "string" : (curLang === "en" ? typeof sec.title_en === "string" : typeof sec.title === "string"));
    const targetTitle = (curLang === "lo" && typeof sec.title_lo === "string") ? sec.title_lo : ((curLang === "en" && typeof sec.title_en === "string") ? sec.title_en : (typeof sec.title === "string" ? sec.title : ""));

    const hasKicker = (curLang === "lo" ? typeof sec.kicker_lo === "string" : (curLang === "en" ? typeof sec.kicker_en === "string" : typeof sec.kicker === "string"));
    const targetKicker = (curLang === "lo" && typeof sec.kicker_lo === "string") ? sec.kicker_lo : ((curLang === "en" && typeof sec.kicker_en === "string") ? sec.kicker_en : (typeof sec.kicker === "string" ? sec.kicker : ""));

    const hasContent = (curLang === "lo" ? typeof sec.content_lo === "string" : (curLang === "en" ? typeof sec.content_en === "string" : typeof sec.content === "string"));
    const targetContent = (curLang === "lo" && typeof sec.content_lo === "string") ? sec.content_lo : ((curLang === "en" && typeof sec.content_en === "string") ? sec.content_en : (typeof sec.content === "string" ? sec.content : ""));

    // 1. Title
    if (hasTitle) {
      if (sec.id === "muchalindaHero" || sec.id === "muchalindaShowcase") {
        const titleTargets = [];
        const mainH2 = document.getElementById("muchalindaProjectTitle");
        if (mainH2) titleTargets.push(mainH2);
        document.querySelectorAll("[data-i18n='muchalindaTitle']").forEach(el => titleTargets.push(el));
        const mHist = document.getElementById("muchalinda-history");
        if (mHist) {
          mHist.querySelectorAll(".media-caption h4, h4").forEach(el => titleTargets.push(el));
        }
        titleTargets.forEach(el => {
          if (!el) return;
          el.textContent = targetTitle;
          if (targetTitle.trim() === "") {
            el.style.display = "none";
          } else {
            el.style.removeProperty("display");
          }
        });
        if (window.I18N_TH) window.I18N_TH["muchalindaTitle"] = targetTitle;
        if (window.I18N_LANGS) {
          if (window.I18N_LANGS.th?.dict) window.I18N_LANGS.th.dict["muchalindaTitle"] = sec.title || targetTitle;
          if (window.I18N_LANGS.lo?.dict) window.I18N_LANGS.lo.dict["muchalindaTitle"] = sec.title_lo || sec.title || targetTitle;
          if (window.I18N_LANGS.en?.dict) window.I18N_LANGS.en.dict["muchalindaTitle"] = sec.title_en || sec.title || targetTitle;
        }
      } else if (sec.id === "voices") {
        const p = sectionEl.querySelector("blockquote p, p");
        if (p) p.textContent = targetTitle;
      } else if (sec.id === "footer") {
        const strong = sectionEl.querySelector(".footer-brand strong");
        if (strong) strong.textContent = targetTitle;
      } else {
        let hTitle = null;
        if (sectionEl.id === "status" || sec.id === "status") {
          hTitle = sectionEl.querySelector("h2[data-i18n='statusTitle'], h2, h1, .status-title");
        } else if (sectionEl.classList.contains("milestones-overview-media")) {
          hTitle = sectionEl.querySelector(".media-caption h4, .media-caption strong, .media-caption");
        } else {
          hTitle = sectionEl.querySelector(".milestone-card-copy strong, .process-step-copy strong, .criteria-card-copy h3, .story-feature-copy h3, .story-mini-copy h3, .timeline-head h2, .section-heading h2, .section-head h2, h1, h2, h3, h4, strong[data-i18n]");
        }
        if (hTitle) {
          hTitle.textContent = targetTitle;
          if (targetTitle.trim() === "") {
            hTitle.style.display = "none";
          } else {
            hTitle.style.removeProperty("display");
          }
          const i18nKey = hTitle.getAttribute("data-i18n") || (sec.id === "status" ? "statusTitle" : null);
          if (i18nKey) {
            if (window.I18N_TH) {
              if (typeof sec.title === "string") window.I18N_TH[i18nKey] = sec.title;
              else window.I18N_TH[i18nKey] = targetTitle;
            }
            if (window.I18N_LANGS) {
              if (window.I18N_LANGS.th?.dict && typeof sec.title === "string") window.I18N_LANGS.th.dict[i18nKey] = sec.title;
              if (window.I18N_LANGS.lo?.dict && typeof sec.title_lo === "string") window.I18N_LANGS.lo.dict[i18nKey] = sec.title_lo || sec.title;
              if (window.I18N_LANGS.en?.dict && typeof sec.title_en === "string") window.I18N_LANGS.en.dict[i18nKey] = sec.title_en || sec.title;
            }
          }
        }
      }
    }
    // 2. Kicker / time / number
    if (hasKicker) {
      if (sec.id === "muchalindaHero" || sec.id === "muchalindaShowcase") {
        const kickerTargets = [
          ...document.querySelectorAll("[data-i18n='supportingWorldHeritage'], .support-project-parent")
        ];
        kickerTargets.forEach(el => {
          if (!el) return;
          el.textContent = targetKicker;
          if (targetKicker.trim() === "") {
            el.style.display = "none";
          } else {
            el.style.removeProperty("display");
          }
        });
        if (window.I18N_TH) window.I18N_TH["supportingWorldHeritage"] = targetKicker;
        if (window.I18N_LANGS) {
          if (window.I18N_LANGS.th?.dict) window.I18N_LANGS.th.dict["supportingWorldHeritage"] = sec.kicker || targetKicker;
          if (window.I18N_LANGS.lo?.dict) window.I18N_LANGS.lo.dict["supportingWorldHeritage"] = sec.kicker_lo || sec.kicker || targetKicker;
          if (window.I18N_LANGS.en?.dict) window.I18N_LANGS.en.dict["supportingWorldHeritage"] = sec.kicker_en || sec.kicker || targetKicker;
        }
      } else if (sec.id === "footer") {
        const span = sectionEl.querySelector(".footer-brand span, span[data-i18n='footerSub']");
        if (span) span.textContent = targetKicker;
      } else if (sec.id !== "voices") {
        let kickerEl = null;
        if (sectionEl.id === "status" || sec.id === "status") {
          kickerEl = sectionEl.querySelector("p[data-i18n='statusLabel'], p.status-label, p.kicker");
        } else {
          kickerEl = sectionEl.querySelector(".support-project-parent, .milestone-card-copy time, .milestone-card-copy .kicker, .timeline-head .kicker, .section-heading .kicker, .section-head .kicker, .hero-copy .eyebrow, .kicker, .eyebrow, time, .donation-badge, [data-i18n*='Kicker'], [data-i18n*='kicker']");
        }
        if (kickerEl) {
          kickerEl.textContent = targetKicker;
          if (targetKicker.trim() === "") {
            kickerEl.style.display = "none";
          } else {
            kickerEl.style.removeProperty("display");
          }
          const i18nKey = kickerEl.getAttribute("data-i18n") || (sec.id === "status" ? "statusLabel" : null);
          if (i18nKey) {
            if (window.I18N_TH) {
              if (typeof sec.kicker === "string") window.I18N_TH[i18nKey] = sec.kicker;
              else window.I18N_TH[i18nKey] = targetKicker;
            }
            if (window.I18N_LANGS) {
              if (window.I18N_LANGS.th?.dict && typeof sec.kicker === "string") window.I18N_LANGS.th.dict[i18nKey] = sec.kicker;
              if (window.I18N_LANGS.lo?.dict && typeof sec.kicker_lo === "string") window.I18N_LANGS.lo.dict[i18nKey] = sec.kicker_lo || sec.kicker;
              if (window.I18N_LANGS.en?.dict && typeof sec.kicker_en === "string") window.I18N_LANGS.en.dict[i18nKey] = sec.kicker_en || sec.kicker;
            }
          }
        }
      }
    }
    // 3. Content / description / note
    if (hasContent) {
      if (sec.id === "muchalindaHero" || sec.id === "muchalindaShowcase") {
        const descTargets = [
          ...document.querySelectorAll("[data-i18n='muchalindaLead'], .support-project-lead")
        ];
        const mHist = document.getElementById("muchalinda-history");
        if (mHist) {
          mHist.querySelectorAll(".media-caption p, p.media-caption-desc").forEach(p => descTargets.push(p));
        }
        descTargets.forEach(el => {
          if (!el) return;
          el.textContent = targetContent;
          if (targetContent.trim() === "") {
            el.style.display = "none";
          } else {
            el.style.removeProperty("display");
          }
        });
        if (window.I18N_TH) window.I18N_TH["muchalindaLead"] = targetContent;
        if (window.I18N_LANGS) {
          if (window.I18N_LANGS.th?.dict) window.I18N_LANGS.th.dict["muchalindaLead"] = sec.content || targetContent;
          if (window.I18N_LANGS.lo?.dict) window.I18N_LANGS.lo.dict["muchalindaLead"] = sec.content_lo || sec.content || targetContent;
          if (window.I18N_LANGS.en?.dict) window.I18N_LANGS.en.dict["muchalindaLead"] = sec.content_en || sec.content || targetContent;
        }
      } else if (sec.id === "footer") {
        const note = sectionEl.querySelector("p.note, .note");
        if (note) note.textContent = targetContent;
      } else if (sec.id === "voices") {
        const p = sectionEl.querySelector("blockquote p, p");
        if (p) p.textContent = targetContent;
      } else {
        let descEl = null;
        if (sectionEl.id === "muchalinda-history" || sectionEl.classList.contains("muchalinda-overview-media") || sectionEl.classList.contains("milestones-overview-media")) {
          descEl = sectionEl.querySelector(".media-caption p, p.lead, p[data-i18n='muchalindaLead'], p");
          if (!descEl && targetContent) {
            const cap = sectionEl.querySelector(".media-caption");
            if (cap) {
              descEl = cap.querySelector("p");
              if (!descEl) {
                descEl = document.createElement("p");
                descEl.style.cssText = "margin:4px 0 0;font-size:0.75rem;line-height:1.45;color:#f0ecf6;opacity:0.95;";
                cap.appendChild(descEl);
              }
            }
          }
        } else if (sectionEl.id === "milestones") {
          descEl = sectionEl.querySelector(".timeline-head p[data-i18n='timelineIntro'], .timeline-head p:not(.kicker), .section-heading p.lead, .section-heading p:not(.kicker)");
        } else if (sectionEl.id === "world-heritage") {
          descEl = sectionEl.querySelector(".world-head .section-description, .section-description, p.lead");
        } else if (sectionEl.id === "status" || sec.id === "status") {
          descEl = sectionEl.querySelector("p[data-i18n='statusText'], p:not(.kicker):not(.status-label)");
        } else if (sectionEl.id === "muchalinda-objectives" || sec.id === "muchalindaObjectives" || sec.id === "objectiveOne" || sec.id === "objectiveTwo" || sec.id === "objectiveThree") {
          descEl = sectionEl.querySelector("p[data-i18n*='objective'], p");
        } else if (sec.id && sec.id.startsWith("progress")) {
          descEl = sectionEl.querySelector("span[data-i18n*='projectTime'], span, p");
        } else {
          descEl = sectionEl.querySelector(".support-project-lead, .milestone-card-copy span, .milestone-card-copy p, .process-step-copy span, .process-step-copy p, .criteria-card-copy p, .story-feature-copy p, .story-mini-copy p, .hero-copy p.lead, p.lead, .section-description, span[data-i18n*='Text'], p[data-i18n*='Text'], p[data-i18n*='Intro'], p[data-i18n*='Desc']");
          if (!descEl) {
            descEl = sectionEl.querySelector("p:not(.kicker):not(.eyebrow):not(.feature-no):not(.status-label), span:not(.feature-no):not([aria-hidden])");
          }
        }
        if (descEl) {
          descEl.textContent = targetContent;
          if (targetContent.trim() === "") {
            descEl.style.display = "none";
          } else {
            descEl.style.removeProperty("display");
          }
          const i18nKey = descEl.getAttribute("data-i18n") || (sec.id === "status" ? "statusText" : null);
          if (i18nKey) {
            if (window.I18N_TH) {
              if (typeof sec.content === "string") window.I18N_TH[i18nKey] = sec.content;
              else window.I18N_TH[i18nKey] = targetContent;
            }
            if (window.I18N_LANGS) {
              if (window.I18N_LANGS.th?.dict && typeof sec.content === "string") window.I18N_LANGS.th.dict[i18nKey] = sec.content;
              if (window.I18N_LANGS.lo?.dict && typeof sec.content_lo === "string") window.I18N_LANGS.lo.dict[i18nKey] = sec.content_lo || sec.content;
              if (window.I18N_LANGS.en?.dict && typeof sec.content_en === "string") window.I18N_LANGS.en.dict[i18nKey] = sec.content_en || sec.content;
            }
          }
        }
        // Update or clear media captions inside slider
        const captions = sectionEl.querySelectorAll(".media-caption");
        captions.forEach(cap => {
          let capDesc = cap.querySelector(".media-caption-desc, p");
          if (targetContent) {
            if (capDesc) {
              capDesc.textContent = targetContent;
              capDesc.style.display = "";
            } else {
              capDesc = document.createElement("p");
              capDesc.className = "media-caption-desc";
              capDesc.textContent = targetContent;
              cap.appendChild(capDesc);
            }
          } else {
            if (capDesc) {
              capDesc.textContent = "";
              capDesc.style.display = "none";
            }
          }
        });
      }
    }
    // 4. Image
    if (sec.imageUrl) {
      const imgEl = sectionEl.querySelector("img.hero-cover, img.story-cover, img.section-cover, .media-slide.active img, img");
      if (imgEl) {
        imgEl.src = sec.imageUrl;
        const pLink = imgEl.closest("a");
        if (pLink) { if (pLink.classList.contains("donation-card-media-link") || !sec.actionUrl) pLink.href = sec.imageUrl; }
      }
    }

    // 5. Action URL
    if (typeof sec.actionUrl === "string") {
      const trimmedAction = sec.actionUrl.trim();
      const actionBtns = sectionEl.querySelectorAll("a.donation-card-action-btn, a.source-link, a.action-link, a.button");
      const cardFooters = sectionEl.querySelectorAll(".donation-card-footer");
      if (!trimmedAction) {
        sectionEl.classList.add("no-action-btn");
        sectionEl.setAttribute("data-has-action", "false");
        actionBtns.forEach(el => {
          if (el.classList.contains("donation-card-action-btn") || el.classList.contains("source-link") || el.classList.contains("button")) {
            el.style.setProperty("display", "none", "important");
          }
        });
        cardFooters.forEach(cf => {
          cf.style.setProperty("display", "none", "important");
          cf.style.setProperty("margin", "0", "important");
          cf.style.setProperty("padding", "0", "important");
          cf.style.setProperty("border", "none", "important");
          cf.style.setProperty("height", "0", "important");
        });
      } else {
        sectionEl.classList.remove("no-action-btn");
        sectionEl.setAttribute("data-has-action", "true");
        actionBtns.forEach(el => {
          el.href = trimmedAction;
          el.style.removeProperty("display");
        });
        cardFooters.forEach(cf => {
          cf.style.removeProperty("display");
          cf.style.removeProperty("margin");
          cf.style.removeProperty("padding");
          cf.style.removeProperty("border");
          cf.style.removeProperty("height");
        });
      }
    }
  });
}
window.renderSiteSectionsCMS = _renderSiteSectionsCMS;

function _openSectionEditor(sectionTargetId) {
  if (!_checkIsAdmin()) return;
  const dlg = document.getElementById("sectionEditorDialog");
  if (!dlg) return;

  const sectionEl = _findSectionEl(sectionTargetId);
  const secData = (L.siteSections || []).find(s => s.id === sectionTargetId) ||
    (sectionTargetId === "muchalindaCardHistory" ? (L.siteSections || []).find(s => s.id === "muchalindaHistory") : null) ||
    (sectionTargetId === "muchalindaCardRestoration" ? (L.siteSections || []).find(s => s.id === "muchalindaFacts") : null) || {};

  const targetInput = document.getElementById("sectionEditorTargetId");
  const subtitleEl = document.getElementById("sectionEditorSubtitle");
  const statusEl = document.getElementById("sectionEditorStatus");
  const titleInput = document.getElementById("sectionEditorTitleInput");
  const kickerInput = document.getElementById("sectionEditorKicker");
  const contentInput = document.getElementById("sectionEditorContent");
  const imageInput = document.getElementById("sectionEditorImageUrl");
  const actionInput = document.getElementById("sectionEditorActionUrl");
  const pubCheckbox = document.getElementById("sectionEditorPublished");

  const sectionLabel = _sectionNames[sectionTargetId] || sectionTargetId;
  if (targetInput) targetInput.value = sectionTargetId;
  if (subtitleEl) subtitleEl.textContent = "แก้ไขข้อมูลสำหรับ: " + sectionLabel;
  if (statusEl) {
    statusEl.style.display = "none";
    statusEl.textContent = "";
  }

  let currentTitle = typeof secData.title === "string" ? secData.title : null;
  let currentKicker = typeof secData.kicker === "string" ? secData.kicker : null;
  let currentContent = typeof secData.content === "string" ? secData.content : null;
  let currentImage = typeof secData.imageUrl === "string" ? secData.imageUrl : null;
  let currentAction = typeof secData.actionUrl === "string" ? secData.actionUrl : null;

  if (sectionEl) {
    if (currentTitle === null) {
      if (sectionTargetId === "muchalindaHero") {
        currentTitle = document.getElementById("muchalindaProjectTitle")?.textContent || "";
      } else if (sectionTargetId === "muchalindaShowcase" || sectionTargetId === "muchalinda-history") {
        currentTitle = sectionEl.querySelector(".media-caption h4, h4")?.textContent || "";
      } else if (sectionTargetId === "muchalindaAlbum" || sectionEl.id === "muchalinda-album") { currentTitle = sectionEl.querySelector("#muchalindaAlbumTitle, h3, h2")?.textContent || ""; } else if (sectionTargetId === "muchalindaAlbum" || sectionEl.id === "muchalinda-album") { currentKicker = sectionEl.querySelector(".donation-badge, p.kicker")?.textContent || ""; } else if (sectionTargetId === "muchalindaAlbum" || sectionEl.id === "muchalinda-album") { currentContent = sectionEl.querySelector(".album-lead, p")?.textContent || ""; } else if (sectionTargetId === "status" || sectionEl.id === "status") {
        currentTitle = sectionEl.querySelector("h2[data-i18n='statusTitle'], h2, h1, .status-title")?.textContent || "";
      } else if (sectionTargetId === "voices") {
        currentTitle = sectionEl.querySelector("blockquote p, p")?.textContent || "";
      } else if (sectionTargetId === "footer") {
        currentTitle = sectionEl.querySelector(".footer-brand strong")?.textContent || "";
      } else if (sectionEl.classList.contains("milestones-overview-media")) {
        currentTitle = sectionEl.querySelector(".media-caption h4, .media-caption strong, .media-caption")?.textContent || "";
      } else {
        currentTitle = sectionEl.querySelector(".milestone-card-copy strong, .process-step-copy strong, .criteria-card-copy h3, .story-feature-copy h3, .story-mini-copy h3, .timeline-head h2, .section-heading h2, .section-head h2, h1, h2, h3, h4, strong[data-i18n], strong, .section-title, .hero-title")?.textContent || "";
      }
    }
    if (currentKicker === null) {
      if (sectionTargetId === "muchalindaHero" || sectionTargetId === "muchalindaShowcase") {
        currentKicker = sectionEl.querySelector(".support-project-parent, p.kicker")?.textContent || "";
      } else if (sectionTargetId === "status" || sectionEl.id === "status") {
        currentKicker = sectionEl.querySelector("p[data-i18n='statusLabel'], p.status-label, p.kicker")?.textContent || "";
      } else if (sectionTargetId === "footer") {
        currentKicker = sectionEl.querySelector(".footer-brand span, span[data-i18n='footerSub']")?.textContent || "";
      } else if (sectionTargetId === "voices") {
        currentKicker = "คำคมและเสียงสะท้อน";
      } else {
        currentKicker = sectionEl.querySelector(".support-project-parent, .milestone-card-copy time, .milestone-card-copy .kicker, .timeline-head .kicker, .section-heading .kicker, .section-head .kicker, .hero-copy .eyebrow, .kicker, .eyebrow, .hero-kicker, .status-label, time, .feature-no, .criteria-number, .donation-badge")?.textContent || "";
      }
    }
    if (currentContent === null) {
      if (sectionTargetId === "muchalindaHero") {
        currentContent = sectionEl.querySelector(".support-project-lead, p.lead")?.textContent || "";
      } else if (sectionTargetId === "muchalindaShowcase" || sectionEl.id === "muchalinda-history") {
        currentContent = sectionEl.querySelector(".media-caption p, p.lead, p[data-i18n='muchalindaLead'], p")?.textContent || "";
      } else if (sectionTargetId === "status" || sectionEl.id === "status") {
        currentContent = sectionEl.querySelector("p[data-i18n='statusText'], p:not(.kicker):not(.status-label)")?.textContent || "";
      } else if (sectionTargetId === "footer") {
        currentContent = sectionEl.querySelector("p.note, .note")?.textContent || "";
      } else if (sectionTargetId === "voices") {
        currentContent = sectionEl.querySelector("blockquote p, p")?.textContent || "";
      } else if (sectionEl.classList.contains("muchalinda-overview-media") || sectionEl.classList.contains("milestones-overview-media")) {
        currentContent = sectionEl.querySelector(".media-caption p, p.lead, p[data-i18n='muchalindaLead'], p")?.textContent || "";
      } else if (sectionEl.id === "milestones") {
        currentContent = sectionEl.querySelector(".timeline-head p[data-i18n='timelineIntro'], .timeline-head p:not(.kicker), .section-heading p.lead")?.textContent || "";
      } else if (sectionEl.id === "world-heritage") {
        currentContent = sectionEl.querySelector(".world-head .section-description, .section-description, p.lead")?.textContent || "";
      } else {
        currentContent = sectionEl.querySelector(".support-project-lead, p[data-i18n='muchalindaLead'], .milestone-card-copy span, .milestone-card-copy p, .process-step-copy span, .process-step-copy p, .criteria-card-copy p, .story-feature-copy p, .story-mini-copy p, .hero-copy p.lead, p.lead, .section-description, span[data-i18n*='Text'], p[data-i18n*='Text'], p[data-i18n*='Intro'], p[data-i18n*='Desc']")?.textContent || sectionEl.querySelector("p:not(.kicker):not(.eyebrow):not(.feature-no):not(.status-label), span:not(.feature-no):not([aria-hidden])")?.textContent || "";
      }
    }
    if (currentImage === null) {
      currentImage = sectionEl.querySelector("img")?.src || "";
    }
    if (currentAction === null) {
      currentAction = sectionEl.querySelector("a.donation-card-action-btn, a.source-link, a.action-link, a.button, a")?.href || "";
    }
  }

  if (titleInput) titleInput.value = currentTitle !== null ? currentTitle.trim() : "";
  if (kickerInput) kickerInput.value = currentKicker.trim();
  if (contentInput) contentInput.value = currentContent.trim();

  const kickerLo = document.getElementById("sectionEditorKickerLo");
  const kickerEn = document.getElementById("sectionEditorKickerEn");
  const titleLo = document.getElementById("sectionEditorTitleLo");
  const titleEn = document.getElementById("sectionEditorTitleEn");
  const contentLo = document.getElementById("sectionEditorContentLo");
  const contentEn = document.getElementById("sectionEditorContentEn");

  if (kickerLo) kickerLo.value = secData.kicker_lo || "";
  if (kickerEn) kickerEn.value = secData.kicker_en || "";
  if (titleLo) titleLo.value = secData.title_lo || "";
  if (titleEn) titleEn.value = secData.title_en || "";
  if (contentLo) contentLo.value = secData.content_lo || "";
  if (contentEn) contentEn.value = secData.content_en || "";

  if (typeof _switchSecLangTab === "function") _switchSecLangTab("th");

  if (imageInput) imageInput.value = currentImage;
  if (actionInput) actionInput.value = currentAction;
  if (pubCheckbox) pubCheckbox.checked = (secData.published !== false);

  dlg.showModal();
}
function _closeSectionEditor() {
  const dlg = document.getElementById("sectionEditorDialog");
  if (dlg) dlg.close();
}
async function _saveSectionEditor(e) {
  if (e && typeof e.preventDefault === "function") e.preventDefault();
  const statusEl = document.getElementById("sectionEditorStatus");
  const form = document.getElementById("sectionEditorForm");
  const submitBtn = form ? form.querySelector("button[type=submit]") : null;
  const currentAuth = (typeof aa !== "undefined" && aa && aa.currentUser) || (typeof we !== "undefined" && we && we.currentUser);
  const authUser = currentAuth || (L && L.user);

  if (!_checkIsAdmin()) {
    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.style.background = "#fff1f0";
      statusEl.style.color = "#cf1322";
      statusEl.style.border = "1px solid #ffa39e";
      statusEl.textContent = "เฉพาะ Admin เท่านั้นที่สามารถแก้ไขเนื้อหาได้ กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแล (jaru072@gmail.com)";
    }
    if (typeof B === "function") B("กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลก่อนทำการบันทึก", "error");
    else if (typeof A === "function") A("กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลก่อนทำการบันทึก", "error");
    return;
  }

  const sectionId = (document.getElementById("sectionEditorTargetId")?.value || "").trim();
  if (!sectionId) {
    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.style.background = "#fff1f0";
      statusEl.style.color = "#cf1322";
      statusEl.textContent = "ไม่พบรหัสส่วนเนื้อหาที่ต้องการบันทึก";
    }
    return;
  }

  const titleVal = (document.getElementById("sectionEditorTitleInput")?.value || "").trim();

  if (submitBtn) {
    submitBtn.disabled = true;
    submitBtn.textContent = "กำลังบันทึกข้อมูล...";
  }
  if (statusEl) {
    statusEl.style.display = "block";
    statusEl.style.background = "#e6f7ff";
    statusEl.style.color = "#0958d9";
    statusEl.style.border = "1px solid #91caff";
    statusEl.textContent = "กำลังบันทึกข้อมูลเข้าสู่ฐานข้อมูลคลาวด์...";
  }

  const pubChecked = document.getElementById("sectionEditorPublished") ? document.getElementById("sectionEditorPublished").checked : true;
  const payload = {
    id: sectionId,
    title: titleVal,
    title_lo: (document.getElementById("sectionEditorTitleLo")?.value || "").trim(),
    title_en: (document.getElementById("sectionEditorTitleEn")?.value || "").trim(),
    kicker: (document.getElementById("sectionEditorKicker")?.value || "").trim(),
    kicker_lo: (document.getElementById("sectionEditorKickerLo")?.value || "").trim(),
    kicker_en: (document.getElementById("sectionEditorKickerEn")?.value || "").trim(),
    content: (document.getElementById("sectionEditorContent")?.value || "").trim(),
    content_lo: (document.getElementById("sectionEditorContentLo")?.value || "").trim(),
    content_en: (document.getElementById("sectionEditorContentEn")?.value || "").trim(),
    imageUrl: (document.getElementById("sectionEditorImageUrl")?.value || "").trim(),
    actionUrl: (document.getElementById("sectionEditorActionUrl")?.value || "").trim(),
    published: Boolean(pubChecked),
    updatedAt: (typeof I === "function" ? I() : new Date().toISOString())
  };

  try {
    if (!L.siteSections) L.siteSections = [];
    const saveKeys = [sectionId];
    if (sectionId === "muchalindaCardHistory") saveKeys.push("muchalindaHistory");
    if (sectionId === "muchalindaHistory") saveKeys.push("muchalindaCardHistory");
    if (sectionId === "muchalindaCardRestoration") saveKeys.push("muchalindaFacts");
    if (sectionId === "muchalindaFacts") saveKeys.push("muchalindaCardRestoration");
    if (sectionId === "muchalindaHero") saveKeys.push("muchalindaShowcase");
    if (sectionId === "muchalindaShowcase") saveKeys.push("muchalindaHero");

    saveKeys.forEach(k => {
      const itemPayload = { ...payload, id: k };
      const idx = L.siteSections.findIndex(s => s.id === k);
      if (idx >= 0) {
        L.siteSections[idx] = { ...L.siteSections[idx], ...itemPayload };
      } else {
        L.siteSections.push(itemPayload);
      }
    });

    try {
      localStorage.setItem("thatphanom_site_sections_cache", JSON.stringify(L.siteSections));
    } catch (_) {}
    _renderSiteSectionsCMS();

    for (const k of saveKeys) {
      const itemPayload = { ...payload, id: k };
      const docRef = j(_siteSectionsCol, k);
      await V(docRef, itemPayload, { merge: true });
      try {
        const projDocRef = j(pn, "siteSections", k);
        await V(projDocRef, itemPayload, { merge: true });
      } catch (e) {
        console.warn("Syncing section to project doc:", e);
      }
    }

    if (typeof B === "function") B("บันทึกข้อมูลส่วนเนื้อหาสำเร็จ", "success");
    else if (typeof A === "function") A("บันทึกข้อมูลส่วนเนื้อหาสำเร็จ", "success");
    _closeSectionEditor();
  } catch (err) {
    console.warn("Save section CMS warning:", err);
    if (statusEl) {
      statusEl.style.display = "block";
      statusEl.style.background = "#fffbe6";
      statusEl.style.color = "#d46b08";
      statusEl.style.border = "1px solid #ffe58f";
      statusEl.textContent = "บันทึกการแสดงผลแล้ว (หากต้องการบันทึกสู่คลาวด์ ต้องใช้สิทธิ์ผู้ดูแลระบบ jaru072@gmail.com)";
    }
    if (typeof B === "function") B("บันทึกการแสดงผลแล้ว (การซิงก์คลาวด์ต้องใช้สิทธิ์ผู้ดูแล)", "info");
    else if (typeof A === "function") A("บันทึกการแสดงผลแล้ว (การซิงก์คลาวด์ต้องใช้สิทธิ์ผู้ดูแล)", "info");
    _closeSectionEditor();
  } finally {
    if (submitBtn) {
      submitBtn.disabled = false;
      submitBtn.textContent = "💾 บันทึกข้อมูลส่วนนี้";
    }
  }
}

/* ==========================================================================
   BACKUP & RESTORE ENHANCEMENT FOR NEW CMS COLLECTIONS
   ========================================================================== */
// Wire up new collections to backup export
const _originalExportFullBackup = typeof _handleExportFullBackup === "function" ? _handleExportFullBackup : null;

// Attach click listeners for all gear buttons
// Bulletproof delegated CMS UI events and manual refresh
function _bindRefreshButtons() {
  const refBtns = [
    document.getElementById("portalRefreshBtn"),
    document.getElementById("sidebarRefreshBtn"),
    document.getElementById("railRefreshBtn")
  ].filter(Boolean);
  refBtns.forEach(b => {
    if (!b._hasDirectRefreshListener) {
      b._hasDirectRefreshListener = true;
      b.addEventListener("click", (e) => {
        e.preventDefault();
        e.stopPropagation();
        _handleManualRefresh();
      });
      b.addEventListener("touchend", (e) => {
        e.preventDefault();
        e.stopPropagation();
        _handleManualRefresh();
      });
    }
  });
}

async function _handleManualRefresh() {
  const btns = [
    document.getElementById("portalRefreshBtn"),
    document.getElementById("sidebarRefreshBtn"),
    document.getElementById("railRefreshBtn")
  ].filter(Boolean);
  
  btns.forEach(b => {
    b.classList.add("is-refreshing");
    b.disabled = true;
  });
  
  try {
    const tasks = [];

    // 1. Fetch siteSections directly from Firestore
    if (typeof _siteSectionsCol !== "undefined" && typeof Se === "function") {
      tasks.push(
        Se(_siteSectionsCol).then(snap => {
          if (snap) {
            L.siteSections = snap.docs.map(r => ({ id: r.id, ...r.data() }));
            try {
              localStorage.setItem("thatphanom_site_sections_cache", JSON.stringify(L.siteSections));
            } catch (_) {}
          }
        }).catch(err => console.warn("Refresh siteSections failed:", err))
      );
    }

    // 2. Fetch topNavItems directly from Firestore
    if (typeof _topNavCol !== "undefined" && typeof Se === "function") {
      tasks.push(
        Se(_topNavCol).then(snap => {
          if (snap) {
            L.topNav = snap.docs.map(r => ({ id: r.id, ...r.data() })).filter(r => !r.deletedAt).sort((x, y) => (Number(x.order) || 0) - (Number(y.order) || 0));
          }
        }).catch(err => console.warn("Refresh topNav failed:", err))
      );
    }

    // 3. Fetch contentItems directly from Firestore
    if (typeof it !== "undefined" && typeof Se === "function") {
      const q = typeof D === "function" && D() ? (typeof fe === "function" ? te(it, fe("order", "asc")) : it) : (typeof gt === "function" ? te(it, gt("published", "==", true)) : it);
      tasks.push(
        Se(q).then(snap => {
          if (snap) {
            L.items = snap.docs.map(r => ({ id: r.id, ...r.data() }));
          }
        }).catch(err => console.warn("Refresh content failed:", err))
      );
    }

    // 4. Fetch siteNodes directly from Firestore
    if (typeof Qt !== "undefined" && typeof Se === "function") {
      const q = typeof D === "function" && D() ? (typeof fe === "function" ? te(Qt, fe("order", "asc")) : Qt) : (typeof gt === "function" ? te(Qt, gt("published", "==", true)) : Qt);
      tasks.push(
        Se(q).then(snap => {
          if (snap) {
            L.nodes = snap.docs.map(r => ({ id: r.id, ...r.data() })).filter(r => !r.deletedAt);
          }
        }).catch(err => console.warn("Refresh nodes failed:", err))
      );
    }

    // 5. Fetch mediaLibrary directly from Firestore
    if (typeof oa !== "undefined" && typeof Se === "function") {
      const q = typeof fe === "function" ? te(oa, fe("order", "asc")) : oa;
      tasks.push(
        Se(q).then(snap => {
          if (snap) {
            L.media = snap.docs.map(r => ({ id: r.id, ...r.data() }));
          }
        }).catch(err => console.warn("Refresh media failed:", err))
      );
    }

    // 6. Fetch railCards directly from Firestore
    if (typeof le !== "undefined" && typeof Se === "function") {
      const q = typeof D === "function" && D() ? le : (typeof gt === "function" ? te(le, gt("published", "==", true)) : le);
      tasks.push(
        Se(q).then(snap => {
          if (snap) {
            L.railCards = snap.docs.map(r => ({ id: r.id, ...r.data() }));
          }
        }).catch(err => console.warn("Refresh rail failed:", err))
      );
    }

    // 7. Fetch sidebarItems directly from Firestore
    if (typeof de !== "undefined" && typeof Se === "function") {
      const q = typeof D === "function" && D() ? de : (typeof gt === "function" ? te(de, gt("published", "==", true)) : de);
      tasks.push(
        Se(q).then(snap => {
          if (snap) {
            L.sidebarItems = snap.docs.map(r => ({ id: r.id, ...r.data() }));
          }
        }).catch(err => console.warn("Refresh sidebar failed:", err))
      );
    }

    if (tasks.length > 0) {
      await Promise.allSettled(tasks);
    }

    // Re-bind listeners
    if (typeof ya === "function") {
      try { ya(); } catch (_) {}
    }

    // Comprehensive UI re-rendering
    if (typeof bt === "function") bt();
    if (typeof At === "function") At();
    if (typeof xt === "function") xt();
    if (typeof Me === "function") Me();
    if (typeof Be === "function") Be();
    if (typeof _renderSiteSectionsCMS === "function") _renderSiteSectionsCMS();
    if (typeof _renderTopNavItems === "function") _renderTopNavItems();
    if (typeof _renderSidebarProjects === "function") _renderSidebarProjects();
    if (typeof qe === "function") qe();
    if (typeof Et === "function") Et();

    window.dispatchEvent(new CustomEvent("portal:dataReload"));
    window.dispatchEvent(new CustomEvent("portal-content-updated", { detail: L.items }));
    if (typeof window.renderSiteSectionsCMS === "function") {
      try { window.renderSiteSectionsCMS(); } catch (_) {}
    }
    if (typeof window.updateAuthUI === "function") {
      try { window.updateAuthUI(); } catch (_) {}
    }

    btns.forEach(b => b.classList.remove("has-updates"));

    if (typeof B === "function") {
      B("รีเฟรชข้อมูลล่าสุดจากระบบเรียบร้อยแล้ว", "success");
    } else if (typeof A === "function") {
      A("รีเฟรชข้อมูลล่าสุดจากระบบเรียบร้อยแล้ว", "success");
    }
  } catch (err) {
    console.error("Manual refresh error:", err);
    if (typeof B === "function") {
      B("เกิดข้อผิดพลาดในการรีเฟรชข้อมูล", "error");
    }
  } finally {
    setTimeout(() => {
      btns.forEach(b => {
        b.classList.remove("is-refreshing");
        b.disabled = false;
      });
    }, 500);
  }
}
window._handleManualRefresh = _handleManualRefresh;
window.refreshSiteData = _handleManualRefresh;
_bindRefreshButtons();

function _initCMSUIEvents() {
  document.addEventListener("click", function(e) {
    const card = e.target.closest(".donation-card");
    if (!card) return;
    const mediaTrigger = e.target.closest(".donation-card-media, .donation-card-media-link, .donation-card-img");
    const actionBtn = e.target.closest(".donation-card-action-btn, .source-link");
    let isImageAction = false;
    let targetUrl = "";
    if (actionBtn) {
      const href = (actionBtn.getAttribute("href") || "").trim();
      if (href && (/\.(webp|jpg|jpeg|png|gif|svg)(\?.*)?$/i.test(href) || href.includes("firebasestorage.googleapis.com"))) {
        isImageAction = true;
        targetUrl = href;
      }
    }
    if (!mediaTrigger && !isImageAction) return;
    e.preventDefault();
    e.stopPropagation();
    const img = card.querySelector(".donation-card-img, img");
    const mediaLink = card.querySelector(".donation-card-media-link, a");
    if (!targetUrl) {
      const linkHref = mediaLink ? (mediaLink.getAttribute("href") || "").trim() : "";
      if (linkHref && linkHref !== "#") {
        targetUrl = linkHref;
      } else if (img) {
        targetUrl = img.currentSrc || img.src || "";
      }
    }
    if (!targetUrl && img) targetUrl = img.currentSrc || img.src || "";
    if (!targetUrl) return;
    const titleEl = card.querySelector(".donation-card-title, h4, h3");
    const descEl = card.querySelector(".donation-card-desc, p");
    const title = titleEl ? titleEl.textContent.trim() : (img ? img.alt : "ภาพโครงการร่วมบุญ");
    const desc = descEl ? descEl.textContent.trim() : "";
    da({ url: targetUrl, title: title, description: desc });
  }, { capture: true });

  // Top nav gear button
  const topNavGear = i("#topNavGearBtn");
  if (topNavGear) topNavGear.addEventListener("click", _openTopNavDialog);

  // Sidebar nav gear button (opens Site Tree Dialog)
  const sidebarNavGear = i("#sidebarNavGearBtn");
  if (sidebarNavGear) {
    sidebarNavGear.addEventListener("click", () => {
      const treeDlg = i("#treeDialog");
      if (treeDlg) treeDlg.showModal();
    });
  }

  // Top nav dialog buttons
  const closeTopNavBtn = i("#closeTopNavDialog");
  const closeTopNavBtn2 = i("#closeTopNavDialogBtn");
  const addTopNavBtn = i("#addNewTopNavItemBtn");
  const cancelTopNavBtn = i("#cancelTopNavFormBtn");
  const topNavForm = i("#topNavEditForm");
  if (closeTopNavBtn) closeTopNavBtn.addEventListener("click", _closeTopNavDialog);
  if (closeTopNavBtn2) closeTopNavBtn2.addEventListener("click", _closeTopNavDialog);
  if (addTopNavBtn) addTopNavBtn.addEventListener("click", () => _editTopNavItem(null));
  if (cancelTopNavBtn) cancelTopNavBtn.addEventListener("click", () => { if (topNavForm) topNavForm.style.display = "none"; });
  if (topNavForm) {
    topNavForm.onsubmit = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      _saveTopNavItem(e);
      return false;
    };
    topNavForm.addEventListener("submit", _saveTopNavItem);
  }

  // Auto translate button in Top Nav dialog
  const topNavTranslateBtn = i("#topNavAutoTranslateBtn");
  if (topNavTranslateBtn) topNavTranslateBtn.addEventListener("click", _autoTranslateTopNav);
  document.querySelectorAll(".top-nav-lang-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      if (tab.dataset.topNavTab) _switchTopNavLangTab(tab.dataset.topNavTab);
    });
  });

  // Section editor dialog buttons
  const closeSecBtn = i("#closeSectionEditorDialog");
  const cancelSecBtn = i("#cancelSectionEditorBtn");
  const secForm = i("#sectionEditorForm");
  if (closeSecBtn) closeSecBtn.addEventListener("click", _closeSectionEditor);
  if (cancelSecBtn) cancelSecBtn.addEventListener("click", _closeSectionEditor);
  if (secForm) {
    secForm.onsubmit = function(e) {
      if (e && e.preventDefault) e.preventDefault();
      _saveSectionEditor(e);
      return false;
    };
    secForm.addEventListener("submit", _saveSectionEditor);
  }
}

// Delegated click handler for language switcher, gear buttons, manage buttons, and refresh buttons
document.addEventListener("click", (e) => {
  // Manual refresh buttons
  const refBtn = e.target.closest("#portalRefreshBtn, #sidebarRefreshBtn, #railRefreshBtn, .sidebar-refresh-btn, .rail-refresh-btn");
  if (refBtn) {
    e.preventDefault();
    _handleManualRefresh();
    return;
  }

  // Language switcher button
  const langBtn = e.target.closest("#languageDropdownButton");
  if (langBtn) {
    e.stopPropagation();
    const menu = document.getElementById("languageMenu");
    if (menu) {
      const isExp = langBtn.getAttribute("aria-expanded") === "true";
      menu.hidden = isExp;
      langBtn.setAttribute("aria-expanded", isExp ? "false" : "true");
    }
    return;
  }

  // Language dropdown options
  const langOpt = e.target.closest(".language-option");
  if (langOpt) {
    e.stopPropagation();
    const chosen = langOpt.dataset.lang || langOpt.getAttribute("data-lang") || "th";
    if (typeof window.setLanguage === "function") {
      window.setLanguage(chosen);
    } else {
      document.documentElement.lang = chosen;
      localStorage.setItem("thatphanom_lang", chosen);
      window.dispatchEvent(new CustomEvent("portal:languageChange", { detail: { lang: chosen } }));
    }
    const menu = document.getElementById("languageMenu");
    if (menu) menu.hidden = true;
    const b = document.getElementById("languageDropdownButton");
    if (b) b.setAttribute("aria-expanded", "false");
    return;
  }

  // Close language dropdown if clicking outside
  const menu = document.getElementById("languageMenu");
  if (menu && !menu.hidden && !e.target.closest("#languageDropdown")) {
    menu.hidden = true;
    const b = document.getElementById("languageDropdownButton");
    if (b) b.setAttribute("aria-expanded", "false");
  }

  // Center section gear buttons
  const gearBtn = e.target.closest(".section-gear-btn");
  if (gearBtn) {
    e.preventDefault();
    e.stopPropagation();
    const target = gearBtn.dataset.sectionTarget;
    if (target && typeof _openSectionEditor === "function") _openSectionEditor(target);
    return;
  }
  // Rail card gear button
  const railGear = e.target.closest(".rail-card-gear");
  if (railGear) {
    e.preventDefault();
    e.stopPropagation();
    const cardEl = railGear.closest("[data-rail-id]");
    const railId = (cardEl && cardEl.dataset.railId) || railGear.dataset.railId;
    if (railId && typeof ar === "function") {
      ar(railId);
    }
    return;
  }
  // Sidebar item gear button
  const sidebarGear = e.target.closest(".sidebar-item-gear");
  if (sidebarGear) {
    e.preventDefault();
    e.stopPropagation();
    const itemEl = sidebarGear.closest("[data-sidebar-id]");
    const sidebarId = (itemEl && itemEl.dataset.sidebarId) || sidebarGear.dataset.sidebarId;
    if (sidebarId && typeof or === "function") {
      or(sidebarId);
    }
    return;
  }
  // Top nav gear button
  const topNavGear = e.target.closest("#topNavGearBtn, .topnav-gear-btn");
  if (topNavGear) {
    e.preventDefault();
    e.stopPropagation();
    if (typeof _openTopNavDialog === "function") {
      _openTopNavDialog();
    }
    return;
  }
  // Sidebar nav gear button (Site Tree)
  const sidebarNavGear = e.target.closest("#sidebarNavGearBtn");
  if (sidebarNavGear) {
    e.preventDefault();
    e.stopPropagation();
    const treeDlg = document.getElementById("treeDialog");
    if (treeDlg && typeof treeDlg.showModal === "function") treeDlg.showModal();
    return;
  }

  // Manage buttons (e.g. portal-manage-button)
  const manageBtn = e.target.closest(".portal-manage-button,[data-manage-kind]");
  if (manageBtn && manageBtn.dataset.manageKind) {
    e.preventDefault();
    Dn(manageBtn.dataset.manageKind);
  }
});

// Run CMS UI initialization
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", _initCMSUIEvents);
} else {
  _initCMSUIEvents();
}

// Initial run
_renderTopNavItems();
_updateAdminDOMState();
_renderSiteSectionsCMS();
document.addEventListener("DOMContentLoaded", () => { _renderSiteSectionsCMS(); renderMuchalindaAlbum(); });

const _muInput=document.getElementById("mediaUrl");
if(_muInput){
  _muInput.addEventListener("input",()=>{
    const v=_muInput.value.trim();
    if(_isFacebookVideo(v)||_isTikTokVideo(v)||ia(v)||nt(v)||/\.(mp4|webm|ogg|mov)(\?.*)?$/i.test(v)){
      const ts=document.getElementById("mediaType");
      if(ts)ts.value="video";
    }
  });
}


/* ==========================================================================
   CENTER COLUMN (SECTIONS, CONTENT ITEMS, MEDIA) 3-LANG DIALOGS & TRANSLATE
   ========================================================================== */

function _switchSecLangTab(lang) {
  document.querySelectorAll(".sec-lang-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.secTab === lang);
  });
  const panes = [
    { id: "secPaneTh", key: "th" },
    { id: "secPaneLo", key: "lo" },
    { id: "secPaneEn", key: "en" }
  ];
  panes.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) {
      el.classList.toggle("active", p.key === lang);
      el.style.display = (p.key === lang) ? "grid" : "none";
      el.hidden = (p.key !== lang);
    }
  });
}
window._switchSecLangTab = _switchSecLangTab;

async function _autoTranslateSection() {
  const kTh = (document.getElementById("sectionEditorKicker")?.value || "").trim();
  const tTh = (document.getElementById("sectionEditorTitleInput")?.value || "").trim();
  const cTh = (document.getElementById("sectionEditorContent")?.value || "").trim();
  if (!tTh && !cTh && !kTh) {
    if (typeof A === "function") A("กรุณากรอกข้อมูลภาษาไทยก่อนกดแปลภาษา", "warning");
    return;
  }
  const statusBox = document.getElementById("secTranslateStatus");
  const statusText = document.getElementById("secTranslateStatusText");
  const btn = document.getElementById("secAutoTranslateBtn");
  if (statusBox && statusText) {
    statusBox.hidden = false;
    statusBox.style.display = "inline-flex";
    statusText.textContent = "🌐 กำลังแปลภาษาลาวและอังกฤษ...";
  }
  if (btn) btn.disabled = true;
  try {
    const trLo = window._translateThToLo || (async (x) => x);
    const trEn = window._translateThToEn || (async (x) => x);
    const [kLo, kEn, tLo, tEn, cLo, cEn] = await Promise.all([
      kTh ? trLo(kTh) : Promise.resolve(""),
      kTh ? trEn(kTh) : Promise.resolve(""),
      tTh ? trLo(tTh) : Promise.resolve(""),
      tTh ? trEn(tTh) : Promise.resolve(""),
      cTh ? trLo(cTh) : Promise.resolve(""),
      cTh ? trEn(cTh) : Promise.resolve("")
    ]);
    const kickerLo = document.getElementById("sectionEditorKickerLo");
    const kickerEn = document.getElementById("sectionEditorKickerEn");
    const titleLo = document.getElementById("sectionEditorTitleLo");
    const titleEn = document.getElementById("sectionEditorTitleEn");
    const contentLo = document.getElementById("sectionEditorContentLo");
    const contentEn = document.getElementById("sectionEditorContentEn");
    if (kickerLo && kLo) kickerLo.value = kLo;
    if (kickerEn && kEn) kickerEn.value = kEn;
    if (titleLo && tLo) titleLo.value = tLo;
    if (titleEn && tEn) titleEn.value = tEn;
    if (contentLo && cLo) contentLo.value = cLo;
    if (contentEn && cEn) contentEn.value = cEn;
    if (statusText) {
      statusText.textContent = "✓ แปลภาษาลาวและอังกฤษสำเร็จ";
      setTimeout(() => {
        if (statusBox) {
          statusBox.hidden = true;
          statusBox.style.display = "none";
        }
      }, 3000);
    }
  } catch (err) {
    console.warn("Section translate error:", err);
    if (statusText) statusText.textContent = "ไม่สามารถแปลภาษาได้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    if (btn) btn.disabled = false;
  }
}
window._autoTranslateSection = _autoTranslateSection;

function _switchContentLangTab(lang) {
  document.querySelectorAll(".content-lang-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.contentTab === lang);
  });
  const panes = [
    { id: "contentPaneTh", key: "th" },
    { id: "contentPaneLo", key: "lo" },
    { id: "contentPaneEn", key: "en" }
  ];
  panes.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) {
      el.classList.toggle("active", p.key === lang);
      el.style.display = (p.key === lang) ? "grid" : "none";
      el.hidden = (p.key !== lang);
    }
  });
}
window._switchContentLangTab = _switchContentLangTab;

async function _autoTranslateContentItem() {
  const tTh = (document.getElementById("contentItemTitle")?.value || "").trim();
  const cTh = (document.getElementById("contentItemDescription")?.value || "").trim();
  if (!tTh && !cTh) {
    if (typeof A === "function") A("กรุณากรอกข้อมูลภาษาไทยก่อนกดแปลภาษา", "warning");
    return;
  }
  const statusBox = document.getElementById("contentTranslateStatus");
  const statusText = document.getElementById("contentTranslateStatusText");
  const btn = document.getElementById("contentAutoTranslateBtn");
  if (statusBox && statusText) {
    statusBox.hidden = false;
    statusBox.style.display = "inline-flex";
    statusText.textContent = "🌐 กำลังแปลภาษาลาวและอังกฤษ...";
  }
  if (btn) btn.disabled = true;
  try {
    const trLo = window._translateThToLo || (async (x) => x);
    const trEn = window._translateThToEn || (async (x) => x);
    const [tLo, tEn, cLo, cEn] = await Promise.all([
      tTh ? trLo(tTh) : Promise.resolve(""),
      tTh ? trEn(tTh) : Promise.resolve(""),
      cTh ? trLo(cTh) : Promise.resolve(""),
      cTh ? trEn(cTh) : Promise.resolve("")
    ]);
    const titleLo = document.getElementById("contentItemTitleLo");
    const titleEn = document.getElementById("contentItemTitleEn");
    const contentLo = document.getElementById("contentItemDescriptionLo");
    const contentEn = document.getElementById("contentItemDescriptionEn");
    if (titleLo && tLo) titleLo.value = tLo;
    if (titleEn && tEn) titleEn.value = tEn;
    if (contentLo && cLo) contentLo.value = cLo;
    if (contentEn && cEn) contentEn.value = cEn;
    if (statusText) {
      statusText.textContent = "✓ แปลภาษาลาวและอังกฤษสำเร็จ";
      setTimeout(() => {
        if (statusBox) {
          statusBox.hidden = true;
          statusBox.style.display = "none";
        }
      }, 3000);
    }
  } catch (err) {
    console.warn("Content translate error:", err);
    if (statusText) statusText.textContent = "ไม่สามารถแปลภาษาได้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    if (btn) btn.disabled = false;
  }
}
window._autoTranslateContentItem = _autoTranslateContentItem;

function _switchMediaLangTab(lang) {
  document.querySelectorAll(".media-lang-tab").forEach(tab => {
    tab.classList.toggle("active", tab.dataset.mediaTab === lang);
  });
  const panes = [
    { id: "mediaPaneTh", key: "th" },
    { id: "mediaPaneLo", key: "lo" },
    { id: "mediaPaneEn", key: "en" }
  ];
  panes.forEach(p => {
    const el = document.getElementById(p.id);
    if (el) {
      el.classList.toggle("active", p.key === lang);
      el.style.display = (p.key === lang) ? "grid" : "none";
      el.hidden = (p.key !== lang);
    }
  });
}
window._switchMediaLangTab = _switchMediaLangTab;

async function _autoTranslateMediaItem() {
  const tTh = (document.getElementById("mediaTitle")?.value || "").trim();
  const cTh = (document.getElementById("mediaDescription")?.value || "").trim();
  if (!tTh && !cTh) {
    if (typeof A === "function") A("กรุณากรอกข้อมูลภาษาไทยก่อนกดแปลภาษา", "warning");
    return;
  }
  const statusBox = document.getElementById("mediaTranslateStatus");
  const statusText = document.getElementById("mediaTranslateStatusText");
  const btn = document.getElementById("mediaAutoTranslateBtn");
  if (statusBox && statusText) {
    statusBox.hidden = false;
    statusBox.style.display = "inline-flex";
    statusText.textContent = "🌐 กำลังแปลภาษาลาวและอังกฤษ...";
  }
  if (btn) btn.disabled = true;
  try {
    const trLo = window._translateThToLo || (async (x) => x);
    const trEn = window._translateThToEn || (async (x) => x);
    const [tLo, tEn, cLo, cEn] = await Promise.all([
      tTh ? trLo(tTh) : Promise.resolve(""),
      tTh ? trEn(tTh) : Promise.resolve(""),
      cTh ? trLo(cTh) : Promise.resolve(""),
      cTh ? trEn(cTh) : Promise.resolve("")
    ]);
    const titleLo = document.getElementById("mediaTitleLo");
    const titleEn = document.getElementById("mediaTitleEn");
    const descLo = document.getElementById("mediaDescriptionLo");
    const descEn = document.getElementById("mediaDescriptionEn");
    if (titleLo && tLo) titleLo.value = tLo;
    if (titleEn && tEn) titleEn.value = tEn;
    if (descLo && cLo) descLo.value = cLo;
    if (descEn && cEn) descEn.value = cEn;
    if (statusText) {
      statusText.textContent = "✓ แปลภาษาลาวและอังกฤษสำเร็จ";
      setTimeout(() => {
        if (statusBox) {
          statusBox.hidden = true;
          statusBox.style.display = "none";
        }
      }, 3000);
    }
  } catch (err) {
    console.warn("Media translate error:", err);
    if (statusText) statusText.textContent = "ไม่สามารถแปลภาษาได้ กรุณาลองใหม่อีกครั้ง";
  } finally {
    if (btn) btn.disabled = false;
  }
}
window._autoTranslateMediaItem = _autoTranslateMediaItem;

// Auto-wire click listeners for tabs and translate buttons
document.addEventListener("DOMContentLoaded", () => {
  _wireMiddleColumnI18nEvents();
});
if (document.readyState === "complete" || document.readyState === "interactive") {
  _wireMiddleColumnI18nEvents();
}
function _wireMiddleColumnI18nEvents() {
  // Section dialog tabs & translate
  document.querySelectorAll(".sec-lang-tab").forEach(tab => {
    tab.addEventListener("click", () => _switchSecLangTab(tab.dataset.secTab));
  });
  const secTrBtn = document.getElementById("secAutoTranslateBtn");
  if (secTrBtn && !secTrBtn._wired) {
    secTrBtn._wired = true;
    secTrBtn.addEventListener("click", _autoTranslateSection);
  }

  // Content dialog tabs & translate
  document.querySelectorAll(".content-lang-tab").forEach(tab => {
    tab.addEventListener("click", () => _switchContentLangTab(tab.dataset.contentTab));
  });
  const contTrBtn = document.getElementById("contentAutoTranslateBtn");
  if (contTrBtn && !contTrBtn._wired) {
    contTrBtn._wired = true;
    contTrBtn.addEventListener("click", _autoTranslateContentItem);
  }

  // Media dialog tabs & translate
  document.querySelectorAll(".media-lang-tab").forEach(tab => {
    tab.addEventListener("click", () => _switchMediaLangTab(tab.dataset.mediaTab));
  });
  const mediaTrBtn = document.getElementById("mediaAutoTranslateBtn");
  if (mediaTrBtn && !mediaTrBtn._wired) {
    mediaTrBtn._wired = true;
    mediaTrBtn.addEventListener("click", _autoTranslateMediaItem);
  }
}

