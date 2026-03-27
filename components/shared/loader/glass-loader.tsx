'use client';

import React from 'react';

export default function GlassLoader() {
  return (
    <>
      <style>{`
        .loader-scene {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: color-mix(in oklch, var(--background) 15%, transparent);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          z-index: 99999;
          overflow: hidden;
        }

        .loader-scene::before {
          content: '';
          position: absolute;
          inset: 0;
          background:
            radial-gradient(ellipse 60% 60% at 50% 40%, rgba(255,56,92,0.08) 0%, transparent 70%),
            radial-gradient(ellipse 30% 30% at 20% 80%, rgba(255,56,92,0.05) 0%, transparent 60%);
          pointer-events: none;
        }

        /* ── Background orbs ── */
        .loader-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: orbFloat var(--dur) ease-in-out infinite alternate;
        }
        .loader-orb-1 {
          width: 420px; height: 420px;
          top: -120px; left: -80px;
          background: radial-gradient(circle, rgba(255,56,92,0.1) 0%, transparent 70%);
          --dur: 7s;
        }
        .loader-orb-2 {
          width: 280px; height: 280px;
          bottom: -70px; right: -50px;
          background: radial-gradient(circle, rgba(255,56,92,0.08) 0%, transparent 70%);
          --dur: 9s;
          animation-delay: -3s;
        }
        .loader-orb-3 {
          width: 200px; height: 200px;
          top: 30%; right: 12%;
          background: radial-gradient(circle, rgba(255,56,92,0.06) 0%, transparent 70%);
          --dur: 11s;
          animation-delay: -5s;
        }

        @keyframes orbFloat {
          from { transform: translateY(0) scale(1); }
          to   { transform: translateY(-24px) scale(1.06); }
        }

        /* ── Floating particles ── */
        .loader-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 56, 92, 0.5);
          pointer-events: none;
          animation: particleRise var(--pdur) ease-in-out infinite;
          animation-delay: var(--pdelay);
        }

        @keyframes particleRise {
          0%   { opacity: 0; transform: translateY(0) scale(0.5); }
          20%  { opacity: 0.7; }
          80%  { opacity: 0.15; }
          100% { opacity: 0; transform: translateY(-90px) scale(1.3); }
        }

        /* ── Glass card ── */
        .loader-glass-card {
          position: relative;
          width: 272px;
          padding: 48px 38px 42px;
          border-radius: 30px;
          background: color-mix(in oklch, var(--card) 35%, transparent);
          backdrop-filter: blur(32px) saturate(1.8);
          -webkit-backdrop-filter: blur(32px) saturate(1.8);
          border: 1px solid color-mix(in oklch, var(--border) 60%, transparent);
          box-shadow:
            0 2px 0 rgba(255, 255, 255, 0.7) inset,
            0 -1px 0 rgba(0, 0, 0, 0.04) inset,
            0 24px 64px rgba(255, 56, 92, 0.13),
            0 6px 20px rgba(0, 0, 0, 0.07);
          display: flex;
          flex-direction: column;
          align-items: center;
          animation: cardIn 0.75s cubic-bezier(0.34, 1.56, 0.64, 1) both;
          z-index: 1;
        }

        /* Top sheen line */
        .loader-glass-card::before {
          content: '';
          position: absolute;
          top: 0; left: 14px; right: 14px;
          height: 1px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.85) 50%, transparent);
          border-radius: 100px;
        }

        /* Inner gradient sheen */
        .loader-glass-card::after {
          content: '';
          position: absolute;
          inset: 0;
          border-radius: 30px;
          background: linear-gradient(155deg, rgba(255,255,255,0.3) 0%, transparent 55%);
          pointer-events: none;
        }

        @keyframes cardIn {
          from { opacity: 0; transform: scale(0.8) translateY(24px); }
          to   { opacity: 1; transform: scale(1) translateY(0); }
        }

        /* ── Logo area ── */
        .loader-logo-wrap {
          position: relative;
          width: 92px;
          height: 92px;
          margin-bottom: 26px;
        }

        /* Spinning rings */
        .loader-ring {
          position: absolute;
          border-radius: 50%;
          border: 2px solid transparent;
          animation: loaderSpin var(--rspeed) linear infinite;
        }
        .loader-ring-1 {
          inset: -10px;
          border-top-color: rgba(255, 56, 92, 0.75);
          border-right-color: rgba(255, 56, 92, 0.22);
          --rspeed: 1.8s;
        }
        .loader-ring-2 {
          inset: -19px;
          border-width: 1.5px;
          border-bottom-color: rgba(255, 56, 92, 0.38);
          border-left-color: rgba(255, 56, 92, 0.15);
          --rspeed: 3s;
          animation-direction: reverse;
        }
        .loader-ring-3 {
          inset: -28px;
          border-width: 1px;
          border-top-color: rgba(255, 56, 92, 0.14);
          border-bottom-color: rgba(255, 56, 92, 0.2);
          --rspeed: 4.5s;
        }

        @keyframes loaderSpin {
          to { transform: rotate(360deg); }
        }

        /* Logo badge */
        .loader-logo-badge {
          width: 92px;
          height: 92px;
          border-radius: 22px;
          background: #FF385C;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          box-shadow:
            0 8px 28px rgba(255, 56, 92, 0.38),
            0 2px 8px rgba(255, 56, 92, 0.22),
            0 1px 0 rgba(255, 255, 255, 0.28) inset;
          animation: logoPulse 2.4s ease-in-out infinite;
        }

        @keyframes logoPulse {
          0%, 100% {
            box-shadow: 0 8px 28px rgba(255,56,92,0.38), 0 2px 8px rgba(255,56,92,0.22), 0 1px 0 rgba(255,255,255,0.28) inset;
            transform: scale(1);
          }
          50% {
            box-shadow: 0 14px 40px rgba(255,56,92,0.52), 0 4px 14px rgba(255,56,92,0.3), 0 1px 0 rgba(255,255,255,0.28) inset;
            transform: scale(1.045);
          }
        }

        /* ── Specular glass layers on logo badge ── */

        .loader-gloss-corner {
          position: absolute;
          top: 0; left: 0;
          width: 70%; height: 48%;
          background: linear-gradient(
            135deg,
            rgba(255,255,255,0.4) 0%,
            rgba(255,255,255,0.15) 40%,
            transparent 70%
          );
          border-radius: 22px 0 60% 0;
          pointer-events: none;
          z-index: 3;
        }

        .loader-gloss-bottom {
          position: absolute;
          bottom: 0; right: 0;
          width: 55%; height: 38%;
          background: radial-gradient(
            ellipse at 80% 90%,
            rgba(255,255,255,0.13) 0%,
            transparent 70%
          );
          pointer-events: none;
          z-index: 3;
        }

        .loader-specular-sweep {
          position: absolute;
          top: -30%;
          left: -80%;
          width: 52%;
          height: 200%;
          background: linear-gradient(
            105deg,
            transparent 0%,
            rgba(255,255,255,0.05) 28%,
            rgba(255,255,255,0.44) 47%,
            rgba(255,255,255,0.58) 50%,
            rgba(255,255,255,0.44) 53%,
            rgba(255,255,255,0.05) 72%,
            transparent 100%
          );
          transform: skewX(-12deg);
          pointer-events: none;
          z-index: 4;
          animation: specularBadgeSweep 3.8s cubic-bezier(0.4, 0, 0.2, 1) infinite;
          animation-delay: 1.2s;
        }

        @keyframes specularBadgeSweep {
          0%   { left: -80%; opacity: 0; }
          6%   { opacity: 1; }
          44%  { left: 140%; opacity: 1; }
          52%  { left: 140%; opacity: 0; }
          100% { left: 140%; opacity: 0; }
        }

        .loader-edge-top {
          position: absolute;
          top: 0; left: 10%; right: 10%;
          height: 1.5px;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.88) 50%, transparent);
          border-radius: 100px;
          pointer-events: none;
          z-index: 5;
        }

        .loader-edge-left {
          position: absolute;
          top: 10%; bottom: 32%;
          left: 0;
          width: 1.5px;
          background: linear-gradient(180deg, rgba(255,255,255,0.65), transparent);
          pointer-events: none;
          z-index: 5;
        }

        .loader-logo-badge svg {
          width: 56px;
          height: 56px;
          animation: logoWiggle 3.2s ease-in-out infinite;
          position: relative;
          z-index: 1;
        }

        @keyframes logoWiggle {
          0%, 100% { transform: rotate(0deg) scale(1); }
          18%  { transform: rotate(-4deg) scale(1.06); }
          38%  { transform: rotate(3deg) scale(1.03); }
          58%  { transform: rotate(-2deg) scale(1.05); }
          78%  { transform: rotate(1deg) scale(1.01); }
        }

        /* ── Brand text ── */
        .loader-brand-name {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 1.6rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: 0.04em;
          margin-bottom: 5px;
          animation: fadeSlideUp 0.8s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .loader-brand-name em {
          font-style: normal;
          color: #FF385C;
          font-weight: 800;
        }

        .loader-brand-tagline {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 0.72rem;
          font-weight: 500;
          color: var(--muted-foreground);
          letter-spacing: 0.14em;
          text-transform: uppercase;
          margin-bottom: 30px;
          animation: fadeSlideUp 0.8s 0.45s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        @keyframes fadeSlideUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* ── Progress ── */
        .loader-progress-wrap {
          width: 100%;
          animation: fadeSlideUp 0.8s 0.6s cubic-bezier(0.22, 1, 0.36, 1) both;
        }

        .loader-progress-track {
          height: 3px;
          border-radius: 100px;
          background: rgba(255, 56, 92, 0.12);
          overflow: hidden;
          position: relative;
          margin-bottom: 13px;
        }

        .loader-progress-fill {
          height: 100%;
          border-radius: 100px;
          background: linear-gradient(90deg, #FF385C 0%, #ff7a95 100%);
          animation: progressFill 4s cubic-bezier(0.4, 0, 0.2, 1) forwards;
          position: relative;
        }

        .loader-progress-fill::after {
          content: '';
          position: absolute;
          top: 0; left: -100%; right: 0; bottom: 0;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.55) 50%, transparent);
          animation: shimmer 1.5s linear infinite;
        }

        @keyframes progressFill {
          0%   { width: 0%; }
          100% { width: 100%; }
        }

        @keyframes shimmer {
          from { transform: translateX(0); }
          to   { transform: translateX(340%); }
        }

        .loader-status {
          font-family: var(--font-sans), system-ui, sans-serif;
          font-size: 0.78rem;
          color: var(--muted-foreground);
          font-weight: 500;
          letter-spacing: 0.04em;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 0;
        }

        .loader-dot {
          width: 3px; height: 3px;
          border-radius: 50%;
          background: #FF385C;
          display: inline-block;
          margin-left: 3px;
          animation: dotBounce 1.2s ease-in-out infinite;
        }
        .loader-dot:nth-child(3) { animation-delay: 0.18s; }
        .loader-dot:nth-child(4) { animation-delay: 0.36s; }

        @keyframes dotBounce {
          0%, 80%, 100% { transform: translateY(0); opacity: 0.35; }
          40% { transform: translateY(-4px); opacity: 1; }
        }
      `}</style>

      <div className="loader-scene">
        <div className="loader-orb loader-orb-1" />
        <div className="loader-orb loader-orb-2" />
        <div className="loader-orb loader-orb-3" />

        <div className="loader-particle" style={{ width: 5, height: 5, left: '46%', bottom: '30%', '--pdur': '3.2s', '--pdelay': '0s' } as React.CSSProperties} />
        <div className="loader-particle" style={{ width: 3, height: 3, left: '54%', bottom: '32%', '--pdur': '2.8s', '--pdelay': '-1.1s' } as React.CSSProperties} />
        <div className="loader-particle" style={{ width: 4, height: 4, left: '42%', bottom: '28%', '--pdur': '3.6s', '--pdelay': '-2s' } as React.CSSProperties} />
        <div className="loader-particle" style={{ width: 3, height: 3, left: '58%', bottom: '26%', '--pdur': '4s', '--pdelay': '-0.5s' } as React.CSSProperties} />
        <div className="loader-particle" style={{ width: 5, height: 5, left: '50%', bottom: '29%', '--pdur': '3s', '--pdelay': '-1.7s' } as React.CSSProperties} />

        <div className="loader-glass-card">
          <div className="loader-logo-wrap">
            <div className="loader-ring loader-ring-3" />
            <div className="loader-ring loader-ring-2" />
            <div className="loader-ring loader-ring-1" />
            <div className="loader-logo-badge">
              <div className="loader-gloss-corner" />
              <div className="loader-gloss-bottom" />
              <div className="loader-specular-sweep" />
              <div className="loader-edge-top" />
              <div className="loader-edge-left" />
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
          </div>

          <p className="loader-brand-name">
            Stay<em>Lux</em> KE
          </p>
          <p className="loader-brand-tagline">Your home away</p>

          <div className="loader-progress-wrap">
            <div className="loader-progress-track">
              <div className="loader-progress-fill" />
            </div>
            <div className="loader-status">
              Loading your experience
              <span className="loader-dot" />
              <span className="loader-dot" />
              <span className="loader-dot" />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
