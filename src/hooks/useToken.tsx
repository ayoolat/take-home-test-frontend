"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useToken() {
  const [token, setToken] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) setToken(token);
    else router.push("/");
  }, [router]);

  return token;
}
