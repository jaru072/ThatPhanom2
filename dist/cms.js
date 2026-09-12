import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, GoogleAuthProvider, signInWithPopup, signOut, onAuthStateChanged, setPersistence, browserLocalPersistence } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { getFirestore, collection, doc, getDoc, getDocs, setDoc, addDoc, updateDoc, deleteDoc, deleteField, serverTimestamp, onSnapshot, query, orderBy, limit, writeBatch } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getStorage, ref, uploadBytes, getDownloadURL, deleteObject } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import { getFunctions, httpsCallable } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-functions.js";
import { firebaseConfig } from "./firebase-config.js";

const ADMIN_EMAIL = "jaru072@gmail.com";
const PROJECT_KEY = "world-heritage";

const COLLECTIONS = {
  users: "users",
  projects: "projects",
  members: "members",
  media: "media",
  content: "content",
  siteNodes: "siteNodes",
  comments: "comments",
  chats: "chatThreads",
  settings: "settings"
};
const SECTIONS = {
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
  videos: "คลังวิดีโอจาก Google Drive",
  muchalindaHero: "ภาพนำ — โครงการบูรณะสระมุจลินท์",
  muchalindaDonation: "ร่วมบุญ — โครงการบูรณะสระมุจลินท์"
};
const DEFAULT_MEDIA = [
  { id: "seed-story-photo", section: "story", type: "image", title: "องค์พระธาตุพนม ศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง", url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10 },
  { id: "seed-story-video", section: "story", type: "video", title: "บทเพลงพระธาตุพนม สู่มรดกโลก ไทย–ลาว", url: "https://www.youtube.com/watch?v=bcmI5siLdzQ", order: 20 },
  { id: "seed-criteria-video", section: "criteria", type: "video", title: "รายงานการผลักดันพระธาตุพนม สู่มรดกโลก", url: "https://www.youtube.com/watch?v=ldhfgggHQxY", order: 10 },
  { id: "seed-milestones-video", section: "milestones", type: "video", title: "พระธาตุพนม สู่มรดกโลก — สารคดีสั้น", url: "https://www.youtube.com/watch?v=3Cws-7bMvHE", order: 10 }
];
const DEFAULT_FEATURE_MEDIA = {
  id: "seed-story-feature-photo",
  section: "story",
  placement: "feature01",
  type: "image",
  title: "องค์พระธาตุพนม ศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",
  description: "ปูชนียสถานสำคัญที่เชื่อมโยงศรัทธา ประวัติศาสตร์ และวิถีชีวิตของผู้คนสองฝั่งโขง",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_ART_MEDIA = {
  id: "seed-story-art-photo",
  section: "story",
  placement: "feature02",
  type: "image",
  title: "ร่องรอยศิลปกรรมแห่งลุ่มน้ำโขง",
  description: "รูปแบบสถาปัตยกรรมและงานช่างที่สืบทอดและพัฒนาผ่านหลายยุคสมัย",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_PEOPLE_MEDIA = {
  id: "seed-story-people-photo",
  section: "story",
  placement: "feature03",
  type: "image",
  title: "ศูนย์รวมศรัทธาของผู้คนสองฝั่งโขง",
  description: "พระธาตุพนมเชื่อมโยงผู้คนไทย ลาว และชุมชนลุ่มน้ำโขงผ่านศรัทธาและประเพณีที่สืบต่อกันมา",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_CRITERIA_ONE_MEDIA = {
  id: "seed-criteria-one-photo",
  section: "criteria",
  placement: "criterion01",
  type: "image",
  title: "ผลงานสร้างสรรค์อันเป็นเลิศ",
  description: "สถาปัตยกรรมพุทธศิลป์ที่ผสานรากศิลปะโบราณกับจิตวิญญาณและงานช่างแห่งลุ่มน้ำโขงอย่างมีเอกลักษณ์",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_CRITERIA_TWO_MEDIA = {
  id: "seed-criteria-two-photo",
  section: "criteria",
  placement: "criterion02",
  type: "image",
  title: "การแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม",
  description: "วิวัฒนาการของรูปแบบพระธาตุสะท้อนการพบกันของความเชื่อท้องถิ่นกับพุทธศาสนา",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_CRITERIA_THREE_MEDIA = {
  id: "seed-criteria-three-photo",
  section: "criteria",
  placement: "criterion03",
  type: "image",
  title: "สัมพันธ์กับความเชื่อที่ยังดำรงอยู่",
  description: "เชื่อมโยงกับการบูชาพระบรมสารีริกธาตุ ตำนานอุรังคธาตุ และประเพณีศักดิ์สิทธิ์ที่ยังสืบทอด",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_PROCESS_MEDIA = [
  {
    id: "seed-process-one-photo", section: "process", placement: "step01", type: "image",
    title: "กำหนดคุณค่าและขอบเขต", description: "ศึกษาองค์ประกอบสำคัญ พื้นที่หลัก และพื้นที่กันชน",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-process-two-photo", section: "process", placement: "step02", type: "image",
    title: "จัดทำแผนอนุรักษ์และบริหาร", description: "คุ้มครองโบราณสถาน ภูมิทัศน์ ประเพณี และวิถีชุมชนอย่างสมดุล",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-process-three-photo", section: "process", placement: "step03", type: "image",
    title: "สร้างการมีส่วนร่วม", description: "คณะสงฆ์ ชุมชน นักวิชาการ ภาครัฐ ภาคเอกชน และเยาวชนร่วมกำหนดอนาคต",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-process-four-photo", section: "process", placement: "step04", type: "image",
    title: "จัดทำเอกสารเสนอชื่อ", description: "รวบรวมหลักฐานและแผนงานเป็น Nomination Dossier เพื่อเข้าสู่กระบวนการ UNESCO",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  }
];
const DEFAULT_PROCESS_OVERVIEW_MEDIA = {
  id: "seed-process-overview-photo",
  section: "process",
  placement: "overview",
  type: "image",
  title: "งานที่ต้องทำร่วมกัน",
  description: "จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน ทุกภาคส่วนร่วมอนุรักษ์และส่งต่อคุณค่าพระธาตุพนม",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_MILESTONE_MEDIA = [
  {
    id: "seed-milestone-one-photo", section: "milestones", placement: "milestone01", type: "image",
    title: "โครงสร้างยุคแรก", description: "หลักฐานจากการขุดค้นระบุอายุห้องอิฐชั้นในราวคริสต์ศตวรรษที่ 7–8",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-milestone-two-photo", section: "milestones", placement: "milestone02", type: "image",
    title: "โบราณสถานของชาติ", description: "กรมศิลปากรประกาศขึ้นทะเบียนเพื่อการอนุรักษ์และคุ้มครอง",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-milestone-three-photo", section: "milestones", placement: "milestone03", type: "image",
    title: "ล้มและฟื้นคืน", description: "องค์พระธาตุล้มจากพายุฝน ก่อนบูรณะด้วยความร่วมแรงร่วมใจจากทั่วประเทศและภูมิภาค",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  },
  {
    id: "seed-milestone-four-photo", section: "milestones", placement: "milestone04", type: "image",
    title: "ก้าวสู่เวทีโลก", description: "ได้รับการบรรจุในบัญชีรายชื่อเบื้องต้นเมื่อวันที่ 2 กุมภาพันธ์ พ.ศ. 2560",
    url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg", order: 10
  }
];
const DEFAULT_HERO_MEDIA = {
  id: "seed-hero-photo",
  section: "story",
  placement: "hero",
  type: "image",
  title: "องค์พระธาตุพนม",
  description: "พระธาตุพนม ปูชนียสถานสำคัญและศูนย์รวมศรัทธาของผู้คนสองฝั่งโขง",
  url: "https://www.publicdomainpictures.net/pictures/340000/velka/wat-phra-that-phanom-temple-nakhon-phanom-thailand-1588673538rmc.jpg",
  order: 10
};
const DEFAULT_MUCHALINDA_DONATION_MEDIA = [
  {
    id: "seed-muchalinda-donation",
    section: "muchalinda",
    placement: "donation",
    type: "image",
    title: "ร่วมบุญบูรณะสระมุจลินท์",
    description: "ธนาคารออมสิน สาขาธาตุพนม เลขที่บัญชี 0204-613-1196-9 โปรดตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง",
    url: "assets/donation-muchalinda.png",
    order: 10
  },
  {
    id: "seed-muchalinda-road-drainage",
    section: "muchalinda",
    placement: "donation",
    type: "image",
    title: "ร่วมบุญปรับปรุงถนนและระบบระบายน้ำ",
    description: "ธนาคารออมสิน สาขาธาตุพนม เลขที่บัญชี 0204-889-2517-1 โปรดตรวจสอบชื่อบัญชีก่อนโอนทุกครั้ง",
    url: "assets/donation-road-drainage.jpg",
    order: 20
  }
];
const DEFAULT_MUCHALINDA_HERO_MEDIA = {
  id: "seed-muchalinda-hero",
  section: "muchalinda",
  placement: "hero",
  type: "image",
  title: "ภาพประกอบแนวคิดสระมุจลินท์",
  description: "ภาพประกอบแนวคิดเพื่อสื่อบรรยากาศหลังการบูรณะและปรับภูมิทัศน์ ไม่ใช่ภาพบันทึกสภาพปัจจุบัน",
  url: "assets/muchalinda-hero.webp",
  originalUrl: "assets/muchalinda-hero-original.png",
  order: 10
};

const state = {
  user: null,
  role: "guest",
  media: [...DEFAULT_MEDIA, DEFAULT_FEATURE_MEDIA, DEFAULT_ART_MEDIA, DEFAULT_PEOPLE_MEDIA, DEFAULT_CRITERIA_ONE_MEDIA, DEFAULT_CRITERIA_TWO_MEDIA, DEFAULT_CRITERIA_THREE_MEDIA, DEFAULT_PROCESS_OVERVIEW_MEDIA, ...DEFAULT_PROCESS_MEDIA, ...DEFAULT_MILESTONE_MEDIA, DEFAULT_MUCHALINDA_HERO_MEDIA, ...DEFAULT_MUCHALINDA_DONATION_MEDIA],
  mediaInitialized: false,
  mediaLoaded: false,
  usingFallbackMedia: true,
  slideIndex: { hero: 0, storyFeature: 0, storyArt: 0, storyPeople: 0, criteriaOne: 0, criteriaTwo: 0, criteriaThree: 0, processOverview: 0, processOne: 0, processTwo: 0, processThree: 0, processFour: 0, milestoneOne: 0, milestoneTwo: 0, milestoneThree: 0, milestoneFour: 0, story: 0, criteria: 0, milestones: 0, muchalindaHero: 0, muchalindaDonation: 0 },
  slideAutoStopped: { hero: false, storyFeature: false, storyArt: false, storyPeople: false, criteriaOne: false, criteriaTwo: false, criteriaThree: false, processOverview: false, processOne: false, processTwo: false, processThree: false, processFour: false, milestoneOne: false, milestoneTwo: false, milestoneThree: false, milestoneFour: false, story: false, criteria: false, milestones: false, muchalindaHero: false, muchalindaDonation: false },
  editingMedia: null,
  manageSection: "",
  siteNodes: [],
  portalContent: [],
  driveSyncStatus: null,
  driveSyncBusy: false,
  selectedTreeNodeId: "",
  treeShowTrash: false,
  activeChatUid: null,
  unsubMessages: null,
  unsubThreads: null
};

const SLIDE_INTERVAL_MS = 5500;
const MAX_SOURCE_IMAGE_BYTES = 30 * 1024 * 1024;
const MAX_STORED_IMAGE_BYTES = 10 * 1024 * 1024;
const slideTimers = new Map();

let app, auth, db, storage, functions, syncDriveMediaNowCall;
try {
  if (Object.values(firebaseConfig).some(value => !value || String(value).startsWith("PASTE_"))) {
    throw new Error("Firebase web configuration is incomplete");
  }
  app = initializeApp(firebaseConfig);
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
  functions = getFunctions(app, "asia-southeast1");
  syncDriveMediaNowCall = httpsCallable(functions, "syncDriveMediaNow");
  setPersistence(auth, browserLocalPersistence).catch(error => console.warn("Auth persistence unavailable", error));
} catch (error) {
  console.error("Firebase initialization failed", error);
}

const $ = (selector, root = document) => root.querySelector(selector);
const $$ = (selector, root = document) => [...root.querySelectorAll(selector)];
const isAdmin = () => state.role === "admin";
const isStaff = () => state.role === "admin" || state.role === "manager";
const roleLabel = role => ({ admin: "Admin", manager: "Manager", user: "User", guest: "บุคคลทั่วไป" }[role] || "User");
const usersCollection = () => collection(db, COLLECTIONS.users);
const userDoc = uid => doc(db, COLLECTIONS.users, uid);
const projectDoc = () => doc(db, COLLECTIONS.projects, PROJECT_KEY);
const projectCollection = name => collection(projectDoc(), name);
const projectItemDoc = (name, id) => doc(projectDoc(), name, id);
const memberDoc = uid => projectItemDoc(COLLECTIONS.members, uid);
const chatMessagesCollection = uid => collection(projectItemDoc(COLLECTIONS.chats, uid), "messages");

function toast(message, tone = "") {
  const el = $("#toast");
  el.textContent = message;
  el.dataset.tone = tone;
  el.classList.add("show");
  clearTimeout(toast.timer);
  toast.timer = setTimeout(() => el.classList.remove("show"), 2600);
}

function formatDate(timestamp) {
  const date = timestamp?.toDate ? timestamp.toDate() : timestamp ? new Date(timestamp) : new Date();
  return new Intl.DateTimeFormat("th-TH", { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function safeUrl(value) {
  try {
    const raw = String(value || "").trim();
    if (!raw) return "";
    const url = new URL(raw, location.href);
    if (url.origin === location.origin) return url.href;
    return url.protocol === "https:" ? url.href : "";
  } catch {
    return "";
  }
}

function youtubeId(value) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0];
    if (url.hostname.includes("youtube.com")) {
      if (url.pathname.startsWith("/embed/")) return url.pathname.split("/")[2];
      return url.searchParams.get("v") || "";
    }
  } catch {}
  return /^[\w-]{11}$/.test(value) ? value : "";
}

function googleDriveFileId(value) {
  try {
    const url = new URL(value);
    const hostname = url.hostname.toLowerCase();
    if (hostname !== "drive.google.com" && hostname !== "www.drive.google.com") return "";
    const parts = url.pathname.split("/").filter(Boolean);
    const fileIndex = parts.indexOf("file");
    if (fileIndex !== -1 && parts[fileIndex + 1] === "d") {
      return /^[\w-]{10,200}$/.test(parts[fileIndex + 2] || "") ? parts[fileIndex + 2] : "";
    }
    const id = url.searchParams.get("id") || "";
    return /^[\w-]{10,200}$/.test(id) ? id : "";
  } catch {
    return "";
  }
}

function isGoogleDriveUrl(value) {
  try {
    const hostname = new URL(value).hostname.toLowerCase();
    return hostname === "drive.google.com" || hostname === "www.drive.google.com";
  } catch {
    return false;
  }
}

function fastGoogleDriveImageUrl(value) {
  const fileId = googleDriveFileId(value);
  return fileId ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(fileId)}` : value;
}

function mediaSectionKey(item) {
  if (item.section === "story" && item.placement === "hero") return "hero";
  if (item.section === "story" && item.placement === "feature01") return "storyFeature";
  if (item.section === "story" && item.placement === "feature02") return "storyArt";
  if (item.section === "story" && item.placement === "feature03") return "storyPeople";
  if (item.section === "criteria" && item.placement === "criterion01") return "criteriaOne";
  if (item.section === "criteria" && item.placement === "criterion02") return "criteriaTwo";
  if (item.section === "criteria" && item.placement === "criterion03") return "criteriaThree";
  if (item.section === "process" && item.placement === "overview") return "processOverview";
  if (item.section === "process" && item.placement === "step01") return "processOne";
  if (item.section === "process" && item.placement === "step02") return "processTwo";
  if (item.section === "process" && item.placement === "step03") return "processThree";
  if (item.section === "process" && item.placement === "step04") return "processFour";
  if (item.section === "milestones" && item.placement === "milestone01") return "milestoneOne";
  if (item.section === "milestones" && item.placement === "milestone02") return "milestoneTwo";
  if (item.section === "milestones" && item.placement === "milestone03") return "milestoneThree";
  if (item.section === "milestones" && item.placement === "milestone04") return "milestoneFour";
  if (item.section === "muchalinda" && item.placement === "hero") return "muchalindaHero";
  if (item.section === "muchalinda" && item.placement === "donation") return "muchalindaDonation";
  return item.section;
}

async function decodeImageFile(file) {
  if ("createImageBitmap" in window) {
    try {
      const bitmap = await createImageBitmap(file, { imageOrientation: "from-image" });
      return { source: bitmap, width: bitmap.width, height: bitmap.height, cleanup: () => bitmap.close() };
    } catch {}
  }
  const objectUrl = URL.createObjectURL(file);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = objectUrl;
    await image.decode();
    return { source: image, width: image.naturalWidth, height: image.naturalHeight, cleanup: () => URL.revokeObjectURL(objectUrl) };
  } catch (error) {
    URL.revokeObjectURL(objectUrl);
    throw error;
  }
}

async function optimizeImageFile(file, selectedSection) {
  if (file.size > MAX_SOURCE_IMAGE_BYTES) throw new Error("รูปภาพต้นฉบับต้องมีขนาดไม่เกิน 30 MB");
  const preset = ["storyFeature", "storyArt", "storyPeople", "criteriaOne", "criteriaTwo", "criteriaThree", "processOverview", "processOne", "processTwo", "processThree", "processFour", "milestoneOne", "milestoneTwo", "milestoneThree", "milestoneFour", "muchalindaHero", "muchalindaDonation"].includes(selectedSection)
    ? { maxWidth: 2400, maxHeight: 2100, quality: 0.86 }
    : { maxWidth: 2560, maxHeight: 1800, quality: 0.86 };
  const decoded = await decodeImageFile(file);
  try {
    const scale = Math.min(1, preset.maxWidth / decoded.width, preset.maxHeight / decoded.height);
    const width = Math.max(1, Math.round(decoded.width * scale));
    const height = Math.max(1, Math.round(decoded.height * scale));
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) throw new Error("อุปกรณ์นี้ไม่รองรับการปรับขนาดรูปภาพ");
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(decoded.source, 0, 0, width, height);
    const blob = await new Promise(resolve => canvas.toBlob(resolve, "image/webp", preset.quality));
    if (!blob) throw new Error("ไม่สามารถบีบอัดรูปภาพนี้ได้");
    if (blob.size > MAX_STORED_IMAGE_BYTES) throw new Error("รูปภาพยังมีขนาดเกิน 10 MB หลังบีบอัด กรุณาเลือกรูปอื่น");
    if (scale === 1 && blob.size >= file.size && file.size <= MAX_STORED_IMAGE_BYTES) return file;
    const baseName = file.name.replace(/\.[^.]+$/, "").replace(/[^a-zA-Z0-9._-]/g, "_") || "image";
    const outputType = blob.type || "image/webp";
    const extension = outputType === "image/webp" ? "webp" : outputType === "image/png" ? "png" : "jpg";
    return new File([blob], `${baseName}.${extension}`, { type: outputType, lastModified: Date.now() });
  } finally {
    decoded.cleanup();
  }
}

function createMediaSlider(element, key, extraClass = "") {
  const slider = document.createElement("div");
  slider.className = `media-slider${extraClass ? ` ${extraClass}` : ""}`;
  slider.dataset.slider = key;
  slider.setAttribute("aria-label", `สไลด์สื่อ: ${SECTIONS[key]}`);
  slider.tabIndex = 0;
  slider.innerHTML = '<div class="media-stage"></div>';
  element.append(slider);
  return slider;
}

function createUpdateButton(host, section, className) {
  const button = document.createElement("button");
  button.className = `${className} role-only`;
  button.type = "button";
  button.hidden = true;
  button.dataset.section = section;
  button.textContent = "อัพเดท";
  button.setAttribute("aria-label", `อัพเดทสื่อ: ${SECTIONS[section]}`);
  button.addEventListener("click", () => openManageDialog(section));
  host.append(button);
}

function setupMediaSurfaces() {
  const heroHost = $("#heroMedia");
  if (heroHost) {
    createMediaSlider(heroHost, "hero", "hero-media-slider");
    createUpdateButton(heroHost, "hero", "media-update-button hero-update-button");
  }
  const storyFeatureHost = $("#storyFeatureMedia");
  if (storyFeatureHost) {
    createMediaSlider(storyFeatureHost, "storyFeature", "story-feature-slider");
    createUpdateButton($("#storyFeatureCard"), "storyFeature", "media-update-button feature-media-add");
  }
  const storyArtHost = $("#storyArtMedia");
  if (storyArtHost) {
    createMediaSlider(storyArtHost, "storyArt", "story-mini-slider");
    createUpdateButton($("#storyArtCard"), "storyArt", "media-update-button feature-media-add");
  }
  const storyPeopleHost = $("#storyPeopleMedia");
  if (storyPeopleHost) {
    createMediaSlider(storyPeopleHost, "storyPeople", "story-mini-slider");
    createUpdateButton($("#storyPeopleCard"), "storyPeople", "media-update-button feature-media-add");
  }
  [
    { host: $("#criteriaOneMedia"), card: $("#criteriaOneCard"), key: "criteriaOne" },
    { host: $("#criteriaTwoMedia"), card: $("#criteriaTwoCard"), key: "criteriaTwo" },
    { host: $("#criteriaThreeMedia"), card: $("#criteriaThreeCard"), key: "criteriaThree" }
  ].forEach(({ host, card, key }) => {
    if (!host || !card) return;
    createMediaSlider(host, key, "criteria-card-slider");
    createUpdateButton(card, key, "media-update-button feature-media-add");
  });
  const processOverviewHost = $("#processOverviewMedia");
  if (processOverviewHost) {
    createMediaSlider(processOverviewHost, "processOverview", "process-overview-slider");
    createUpdateButton(processOverviewHost, "processOverview", "media-update-button process-overview-update");
  }
  [
    { host: $("#processOneMedia"), card: $("#processOneCard"), key: "processOne" },
    { host: $("#processTwoMedia"), card: $("#processTwoCard"), key: "processTwo" },
    { host: $("#processThreeMedia"), card: $("#processThreeCard"), key: "processThree" },
    { host: $("#processFourMedia"), card: $("#processFourCard"), key: "processFour" }
  ].forEach(({ host, card, key }) => {
    if (!host || !card) return;
    createMediaSlider(host, key, "process-step-slider");
    createUpdateButton(card, key, "media-update-button feature-media-add");
  });
  const milestonesOverviewHost = $("#milestonesOverviewMedia");
  if (milestonesOverviewHost) {
    createMediaSlider(milestonesOverviewHost, "milestones", "milestones-overview-slider");
    createUpdateButton(milestonesOverviewHost, "milestones", "media-update-button milestones-overview-update");
  }
  [
    { host: $("#milestoneOneMedia"), card: $("#milestoneOneCard"), key: "milestoneOne" },
    { host: $("#milestoneTwoMedia"), card: $("#milestoneTwoCard"), key: "milestoneTwo" },
    { host: $("#milestoneThreeMedia"), card: $("#milestoneThreeCard"), key: "milestoneThree" },
    { host: $("#milestoneFourMedia"), card: $("#milestoneFourCard"), key: "milestoneFour" }
  ].forEach(({ host, card, key }) => {
    if (!host || !card) return;
    createMediaSlider(host, key, "milestone-card-slider");
    createUpdateButton(card, key, "media-update-button feature-media-add");
  });
  const storySection = $("#history");
  if (storySection) {
    const storySlider = createMediaSlider(storySection, "story", "story-section-slider");
    createUpdateButton(storySlider, "story", "media-update-button section-slider-update");
  }
  const criteriaSection = $("#world-heritage");
  if (criteriaSection) {
    const criteriaSlider = createMediaSlider(criteriaSection, "criteria", "criteria-section-slider");
    createUpdateButton(criteriaSlider, "criteria", "media-update-button section-slider-update");
  }
  const muchalindaDonationHost = $("#muchalindaDonationMedia");
  if (muchalindaDonationHost) {
    const donationSlider = createMediaSlider(muchalindaDonationHost, "muchalindaDonation", "muchalinda-donation-slider");
    createUpdateButton(donationSlider, "muchalindaDonation", "media-update-button section-slider-update");
  }
  const muchalindaHeroHost = $("#muchalindaHeroMedia");
  if (muchalindaHeroHost) {
    const projectHeroSlider = createMediaSlider(muchalindaHeroHost, "muchalindaHero", "muchalinda-hero-slider");
    createUpdateButton(projectHeroSlider, "muchalindaHero", "media-update-button section-slider-update");
  }
  renderAllSliders();
}

function renderAllSliders() {
  Object.keys(SECTIONS).forEach(renderSlider);
  renderDriveVideoGallery();
  renderDriveSyncStatus();
  renderManageMedia();
}

function renderDriveVideoGallery() {
  const section = $("#driveVideoSection");
  const root = $("#driveVideoGallery");
  if (!section || !root) return;
  const items = state.media
    .filter(item => mediaSectionKey(item) === "videos" && item.type === "video" && item.enabled !== false && item.published !== false)
    .sort((left, right) => (Number(left.order) || 0) - (Number(right.order) || 0) || String(left.title || "").localeCompare(String(right.title || ""), "th"));
  section.hidden = !items.length;
  root.replaceChildren();
  items.forEach(item => {
    const article = document.createElement("article");
    article.className = "video-card drive-video-card";
    const frame = document.createElement("div");
    frame.className = "video-frame";
    const url = safeUrl(item.url);
    const youtubeVideoId = youtubeId(item.url);
    const legacyDriveFileId = item.source === "google-drive" ? "" : googleDriveFileId(item.url);
    if (youtubeVideoId) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://www.youtube-nocookie.com/embed/" + youtubeVideoId;
      iframe.title = item.title || "วิดีโอพระธาตุพนม";
      iframe.loading = "lazy";
      iframe.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      iframe.allowFullscreen = true;
      frame.append(iframe);
    } else if (legacyDriveFileId) {
      const iframe = document.createElement("iframe");
      iframe.src = "https://drive.google.com/file/d/" + encodeURIComponent(legacyDriveFileId) + "/preview";
      iframe.title = item.title || "วิดีโอพระธาตุพนมจาก Google Drive";
      iframe.loading = "lazy";
      iframe.allow = "autoplay; fullscreen";
      iframe.allowFullscreen = true;
      frame.append(iframe);
    } else if (url) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.preload = "metadata";
      video.playsInline = true;
      video.setAttribute("controlsList", "nodownload");
      frame.append(video);
    }
    if (!frame.childElementCount) {
      const unavailable = document.createElement("p");
      unavailable.className = "video-unavailable";
      unavailable.textContent = "ไม่สามารถเปิดวิดีโอนี้ได้";
      frame.append(unavailable);
    }
    const type = document.createElement("p");
    type.className = "video-type";
    type.textContent = item.source === "google-drive" ? "Google Drive · ซิงก์อัตโนมัติ" : "วิดีโอเพิ่มเติม";
    const title = document.createElement("h3");
    title.textContent = item.title || "วิดีโอพระธาตุพนม";
    article.append(frame, type, title);
    root.append(article);
  });
}

function renderDriveSyncStatus() {
  const badge = $("#driveSyncState");
  const summary = $("#driveSyncSummary");
  const button = $("#syncDriveButton");
  if (!badge || !summary || !button) return;
  const status = state.driveSyncStatus;
  const stateName = state.driveSyncBusy ? "running" : (status?.status || "idle");
  const labels = {
    idle: "ยังไม่เคยซิงก์",
    running: "กำลังซิงก์",
    success: "ซิงก์สำเร็จ",
    error: "ต้องตรวจสอบ"
  };
  badge.dataset.state = stateName;
  badge.textContent = labels[stateName] || "รอตรวจสอบ";
  button.disabled = state.driveSyncBusy;
  button.setAttribute("aria-busy", String(state.driveSyncBusy));
  if (state.driveSyncBusy || stateName === "running") {
    summary.textContent = "ระบบกำลังอ่านรายการไฟล์และอัปเดตคลังสื่อ กรุณารอสักครู่";
    return;
  }
  if (!status) {
    summary.textContent = "ระบบจะตรวจ Google Drive ทุก 5 นาที หรือกดซิงก์ทันทีได้";
    return;
  }
  const counts = status.counts || {};
  if (stateName === "success") {
    const when = status.lastSuccessAt ? formatDate(status.lastSuccessAt) : "ล่าสุด";
    summary.textContent = "ซิงก์ " + when +
      " · พบ " + (counts.discovered || 0) +
      " · เพิ่ม " + (counts.created || 0) +
      " · อัปเดต " + (counts.updated || 0) +
      " · ลบ " + (counts.deleted || 0);
  } else {
    summary.textContent = status.lastError || "ซิงก์ไม่สำเร็จ กรุณาตรวจสิทธิ์โฟลเดอร์ Google Drive";
  }
}

async function startManualDriveSync() {
  if (!isAdmin()) return toast("เฉพาะ Admin เท่านั้นที่สั่งซิงก์ได้", "error");
  if (!syncDriveMediaNowCall) return toast("ยังเชื่อมต่อระบบซิงก์ไม่ได้", "error");
  state.driveSyncBusy = true;
  renderDriveSyncStatus();
  try {
    const response = await syncDriveMediaNowCall();
    const result = response.data || {};
    if (result.skipped) {
      toast("มีรอบซิงก์กำลังทำงานอยู่");
    } else {
      const counts = result.counts || {};
      toast("ซิงก์สำเร็จ: เพิ่ม " + (counts.created || 0) + " · อัปเดต " + (counts.updated || 0) + " · ลบ " + (counts.deleted || 0));
    }
  } catch (error) {
    console.error("Drive sync failed", error);
    const code = String(error.code || "");
    if (code.includes("unauthenticated")) toast("กรุณาเข้าสู่ระบบใหม่ก่อนสั่งซิงก์", "error");
    else if (code.includes("permission-denied")) toast("บัญชีนี้ไม่มีสิทธิ์สั่งซิงก์", "error");
    else toast("ซิงก์ Google Drive ไม่สำเร็จ กรุณาลองใหม่", "error");
  } finally {
    state.driveSyncBusy = false;
    renderDriveSyncStatus();
  }
}

function renderSlider(section) {
  const root = document.querySelector(`[data-slider="${section}"]`);
  if (!root) return;
  const storedItems = state.media.filter(item => mediaSectionKey(item) === section && item.enabled !== false && item.published !== false);
  const fallbackItems = {
    hero: [DEFAULT_HERO_MEDIA],
    storyArt: [DEFAULT_ART_MEDIA],
    storyPeople: [DEFAULT_PEOPLE_MEDIA],
    criteriaOne: [DEFAULT_CRITERIA_ONE_MEDIA],
    criteriaTwo: [DEFAULT_CRITERIA_TWO_MEDIA],
    criteriaThree: [DEFAULT_CRITERIA_THREE_MEDIA],
    processOverview: [DEFAULT_PROCESS_OVERVIEW_MEDIA],
    processOne: [DEFAULT_PROCESS_MEDIA[0]],
    processTwo: [DEFAULT_PROCESS_MEDIA[1]],
    processThree: [DEFAULT_PROCESS_MEDIA[2]],
    processFour: [DEFAULT_PROCESS_MEDIA[3]],
    milestoneOne: [DEFAULT_MILESTONE_MEDIA[0]],
    milestoneTwo: [DEFAULT_MILESTONE_MEDIA[1]],
    milestoneThree: [DEFAULT_MILESTONE_MEDIA[2]],
    milestoneFour: [DEFAULT_MILESTONE_MEDIA[3]],
    muchalindaHero: [DEFAULT_MUCHALINDA_HERO_MEDIA],
    muchalindaDonation: DEFAULT_MUCHALINDA_DONATION_MEDIA
  };
  const items = (!storedItems.length && fallbackItems[section] ? fallbackItems[section] : storedItems)
    .sort((a, b) => (a.order || 0) - (b.order || 0));

  const itemsSig = JSON.stringify(items.map(it => [it.id, it.url, it.title, it.type, it.order]));
  const existingSlides = root.querySelectorAll(".media-slide");
  if (root.dataset.renderedSig === itemsSig && existingSlides.length === items.length && items.length > 0) {
    return;
  }
  root.dataset.renderedSig = itemsSig;

  clearSlideTimer(section);
  root.onkeydown = null;
  const stage = $(".media-stage", root);
  stage.replaceChildren();
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "slider-empty";
    empty.textContent = isAdmin() ? "ยังไม่มีสื่อในหัวข้อนี้ กดปุ่มอัพเดทเพื่อเพิ่ม" : "กำลังเตรียมรูปภาพและวิดีโอ";
    stage.append(empty);
    return;
  }
  state.slideIndex[section] = Math.min(state.slideIndex[section] || 0, items.length - 1);
  items.forEach((item, index) => {
    const slide = document.createElement("figure");
    slide.className = `media-slide${index === state.slideIndex[section] ? " active" : ""}`;
    const url = safeUrl(item.type === "image" ? fastGoogleDriveImageUrl(item.url) : item.url);
    const videoId = item.type === "video" ? youtubeId(item.url) : "";
    const driveFileId = item.type === "video" ? googleDriveFileId(item.url) : "";
    if (item.type === "image" && url) {
      slide.classList.add("image-slide");
      const backdrop = document.createElement("img");
      backdrop.src = url;
      backdrop.alt = "";
      backdrop.loading = "lazy";
      backdrop.decoding = "async";
      backdrop.className = "media-image-backdrop";
      backdrop.setAttribute("aria-hidden", "true");
      const image = document.createElement("img");
      image.src = url;
      image.alt = item.title || "ภาพพระธาตุพนม";
      image.loading = "lazy";
      image.decoding = "async";
      image.className = "expandable-media";
      image.tabIndex = 0;
      image.setAttribute("role", "button");
      image.setAttribute("aria-label", `ขยายภาพ ${item.title || "พระธาตุพนม"}`);
      image.addEventListener("click", () => {
        stopAutoSlide(section);
        openImageLightbox(item);
      });
      image.addEventListener("keydown", event => {
        if (event.key !== "Enter" && event.key !== " ") return;
        event.preventDefault();
        stopAutoSlide(section);
        openImageLightbox(item);
      });
      slide.append(backdrop, image);
    } else if (driveFileId) {
      const frame = document.createElement("iframe");
      const drivePreviewUrl = `https://drive.google.com/file/d/${encodeURIComponent(driveFileId)}/preview`;
      frame.src = drivePreviewUrl;
      frame.title = item.title || "วิดีโอพระธาตุพนมจาก Google Drive";
      frame.loading = "lazy";
      frame.allow = "autoplay; fullscreen";
      frame.allowFullscreen = true;
      frame.referrerPolicy = "strict-origin-when-cross-origin";
      slide.append(frame);
      const play = document.createElement("button");
      play.type = "button";
      play.className = "media-play-button";
      play.setAttribute("aria-label", `เปิดเครื่องเล่นวิดีโอ ${item.title || "พระธาตุพนม"}`);
      play.innerHTML = "<span aria-hidden=\"true\">▶</span> ชมวิดีโอ";
      play.addEventListener("click", event => {
        event.stopPropagation();
        stopAutoSlide(section);
        frame.src = `${drivePreviewUrl}?autoplay=1`;
        play.remove();
      });
      slide.append(play);
    } else if (videoId) {
      const frame = document.createElement("iframe");
      frame.src = `https://www.youtube-nocookie.com/embed/${videoId}`;
      frame.title = item.title || "วิดีโอพระธาตุพนม";
      frame.loading = "lazy";
      frame.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
      frame.allowFullscreen = true;
      slide.append(frame);
      const play = document.createElement("button");
      play.type = "button";
      play.className = "media-play-button";
      play.setAttribute("aria-label", `เล่นวิดีโอ ${item.title || "พระธาตุพนม"}`);
      play.innerHTML = "<span aria-hidden=\"true\">▶</span> ชมวิดีโอ";
      play.addEventListener("click", event => {
        event.stopPropagation();
        stopAutoSlide(section);
        frame.src = `${frame.src}?autoplay=1&rel=0`;
        play.remove();
      });
      slide.append(play);
    } else if (item.type === "video" && url) {
      const video = document.createElement("video");
      video.src = url;
      video.controls = true;
      video.preload = "metadata";
      video.addEventListener("play", () => stopAutoSlide(section), { once: true });
      slide.append(video);
    } else {
      const empty = document.createElement("div");
      empty.className = "slider-empty";
      empty.textContent = "ไม่สามารถแสดงสื่อนี้ได้";
      slide.append(empty);
    }
    const caption = document.createElement("figcaption");
    caption.className = "media-caption";
    caption.textContent = item.title || "";
    slide.append(caption);
    stage.append(slide);
  });
  if (items.length > 1) {
    const prev = document.createElement("button");
    prev.type = "button";
    prev.className = "slider-arrow prev";
    prev.setAttribute("aria-label", "ภาพก่อนหน้า");
    prev.textContent = "‹";
    const next = document.createElement("button");
    next.type = "button";
    next.className = "slider-arrow next";
    next.setAttribute("aria-label", "ภาพถัดไป");
    next.textContent = "›";
    const counter = document.createElement("span");
    counter.className = "slider-counter";
    counter.textContent = `${state.slideIndex[section] + 1} / ${items.length}`;
    prev.addEventListener("click", () => changeSlide(section, -1, items.length, true));
    next.addEventListener("click", () => changeSlide(section, 1, items.length, true));
    stage.append(prev, next, counter);
    setupSliderInteraction(root, stage, section, items.length);
    scheduleAutoSlide(section, items.length);
  }
}

function clearSlideTimer(section) {
  clearTimeout(slideTimers.get(section));
  slideTimers.delete(section);
}

function stopAutoSlide(section) {
  state.slideAutoStopped[section] = true;
  clearSlideTimer(section);
}

function scheduleAutoSlide(section, total) {
  clearSlideTimer(section);
  if (total < 2 || state.slideAutoStopped[section] || document.hidden || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  slideTimers.set(section, setTimeout(() => changeSlide(section, 1, total, false), SLIDE_INTERVAL_MS));
}

function setupSliderInteraction(root, stage, section, total) {
  let startX = null;
  let startY = null;
  stage.addEventListener("pointerdown", event => {
    stopAutoSlide(section);
    if (event.pointerType !== "mouse" && !event.target.closest("button, iframe, video")) {
      startX = event.clientX;
      startY = event.clientY;
    }
  });
  stage.addEventListener("pointerup", event => {
    if (startX === null || startY === null) return;
    const deltaX = event.clientX - startX;
    const deltaY = event.clientY - startY;
    startX = null;
    startY = null;
    if (Math.abs(deltaX) >= 45 && Math.abs(deltaX) > Math.abs(deltaY)) {
      changeSlide(section, deltaX < 0 ? 1 : -1, total, true);
    }
  });
  stage.addEventListener("pointercancel", () => {
    startX = null;
    startY = null;
  });
  root.onkeydown = event => {
    if (event.key !== "ArrowLeft" && event.key !== "ArrowRight") return;
    event.preventDefault();
    changeSlide(section, event.key === "ArrowRight" ? 1 : -1, total, true);
  };
}

function changeSlide(section, direction, total, userInitiated = false) {
  if (userInitiated) stopAutoSlide(section);

  const root = document.querySelector(`[data-slider="${section}"]`);
  if (!root) return;

  const slides = root.querySelectorAll('.media-slide');
  if (slides.length === 0) return;

  // 1. ดึง class 'active' ออกจากสไลด์ปัจจุบัน (ซ่อนรูปเดิม)
  if (slides[state.slideIndex[section]]) {
    slides[state.slideIndex[section]].classList.remove('active');
  }

  // 2. คำนวณหาลำดับรูปภาพถัดไป
  state.slideIndex[section] = (state.slideIndex[section] + direction + total) % total;

  // 3. ใส่ class 'active' ให้สไลด์ใหม่ (แสดงรูปใหม่)
  if (slides[state.slideIndex[section]]) {
    slides[state.slideIndex[section]].classList.add('active');
  }

  // 4. อัปเดตตัวเลขแสดงลำดับภาพ (เช่น 1 / 4)
  const counter = root.querySelector('.slider-counter');
  if (counter) {
    counter.textContent = `${state.slideIndex[section] + 1} / ${total}`;
  }

  // 5. ตั้งเวลาสำหรับสไลด์ถัดไป (ถ้าไม่ได้ใช้มือกด)
  if (!userInitiated) {
    scheduleAutoSlide(section, total);
  }
}

function openImageLightbox(item) {
  const url = safeUrl(fastGoogleDriveImageUrl(item.originalUrl || item.url));
  if (!url) return;
  const dialog = $("#imageLightbox");
  const image = $("#lightboxImage");
  const title = $("#lightboxTitle");
  const description = $("#lightboxDescription");
  const originalLink = $("#lightboxOriginalLink");
  image.src = url;
  image.alt = item.title || "ภาพพระธาตุพนม";
  title.textContent = item.title || "ภาพพระธาตุพนม";
  description.textContent = item.description || "";
  description.hidden = !item.description;
  originalLink.href = url;
  dialog.showModal();
}

function setupMenu() {
  const menu = $("#sideMenu");
  const backdrop = $("#menuBackdrop");
  const setOpen = open => {
    menu.classList.toggle("open", open);
    menu.setAttribute("aria-hidden", String(!open));
    $("#menuButton").setAttribute("aria-expanded", String(open));
    backdrop.hidden = !open;
  };
  $("#menuButton").addEventListener("click", () => setOpen(true));
  $("#closeMenuButton").addEventListener("click", () => setOpen(false));
  backdrop.addEventListener("click", () => setOpen(false));
  document.addEventListener("keydown", event => {
    if (event.key === "Escape") setOpen(false);
  });
  $("#accountButton").addEventListener("click", () => state.user ? setOpen(true) : login());
  $("#loginMenuButton").addEventListener("click", async () => {
    if (state.user) {
      await signOut(auth);
      setOpen(false);
    } else {
      await login();
    }
  });
  $("#editorMenuButton").addEventListener("click", () => {
    setOpen(false);
    openManageDialog();
  });
  $("#treeMenuButton").addEventListener("click", () => {
    setOpen(false);
    openTreeDialog();
  });
  $("#chatMenuButton").addEventListener("click", () => {
    setOpen(false);
    openChat();
  });
}

async function login() {
  if (!auth) return toast("ยังไม่สามารถเชื่อมต่อระบบสมาชิกได้", "error");
  const accountButton = $("#accountButton");
  accountButton.disabled = true;
  accountButton.textContent = "กำลังเปิดบัญชี Google...";
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({ prompt: "select_account" });
    await signInWithPopup(auth, provider);
  } catch (error) {
    console.error(error);
    if (error.code === "auth/unauthorized-domain") {
      toast("ต้องเพิ่มโดเมนเว็บไซต์นี้ใน Firebase Authorized domains", "error");
    } else if (error.code !== "auth/popup-closed-by-user") {
      toast("เข้าสู่ระบบไม่สำเร็จ กรุณาลองอีกครั้ง", "error");
    }
  } finally {
    accountButton.disabled = false;
    if (!state.user) updateAccountUI();
  }
}

async function resolveUserRole(user) {
  const isDefaultAdmin = user.email?.toLowerCase() === ADMIN_EMAIL;
  const profileRef = userDoc(user.uid);
  const membershipRef = memberDoc(user.uid);
  const [profileSnap, membershipSnap] = await Promise.all([
    getDoc(profileRef),
    getDoc(membershipRef)
  ]);
  await setDoc(profileRef, {
    email: user.email || "",
    displayName: user.displayName || "",
    photoURL: user.photoURL || "",
    globalRole: isDefaultAdmin ? "admin" : (profileSnap.data()?.globalRole || "user"),
    lastLoginAt: serverTimestamp(),
    ...(profileSnap.exists() ? {} : { createdAt: serverTimestamp() })
  }, { merge: true });
  const savedRole = membershipSnap.data()?.role;
  const role = isDefaultAdmin ? "admin" : (["admin", "manager", "user"].includes(savedRole) ? savedRole : "user");
  await setDoc(membershipRef, {
    role,
    email: user.email || "",
    displayName: user.displayName || "",
    lastLoginAt: serverTimestamp(),
    ...(membershipSnap.exists() ? {} : { joinedAt: serverTimestamp() })
  }, { merge: true });
  return role;
}

function updateAccountUI() {
  const signedIn = Boolean(state.user);
  $("#accountButton").textContent = signedIn ? (state.user.displayName || state.user.email) : "เข้าสู่ระบบ";
  $("#accountName").textContent = signedIn ? (state.user.displayName || state.user.email) : "ยังไม่ได้เข้าสู่ระบบ";
  $("#accountRole").textContent = roleLabel(state.role);
  $("#loginMenuText").textContent = signedIn ? "ออกจากระบบ" : "เข้าสู่ระบบด้วย Google";
  $("#editorRoleBadge").textContent = roleLabel(state.role);
  $("#editorMenuButton").hidden = !isAdmin();
  $("#treeMenuButton").hidden = !isAdmin();
  const avatar = $("#accountAvatar");
  avatar.replaceChildren();
  if (signedIn && safeUrl(state.user.photoURL || "")) {
    const image = document.createElement("img");
    image.src = state.user.photoURL;
    image.alt = "";
    avatar.append(image);
  } else {
    avatar.textContent = signedIn ? (state.user.displayName || state.user.email || "U").slice(0, 2) : "ผู้เยี่ยมชม";
  }
  $$(".media-update-button").forEach(button => button.hidden = !isAdmin());
  $("#commentText").placeholder = signedIn ? "เขียนความคิดเห็นอย่างสุภาพและสร้างสรรค์" : "เข้าสู่ระบบด้วย Google เพื่อร่วมแสดงความคิดเห็น";
  $("#commentText").disabled = !signedIn;
  $("#chatInput").disabled = !signedIn;
  renderAllSliders();
}

async function seedInitialMedia() {
  if (!isAdmin()) return;
  const settingRef = projectItemDoc(COLLECTIONS.settings, "content");
  const snap = await getDoc(settingRef);
  const settings = snap.data() || {};
  if (
    settings.mediaInitialized &&
    settings.storyFeatureInitialized &&
    settings.storyArtInitialized &&
    settings.storyPeopleInitialized &&
    settings.criteriaCardsInitialized &&
    settings.processOverviewInitialized &&
    settings.processStepsInitialized &&
    settings.milestoneCardsInitialized &&
    settings.heroInitialized &&
    settings.muchalindaHeroInitialized &&
    settings.muchalindaDonationInitialized
  ) return;
  const batch = writeBatch(db);
  const mediaToSeed = [
    ...(settings.mediaInitialized ? [] : DEFAULT_MEDIA),
    ...(settings.storyFeatureInitialized ? [] : [DEFAULT_FEATURE_MEDIA]),
    ...(settings.storyArtInitialized ? [] : [DEFAULT_ART_MEDIA]),
    ...(settings.storyPeopleInitialized ? [] : [DEFAULT_PEOPLE_MEDIA]),
    ...(settings.criteriaCardsInitialized ? [] : [DEFAULT_CRITERIA_ONE_MEDIA, DEFAULT_CRITERIA_TWO_MEDIA, DEFAULT_CRITERIA_THREE_MEDIA]),
    ...(settings.processOverviewInitialized ? [] : [DEFAULT_PROCESS_OVERVIEW_MEDIA]),
    ...(settings.processStepsInitialized ? [] : DEFAULT_PROCESS_MEDIA),
    ...(settings.milestoneCardsInitialized ? [] : DEFAULT_MILESTONE_MEDIA),
    ...(settings.heroInitialized ? [] : [DEFAULT_HERO_MEDIA]),
    ...(settings.muchalindaHeroInitialized ? [] : [DEFAULT_MUCHALINDA_HERO_MEDIA]),
    ...(settings.muchalindaDonationInitialized ? [] : DEFAULT_MUCHALINDA_DONATION_MEDIA)
  ];
  mediaToSeed.forEach(item => {
    const mediaRecord = {
      section: item.section,
      placement: item.placement || "",
      type: item.type,
      title: item.title,
      description: item.description || "",
      url: item.url,
      order: item.order,
      createdBy: state.user.uid,
      createdByEmail: state.user.email,
      createdAt: serverTimestamp(),
      updatedAt: serverTimestamp()
    };
    if (item.originalUrl) mediaRecord.originalUrl = item.originalUrl;
    batch.set(projectItemDoc(COLLECTIONS.media, item.id), mediaRecord);
  });
  batch.set(projectDoc(), {
    key: PROJECT_KEY,
    title: "พระธาตุพนม สู่มรดกโลก",
    visibility: "public",
    updatedAt: serverTimestamp()
  }, { merge: true });
  batch.set(settingRef, {
    mediaInitialized: true,
    storyFeatureInitialized: true,
    storyArtInitialized: true,
    storyPeopleInitialized: true,
    criteriaCardsInitialized: true,
    processOverviewInitialized: true,
    processStepsInitialized: true,
    milestoneCardsInitialized: true,
    heroInitialized: true,
    muchalindaHeroInitialized: true,
    muchalindaDonationInitialized: true,
    initializedAt: serverTimestamp(),
    initializedBy: state.user.uid
  }, { merge: true });
  await batch.commit();
}

function listenForContent() {
  if (!db) return;
  onSnapshot(projectItemDoc(COLLECTIONS.settings, "content"), snap => {
    state.mediaInitialized = Boolean(snap.exists() && snap.data().mediaInitialized);
    if (state.mediaInitialized && state.mediaLoaded && state.usingFallbackMedia) {
      state.media = [];
      state.usingFallbackMedia = false;
      renderAllSliders();
    }
  }, error => console.warn("Settings unavailable", error.code));
  onSnapshot(projectItemDoc(COLLECTIONS.settings, "driveMediaSync"), snap => {
    state.driveSyncStatus = snap.exists() ? snap.data() : null;
    renderDriveSyncStatus();
  }, error => console.warn("Drive sync status unavailable", error.code));
  onSnapshot(query(projectCollection(COLLECTIONS.media), orderBy("order", "asc")), snap => {
    const stored = snap.docs.map(item => ({ id: item.id, ...item.data() }));
    state.mediaLoaded = true;
    state.usingFallbackMedia = !(stored.length || state.mediaInitialized);
    state.media = stored.length || state.mediaInitialized ? stored : [...DEFAULT_MEDIA, DEFAULT_FEATURE_MEDIA, DEFAULT_ART_MEDIA, DEFAULT_PEOPLE_MEDIA, DEFAULT_CRITERIA_ONE_MEDIA, DEFAULT_CRITERIA_TWO_MEDIA, DEFAULT_CRITERIA_THREE_MEDIA, DEFAULT_PROCESS_OVERVIEW_MEDIA, ...DEFAULT_PROCESS_MEDIA, ...DEFAULT_MILESTONE_MEDIA, DEFAULT_MUCHALINDA_HERO_MEDIA, ...DEFAULT_MUCHALINDA_DONATION_MEDIA];
    renderAllSliders();
    if ($("#treeDialog")?.open && state.siteNodes.length) {
      renderSiteTree();
      const selectedNode = state.siteNodes.find(node => node.id === state.selectedTreeNodeId) || null;
      if (selectedNode) renderLinkedTreeContent(selectedNode);
    }
  }, error => {
    console.warn("Media unavailable", error.code);
    state.media = [...DEFAULT_MEDIA, DEFAULT_FEATURE_MEDIA, DEFAULT_ART_MEDIA, DEFAULT_PEOPLE_MEDIA, DEFAULT_CRITERIA_ONE_MEDIA, DEFAULT_CRITERIA_TWO_MEDIA, DEFAULT_CRITERIA_THREE_MEDIA, DEFAULT_PROCESS_OVERVIEW_MEDIA, ...DEFAULT_PROCESS_MEDIA, ...DEFAULT_MILESTONE_MEDIA, DEFAULT_MUCHALINDA_HERO_MEDIA, ...DEFAULT_MUCHALINDA_DONATION_MEDIA];
    renderAllSliders();
  });
  onSnapshot(query(projectCollection(COLLECTIONS.comments), orderBy("createdAt", "desc"), limit(50)), snap => {
    renderComments(snap.docs.map(item => ({ id: item.id, ...item.data() })));
  }, error => console.warn("Comments unavailable", error.code));
}

function openMediaDialog(section = "story", item = null) {
  if (!isAdmin()) return toast("เฉพาะ Admin เท่านั้นที่จัดการสื่อได้", "error");
  state.editingMedia = item;
  $("#mediaId").value = item?.id || "";
  $("#mediaSection").value = item ? mediaSectionKey(item) : section;
  $("#mediaType").value = item?.type || "image";
  $("#mediaTitle").value = item?.title || "";
  $("#mediaDescription").value = item?.description || "";
  $("#mediaUrl").value = item?.url ? safeUrl(item.url) : "";
  $("#mediaFile").value = "";
  const status = $("#mediaFormStatus");
  if (status) {
    status.hidden = true;
    status.textContent = "";
  }
  $("#mediaSection").disabled = Boolean(state.manageSection);
  $("#mediaDialogTitle").textContent = item ? "แก้ไขรูปภาพหรือวิดีโอ" : "เพิ่มรูปภาพหรือวิดีโอ";
  $("#mediaDialog").showModal();
}

function renderManageMedia() {
  const root = $("#manageMediaList");
  if (!root) return;
  root.replaceChildren();
  const items = state.manageSection
    ? state.media.filter(item => mediaSectionKey(item) === state.manageSection)
    : state.media;
  if (!items.length) {
    root.innerHTML = '<p class="empty-state">ยังไม่มีรายการสื่อ</p>';
    return;
  }
  const itemsBySection = new Map();
  state.media.forEach(item => {
    const section = mediaSectionKey(item);
    if (!itemsBySection.has(section)) itemsBySection.set(section, []);
    itemsBySection.get(section).push(item);
  });
  itemsBySection.forEach(sectionItems => {
    sectionItems.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.id).localeCompare(String(b.id)));
  });
  items.forEach(item => {
    const sectionItems = itemsBySection.get(mediaSectionKey(item)) || [];
    const sectionIndex = sectionItems.findIndex(candidate => candidate.id === item.id);
    const row = document.createElement("div");
    row.className = "manage-media-row";
    const isDriveMedia = item.source === "google-drive";
    row.classList.toggle("is-drive", isDriveMedia);
    const info = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = item.title || "ไม่มีชื่อ";
    const meta = document.createElement("span");
    meta.textContent = `${SECTIONS[mediaSectionKey(item)] || item.section} · ${item.type === "image" ? "รูปภาพ" : "วิดีโอ"} · ลำดับ ${sectionIndex + 1} จาก ${sectionItems.length}`;
    info.append(title, meta);
    if (isDriveMedia) {
      meta.textContent = (SECTIONS[mediaSectionKey(item)] || item.section) + " · " +
        (item.type === "image" ? "รูปภาพ" : "วิดีโอ") + " · Google Drive";
    }
    const actions = document.createElement("div");
    actions.className = "row-actions";
    if (isDriveMedia) {
      const badge = document.createElement("span");
      badge.className = "media-source-badge";
      badge.textContent = "จัดการจาก Drive";
      actions.append(badge);
      const driveUrl = safeUrl(item.driveWebViewLink || "");
      if (driveUrl) {
        const open = document.createElement("a");
        open.className = "drive-source-link";
        open.href = driveUrl;
        open.target = "_blank";
        open.rel = "noopener";
        open.textContent = "เปิดไฟล์ ↗";
        actions.append(open);
      }
      row.append(info, actions);
      root.append(row);
      return;
    }
    const moveUp = document.createElement("button");
    moveUp.type = "button";
    moveUp.className = "order-button";
    moveUp.textContent = "↑";
    moveUp.title = "เลื่อนสื่อขึ้นหนึ่งตำแหน่ง";
    moveUp.setAttribute("aria-label", `เลื่อน “${item.title || "สื่อนี้"}” ขึ้นหนึ่งตำแหน่ง`);
    moveUp.disabled = sectionIndex <= 0;
    moveUp.addEventListener("click", () => moveMedia(item, -1));
    const moveDown = document.createElement("button");
    moveDown.type = "button";
    moveDown.className = "order-button";
    moveDown.textContent = "↓";
    moveDown.title = "เลื่อนสื่อลงหนึ่งตำแหน่ง";
    moveDown.setAttribute("aria-label", `เลื่อน “${item.title || "สื่อนี้"}” ลงหนึ่งตำแหน่ง`);
    moveDown.disabled = sectionIndex < 0 || sectionIndex === sectionItems.length - 1;
    moveDown.addEventListener("click", () => moveMedia(item, 1));
    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "แก้ไข";
    edit.addEventListener("click", () => openMediaDialog(mediaSectionKey(item), item));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.textContent = "ลบ";
    remove.addEventListener("click", () => confirmAction("ลบสื่อนี้?", `“${item.title}” จะถูกลบออกจากเว็บไซต์`, () => deleteMedia(item)));
    actions.append(moveUp, moveDown, edit, remove);
    row.append(info, actions);
    root.append(row);
  });
}

async function moveMedia(item, direction) {
  if (!isAdmin() || ![-1, 1].includes(direction)) return;
  if (item.source === "google-drive") return toast("เปลี่ยนลำดับด้วยการใส่เลขนำหน้าชื่อไฟล์ใน Google Drive", "error");
  const section = mediaSectionKey(item);
  const items = state.media
    .filter(candidate => mediaSectionKey(candidate) === section)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.id).localeCompare(String(b.id)));
  const currentIndex = items.findIndex(candidate => candidate.id === item.id);
  const targetIndex = currentIndex + direction;
  if (currentIndex < 0 || targetIndex < 0 || targetIndex >= items.length) return;
  if (items.length > 499) return toast("รายการสื่อมีจำนวนมากเกินกว่าจะจัดลำดับพร้อมกัน", "error");

  [items[currentIndex], items[targetIndex]] = [items[targetIndex], items[currentIndex]];
  const buttons = $$(".manage-media-row button");
  buttons.forEach(button => { button.disabled = true; });
  try {
    const batch = writeBatch(db);
    items.forEach((entry, index) => {
      batch.update(projectItemDoc(COLLECTIONS.media, entry.id), {
        order: (index + 1) * 10,
        updatedAt: serverTimestamp(),
        updatedBy: state.user.uid
      });
    });
    await batch.commit();
    toast(direction < 0 ? "เลื่อนสื่อขึ้นแล้ว" : "เลื่อนสื่อลงแล้ว");
  } catch (error) {
    console.error(error);
    toast("เปลี่ยนลำดับสื่อไม่สำเร็จ", "error");
    renderManageMedia();
  }
}

