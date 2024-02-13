"use client";

import CompanyForm from "@/components/company-form";
import CompanyList from "@/components/company-list";
import { Role } from "@/constants";
import useRole from "@/hooks/useRole";
import useToken from "@/hooks/useToken";
import { useRouter } from "next/navigation";

export default function Dashboard() {
  const router = useRouter();
  const token = useToken();
  const role = useRole();

  function handleLogout() {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    router.replace("/");
  }

  if (!token) return null;

  return (
    <main>
      <div className="max-w-screen-xl px-4 mx-auto py-8">
        <div className="max-w-sm">
          <div className="flex justify-end mb-6">
            <button
              className="bg-slate-900 text-white rounded-md p-2 text-sm"
              onClick={handleLogout}
            >
              Logout
            </button>
          </div>
          {role === Role.VIEWER ? <CompanyList /> : <CompanyForm />}
        </div>
      </div>
    </main>
  );
}
