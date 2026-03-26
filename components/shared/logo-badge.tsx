'use client';

import React from 'react';

export default function LogoBadge({ size = 92 }: { size?: number }) {
  const radius = Math.round(size * 0.24);

  return (
    <>
      <style>{`
        .logo-badge-container {
          position: relative;
          width: ${size}px;
          height: ${size}px;
          border-radius: ${Math.round(size * 0.234)}px; /* Equivalent to rx=120 on 512x512 */
          background: #FF385C;
          overflow: hidden;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow:
            0 8px 32px rgba(255, 56, 92, 0.25),
            inset 0 0 0 1px rgba(255, 255, 255, 0.1);
        }

        /* ── Static corner gloss — ambient light always present ── */
        .logo-gloss-corner {
          position: absolute;
          top: 0; left: 0;
          width: 75%; height: 50%;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.45) 0%,
            rgba(255,255,255,0.15) 45%,
            transparent 80%
          );
          pointer-events: none;
          z-index: 3;
        }

        /* ── Bottom-right bounce light ── */
        .logo-gloss-bottom {
          position: absolute;
          bottom: 0; right: 0;
          width: 50%; height: 35%;
          background: radial-gradient(
            ellipse at 85% 85%,
            rgba(255,255,255,0.18) 0%,
            transparent 75%
          );
          pointer-events: none;
          z-index: 3;
        }

        /* ── Specular sweep — the light streak ── */
        .logo-specular-sweep {
          position: absolute;
          top: -30%;
          left: -100%;
          width: 60%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent                    0%,
            rgba(255,255,255,0.02)        20%,
            rgba(255,255,255,0.48)        45%,
            rgba(255,255,255,0.65)        50%,
            rgba(255,255,255,0.48)        55%,
            rgba(255,255,255,0.02)        80%,
            transparent                   100%
          );
          transform: skewX(-15deg);
          pointer-events: none;
          z-index: 4;
          animation: specularBadgeSweep 4.5s cubic-bezier(0.4, 0, 0.2, 1) infinite;
        }

        @keyframes specularBadgeSweep {
          0%   { left: -100%; opacity: 0; }
          5%   { opacity: 1; }
          45%  { left: 150%; opacity: 1; }
          50%  { left: 150%; opacity: 0; }
          100% { left: 150%; opacity: 0; }
        }

        .logo-badge-container svg {
          position: relative;
          z-index: 2;
          width: 100%;
          height: 100%;
          padding: 8%;
        }

        @media (max-width: 640px) {
          .logo-badge-container {
            transform: scale(0.85);
            transform-origin: center;
          }
        }
        @media (max-width: 400px) {
          .logo-badge-container {
            transform: scale(0.75);
            transform-origin: center;
          }
        }
      `}</style>

      <div className="logo-badge-container">
        <div className="logo-gloss-corner" />
        <div className="logo-gloss-bottom" />
        <div className="logo-specular-sweep" />

        <svg viewBox="0 0 512 512" fill="none" xmlns="http://www.w3.org/2000/svg">
          <g transform="translate(106, 110)">
            <path
              d="M150 20L20 130H50V250H250V130H280L150 20Z"
              fill="none"
              stroke="white"
              strokeWidth="24"
              strokeLinejoin="round"
            />
            <path
              d="M150 115C150 115 135 100 120 100C105 100 95 110 95 125C95 145 150 180 150 180C150 180 205 145 205 125C205 110 195 100 180 100C165 100 150 115 150 115Z"
              fill="white"
            />
            <path
              d="M100 250C100 250 100 290 150 330C200 290 200 250 200 250"
              stroke="white"
              strokeWidth="24"
              strokeLinecap="round"
            />
            <rect x="135" y="210" width="30" height="40" rx="4" fill="white" />
          </g>
        </svg>
      </div>
    </>
  );
}
