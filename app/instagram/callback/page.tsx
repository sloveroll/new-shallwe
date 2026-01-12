"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

export default function InstagramCallbackPage() {
  const searchParams = useSearchParams();
  const [status, setStatus] = useState<"loading" | "success" | "error">(
    "loading"
  );
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const code = searchParams.get("code");
    const error = searchParams.get("error");
    const errorReason = searchParams.get("error_reason");
    const errorDescription = searchParams.get("error_description");

    if (code) {
      console.log("Instagram Auth Code:", code);
      // Success case
      setStatus("success");
      if (window.opener) {
        // Send message to parent window
        window.opener.postMessage(
          { type: "INSTAGRAM_AUTH_SUCCESS", code },
          window.location.origin
        );
        // Self close after a short delay
        setTimeout(() => {
          window.close();
        }, 500);
      }
    } else {
      // Error case
      setStatus("error");
      const msg = errorDescription || errorReason || error || "Unknown error";
      setErrorMessage(msg);
      if (window.opener) {
        window.opener.postMessage(
          { type: "INSTAGRAM_AUTH_ERROR", error: msg },
          window.location.origin
        );
        // Do not auto close on error immediately so user can see what happened
      }
    }
  }, [searchParams]);

  return (
    <div className="flex h-screen w-full flex-col items-center justify-center bg-white p-4">
      {status === "loading" && (
        <div className="text-center">
          <p className="mb-2 text-lg font-bold text-gray-800">
            Instagram 연결 중...
          </p>
          <p className="text-sm text-gray-500">잠시만 기다려주세요.</p>
        </div>
      )}

      {status === "success" && (
        <div className="text-center">
          <p className="mb-2 text-lg font-bold text-green-600">연결 성공!</p>
          <p className="text-sm text-gray-500">창이 곧 닫힙니다.</p>
        </div>
      )}

      {status === "error" && (
        <div className="text-center">
          <p className="mb-2 text-lg font-bold text-red-600">오류 발생</p>
          <p className="text-sm text-gray-700">{errorMessage}</p>
          <button
            onClick={() => window.close()}
            className="mt-4 rounded bg-gray-200 px-4 py-2 text-sm font-medium hover:bg-gray-300"
          >
            창 닫기
          </button>
        </div>
      )}
    </div>
  );
}
