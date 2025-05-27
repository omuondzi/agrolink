// AnimatedProgressProvider.tsx
import React, { useEffect, useState } from "react";
import { easeQuadInOut } from "d3-ease";

interface AnimatedProgressProviderProps {
  valueStart: number;
  valueEnd: number;
  duration: number; // Duration of the animation in seconds
  easingFunction?: (t: number) => number; // Optional custom easing function
  children: (value: number) => React.ReactNode;
}

const AnimatedProgressProvider: React.FC<AnimatedProgressProviderProps> = ({
  valueStart,
  valueEnd,
  duration,
  easingFunction = easeQuadInOut,
  children,
}) => {
  const [animatedValue, setAnimatedValue] = useState<number>(valueStart);

  useEffect(() => {
    let startTimestamp: number | null = null;

    const step = (timestamp: number) => {
      if (startTimestamp === null) startTimestamp = timestamp;

      const elapsed = (timestamp - startTimestamp) / 1000; // Convert to seconds
      const progress = Math.min(elapsed / duration, 1); // Clamp between 0 and 1
      const easedProgress = easingFunction(progress);
      setAnimatedValue(valueStart + (valueEnd - valueStart) * easedProgress);

      if (elapsed < duration) {
        requestAnimationFrame(step);
      }
    };

    requestAnimationFrame(step);
  }, [valueStart, valueEnd, duration, easingFunction]);

  return <>{children(animatedValue)}</>;
};

export default AnimatedProgressProvider;
