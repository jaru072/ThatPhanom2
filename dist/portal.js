import { getApp, getApps, initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";
import { getAuth, onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";
import { addDoc, collection, deleteDoc, doc, getDoc, onSnapshot, orderBy, query, serverTimestamp, setDoc, updateDoc, where } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";
import { deleteObject, getDownloadURL, getStorage, ref, uploadBytes } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-storage.js";
import { firebaseConfig } from "./firebase-config.js";

const ADMIN_EMAIL = "jaru072@gmail.com";
const PROJECT_KEY = "world-heritage";
const NODE_IDS = {
  media: "page-media",
  news: "page-news",
  document: "page-documents",
  donation: "page-donation"
};
const KIND_LABELS = {
  media: "คลังสื่อทั้งหมด",
  news: "ข่าวและกิจกรรม",
  document: "เอกสาร",
  donation: "ร่วมบุญ"
};
const EMPTY_TEXT = {
  media: "ยังไม่มีสื่อในคลัง",
  news: "ยังไม่มีข่าวหรือกิจกรรมที่เผยแพร่",
  document: "ยังไม่มีเอกสารที่เผยแพร่",
  donation: "ยังไม่มีช่องทางร่วมบุญที่เผยแพร่"
};
const DEFAULT_PROJECT = {
  id: "project-world-heritage",
  parentId: "site-root",
  type: "project",
  title: "พระธาตุพนม สู่มรดกโลก",
  description: "โครงการผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลกทางวัฒนธรรม",
  slug: "world-heritage",
  contentType: "project",
  contentRef: "world-heritage",
  order: 10,
  published: true,
  fallback: true
};
const DEFAULT_SUPPORT_PROJECT = {
  id: "project-muchalinda-restoration",
  parentId: "project-world-heritage",
  type: "project",
  title: "โครงการบูรณะสระมุจลินท์ (สระพังทอง)",
  description: "โครงการสนับสนุนพระธาตุพนม สู่มรดกโลก เพื่อฟื้นฟูแหล่งน้ำศักดิ์สิทธิ์และภูมิทัศน์ประวัติศาสตร์",
  slug: "muchalinda-restoration",
  contentType: "project",
  contentRef: "muchalinda",
  order: 20,
  published: false,
  fallback: true
};
const PROJECT_ANCHORS = {
  hero: "#top",
  story: "#history",
  storyFeature: "#history",
  storyArt: "#history",
  storyPeople: "#history",
  criteria: "#world-heritage",
  criteriaOne: "#world-heritage",
  criteriaTwo: "#world-heritage",
  criteriaThree: "#world-heritage",
  processOverview: "#world-heritage",
  processOne: "#world-heritage",
  processTwo: "#world-heritage",
  processThree: "#world-heritage",
  processFour: "#world-heritage",
  milestones: "#milestones",
  milestoneOne: "#milestones",
  milestoneTwo: "#milestones",
  milestoneThree: "#milestones",
  milestoneFour: "#milestones",
  muchalindaDonation: "#muchalinda-donation",
  all: "#media-library"
};

const DEFAULT_RAIL_CARDS = [
  {
    id: "default-project",
    type: "project",
    template: "project",
    kicker: "โครงการปัจจุบัน",
    kicker_lo: "ໂຄງການປັດຈຸບັນ",
    kicker_en: "Current Project",
    title: "พระธาตุพนม สู่มรดกโลก",
    title_lo: "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ",
    title_en: "Phra That Phanom to World Heritage",
    description: "ร่วมอนุรักษ์คุณค่าทางกายภาพและจิตวิญญาณของศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง",
    description_lo: "ຮ່ວມອະນຸລັກຄຸນຄ່າທາງກາຍະພາບ ແລະຈິດວິນຍານຂອງສູນລວມສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ",
    description_en: "Safeguarding the cultural and spiritual values of the sacred Mekong heritage site.",
    buttonText: "ดูโครงการทั้งหมด",
    buttonText_lo: "ເບິ່ງໂຄງການທັງໝົດ",
    buttonText_en: "View All Projects",
    buttonUrl: "#projects",
    openExternal: false,
    theme: "gold",
    icon: "🏛",
    projectScope: "all",
    published: true,
    order: 10,
    fallback: true
  },
  {
    id: "default-quick",
    type: "quick",
    template: "quick",
    kicker: "เข้าถึงอย่างรวดเร็ว",
    kicker_lo: "ເຂົ້າເຖິງຢ່າງໄວ",
    kicker_en: "Quick Access",
    title: "ทางลัดคลังข้อมูลและกิจกรรม",
    title_lo: "ທາງລັດຄັງຂໍ້ມູນ ແລະກິດຈະກຳ",
    title_en: "Direct Shortcuts & Archives",
    description: "เข้าสู่ข่าวสารและกิจกรรม คลังสื่อ และเอกสารเผยแพร่ที่สำคัญได้อย่างรวดเร็ว",
    description_lo: "ເຂົ້າສູ່ຂ່າວສານ ກິດຈະກຳ ຄັງສື່ ແລະເອກະສານສຳຄັນຢ່າງໄວວາ",
    description_en: "Quickly browse latest updates, photo/video media library, and published documents.",
    buttonText: "ดูคลังสื่อทั้งหมด",
    buttonText_lo: "ເບິ່ງຄັງສື່ທັງໝົດ",
    buttonText_en: "View Media Library",
    buttonUrl: "#media-library",
    openExternal: false,
    theme: "standard",
    icon: "✦",
    projectScope: "all",
    published: true,
    order: 20,
    fallback: true
  },
  {
    id: "default-donate",
    type: "donation",
    template: "donation",
    kicker: "ร่วมบุญ",
    kicker_lo: "ຮ່ວມບຸນ",
    kicker_en: "Donation",
    title: "ร่วมสืบสานมรดกแห่งศรัทธา",
    title_lo: "ຮ່ວມສືບສານມໍລະດົກແຫ່ງສັດທາ",
    title_en: "Support the Sacred Heritage",
    description: "ร่วมทำบุญสมทบทุนเพื่อบูรณะและผลักดันพระธาตุพนมขึ้นทะเบียนเป็นมรดกโลก",
    description_lo: "ຮ່ວມເຮັດບຸນສົມທົບທຶນເພື່ອບູລະນະ ແລະຜັກດັນພະທາດພະນົມຂຶ້ນທະບຽນเป็นมรดกโลก",
    description_en: "Participate in merit-making and supporting conservation efforts transparently.",
    buttonText: "ดูรายละเอียด",
    buttonText_lo: "ເບິ່ງລາຍລະອຽດ",
    buttonText_en: "View Donation Details",
    buttonUrl: "#donation",
    openExternal: false,
    theme: "maroon",
    icon: "♥",
    projectScope: "all",
    published: true,
    order: 30,
    fallback: true
  }
];

const RAIL_TEMPLATES = {
  custom: {
    kicker: "หัวข้อใหม่", kicker_lo: "", kicker_en: "",
    title: "หัวข้อประชาสัมพันธ์", title_lo: "", title_en: "",
    description: "รายละเอียดหัวข้อประชาสัมพันธ์", description_lo: "", description_en: "",
    icon: "✦", buttonText: "ดูรายละเอียด", buttonText_lo: "", buttonText_en: "",
    buttonUrl: "#", theme: "standard"
  },
  news: {
    kicker: "ข่าวด่วน", kicker_lo: "ຂ່າວດ່ວນ", kicker_en: "Breaking News",
    title: "ประกาศข่าวสารสำคัญ", title_lo: "ປະກາດຂ່າວສານສຳຄັນ", title_en: "Important Announcement",
    description: "ติดตามความเคลื่อนไหวและประกาศล่าสุดของโครงการ", description_lo: "ຕິດຕາມຄວາມເຄື່ອນໄຫວ ແລະປະກາດຫຼ້າສຸດຂອງໂຄງການ", description_en: "Stay updated with the latest project news and announcements.",
    icon: "📢", buttonText: "อ่านข่าวทั้งหมด", buttonText_lo: "ອ່ານຂ່າວທັງໝົດ", buttonText_en: "Read All News",
    buttonUrl: "#news-events", theme: "standard"
  },
  schedule: {
    kicker: "กำหนดการ", kicker_lo: "ກຳນົດການ", kicker_en: "Schedule",
    title: "กำหนดการและกิจกรรม", title_lo: "ກຳນົດການ ແລະກິດຈະກຳ", title_en: "Schedule & Events",
    description: "ตารางเวลาและกำหนดการจัดกิจกรรมสำคัญของโครงการ", description_lo: "ຕາຕະລາງເວລາ ແລະກຳນົດການຈັດກິດຈະກຳສຳຄັນຂອງໂຄງການ", description_en: "Timetable and upcoming key events of the project.",
    icon: "📅", buttonText: "ดูกำหนดการ", buttonText_lo: "ເບິ່ງກຳນົດການ", buttonText_en: "View Schedule",
    buttonUrl: "#timeline", theme: "standard"
  },
  ceremony: {
    kicker: "พิธีสำคัญ", kicker_lo: "ພິທີສຳຄັນ", kicker_en: "Ceremony",
    title: "พิธีสมโภชและบำเพ็ญกุศล", title_lo: "ພິທີສົມໂພດ ແລະບຳເພັນກຸສົນ", title_en: "Sacred Ceremony",
    description: "ขอเชิญพุทธศาสนิกชนร่วมพิธีสำคัญเพื่อความเป็นสิริมงคล", description_lo: "ຂໍເຊີນພຸດທະສາສະນິກະຊົນຮ່ວມພິທີສຳຄັນເພື່ອຄວາມເປັນສິລິມຸງຄຸນ", description_en: "Invitation to attend sacred merit-making ceremony.",
    icon: "🙏", buttonText: "รายละเอียดพิธี", buttonText_lo: "ລາຍລະອຽດພິທີ", buttonText_en: "Ceremony Details",
    buttonUrl: "#history", theme: "gold"
  },
  live: {
    kicker: "ถ่ายทอดสด", kicker_lo: "ຖ່າຍທອດສົດ", kicker_en: "Live Stream",
    title: "ถ่ายทอดสดกิจกรรมและพิธีกรรม", title_lo: "ຖ່າຍທອດສົດກິດຈະກຳ ແລະພິທີກຳ", title_en: "Live Broadcast",
    description: "รับชมบรรยากาศพิธีสำคัญและการจัดงานแบบเรียลไทม์", description_lo: "ຮັບຊົມບັນຍາກາດພິທີສຳຄັນ ແລະງານແບບທັນເວລາ", description_en: "Watch real-time live broadcast of key ceremonies and events.",
    icon: "🔴", buttonText: "รับชมถ่ายทอดสด", buttonText_lo: "ຮັບຊົມຖ່າຍທອດສົດ", buttonText_en: "Watch Live",
    buttonUrl: "#media-library", theme: "dark"
  },
  document: {
    kicker: "เอกสารสำคัญ", kicker_lo: "ເອກະສານສຳຄັນ", kicker_en: "Documents",
    title: "เอกสารประกอบและรายงาน", title_lo: "ເອກະສານประกอบ ແລະລາຍງານ", title_en: "Reports & Documents",
    description: "ดาวน์โหลดเอกสารวิชาการ แบบแปลน และรายงานการดำเนินงาน", description_lo: "ດາວໂຫຼດເອກະສານວິຊາການ ແບບແປນ ແລະລາຍງານການດຳເນີນງານ", description_en: "Download official research papers, architectural plans, and progress reports.",
    icon: "📄", buttonText: "ดาวน์โหลดเอกสาร", buttonText_lo: "ດາວໂຫຼດເອກະສານ", buttonText_en: "Download Docs",
    buttonUrl: "#documents", theme: "standard"
  },
  donation: {
    kicker: "ร่วมบุญ", kicker_lo: "ຮ່ວມບຸນ", kicker_en: "Donation",
    title: "ร่วมสืบสานมรดกแห่งศรัทธา", title_lo: "ຮ່ວມສືບສານມໍລະດົກແຫ່ງສັດທາ", title_en: "Support the Heritage",
    description: "ร่วมอนุรักษ์และสนับสนุนการดำเนินงานเพื่อการอนุรักษ์อย่างโปร่งใส", description_lo: "ຮ່ວມອະນຸລັກ ແລະສະໜັບສະໜູນการດຳເນີນງານເພື່ອການອະນຸລັກຢ່າງໂປ່ງໃສ", description_en: "Join in supporting preservation and development with full transparency.",
    icon: "♥", buttonText: "ดูช่องทางร่วมบุญ", buttonText_lo: "ເບິ່ງຊ່ອງທາງຮ່ວມບຸນ", buttonText_en: "View Channels",
    buttonUrl: "#donation", theme: "maroon"
  },
  project: {
    kicker: "โครงการปัจจุบัน", kicker_lo: "ໂຄງການປັດຈຸບັນ", kicker_en: "Current Project",
    title: "พระธาตุพนม สู่มรดกโลก", title_lo: "ພະທາດພະນົມສູ່ມໍລະດົກໂລກ", title_en: "Phra That Phanom to World Heritage",
    description: "ร่วมอนุรักษ์คุณค่าทางกายภาพและจิตวิญญาณของศูนย์รวมศรัทธาแห่งลุ่มน้ำโขง", description_lo: "ຮ່ວມອະນຸລັກຄຸນຄ່າທາງກາຍະພາບ ແລະຈິດວິນຍານຂອງສູນລວມສັດທາແຫ່ງລຸ່ມນ້ຳຂອງ", description_en: "Help safeguard the physical and spiritual values of this centre of Mekong faith.",
    icon: "🏛", buttonText: "ดูโครงการทั้งหมด", buttonText_lo: "ເບິ່ງໂຄງການທັງໝົດ", buttonText_en: "View All Projects",
    buttonUrl: "#projects", theme: "gold"
  },
  quick: {
    kicker: "ทางลัดเข้าถึง", kicker_lo: "ທາງລັດເຂົ້າເຖິງ", kicker_en: "Quick Access",
    title: "เข้าถึงอย่างรวดเร็ว", title_lo: "ເຂົ້າເຖິງຢ່າງໄວ", title_en: "Quick Access",
    description: "ทางลัดสู่เนื้อหา ข่าวสาร และกิจกรรมสำคัญของโครงการ", description_lo: "ທາງລັດສູ່ເນື້ອຫາ ຂ່າວສານ ແລະກິດຈະກຳສຳຄັນຂອງໂຄງການ", description_en: "Shortcut to key project resources, updates, and activities.",
    icon: "✦", buttonText: "ดูคลังสื่อทั้งหมด", buttonText_lo: "ເບິ່ງຄັງສື່ທັງໝົດ", buttonText_en: "View Media Library",
    buttonUrl: "#media-library", theme: "standard"
  }
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
const projectRef = doc(db, "projects", PROJECT_KEY);
const contentCollection = collection(projectRef, "content");
const mediaCollection = collection(projectRef, "media");
const siteNodesCollection = collection(projectRef, "siteNodes");
const railCardsCollection = collection(projectRef, "railCards");

const portal = {
  user: null,
  role: "guest",
  items: [],
  media: [],
  nodes: [],
  railCards: [],
  mediaFilter: "all",
  manageKind: "media",
  editingItem: null,
  editingRailCard: null,
  unsubContent: null,
  unsubNodes: null,
  unsubMedia: null,
  unsubRailCards: null
};

const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const isAdmin = () => portal.role === "admin";

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

function driveFileId(value) {
  try {
    const url = new URL(value);
    if (!["drive.google.com", "www.drive.google.com"].includes(url.hostname.toLowerCase())) return "";
    const match = url.pathname.match(/\/file\/d\/([\w-]{10,200})/);
    return match?.[1] || (/^[\w-]{10,200}$/.test(url.searchParams.get("id") || "") ? url.searchParams.get("id") : "");
  } catch {
    return "";
  }
}

function fastImageUrl(value) {
  const id = driveFileId(value);
  return id ? `https://lh3.googleusercontent.com/d/${encodeURIComponent(id)}` : safeUrl(value);
}

function youtubeId(value) {
  try {
    const url = new URL(value);
    if (url.hostname === "youtu.be") return url.pathname.slice(1).split("/")[0];
    if (url.hostname.includes("youtube.com")) return url.pathname.startsWith("/embed/") ? url.pathname.split("/")[2] : (url.searchParams.get("v") || "");
  } catch {}
  return "";
}

function showToast(message, tone = "") {
  const toast = $("#toast");
  toast.textContent = message;
  toast.dataset.tone = tone;
  toast.classList.add("show");
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove("show"), 3000);
}

function formatDate(value) {
  if (!value) return "";
  const date = value?.toDate ? value.toDate() : new Date(`${value}T00:00:00`);
  if (Number.isNaN(date.getTime())) return "";
  const locale = document.documentElement.lang === "en" ? "en-GB" : document.documentElement.lang === "lo" ? "lo-LA" : "th-TH";
  return new Intl.DateTimeFormat(locale, { day: "numeric", month: "long", year: "numeric" }).format(date);
}

function sectionNode(kind) {
  return portal.nodes.find(node => node.id === NODE_IDS[kind]) || null;
}

function sectionVisible(kind) {
  return isAdmin() || Boolean(sectionNode(kind)?.published);
}

function renderSectionVisibility() {
  let visibleCount = 0;
  ["media", "news", "document", "donation"].forEach(kind => {
    const visible = sectionVisible(kind);
    const section = $(`[data-resource-section="${kind}"]`);
    const link = $(`[data-resource-link="${kind}"]`);
    if (section) section.hidden = !visible;
    if (link) link.hidden = !visible;
    if (visible) visibleCount += 1;
    if (section && isAdmin()) {
      const status = section.querySelector(".resource-status");
      const node = sectionNode(kind);
      if (status) {
        status.textContent = node?.published ? "พร้อมเผยแพร่" : "ฉบับร่าง";
        status.classList.toggle("published", Boolean(node?.published));
      }
    }
  });
  $("#project-resources").hidden = !isAdmin() && visibleCount === 0;
  const resourceNavigation = $("[data-resource-navigation]");
  if (resourceNavigation) resourceNavigation.hidden = !isAdmin() && visibleCount === 0;
  $$(".portal-admin-only").forEach(element => { element.hidden = !isAdmin(); });
}

function mediaType(item) {
  return item.type === "image" ? "image" : "video";
}

function openPortalImage(item) {
  const url = fastImageUrl(item.url);
  if (!url) return;
  $("#lightboxImage").src = url;
  $("#lightboxImage").alt = item.title || "ภาพพระธาตุพนม";
  $("#lightboxTitle").textContent = item.title || "ภาพพระธาตุพนม";
  $("#lightboxDescription").textContent = item.description || "";
  $("#lightboxDescription").hidden = !item.description;
  $("#lightboxOriginalLink").href = url;
  $("#imageLightbox").showModal();
}

function createMediaCard(item) {
  const card = document.createElement("article");
  card.className = "portal-media-card";
  const visual = document.createElement("div");
  visual.className = "portal-media-visual";
  const type = mediaType(item);
  if (type === "image") {
    const image = document.createElement("img");
    image.src = fastImageUrl(item.url);
    image.alt = item.title || "ภาพพระธาตุพนม";
    image.loading = "lazy";
    image.decoding = "async";
    const button = document.createElement("button");
    button.type = "button";
    button.setAttribute("aria-label", `ขยายภาพ ${item.title || "พระธาตุพนม"}`);
    button.append(image);
    button.addEventListener("click", () => openPortalImage(item));
    visual.append(button);
  } else {
    const videoId = youtubeId(item.url);
    const driveId = driveFileId(item.url);
    const link = document.createElement("a");
    link.href = safeUrl(item.url) || "#";
    link.target = "_blank";
    link.rel = "noopener";
    link.setAttribute("aria-label", `เปิดวิดีโอ ${item.title || "พระธาตุพนม"}`);
    if (videoId) {
      const image = document.createElement("img");
      image.src = `https://i.ytimg.com/vi/${encodeURIComponent(videoId)}/hqdefault.jpg`;
      image.alt = "";
      image.loading = "lazy";
      link.append(image);
    } else if (!driveId && /\.(mp4|webm)(\?|$)/i.test(item.url || "")) {
      const video = document.createElement("video");
      video.src = safeUrl(item.url);
      video.preload = "metadata";
      video.muted = true;
      link.append(video);
    }
    const play = document.createElement("span");
    play.className = "portal-play-icon";
    play.textContent = "▶";
    link.append(play);
    visual.append(link);
  }
  const copy = document.createElement("div");
  copy.className = "portal-media-copy";
  const label = document.createElement("span");
  label.textContent = type === "image" ? "รูปภาพ" : "วิดีโอ";
  const title = document.createElement("h4");
  title.textContent = item.title || (type === "image" ? "รูปภาพ" : "วิดีโอ");
  copy.append(label, title);
  card.append(visual, copy);
  return card;
}

function renderMediaLibrary() {
  const root = $("#portalMediaGrid");
  if (!root) return;
  const items = portal.media.filter(item => portal.mediaFilter === "all" || mediaType(item) === portal.mediaFilter);
  root.replaceChildren();
  items.forEach(item => root.append(createMediaCard(item)));
  if (!items.length) root.innerHTML = `<p class="resource-empty">${EMPTY_TEXT.media}</p>`;
}

function itemStatus(item) {
  if (!isAdmin()) return null;
  const badge = document.createElement("span");
  badge.className = `content-card-status${item.published ? " published" : ""}`;
  badge.textContent = item.published ? "เผยแพร่แล้ว" : "ฉบับร่าง";
  return badge;
}

function createNewsCard(item) {
  const card = document.createElement("article");
  card.className = "portal-content-card news-card";
  if (safeUrl(item.imageUrl)) {
    const image = document.createElement("img");
    image.src = fastImageUrl(item.imageUrl);
    image.alt = item.title || "";
    image.loading = "lazy";
    card.append(image);
  }
  const body = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "portal-content-meta";
  const date = document.createElement("time");
  date.textContent = formatDate(item.eventDate || item.createdAt) || "ข่าวโครงการ";
  meta.append(date);
  const badge = itemStatus(item);
  if (badge) meta.append(badge);
  const title = document.createElement("h4");
  title.textContent = item.title || "ข่าวและกิจกรรม";
  const description = document.createElement("p");
  description.textContent = item.description || "";
  body.append(meta, title, description);
  if (safeUrl(item.actionUrl)) {
    const link = document.createElement("a");
    link.className = "portal-action-link";
    link.href = safeUrl(item.actionUrl);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "อ่านรายละเอียด ↗";
    body.append(link);
  }
  card.append(body);
  return card;
}

function createDocumentRow(item) {
  const row = document.createElement("article");
  row.className = "portal-document-row";
  const icon = document.createElement("span");
  icon.className = "document-icon";
  icon.textContent = "PDF";
  const copy = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "portal-content-meta";
  const date = document.createElement("span");
  date.textContent = formatDate(item.eventDate || item.createdAt) || "เอกสารโครงการ";
  meta.append(date);
  const badge = itemStatus(item);
  if (badge) meta.append(badge);
  const title = document.createElement("h4");
  title.textContent = item.title || "เอกสาร";
  const description = document.createElement("p");
  description.textContent = item.description || "";
  copy.append(meta, title, description);
  const link = document.createElement("a");
  link.className = "button secondary";
  link.href = safeUrl(item.actionUrl) || "#";
  link.target = "_blank";
  link.rel = "noopener";
  link.textContent = safeUrl(item.actionUrl) ? "เปิดเอกสาร" : "ยังไม่มีไฟล์";
  if (!safeUrl(item.actionUrl)) link.setAttribute("aria-disabled", "true");
  row.append(icon, copy, link);
  return row;
}

function createDonationCard(item) {
  const card = document.createElement("article");
  card.className = "portal-content-card donation-card";
  if (safeUrl(item.imageUrl)) {
    const image = document.createElement("img");
    image.src = fastImageUrl(item.imageUrl);
    image.alt = item.title || "ช่องทางร่วมบุญ";
    image.loading = "lazy";
    card.append(image);
  }
  const body = document.createElement("div");
  const meta = document.createElement("div");
  meta.className = "portal-content-meta";
  const label = document.createElement("span");
  label.textContent = "ร่วมสืบสานพระธาตุพนม";
  meta.append(label);
  const badge = itemStatus(item);
  if (badge) meta.append(badge);
  const title = document.createElement("h4");
  title.textContent = item.title || "ร่วมบุญกับโครงการ";
  const description = document.createElement("p");
  description.textContent = item.description || "";
  body.append(meta, title, description);
  if (safeUrl(item.actionUrl)) {
    const link = document.createElement("a");
    link.className = "button primary";
    link.href = safeUrl(item.actionUrl);
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = "ดูรายละเอียดการร่วมบุญ";
    body.append(link);
  }
  card.append(body);
  return card;
}

function itemsFor(kind) {
  return portal.items
    .filter(item => item.kind === kind && (isAdmin() || item.published))
    .sort((a, b) => String(b.eventDate || "").localeCompare(String(a.eventDate || "")) || (Number(a.order) || 0) - (Number(b.order) || 0));
}

function renderContentLists() {
  const configs = [
    ["news", "#portalNewsList", createNewsCard],
    ["document", "#portalDocumentList", createDocumentRow],
    ["donation", "#portalDonationList", createDonationCard]
  ];
  configs.forEach(([kind, selector, create]) => {
    const root = $(selector);
    const items = itemsFor(kind);
    root.replaceChildren();
    items.forEach(item => root.append(create(item)));
    if (!items.length) root.innerHTML = `<p class="resource-empty">${EMPTY_TEXT[kind]}</p>`;
  });
}

function projectText() {
  const lang = document.documentElement.lang;
  if (lang === "en") return {
    published: "Published", draft: "Draft · Admin only", current: "Current project",
    open: "Open project", website: "Project website ↗", noSections: "No project sections have been added yet",
    story: "Story of faith", heritage: "World Heritage journey", media: "Media and documents", community: "Community",
    count: total => `${total} project${total === 1 ? "" : "s"}`
  };
  if (lang === "lo") return {
    published: "ເຜີຍແຜ່ແລ້ວ", draft: "ສະບັບຮ່າງ · ສະເພາະ Admin", current: "ໂຄງການປັດຈຸບັນ",
    open: "ເປີດໂຄງການ", website: "ເວັບໄຊໂຄງການ ↗", noSections: "ຍັງບໍ່ມີຫົວຂໍ້ໃນໂຄງການນີ້",
    story: "ເລື່ອງລາວແຫ່ງສັດທາ", heritage: "ເສັ້ນທາງມໍລະດົກໂລກ", media: "ສື່ ແລະເອກະສານ", community: "ຊຸມຊົນ",
    count: total => `${total} ໂຄງການ`
  };
  return {
    published: "เผยแพร่แล้ว", draft: "ฉบับร่าง · เฉพาะ Admin", current: "โครงการปัจจุบัน",
    open: "เปิดโครงการ", website: "เว็บไซต์โครงการ ↗", noSections: "ยังไม่มีหัวข้อภายในโครงการนี้",
    story: "เรื่องราวแห่งศรัทธา", heritage: "เส้นทางมรดกโลก", media: "สื่อและเอกสาร", community: "ชุมชน",
    count: total => `${total} โครงการ`
  };
}

function projectNodeAnchor(node) {
  const external = safeUrl(node.url);
  if (external) return external;
  if (node.type === "news") return "#news-events";
  if (node.type === "document") return "#documents";
  if (node.type === "donation") return "#donation";
  if (node.contentType === "project" && node.contentRef === PROJECT_KEY) return "#project-resources";
  return PROJECT_ANCHORS[node.contentRef] || "";
}

function isMuchalindaProject(project) {
  const identity = `${project?.id || ""} ${project?.slug || ""} ${project?.title || ""}`.toLowerCase();
  return identity.includes("muchalinda") || identity.includes("mujalin") || identity.includes("มุจลิน");
}

function setSupportProjectMode(open) {
  document.body.classList.toggle("support-project-open", Boolean(open));
  const supportProject = $("#muchalinda-project");
  if (supportProject) supportProject.hidden = !open;
}

function openProjectDetail(project) {
  const supportProject = $("#muchalinda-project");
  if (isMuchalindaProject(project) && supportProject) {
    $("#selectedProjectDetail").hidden = true;
    setSupportProjectMode(true);
    supportProject.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "start" });
    history.replaceState(null, "", "#muchalinda-project");
    return;
  }
  setSupportProjectMode(false);
  const text = projectText();
  const currentProject = project.id === DEFAULT_PROJECT.id || project.contentRef === PROJECT_KEY || project.slug === PROJECT_KEY;
  const detail = $("#selectedProjectDetail");
  $("#selectedProjectStatus").textContent = currentProject ? text.current : (project.published ? text.published : text.draft);
  $("#selectedProjectTitle").textContent = project.title || "โครงการพระธาตุพนม";
  $("#selectedProjectDescription").textContent = project.description || "";
  const linksRoot = $("#selectedProjectLinks");
  linksRoot.replaceChildren();
  const seen = new Set();
  portal.nodes
    .filter(node => node.parentId === project.id && !node.deletedAt)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0))
    .forEach(node => {
      const destination = projectNodeAnchor(node);
      if (!destination || seen.has(destination)) return;
      seen.add(destination);
      const link = document.createElement("a");
      link.href = destination;
      link.textContent = node.title || "ดูรายละเอียด";
      if (destination.startsWith("https://")) { link.target = "_blank"; link.rel = "noopener"; }
      linksRoot.append(link);
    });
  if (currentProject) {
    [["#history", text.story], ["#world-heritage", text.heritage], ["#project-resources", text.media], ["#community", text.community]].forEach(([destination, label]) => {
      if (seen.has(destination)) return;
      seen.add(destination);
      const link = document.createElement("a");
      link.href = destination;
      link.textContent = label;
      linksRoot.append(link);
    });
  }
  const projectUrl = safeUrl(project.url);
  if (projectUrl && !seen.has(projectUrl)) {
    const link = document.createElement("a");
    link.href = projectUrl;
    link.target = "_blank";
    link.rel = "noopener";
    link.textContent = text.website;
    linksRoot.append(link);
  }
  if (!linksRoot.children.length) {
    const empty = document.createElement("span");
    empty.textContent = text.noSections;
    linksRoot.append(empty);
  }
  detail.hidden = false;
  detail.scrollIntoView({ behavior: matchMedia("(prefers-reduced-motion: reduce)").matches ? "auto" : "smooth", block: "nearest" });
}

