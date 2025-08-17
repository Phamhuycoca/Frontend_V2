import React, { useState } from "react";

export default function PasteLinkDemo() {
  const [link, setLink] = useState("");

  const handlePaste = (event: React.ClipboardEvent<HTMLInputElement>) => {
    // lấy dữ liệu text từ clipboard
    const pastedText = event.clipboardData.getData("text");
    setLink(pastedText);
  };

  return (
    <div style={{ padding: 20 }}>
      <h3>Dán link vào ô dưới:</h3>
      <input
        type="text"
        placeholder="Paste link ở đây..."
        onPaste={handlePaste}
        style={{ width: "100%", padding: 8 }}
      />
      {link && (
        <div style={{ marginTop: 20 }}>
          <strong>Link vừa paste:</strong>
          <p style={{ color: "blue" }}>{link}</p>
        </div>
      )}
    </div>
  );
}
