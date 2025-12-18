'use client';

import SequenceSpinner from "./SequenceSpinner";

export default function LoadingSpinner() {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/25 backdrop-blur-[2px]">
      <SequenceSpinner
        images={[
          "/images/common/spinner/1.png",
          "/images/common/spinner/2.png",
          "/images/common/spinner/3.png",
          "/images/common/spinner/4.png",
          "/images/common/spinner/5.png",
          "/images/common/spinner/7.png",
          "/images/common/spinner/8.png",
        ]}
        size={64}
        duration={400}
      />
    </div>
  );
}