function createProjectCard(project) {
  const text = projectText();
  const currentProject = project.id === DEFAULT_PROJECT.id || project.contentRef === PROJECT_KEY || project.slug === PROJECT_KEY;
  const card = document.createElement("article");
  card.className = "project-catalog-card";
  const cover = document.createElement("div");
  cover.className = "project-card-cover";
  const status = document.createElement("p");
  status.className = `project-status${!project.published && !currentProject ? " draft" : ""}`;
  status.textContent = currentProject ? text.current : (project.published ? text.published : text.draft);
  const logo = document.createElement("img");
  logo.src = "assets/logo.png";
  logo.alt = "";
  cover.append(status, logo);
  const copy = document.createElement("div");
  copy.className = "project-card-copy";
  const title = document.createElement("h3");
  title.textContent = project.title || "โครงการพระธาตุพนม";
  const description = document.createElement("p");
  description.textContent = project.description || "";
  const actions = document.createElement("div");
  actions.className = "project-card-actions";
  const open = document.createElement("button");
  open.type = "button";
  open.className = "project-card-open";
  open.textContent = text.open;
  open.addEventListener("click", () => openProjectDetail(project));
  actions.append(open);
  const projectUrl = safeUrl(project.url);
  if (projectUrl) {
    const external = document.createElement("a");
    external.className = "project-card-external";
    external.href = projectUrl;
    external.target = "_blank";
    external.rel = "noopener";
    external.textContent = text.website;
    actions.append(external);
  }
  copy.append(title, description, actions);
  card.append(cover, copy);
  return card;
}

