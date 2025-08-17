import React, { useState } from "react";
import type { LinkMeta } from "./LinkMete";
import { Image, Input } from "antd";
export const LinkPreview = () => {
  const urlApi = import.meta.env.VITE_API_KEY_LINK_PREVIEW;
  console.log("urlApi", urlApi);
  const [meta, setMeta] = useState<LinkMeta | null>(null);
  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    console.log("pastedText", pastedText);
    if (pastedText.startsWith("http")) {
      // demo dùng linkpreview.net (bạn nên thay bằng backend của bạn)
      try {
        const res = await fetch(`${urlApi}/preview?url=${pastedText}`);
        const data = await res.json();
        console.log("data", data);

        setMeta({
          title: data.title,
          description: data.description,
          image: data.image,
          url: data.url,
        });
      } catch (err) {
        console.error("Lỗi lấy metadata:", err);
      }
    }
  };
  return (
    <div className="p-4">
      <Input
        type="text"
        placeholder="Paste link vào đây..."
        onPaste={handlePaste}
        onChange={(e) => {
          const value = e.target.value;
          if (!value.startsWith("http")) {
            setMeta(null);
          }
        }}
        className="border p-2 w-full"
      />

      {meta && (
        <div className="border rounded-lg p-3 mt-3 flex items-start gap-3 max-w-md shadow">
          {meta.image && (
            <Image preview={false} src={meta.image} alt={meta.title} />
            // <img
            //   src={meta.image}
            //   alt={meta.title}
            //   className="w-20 h-20 object-cover rounded"
            // />
          )}
          <div>
            <a
              href={meta.url}
              target="_blank"
              rel="noopener noreferrer"
              className="font-bold text-blue-600 hover:underline"
            >
              {meta.title}
            </a>
            <p className="text-sm text-gray-600">{meta.description}</p>
          </div>
        </div>
      )}
    </div>
  );
};
