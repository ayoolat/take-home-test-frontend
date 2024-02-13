"use client";

import { CREATE_COMPANY_URL } from "@/constants";
import useToken from "@/hooks/useToken";
import { useState } from "react";

export default function CompanyForm() {
  const [payload, setPayload] = useState({
    name: "",
    usersCount: 0,
    productsCount: 0,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [message, setMessage] = useState("");
  const token = useToken();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setMessage("");
    setIsLoading(true);

    try {
      const res = await fetch(CREATE_COMPANY_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("An error occurred while creating company");

      setPayload({ name: "", usersCount: 0, productsCount: 0 });
      setMessage("Company created successfully");
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="text-xl font-medium mb-4">Create Company</h1>
      <div className="space-y-6">
        <div>
          <label className="mb-2 inline-block" htmlFor="name">
            Company Name
          </label>
          <input
            className="w-full border border-slate-300 rounded-md p-2"
            id="name"
            placeholder="Company Name"
            value={payload.name}
            onChange={e => setPayload({ ...payload, name: e.target.value })}
          />
        </div>
        <div className="flex gap-6">
          <div>
            <label className="mb-2 inline-block" htmlFor="usersCount">
              Users
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2"
              id="usersCount"
              value={payload.usersCount}
              onChange={e =>
                setPayload({
                  ...payload,
                  usersCount: parseInt(e.target.value),
                })
              }
              type="number"
              min={0}
            />
          </div>
          <div>
            <label className="mb-2 inline-block" htmlFor="productsCount">
              Products
            </label>
            <input
              className="w-full border border-slate-300 rounded-md p-2"
              id="productsCount"
              value={payload.productsCount}
              onChange={e =>
                setPayload({
                  ...payload,
                  productsCount: parseInt(e.target.value),
                })
              }
              type="number"
              min={0}
            />
          </div>
        </div>
        {error && <p className="text-red-500">{error}</p>}
        {message && <p className="text-green-500">{message}</p>}
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-slate-900 text-white rounded-md p-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Loading..." : "Submit"}
        </button>
      </div>
    </form>
  );
}