function renderProjectCatalog() {
  const root = $("#projectCatalogGrid");
  if (!root) return;
  const projects = portal.nodes
    .filter(node => node.type === "project" && !node.deletedAt)
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0) || String(a.title || "").localeCompare(String(b.title || ""), "th"));
  const hasCurrent = projects.some(node => node.contentRef === PROJECT_KEY || node.slug === PROJECT_KEY || node.id === DEFAULT_PROJECT.id);
  if (!hasCurrent) projects.unshift(DEFAULT_PROJECT);
  if (isAdmin() && !projects.some(isMuchalindaProject)) projects.push(DEFAULT_SUPPORT_PROJECT);
  root.replaceChildren();
  projects.forEach(project => root.append(createProjectCard(project)));
  $("#projectCatalogCount").textContent = projectText().count(projects.length);
  $("#manageProjectsButton").hidden = !isAdmin();
}

function renderPortal() {
  renderSectionVisibility();
  renderProjectCatalog();
  renderMediaLibrary();
  renderContentLists();
  renderRightRail();
  if ($("#contentManageDialog")?.open) renderManageDialog();
}

function stopListeners() {
  ["unsubContent", "unsubNodes", "unsubMedia", "unsubRailCards"].forEach(key => {
    if (portal[key]) portal[key]();
    portal[key] = null;
  });
}

function listenPortalData() {
  stopListeners();
  const contentQuery = isAdmin() ? query(contentCollection, orderBy("order", "asc")) : query(contentCollection, where("published", "==", true));
  const nodeQuery = isAdmin() ? query(siteNodesCollection, orderBy("order", "asc")) : query(siteNodesCollection, where("published", "==", true));
  portal.unsubContent = onSnapshot(contentQuery, snapshot => {
    portal.items = snapshot.docs.map(record => ({ id: record.id, ...record.data() }));
    window.dispatchEvent(new CustomEvent("portal-content-updated", { detail: portal.items }));
    renderPortal();
  }, error => {
    console.warn("Project content unavailable", error.code);
    portal.items = [];
    renderPortal();
  });
  portal.unsubNodes = onSnapshot(nodeQuery, snapshot => {
    portal.nodes = snapshot.docs.map(record => ({ id: record.id, ...record.data() })).filter(node => !node.deletedAt);
    renderPortal();
  }, error => {
    console.warn("Published project sections unavailable", error.code);
    portal.nodes = [];
    renderPortal();
  });
  portal.unsubMedia = onSnapshot(query(mediaCollection, orderBy("order", "asc")), snapshot => {
    portal.media = snapshot.docs.map(record => ({ id: record.id, ...record.data() }));
    renderMediaLibrary();
  }, error => console.warn("Media library unavailable", error.code));

  const railQuery = isAdmin() ? query(railCardsCollection, orderBy("order", "asc")) : query(railCardsCollection, where("published", "==", true));
  portal.unsubRailCards = onSnapshot(railQuery, snapshot => {
    portal.railCards = snapshot.docs.map(record => ({ id: record.id, ...record.data() }));
    renderRightRail();
  }, error => {
    console.warn("Rail cards unavailable", error.code);
    portal.railCards = [];
    renderRightRail();
  });
}

async function resolveRole(user) {
  if (!user) return "guest";
  if (user.email?.toLowerCase() === ADMIN_EMAIL) {
    try {
      const memberRef = doc(db, "projects", PROJECT_KEY, "members", user.uid);
      const userRef = doc(db, "users", user.uid);
      Promise.allSettled([
        setDoc(userRef, {
          email: user.email,
          displayName: user.displayName || "",
          globalRole: "admin",
          lastLoginAt: serverTimestamp()
        }, { merge: true }),
        setDoc(memberRef, {
          role: "admin",
          email: user.email,
          displayName: user.displayName || "",
          lastLoginAt: serverTimestamp()
        }, { merge: true })
      ]).catch(() => {});
    } catch {
      // ignore sync errors
    }
    return "admin";
  }
  try {
    const membership = await getDoc(doc(db, "projects", PROJECT_KEY, "members", user.uid));
    return ["admin", "manager", "user"].includes(membership.data()?.role) ? membership.data().role : "user";
  } catch {
    return "user";
  }
}

