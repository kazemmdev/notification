const SERVICE_WORKER_FILE_PATH = "./sw.js"

const base64ToUint8Array = (base64String: string) => {
  const padding = "=".repeat((4 - (base64String.length % 4)) % 4)
  const base64 = (base64String + padding).replace(/-/g, "+").replace(/_/g, "/")
  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

export const isNotificationSupported = () => {
  let unsupported = false
  if (
    !("serviceWorker" in navigator) ||
    !("PushManager" in window) ||
    !("Notification" in window) ||
    !("showNotification" in ServiceWorkerRegistration.prototype)
  ) {
    unsupported = true
  }
  return !unsupported
}

export const isPermissionGranted = () => {
  return Notification.permission === "granted"
}

export const isPermissionDenied = () => {
  return Notification.permission === "denied"
}

export const registerAndSubscribe = async (
  onSubscribe: (subs: PushSubscription | null) => void,
  onError: (e: Error) => void
) => {
  try {
    await navigator.serviceWorker.register(SERVICE_WORKER_FILE_PATH)
    //subscribe to notification
    navigator.serviceWorker.ready
      .then((registration: ServiceWorkerRegistration) => {
        return registration.pushManager.subscribe({
          userVisibleOnly: true,
          applicationServerKey: base64ToUint8Array(process.env.NEXT_PUBLIC_VAPID_PUBLIC_KEY!),
        })
      })
      .then((subscription: PushSubscription) => {
        console.info("Created subscription Object: ", subscription.toJSON())
        onSubscribe(subscription)
      })
      .catch((e) => {
        onError(e)
      })
  } catch  {
    console.error("Exception while creating service worker")
  }
}

export const extractAndValidateKeys = (
  subscription: PushSubscription
): { p256dh: string; auth: string } | null => {
  try {
    const p256dhBuffer = subscription.getKey("p256dh")
    const authBuffer = subscription.getKey("auth")

    if (!p256dhBuffer || !authBuffer) {
      console.error("Subscription keys missing.")
      return null
    }

    // Convert ArrayBuffer to Base64 strings
    // @ts-ignore
    const p256dh = btoa(String.fromCharCode(...new Uint8Array(p256dhBuffer)))
    // @ts-ignore
    const auth = btoa(String.fromCharCode(...new Uint8Array(authBuffer)))

    // Validate Base64 strings
    const base64Regex = /^[A-Za-z0-9+/=]+$/
    if (!base64Regex.test(p256dh) || !base64Regex.test(auth)) {
      console.error("Invalid Base64 encoding for subscription keys.")
      return null
    }

    return { p256dh, auth }
  } catch (error) {
    console.error("Error extracting or validating subscription keys:", error)
    return null
  }
}
