import { auth, currentUser } from "@clerk/nextjs";
import { Liveblocks } from "@liveblocks/node";
import { ConvexHttpClient } from "convex/browser";
import { api } from "@/convex/_generated/api";

const convex = new ConvexHttpClient(process.env.NEXT_PUBLIC_CONVEX_URL!);

const liveblocks = new Liveblocks({
  secret:
    "sk_dev_GtIdzMpASEmh9zdB0dStWZQeGrEPjXAaZR7IbaRErIX7l1Zo_wnpxU1qv1_k4mZB",
});

// ! kasarnya kek webhooks, liveblocks config bakal nge hit ini untuk authorize user, generate token, etc

export async function POST(req: Request) {
  // ! isi auth itu data data user terus session, org, orgRole current user nya
  const authorization = auth();
  const user = await currentUser();

  if (!authorization || !user) {
    return new Response("Unauthorized", { status: 403 });
  }
  const { room } = await req.json();
  const board = await convex.query(api.board.get, { id: room });

  if (board?.orgId !== authorization.orgId) {
    return new Response("Unauthorized", { status: 403 });
  }

  const userInfo = {
    name: user.firstName || "Anonymous",
    picture: user.imageUrl,
  };

  const session = liveblocks.prepareSession(user.id, { userInfo });
  if (room) {
    session.allow(room, session.FULL_ACCESS);
  }
  // ! authorize itu bakal nge generate token buat user, kalo user udah authorize, bakal nge return token dari body dan status request nya
  const { status, body } = await session.authorize();
  return new Response(body, { status });
}