async function saveMedia(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  const editing = state.editingMedia;
  const form = $("#mediaForm");
  const saveButton = $("#saveMediaButton");
  const uploadedPaths = [];
  let committed = false;
  saveButton.disabled = true;
  saveButton.textContent = "กำลังบันทึก...";
  const formStatus = $("#mediaFormStatus");
  if (formStatus) {
    formStatus.hidden = true;
    formStatus.textContent = "";
  }
  try {
    const selectedSection = $("#mediaSection").value;
    const featurePlacement = {
      storyFeature: "feature01",
      storyArt: "feature02",
      storyPeople: "feature03",
      criteriaOne: "criterion01",
      criteriaTwo: "criterion02",
      criteriaThree: "criterion03",
      processOverview: "overview",
      processOne: "step01",
      processTwo: "step02",
      processThree: "step03",
      processFour: "step04",
      milestoneOne: "milestone01",
      milestoneTwo: "milestone02",
      milestoneThree: "milestone03",
      milestoneFour: "milestone04",
      muchalindaHero: "hero",
      muchalindaDonation: "donation"
    };
    const criteriaCard = ["criteriaOne", "criteriaTwo", "criteriaThree"].includes(selectedSection);
    const processStep = ["processOverview", "processOne", "processTwo", "processThree", "processFour"].includes(selectedSection);
    const milestoneCard = ["milestoneOne", "milestoneTwo", "milestoneThree", "milestoneFour"].includes(selectedSection);
    const muchalindaSection = ["muchalindaHero", "muchalindaDonation"].includes(selectedSection);
    const section = selectedSection === "hero" || featurePlacement[selectedSection]
      ? (criteriaCard ? "criteria" : processStep ? "process" : milestoneCard ? "milestones" : muchalindaSection ? "muchalinda" : "story")
      : selectedSection;
    const placement = selectedSection === "hero" ? "hero" : featurePlacement[selectedSection] || "";
    const type = $("#mediaType").value;
    const title = $("#mediaTitle").value.trim();
    const description = $("#mediaDescription").value.trim();
    const file = $("#mediaFile").files[0];
    const urlInput = $("#mediaUrl").value.trim();
    let url = urlInput || editing?.url || "";
    let storagePath = editing?.storagePath || "";
    const previousStoragePaths = [editing?.storagePath, editing?.originalStoragePath].filter(Boolean);
    if (!SECTIONS[selectedSection] || !["image", "video"].includes(type) || !title) throw new Error("กรุณากรอกข้อมูลให้ครบ");
    if (file) {
      const isImage = file.type.startsWith("image/");
      const isVideo = file.type.startsWith("video/");
      if ((type === "image" && !isImage) || (type === "video" && !isVideo)) throw new Error("ประเภทไฟล์ไม่ตรงกับที่เลือก");
      if (type === "video" && file.size > 100 * 1024 * 1024) throw new Error("วิดีโอต้องมีขนาดไม่เกิน 100 MB");
      const timestamp = Date.now();
      if (type === "image") {
        saveButton.textContent = "กำลังปรับภาพคุณภาพสูง...";
        const optimizedFile = await optimizeImageFile(file, selectedSection);
        const safeName = optimizedFile.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "image.webp";
        storagePath = `projects/${PROJECT_KEY}/media/${state.user.uid}/${timestamp}-${safeName}`;
        saveButton.textContent = "กำลังอัปโหลดรูปภาพ...";
        const uploaded = await uploadBytes(ref(storage, storagePath), optimizedFile, { contentType: optimizedFile.type });
        uploadedPaths.push(storagePath);
        url = await getDownloadURL(uploaded.ref);
      } else {
        const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || "video";
        storagePath = `projects/${PROJECT_KEY}/media/${state.user.uid}/${timestamp}-${safeName}`;
        saveButton.textContent = "กำลังอัปโหลดวิดีโอ...";
        const uploaded = await uploadBytes(ref(storage, storagePath), file, { contentType: file.type });
        uploadedPaths.push(storagePath);
        url = await getDownloadURL(uploaded.ref);
      }
    } else if (urlInput && urlInput !== editing?.url) {
      storagePath = "";
    }
    if (!safeUrl(url)) throw new Error("กรุณาใส่ลิงก์ https:// หรือเลือกไฟล์");
    if (!file && type === "video" && isGoogleDriveUrl(url) && !googleDriveFileId(url)) {
      throw new Error("ลิงก์ Google Drive ไม่ถูกต้อง กรุณาใช้ลิงก์แชร์ของไฟล์วิดีโอ");
    }
    if (!file && type === "image" && isGoogleDriveUrl(url)) {
      if (!googleDriveFileId(url)) throw new Error("ลิงก์ Google Drive ไม่ถูกต้อง กรุณาใช้ลิงก์แชร์ของไฟล์รูปภาพ");
      url = fastGoogleDriveImageUrl(url);
    }
    const payload = {
      section, placement, type, title, description, url, storagePath,
      order: editing?.order || Date.now(),
      updatedAt: serverTimestamp(),
      updatedBy: state.user.uid
    };
    if (editing) {
      await updateDoc(projectItemDoc(COLLECTIONS.media, editing.id), {
        ...payload,
        originalUrl: deleteField(),
        originalStoragePath: deleteField()
      });
    } else {
      await addDoc(projectCollection(COLLECTIONS.media), {
        ...payload,
        createdAt: serverTimestamp(),
        createdBy: state.user.uid,
        createdByEmail: state.user.email || ""
      });
    }
    committed = true;
    const currentStoragePaths = [storagePath].filter(Boolean);
    const obsoletePaths = previousStoragePaths.filter(path => !currentStoragePaths.includes(path));
    await Promise.allSettled(obsoletePaths.map(path => deleteObject(ref(storage, path))));
    form.reset();
    $("#mediaDialog").close();
    toast(editing ? "แก้ไขสื่อเรียบร้อยแล้ว" : "เพิ่มสื่อเรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    if (!committed) await Promise.allSettled(uploadedPaths.map(path => deleteObject(ref(storage, path))));
    const permissionError = error?.code === "permission-denied" || error?.code === "storage/unauthorized";
    const message = permissionError
      ? "Firebase ยังไม่อนุญาตให้บันทึกสื่อในหัวข้อนี้ กรุณา Publish firestore.rules รุ่นล่าสุด แล้วลองอีกครั้ง"
      : (error.message || "บันทึกสื่อไม่สำเร็จ กรุณาลองใหม่อีกครั้ง");
    if (formStatus) {
      formStatus.textContent = message;
      formStatus.hidden = false;
    }
    toast(message, "error");
  } finally {
    saveButton.disabled = false;
    saveButton.textContent = "บันทึก";
  }
}

async function deleteMedia(item) {
  if (!isAdmin()) return;
  if (item.source === "google-drive") return toast("ลบไฟล์นี้จาก Google Drive แล้วระบบจะนำออกในรอบซิงก์ถัดไป", "error");
  try {
    await deleteDoc(projectItemDoc(COLLECTIONS.media, item.id));
    const storagePaths = [item.storagePath, item.originalStoragePath].filter(Boolean);
    await Promise.allSettled(storagePaths.map(path => deleteObject(ref(storage, path))));
    toast("ลบสื่อเรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    toast("ลบสื่อไม่สำเร็จ", "error");
  }
}

async function openManageDialog(section = "") {
  if (!isAdmin()) return;
  state.manageSection = SECTIONS[section] ? section : "";
  $("#manageRoleText").textContent = `เข้าสู่ระบบในสิทธิ์ ${roleLabel(state.role)}`;
  $("#manageDialogTitle").textContent = state.manageSection ? `อัพเดท — ${SECTIONS[state.manageSection]}` : "Edit Web";
  $("#manageSectionText").textContent = state.manageSection ? "เพิ่ม แก้ไข หรือลบสื่อของหัวข้อนี้" : "จัดการสื่อทุกหัวข้อและกำหนดสิทธิ์ผู้ใช้";
  $("#userRoleSection").hidden = Boolean(state.manageSection);
  $("#addMediaButton").textContent = state.manageSection ? "＋ เพิ่มสื่อในหัวข้อนี้" : "＋ เพิ่มรูปภาพหรือวิดีโอ";
  renderManageMedia();
  $("#manageDialog").showModal();
  if (!state.manageSection) await loadUsers();
}

async function loadUsers() {
  const root = $("#userList");
  root.innerHTML = '<p class="empty-state">กำลังโหลดรายชื่อผู้ใช้...</p>';
  try {
    const [snap, memberSnap] = await Promise.all([
      getDocs(query(usersCollection(), orderBy("email", "asc"))),
      getDocs(projectCollection(COLLECTIONS.members))
    ]);
    const memberships = new Map(memberSnap.docs.map(record => [record.id, record.data()]));
    root.replaceChildren();
    snap.forEach(record => {
      const user = {
        id: record.id,
        ...record.data(),
        role: memberships.get(record.id)?.role || (record.data().globalRole === "admin" ? "admin" : "user")
      };
      const row = document.createElement("div");
      row.className = "user-row";
      const info = document.createElement("div");
      const name = document.createElement("strong");
      name.textContent = user.displayName || user.email || "ผู้ใช้";
      const email = document.createElement("span");
      email.textContent = user.email || "";
      info.append(name, email);
      const select = document.createElement("select");
      ["user", "manager", "admin"].forEach(role => {
        const option = document.createElement("option");
        option.value = role;
        option.textContent = roleLabel(role);
        option.selected = user.role === role;
        select.append(option);
      });
      if (user.email?.toLowerCase() === ADMIN_EMAIL) select.disabled = true;
      select.addEventListener("change", async () => {
        try {
          const roleUpdate = { role: select.value, roleUpdatedAt: serverTimestamp(), roleUpdatedBy: state.user.uid };
          await setDoc(memberDoc(user.id), {
            ...roleUpdate,
            email: user.email || "",
            displayName: user.displayName || ""
          }, { merge: true });
          toast("ปรับสิทธิ์ผู้ใช้เรียบร้อยแล้ว");
        } catch (error) {
          select.value = user.role || "user";
          toast("ปรับสิทธิ์ไม่สำเร็จ", "error");
        }
      });
      row.append(info, select);
      root.append(row);
    });
    if (!root.children.length) root.innerHTML = '<p class="empty-state">ยังไม่มีผู้ใช้เข้าสู่ระบบ</p>';
  } catch (error) {
    console.error(error);
    root.innerHTML = '<p class="empty-state">ไม่สามารถโหลดรายชื่อผู้ใช้ได้</p>';
  }
}

function renderComments(comments) {
  const root = $("#commentList");
  root.replaceChildren();
  if (!comments.length) {
    root.innerHTML = '<p class="empty-state">ยังไม่มีความคิดเห็น เป็นคนแรกที่ร่วมส่งกำลังใจได้เลย</p>';
    return;
  }
  comments.forEach(comment => {
    const card = document.createElement("article");
    card.className = "comment-card";
    const header = document.createElement("header");
    const name = document.createElement("strong");
    name.textContent = comment.authorName || "ผู้ใช้งาน";
    const meta = document.createElement("span");
    meta.textContent = `${SECTIONS[comment.section] || "ภาพรวมเว็บไซต์"} · ${formatDate(comment.createdAt)}`;
    const body = document.createElement("p");
    body.textContent = comment.text || "";
    header.append(name, meta);
    card.append(header, body);
    if (isAdmin() || (state.user && comment.authorId === state.user.uid)) {
      const remove = document.createElement("button");
      remove.className = "small-delete";
      remove.type = "button";
      remove.title = "ลบความคิดเห็น";
      remove.textContent = "ลบ";
      remove.addEventListener("click", () => confirmAction("ลบความคิดเห็น?", "ความคิดเห็นนี้จะถูกนำออกจากเว็บไซต์", async () => {
        try { await deleteDoc(projectItemDoc(COLLECTIONS.comments, comment.id)); } catch { toast("ลบความคิดเห็นไม่สำเร็จ", "error"); }
      }));
      card.append(remove);
    }
    root.append(card);
  });
}

async function submitComment(event) {
  event.preventDefault();
  if (!state.user) return login();
  const text = $("#commentText").value.trim();
  if (!text) return toast("กรุณาเขียนความคิดเห็น");
  const button = $("#commentForm button[type=submit]");
  button.disabled = true;
  try {
    await addDoc(projectCollection(COLLECTIONS.comments), {
      text,
      section: $("#commentSection").value,
      authorId: state.user.uid,
      authorName: state.user.displayName || state.user.email || "ผู้ใช้งาน",
      authorEmail: state.user.email || "",
      createdAt: serverTimestamp()
    });
    $("#commentText").value = "";
    toast("ส่งความคิดเห็นเรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    toast("ส่งความคิดเห็นไม่สำเร็จ", "error");
  } finally {
    button.disabled = false;
  }
}

function openChat() {
  $("#chatPanel").classList.add("open");
  $("#chatPanel").setAttribute("aria-hidden", "false");
  if (!state.user) {
    $("#chatMessages").innerHTML = '<p class="empty-state">กรุณาเข้าสู่ระบบด้วย Google เพื่อสนทนากับ Admin หรือ Manager</p>';
    $("#chatSubtitle").textContent = "เข้าสู่ระบบเพื่อเริ่มสนทนา";
    return;
  }
  if (isStaff()) listenChatThreads();
  else {
    $("#chatThreadList").hidden = true;
    state.activeChatUid = state.user.uid;
    $("#chatSubtitle").textContent = "สนทนากับ Admin และ Manager";
    listenMessages(state.user.uid);
  }
}

function listenChatThreads() {
  $("#chatThreadList").hidden = false;
  if (state.unsubThreads) state.unsubThreads();
  state.unsubThreads = onSnapshot(query(projectCollection(COLLECTIONS.chats), orderBy("updatedAt", "desc"), limit(30)), snap => {
    const root = $("#chatThreadList");
    root.replaceChildren();
    if (snap.empty) {
      root.innerHTML = '<p class="empty-state">ยังไม่มีข้อความจากผู้ใช้</p>';
      $("#chatMessages").innerHTML = '<p class="empty-state">เมื่อมีผู้ใช้ส่งข้อความ รายการสนทนาจะปรากฏที่นี่</p>';
      return;
    }
    snap.forEach(record => {
      const thread = { id: record.id, ...record.data() };
      const button = document.createElement("button");
      button.className = `thread-button${state.activeChatUid === thread.id ? " active" : ""}`;
      button.type = "button";
      const strong = document.createElement("strong");
      strong.textContent = thread.ownerName || thread.ownerEmail || "ผู้ใช้";
      const span = document.createElement("span");
      span.textContent = thread.lastMessage || "";
      button.append(strong, span);
      button.addEventListener("click", () => {
        state.activeChatUid = thread.id;
        $("#chatSubtitle").textContent = thread.ownerName || thread.ownerEmail || "ผู้ใช้";
        listenMessages(thread.id);
        listenChatThreads();
      });
      root.append(button);
    });
    if (!state.activeChatUid && snap.docs[0]) {
      state.activeChatUid = snap.docs[0].id;
      const first = snap.docs[0].data();
      $("#chatSubtitle").textContent = first.ownerName || first.ownerEmail || "ผู้ใช้";
      listenMessages(state.activeChatUid);
    }
  }, error => {
    console.error(error);
    $("#chatThreadList").innerHTML = '<p class="empty-state">ไม่สามารถโหลดรายการสนทนาได้</p>';
  });
}

function listenMessages(uid) {
  if (state.unsubMessages) state.unsubMessages();
  state.unsubMessages = onSnapshot(query(chatMessagesCollection(uid), orderBy("createdAt", "asc"), limit(100)), snap => {
    const root = $("#chatMessages");
    root.replaceChildren();
    if (snap.empty) root.innerHTML = '<p class="empty-state">เริ่มบทสนทนาได้เลย ข้อความจะส่งถึงทีมผู้ดูแล</p>';
    snap.forEach(record => {
      const message = record.data();
      const bubble = document.createElement("div");
      bubble.className = `chat-message${message.senderId === state.user?.uid ? " mine" : ""}`;
      const text = document.createElement("span");
      text.textContent = message.text || "";
      const meta = document.createElement("small");
      meta.textContent = `${message.senderName || roleLabel(message.senderRole)} · ${formatDate(message.createdAt)}`;
      bubble.append(text, meta);
      root.append(bubble);
    });
    root.scrollTop = root.scrollHeight;
  }, error => {
    console.error(error);
    $("#chatMessages").innerHTML = '<p class="empty-state">ไม่สามารถโหลดข้อความได้</p>';
  });
}

async function sendChat(event) {
  event.preventDefault();
  if (!state.user) return login();
  const text = $("#chatInput").value.trim();
  const uid = isStaff() ? state.activeChatUid : state.user.uid;
  if (!text) return;
  if (!uid) return toast("กรุณาเลือกผู้สนทนา", "error");
  const button = $("#chatForm button");
  button.disabled = true;
  try {
    const threadRef = projectItemDoc(COLLECTIONS.chats, uid);
    const threadSnap = await getDoc(threadRef);
    const ownerData = !isStaff() ? {
      ownerId: state.user.uid,
      ownerName: state.user.displayName || state.user.email || "ผู้ใช้",
      ownerEmail: state.user.email || ""
    } : threadSnap.data() || { ownerId: uid };
    await setDoc(threadRef, {
      ...ownerData,
      lastMessage: text.slice(0, 160),
      updatedAt: serverTimestamp(),
      ...(threadSnap.exists() ? {} : { createdAt: serverTimestamp() })
    }, { merge: true });
    await addDoc(chatMessagesCollection(uid), {
      text,
      senderId: state.user.uid,
      senderName: state.user.displayName || state.user.email || roleLabel(state.role),
      senderRole: state.role,
      createdAt: serverTimestamp()
    });
    $("#chatInput").value = "";
  } catch (error) {
    console.error(error);
    toast("ส่งข้อความไม่สำเร็จ", "error");
  } finally {
    button.disabled = false;
  }
}

const TREE_NODE_TYPES = {
  project: { label: "โครงการ", icon: "◆" },
  page: { label: "หน้าเนื้อหา", icon: "▤" },
  news: { label: "ข่าวและกิจกรรม", icon: "◫" },
  media: { label: "ภาพและวิดีโอ", icon: "▣" },
  document: { label: "เอกสาร", icon: "▧" },
  donation: { label: "ร่วมบุญ", icon: "♡" },
  link: { label: "ลิงก์ภายนอก", icon: "↗" },
  folder: { label: "หมวดหมู่", icon: "◇" }
};

const TREE_CONTENT_LINKS = {
  "project:world-heritage": { label: "ข้อมูลโครงการพระธาตุพนม สู่มรดกโลก", kind: "project", ref: "world-heritage" },
  "media:all": { label: "รูปภาพและวิดีโอทั้งหมด", kind: "media", ref: "all" },
  "media:hero": { label: "ภาพหลักด้านบน", kind: "media", ref: "hero" },
  "media:storyFeature": { label: "พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา", kind: "media", ref: "storyFeature" },
  "media:storyArt": { label: "พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม", kind: "media", ref: "storyArt" },
  "media:storyPeople": { label: "พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน", kind: "media", ref: "storyPeople" },
  "media:criteriaOne": { label: "คุณค่าโดดเด่นหมายเลข 1", kind: "media", ref: "criteriaOne" },
  "media:criteriaTwo": { label: "คุณค่าโดดเด่นหมายเลข 2", kind: "media", ref: "criteriaTwo" },
  "media:criteriaThree": { label: "คุณค่าโดดเด่นหมายเลข 3", kind: "media", ref: "criteriaThree" },
  "media:processOverview": { label: "สไลด์ภาพรวม — งานที่ต้องทำร่วมกัน", kind: "media", ref: "processOverview" },
  "media:processOne": { label: "งานที่ต้องทำร่วมกัน ข้อ 1", kind: "media", ref: "processOne" },
  "media:processTwo": { label: "งานที่ต้องทำร่วมกัน ข้อ 2", kind: "media", ref: "processTwo" },
  "media:processThree": { label: "งานที่ต้องทำร่วมกัน ข้อ 3", kind: "media", ref: "processThree" },
  "media:processFour": { label: "งานที่ต้องทำร่วมกัน ข้อ 4", kind: "media", ref: "processFour" },
  "media:milestoneOne": { label: "หมุดหมายสำคัญ ข้อ 1", kind: "media", ref: "milestoneOne" },
  "media:milestoneTwo": { label: "หมุดหมายสำคัญ ข้อ 2", kind: "media", ref: "milestoneTwo" },
  "media:milestoneThree": { label: "หมุดหมายสำคัญ ข้อ 3", kind: "media", ref: "milestoneThree" },
  "media:milestoneFour": { label: "หมุดหมายสำคัญ ข้อ 4", kind: "media", ref: "milestoneFour" },
  "media:story": { label: "เรื่องราวแห่งศรัทธา", kind: "media", ref: "story" },
  "media:criteria": { label: "คุณค่าโดดเด่นเป็นสากล", kind: "media", ref: "criteria" },
  "media:milestones": { label: "หมุดหมายสำคัญ", kind: "media", ref: "milestones" },
  "media:videos": { label: "คลังวิดีโอจาก Google Drive", kind: "media", ref: "videos" },
  "media:muchalindaHero": { label: "ภาพนำ — โครงการบูรณะสระมุจลินท์", kind: "media", ref: "muchalindaHero" },
  "media:muchalindaDonation": { label: "ร่วมบุญ — โครงการบูรณะสระมุจลินท์", kind: "media", ref: "muchalindaDonation" },
  "content:news": { label: "ข่าวและกิจกรรมของโครงการ", kind: "content", ref: "news" },
  "content:document": { label: "เอกสารเผยแพร่ของโครงการ", kind: "content", ref: "document" },
  "content:donation": { label: "ช่องทางร่วมบุญของโครงการ", kind: "content", ref: "donation" }
};

const treeNodesCollection = () => projectCollection(COLLECTIONS.siteNodes);
const treeNodeDoc = id => projectItemDoc(COLLECTIONS.siteNodes, id);
const treeNodeType = type => TREE_NODE_TYPES[type] || TREE_NODE_TYPES.page;
const liveTreeNodes = () => state.siteNodes.filter(node => !node.deletedAt);

function normalizeSlug(value) {
  return String(value || "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 100);
}

function childTreeNodes(parentId, includeDeleted = false) {
  return state.siteNodes
    .filter(node => (node.parentId || "") === (parentId || "") && (includeDeleted || !node.deletedAt))
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title).localeCompare(String(b.title), "th"));
}

function descendantTreeNodeIds(nodeId) {
  const found = new Set();
  const visit = parentId => childTreeNodes(parentId, true).forEach(child => {
    if (found.has(child.id)) return;
    found.add(child.id);
    visit(child.id);
  });
  visit(nodeId);
  return found;
}

async function seedInitialSiteTree() {
  const snap = await getDocs(treeNodesCollection());
  if (!snap.empty) return;
  const seed = [
    { id: "site-root", parentId: "", type: "folder", title: "พระธาตุพนม", slug: "that-phanom", order: 10, published: false, description: "โหนดหลักของเว็บไซต์และทุกโครงการ" },
    { id: "project-world-heritage", parentId: "site-root", type: "project", title: "พระธาตุพนม สู่มรดกโลก", slug: "world-heritage", order: 10, published: false, description: "โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม", contentType: "project", contentRef: "world-heritage" },
    { id: "page-hero", parentId: "project-world-heritage", type: "media", title: "ภาพหลักด้านบน", slug: "hero", order: 5, published: false, description: "สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์", contentType: "media", contentRef: "hero" },
    { id: "page-history", parentId: "project-world-heritage", type: "page", title: "ความเป็นมา", slug: "history", order: 10, published: false, description: "ประวัติความเป็นมาของพระธาตุพนม", contentType: "media", contentRef: "story" },
    { id: "page-story-feature", parentId: "project-world-heritage", type: "media", title: "พื้นที่หมายเลข 01 — เรื่องราวแห่งศรัทธา", slug: "story-feature", order: 15, published: false, description: "สื่อเด่นในพื้นที่หมายเลข 01", contentType: "media", contentRef: "storyFeature" },
    { id: "page-story-art", parentId: "project-world-heritage", type: "media", title: "พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม", slug: "story-art", order: 16, published: false, description: "สื่อในพื้นที่หมายเลข 02", contentType: "media", contentRef: "storyArt" },
    { id: "page-story-people", parentId: "project-world-heritage", type: "media", title: "พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน", slug: "story-people", order: 17, published: false, description: "สื่อในพื้นที่หมายเลข 03", contentType: "media", contentRef: "storyPeople" },
    { id: "page-value", parentId: "project-world-heritage", type: "page", title: "คุณค่าโดดเด่นเป็นสากล", slug: "outstanding-value", order: 20, published: false, description: "เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก", contentType: "media", contentRef: "criteria" },
    { id: "page-criteria-one", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 1", slug: "criteria-one", order: 10, published: false, description: "สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ", contentType: "media", contentRef: "criteriaOne" },
    { id: "page-criteria-two", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 2", slug: "criteria-two", order: 20, published: false, description: "สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม", contentType: "media", contentRef: "criteriaTwo" },
    { id: "page-criteria-three", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 3", slug: "criteria-three", order: 30, published: false, description: "สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่", contentType: "media", contentRef: "criteriaThree" },
    { id: "page-process", parentId: "project-world-heritage", type: "folder", title: "งานที่ต้องทำร่วมกัน", slug: "shared-work", order: 25, published: false, description: "จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน" },
    { id: "page-process-overview", parentId: "page-process", type: "media", title: "สไลด์ภาพรวมงานที่ต้องทำร่วมกัน", slug: "process-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน", contentType: "media", contentRef: "processOverview" },
    { id: "page-process-one", parentId: "page-process", type: "media", title: "1 กำหนดคุณค่าและขอบเขต", slug: "process-one", order: 10, published: false, description: "สื่อประกอบงานข้อ 1", contentType: "media", contentRef: "processOne" },
    { id: "page-process-two", parentId: "page-process", type: "media", title: "2 จัดทำแผนอนุรักษ์และบริหาร", slug: "process-two", order: 20, published: false, description: "สื่อประกอบงานข้อ 2", contentType: "media", contentRef: "processTwo" },
    { id: "page-process-three", parentId: "page-process", type: "media", title: "3 สร้างการมีส่วนร่วม", slug: "process-three", order: 30, published: false, description: "สื่อประกอบงานข้อ 3", contentType: "media", contentRef: "processThree" },
    { id: "page-process-four", parentId: "page-process", type: "media", title: "4 จัดทำเอกสารเสนอชื่อ", slug: "process-four", order: 40, published: false, description: "สื่อประกอบงานข้อ 4", contentType: "media", contentRef: "processFour" },
    { id: "page-milestones", parentId: "project-world-heritage", type: "folder", title: "หมุดหมายสำคัญ", slug: "milestones", order: 30, published: false, description: "อดีตที่หล่อหลอมอนาคต" },
    { id: "page-milestones-overview", parentId: "page-milestones", type: "media", title: "สไลด์ภาพรวมหมุดหมายสำคัญ", slug: "milestones-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ", contentType: "media", contentRef: "milestones" },
    { id: "page-milestone-one", parentId: "page-milestones", type: "media", title: "1 โครงสร้างยุคแรก", slug: "milestone-one", order: 10, published: false, description: "ราวพุทธศตวรรษที่ 12–13", contentType: "media", contentRef: "milestoneOne" },
    { id: "page-milestone-two", parentId: "page-milestones", type: "media", title: "2 โบราณสถานของชาติ", slug: "milestone-two", order: 20, published: false, description: "พ.ศ. 2478", contentType: "media", contentRef: "milestoneTwo" },
    { id: "page-milestone-three", parentId: "page-milestones", type: "media", title: "3 ล้มและฟื้นคืน", slug: "milestone-three", order: 30, published: false, description: "พ.ศ. 2518–2522", contentType: "media", contentRef: "milestoneThree" },
    { id: "page-milestone-four", parentId: "page-milestones", type: "media", title: "4 ก้าวสู่เวทีโลก", slug: "milestone-four", order: 40, published: false, description: "2 ก.พ. 2560", contentType: "media", contentRef: "milestoneFour" },
    { id: "page-news", parentId: "project-world-heritage", type: "news", title: "ข่าวและกิจกรรม", slug: "news", order: 40, published: false, description: "ข่าวสารและกิจกรรมของโครงการ" },
    { id: "page-media", parentId: "project-world-heritage", type: "media", title: "ภาพและวิดีโอ", slug: "media", order: 50, published: false, description: "คลังภาพและวิดีโอของโครงการ", contentType: "media", contentRef: "all" },
    { id: "page-documents", parentId: "project-world-heritage", type: "document", title: "เอกสาร", slug: "documents", order: 60, published: false, description: "เอกสารอ้างอิงและเอกสารเผยแพร่" },
    { id: "page-donation", parentId: "project-world-heritage", type: "donation", title: "ร่วมบุญ", slug: "donation", order: 70, published: false, description: "ข้อมูลการร่วมบุญกับโครงการ" }
  ];
  const batch = writeBatch(db);
  seed.forEach(node => batch.set(treeNodeDoc(node.id), {
    ...node,
    createdAt: serverTimestamp(),
    createdBy: state.user.uid,
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid
  }));
  await batch.commit();
}

async function ensureLegacyTreeLinks() {
  const migrationRef = projectItemDoc(COLLECTIONS.settings, "site-tree-layout-v7");
  const migrationSnap = await getDoc(migrationRef);
  if (migrationSnap.exists()) return;
  const snap = await getDocs(treeNodesCollection());
  const existing = new Map(snap.docs.map(record => [record.id, record.data()]));
  const layout = [
    { id: "site-root", parentId: "", type: "folder", title: "พระธาตุพนม", slug: "that-phanom", order: 10, published: false, description: "โหนดหลักของเว็บไซต์และทุกโครงการ", contentType: deleteField(), contentRef: deleteField() },
    { id: "project-world-heritage", parentId: "site-root", type: "project", title: "พระธาตุพนม สู่มรดกโลก", slug: "world-heritage", order: 10, published: false, description: "โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม", contentType: "project", contentRef: "world-heritage" },
    { id: "page-hero", parentId: "project-world-heritage", type: "media", title: "ภาพหลักด้านบน", slug: "hero", order: 10, published: false, description: "สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์", contentType: "media", contentRef: "hero" },
    { id: "page-history", parentId: "project-world-heritage", type: "folder", title: "เรื่องราวแห่งศรัทธา", slug: "story", order: 20, published: false, description: "รูปภาพและวิดีโอในหัวข้อเรื่องราวแห่งศรัทธา", contentType: deleteField(), contentRef: deleteField() },
    { id: "page-story-feature", parentId: "page-history", type: "media", title: "พื้นที่หมายเลข 01", slug: "story-feature", order: 10, published: false, description: "สื่อเด่นในพื้นที่หมายเลข 01", contentType: "media", contentRef: "storyFeature" },
    { id: "page-story-art", parentId: "page-history", type: "media", title: "พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม", slug: "story-art", order: 20, published: false, description: "สื่อในพื้นที่หมายเลข 02", contentType: "media", contentRef: "storyArt" },
    { id: "page-story-people", parentId: "page-history", type: "media", title: "พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน", slug: "story-people", order: 30, published: false, description: "สื่อในพื้นที่หมายเลข 03", contentType: "media", contentRef: "storyPeople" },
    { id: "page-story-slider", parentId: "page-history", type: "media", title: "สไลด์เรื่องราวแห่งศรัทธา", slug: "story-slider", order: 40, published: false, description: "รูปภาพและวิดีโอในสไลด์เรื่องราวแห่งศรัทธา", contentType: "media", contentRef: "story" },
    { id: "page-value", parentId: "project-world-heritage", type: "page", title: "คุณค่าโดดเด่นเป็นสากล", slug: "outstanding-value", order: 30, published: false, description: "เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก", contentType: "media", contentRef: "criteria" },
    { id: "page-criteria-one", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 1", slug: "criteria-one", order: 10, published: false, description: "สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ", contentType: "media", contentRef: "criteriaOne" },
    { id: "page-criteria-two", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 2", slug: "criteria-two", order: 20, published: false, description: "สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม", contentType: "media", contentRef: "criteriaTwo" },
    { id: "page-criteria-three", parentId: "page-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 3", slug: "criteria-three", order: 30, published: false, description: "สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่", contentType: "media", contentRef: "criteriaThree" },
    { id: "page-process", parentId: "project-world-heritage", type: "folder", title: "งานที่ต้องทำร่วมกัน", slug: "shared-work", order: 35, published: false, description: "จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน", contentType: deleteField(), contentRef: deleteField() },
    { id: "page-process-overview", parentId: "page-process", type: "media", title: "สไลด์ภาพรวมงานที่ต้องทำร่วมกัน", slug: "process-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน", contentType: "media", contentRef: "processOverview" },
    { id: "page-process-one", parentId: "page-process", type: "media", title: "1 กำหนดคุณค่าและขอบเขต", slug: "process-one", order: 10, published: false, description: "สื่อประกอบงานข้อ 1", contentType: "media", contentRef: "processOne" },
    { id: "page-process-two", parentId: "page-process", type: "media", title: "2 จัดทำแผนอนุรักษ์และบริหาร", slug: "process-two", order: 20, published: false, description: "สื่อประกอบงานข้อ 2", contentType: "media", contentRef: "processTwo" },
    { id: "page-process-three", parentId: "page-process", type: "media", title: "3 สร้างการมีส่วนร่วม", slug: "process-three", order: 30, published: false, description: "สื่อประกอบงานข้อ 3", contentType: "media", contentRef: "processThree" },
    { id: "page-process-four", parentId: "page-process", type: "media", title: "4 จัดทำเอกสารเสนอชื่อ", slug: "process-four", order: 40, published: false, description: "สื่อประกอบงานข้อ 4", contentType: "media", contentRef: "processFour" },
    { id: "page-milestones", parentId: "project-world-heritage", type: "folder", title: "หมุดหมายสำคัญ", slug: "milestones", order: 40, published: false, description: "อดีตที่หล่อหลอมอนาคต", contentType: deleteField(), contentRef: deleteField() },
    { id: "page-milestones-overview", parentId: "page-milestones", type: "media", title: "สไลด์ภาพรวมหมุดหมายสำคัญ", slug: "milestones-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ", contentType: "media", contentRef: "milestones" },
    { id: "page-milestone-one", parentId: "page-milestones", type: "media", title: "1 โครงสร้างยุคแรก", slug: "milestone-one", order: 10, published: false, description: "ราวพุทธศตวรรษที่ 12–13", contentType: "media", contentRef: "milestoneOne" },
    { id: "page-milestone-two", parentId: "page-milestones", type: "media", title: "2 โบราณสถานของชาติ", slug: "milestone-two", order: 20, published: false, description: "พ.ศ. 2478", contentType: "media", contentRef: "milestoneTwo" },
    { id: "page-milestone-three", parentId: "page-milestones", type: "media", title: "3 ล้มและฟื้นคืน", slug: "milestone-three", order: 30, published: false, description: "พ.ศ. 2518–2522", contentType: "media", contentRef: "milestoneThree" },
    { id: "page-milestone-four", parentId: "page-milestones", type: "media", title: "4 ก้าวสู่เวทีโลก", slug: "milestone-four", order: 40, published: false, description: "2 ก.พ. 2560", contentType: "media", contentRef: "milestoneFour" },
    { id: "page-media", parentId: "project-world-heritage", type: "folder", title: "คลังสื่อทั้งหมด", slug: "media", order: 50, published: false, description: "พื้นที่เตรียมจัดหมวดหมู่คลังสื่อ", contentType: deleteField(), contentRef: deleteField() },
    { id: "page-news", parentId: "project-world-heritage", type: "news", title: "ข่าวและกิจกรรม", slug: "news", order: 60, published: false, description: "ข่าวสารและกิจกรรมของโครงการ" },
    { id: "page-documents", parentId: "project-world-heritage", type: "document", title: "เอกสาร", slug: "documents", order: 70, published: false, description: "เอกสารอ้างอิงและเอกสารเผยแพร่" },
    { id: "page-donation", parentId: "project-world-heritage", type: "donation", title: "ร่วมบุญ", slug: "donation", order: 80, published: false, description: "ข้อมูลการร่วมบุญกับโครงการ" }
  ];
  const batch = writeBatch(db);
  layout.forEach(node => batch.set(treeNodeDoc(node.id), {
    ...node,
    deletedAt: deleteField(),
    deletedBy: deleteField(),
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid,
    ...(existing.has(node.id) ? {} : { createdAt: serverTimestamp(), createdBy: state.user.uid })
  }, { merge: true }));
  batch.set(migrationRef, { completedAt: serverTimestamp(), completedBy: state.user.uid, version: 7 });
  await batch.commit();
}

async function ensurePortalTreeLinks() {
  const migrationRef = projectItemDoc(COLLECTIONS.settings, "site-tree-content-v8");
  const migrationSnap = await getDoc(migrationRef);
  if (migrationSnap.exists()) return;
  const links = [
    ["page-media", "media", "all"],
    ["page-news", "content", "news"],
    ["page-documents", "content", "document"],
    ["page-donation", "content", "donation"]
  ];
  const batch = writeBatch(db);
  links.forEach(([id, contentType, contentRef]) => batch.set(treeNodeDoc(id), {
    contentType,
    contentRef,
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid
  }, { merge: true }));
  batch.set(migrationRef, { completedAt: serverTimestamp(), completedBy: state.user.uid, version: 8 });
  await batch.commit();
}

async function ensureMuchalindaProjectTree() {
  const migrationRef = projectItemDoc(COLLECTIONS.settings, "site-tree-muchalinda-v10");
  const migrationSnap = await getDoc(migrationRef);
  if (migrationSnap.exists()) return;
  const snap = await getDocs(treeNodesCollection());
  const existingProject = snap.docs.find(record => {
    const node = record.data();
    const identity = `${node.slug || ""} ${node.title || ""}`.toLowerCase();
    return node.type === "project" && (identity.includes("muchalinda") || identity.includes("mujalin") || identity.includes("มุจลิน"));
  });
  const projectId = existingProject?.id || "project-muchalinda-restoration";
  const previous = existingProject?.data() || {};
  const batch = writeBatch(db);
  batch.set(treeNodeDoc(projectId), {
    parentId: "project-world-heritage",
    type: "project",
    title: previous.title || "โครงการบูรณะสระมุจลินท์ (สระพังทอง)",
    slug: previous.slug || "muchalinda-restoration",
    order: Number(previous.order) || 20,
    published: Boolean(previous.published),
    description: previous.description || "โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก เพื่อฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์และภูมิทัศน์ประวัติศาสตร์",
    contentType: "project",
    contentRef: "muchalinda",
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid,
    ...(existingProject ? {} : { createdAt: serverTimestamp(), createdBy: state.user.uid })
  }, { merge: true });
  [
    { id: "page-muchalinda-overview", type: "media", title: "ภาพรวมโครงการ", slug: "overview", order: 10, description: "ภาพและวิดีโอภาพรวมโครงการบูรณะสระมุจลินท์", contentType: "media", contentRef: "muchalindaHero" },
    { id: "page-muchalinda-history", type: "page", title: "ความเป็นมา", slug: "history", order: 20, description: "ประวัติและความสำคัญของสระมุจลินท์" },
    { id: "page-muchalinda-objectives", type: "page", title: "วัตถุประสงค์", slug: "objectives", order: 30, description: "วัตถุประสงค์ของการบูรณะและการอนุรักษ์" },
    { id: "page-muchalinda-progress", type: "page", title: "ความคืบหน้า", slug: "progress", order: 40, description: "ลำดับเหตุการณ์และความคืบหน้าของโครงการ" },
    { id: "page-muchalinda-donation", type: "media", title: "ร่วมบุญกับโครงการ", slug: "donation", order: 50, description: "รูปภาพ วิดีโอ และข้อมูลช่องทางร่วมบุญ", contentType: "media", contentRef: "muchalindaDonation" }
  ].forEach(node => batch.set(treeNodeDoc(node.id), {
    ...node,
    parentId: projectId,
    published: Boolean(previous.published),
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid,
    createdAt: serverTimestamp(),
    createdBy: state.user.uid
  }, { merge: true }));
  batch.set(migrationRef, { completedAt: serverTimestamp(), completedBy: state.user.uid, version: 10, projectId });
  await batch.commit();
}

function localTreeFallback() {
  return [
    { id: "fallback-site-root", parentId: "", type: "folder", title: "พระธาตุพนม", slug: "that-phanom", order: 10, published: false, description: "โหนดหลักของเว็บไซต์" },
    { id: "fallback-project", parentId: "fallback-site-root", type: "project", title: "พระธาตุพนม สู่มรดกโลก", slug: "world-heritage", order: 10, published: false, description: "โครงการผลักดันพระธาตุพนมสู่มรดกโลกทางวัฒนธรรม" },
    { id: "fallback-hero", parentId: "fallback-project", type: "media", title: "ภาพหลักด้านบน", slug: "hero", order: 10, published: false, description: "สไลด์ภาพหลักบริเวณบนสุดของเว็บไซต์", contentType: "media", contentRef: "hero" },
    { id: "fallback-story", parentId: "fallback-project", type: "folder", title: "เรื่องราวแห่งศรัทธา", slug: "story", order: 20, published: false, description: "รูปภาพและวิดีโอในหัวข้อเรื่องราวแห่งศรัทธา" },
    { id: "fallback-feature", parentId: "fallback-story", type: "media", title: "พื้นที่หมายเลข 01", slug: "story-feature", order: 10, published: false, description: "สื่อเด่นในพื้นที่หมายเลข 01", contentType: "media", contentRef: "storyFeature" },
    { id: "fallback-story-art", parentId: "fallback-story", type: "media", title: "พื้นที่หมายเลข 02 — ร่องรอยศิลปกรรม", slug: "story-art", order: 20, published: false, description: "สื่อในพื้นที่หมายเลข 02", contentType: "media", contentRef: "storyArt" },
    { id: "fallback-story-people", parentId: "fallback-story", type: "media", title: "พื้นที่หมายเลข 03 — ศูนย์รวมผู้คน", slug: "story-people", order: 30, published: false, description: "สื่อในพื้นที่หมายเลข 03", contentType: "media", contentRef: "storyPeople" },
    { id: "fallback-story-slider", parentId: "fallback-story", type: "media", title: "สไลด์เรื่องราวแห่งศรัทธา", slug: "story-slider", order: 40, published: false, description: "รูปภาพและวิดีโอในสไลด์เรื่องราวแห่งศรัทธา", contentType: "media", contentRef: "story" },
    { id: "fallback-value", parentId: "fallback-project", type: "page", title: "คุณค่าโดดเด่นเป็นสากล", slug: "outstanding-value", order: 30, published: false, description: "เหตุผลและคุณค่าที่สนับสนุนการขึ้นทะเบียนมรดกโลก", contentType: "media", contentRef: "criteria" },
    { id: "fallback-criteria-one", parentId: "fallback-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 1", slug: "criteria-one", order: 10, published: false, description: "สื่อประกอบหัวข้อผลงานสร้างสรรค์อันเป็นเลิศ", contentType: "media", contentRef: "criteriaOne" },
    { id: "fallback-criteria-two", parentId: "fallback-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 2", slug: "criteria-two", order: 20, published: false, description: "สื่อประกอบหัวข้อการแลกเปลี่ยนคุณค่าข้ามวัฒนธรรม", contentType: "media", contentRef: "criteriaTwo" },
    { id: "fallback-criteria-three", parentId: "fallback-value", type: "media", title: "คุณค่าโดดเด่นหมายเลข 3", slug: "criteria-three", order: 30, published: false, description: "สื่อประกอบหัวข้อความเชื่อที่ยังดำรงอยู่", contentType: "media", contentRef: "criteriaThree" },
    { id: "fallback-process", parentId: "fallback-project", type: "folder", title: "งานที่ต้องทำร่วมกัน", slug: "shared-work", order: 35, published: false, description: "จากบัญชีเบื้องต้นสู่การขึ้นทะเบียน" },
    { id: "fallback-process-overview", parentId: "fallback-process", type: "media", title: "สไลด์ภาพรวมงานที่ต้องทำร่วมกัน", slug: "process-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมใต้คำอธิบายของงานที่ต้องทำร่วมกัน", contentType: "media", contentRef: "processOverview" },
    { id: "fallback-process-one", parentId: "fallback-process", type: "media", title: "1 กำหนดคุณค่าและขอบเขต", slug: "process-one", order: 10, published: false, description: "สื่อประกอบงานข้อ 1", contentType: "media", contentRef: "processOne" },
    { id: "fallback-process-two", parentId: "fallback-process", type: "media", title: "2 จัดทำแผนอนุรักษ์และบริหาร", slug: "process-two", order: 20, published: false, description: "สื่อประกอบงานข้อ 2", contentType: "media", contentRef: "processTwo" },
    { id: "fallback-process-three", parentId: "fallback-process", type: "media", title: "3 สร้างการมีส่วนร่วม", slug: "process-three", order: 30, published: false, description: "สื่อประกอบงานข้อ 3", contentType: "media", contentRef: "processThree" },
    { id: "fallback-process-four", parentId: "fallback-process", type: "media", title: "4 จัดทำเอกสารเสนอชื่อ", slug: "process-four", order: 40, published: false, description: "สื่อประกอบงานข้อ 4", contentType: "media", contentRef: "processFour" },
    { id: "fallback-milestones", parentId: "fallback-project", type: "folder", title: "หมุดหมายสำคัญ", slug: "milestones", order: 40, published: false, description: "อดีตที่หล่อหลอมอนาคต" },
    { id: "fallback-milestones-overview", parentId: "fallback-milestones", type: "media", title: "สไลด์ภาพรวมหมุดหมายสำคัญ", slug: "milestones-overview", order: 5, published: false, description: "รูปภาพและวิดีโอภาพรวมของหมุดหมายสำคัญ", contentType: "media", contentRef: "milestones" },
    { id: "fallback-milestone-one", parentId: "fallback-milestones", type: "media", title: "1 โครงสร้างยุคแรก", slug: "milestone-one", order: 10, published: false, description: "ราวพุทธศตวรรษที่ 12–13", contentType: "media", contentRef: "milestoneOne" },
    { id: "fallback-milestone-two", parentId: "fallback-milestones", type: "media", title: "2 โบราณสถานของชาติ", slug: "milestone-two", order: 20, published: false, description: "พ.ศ. 2478", contentType: "media", contentRef: "milestoneTwo" },
    { id: "fallback-milestone-three", parentId: "fallback-milestones", type: "media", title: "3 ล้มและฟื้นคืน", slug: "milestone-three", order: 30, published: false, description: "พ.ศ. 2518–2522", contentType: "media", contentRef: "milestoneThree" },
    { id: "fallback-milestone-four", parentId: "fallback-milestones", type: "media", title: "4 ก้าวสู่เวทีโลก", slug: "milestone-four", order: 40, published: false, description: "2 ก.พ. 2560", contentType: "media", contentRef: "milestoneFour" },
    { id: "fallback-muchalinda", parentId: "fallback-project", type: "project", title: "โครงการบูรณะสระมุจลินท์ (สระพังทอง)", slug: "muchalinda-restoration", order: 50, published: false, description: "โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก" },
    { id: "fallback-muchalinda-overview", parentId: "fallback-muchalinda", type: "page", title: "ภาพรวมโครงการ", slug: "overview", order: 10, published: false, description: "ภาพรวมโครงการบูรณะสระมุจลินท์" },
    { id: "fallback-muchalinda-history", parentId: "fallback-muchalinda", type: "page", title: "ความเป็นมา", slug: "history", order: 20, published: false, description: "ประวัติและความสำคัญของสระมุจลินท์" },
    { id: "fallback-muchalinda-objectives", parentId: "fallback-muchalinda", type: "page", title: "วัตถุประสงค์", slug: "objectives", order: 30, published: false, description: "วัตถุประสงค์ของการบูรณะ" },
    { id: "fallback-muchalinda-progress", parentId: "fallback-muchalinda", type: "page", title: "ความคืบหน้า", slug: "progress", order: 40, published: false, description: "ลำดับเหตุการณ์ของโครงการ" },
    { id: "fallback-muchalinda-donation", parentId: "fallback-muchalinda", type: "media", title: "ร่วมบุญกับโครงการ", slug: "donation", order: 50, published: false, description: "รูปภาพ วิดีโอ และข้อมูลช่องทางร่วมบุญ", contentType: "media", contentRef: "muchalindaDonation" }
  ];
}

async function loadSiteTree() {
  if (!isAdmin()) return;
  const root = $("#siteTree");
  root.innerHTML = '<p class="empty-state">กำลังโหลดผังโครงการ...</p>';
  try {
    await seedInitialSiteTree();
    await ensureLegacyTreeLinks();
    await ensurePortalTreeLinks();
    await ensureMuchalindaProjectTree();
    const snap = await getDocs(treeNodesCollection());
    state.siteNodes = snap.docs.map(record => ({ id: record.id, ...record.data() }));
    renderSiteTree();
  } catch (error) {
    console.error("Site tree unavailable", error);
    state.siteNodes = localTreeFallback();
    renderSiteTree();
    const notice = document.createElement("div");
    notice.className = "tree-rule-notice";
    notice.innerHTML = "<strong>กำลังแสดงผังโครงการฉบับทดลอง</strong><span>หากต้องการบันทึก เพิ่ม แก้ไข หรือลบโหนด ให้ Publish firestore.rules แล้วเปิดหน้านี้ใหม่</span>";
    root.append(notice);
  }
}

function renderSiteTree() {
  const root = $("#siteTree");
  root.replaceChildren();
  const activeNodes = liveTreeNodes();
  const hiddenRootId = activeNodes.find(node => !node.parentId && node.type === "folder")?.id || "site-root";
  const visible = state.treeShowTrash ? state.siteNodes.filter(node => node.deletedAt) : activeNodes.filter(node => node.id !== hiddenRootId);
  const linkedReferenceCount = state.treeShowTrash ? 0 : visible.reduce((total, node) => total + linkedMediaForTreeNode(node).length + linkedPortalContentForTreeNode(node).length, 0);
  $("#treeListTitle").textContent = state.treeShowTrash ? "ถังขยะ" : "ผังที่ใช้งาน";
  $("#treeNodeCount").textContent = state.treeShowTrash ? `${visible.length} รายการ` : `${visible.length} หัวข้อ · ${linkedReferenceCount} รายการที่เชื่อม`;
  $("#treeTrashButton").textContent = state.treeShowTrash ? "← กลับไปผัง" : "ถังขยะ";
  $("#addRootProjectButton").hidden = state.treeShowTrash;
  $("#addChildNodeButton").hidden = state.treeShowTrash;
  if (!visible.length) {
    root.innerHTML = `<p class="empty-state">${state.treeShowTrash ? "ถังขยะว่าง" : "ยังไม่มีผังโครงการ"}</p>`;
    return;
  }
  if (state.treeShowTrash) {
    const list = document.createElement("div");
    list.className = "tree-trash-list";
    visible.sort((a, b) => String(a.title).localeCompare(String(b.title), "th")).forEach(node => list.append(createTreeNodeButton(node, 0)));
    root.append(list);
    return;
  }
  const renderBranch = (parentId, depth) => {
    const fragment = document.createDocumentFragment();
    childTreeNodes(parentId).forEach(node => {
      const branch = document.createElement("div");
      branch.className = "tree-branch";
      branch.append(createTreeNodeButton(node, depth));
      branch.append(createTreeMediaReferences(node, depth + 1));
      branch.append(createTreePortalContentReferences(node, depth + 1));
      branch.append(renderBranch(node.id, depth + 1));
      fragment.append(branch);
    });
    return fragment;
  };
  const hiddenRoot = activeNodes.find(node => node.id === hiddenRootId);
  root.append(renderBranch(hiddenRoot ? hiddenRoot.id : "", 0));
}

function createTreeNodeButton(node, depth) {
  const button = document.createElement("button");
  button.type = "button";
  button.className = `tree-node${state.selectedTreeNodeId === node.id ? " selected" : ""}`;
  button.style.setProperty("--tree-depth", Math.min(depth, 8));
  const type = treeNodeType(node.type);
  const icon = document.createElement("span");
  icon.className = "tree-node-icon";
  icon.textContent = type.icon;
  const copy = document.createElement("span");
  copy.className = "tree-node-copy";
  const title = document.createElement("strong");
  title.textContent = node.title || "ไม่มีชื่อ";
  const meta = document.createElement("small");
  const linked = Boolean(TREE_CONTENT_LINKS[`${node.contentType || ""}:${node.contentRef || ""}`]);
  meta.textContent = node.deletedAt ? `${type.label} · อยู่ในถังขยะ` : `${type.label} · ${node.published ? "พร้อมเผยแพร่" : "ฉบับร่าง"}${linked ? " · เชื่อมข้อมูลแล้ว" : ""}`;
  copy.append(title, meta);
  button.append(icon, copy);
  button.addEventListener("click", () => selectTreeNode(node.id));
  return button;
}

function linkedMediaForTreeNode(node) {
  if (node.deletedAt || node.contentType !== "media") return [];
  const items = node.contentRef === "all" ? [...state.media] : state.media.filter(item => mediaSectionKey(item) === node.contentRef);
  return items.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title || a.id).localeCompare(String(b.title || b.id), "th"));
}

function createTreeMediaReferences(node, depth) {
  const fragment = document.createDocumentFragment();
  if (node.contentType !== "media") return fragment;
  const items = linkedMediaForTreeNode(node);
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "tree-media-empty";
    empty.style.setProperty("--tree-depth", Math.min(depth, 8));
    empty.textContent = "ยังไม่มีรูปภาพหรือวิดีโอในหัวข้อนี้";
    fragment.append(empty);
    return fragment;
  }
  items.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tree-node tree-media-reference";
    button.style.setProperty("--tree-depth", Math.min(depth, 8));
    const icon = document.createElement("span");
    icon.className = "tree-node-icon";
    icon.textContent = item.type === "image" ? "▧" : "▶";
    const copy = document.createElement("span");
    copy.className = "tree-node-copy";
    const title = document.createElement("strong");
    title.textContent = item.title || (item.type === "image" ? "รูปภาพ" : "วิดีโอ");
    const meta = document.createElement("small");
    meta.textContent = `${item.type === "image" ? "รูปภาพ" : "วิดีโอ"} · ข้อมูลเดิม · คลิกเพื่อแก้ไข`;
    copy.append(title, meta);
    button.append(icon, copy);
    button.addEventListener("click", () => {
      state.manageSection = mediaSectionKey(item);
      $("#treeDialog").close();
      openMediaDialog(state.manageSection, item);
    });
    fragment.append(button);
  });
  return fragment;
}

function linkedPortalContentForTreeNode(node) {
  if (node.deletedAt || node.contentType !== "content") return [];
  return state.portalContent
    .filter(item => item.kind === node.contentRef)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title || a.id).localeCompare(String(b.title || b.id), "th"));
}

