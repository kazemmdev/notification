import axios from "axios"
import { getSession } from "next-auth/react"

export const API_ENDPOINT = process.env.NEXT_PUBLIC_API || "/api"

interface FetchOptions {
  method?: "get" | "post" | "put" | "patch" | "delete"
  body?: any
  params?: any
  options?: any
  headers?: any
}

interface FetchRequest extends FetchOptions {
  url: string
  isProtected?: boolean
}

export const fetchClient = async ({ url, isProtected = true, ...options }: FetchRequest) => {
  try {
    const config = {
      baseURL: `${API_ENDPOINT}/${url.startsWith("/") ? url.substring(1) : url}`,
      method: options.method || "get",
      params: options.params || [],
      data: options.body,
      withCredentials: isProtected,
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...(options.options || {}),
    }

    return await axios.request(config)
  } catch (error: any) {
    if (error.response) {
      const { status, data } = error.response
      throw { status, data }
    } else if (error.request) {
      throw { status: 500, data: "خطای اتصال به سرور!", error: error.message }
    } else {
      throw { status: 500, data: error.message }
    }
  }
}

export const fetchServer = async ({ url, method, body, options, headers }: FetchRequest) => {
  try {
    const config = {
      method: method ?? "get",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
        ...headers,
      },
      cache: "no-cache",
      body: JSON.stringify(body),
      ...options,
    }
    const response = await fetch(
      `${process.env.NEXT_API_URL}/${url.startsWith("/") ? url.substring(1) : url}`,
      config
    )
    if (!response.ok) {
      const { message } = await response.json()
      throw new Error(message)
    }
    return await response.json()
  } catch (error: any) {
    console.error(error.stack)
    throw { status: 500, data: error.message }
  }
}
