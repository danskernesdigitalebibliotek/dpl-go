import { defaultSession, getSession } from "@/lib/session/session"

export async function GET() {
  try {
    const session = await getSession()

    if (!session) {
      return Response.json({ defaultSession })
    }
    return Response.json({
      isLoggedIn: session.isLoggedIn,
      userInfo: session.userInfo,
      type: session.type,
      adgangsplatformenUserToken: session.adgangsplatformenUserToken,
    })
  } catch (e) {
    return Response.json({ error: e }, { status: 500 })
  }
}

export const dynamic = "force-dynamic"
