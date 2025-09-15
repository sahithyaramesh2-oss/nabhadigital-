// Service Worker for Nabha Digital

const CACHE_NAME = "nabha-digital-cache-v5"; // Increment version to update cache
const OFFLINE_URL = "/offline.html";

// List all static files to cache
const FILES_TO_CACHE = [
  "/", 
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
  "/css/style.css",
  "/css/student.css",
  "/css/teacher.css",
  "/css/about.css",
  "/css/contact.css",
  "/css/dobut.css",
  "/css/lectures.css",
  "/css/announcements.css",
  "/css/tdashboard.css",
  "/css/authoring.css",

  // JS
  "/js/app.js",
  "/js/student.js",
  "/js/teacher.js",
  "/js/about.js",
  "/js/contact.js",
  "/js/dobut.js",
  "/js/lectures.js",
  "/js/announcements.js",
  "/js/tdashboard.js",
  "/js/authoring.js",

  // Manifest & fallback
  "/manifest.json",
  OFFLINE_URL
];

// Install Service Worker
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log("📦 Caching app shell and content...");
      return cache.addAll(FILES_TO_CACHE);
    })
  );
  self.skipWaiting();
});

// Activate Service Worker - cleanup old caches
self.addEventListener("activate", event => {
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys
          .filter(key => key !== CACHE_NAME)
          .map(key => caches.delete(key))
      );
    })
  );
  self.clients.claim();
});

// Fetch handler - serve cached content when offline
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request).then(cachedResponse => {
      // Return cached response if available
      if (cachedResponse) return cachedResponse;

      // Otherwise fetch from network and cache it dynamically
      return fetch(event.request)
        .then(networkResponse => {
          return caches.open(CACHE_NAME).then(cache => {
            // Only cache GET requests
            if (event.request.method === "GET") {
              cache.put(event.request, networkResponse.clone());
            }
            return networkResponse;
          });
        })
        .catch(() => {
          // If network fails, return offline page for navigation requests
          if (event.request.mode === "navigate") {
            return caches.match(OFFLINE_URL);
          }
        });
    })
  );
});

