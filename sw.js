const CACHE_NAME = "digi-learn-cache-v1";
const urlsToCache = [
  "index.html",
  "style.css",
  "app.js",
  "manifest.json",
  "about.html",
  "contact.html",
  "student.html",
  "teacher.html",
  "dobut.html",
  "icons/icon-192.png",
  "icons/icon-512.png"
];

// Install SW and cache files
self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log("Caching app shell...");
      return cache.addAll(urlsToCache);
    })
  );
});

// Activate SW and clear old caches
self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cache) => {
          if (cache !== CACHE_NAME) {
            console.log("Deleting old cache:", cache);
            return caches.delete(cache);
          }
        })
      );
    })
  );
});

// Fetch from cache, fallback to network
self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return (
        response ||
        fetch(event.request).catch(() =>
          caches.match("index.html") // fallback offline page
        )
      );
    })
  );
});
