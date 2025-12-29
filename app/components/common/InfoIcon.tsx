import React from "react";

interface Props {
  className?: string;
  width?: number;
  height?: number;
  stroke?: string;
  fill?: string;
}

export default function InfoIcon({
  className,
  width = 14,
  height = 14,
  stroke = "#ccc",
  fill = "#ccc",
}: Props) {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <circle cx="12" cy="12" r="11" stroke={stroke} strokeWidth="2" />
      <path
        d="M12 7V13"
        stroke={stroke}
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="17" r="1.5" fill={fill} />
    </svg>
  );
}
