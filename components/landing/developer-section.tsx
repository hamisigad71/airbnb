'use client';

import React, { useState } from 'react';
import { Code, ChevronUp, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

export default function DeveloperSection() {
  const [creatorOpen, setCreatorOpen] = useState(false);

  return (
    <div className="ds-wrapper">
      <style>{`
        .ds-wrapper {
          position: relative;
          display: inline-flex;
          align-items: center;
        }

        .ds-btn {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          font-size: 0.72rem;
          font-weight: 600;
          border-radius: 9999px;
          transition: all 0.2s;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          color: rgba(255,255,255,0.5);
          cursor: pointer;
        }

        .ds-btn:hover {
          color: #fff;
          border-color: rgba(255,255,255,0.3);
          background: rgba(255,255,255,0.08);
          box-shadow: 0 4px 12px rgba(0,0,0,0.2);
        }

        .ds-popover {
          position: absolute;
          bottom: calc(100% + 12px);
          right: 0;
          width: 280px;
          background: #1a1a1a;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 20px;
          padding: 20px;
          box-shadow: 0 20px 50px rgba(0,0,0,0.5);
          z-index: 100;
          backdrop-filter: blur(12px);
          animation: dsPop 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards;
        }

        @keyframes dsPop {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        .ds-gradient-bar {
          height: 3px;
          margin: -20px -20px 16px -20px;
          border-radius: 20px 20px 0 0;
          background: linear-gradient(to right, oklch(0.4 0.155 11.87), oklch(0.6 0.18 30));
        }

        .ds-profile {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 16px;
        }

        .ds-avatar {
          width: 42px;
          height: 42px;
          border-radius: 50%;
          border: 2px solid rgba(255,255,255,0.1);
          object-fit: cover;
        }

        .ds-name {
          font-size: 0.88rem;
          font-weight: 700;
          color: #fff;
          line-height: 1;
        }

        .ds-title {
          font-size: 0.72rem;
          color: rgba(255,255,255,0.45);
          margin-top: 4px;
        }

        .ds-divider {
          height: 1px;
          background: rgba(255,255,255,0.08);
          margin: 16px 0;
        }

        .ds-desc {
          font-size: 0.76rem;
          line-height: 1.5;
          color: rgba(255,255,255,0.6);
          margin-bottom: 12px;
        }

        .ds-tags {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
        }

        .ds-tag {
          font-size: 0.65rem;
          font-weight: 700;
          padding: 3px 8px;
          border-radius: 999px;
          background: rgba(255,255,255,0.05);
          border: 1px solid rgba(255,255,255,0.1);
          color: rgba(255,255,255,0.8);
        }

        .ds-footer {
          display: flex;
          align-items: center;
          justify-content: space-between;
          font-size: 0.72rem;
          color: rgba(255,255,255,0.4);
        }

        .ds-heart { color: oklch(0.6 0.155 11.87); }
      `}</style>

      <button className="ds-btn" onClick={() => setCreatorOpen(!creatorOpen)}>
        <Code className="w-3.5 h-3.5" style={{ color: 'oklch(0.6 0.155 11.87)' }} />
        Built by
        {creatorOpen ? <ChevronUp className="w-3.5 h-3.5" /> : <ChevronDown className="w-3.5 h-3.5" />}
      </button>

      {creatorOpen && (
        <div className="ds-popover">
          <div className="ds-gradient-bar" />
          <div className="ds-profile">
            <img 
              src="/profile-avatar.jpg" 
              className="ds-avatar" 
              alt="Developer"
            />
            <div>
              <div className="ds-name">Daysman Gad</div>
              <div className="ds-title">Fullstack Developer</div>
            </div>
          </div>
          <div className="ds-desc">
            Crafting premium digital experiences with focus on performance and aesthetics.
          </div>
          <div className="ds-tags">
            {["Next.js", "TypeScript", "TailwindCSS"].map(t => (
              <span key={t} className="ds-tag">{t}</span>
            ))}
          </div>
          <div className="ds-divider" />
          <div className="ds-footer">
            <span>Made with <span className="ds-heart">♥</span> in Nairobi</span>
            <span className="ds-tag" style={{ border: 'none', background: 'rgba(255,255,255,0.1)' }}>v1.0.0</span>
          </div>
        </div>
      )}
    </div>
  );
}
