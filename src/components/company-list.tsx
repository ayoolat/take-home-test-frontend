import { GET_COMPANIES_URL } from "@/constants";
import useToken from "@/hooks/useToken";
import { PaginatedCompany } from "@/types";
import { useCallback, useEffect, useState } from "react";
import CompanyImage from "./company-image";

const PAGE_SIZE = 3;

export default function CompanyList() {
  const [isLoading, setIsLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [error, setError] = useState("");
  const [data, setData] = useState<PaginatedCompany | null>(null);
  const token = useToken();
  const totalCount = data?.totalCount || 0;
  const pageCount = Math.ceil(totalCount / PAGE_SIZE);

  const getCompanies = useCallback(async () => {
    setIsLoading(true);
    setError("");

    const params = new URLSearchParams({
      page: page.toString(),
      pageSize: PAGE_SIZE.toString(),
    }).toString();

    try {
      const res = await fetch(`${GET_COMPANIES_URL}?${params}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok)
        throw new Error("An error occurred while fetching companies");

      const data = await res.json();
      setData(data.data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }, [page, token]);

  useEffect(() => {
    if (token) getCompanies();
  }, [getCompanies, token]);

  return (
    <div>
      <div className="flex justify-between items-center gap-4 mb-4">
        <h1 className="text-xl font-medium">Company List</h1>
        {isLoading && <p>Loading...</p>}
      </div>
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="space-y-6">
        {data?.data.map(company => (
          <div
            key={company.id}
            className="bg-white shadow-md rounded-md p-4 flex items-center gap-4"
          >
            <CompanyImage company={company} refetch={getCompanies} />
            <div>
              <h2 className="font-bold text-lg">Name: {company.name}</h2>
              <p className="text-slate-500">
                Users count: {company.usersCount}
              </p>
              <p className="text-slate-500">
                Products count: {company.productsCount}
              </p>
              <p className="text-slate-500">Percentage: {company.percentage}</p>
            </div>
          </div>
        ))}
        <div className="flex items-center gap-4">
          <button
            className="text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page - 1)}
            disabled={isLoading || page === 1}
          >
            Previous
          </button>
          <button
            className="text-sm disabled:opacity-50 disabled:cursor-not-allowed"
            onClick={() => setPage(page + 1)}
            disabled={isLoading || page === pageCount}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
}
