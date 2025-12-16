'use client';

import Image from "next/image";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
      <div className="relative h-16 w-16 animate-spin">
        <Image
          src="/images/common/ic-lookinglogo.png"
          alt="Loading..."
          fill
          className="object-contain"
          priority
        />
      </div>
    </div>
  );
}

