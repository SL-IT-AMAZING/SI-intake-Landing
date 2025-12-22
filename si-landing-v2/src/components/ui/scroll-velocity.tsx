import { motion, useAnimationFrame, useMotionValue } from 'framer-motion';
import { ReactNode, useRef, Children } from 'react';
import { cn } from '../../lib/utils';

interface ScrollVelocityProps {
  children: ReactNode;
  velocity?: number;
  className?: string;
  itemGap?: string;
}

export const ScrollVelocity = ({
  children,
  velocity = 20,
  className,
  itemGap = 'gap-16',
}: ScrollVelocityProps) => {
  const baseX = useMotionValue(0);
  const ref = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  const childArray = Children.toArray(children);
  // Duplicate children 3x for seamless loop
  const duplicatedChildren = [...childArray, ...childArray, ...childArray];

  useAnimationFrame((_t, delta) => {
    if (isPaused.current || !ref.current) return;

    let moveBy = (velocity / 1000) * delta;
    baseX.set(baseX.get() + moveBy);

    // Reset position for infinite loop
    const containerWidth = ref.current.scrollWidth / 3;
    if (Math.abs(baseX.get()) > containerWidth) {
      baseX.set(0);
    }
  });

  return (
    <div
      className={cn('overflow-hidden', className)}
      onMouseEnter={() => (isPaused.current = true)}
      onMouseLeave={() => (isPaused.current = false)}
    >
      <motion.div ref={ref} className={cn('flex', itemGap)} style={{ x: baseX }}>
        {duplicatedChildren.map((child, idx) => (
          <div key={idx} className="flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>
    </div>
  );
};