function createTreePortalContentReferences(node, depth) {
  const fragment = document.createDocumentFragment();
  if (node.contentType !== "content") return fragment;
  const items = linkedPortalContentForTreeNode(node);
  if (!items.length) {
    const empty = document.createElement("div");
    empty.className = "tree-media-empty";
    empty.style.setProperty("--tree-depth", Math.min(depth, 8));
    empty.textContent = "ยังไม่มีรายการในหัวข้อนี้";
    fragment.append(empty);
    return fragment;
  }
  items.forEach(item => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "tree-node tree-media-reference tree-content-reference";
    button.style.setProperty("--tree-depth", Math.min(depth, 8));
    const icon = document.createElement("span");
    icon.className = "tree-node-icon";
    icon.textContent = item.kind === "document" ? "PDF" : item.kind === "donation" ? "♡" : "◫";
    const copy = document.createElement("span");
    copy.className = "tree-node-copy";
    const title = document.createElement("strong");
    title.textContent = item.title || "ไม่มีชื่อ";
    const meta = document.createElement("small");
    meta.textContent = `${item.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"} · คลิกเพื่อจัดการ`;
    copy.append(title, meta);
    button.append(icon, copy);
    button.addEventListener("click", () => {
      $("#treeDialog").close();
      window.dispatchEvent(new CustomEvent("open-portal-manager", { detail: { kind: item.kind, itemId: item.id } }));
    });
    fragment.append(button);
  });
  return fragment;
}

