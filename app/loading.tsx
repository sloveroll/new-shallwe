'use client';

import SequenceSpinner from "./components/common/SequenceSpinner";
import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-white">
      <SequenceSpinner
        images={[
          "/images/common/spinner/1.png",
          "/images/common/spinner/2.png",
          "/images/common/spinner/3.png",
          "/images/common/spinner/4.png",
          "/images/common/spinner/5.png",
          "/images/common/spinner/7.png", // 6 is missing in dir, checking if user fixes it
          "/images/common/spinner/8.png",
        ]}
        size={64}
        duration={400}
      />
    </div>
  );
}
