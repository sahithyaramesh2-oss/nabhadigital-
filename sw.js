const CACHE_NAME = 'nabha-digital-cache-v1';
const ASSETS_TO_CACHE = [
  '/',
  '/index.html',
  '/student.html',
  '/teacher.html',
  '/about.html',
  '/contact.html',
  '/dobut.html',
  '/announcements.html',
  '/lectures.html',
  '/authoring.html',
  '/tdashboard.html',
  '/css/style.css',
  '/css/student.css',
  '/css/teacher.css',
  '/css/about.css',
  '/css/contact.css',
  '/css/dobut.css',
  '/css/lectures.css',
  '/css/announcements.css',
  '/css/tdashboard.css',
  '/css/authoring.css',
  '/js/app.js',
  '/js/student.js',
  '/js/teacher.js',
  '/js/about.js',
  '/js/contact.js',
  '/js/dobut.js',
  '/js/lectures.js',
  '/js/announcements.js',
  '/js/tdashboard.js',
  '/js/authoring.js',
  '/manifest.json',
  '/offline.html'
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        return cache.addAll(ASSETS_TO_CACHE);
      })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        return response || fetch(event.request);
      })
  );
});