function configureEditor(kind, item = null) {
  portal.editingItem = item;
  $("#contentEditorForm").reset();
  $("#contentItemId").value = item?.id || "";
  $("#contentItemKind").value = kind;
  $("#contentItemTitle").value = item?.title || "";
  $("#contentItemDate").value = item?.eventDate || "";
  $("#contentItemDescription").value = item?.description || "";
  $("#contentItemImageUrl").value = item?.imageUrl || "";
  $("#contentItemActionUrl").value = item?.actionUrl || "";
  $("#contentItemPublished").checked = Boolean(item?.published);
  $("#contentEditorTitle").textContent = `${item ? "แก้ไข" : "เพิ่ม"}${KIND_LABELS[kind]}`;
  $("#contentDateField").hidden = kind === "donation";
  $("#contentImageUrlField").hidden = kind === "document";
  $("#contentActionUrlLabel").textContent = kind === "document" ? "ลิงก์เอกสาร" : kind === "donation" ? "ลิงก์รายละเอียดหรือช่องทางร่วมบุญ" : "ลิงก์อ่านรายละเอียดเพิ่มเติม";
  const file = $("#contentItemFile");
  file.value = "";
  if (kind === "document") {
    file.accept = "application/pdf";
    $("#contentFileLabel").textContent = "ไฟล์ PDF";
    $("#contentFileHelp").textContent = "รองรับ PDF ไม่เกิน 20 MB";
  } else {
    file.accept = "image/jpeg,image/png,image/webp";
    $("#contentFileLabel").textContent = "รูปภาพประกอบ";
    $("#contentFileHelp").textContent = "รองรับ JPG, PNG และ WebP ไม่เกิน 10 MB";
  }
  $("#contentEditorStatus").hidden = true;
  $("#contentEditDialog").showModal();
}

function renderManageDialog() {
  const kind = portal.manageKind;
  const node = sectionNode(kind);
  $("#contentManageTitle").textContent = `จัดการ${KIND_LABELS[kind]}`;
  $("#contentSectionStatus").textContent = node?.published ? "พร้อมเผยแพร่ — ผู้ชมมองเห็นหัวข้อนี้" : "ฉบับร่าง — เห็นเฉพาะ Admin";
  $("#toggleContentSectionButton").textContent = node?.published ? "เปลี่ยนเป็นฉบับร่าง" : "แสดงต่อผู้ชม";
  $("#addContentItemButton").textContent = kind === "media" ? "เปิดหน้าจัดการสื่อ" : "＋ เพิ่มรายการ";
  const root = $("#contentManageList");
  root.replaceChildren();
  if (kind === "media") {
    const note = document.createElement("p");
    note.className = "content-manage-note";
    note.textContent = `คลังนี้รวบรวมสื่อเดิมทั้งหมด ${portal.media.length} รายการโดยอัตโนมัติ การเพิ่ม แก้ไข หรือลบ ใช้หน้าจัดการสื่อเดิม`;
    root.append(note);
    return;
  }
  const items = itemsFor(kind);
  items.forEach(item => {
    const row = document.createElement("div");
    row.className = "content-manage-row";
    const copy = document.createElement("div");
    const title = document.createElement("strong");
    title.textContent = item.title || KIND_LABELS[kind];
    const meta = document.createElement("span");
    meta.textContent = `${item.published ? "เผยแพร่แล้ว" : "ฉบับร่าง"}${item.eventDate ? ` · ${formatDate(item.eventDate)}` : ""}`;
    copy.append(title, meta);
    const actions = document.createElement("div");
    actions.className = "row-actions";
    const edit = document.createElement("button");
    edit.type = "button";
    edit.textContent = "แก้ไข";
    edit.addEventListener("click", () => configureEditor(kind, item));
    const remove = document.createElement("button");
    remove.type = "button";
    remove.className = "delete";
    remove.textContent = "ลบ";
    remove.addEventListener("click", () => deleteContentItem(item));
    actions.append(edit, remove);
    row.append(copy, actions);
    root.append(row);
  });
  if (!items.length) root.innerHTML = `<p class="resource-empty">ยังไม่มีรายการ กด “เพิ่มรายการ” เพื่อเริ่มต้น</p>`;
}

function openManageDialog(kind) {
  if (!isAdmin()) return;
  portal.manageKind = kind;
  renderManageDialog();
  $("#contentManageDialog").showModal();
}

async function toggleSectionPublished() {
  const node = sectionNode(portal.manageKind);
  if (!node) return showToast("ไม่พบหัวข้อนี้ในผัง กรุณาเปิดผังโครงการอีกครั้ง", "error");
  const button = $("#toggleContentSectionButton");
  button.disabled = true;
  try {
    await updateDoc(doc(siteNodesCollection, node.id), {
      published: !node.published,
      updatedAt: serverTimestamp(),
      updatedBy: portal.user.uid
    });
    showToast(node.published ? "เปลี่ยนเป็นฉบับร่างแล้ว" : "เปิดแสดงหัวข้อนี้ต่อผู้ชมแล้ว");
  } catch (error) {
    console.error(error);
    showToast("เปลี่ยนสถานะหัวข้อไม่สำเร็จ", "error");
  } finally {
    button.disabled = false;
  }
}

async function saveContentItem(event) {
  event.preventDefault();
  if (!isAdmin()) return;
  const kind = $("#contentItemKind").value;
  const title = $("#contentItemTitle").value.trim();
  const description = $("#contentItemDescription").value.trim();
  const file = $("#contentItemFile").files[0];
  const editing = portal.editingItem;
  const uploadedPaths = [];
  let imageUrl = fastImageUrl($("#contentItemImageUrl").value.trim());
  let actionUrl = safeUrl($("#contentItemActionUrl").value.trim());
  let storagePath = editing?.storagePath || "";
  const status = $("#contentEditorStatus");
  const save = $("#saveContentItemButton");
  status.hidden = true;
  save.disabled = true;
  save.textContent = "กำลังบันทึก...";
  try {
    if (!title || !description || !["news", "document", "donation"].includes(kind)) throw new Error("กรุณากรอกชื่อเรื่องและรายละเอียดให้ครบ");
    if (file) {
      const isPdf = file.type === "application/pdf";
      const isImage = /^image\/(jpeg|png|webp)$/.test(file.type);
      if (kind === "document" && (!isPdf || file.size > 20 * 1024 * 1024)) throw new Error("เอกสารต้องเป็น PDF และมีขนาดไม่เกิน 20 MB");
      if (kind !== "document" && (!isImage || file.size > 10 * 1024 * 1024)) throw new Error("รูปภาพต้องเป็น JPG, PNG หรือ WebP และมีขนาดไม่เกิน 10 MB");
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_") || (isPdf ? "document.pdf" : "image");
      storagePath = `projects/${PROJECT_KEY}/content/${portal.user.uid}/${Date.now()}-${safeName}`;
      const uploaded = await uploadBytes(ref(storage, storagePath), file, { contentType: file.type });
      uploadedPaths.push(storagePath);
      const uploadedUrl = await getDownloadURL(uploaded.ref);
      if (kind === "document") actionUrl = uploadedUrl;
      else imageUrl = uploadedUrl;
    } else if (editing) {
      const linkedUrlChanged = kind === "document" ? actionUrl !== (editing.actionUrl || "") : imageUrl !== (editing.imageUrl || "");
      if (linkedUrlChanged) storagePath = "";
    }
    if (kind === "document" && !actionUrl) throw new Error("กรุณาใส่ลิงก์เอกสารหรืออัปโหลดไฟล์ PDF");
    const payload = {
      kind,
      title,
      description,
      eventDate: $("#contentItemDate").value || "",
      imageUrl,
      actionUrl,
      storagePath,
      published: $("#contentItemPublished").checked,
      order: editing?.order || Date.now(),
      updatedAt: serverTimestamp(),
      updatedBy: portal.user.uid
    };
    if (editing) await updateDoc(doc(contentCollection, editing.id), payload);
    else await addDoc(contentCollection, { ...payload, createdAt: serverTimestamp(), createdBy: portal.user.uid, createdByEmail: portal.user.email || "" });
    if (editing?.storagePath && editing.storagePath !== storagePath) await deleteObject(ref(storage, editing.storagePath)).catch(() => {});
    $("#contentEditDialog").close();
    showToast(editing ? "แก้ไขรายการเรียบร้อยแล้ว" : "เพิ่มรายการเรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    await Promise.allSettled(uploadedPaths.map(path => deleteObject(ref(storage, path))));
    const permissionError = error?.code === "permission-denied" || error?.code === "storage/unauthorized";
    status.textContent = permissionError ? "กรุณา Publish firestore.rules และ storage.rules รุ่นล่าสุดใน Firebase แล้วลองใหม่" : (error.message || "บันทึกรายการไม่สำเร็จ");
    status.hidden = false;
    showToast(status.textContent, "error");
  } finally {
    save.disabled = false;
    save.textContent = "บันทึก";
  }
}

async function deleteContentItem(item) {
  if (!isAdmin() || !window.confirm(`ลบ “${item.title}” ใช่หรือไม่?`)) return;
  try {
    await deleteDoc(doc(contentCollection, item.id));
    if (item.storagePath) await deleteObject(ref(storage, item.storagePath)).catch(() => {});
    showToast("ลบรายการเรียบร้อยแล้ว");
  } catch (error) {
    console.error(error);
    showToast("ลบรายการไม่สำเร็จ", "error");
  }
}

function escapeHtml(text) {
  if (!text) return "";
  return String(text)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function formatThaiDateTimeBE(dateInput) {
  if (!dateInput) return "";
  const d = dateInput?.toDate ? dateInput.toDate() : new Date(dateInput);
  if (Number.isNaN(d.getTime())) return "";
  const monthsThai = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน",
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];
  const day = d.getDate();
  const month = monthsThai[d.getMonth()];
  const yearBE = d.getFullYear() + 543;
  const hours = String(d.getHours()).padStart(2, "0");
  const minutes = String(d.getMinutes()).padStart(2, "0");
  return `${day} ${month} ${yearBE} เวลา ${hours}:${minutes} น.`;
}

function confirmRailAction(title, message, action) {
  const root = $("#confirmDialog");
  if (!root) {
    if (window.confirm(`${title}\n${message}`)) action();
    return;
  }
  $("#confirmTitle").textContent = title;
  $("#confirmMessage").textContent = message;
  if (root.open) root.close();
  root.showModal();
  const close = () => { if (root.open) root.close(); };
  $("#confirmCancel").onclick = close;
  $("#confirmOk").onclick = async () => {
    $("#confirmOk").disabled = true;
    try {
      await action();
    } finally {
      $("#confirmOk").disabled = false;
      close();
    }
  };
}

function getLocalizedField(card, field, lang) {
  if (lang === "lo") {
    const loVal = card[`${field}_lo`];
    if (loVal && String(loVal).trim()) return loVal;
  } else if (lang === "en") {
    const enVal = card[`${field}_en`];
    if (enVal && String(enVal).trim()) return enVal;
  }
  return card[field] || "";
}

function getSortedRailCards() {
  const firestoreCards = portal.railCards || [];
  const existingIds = new Set(firestoreCards.map(c => c.id));
  const activeDefaultCards = DEFAULT_RAIL_CARDS.filter(def => !existingIds.has(def.id));
  const allCards = [...firestoreCards, ...activeDefaultCards];
  return allCards.sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));
}

