import { useEffect, useRef, useState } from "react";

export function useStickyOnScroll<T extends HTMLElement>(offset = 30) {
  const ref = useRef<T>(null);
  const [isSticky, setIsSticky] = useState(false);
  const originalTopRef = useRef(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const measureOriginalTop = () => {
      originalTopRef.current = el!.getBoundingClientRect().top + window.scrollY;
    };

    const handleScroll = () => {
      setIsSticky(window.scrollY + offset >= originalTopRef.current);
    };

    measureOriginalTop();
    handleScroll();

    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", measureOriginalTop, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", measureOriginalTop);
    };
  }, [offset]);

  return [ref, isSticky] as const;
}
