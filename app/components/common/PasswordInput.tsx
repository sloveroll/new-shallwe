"use client";

import { useState } from "react";
import Image from "next/image";

interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

export default function PasswordInput({
  className = "",
  ...props
}: PasswordInputProps) {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <div className="relative">
      <input
        type={isPasswordVisible ? "text" : "password"}
        className={`w-full h-[50px] rounded-xl border border-[#ddd] px-4 text-[15px] pr-10 focus:outline-none focus:border-[#000] ${className}`}
        {...props}
      />
      <button
        type="button"
        onClick={() => setIsPasswordVisible(!isPasswordVisible)}
        className="absolute right-3 top-1/2 -translate-y-1/2"
      >
        <Image
          src="/images/common/ic-eye.png"
          alt="보기"
          width={20}
          height={20}
          className={isPasswordVisible ? "opacity-100" : "opacity-30"}
        />
      </button>
    </div>
  );
}