const SOCIAL_ICONS = {
  facebook: {
    name: "เฟซบุ๊ก",
    className: "badge-facebook",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>`
  },
  line: {
    name: "ไลน์",
    className: "badge-line",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M19.365 9.863c.349 0 .63.285.63.631 0 .345-.281.63-.63.63H17.61v1.125h1.755c.349 0 .63.283.63.63 0 .344-.281.629-.63.629h-2.386c-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.63-.63h2.386c.346 0 .627.285.627.63 0 .349-.281.63-.63.63H17.61v1.125h1.755zm-3.855 3.016c0 .27-.174.51-.432.596-.064.021-.133.031-.199.031-.211 0-.391-.09-.51-.25l-2.443-3.317v2.94c0 .344-.279.629-.631.629-.346 0-.626-.285-.626-.629V8.108c0-.27.173-.51.43-.595.06-.023.136-.033.194-.033.195 0 .375.104.495.254l2.462 3.33V8.108c0-.345.282-.63.63-.63.345 0 .63.285.63.63v4.771zm-5.741 0c0 .344-.282.629-.631.629-.345 0-.627-.285-.627-.629V8.108c0-.345.282-.63.627-.63.349 0 .631.285.631.63v4.771zm-2.466.629H4.917c-.345 0-.63-.285-.63-.629V8.108c0-.345.285-.63.63-.63.348 0 .63.285.63.63v4.141h1.756c.348 0 .629.283.629.63 0 .344-.282.629-.629.629M24 10.314C24 4.943 18.615.572 12 .572S0 4.943 0 10.314c0 4.811 4.27 8.842 10.035 9.608.391.082.923.258 1.058.59.12.301.079.766.038 1.08l-.164 1.02c-.045.301-.24 1.186 1.049.645 1.291-.539 6.916-4.078 9.436-6.975C23.176 14.393 24 12.458 24 10.314"/></svg>`
  },
  tiktok: {
    name: "ติ๊กต็อก",
    className: "badge-tiktok",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12.525.02c1.31-.02 2.61-.01 3.91-.02.08 1.53.63 3.09 1.75 4.17 1.12 1.11 2.7 1.62 4.24 1.79v4.03c-1.44-.05-2.89-.35-4.2-.97-.57-.26-1.1-.59-1.62-.93-.01 2.92.01 5.84-.02 8.75-.08 1.4-.54 2.79-1.35 3.94-1.31 1.92-3.58 3.17-5.91 3.21-1.43.08-2.86-.31-4.08-1.03-2.02-1.19-3.44-3.37-3.65-5.71-.02-.5-.03-1-.01-1.49.18-1.9 1.12-3.72 2.58-4.96 1.66-1.44 3.98-2.13 6.15-1.72.02 1.48-.04 2.96-.04 4.44-.99-.32-2.15-.23-3.02.37-.63.41-1.11 1.04-1.36 1.75-.21.51-.24 1.07-.14 1.61.24 1.64 1.82 3.02 3.5 2.87 1.12-.01 2.19-.66 2.77-1.61.19-.33.4-.67.41-1.06.1-1.79.06-3.57.07-5.36.01-4.03-.01-8.05.02-12.07z"/></svg>`
  },
  instagram: {
    name: "อินสตาแกรม",
    className: "badge-instagram",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/></svg>`
  },
  youtube: {
    name: "ยูทูบ",
    className: "badge-youtube",
    svg: `<svg viewBox="0 0 24 24" width="22" height="22" fill="currentColor"><path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/></svg>`
  }
};

const TH_TO_LO_CHAR_MAP = {
  "ก": "ກ", "ข": "ຂ", "ฃ": "ຂ", "ค": "ຄ", "ฅ": "ຄ", "ฆ": "ຄ",
  "ง": "ງ", "จ": "ຈ", "ฉ": "ຊ", "ช": "ຊ", "ซ": "ຊ", "ฌ": "ຊ",
  "ญ": "ຍ", "ฎ": "ດ", "ฏ": "ຕ", "ฐ": "ຖ", "ฑ": "ທ", "ฒ": "ທ",
  "ณ": "ນ", "ด": "ດ", "ต": "ຕ", "ถ": "ຖ", "ท": "ທ", "ธ": "ທ",
  "น": "ນ", "บ": "ບ", "ป": "ປ", "ผ": "ຜ", "ฝ": "ຝ", "พ": "ພ",
  "ฟ": "ຟ", "ภ": "ພ", "ม": "ມ", "ย": "ຍ", "ร": "ລ", "ฤ": "ຣຶ",
  "ล": "ລ", "ว": "ວ", "ศ": "ສ", "ษ": "ສ", "ส": "ສ", "ห": "ຫ",
  "ฬ": "ລ", "อ": "ອ", "ฮ": "ຮ",
  "ะ": "ະ", "ั": "ັ", "า": "າ", "ำ": "ຳ", "ิ": "ິ", "ี": "ີ",
  "ึ": "ຶ", "ื": "ື", "ุ": "ຸ", "ู": "ູ", "เ": "ເ", "แ": "ແ",
  "โ": "ໂ", "ใ": "ໃ", "ไ": "ໄ", "่": "່", "้": "້", "๊": "໊",
  "๋": "໋", "็": "ັ", "์": "໌", "ๆ": "ໆ", "ฯ": "ຯ",
  "๐": "໐", "๑": "໑", "๒": "໒", "๓": "໓", "๔": "໔",
  "๕": "໕", "๖": "໖", "๗": "໗", "๘": "໘", "๙": "໙"
};

const TH_TO_LO_DICTIONARY = [
  ["พระธาตุพนม สู่มรดกโลก", "ພຣະທາດພະນົມ ສູ່ມໍຣະດົກໂລກ"],
  ["พระธาตุพนม", "ພຣະທາດພະນົມ"],
  ["สู่มรดกโลก", "ສູ່ມໍຣະດົກໂລກ"],
  ["มรดกโลก", "ມໍຣະດົກໂລກ"],
  ["สระมุจลินท์", "ສະມຸຈລິນ"],
  ["โครงการบูรณะ", "ໂຄງການບູຣະນະ"],
  ["โครงการปัจจุบัน", "ໂຄງການປັດຈຸບັນ"],
  ["โครงการ", "ໂຄງການ"],
  ["ดูโครงการทั้งหมด", "ເບິ່ງໂຄງການທັງໝົດ"],
  ["เข้าถึงอย่างรวดเร็ว", "ເຂົ້າເຖິງຢ່າງວ່ອງໄວ"],
  ["ข่าวและกิจกรรม", "ຂ່າວສານ ແລະ ກິດຈະກຳ"],
  ["ข่าวสาร", "ຂ່າວສານ"],
  ["ข่าวด่วน", "ຂ່າວດ່ວນ"],
  ["ประชาสัมพันธ์", "ປະຊາສຳພັນ"],
  ["กำหนดการและกิจกรรม", "ກຳນົດການ ແລະ ກິດຈະກຳ"],
  ["กำหนดการ", "ກຳນົດການ"],
  ["พิธีสำคัญ", "ພິທີສຳຄັນ"],
  ["ถ่ายทอดสด", "ຖ່າຍທອດສົດ"],
  ["เอกสารสำคัญ", "ເອກະສານສຳຄັນ"],
  ["เอกสารเผยแพร่", "ເອກະສານເຜີຍແຜ່"],
  ["คลังสื่อทั้งหมด", "ຄັງສື່ທັງໝົດ"],
  ["คลังสื่อ", "ຄັງສື່"],
  ["ร่วมบุญ", "ຮ່ວມບຸນ"],
  ["ร่วมสืบสานมรดกแห่งศรัทธา", "ຮ່ວມສືບສານມໍຣະດົກແຫ່ງສັດທາ"],
  ["ดูรายละเอียด", "ເບິ່ງລາຍລະອຽດ"],
  ["ดูทั้งหมด", "ເບິ່ງທັງໝົດ"],
  ["ทางลัด", "ທາງລັດ"],
  ["ข้อมูลโครงการ", "ຂໍ້ມູນໂຄງການ"],
  ["ติดตามเรา", "ຕິດຕາມພວກເຮົາ"],
  ["ติดตามบน Facebook", "ຕິດຕາມໃນ Facebook"],
  ["ติดตามบน TikTok", "ຕິດຕາມໃນ TikTok"],
  ["ติดตามบน Instagram", "ຕິດຕາມໃນ Instagram"],
  ["รับชมบน YouTube", "ຮັບຊົມໃນ YouTube"],
  ["เพิ่มเพื่อน LINE", "ເພີ່ມເພື່ອນ LINE"],
  ["ติดตาม", "ຕິດຕາມ"],
  ["ติดต่อเรา", "ຕິດຕໍ່ພວກເຮົາ"],
  ["ติดต่อ", "ຕິດຕໍ່"],
  ["ชมวิดีโอ", "ຊົມວິດີໂອ"],
  ["อ่านต่อ", "ອ່ານຕໍ່"],
  ["อ่านข่าวทั้งหมด", "ອ່ານຂ່າວທັງໝົດ"],
  ["ดูกำหนดการ", "ເບິ່ງກຳນົດການ"],
  ["ดาวน์โหลดเอกสาร", "ດາວໂຫຼດເອກະສານ"],
  ["ดูช่องทางร่วมบุญ", "ເບິ່ງຊ່ອງທາງຮ່ວມບຸນ"],
  ["เพิ่มเพื่อน", "ເພີ່ມເພື່ອນ"],
  ["เฟซบุ๊กทางการ", "ເຟສບຸກທາງການ"],
  ["เฟซบุ๊ก", "ເຟສບຸກ"],
  ["ไลน์", "ໄລນ໌"],
  ["ติ๊กต็อก", "ຕິກຕັອກ"],
  ["อินสตาแกรม", "ອິນສະຕາແກຣມ"],
  ["ยูทูบทางการ", "ຢູທູບທາງການ"],
  ["ยูทูบ", "ຢູທູບ"]
];

const TH_TO_EN_DICTIONARY = [
  ["พระธาตุพนม สู่มรดกโลก", "Phra That Phanom to World Heritage"],
  ["พระธาตุพนม", "Phra That Phanom"],
  ["สู่มรดกโลก", "to World Heritage"],
  ["มรดกโลก", "World Heritage"],
  ["สระมุจลินท์", "Muchalinda Pond"],
  ["โครงการบูรณะสระมุจลินท์", "Muchalinda Pond Restoration Project"],
  ["โครงการปัจจุบัน", "Current Project"],
  ["ดูโครงการทั้งหมด", "View All Projects"],
  ["เข้าถึงอย่างรวดเร็ว", "Quick Access"],
  ["ข่าวและกิจกรรม", "News & Events"],
  ["ข่าวด่วน", "Breaking News"],
  ["ประชาสัมพันธ์", "Announcement"],
  ["กำหนดการและกิจกรรม", "Schedule & Events"],
  ["กำหนดการ", "Schedule"],
  ["พิธีสำคัญ", "Sacred Ceremony"],
  ["ถ่ายทอดสด", "Live Broadcast"],
  ["เอกสารสำคัญ", "Important Documents"],
  ["เอกสารเผยแพร่", "Publications"],
  ["คลังสื่อทั้งหมด", "Media Library"],
  ["คลังสื่อ", "Media Library"],
  ["ร่วมบุญ", "Make Merit"],
  ["ร่วมสืบสานมรดกแห่งศรัทธา", "Support Heritage of Faith"],
  ["ดูรายละเอียด", "View Details"],
  ["ดูทั้งหมด", "View All"],
  ["ทางลัดคลังข้อมูลและกิจกรรม", "Direct Shortcuts & Archives"],
  ["ทางลัดเข้าถึง", "Quick Access"],
  ["ข้อมูลโครงการ", "Project Information"],
  ["ติดตามเรา", "Follow Us"],
  ["ติดตามบน Facebook", "Follow on Facebook"],
  ["ติดตามบน TikTok", "Follow on TikTok"],
  ["ติดตามบน Instagram", "Follow on Instagram"],
  ["รับชมบน YouTube", "Watch on YouTube"],
  ["เพิ่มเพื่อน LINE", "Add LINE Official"],
  ["ติดตาม", "Follow"],
  ["ติดต่อเรา", "Contact Us"],
  ["ติดต่อ", "Contact"],
  ["อ่านข่าวทั้งหมด", "Read All News"],
  ["ดูกำหนดการ", "View Schedule"],
  ["รับชมถ่ายทอดสด", "Watch Live"],
  ["ดาวน์โหลดเอกสาร", "Download Docs"],
  ["ดูช่องทางร่วมบุญ", "View Donation Channels"],
  ["เพิ่มเพื่อน", "Add Friend"],
  ["เฟซบุ๊กทางการ", "Official Facebook"],
  ["ยูทูบทางการ", "Official YouTube"]
];

function convertThaiToLaoTranslit(text) {
  if (!text) return "";
  let s = String(text);
  for (const [th, lo] of TH_TO_LO_DICTIONARY) {
    s = s.replaceAll(th, lo);
  }
  let res = "";
  for (const ch of s) {
    res += TH_TO_LO_CHAR_MAP[ch] || ch;
  }
  return res;
}

async function translateThaiToLao(text) {
  if (!text || !text.trim()) return "";
  const trimmed = text.trim();
  const found = TH_TO_LO_DICTIONARY.find(([th]) => th === trimmed);
  if (found) return found[1];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2600);
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=th|lo`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (translated && /[\u0E80-\u0EFF]/.test(translated) && !translated.toLowerCase().includes("mymemory")) {
        return translated;
      }
    }
  } catch (_) {}

  return convertThaiToLaoTranslit(trimmed);
}

