import { cleanupOutdatedCaches, precacheAndRoute } from "workbox-precaching"

const WB_MANIFEST = self.__WB_MANIFEST
self.__WB_DISABLE_DEV_LOGS = true
precacheAndRoute(WB_MANIFEST)
cleanupOutdatedCaches()

self.addEventListener("install", (event) => {
  console.log("install", event.target)
  self.skipWaiting() // Activate the new service worker immediately
})

self?.addEventListener("activate", function(event) {
  console.log("activate", event.target)
  // Clean up any old caches or resources here
  event?.waitUntil(
    caches?.keys()?.then(function(cacheNames) {
      return Promise.all(
        cacheNames
          ?.filter(function() {
            // Return true if you want to remove this cache,
            // but remember that caches are shared across
            // the whole origin
          })
          ?.map(function(cacheName) {
            return caches.delete(cacheName)
          })
      )
    })
  )
})

self.addEventListener("message", (event) => {
  console.log("message", event)
  if (event.data && event.data.type === "SKIP_WAITING") {
    self.skipWaiting() // Allow the new service worker to take control
  }
})

self.addEventListener("fetch", (event) => {
  if (event.request.url.includes("/_next/")) {
    event.respondWith(fetch(event.request));
  }
});

self.addEventListener("push", (event) => {
  console.log("Push event received:", event);

  if (!event?.data) {
    console.log("No data in the push event.");
    return;
  }

  const payload = event.data.json();
  console.log("Push payload:", payload);

  const { body, icon, image, badge, url, title } = payload;
  const notificationTitle = title || "Default Title";
  const notificationOptions = {
    body,
    icon,
    image,
    badge,
    data: { url },
  };

  event.waitUntil(
    self.registration
      .showNotification(notificationTitle, notificationOptions)
      .then(() => {
        console.log("Notification displayed.");
        console.log("Push event received:", event);
      })
      .catch((err) => console.error("Error showing notification:", err))
  );
});

self.addEventListener("notificationclick", (event) => {
  console.log("Notification clicked:", event);

  event.notification.close();

  event.waitUntil(
    clients.matchAll({ type: "window", includeUncontrolled: true }).then((clientList) => {
      const url = event.notification.data.url;

      if (!url) {
        console.log("No URL found in notification data.");
        return;
      }

      for (const client of clientList) {
        if (client.url === url && "focus" in client) {
          console.log("Focusing existing client.");
          return client.focus();
        }
      }

      if (clients.openWindow) {
        console.log("Opening a new window:", url);
        return clients.openWindow(url);
      }
    })
  );
});
