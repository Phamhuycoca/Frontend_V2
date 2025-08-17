import React, { useState } from "react";

interface LinkMeta {
  title: string;
  description: string;
  image: string;
  url: string;
}

const LinkPreview = () => {
  const [url, setUrl] = useState("");
  const [meta, setMeta] = useState<LinkMeta | null>(null);

  const handlePaste = async (e: React.ClipboardEvent<HTMLInputElement>) => {
    const pastedText = e.clipboardData.getData("text");
    const api_key= import.meta.env.VITE_API_KEY_PREVIEW;
    if (pastedText.startsWith("http")) {
      setUrl(pastedText);

      // demo dùng linkpreview.net (bạn nên thay bằng backend của bạn)
      try {
        const res = await fetch(
          `http://localhost:4000/preview?url=${pastedText}`
        );
        const data = await res.json();
        console.log('data',data);
        
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
      <input
        type="text"
        placeholder="Paste link vào đây..."
        onPaste={handlePaste}
        className="border p-2 w-full"
      />

      {meta && (
        <div className="border rounded-lg p-3 mt-3 flex items-start gap-3 max-w-md shadow">
          {meta.image && (
            <img
              src={meta.image}
              alt={meta.title}
              className="w-20 h-20 object-cover rounded"
            />
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

export default LinkPreview;