async function translateThaiToEnglish(text) {
  if (!text || !text.trim()) return "";
  const trimmed = text.trim();
  const found = TH_TO_EN_DICTIONARY.find(([th]) => th === trimmed);
  if (found) return found[1];

  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2800);
    const res = await fetch(`https://api.mymemory.translated.net/get?q=${encodeURIComponent(trimmed)}&langpair=th|en`, {
      signal: controller.signal
    });
    clearTimeout(timeout);
    if (res.ok) {
      const data = await res.json();
      const translated = data?.responseData?.translatedText;
      if (translated && !translated.toLowerCase().includes("mymemory") && translated !== trimmed) {
        return translated;
      }
    }
  } catch (_) {}

  let fallback = trimmed;
  for (const [th, en] of TH_TO_EN_DICTIONARY) {
    fallback = fallback.replaceAll(th, en);
  }
  return fallback;
}

let autoTranslateTimer = null;
let isTranslatingRail = false;

async function autoTranslateRailFields(force = false) {
  if (isTranslatingRail) return;

  const kickerTh = $("#railCardKickerTh")?.value.trim() || "";
  const titleTh = $("#railCardTitleTh")?.value.trim() || "";
  const descTh = $("#railCardDescTh")?.value.trim() || "";
  const btnTh = $("#railCardBtnTh")?.value.trim() || "";

  if (!titleTh && !descTh && !kickerTh && !btnTh) return;

  const statusWrap = $("#railTranslateStatus");
  const statusText = $("#railTranslateStatusText");
  const translateBtn = $("#railAutoTranslateBtn");

  if (statusWrap && statusText) {
    statusWrap.hidden = false;
    statusText.textContent = "⚡ กำลังแปลภาษาลาวและอังกฤษอัตโนมัติ...";
  }
  if (translateBtn) translateBtn.disabled = true;
  isTranslatingRail = true;

  try {
    const [
      kickerLo, kickerEn,
      titleLo, titleEn,
      descLo, descEn,
      btnLo, btnEn
    ] = await Promise.all([
      kickerTh ? translateThaiToLao(kickerTh) : Promise.resolve(""),
      kickerTh ? translateThaiToEnglish(kickerTh) : Promise.resolve(""),
      titleTh ? translateThaiToLao(titleTh) : Promise.resolve(""),
      titleTh ? translateThaiToEnglish(titleTh) : Promise.resolve(""),
      descTh ? translateThaiToLao(descTh) : Promise.resolve(""),
      descTh ? translateThaiToEnglish(descTh) : Promise.resolve(""),
      btnTh ? translateThaiToLao(btnTh) : Promise.resolve(""),
      btnTh ? translateThaiToEnglish(btnTh) : Promise.resolve("")
    ]);

    const kickerLoEl = $("#railCardKickerLo");
    const titleLoEl = $("#railCardTitleLo");
    const descLoEl = $("#railCardDescLo");
    const btnLoEl = $("#railCardBtnLo");

    const kickerEnEl = $("#railCardKickerEn");
    const titleEnEl = $("#railCardTitleEn");
    const descEnEl = $("#railCardDescEn");
    const btnEnEl = $("#railCardBtnEn");

    if (kickerLoEl && (force || !kickerLoEl.dataset.customized)) kickerLoEl.value = kickerLo;
    if (titleLoEl && (force || !titleLoEl.dataset.customized)) titleLoEl.value = titleLo;
    if (descLoEl && (force || !descLoEl.dataset.customized)) descLoEl.value = descLo;
    if (btnLoEl && (force || !btnLoEl.dataset.customized)) btnLoEl.value = btnLo;

    if (kickerEnEl && (force || !kickerEnEl.dataset.customized)) kickerEnEl.value = kickerEn;
    if (titleEnEl && (force || !titleEnEl.dataset.customized)) titleEnEl.value = titleEn;
    if (descEnEl && (force || !descEnEl.dataset.customized)) descEnEl.value = descEn;
    if (btnEnEl && (force || !btnEnEl.dataset.customized)) btnEnEl.value = btnEn;

    if (statusText) {
      statusText.textContent = "✓ แปลภาษาลาวและอังกฤษอัตโนมัติสำเร็จ";
      setTimeout(() => {
        if (statusWrap) statusWrap.hidden = true;
      }, 3500);
    }
  } catch (err) {
    console.error("Auto-translate rail fields error:", err);
    if (statusText) {
      statusText.textContent = "ระบบแปลภาษาอัตโนมัติพร้อมใช้งาน";
      setTimeout(() => {
        if (statusWrap) statusWrap.hidden = true;
      }, 3000);
    }
  } finally {
    isTranslatingRail = false;
    if (translateBtn) translateBtn.disabled = false;
  }
}

function queueAutoTranslate() {
  if (autoTranslateTimer) clearTimeout(autoTranslateTimer);
  autoTranslateTimer = setTimeout(() => {
    autoTranslateRailFields(false);
  }, 750);
}

function renderRightRail() {
  const container = $("#railCardsContainer");
  if (!container) return;

  const currentLang = document.documentElement.lang || "th";
  const isMuchalinda = location.hash === "#muchalinda-project" || location.hash.startsWith("#muchalinda-");
  const activeProjectSlug = isMuchalinda ? "muchalinda-restoration" : "world-heritage";

  const allCards = getSortedRailCards();

  const trashedCards = allCards.filter(c => Boolean(c.deletedAt));
  const trashCountEl = $("#railTrashCount");
  if (trashCountEl) trashCountEl.textContent = String(trashedCards.length);

  const toolbar = $("#railAdminToolbar");
  if (toolbar) toolbar.hidden = !isAdmin();

  const now = new Date();
  const visibleCards = allCards
    .filter(card => !card.deletedAt)
    .filter(card => {
      if (isAdmin()) return true;
      if (card.published === false) return false;
      if (card.projectScope && card.projectScope !== "all" && card.projectScope !== activeProjectSlug) return false;
      if (card.scheduled) {
        if (card.startDate && new Date(card.startDate) > now) return false;
        if (card.endDate && new Date(card.endDate) < now) return false;
      }
      return true;
    })
    .sort((a, b) => (Number(a.order) || 0) - (Number(b.order) || 0));

  container.innerHTML = "";

  if (visibleCards.length === 0) {
    if (isAdmin()) {
      container.innerHTML = `<p class="resource-empty" style="padding:20px;text-align:center;background:#fff;border-radius:8px">ยังไม่มีหัวข้อที่แสดงผล กด “เพิ่มหัวข้อใหม่” ด้านล่างเพื่อเริ่มสร้าง</p>`;
    }
    return;
  }

  visibleCards.forEach(card => {
    const cardEl = document.createElement("section");
    const themeClass = card.theme && card.theme !== "standard" ? `theme-${card.theme}` : "";
    const typeClass = card.type === "project" ? "project-card" : card.type === "donate" || card.type === "donation" ? "donate-card" : card.type === "quick" ? "quick-card" : "";
    cardEl.className = `rail-card ${typeClass} ${themeClass}`.trim();
    cardEl.dataset.railId = card.id;

    if (isAdmin()) {
      cardEl.classList.add("is-admin-draggable");
      cardEl.setAttribute("draggable", "true");

      cardEl.addEventListener("dragstart", e => {
        e.dataTransfer.setData("text/plain", card.id);
        cardEl.classList.add("is-dragging");
      });
      cardEl.addEventListener("dragend", () => {
        cardEl.classList.remove("is-dragging");
        $$(".rail-card").forEach(el => el.classList.remove("drag-over"));
      });
      cardEl.addEventListener("dragover", e => {
        e.preventDefault();
        cardEl.classList.add("drag-over");
      });
      cardEl.addEventListener("dragleave", () => {
        cardEl.classList.remove("drag-over");
      });
      cardEl.addEventListener("drop", e => {
        e.preventDefault();
        cardEl.classList.remove("drag-over");
        const draggedId = e.dataTransfer.getData("text/plain");
        if (draggedId && draggedId !== card.id) {
          reorderRailCards(draggedId, card.id);
        }
      });

      const gearBtn = document.createElement("button");
      gearBtn.type = "button";
      gearBtn.className = "rail-card-gear";
      gearBtn.title = "จัดการหัวข้อนี้";
      gearBtn.setAttribute("aria-label", "จัดการหัวข้อนี้");
      gearBtn.textContent = "⚙";
      gearBtn.addEventListener("click", e => {
        e.preventDefault();
        e.stopPropagation();
        openRailCardEditor(card.id);
      });
      cardEl.appendChild(gearBtn);

      if (card.published === false) {
        const badge = document.createElement("span");
        badge.className = "rail-card-status-badge status-draft";
        badge.textContent = "ฉบับร่าง (ไม่แสดงต่อผู้ชม)";
        cardEl.appendChild(badge);
      } else if (card.scheduled) {
        const badge = document.createElement("span");
        const isUpcoming = card.startDate && new Date(card.startDate) > now;
        const isExpired = card.endDate && new Date(card.endDate) < now;
        if (isUpcoming) {
          badge.className = "rail-card-status-badge status-scheduled";
          badge.textContent = `รอเริ่ม: ${formatThaiDateTimeBE(card.startDate)}`;
        } else if (isExpired) {
          badge.className = "rail-card-status-badge status-expired";
          badge.textContent = `หมดเวลา: ${formatThaiDateTimeBE(card.endDate)}`;
        } else {
          badge.className = "rail-card-status-badge status-scheduled";
          badge.textContent = "กำลังแสดงผลตามกำหนดเวลา";
        }
        cardEl.appendChild(badge);
      }
    }

    const kicker = getLocalizedField(card, "kicker", currentLang);
    const title = getLocalizedField(card, "title", currentLang);
    const desc = getLocalizedField(card, "description", currentLang);
    const btnText = getLocalizedField(card, "buttonText", currentLang) || "ดูรายละเอียด";

    const isDonationCard = card.type === "donation" || card.type === "donate" || card.template === "donation";

    if (isDonationCard) {
      const headEl = document.createElement("div");
      headEl.className = "donate-card-head";

      const iconEl = document.createElement("span");
      iconEl.className = "heart-icon";
      iconEl.textContent = card.icon || "♥";
      iconEl.setAttribute("aria-hidden", "true");
      headEl.appendChild(iconEl);

      const headText = document.createElement("div");
      headText.className = "donate-card-head-text";
      if (kicker) {
        const kickerEl = document.createElement("p");
        kickerEl.className = "rail-label";
        kickerEl.textContent = kicker;
        headText.appendChild(kickerEl);
      }
      const titleEl = document.createElement("h2");
      titleEl.textContent = title;
      headText.appendChild(titleEl);

      headEl.appendChild(headText);
      cardEl.appendChild(headEl);

      if (card.imageUrl) {
        const imgEl = document.createElement("img");
        imgEl.className = "rail-card-image";
        imgEl.src = safeUrl(card.imageUrl);
        imgEl.alt = title;
        imgEl.loading = "lazy";
        cardEl.appendChild(imgEl);
      }

      if (desc) {
        const descEl = document.createElement("p");
        descEl.className = "donate-card-desc";
        descEl.textContent = desc;
        cardEl.appendChild(descEl);
      }

      if (card.buttonUrl) {
        const btnEl = document.createElement("a");
        btnEl.className = "rail-button light";
        btnEl.href = card.buttonUrl;
        btnEl.textContent = btnText;
        if (card.openExternal) {
          btnEl.target = "_blank";
          btnEl.rel = "noopener";
        }
        cardEl.appendChild(btnEl);
      }
    } else {
      if (kicker) {
        const kickerEl = document.createElement("p");
        kickerEl.className = "rail-label";
        kickerEl.textContent = kicker;
        cardEl.appendChild(kickerEl);
      }

      if (card.icon && !card.imageUrl) {
        const iconEl = document.createElement("span");
        const iconKey = String(card.icon).toLowerCase().trim();
        const social = SOCIAL_ICONS[iconKey];
        if (social) {
          iconEl.className = `rail-card-icon-badge ${social.className}`;
          iconEl.innerHTML = social.svg;
        } else {
          iconEl.className = "rail-card-icon-badge";
          iconEl.textContent = card.icon;
        }
        iconEl.setAttribute("aria-hidden", "true");
        cardEl.appendChild(iconEl);
      }

      const titleEl = document.createElement("h2");
      titleEl.textContent = title;
      cardEl.appendChild(titleEl);

      if (card.imageUrl) {
        const imgEl = document.createElement("img");
        imgEl.className = "rail-card-image";
        imgEl.src = safeUrl(card.imageUrl);
        imgEl.alt = title;
        imgEl.loading = "lazy";
        cardEl.appendChild(imgEl);
      }

      if (desc) {
        const descEl = document.createElement("p");
        descEl.textContent = desc;
        cardEl.appendChild(descEl);
      }

      if (card.buttonUrl) {
        const btnEl = document.createElement("a");
        btnEl.className = `rail-button ${card.theme === "maroon" ? "light" : ""}`.trim();
        btnEl.href = card.buttonUrl;
        btnEl.textContent = btnText;
        if (card.openExternal) {
          btnEl.target = "_blank";
          btnEl.rel = "noopener";
        }
        cardEl.appendChild(btnEl);
      }
    }

    container.appendChild(cardEl);
  });
}

