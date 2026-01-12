"use client";

import { useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";

// Separate component to use useSearchParams inside Suspense
function CallbackContent() {
  const searchParams = useSearchParams();

  useEffect(() => {
    // Check if running in a popup/new window
    if (window.opener) {
      const code = searchParams.get("code");
      const error = searchParams.get("error");

      if (code) {
        // Send success message to the main window
        window.opener.postMessage(
          { type: "YOUTUBE_AUTH_SUCCESS", code },
          window.location.origin
        );
      } else if (error) {
        // Send error message
        window.opener.postMessage(
          { type: "YOUTUBE_AUTH_ERROR", error },
          window.location.origin
        );
      } else {
        // No code or error?
      }

      // Close the popup after a short delay
      setTimeout(() => {
        window.close();
      }, 500);
    }
  }, [searchParams]);

  return (
    <div className="flex min-h-screen flex-col items-center justify-center p-4">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold">YouTube 연결 중...</h2>
        <p className="text-gray-500">잠시만 기다려주세요.</p>
        <div className="mt-4 flex justify-center">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-300 border-t-blue-600" />
        </div>
      </div>
    </div>
  );
}

export default function YoutubeCallbackPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CallbackContent />
    </Suspense>
  );
}