function renderTreeParentOptions(node = null, preferredParentId = "") {
  const select = $("#treeNodeParent");
  const blocked = node ? descendantTreeNodeIds(node.id) : new Set();
  if (node) blocked.add(node.id);
  select.replaceChildren();
  const rootOption = document.createElement("option");
  rootOption.value = "";
  rootOption.textContent = "— ระดับบนสุด —";
  select.append(rootOption);
  const addOptions = (parentId, depth) => childTreeNodes(parentId).forEach(candidate => {
    if (!blocked.has(candidate.id)) {
      const option = document.createElement("option");
      option.value = candidate.id;
      option.textContent = `${"— ".repeat(depth)}${candidate.title}`;
      select.append(option);
      addOptions(candidate.id, depth + 1);
    }
  });
  addOptions("", 0);
  select.value = preferredParentId || "";
}

function selectTreeNode(nodeId) {
  const node = state.siteNodes.find(item => item.id === nodeId);
  if (!node) return;
  state.selectedTreeNodeId = nodeId;
  renderSiteTree();
  $("#treeEditorEmpty").hidden = true;
  $("#treeEditorForm").hidden = false;
  $("#treeNodeId").value = node.id;
  $("#treeNodeTitle").value = node.title || "";
  $("#treeNodeType").value = node.type || "page";
  $("#treeNodeSlug").value = node.slug || "";
  $("#treeNodeDescription").value = node.description || "";
  $("#treeContentLink").value = TREE_CONTENT_LINKS[`${node.contentType || ""}:${node.contentRef || ""}`] ? `${node.contentType}:${node.contentRef}` : "";
  $("#treeNodeUrl").value = node.url || "";
  $("#treeNodePublished").checked = Boolean(node.published);
  renderTreeParentOptions(node, node.parentId || "");
  $("#treeEditorTitle").textContent = "แก้ไขหัวข้อ";
  $("#treeNodeStatus").textContent = node.deletedAt ? "อยู่ในถังขยะ" : (node.published ? "พร้อมเผยแพร่" : "ฉบับร่าง");
  $("#deleteTreeNodeButton").hidden = Boolean(node.deletedAt);
  $("#restoreTreeNodeButton").hidden = !node.deletedAt;
  $$("#treeEditorForm input, #treeEditorForm select, #treeEditorForm textarea, #treeEditorForm button").forEach(control => {
    if (!["restoreTreeNodeButton"].includes(control.id)) control.disabled = Boolean(node.deletedAt);
  });
  if (node.deletedAt) $("#restoreTreeNodeButton").disabled = false;
  renderLinkedTreeContent(node);
  updateTreeMoveButtons(node);
}

