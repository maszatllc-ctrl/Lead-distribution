import { getServerSession } from "next-auth"
import { authOptions } from "@/app/api/auth/[...nextauth]/route"

export async function getAuthSession() {
  return getServerSession(authOptions)
}

export async function getCurrentUser() {
  const session = await getAuthSession()
  return session?.user || null
}
