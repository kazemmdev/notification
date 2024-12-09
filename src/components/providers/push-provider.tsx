"use client"

import React from "react"
import { fetchClient } from "@/libs/fetch"
import {
  extractAndValidateKeys,
  isNotificationSupported,
  isPermissionDenied,
  isPermissionGranted,
  registerAndSubscribe,
} from "@/libs/push"

interface NotificationContextType {
  isSupported: boolean
  isSubscribed: boolean
  isGranted: boolean
  isDenied: boolean
  subscription: PushSubscription | null
  errorMessage: string | null
  handleSubscribe: () => void
}

const NotificationContext = React.createContext<NotificationContextType | undefined>(undefined)

const NotificationProvider = ({ children }: React.PropsWithChildren) => {
  const [isSupported, setIsSupported] = React.useState<boolean>(false)
  const [isGranted, setIsGranted] = React.useState<boolean>(false)
  const [isDenied, setIsDenied] = React.useState<boolean>(false)
  const [isSubscribed, setIsSubscribed] = React.useState<boolean>(false)
  const [subscription, setSubscription] = React.useState<PushSubscription | null>(null)
  const [errorMessage, setErrorMessage] = React.useState<string | null>(null)

  React.useEffect(() => {
    if (isNotificationSupported()) {
      setIsSupported(true)
      const granted = isPermissionGranted()
      setIsGranted(granted)
      setIsDenied(isPermissionDenied())
      if (granted) {
        handleSubscribe()
      }
    }
  }, [])

  // React.useEffect(() => {
  //   if (data?.user) {
  //     const options = {
  //       broadcaster: "pusher",
  //       client: new Pusher("1ghsKZdCbO0=", {
  //         cluster: "mt1",
  //         wsHost: process.env.NODE_ENV == "production" ? "ws.hunter-s.com" : "ws.mydev.test",
  //         wsPort: process.env.NODE_ENV == "production" ? 443 : 80,
  //         wssPort: process.env.NODE_ENV == "production" ? 443 : 80,
  //         forceTLS: process.env.NODE_ENV == "production",
  //         disableStats: process.env.NODE_ENV == "production",
  //         authEndpoint: "/api/broadcasting/auth",
  //         enabledTransports: ["ws", "wss"],
  //         disabledTransports: ["sockjs", "xhr_polling", "xhr_streaming"],
  //         auth: {
  //           headers: {
  //             Authorization: "Bearer " + data?.accessToken,
  //           },
  //         },
  //       }),
  //     }
  //
  //     const echo = new Echo(options)
  //
  //     echo.private(`App.Models.User.${data?.user?.id}`).notification((notification: any) => {
  //       if (notification) toast.success(notification as any)
  //     })
  //   }
  // }, [data])

  const handleSubscribe = () => {
    const onSubscribe = (subscription: PushSubscription | null) => {
      if (subscription) {
        // for a production app, you would probably have a user account and save the subscription to the user
        // make http request to save the subscription
        const keys = extractAndValidateKeys(subscription)

        fetchClient({
          url: "subscribe",
          body: { endpoint: subscription.endpoint, keys },
          method: "post",
        }).then(() => {
          console.log("Push subscription sent to the server")
        })

        setIsSubscribed(true)
        setSubscription(subscription)
      }
      setIsGranted(isPermissionGranted())
      setIsDenied(isPermissionDenied())
    }
    const onError = (e: Error) => {
      console.error("Failed to subscribe cause of: ", e)
      setIsGranted(isPermissionGranted())
      setIsDenied(isPermissionDenied())
      setIsSubscribed(false)
      setErrorMessage(e?.message)
    }
    registerAndSubscribe(onSubscribe, onError).then(() => {
      console.log("Push notification registered!")
    })
  }

  const contextValue = React.useMemo(
    () => ({
      isSupported,
      isSubscribed,
      isGranted,
      isDenied,
      subscription,
      errorMessage,
      handleSubscribe,
    }),
    [isSupported, isSubscribed, isGranted, isDenied, subscription, errorMessage]
  )

  return (
    <NotificationContext.Provider value={contextValue}>{children}</NotificationContext.Provider>
  )
}

export const useNotification = (): NotificationContextType => {
  const context = React.useContext(NotificationContext)
  if (context === undefined) {
    throw new Error("useNotification must be used within a NotificationProvider")
  }
  return context
}

export default NotificationProvider
