"use client";

import { LOGIN_URL } from "@/constants";
import { JwtPayload } from "@/types";
import { jwtDecode } from "jwt-decode";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(LOGIN_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) throw new Error("Invalid credentials");

      const data = await res.json();
      const token = data.data.accessToken;
      const decodedToken = jwtDecode<JwtPayload>(token);

      localStorage.setItem("token", token);
      localStorage.setItem("role", decodedToken.role);
      router.replace("/dashboard");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="bg-slate-900 min-h-screen">
      <div className="max-w-screen-xl px-4 mx-auto py-8">
        <form
          className="max-w-md bg-white mx-auto shadow shadow-slate-200 px-6 py-10 rounded-md"
          onSubmit={handleSubmit}
        >
          <h1 className="text-center text-xl font-bold mb-8">Login</h1>
          <div className="space-y-6">
            <div>
              <label className="block mb-2" htmlFor="email">
                Email
              </label>
              <input
                className="w-full border border-slate-300 rounded-md p-2"
                id="email"
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
              />
            </div>
            <div>
              <label className="block mb-2" htmlFor="password">
                Password
              </label>
              <input
                className="w-full border border-slate-300 rounded-md p-2"
                id="password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
              />
            </div>
            {error && <p className="text-red-500">{error}</p>}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-slate-900 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isLoading ? "Loading..." : "Login"}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}
