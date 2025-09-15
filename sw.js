const CACHE_NAME = "nabha-digital-cache-v2"; // increment version
const OFFLINE_URL = "/offline.html";

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
  "/js/swap.js",
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

// Install
self.addEventListener("install", event => {
  console.log("Service Worker: Installing...");
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      return Promise.all(
        FILES_TO_CACHE.map(file =>
          cache.add(file).catch(err => console.warn("Failed to cache:", file, err))
        )
      );
    })
  );
  self.skipWaiting();
});

// Activate
self.addEventListener("activate", event => {
  console.log("Service Worker: Activating...");
  event.waitUntil(
    caches.keys().then(keys => 
      Promise.all(keys.filter(k => k !== CACHE_NAME).map(k => caches.delete(k)))
    )
  );
  self.clients.claim();
});

// Fetch
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request)
        .catch(() => caches.match(OFFLINE_URL))
      )
  );
});


