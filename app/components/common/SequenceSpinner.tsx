'use client';

import Image from "next/image";
import { useEffect, useState } from "react";

interface SequenceSpinnerProps {
  images: string[];
  size?: number;
  duration?: number; // Total duration for one loop in ms
  className?: string;
}

export default function SequenceSpinner({
  images,
  size = 64,
  duration = 800,
  className = "",
}: SequenceSpinnerProps) {
  const [currentFrame, setCurrentFrame] = useState(0);

  useEffect(() => {
    if (images.length === 0) return;

    const intervalTime = duration / images.length;
    const interval = setInterval(() => {
      setCurrentFrame((prev) => (prev + 1) % images.length);
    }, intervalTime);

    return () => clearInterval(interval);
  }, [images.length, duration]);

  if (images.length === 0) return null;

  return (
    <div 
      className={`relative ${className}`} 
      style={{ width: size, height: size }}
    >
      {images.map((src, index) => (
        <Image
          key={src}
          src={src}
          alt="Loading..."
          fill
          className={`object-contain transition-opacity duration-0 ${
            index === currentFrame ? "opacity-100" : "opacity-0"
          }`}
          priority={index === 0} // Prioritize first frame
        />
      ))}
    </div>
  );
}
