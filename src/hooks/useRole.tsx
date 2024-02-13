"use client";

import { Role } from "@/constants";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function useRole() {
  const [role, setRole] = useState<Role | null>(null);
  const router = useRouter();

  useEffect(() => {
    const role = localStorage.getItem("role") as Role;
    if (role) setRole(role);
  }, [router]);

  return role;
}
