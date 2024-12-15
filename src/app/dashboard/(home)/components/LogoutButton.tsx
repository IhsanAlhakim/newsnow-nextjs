"use client";
import { deleteSession } from "../../(auth)/login/lib/session";

export default function LogoutButton() {
  async function handleLogout() {
    const logout = await deleteSession();
  }
  return <button onClick={handleLogout}>Logout</button>;
}
