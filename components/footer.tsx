'use client';

import { useState } from 'react';
import { 
  Instagram, Twitter, Facebook, Globe, Send, 
  HelpCircle, ShieldCheck, LifeBuoy, MessageCircle, 
  BookOpen, Code, ChevronUp, ChevronDown 
} from 'lucide-react';

export function Footer() {
  const [creatorOpen, setCreatorOpen] = useState(false);

  return (
    <footer className="gd-footer">
      <div className="gd-footer-inner">
        <div className="gd-footer-top">
          {/* Brand column */}
          <div>
            <div className="gd-ft-brand-name">
              <div className="gd-ft-brand-logo">
                <svg viewBox="0 0 512 512" fill="none" width="18" height="18">
                  <g transform="translate(106, 110)">
                    <path d="M150 20L20 130H50V250H250V130H280L150 20Z" fill="none" stroke="#fff" strokeWidth="28" strokeLinejoin="round"/>
                    <path d="M150 115C150 115 135 100 120 100C105 100 95 110 95 125C95 145 150 180 150 180C150 180 205 145 205 125C205 110 195 100 180 100C165 100 150 115 150 115Z" fill="#fff"/>
                  </g>
                </svg>
              </div>
              StayLux Ke
            </div>
            <p className="gd-ft-brand-desc">
              Discover hand-picked stays across 190+ countries. From cosy city apartments to wild safari lodges — book instantly, travel better.
            </p>
            <div className="gd-ft-newsletter">
              <input placeholder="Your email address" />
              <button aria-label="Subscribe"><Send size={16} /></button>
            </div>
            <div className="gd-ft-socials">
              <a href="#" className="gd-ft-social" aria-label="Instagram"><Instagram size={16} /></a>
              <a href="#" className="gd-ft-social" aria-label="Twitter"><Twitter size={16} /></a>
              <a href="#" className="gd-ft-social" aria-label="Facebook"><Facebook size={16} /></a>
              <a href="#" className="gd-ft-social" aria-label="Globe"><Globe size={16} /></a>
            </div>
          </div>

          {/* Company */}
          <div>
            <div className="gd-ft-col-title">Company</div>
            <ul className="gd-ft-links">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Careers</a></li>
              <li><a href="#">Press</a></li>
              <li><a href="#">Blog</a></li>
              <li><a href="#">Partnerships</a></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <div className="gd-ft-col-title">Support</div>
            <ul className="gd-ft-links">
              <li><a href="#"><HelpCircle size={13} /> Help Centre</a></li>
              <li><a href="#"><ShieldCheck size={13} /> Safety Info</a></li>
              <li><a href="#"><LifeBuoy size={13} /> Cancellation Policy</a></li>
              <li><a href="#"><MessageCircle size={13} /> Contact Us</a></li>
              <li><a href="#"><BookOpen size={13} /> Accessibility</a></li>
            </ul>
          </div>

          {/* Hosting */}
          <div>
            <div className="gd-ft-col-title">Hosting</div>
            <ul className="gd-ft-links">
              <li><a href="#">List Your Property</a></li>
              <li><a href="#">Host Resources</a></li>
              <li><a href="#">Community Forum</a></li>
              <li><a href="#">Responsible Hosting</a></li>
              <li><a href="#">Insurance</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gd-footer-bottom">
          <div className="flex items-center gap-6 flex-wrap">
            <span style={{ color: '#888' }}>
              © {new Date().getFullYear()} StayLux Ke, Inc. All rights reserved.
            </span>
            <div className="gd-ft-legal">
              <a href="#">Privacy Policy</a>
              <a href="#">Terms of Service</a>
              <a href="#">Sitemap</a>
            </div>
          </div>

          {/* Developer section */}
          <div
            className="relative flex w-full justify-end md:w-auto"
            style={{ isolation: 'isolate' }}
          >
            <button
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold rounded-full transition-all duration-200 border border-border text-muted-foreground bg-card hover:text-primary hover:border-primary/40 shadow-sm"
              onClick={() => setCreatorOpen((v) => !v)}
            >
              <Code className="w-3 h-3 text-primary" />
              Built by
              {creatorOpen ? (
                <ChevronUp className="w-3 h-3 transition-transform duration-200" />
              ) : (
                <ChevronDown className="w-3 h-3 transition-transform duration-200" />
              )}
            </button>

            {creatorOpen && (
              <div 
                className="absolute bottom-full right-0 mb-4 w-72 rounded-3xl border border-border bg-card p-5 shadow-2xl z-[100]"
                style={{
                  animation: 'popIn 0.3s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards',
                  backdropFilter: 'blur(20px)',
                  background: 'rgba(255, 255, 255, 0.95)'
                }}
              >
                <div className="h-1 -mx-5 -mt-5 mb-4 rounded-t-3xl bg-gradient-to-r from-[#2B0D3E] via-[#7A3F91] to-[#C59DD9]" />

                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <img
                      src="/profile-avatar.jpg"
                      alt="Daysman Gad"
                      className="w-11 h-11 rounded-full object-cover ring-2 ring-primary/30"
                    />
                    <div>
                      <p className="text-sm font-bold leading-none text-foreground">
                        Daysman Gad
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Full-stack Developer
                      </p>
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="space-y-2.5">
                    <p className="text-xs leading-relaxed text-muted-foreground">
                      Built with precision for better housing decisions in
                      Kenya.
                    </p>
                    <div className="flex flex-wrap gap-2">
                      {["Next.js", "Prisma", "TypeScript"].map((t) => (
                        <span
                          key={t}
                          className="text-xs font-bold px-2.5 py-0.5 rounded-full border border-primary/25 bg-primary/10 text-primary"
                        >
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-border" />

                  <div className="flex items-center justify-between">
                    <p className="text-xs text-muted-foreground">
                      Made with <span className="text-primary">♥</span> in
                      Nairobi
                    </p>
                    <span className="text-xs font-bold px-3 py-1 rounded-full border border-primary/25 bg-primary/10 text-primary">
                      v1.0.0
                    </span>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      <style jsx>{`
        .gd-footer {
          background: oklch(0.96 0.003 0);
          color: #666;
          margin-top: 80px;
          border-top: 1px solid rgba(0,0,0,0.06);
        }
        .gd-footer-inner {
          max-width: 1400px;
          margin: 0 auto;
          padding: 64px 40px 24px; /* Reduced bottom padding */
        }
        .gd-footer-top {
          display: grid;
          grid-template-columns: 1.4fr repeat(3, 1fr);
          gap: 48px;
          padding-bottom: 48px;
          border-bottom: 1px solid rgba(0,0,0,0.06);
        }
        .gd-ft-brand-name {
          font-size: 1.4rem;
          font-weight: 800;
          color: #1a1a1a;
          letter-spacing: -0.02em;
          margin-bottom: 14px;
          display: flex;
          align-items: center;
          gap: 10px;
        }
        .gd-ft-brand-logo {
          width: 32px; height: 32px;
          border-radius: 8px;
          background: oklch(0.55 0.18 30);
          display: flex; align-items: center; justify-content: center;
        }
        .gd-ft-brand-desc {
          font-size: 0.84rem;
          line-height: 1.7;
          margin-bottom: 24px;
          max-width: 300px;
        }
        .gd-ft-newsletter {
          display: flex;
          border-radius: 12px;
          overflow: hidden;
          border: 1px solid rgba(0,0,0,0.08);
          background: #fff;
          max-width: 320px;
        }
        .gd-ft-newsletter input {
          flex: 1;
          padding: 12px 16px;
          background: transparent;
          border: none;
          outline: none;
          font-size: 0.82rem;
        }
        .gd-ft-newsletter button {
          padding: 12px 18px;
          background: oklch(0.55 0.18 30);
          border: none;
          color: #fff;
          cursor: pointer;
          display: flex; align-items: center; justify-content: center;
        }
        .gd-ft-col-title {
          font-size: 0.76rem;
          font-weight: 700;
          letter-spacing: 0.1em;
          text-transform: uppercase;
          color: #999;
          margin-bottom: 18px;
        }
        .gd-ft-links {
          list-style: none;
          padding: 0; margin: 0;
          display: flex; flex-direction: column;
          gap: 12px;
        }
        .gd-ft-links a {
          font-size: 0.84rem;
          color: #666;
          text-decoration: none;
          display: flex; align-items: center; gap: 6px;
          transition: 0.2s;
        }
        .gd-ft-links a:hover { color: oklch(0.55 0.18 30); padding-left: 4px; }
        .gd-ft-socials { display: flex; gap: 10px; margin-top: 20px; }
        .gd-ft-social {
          width: 38px; height: 38px;
          border-radius: 10px;
          background: #fff;
          border: 1px solid rgba(0,0,0,0.06);
          display: flex; align-items: center; justify-content: center;
          color: #666;
          transition: 0.25s;
        }
        .gd-ft-social:hover {
          background: oklch(0.55 0.18 30);
          color: #fff;
          transform: translateY(-2px);
        }
        .gd-footer-bottom {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 28px 0 12px;
          font-size: 0.78rem;
          flex-wrap: wrap;
          gap: 12px;
        }
        .gd-ft-legal { display: flex; gap: 20px; }
        .gd-ft-legal a { color: #888; text-decoration: none; }
        .gd-ft-legal a:hover { color: oklch(0.55 0.18 30); }

        @keyframes popIn {
          from { opacity: 0; transform: scale(0.95) translateY(10px); }
          to { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 1100px) {
          .gd-footer-top { grid-template-columns: 1fr 1fr; gap: 36px; }
        }
        @media (max-width: 768px) {
          .gd-footer-inner { padding: 48px 20px 100px; }
          .gd-footer-top { grid-template-columns: 1fr 1fr; gap: 32px 20px; }
          .gd-ft-brand-desc { max-width: 100%; }
        }
      `}</style>
    </footer>
  );
}
