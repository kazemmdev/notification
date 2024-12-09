import { clientsClaim, skipWaiting } from "workbox-core"
import { ExpirationPlugin } from "workbox-expiration"
import { cleanupOutdatedCaches, matchPrecache, precacheAndRoute } from "workbox-precaching"
import { registerRoute, setCatchHandler, setDefaultHandler } from "workbox-routing"
import { CacheFirst, NetworkFirst, NetworkOnly } from "workbox-strategies"

skipWaiting()
clientsClaim()

// must include following lines when using inject manifest module from workbox
// https://developers.google.com/web/tools/workbox/guides/precache-files/workbox-build#add_an_injection_point
const WB_MANIFEST = self.__WB_MANIFEST
precacheAndRoute(WB_MANIFEST)
cleanupOutdatedCaches()

registerRoute(
  /^(?!.*\/api\/)(?:.*\/)?[^\/.]+$/i,
  new NetworkFirst({
    cacheName: "page-url",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^https:\/\/fonts\.(?:googleapis|gstatic)\.com\/.*/i,
  new CacheFirst({
    cacheName: "google-fonts",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^(?!.*\/api\/)(?:.*)?\.(?:eot|otf|ttc|ttf|woff|woff2)$/i,
  new CacheFirst({
    cacheName: "static-font-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 10,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
// disable image cache, so we could observe the placeholder image when offline
registerRoute(
  /^(?!.*\/api\/)(?:.*)?\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,
  new CacheFirst({
    cacheName: "static-image-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^(?!.*\/api\/)(?:.*)?\.(?:js)$/i,
  new CacheFirst({
    cacheName: "static-js-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 100,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^(?!.*\/api\/)(?:.*)?\.(?:css|less)$/i,
  new CacheFirst({
    cacheName: "static-style-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 32,
        maxAgeSeconds: 86400,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^(?!.*\/api\/)(?:.*)?\.(?:json|xml|csv)$/i,
  new NetworkOnly({
    cacheName: "static-data-assets",
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)
registerRoute(
  /^(.*\/api\/)(?:.*\/)?[^\/.]+$/i,
  new NetworkOnly({
    cacheName: "apis",
    networkTimeoutSeconds: 30000,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)

registerRoute(
  /.*/i,
  new NetworkOnly({
    cacheName: "others",
    networkTimeoutSeconds: 30000,
    plugins: [
      new ExpirationPlugin({
        maxEntries: 1,
        maxAgeSeconds: 0,
        purgeOnQuotaError: !0
      })
    ]
  }),
  "GET"
)

// following lines gives you control of the offline fallback strategies
// https://developers.google.com/web/tools/workbox/guides/advanced-recipes#comprehensive_fallbacks

// Use a stale-while-revalidate strategy for all other requests.
setDefaultHandler(new NetworkOnly())

// This "catch" handler is triggered when any of the other routes fail to
// generate a response.
setCatchHandler(({ event }) => {
  // The FALLBACK_URL entries must be added to the cache ahead of time, either
  // via runtime or precaching. If they are precached, then call
  // `matchPrecache(FALLBACK_URL)` (from the `workbox-precaching` package)
  // to get the response from the correct cache.
  //
  // Use event, request, and url to figure out how to respond.
  // One approach would be to use request.destination, see
  // https://medium.com/dev-channel/service-worker-caching-strategies-based-on-request-types-57411dd7652c
  switch (event.request.destination) {
    case "document":
      // If using precached URLs:
      return matchPrecache("/fallback")
    // return caches.match('/fallback')
    case "image":
      // If using precached URLs:
      return matchPrecache("/static/images/fallback.png")
    // return caches.match('/static/images/fallback.png')
    case "font":
    // If using precached URLs:
    // return matchPrecache(FALLBACK_FONT_URL);
    // return caches.match('/static/fonts/fallback.otf')
    // break
    default:
      // If we don't have a fallback, just return an error response.
      return Response.error()
  }
})

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

self.addEventListener("fetch", () => {
  // Handle fetch events
})

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
