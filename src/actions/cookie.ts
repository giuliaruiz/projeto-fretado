"use server"
import { cookies } from "next/headers"

export async function CreateCookie(data: any) {
    const cookie = await cookies()
    cookie.set("auth", JSON.stringify(data))
}

export async function GetCookie() {
    const cookieStore = await cookies()
    const data: any = cookieStore.get('auth')
    return JSON.parse(data.value)
}