function startNewTreeNode(parentId = "", type = "page") {
  state.selectedTreeNodeId = "";
  renderSiteTree();
  $("#treeEditorEmpty").hidden = true;
  $("#treeEditorForm").hidden = false;
  $("#treeEditorForm").reset();
  $("#treeNodeId").value = "";
  $("#treeNodeType").value = type;
  $("#treeContentLink").value = "";
  renderTreeParentOptions(null, parentId);
  $("#treeEditorTitle").textContent = type === "project" ? "เพิ่มโครงการ" : "เพิ่มโหนดย่อย";
  $("#treeNodeStatus").textContent = "รายการใหม่";
  $("#deleteTreeNodeButton").hidden = true;
  $("#restoreTreeNodeButton").hidden = true;
  $$("#treeEditorForm input, #treeEditorForm select, #treeEditorForm textarea, #treeEditorForm button").forEach(control => control.disabled = false);
  $("#moveTreeNodeUp").disabled = true;
  $("#moveTreeNodeDown").disabled = true;
  renderLinkedTreeContent();
  $("#treeNodeTitle").focus();
}

function renderLinkedTreeContent(node = null) {
  const value = $("#treeContentLink").value;
  const link = TREE_CONTENT_LINKS[value];
  const root = $("#treeLinkedContent");
  root.hidden = !link;
  if (!link) return;
  $("#treeLinkedContentTitle").textContent = link.label;
  let detail = "อ้างอิงข้อมูลเดิมโดยไม่สร้างสำเนา";
  if (link.kind === "media") {
    const count = link.ref === "all" ? state.media.length : state.media.filter(item => mediaSectionKey(item) === link.ref).length;
    detail = `พบรูปภาพและวิดีโอเดิม ${count} รายการ`;
  } else if (link.kind === "content") {
    const count = state.portalContent.filter(item => item.kind === link.ref).length;
    detail = `พบข้อมูลที่เชื่อมแล้ว ${count} รายการ`;
  }
  $("#treeLinkedContentMeta").textContent = detail;
  $("#openLinkedContentButton").disabled = Boolean(node?.deletedAt);
}

