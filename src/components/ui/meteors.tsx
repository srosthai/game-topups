import { useMemo } from 'react';
import { cn } from '../../lib/utils';

type MeteorsProps = {
  number?: number;
  className?: string;
};

export function Meteors({ number = 18, className }: MeteorsProps) {
  const meteors = useMemo(
    () =>
      Array.from({ length: number }, () => ({
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 95 - 35}%`,
        animationDelay: `${-(Math.random() * 8 + 1).toFixed(2)}s`,
        animationDuration: `${6 + Math.random() * 2.5}`,
        width: 90 + Math.floor(Math.random() * 80),
        opacity: Number((0.4 + Math.random() * 0.35).toFixed(2)),
      })),
    [number],
  );

  return (
    <div className={cn('relative h-full w-full overflow-hidden', className)}>
      <div className="pointer-events-none absolute inset-0 z-0 meteor-bg opacity-90" />
      <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden" aria-hidden="true">
        {meteors.map((meteor, index) => (
          <span
            key={index}
            className="meteor-drop"
            style={{
              left: meteor.left,
              top: meteor.top,
              animationDuration: `${meteor.animationDuration}s`,
              animationDelay: meteor.animationDelay,
              width: `${meteor.width}px`,
              opacity: meteor.opacity,
            }}
          />
        ))}
      </div>
    </div>
  );
}
