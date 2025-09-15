const CACHE_NAME = "nabha-digital-cache-v2";
const OFFLINE_URL = "offline.html";

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

  // CSS
  "/style.css",
  "/student.css",
  "/teacher.css",
  "/about.css",
  "/contact.css",
  "/dobut.css",
  "/announcements.css",
  "/lectures.css",
  "/authoring.css",
  "/tdashboard.css",
  

  // JS
  "/app.js",
  "/student.js",
  "/teacher.js",
  "/about.js",
  "/contact.js",
  "/dobut.js",
  "/announcements.js",
  "/lectures.js",
  "/authoring.js",
  "/tdashboard.js"

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