function openLinkedTreeContent() {
  const link = TREE_CONTENT_LINKS[$("#treeContentLink").value];
  if (!link) return toast("โหนดนี้ยังไม่ได้เชื่อมข้อมูลเดิม", "error");
  $("#treeDialog").close();
  if (link.kind === "media" && link.ref !== "all") openManageDialog(link.ref);
  else if (link.kind === "content") window.dispatchEvent(new CustomEvent("open-portal-manager", { detail: { kind: link.ref } }));
  else openManageDialog();
}

function updateTreeMoveButtons(node) {
  const siblings = childTreeNodes(node.parentId || "");
  const index = siblings.findIndex(item => item.id === node.id);
  $("#moveTreeNodeUp").disabled = Boolean(node.deletedAt) || index <= 0;
  $("#moveTreeNodeDown").disabled = Boolean(node.deletedAt) || index < 0 || index >= siblings.length - 1;
}

async function saveTreeNode(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  const id = $("#treeNodeId").value;
  const current = state.siteNodes.find(node => node.id === id) || null;
  const parentId = $("#treeNodeParent").value;
  const title = $("#treeNodeTitle").value.trim();
  const slug = normalizeSlug($("#treeNodeSlug").value || title);
  if (!title) return toast("กรุณาใส่ชื่อหัวข้อ", "error");
  if (current && (parentId === current.id || descendantTreeNodeIds(current.id).has(parentId))) return toast("ย้ายหัวข้อไปไว้ใต้ตัวเองหรือโหนดย่อยไม่ได้", "error");
  const duplicate = liveTreeNodes().find(node => node.id !== id && (node.parentId || "") === parentId && node.slug === slug);
  if (duplicate) return toast("ชื่อ URL ซ้ำกับหัวข้ออื่นในระดับเดียวกัน", "error");
  const siblings = childTreeNodes(parentId).filter(node => node.id !== id);
  const target = current ? treeNodeDoc(current.id) : doc(treeNodesCollection());
  const selectedLink = TREE_CONTENT_LINKS[$("#treeContentLink").value] || null;
  const payload = {
    parentId,
    type: $("#treeNodeType").value,
    title,
    slug: slug || `node-${Date.now()}`,
    description: $("#treeNodeDescription").value.trim(),
    url: safeUrl($("#treeNodeUrl").value.trim()) || "",
    published: $("#treeNodePublished").checked,
    contentType: selectedLink?.kind || deleteField(),
    contentRef: selectedLink?.ref || deleteField(),
    order: current && (current.parentId || "") === parentId ? (Number(current.order) || 10) : ((siblings.length + 1) * 10),
    updatedAt: serverTimestamp(),
    updatedBy: state.user.uid,
    ...(current ? {} : { createdAt: serverTimestamp(), createdBy: state.user.uid })
  };
  const submit = $("#treeEditorForm button[type=submit]");
  submit.disabled = true;
  try {
    await setDoc(target, payload, { merge: true });
    await loadSiteTree();
    selectTreeNode(target.id);
    toast(current ? "บันทึกการแก้ไขแล้ว" : "เพิ่มหัวข้อแล้ว");
  } catch (error) {
    console.error(error);
    toast("บันทึกผังไม่สำเร็จ", "error");
  } finally {
    submit.disabled = false;
  }
}

