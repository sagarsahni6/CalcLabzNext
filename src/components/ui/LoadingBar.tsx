'use client';

import { useEffect, useState, useRef } from 'react';
import { usePathname } from 'next/navigation';

export default function LoadingBar() {
  const pathname = usePathname();
  const [progress, setProgress] = useState(0);
  const [visible, setVisible] = useState(false);
  const prevPath = useRef(pathname);

  useEffect(() => {
    if (pathname !== prevPath.current) {
      // Route changed — animate progress bar
      setVisible(true);
      setProgress(30);

      const t1 = setTimeout(() => setProgress(60), 100);
      const t2 = setTimeout(() => setProgress(90), 200);
      const t3 = setTimeout(() => setProgress(100), 350);
      const t4 = setTimeout(() => {
        setVisible(false);
        setProgress(0);
      }, 500);

      prevPath.current = pathname;
      return () => {
        clearTimeout(t1);
        clearTimeout(t2);
        clearTimeout(t3);
        clearTimeout(t4);
      };
    }
  }, [pathname]);

  if (!visible && progress === 0) return null;

  return (
    <div
      className="loading-bar"
      style={{
        transform: `scaleX(${progress / 100})`,
        opacity: visible ? 1 : 0,
      }}
    />
  );
}
