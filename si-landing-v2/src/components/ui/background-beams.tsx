"use client";
import React, { useMemo } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

// 고정된 랜덤 값 (렌더링마다 변경되지 않음)
const BEAM_CONFIG = [
  { y2End: 95, duration: 15, delay: 2 },
  { y2End: 97, duration: 18, delay: 5 },
  { y2End: 94, duration: 12, delay: 8 },
  { y2End: 98, duration: 20, delay: 3 },
  { y2End: 96, duration: 16, delay: 6 },
];

export const BackgroundBeams = React.memo(
  ({ className }: { className?: string }) => {
    const paths = useMemo(() => [
      "M-380 -189C-380 -189 -312 216 152 343C616 470 684 875 684 875",
      "M-373 -197C-373 -197 -305 208 159 335C623 462 691 867 691 867",
      "M-366 -205C-366 -205 -298 200 166 327C630 454 698 859 698 859",
      "M-359 -213C-359 -213 -291 192 173 319C637 446 705 851 705 851",
      "M-352 -221C-352 -221 -284 184 180 311C644 438 712 843 712 843",
    ], []);

    return (
      <div
        className={cn(
          "absolute inset-0 flex h-full w-full items-center justify-center",
          className
        )}
      >
        <svg
          className="pointer-events-none absolute z-0 h-full w-full opacity-50"
          width="100%"
          height="100%"
          viewBox="0 0 696 316"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {paths.map((path, index) => (
            <motion.path
              key={`path-${index}`}
              d={path}
              stroke={`url(#linearGradient-${index})`}
              strokeOpacity="0.4"
              strokeWidth="0.5"
            />
          ))}

          <defs>
            {paths.map((_, index) => (
              <motion.linearGradient
                id={`linearGradient-${index}`}
                key={`gradient-${index}`}
                initial={{ x1: "0%", x2: "0%", y1: "0%", y2: "0%" }}
                animate={{
                  x1: ["0%", "100%"],
                  x2: ["0%", "95%"],
                  y1: ["0%", "100%"],
                  y2: ["0%", `${BEAM_CONFIG[index].y2End}%`],
                }}
                transition={{
                  duration: BEAM_CONFIG[index].duration,
                  ease: "easeInOut",
                  repeat: Infinity,
                  delay: BEAM_CONFIG[index].delay,
                }}
              >
                <stop stopColor="#8B5CF6" stopOpacity="0" />
                <stop stopColor="#8B5CF6" />
                <stop offset="32.5%" stopColor="#A855F7" />
                <stop offset="100%" stopColor="#C084FC" stopOpacity="0" />
              </motion.linearGradient>
            ))}
          </defs>
        </svg>
      </div>
    );
  }
);

BackgroundBeams.displayName = "BackgroundBeams";