async function moveTreeNode(direction) {
  const node = state.siteNodes.find(item => item.id === state.selectedTreeNodeId);
  if (!node || node.deletedAt) return;
  const siblings = childTreeNodes(node.parentId || "");
  const index = siblings.findIndex(item => item.id === node.id);
  const swap = siblings[index + direction];
  if (!swap) return;
  const batch = writeBatch(db);
  batch.update(treeNodeDoc(node.id), { order: Number(swap.order) || ((index + direction + 1) * 10), updatedAt: serverTimestamp(), updatedBy: state.user.uid });
  batch.update(treeNodeDoc(swap.id), { order: Number(node.order) || ((index + 1) * 10), updatedAt: serverTimestamp(), updatedBy: state.user.uid });
  try {
    await batch.commit();
    await loadSiteTree();
    selectTreeNode(node.id);
  } catch (error) {
    console.error(error);
    toast("เลื่อนลำดับไม่สำเร็จ", "error");
  }
}

async function trashTreeNode(node) {
  const ids = [node.id, ...descendantTreeNodeIds(node.id)].slice(0, 450);
  const batch = writeBatch(db);
  ids.forEach(id => batch.update(treeNodeDoc(id), { deletedAt: serverTimestamp(), deletedBy: state.user.uid, updatedAt: serverTimestamp(), updatedBy: state.user.uid }));
  await batch.commit();
  state.selectedTreeNodeId = "";
  $("#treeEditorForm").hidden = true;
  $("#treeEditorEmpty").hidden = false;
  await loadSiteTree();
  toast("ย้ายหัวข้อและโหนดย่อยไปถังขยะแล้ว");
}

