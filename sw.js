const CACHE_NAME = "nabha-digital-cache-v3";
const OFFLINE_URL = "/offline.html";

// ✅ Add ALL pages, CSS, and JS here
const FILES_TO_CACHE = [
  "/",                 // root
  "/index.html",
  "/student.html",
  "/teacher.html",
  "/about.html",
  "/contact.html",
  "/dobut.html",
  "/announcements.html",
  "/lectures.html",
  "/authoring.html",
  "/tdashboard.html",

  // CSS (ensure correct paths)
  "/css/style.css",
  "/css/student.css",
  "/css/teacher.css",
  "/css/about.css",
  "/css/contact.css",
  "/css/dobut.css",
  "/css/lectures.css",

  // JS (ensure correct paths)
  "/js/app.js",
  "/js/student.js",
  "/js/teacher.js",
  "/js/about.js",
  "/js/contact.js",
  "/js/dobut.js",
  "/js/lectures.js",

  // Manifest & fallback
  "/manifest.json",
  OFFLINE_URL
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching app shell and content");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate - cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k))
      );
    })
  );
  self.clients.claim();
});

// Fetch - serve cached content when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(response => {
      return response || fetch(event.request).catch(() => caches.match(OFFLINE_URL));
    })
  );
});

