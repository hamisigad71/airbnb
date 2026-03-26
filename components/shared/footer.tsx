'use client';

import React from 'react';
import Link from 'next/link';
import LogoBadge from "@/components/shared/logo-badge";
import DeveloperSection from "@/components/landing/developer-section";
import { 
  Twitter, Instagram, Facebook, Linkedin, 
  ChevronRight, Mail, Phone, MapPin 
} from 'lucide-react';

export function Footer() {
  return (
    <footer className="sl-footer">
      <div className="sl-footer-inner">
        <div className="sl-footer-top">

          {/* Brand col */}
          <div className="sl-footer-brand">
            <div className="sl-footer-brand-name">
              <LogoBadge size={40} />
              Stay<span>Lux</span> Ke
            </div>
            <p className="sl-footer-desc">
              Your premier destination for high-end boutique stays and authentic local experiences across the globe.
            </p>
            <div className="sl-footer-socials">
              {[
                { icon: <Twitter className="w-4 h-4" />,   label: "Twitter"   },
                { icon: <Instagram className="w-4 h-4" />, label: "Instagram" },
                { icon: <Facebook className="w-4 h-4" />,  label: "Facebook"  },
                { icon: <Linkedin className="w-4 h-4" />,  label: "LinkedIn"  },
              ].map(({ icon, label }) => (
                <div key={label} className="sl-footer-social" title={label}>{icon}</div>
              ))}
            </div>
          </div>

          {/* Discover */}
          <div>
            <h4 className="sl-footer-col-title">Discover</h4>
            <div className="sl-footer-links">
              {["Home", "Top Stays", "Categories", "Gift Cards", "Experiences"].map(l => (
                <Link key={l} href="/auth/login" className="sl-footer-link">
                  <ChevronRight className="w-3 h-3" style={{ opacity: 0.4 }} />
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Company */}
          <div>
            <h4 className="sl-footer-col-title">Company</h4>
            <div className="sl-footer-links">
              {["About Us", "Careers", "Press", "Blog", "Contact"].map(l => (
                <Link key={l} href="/" className="sl-footer-link">
                  <ChevronRight className="w-3 h-3" style={{ opacity: 0.4 }} />
                  {l}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="sl-footer-col-title">Get In Touch</h4>
            <div className="sl-footer-links">
              <a href="mailto:hello@staylux.ke" className="sl-footer-link">
                <Mail className="w-3.5 h-3.5" />
                hello@staylux.ke
              </a>
              <a href="tel:+254700000000" className="sl-footer-link">
                <Phone className="w-3.5 h-3.5" />
                +254 700 000 000
              </a>
              <div className="sl-footer-link" style={{ cursor: 'default' }}>
                <MapPin className="w-3.5 h-3.5" />
                Nairobi, Kenya
              </div>
            </div>
          </div>

          {/* Operating Hours */}
          <div>
            <h4 className="sl-footer-col-title">Operating Hours</h4>
            <div style={{ padding: '12px 14px', borderRadius: 10, background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.08)' }}>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)', marginBottom: 6 }}>Mon – Fri · 8am – 10pm EAT</div>
              <div style={{ fontSize: '0.82rem', color: 'rgba(255,255,255,0.65)' }}>Sat – Sun · 9am – 8pm EAT</div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="sl-footer-bottom">
          <span>
            © {new Date().getFullYear()} StayLux Ke. All rights reserved.
          </span>
          <DeveloperSection />
          <div className="sl-footer-bottom-right">
            {["Privacy Policy", "Terms", "Cookies"].map(l => (
              <Link key={l} href="/" className="sl-footer-bottom-link">{l}</Link>
            ))}
          </div>
        </div>
      </div>

      <style jsx>{`
        .sl-footer {
          background: oklch(0.1 0.001 0); /* var(--fg) equivalent for dark theme */
          color: rgba(255,255,255,0.58);
          padding: 72px 20px 36px;
          border-top: 1px solid rgba(255,255,255,0.05);
          width: 100%;
          margin-top: 80px;
        }
        @media (min-width: 768px) { .sl-footer { padding: 80px 32px 40px; } }

        .sl-footer-inner { max-width: 1360px; margin: 0 auto; }

        .sl-footer-top {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 40px; padding-bottom: 56px;
          border-bottom: 1px solid rgba(255,255,255,0.08);
        }
        
        @media (max-width: 640px) {
          .sl-footer-brand { grid-column: span 2; }
        }

        @media (min-width: 900px) { 
          .sl-footer-top { grid-template-columns: 1.4fr 1fr 1fr 1fr 1.2fr; } 
        }

        .sl-footer-brand-name {
          display: flex; align-items: center; gap: 10px;
          font-size: 1.3rem; font-weight: 800;
          color: #fff; letter-spacing: -0.03em;
          margin-bottom: 14px;
        }

        .sl-footer-brand-name span { color: oklch(0.65 0.155 11.87); }

        .sl-footer-desc {
          font-size: 0.86rem; line-height: 1.76;
          max-width: 280px; margin-bottom: 22px;
        }

        .sl-footer-socials {
          display: flex; gap: 10px;
        }

        .sl-footer-social {
          width: 36px; height: 36px; border-radius: 9px;
          border: 1px solid rgba(255,255,255,0.12);
          background: rgba(255,255,255,0.04);
          display: flex; align-items: center; justify-content: center;
          color: rgba(255,255,255,0.55);
          transition: all 0.2s; cursor: pointer;
        }

        .sl-footer-social:hover {
          background: oklch(0.4 0.155 11.87); border-color: oklch(0.4 0.155 11.87);
          color: #fff; transform: translateY(-2px);
        }

        .sl-footer-col-title {
          font-size: 0.72rem; font-weight: 700;
          text-transform: uppercase; letter-spacing: 0.1em;
          color: rgba(255,255,255,0.85); margin-bottom: 16px;
        }

        .sl-footer-links { display: flex; flex-direction: column; gap: 10px; }

        .sl-footer-link {
          font-size: 0.86rem; color: rgba(255,255,255,0.48);
          text-decoration: none; transition: color 0.2s;
          display: flex; align-items: center; gap: 5px;
        }
        .sl-footer-link:hover { color: #fff; }

        .sl-footer-bottom {
          padding-top: 30px;
          display: flex; align-items: center;
          justify-content: space-between;
          gap: 12px; flex-wrap: wrap;
          font-size: 0.8rem;
        }

        .sl-footer-bottom-right {
          display: flex; align-items: center; gap: 20px;
        }

        .sl-footer-bottom-link {
          font-size: 0.8rem; color: rgba(255,255,255,0.35);
          text-decoration: none; transition: color 0.2s;
        }
        .sl-footer-bottom-link:hover { color: rgba(255,255,255,0.7); }
      `}</style>
    </footer>
  );
}
