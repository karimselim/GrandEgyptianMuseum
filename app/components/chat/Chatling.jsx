// components/ChatlingWidget.jsx
"use client";
import Script from "next/script";

export default function ChatlingWidget() {
  return (
    <>
      <div id="chatling-inline-bot"></div>

      <Script
        id="chatling-embed-script"
        src="https://chatling.ai/js/embed.js"
        data-id="5453233342"
        strategy="afterInteractive"
      />
    </>
  );
}
