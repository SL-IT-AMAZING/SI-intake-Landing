import { ReactNode } from 'react';
import { cn } from '../../lib/utils';

interface ShinyTextProps {
  children: ReactNode;
  className?: string;
  shimmerDuration?: number;
}

export const ShinyText = ({
  children,
  className,
  shimmerDuration = 4,
}: ShinyTextProps) => {
  return (
    <span
      className={cn(
        'inline-block bg-gradient-to-r from-[#8B5CF6] via-white to-[#A855F7]',
        'bg-clip-text text-transparent',
        'animate-shimmer',
        className
      )}
      style={{
        backgroundSize: '200% 100%',
        animationDuration: `${shimmerDuration}s`,
        WebkitBackgroundClip: 'text',
        WebkitTextFillColor: 'transparent',
      }}
    >
      {children}
    </span>
  );
};
