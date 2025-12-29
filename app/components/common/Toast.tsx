import React, { useEffect, useState } from "react";

interface Props {
  message: string;
  isVisible: boolean;
  onClose?: () => void;
  duration?: number;
}

export default function Toast({
  message,
  isVisible,
  onClose,
  duration = 2000,
}: Props) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (isVisible) {
      setShow(true);
      const timer = setTimeout(() => {
        setShow(false);
        onClose?.(); // 애니메이션이 끝난 후 콜백 호출 (선택 사항)
      }, duration);

      return () => clearTimeout(timer);
    } else {
      setShow(false);
    }
  }, [isVisible, duration, onClose]);

  if (!show && !isVisible) return null;

  return (
    <div
      className={`fixed left-1/2 bottom-[100px] z-[9999] -translate-x-1/2 rounded-full bg-black/80 px-6 py-3 text-white transition-opacity duration-300 ${
        show ? "opacity-100" : "opacity-0"
      }`}
    >
      <span className="text-[14px] font-medium">{message}</span>
    </div>
  );
}
