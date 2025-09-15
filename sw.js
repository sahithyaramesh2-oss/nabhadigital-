const CACHE_NAME = "nabha-digital-cache-v1";
const OFFLINE_URL = "offline.html";

// List of files you want cached (add your pages here)
const FILES_TO_CACHE = [
  "/",
  "/index.html",
  "/style.css",
  "/app.js",
  "/manifest.json",
  "/student.html",
  "/teacher.html",
  "/dobut.html",
  "/about.html",
  "/contact.html",
  "/lectures.html",
  "/authoring.html",
  OFFLINE_URL
];

// Install Service Worker and cache files
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
      // Return cached file OR fetch from network
      return response || fetch(event.request).catch(() => caches.match(OFFLINE_URL));
    })
  );
});