function openRailCardEditor(cardId) {
  portal.editingRailCard = cardId;
  const dialog = $("#railCardDialog");
  if (!dialog) return;

  const titleHeader = $("#railCardDialogTitle");
  const isNew = cardId === "new";
  if (titleHeader) titleHeader.textContent = isNew ? "เพิ่มหัวข้อใหม่" : "จัดการหัวข้อนี้";

  $$(".rail-lang-tab").forEach(tab => tab.classList.toggle("active", tab.dataset.railTab === "th"));
  $("#railPaneTh").hidden = false;
  $("#railPaneTh").classList.add("active");
  $("#railPaneLo").hidden = true;
  $("#railPaneLo").classList.remove("active");
  $("#railPaneEn").hidden = true;
  $("#railPaneEn").classList.remove("active");

  const cards = getSortedRailCards();
  const card = isNew ? null : (cards.find(c => c.id === cardId) || DEFAULT_RAIL_CARDS.find(c => c.id === cardId) || null);

  $("#railCardId").value = isNew ? "new" : (card?.id || cardId);
  $("#railCardOrder").value = isNew ? (cards.length + 1) * 10 : (card?.order || 10);
  $("#railCardOrderDisplay").textContent = `ลำดับที่ ${isNew ? cards.length + 1 : Math.max(1, cards.findIndex(c => c.id === cardId) + 1)}`;

  $("#railCardTemplateSelect").value = card?.template || card?.type || "custom";
  $("#railCardVisualTheme").value = card?.theme || "standard";

  $("#railCardKickerTh").value = card?.kicker || "";
  $("#railCardKickerLo").value = card?.kicker_lo || "";
  $("#railCardKickerEn").value = card?.kicker_en || "";

  $("#railCardTitleTh").value = card?.title || "";
  $("#railCardTitleLo").value = card?.title_lo || "";
  $("#railCardTitleEn").value = card?.title_en || "";

  $("#railCardDescTh").value = card?.description || "";
  $("#railCardDescLo").value = card?.description_lo || "";
  $("#railCardDescEn").value = card?.description_en || "";

  $("#railCardBtnTh").value = card?.buttonText || "";
  $("#railCardBtnLo").value = card?.buttonText_lo || "";
  $("#railCardBtnEn").value = card?.buttonText_en || "";

  ["KickerLo", "KickerEn", "TitleLo", "TitleEn", "DescLo", "DescEn", "BtnLo", "BtnEn"].forEach(key => {
    const el = $(`#railCard${key}`);
    if (el) {
      if (isNew || !el.value) {
        delete el.dataset.customized;
      } else {
        el.dataset.customized = "true";
      }
    }
  });

  const translateStatus = $("#railTranslateStatus");
  if (translateStatus) translateStatus.hidden = true;

  $("#railCardIcon").value = card?.icon || "✦";
  $("#railCardImageUrl").value = card?.imageUrl || "";
  $("#railCardButtonUrl").value = card?.buttonUrl || "";
  $("#railCardOpenExternal").value = card?.openExternal ? "true" : "false";
  $("#railCardProjectScope").value = card?.projectScope || "all";
  $("#railCardPublished").checked = card ? (card.published !== false) : true;

  const isScheduled = Boolean(card?.scheduled);
  $("#railCardScheduled").checked = isScheduled;
  $("#railScheduleFields").hidden = !isScheduled;
  $("#railCardStartDate").value = card?.startDate || "";
  $("#railCardEndDate").value = card?.endDate || "";

  $("#railCardDeleteBtn").hidden = isNew;
  $("#railEditorStatus").hidden = true;

  if (dialog.open) dialog.close();
  dialog.showModal();
}

function applyTemplatePreset(presetKey) {
  const preset = RAIL_TEMPLATES[presetKey];
  if (!preset) return;
  $("#railCardVisualTheme").value = preset.theme;
  $("#railCardKickerTh").value = preset.kicker;
  $("#railCardKickerLo").value = preset.kicker_lo;
  $("#railCardKickerEn").value = preset.kicker_en;
  $("#railCardTitleTh").value = preset.title;
  $("#railCardTitleLo").value = preset.title_lo;
  $("#railCardTitleEn").value = preset.title_en;
  $("#railCardDescTh").value = preset.description;
  $("#railCardDescLo").value = preset.description_lo;
  $("#railCardDescEn").value = preset.description_en;
  $("#railCardIcon").value = preset.icon;
  $("#railCardBtnTh").value = preset.buttonText;
  $("#railCardBtnLo").value = preset.buttonText_lo;
  $("#railCardBtnEn").value = preset.buttonText_en;
  $("#railCardButtonUrl").value = preset.buttonUrl;
}

async function saveRailCard(event) {
  event.preventDefault();
  if (!isAdmin()) return;

  const statusEl = $("#railEditorStatus");
  const saveBtn = $("#saveRailCardButton");

  if (!portal.user) {
    statusEl.textContent = "กรุณาเข้าสู่ระบบด้วยบัญชีผู้ดูแลก่อนบันทึกข้อมูล";
    statusEl.hidden = false;
    return;
  }

  const cardId = $("#railCardId").value;
  const titleTh = $("#railCardTitleTh").value.trim();
  const descTh = $("#railCardDescTh").value.trim();
  const kickerTh = $("#railCardKickerTh").value.trim();
  const btnTh = $("#railCardBtnTh").value.trim();

  if (!titleTh || !descTh) {
    statusEl.textContent = "กรุณากรอกชื่อหัวข้อและรายละเอียดภาษาไทยให้ครบถ้วน";
    statusEl.hidden = false;
    return;
  }

  saveBtn.disabled = true;
  statusEl.textContent = "กำลังตรวจสอบและบันทึกข้อมูล...";
  statusEl.hidden = false;

  try {
    let titleLo = $("#railCardTitleLo").value.trim();
    let titleEn = $("#railCardTitleEn").value.trim();
    let kickerLo = $("#railCardKickerLo").value.trim();
    let kickerEn = $("#railCardKickerEn").value.trim();
    let descLo = $("#railCardDescLo").value.trim();
    let descEn = $("#railCardDescEn").value.trim();
    let btnLo = $("#railCardBtnLo").value.trim();
    let btnEn = $("#railCardBtnEn").value.trim();

    // Multilingual: Use Thai as master and auto-translate Lao & English if empty (with fallback)
    try {
      if (!titleLo && titleTh) titleLo = await translateThaiToLao(titleTh);
      if (!titleEn && titleTh) titleEn = await translateThaiToEnglish(titleTh);
      if (!descLo && descTh) descLo = await translateThaiToLao(descTh);
      if (!descEn && descTh) descEn = await translateThaiToEnglish(descTh);
      if (!kickerLo && kickerTh) kickerLo = await translateThaiToLao(kickerTh);
      if (!kickerEn && kickerTh) kickerEn = await translateThaiToEnglish(kickerTh);
      if (!btnLo && btnTh) btnLo = await translateThaiToLao(btnTh);
      if (!btnEn && btnTh) btnEn = await translateThaiToEnglish(btnTh);
    } catch (transErr) {
      console.warn("Auto translation skipped:", transErr);
    }

    const templateVal = $("#railCardTemplateSelect")?.value || "custom";
    const payload = {
      type: templateVal,
      template: templateVal,
      title: titleTh,
      title_lo: titleLo || "",
      title_en: titleEn || "",
      kicker: kickerTh || "",
      kicker_lo: kickerLo || "",
      kicker_en: kickerEn || "",
      description: descTh,
      description_lo: descLo || "",
      description_en: descEn || "",
      buttonText: btnTh || "ดูรายละเอียด",
      buttonText_lo: btnLo || "",
      buttonText_en: btnEn || "",
      buttonUrl: $("#railCardButtonUrl")?.value?.trim() || "#",
      openExternal: $("#railCardOpenExternal")?.value === "true",
      icon: $("#railCardIcon")?.value?.trim() || "✦",
      imageUrl: safeUrl($("#railCardImageUrl")?.value?.trim() || ""),
      theme: $("#railCardVisualTheme")?.value || "standard",
      projectScope: $("#railCardProjectScope")?.value || "all",
      published: Boolean($("#railCardPublished")?.checked),
      scheduled: Boolean($("#railCardScheduled")?.checked),
      startDate: $("#railCardStartDate")?.value || "",
      endDate: $("#railCardEndDate")?.value || "",
      order: Number($("#railCardOrder")?.value) || 10,
      updatedAt: serverTimestamp(),
      deletedAt: null
    };

    if (cardId === "new") {
      payload.createdAt = serverTimestamp();
      payload.createdBy = portal.user?.uid || "admin";
      await addDoc(railCardsCollection, payload);
      showToast("เพิ่มหัวข้อใหม่เรียบร้อยแล้ว");
    } else {
      await setDoc(doc(railCardsCollection, cardId), payload, { merge: true });
      showToast("บันทึกข้อมูลหัวข้อเรียบร้อยแล้ว");
    }

    $("#railCardDialog").close();
  } catch (error) {
    console.error("Save rail card error:", error);
    const isPermission = error?.code === "permission-denied";
    statusEl.textContent = isPermission
      ? "ไม่มีสิทธิ์บันทึกข้อมูล (Permission Denied) กรุณาตรวจสอบสถานะผู้ดูแลระบบ"
      : (error?.message || "เกิดข้อผิดพลาดในการบันทึก กรุณาลองใหม่อีกครั้ง");
    statusEl.hidden = false;
  } finally {
    saveBtn.disabled = false;
  }
}

function trashRailCard() {
  if (!isAdmin()) return;
  const cardId = $("#railCardId").value;
  if (!cardId || cardId === "new") return;

  confirmRailAction(
    "ยืนยันการย้ายไปถังพัก",
    "ต้องการย้ายหัวข้อนี้ไปยังถังพักหรือไม่? (รายการจะไม่แสดงบนหน้าเว็บ แต่ท่านสามารถกู้คืนได้ทุกเมื่อ)",
    async () => {
      try {
        await setDoc(doc(railCardsCollection, cardId), {
          deletedAt: serverTimestamp(),
          published: false
        }, { merge: true });
        $("#railCardDialog").close();
        showToast("ย้ายหัวข้อไปยังถังพักเรียบร้อยแล้ว");
      } catch (error) {
        console.error("Trash rail card error:", error);
        showToast("ไม่สามารถย้ายไปยังถังพักได้", "error");
      }
    }
  );
}

