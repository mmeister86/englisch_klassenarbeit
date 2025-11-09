"use client";

import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ProgressBarProps {
  current: number;
  max: number;
  label?: string;
  showPercentage?: boolean;
  className?: string;
}

export function ProgressBar({
  current,
  max,
  label,
  showPercentage = true,
  className
}: ProgressBarProps) {
  const percentage = max > 0 ? Math.round((current / max) * 100) : 0;

  return (
    <div className={cn("w-full", className)}>
      {label && (
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-700">{label}</span>
          {showPercentage && (
            <span className="text-sm text-gray-600">{percentage}%</span>
          )}
        </div>
      )}
      <Progress value={percentage} className="h-3" />
      {!label && showPercentage && (
        <div className="text-right text-xs text-gray-500 mt-1">
          {current} / {max}
        </div>
      )}
    </div>
  );
}

