import React, { useState, useRef } from 'react';
import type { LinkMeta } from './LinkMete';
import { Input, Spin } from 'antd';

export const LinkPreview = () => {
  const urlApi = import.meta.env.VITE_API_KEY_LINK_PREVIEW;
  const [meta, setMeta] = useState<LinkMeta | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const abortRef = useRef<AbortController | null>(null);

  const handlePaste = async (e: React.ClipboardEvent<HTMLTextAreaElement>) => {
    const pastedText = e.clipboardData.getData('text');
    if (!pastedText.startsWith('http')) return;

    // Hủy request trước nếu có
    if (abortRef.current) {
      abortRef.current.abort();
    }

    const controller = new AbortController();
    abortRef.current = controller;

    try {
      setIsLoading(true);
      const res = await fetch(`${urlApi}/preview?url=${pastedText}`, {
        signal: controller.signal,
      });
      const data = await res.json();

      setMeta({
        title: data.title,
        description: data.description,
        image: data.image,
        url: data.url,
      });
    } catch (err) {
      if ((err as any).name !== 'AbortError') {
        console.error('Lỗi lấy metadata:', err);
        setMeta(null);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="p-4">
      <Input.TextArea
        placeholder="Paste link vào đây..."
        onPaste={handlePaste}
        onChange={(e) => {
          const value = e.target.value;
          if (!value.startsWith('http')) {
            setMeta(null);
          }
        }}
        className="border p-2 w-full"
      />

      <Spin spinning={isLoading}>
        {meta && (
          <div className="border rounded-lg p-3 mt-3 flex items-center gap-3 max-w-md shadow">
            {meta.image && (
              <img
                src={meta.image}
                alt={meta.title}
                className="w-20 h-20 object-cover rounded"
                onError={(e) => {
                  (e.currentTarget as HTMLImageElement).style.display = 'none';
                }}
              />
            )}
            <div>
              <a
                href={meta.url}
                target="_blank"
                rel="noopener noreferrer"
                className="font-bold text-blue-600 hover:underline"
              >
                {meta.title || 'Không có tiêu đề'}
              </a>
              <p className="text-sm text-gray-600 line-clamp-2">{meta.description || 'Không có mô tả'}</p>
            </div>
          </div>
        )}
      </Spin>
    </div>
  );
};
