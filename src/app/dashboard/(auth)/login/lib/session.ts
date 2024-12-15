// import "server-only";

"use server";
import { JWTPayload, SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const key = new TextEncoder().encode(process.env.AUTH_SECRET);

const cookie = {
  name: "session",
  options: { httpOnly: true, secure: true, sameSite: "lax", path: "/" },
  duration: 24 * 60 * 60 * 1000,
};

export async function encrypt(payload: JWTPayload) {
  return new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime("1day")
    .sign(key);
}

export async function decrypt(session: string) {
  try {
    const { payload } = await jwtVerify(session, key, {
      algorithms: ["HS256"],
    });
    return payload;
  } catch (error) {
    console.error(error);
    return null;
  }
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + cookie.duration);
  const session = await encrypt({ userId, expires });
  (await cookies()).set("session", session, {
    httpOnly: true,
    secure: true,
    sameSite: "lax",
    path: "/",
    expires: expires,
  });
}
export async function verifySession() {
  const cookieVar = (await cookies()).get(cookie.name)?.value;
  if (!cookieVar) {
    return null;
  }
  const session = await decrypt(cookieVar);

  if (!session?.userId) {
    return { success: false };
  }

  return { success: true, userId: session.userId };
}
export async function deleteSession() {
  (await cookies()).delete(cookie.name);
  return true;
}
