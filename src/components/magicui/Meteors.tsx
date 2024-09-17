"use client";

import React, { useEffect, useState } from "react";
import clsx from "clsx";
import { Metrophobic, Nanum_Pen_Script } from "next/font/google";

interface MeteorsProps {
  number?: number;
}

export const Meteors = ({ number = 20 }: MeteorsProps) => {
  const [meteorStyles, setMeteorsStyles] = useState<Array<React.CSSProperties>>(
    []
  );

  useEffect(() => {
    const styles = [...new Array(number)].map(() => ({
      top: -5,
      left: Math.floor(Math.random() * window.innerWidth) + "px",
      animationDelay: Math.random() * 1 + 0.2 + "s",
      aniimationDuration: Math.floor(Math.random() * 8 + 2) + "s",
    }));

    setMeteorsStyles(styles);
  }, [number]);

  return (
    <>
      {[...meteorStyles].map((styles, idx) => (
        <span
          key={idx}
          className={clsx(
            "pointer-events-none absolute top-1/2 left-1/2 w-0.5 h-0.5 rotate-[215deg] animate-meteor rounded-[9999px] bg-slate-500 shadow-[0_0_0_1px_#ffffff10]"
          )}
          style={styles}
        >
          <div className="pointer-events-none absolute top-1/2 -z-10 h-[1px] w-[50px] -translate-y-1/2 bg-gradient-to-r from-slate-500 to-transparent"></div>
        </span>
      ))}
    </>
  );
};

export default Meteors;