function openRailTrashDialog() {
  if (!isAdmin()) return;
  const dialog = $("#railTrashDialog");
  const listEl = $("#railTrashList");
  if (!dialog || !listEl) return;

  const allCards = portal.railCards || [];
  const trashed = allCards.filter(c => Boolean(c.deletedAt));

  listEl.innerHTML = "";
  if (trashed.length === 0) {
    listEl.innerHTML = `<p class="resource-empty">ไม่มีรายการในถังพัก</p>`;
  } else {
    trashed.forEach(item => {
      const row = document.createElement("div");
      row.className = "rail-trash-row";
      row.innerHTML = `
        <div class="rail-trash-meta">
          <strong>${escapeHtml(item.title || 'ไม่มีชื่อหัวข้อ')}</strong>
          <span>ย้ายเมื่อ: ${formatThaiDateTimeBE(item.deletedAt) || 'เร็วๆ นี้'}</span>
        </div>
        <button type="button" class="button secondary small rail-restore-btn">กู้คืน</button>
        <button type="button" class="button danger small rail-perm-btn">ลบถาวร</button>
      `;
      row.querySelector(".rail-restore-btn").addEventListener("click", () => restoreRailCard(item.id));
      row.querySelector(".rail-perm-btn").addEventListener("click", () => permDeleteRailCard(item.id, item.title));
      listEl.appendChild(row);
    });
  }

  if (dialog.open) dialog.close();
  dialog.showModal();
}

async function restoreRailCard(cardId) {
  if (!isAdmin()) return;
  try {
    await updateDoc(doc(railCardsCollection, cardId), {
      deletedAt: null,
      published: true
    });
    showToast("กู้คืนหัวข้อเรียบร้อยแล้ว");
    openRailTrashDialog();
  } catch (error) {
    console.error("Restore rail card error:", error);
    showToast("กู้คืนรายการไม่สำเร็จ", "error");
  }
}

function permDeleteRailCard(cardId, title) {
  if (!isAdmin()) return;
  confirmRailAction(
    "ยืนยันการลบถาวร",
    `ต้องการลบหัวข้อ “${title || 'หัวข้อนี้'}” อย่างถาวรใช่หรือไม่? เมื่อลบแล้วจะไม่สามารถกู้คืนได้อีก`,
    async () => {
      try {
        await deleteDoc(doc(railCardsCollection, cardId));
        showToast("ลบหัวข้ออย่างถาวรแล้ว");
        openRailTrashDialog();
      } catch (error) {
        console.error("Perm delete rail card error:", error);
        showToast("ลบรายการไม่สำเร็จ", "error");
      }
    }
  );
}

async function reorderRailCards(sourceId, targetId) {
  if (!isAdmin()) return;
  const cards = getSortedRailCards();
  const sourceIndex = cards.findIndex(c => c.id === sourceId);
  const targetIndex = cards.findIndex(c => c.id === targetId);
  if (sourceIndex === -1 || targetIndex === -1 || sourceIndex === targetIndex) return;

  const [moved] = cards.splice(sourceIndex, 1);
  cards.splice(targetIndex, 0, moved);

  for (let i = 0; i < cards.length; i++) {
    const card = cards[i];
    const newOrder = (i + 1) * 10;
    card.order = newOrder;
    await setDoc(doc(railCardsCollection, card.id), {
      ...card,
      order: newOrder,
      updatedAt: serverTimestamp()
    }, { merge: true });
  }
  showToast("จัดเรียงลำดับหัวข้อเรียบร้อยแล้ว");
}

async function moveRailCardStep(direction) {
  if (!isAdmin()) return;
  const cardId = $("#railCardId").value;
  if (!cardId || cardId === "new") return;
  const cards = getSortedRailCards();
  const idx = cards.findIndex(c => c.id === cardId);
  if (idx === -1) return;
  const targetIdx = direction === "up" ? idx - 1 : idx + 1;
  if (targetIdx < 0 || targetIdx >= cards.length) {
    showToast(direction === "up" ? "อยู่อันดับแรกแล้ว" : "อยู่อันดับสุดท้ายแล้ว");
    return;
  }
  const currentCard = cards[idx];
  const targetCard = cards[targetIdx];
  const currentOrder = currentCard.order || (idx + 1) * 10;
  const targetOrder = targetCard.order || (targetIdx + 1) * 10;

  currentCard.order = targetOrder;
  targetCard.order = currentOrder;

  await setDoc(doc(railCardsCollection, currentCard.id), { ...currentCard, order: targetOrder, updatedAt: serverTimestamp() }, { merge: true });
  await setDoc(doc(railCardsCollection, targetCard.id), { ...targetCard, order: currentOrder, updatedAt: serverTimestamp() }, { merge: true });

  $("#railCardOrder").value = targetOrder;
  $("#railCardOrderDisplay").textContent = `ลำดับที่ ${targetIdx + 1}`;
  showToast("ปรับลำดับหัวข้อเรียบร้อยแล้ว");
}

function setupPortalEvents() {
  $("#manageProjectsButton")?.addEventListener("click", () => $("#treeMenuButton")?.click());
  $("#closeSelectedProjectDetail")?.addEventListener("click", () => { $("#selectedProjectDetail").hidden = true; });
  $$('[href="#projects"]').forEach(link => link.addEventListener("click", () => {
    setSupportProjectMode(false);
  }));
  $$('.brand[href="#top"], .sidebar-profile[href="#top"]').forEach(link => link.addEventListener("click", () => setSupportProjectMode(false)));
  $$(".support-project-tabs a").forEach(link => link.addEventListener("click", () => {
    $$(".support-project-tabs a").forEach(item => item.classList.toggle("active", item === link));
  }));
  $$(".portal-manage-button").forEach(button => button.addEventListener("click", () => openManageDialog(button.dataset.manageKind)));
  $$("[data-media-filter]").forEach(button => button.addEventListener("click", () => {
    portal.mediaFilter = button.dataset.mediaFilter;
    $$("[data-media-filter]").forEach(item => item.classList.toggle("active", item === button));
    renderMediaLibrary();
  }));
  $("#closeContentManageButton").addEventListener("click", () => $("#contentManageDialog").close());
  $("#toggleContentSectionButton").addEventListener("click", toggleSectionPublished);
  $("#addContentItemButton").addEventListener("click", () => {
    if (portal.manageKind === "media") {
      $("#contentManageDialog").close();
      $("#editorMenuButton")?.click();
    } else configureEditor(portal.manageKind);
  });
  $("#closeContentEditButton").addEventListener("click", () => $("#contentEditDialog").close());
  $("#cancelContentEditButton").addEventListener("click", () => $("#contentEditDialog").close());
  $("#contentEditorForm").addEventListener("submit", saveContentItem);

  // Right Rail Event Listeners
  $("#railAddButton")?.addEventListener("click", () => openRailCardEditor("new"));
  $("#railTrashButton")?.addEventListener("click", openRailTrashDialog);
  $("#closeRailTrashDialogButton")?.addEventListener("click", () => $("#railTrashDialog")?.close());
  $("#closeRailCardDialogButton")?.addEventListener("click", () => $("#railCardDialog")?.close());
  $("#cancelRailCardButton")?.addEventListener("click", () => $("#railCardDialog")?.close());
  $("#railEditorForm")?.addEventListener("submit", saveRailCard);
  $("#railCardDeleteBtn")?.addEventListener("click", trashRailCard);
  $("#railCardMoveUpBtn")?.addEventListener("click", () => moveRailCardStep("up"));
  $("#railCardMoveDownBtn")?.addEventListener("click", () => moveRailCardStep("down"));
  $("#railCardScheduled")?.addEventListener("change", e => {
    $("#railScheduleFields").hidden = !e.target.checked;
  });
  $("#railCardTemplateSelect")?.addEventListener("change", e => {
    applyTemplatePreset(e.target.value);
  });
  $$(".rail-chip").forEach(chip => {
    chip.addEventListener("click", () => {
      const iconKey = chip.dataset.icon;
      $("#railCardIcon").value = iconKey;

      if (["facebook", "line", "tiktok", "instagram", "youtube"].includes(iconKey)) {
        $("#railCardOpenExternal").value = "true";

        const titleEl = $("#railCardTitleTh");
        const kickerEl = $("#railCardKickerTh");
        const btnEl = $("#railCardBtnTh");

        if (!kickerEl.value.trim()) {
          kickerEl.value = "ติดตามเรา";
        }

        if (!titleEl.value.trim()) {
          if (iconKey === "facebook") titleEl.value = "เฟซบุ๊กทางการ";
          else if (iconKey === "line") titleEl.value = "ไลน์ออฟฟิเชียล";
          else if (iconKey === "tiktok") titleEl.value = "ติ๊กต็อก";
          else if (iconKey === "instagram") titleEl.value = "อินสตาแกรม";
          else if (iconKey === "youtube") titleEl.value = "ยูทูบทางการ";
        }

        if (!btnEl.value.trim()) {
          if (iconKey === "line") btnEl.value = "เพิ่มเพื่อน";
          else if (iconKey === "youtube") btnEl.value = "ชมวิดีโอ";
          else btnEl.value = "ติดตาม";
        }

        queueAutoTranslate();
      }
    });
  });

  // Track manual changes in Lao and English fields so auto-translate doesn't overwrite unless forced
  ["KickerLo", "KickerEn", "TitleLo", "TitleEn", "DescLo", "DescEn", "BtnLo", "BtnEn"].forEach(key => {
    $(`#railCard${key}`)?.addEventListener("input", e => {
      if (e.target.value.trim()) {
        e.target.dataset.customized = "true";
      } else {
        delete e.target.dataset.customized;
      }
    });
  });

  // Real-time auto-translation from Thai (master language)
  ["KickerTh", "TitleTh", "DescTh", "BtnTh"].forEach(key => {
    $(`#railCard${key}`)?.addEventListener("input", () => {
      queueAutoTranslate();
    });
  });

  // Explicit Auto-Translate button click
  $("#railAutoTranslateBtn")?.addEventListener("click", () => {
    autoTranslateRailFields(true);
  });
  $$(".rail-lang-tab").forEach(tab => {
    tab.addEventListener("click", () => {
      const target = tab.dataset.railTab;
      $$(".rail-lang-tab").forEach(t => t.classList.toggle("active", t === tab));
      $("#railPaneTh").hidden = target !== "th";
      $("#railPaneTh").classList.toggle("active", target === "th");
      $("#railPaneLo").hidden = target !== "lo";
      $("#railPaneLo").classList.toggle("active", target === "lo");
      $("#railPaneEn").hidden = target !== "en";
      $("#railPaneEn").classList.toggle("active", target === "en");
    });
  });

  $$(".language-option").forEach(button => button.addEventListener("click", () => setTimeout(() => {
    renderProjectCatalog();
    renderMediaLibrary();
    renderContentLists();
    renderRightRail();
  }, 0)));
  window.addEventListener("open-portal-manager", event => {
    const kind = event.detail?.kind;
    if (!["media", "news", "document", "donation"].includes(kind)) return;
    openManageDialog(kind);
    const item = portal.items.find(entry => entry.id === event.detail?.itemId);
    if (item) configureEditor(kind, item);
  });
}

setupPortalEvents();
if (location.hash === "#muchalinda-project" || location.hash.startsWith("#muchalinda-")) {
  setSupportProjectMode(true);
}
window.addEventListener("hashchange", () => {
  const supportHash = location.hash === "#muchalinda-project" || location.hash.startsWith("#muchalinda-");
  if (!supportHash) setSupportProjectMode(false);
  renderRightRail();
});
renderPortal();
onAuthStateChanged(auth, async user => {
  portal.user = user;
  portal.role = await resolveRole(user);
  listenPortalData();
  renderPortal();
});
