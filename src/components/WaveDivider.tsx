import React from 'react';

interface WaveDividerProps {
  fillColor?: string;
  bgColor?: string;
  inverted?: boolean;
}

export default function WaveDivider({
  fillColor = '#14382B',
  bgColor = '#FBF7EE',
  inverted = false,
}: WaveDividerProps) {
  return (
    <div
      className="w-full overflow-hidden leading-none pointer-events-none"
      style={{ backgroundColor: bgColor }}
    >
      <svg
        viewBox="0 0 1200 120"
        preserveAspectRatio="none"
        className={`relative block w-full h-12 sm:h-16 ${inverted ? 'transform rotate-180' : ''}`}
      >
        <path
          d="M0,0 C150,90 350,-40 500,40 C650,120 900,10 1200,50 L1200,120 L0,120 Z"
          fill={fillColor}
        />
      </svg>
    </div>
  );
}
