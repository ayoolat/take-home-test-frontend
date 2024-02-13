import { ADD_IMAGE_URL, UPLOADS_URL } from "@/constants";
import useToken from "@/hooks/useToken";
import { Company } from "@/types";
import Image from "next/image";
import { useRef, useState } from "react";

interface CompanyImageProps {
  company: Company;
  refetch: () => void;
}

export default function CompanyImage({ company, refetch }: CompanyImageProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const token = useToken();
  const inputRef = useRef<HTMLInputElement>(null);

  const handleButtonClick = () => {
    inputRef.current?.click();
  };

  async function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (file) uploadFile(file);
  }

  async function uploadFile(file: File) {
    setError("");
    setIsLoading(true);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(UPLOADS_URL, {
        method: "POST",
        headers: { Authorization: `Bearer ${token}` },
        body: formData,
      });

      if (!res.ok) throw new Error("Image upload failed");

      const data = await res.json();
      updateImage(data.data);
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  async function updateImage(fileName: string) {
    setError("");
    setIsLoading(true);

    try {
      const res = await fetch(`${ADD_IMAGE_URL}/${company.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ fileName }),
      });

      if (!res.ok) throw new Error("Failed to add image");
      refetch();
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <div className="space-y-2">
      <button
        disabled={isLoading}
        onClick={handleButtonClick}
        className="disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {company.image ? (
          <div className="relative rounded-full overflow-hidden size-20">
            <Image
              src={company.image}
              sizes="5rem"
              alt={company.name}
              className="object-cover"
              fill
            />
          </div>
        ) : (
          <div className="bg-slate-900 text-white text-4xl rounded-full size-20 grid place-items-center">
            {company.name.charAt(0)}
          </div>
        )}
        <input
          ref={inputRef}
          className="w-full border border-slate-300 rounded-md p-2"
          id="file"
          type="file"
          onChange={handleFileChange}
          accept="image/png"
          hidden
        />
      </button>
      {isLoading && <p className="text-xs">Uploading...</p>}
      {error && <p className="text-red-500 text-xs">{error}</p>}
    </div>
  );
}
