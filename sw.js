const CACHE_NAME = "ndl-cache-v1";
const urlsToCache = [
  "index.html",
  "student.html",
  "teacher.html",
  "about.html",
  "contact.html",
  "style.css",
  "app.js",
  "teacher.js",
  "manifest.json",
  "icon.png"
];

// Install SW & cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      return cache.addAll(urlsToCache);
    })
  );
});

// Serve cached content when offline
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Update cache if needed
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});