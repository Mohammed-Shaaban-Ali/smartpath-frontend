import React, { useEffect, useState } from "react";

export default function useMobile() {
  const [isMobile, setIsMobile] = useState<boolean>(false);

  useEffect(() => {
    const checkIfMobile = () => {
      if (window.innerWidth <= 900) {
        setIsMobile(true);
      }
    };
    checkIfMobile();

    window.addEventListener("resize", checkIfMobile);

    return () => {
      window.removeEventListener("resize", checkIfMobile);
    };
  }, []);

  return { isMobile };
}
