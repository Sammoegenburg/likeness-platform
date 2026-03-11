"use client";

interface CompletenessRingProps {
  percent: number;
  size?: number;
  strokeWidth?: number;
  showLabel?: boolean;
}

export function CompletenessRing({ percent, size = 80, strokeWidth = 6, showLabel = true }: CompletenessRingProps) {
  const radius = (size - strokeWidth) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference - (percent / 100) * circumference;

  const color = percent >= 90 ? "#22c55e" : percent >= 60 ? "#0066FF" : percent >= 30 ? "#f59e0b" : "#ef4444";

  return (
    <div className="relative inline-flex items-center justify-center" style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke="#27272a"
          strokeWidth={strokeWidth}
        />
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          fill="none"
          stroke={color}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 0.6s ease" }}
        />
      </svg>
      {showLabel && (
        <span className="absolute text-sm font-semibold text-zinc-200">
          {percent}%
        </span>
      )}
    </div>
  );
}
