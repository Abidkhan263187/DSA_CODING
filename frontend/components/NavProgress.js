"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";

export default function NavProgress() {
  const pathname = usePathname();
  const first = useRef(true);
  const [on, setOn] = useState(false);

  useEffect(() => {
    if (first.current) {
      first.current = false;
      return;
    }
    setOn(true);
    const done = setTimeout(() => setOn(false), 320);
    return () => clearTimeout(done);
  }, [pathname]);

  return <div className={`nav-progress ${on ? "on" : ""}`} aria-hidden="true" />;
}