async function restoreTreeNode(node) {
  const ids = new Set([node.id, ...descendantTreeNodeIds(node.id)]);
  let parentId = node.parentId || "";
  while (parentId) {
    ids.add(parentId);
    parentId = state.siteNodes.find(item => item.id === parentId)?.parentId || "";
  }
  const batch = writeBatch(db);
  [...ids].slice(0, 450).forEach(id => batch.update(treeNodeDoc(id), { deletedAt: deleteField(), deletedBy: deleteField(), updatedAt: serverTimestamp(), updatedBy: state.user.uid }));
  try {
    await batch.commit();
    state.treeShowTrash = false;
    await loadSiteTree();
    selectTreeNode(node.id);
    toast("กู้คืนหัวข้อแล้ว");
  } catch (error) {
    console.error(error);
    toast("กู้คืนไม่สำเร็จ", "error");
  }
}

function exportSiteTree() {
  const clean = state.siteNodes.map(({ createdAt, updatedAt, deletedAt, ...node }) => ({
    ...node,
    createdAt: createdAt?.toDate ? createdAt.toDate().toISOString() : createdAt || null,
    updatedAt: updatedAt?.toDate ? updatedAt.toDate().toISOString() : updatedAt || null,
    deletedAt: deletedAt?.toDate ? deletedAt.toDate().toISOString() : deletedAt || null
  }));
  const blob = new Blob([JSON.stringify({ exportedAt: new Date().toISOString(), project: PROJECT_KEY, nodes: clean }, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `that-phanom-site-tree-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
}

async function openTreeDialog() {
  if (!isAdmin()) return toast("เฉพาะ Admin เท่านั้นที่จัดการผังโครงการได้", "error");
  state.treeShowTrash = false;
  state.selectedTreeNodeId = "";
  $("#treeEditorForm").hidden = true;
  $("#treeEditorEmpty").hidden = false;
  $("#treeDialog").showModal();
  await loadSiteTree();
}

function confirmAction(title, message, action) {
  const root = $("#confirmDialog");
  $("#confirmTitle").textContent = title;
  $("#confirmMessage").textContent = message;
  if (root.open) root.close();
  root.showModal();
  const close = () => {
    if (root.open) root.close();
  };
  $("#confirmCancel").onclick = close;
  $("#confirmOk").onclick = async () => {
    $("#confirmOk").disabled = true;
    try { await action(); } finally { $("#confirmOk").disabled = false; close(); }
  };
}

function setupEvents() {
  setupMenu();
  setupMediaSurfaces();
  $("#closeTreeButton").addEventListener("click", () => $("#treeDialog").close());
  $("#treeEditorForm").addEventListener("submit", saveTreeNode);
  $("#treeContentLink").addEventListener("change", () => renderLinkedTreeContent(state.siteNodes.find(node => node.id === state.selectedTreeNodeId) || null));
  $("#openLinkedContentButton").addEventListener("click", openLinkedTreeContent);
  $("#addRootProjectButton").addEventListener("click", () => {
    const root = liveTreeNodes().find(node => node.id === "site-root" || (!node.parentId && node.type === "folder"));
    startNewTreeNode(root?.id || "", "project");
  });
  $("#addChildNodeButton").addEventListener("click", () => {
    const selected = state.siteNodes.find(node => node.id === state.selectedTreeNodeId && !node.deletedAt);
    const fallback = liveTreeNodes().find(node => node.type === "project") || liveTreeNodes()[0];
    startNewTreeNode(selected?.id || fallback?.id || "", "page");
  });
  $("#treeTrashButton").addEventListener("click", () => {
    state.treeShowTrash = !state.treeShowTrash;
    state.selectedTreeNodeId = "";
    $("#treeEditorForm").hidden = true;
    $("#treeEditorEmpty").hidden = false;
    renderSiteTree();
  });
  $("#exportTreeButton").addEventListener("click", exportSiteTree);
  $("#moveTreeNodeUp").addEventListener("click", () => moveTreeNode(-1));
  $("#moveTreeNodeDown").addEventListener("click", () => moveTreeNode(1));
  $("#deleteTreeNodeButton").addEventListener("click", () => {
    const node = state.siteNodes.find(item => item.id === state.selectedTreeNodeId);
    if (!node) return;
    confirmAction("ย้ายไปถังขยะ", `หัวข้อ “${node.title}” และโหนดย่อยทั้งหมดจะถูกซ่อน แต่ยังกู้คืนได้`, async () => {
      try { await trashTreeNode(node); } catch (error) { console.error(error); toast("ย้ายไปถังขยะไม่สำเร็จ", "error"); }
    });
  });
  $("#restoreTreeNodeButton").addEventListener("click", () => {
    const node = state.siteNodes.find(item => item.id === state.selectedTreeNodeId);
    if (node) restoreTreeNode(node);
  });
  $("#addMediaButton").addEventListener("click", () => openMediaDialog(state.manageSection || "story"));
  $("#syncDriveButton").addEventListener("click", startManualDriveSync);
  $("#mediaForm").addEventListener("submit", saveMedia);
  $("#closeMediaButton").addEventListener("click", () => $("#mediaDialog").close());
  $("#cancelMediaButton").addEventListener("click", () => $("#mediaDialog").close());
  $("#mediaDialog").addEventListener("close", () => { $("#mediaSection").disabled = false; });
  $("#closeLightboxButton").addEventListener("click", () => $("#imageLightbox").close());
  $("#imageLightbox").addEventListener("click", event => {
    if (event.target === $("#imageLightbox")) $("#imageLightbox").close();
  });
  $("#imageLightbox").addEventListener("close", () => {
    $("#lightboxImage").src = "";
  });
  $("#commentForm").addEventListener("submit", submitComment);
  $("#floatingChatButton").addEventListener("click", openChat);
  $("#closeChatButton").addEventListener("click", () => {
    $("#chatPanel").classList.remove("open");
    $("#chatPanel").setAttribute("aria-hidden", "true");
  });
  $("#chatForm").addEventListener("submit", sendChat);
  document.addEventListener("visibilitychange", () => {
    Object.keys(SECTIONS).forEach(section => renderSlider(section));
  });
  window.addEventListener("portal-content-updated", event => {
    state.portalContent = Array.isArray(event.detail) ? event.detail : [];
    if ($("#treeDialog")?.open && state.siteNodes.length) {
      renderSiteTree();
      const selectedNode = state.siteNodes.find(node => node.id === state.selectedTreeNodeId) || null;
      if (selectedNode) renderLinkedTreeContent(selectedNode);
    }
  });
}

setupEvents();
listenForContent();

if (auth) {
  onAuthStateChanged(auth, async user => {
    state.user = user;
    state.role = "guest";
    if (user) {
      try {
        state.role = await resolveUserRole(user);
        if (isAdmin()) await seedInitialMedia();
      } catch (error) {
        console.error("Profile setup failed", error);
        state.role = user.email?.toLowerCase() === ADMIN_EMAIL ? "admin" : "user";
        toast("เข้าสู่ระบบแล้ว แต่ยังเชื่อมต่อข้อมูลสิทธิ์ไม่ได้", "error");
      }
    }
    updateAccountUI();
    if ($("#chatPanel").classList.contains("open")) openChat();
  });
} else {
  updateAccountUI();
}
