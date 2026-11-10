// self.addEventListener("install", (event) => self.skipWaiting());
// self.addEventListener("activate", (event) =>
//   event.waitUntil(self.clients.claim()),
// );

//todo: add the fetch event listener to cache requests and serve cached responses
// self.addEventListener("fetch", (event) => {
//   event.respondWith(
//     caches.match(event.request).then((cachedResponse) => {
//       return cachedResponse || fetch(event.request);
//     })
//   );
// });

const CACHE = "brickcompare-v1";

self.addEventListener("install", () => self.skipWaiting());

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches
      .keys()
      .then((keys) =>
        Promise.all(
          keys.filter((k) => k !== CACHE).map((k) => caches.delete(k)),
        ),
      )
      .then(() => self.clients.claim()),
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  event.respondWith(
    fetch(event.request)
      .then((res) => {
        const copy = res.clone();
        caches.open(CACHE).then((c) => c.put(event.request, copy));
        return res;
      })
      .catch(() => caches.match(event.request)),
  );
});
