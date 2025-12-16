import Image from "next/image";

export default function Loading() {
  return (
    <div className="flex h-[100dvh] w-full flex-col items-center justify-center bg-white">
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
