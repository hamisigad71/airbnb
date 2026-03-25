"use client";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { AlertCircle, Eye, EyeOff, ArrowRight, Star, Zap, Check } from "lucide-react";
import LogoBadge from "@/components/logo-badge";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email,
        password,
        redirect: false,
      });
      if (result?.error) {
        setError("Invalid email or password. Please try again.");
      } else if (result?.ok) {
        router.push("/guest");
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleQuickLogin = async (quickEmail: string) => {
    setEmail(quickEmail);
    setPassword("password");
    setLoading(true);
    setError("");
    try {
      const result = await signIn("credentials", {
        email: quickEmail,
        password: "password",
        redirect: false,
      });
      if (result?.ok) {
        router.push("/guest");
      } else {
        setError("Quick login failed. Please try again.");
      }
    } catch {
      setError("An error occurred.");
    } finally {
      setLoading(false);
    }
  };

  const quickLogins = [
    { label: "Guest", email: "guest@example.com", icon: "🏖️" },
    { label: "Host", email: "host@example.com", icon: "🏠" },
    { label: "Admin", email: "admin@example.com", icon: "⚡" },
  ];

  return (
    <>
      <style>{`
        /* ── Brand token map ── */
        :root {
          --su-primary: var(--primary);
          --su-primary-fg: var(--primary-foreground);
          --su-primary-soft: color-mix(in oklch, var(--primary) 14%, transparent);
          --su-primary-ring: color-mix(in oklch, var(--ring) 25%, transparent);
          --su-bg: var(--background);
          --su-fg: var(--foreground);
          --su-fg-muted: var(--muted-foreground);
          --su-fg-subtle: color-mix(in oklch, var(--muted-foreground) 70%, transparent);
          --su-border: var(--border);
          --su-border-hover: color-mix(in oklch, var(--primary) 40%, var(--border));
          --su-surface: color-mix(in oklch, var(--card) 88%, var(--background));
          --su-surface-hover: color-mix(in oklch, var(--primary) 10%, var(--card));
          --su-destructive: var(--destructive);
          --su-destructive-bg: color-mix(in oklch, var(--destructive) 12%, transparent);
          --su-panel-bg: color-mix(in oklch, var(--card) 92%, var(--background));
          --su-panel-fg: var(--foreground);
          --su-panel-muted: var(--muted-foreground);
          --su-panel-subtle: color-mix(in oklch, var(--muted-foreground) 70%, transparent);
          --su-panel-border: var(--border);
          --su-panel-primary: var(--primary);
          --su-panel-soft: color-mix(in oklch, var(--primary) 20%, transparent);
        }

        /* ── Layout ── */
        .login-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: var(--font-sans), sans-serif;
          background: var(--su-bg);
          color: var(--su-fg);
        }

        @media (max-width: 1024px) {
          .login-root { grid-template-columns: 1fr; }
          .login-panel { display: none !important; }
        }

        /* ── Left panel ── */
        .login-panel {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, color-mix(in oklch, var(--su-panel-primary) 18%, transparent), transparent 65%),
            linear-gradient(145deg, var(--su-panel-bg), var(--su-bg));
          border-right: 1px solid var(--su-panel-border);
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem;
        }

        .panel-noise {
          position: absolute;
          inset: 0;
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.04'/%3E%3C/svg%3E");
          pointer-events: none;
        }

        .panel-glow {
          position: absolute;
          width: 500px; height: 500px;
          border-radius: 50%;
          background: radial-gradient(circle, var(--su-panel-soft) 0%, transparent 70%);
          top: -120px; left: -100px;
          pointer-events: none;
        }

        .panel-glow-2 {
          position: absolute;
          width: 320px; height: 320px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in oklch, var(--su-panel-primary) 14%, transparent) 0%, transparent 70%);
          bottom: 80px; right: -60px;
          pointer-events: none;
        }

        .panel-logo {
          display: flex;
          align-items: center;
          gap: 10px;
          z-index: 1;
        }

        .panel-logo-icon {
          width: 38px; height: 38px;
          background: var(--su-panel-primary);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: var(--su-primary-fg);
          font-size: 18px;
          font-weight: bold;
        }

        .panel-logo-text {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--su-panel-fg);
          letter-spacing: 0.02em;
        }

        .panel-main { z-index: 1; }

        .panel-tagline {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(2.2rem, 3.5vw, 3rem);
          font-weight: 300;
          color: var(--su-panel-fg);
          line-height: 1.25;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .panel-tagline em {
          font-style: italic;
          color: var(--su-panel-primary);
        }

        .panel-desc {
          font-size: 0.92rem;
          color: var(--su-panel-muted);
          line-height: 1.7;
          max-width: 340px;
        }

        /* Feature list */
        .panel-features {
          margin-top: 2.2rem;
          display: flex;
          flex-direction: column;
          gap: 0.85rem;
          z-index: 1;
        }

        .feature-item {
          display: flex;
          align-items: flex-start;
          gap: 10px;
        }

        .feature-dot {
          width: 20px; height: 20px;
          min-width: 20px;
          border-radius: 50%;
          background: var(--su-panel-soft);
          display: flex; align-items: center; justify-content: center;
          margin-top: 1px;
        }

        .feature-dot svg { color: var(--su-panel-primary); }

        .feature-text {
          font-size: 0.85rem;
          color: var(--su-panel-muted);
          line-height: 1.5;
        }

        .feature-text strong {
          color: var(--su-panel-fg);
          font-weight: 500;
          display: block;
          font-size: 0.88rem;
        }

        /* Stats */
        .panel-stats {
          display: flex;
          gap: 2rem;
          z-index: 1;
        }

        .stat-number {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--su-panel-primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--su-panel-subtle);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .panel-testimonial {
          z-index: 1;
          border-top: 1px solid var(--su-panel-border);
          padding-top: 1.5rem;
        }

        .testimonial-stars {
          display: flex; gap: 3px;
          margin-bottom: 0.6rem;
          color: var(--su-panel-primary);
        }

        .testimonial-quote {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--su-panel-muted);
          line-height: 1.6;
          margin-bottom: 0.6rem;
        }

        .testimonial-author {
          font-size: 0.78rem;
          color: var(--su-panel-subtle);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Right form side ── */
        .login-form-side {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--su-bg);
          padding: 2rem 1.25rem;
          overflow-y: auto;
        }

        .form-container {
          width: 100%;
          max-width: 420px;
          animation: fadeUp 0.4s ease;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(14px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        .form-header { margin-bottom: 2rem; }

        .form-eyebrow {
          font-size: 0.75rem;
          text-transform: uppercase;
          letter-spacing: 0.1em;
          color: var(--su-primary);
          font-weight: 500;
          margin-bottom: 0.5rem;
        }

        .form-title {
          font-family: var(--font-sans), sans-serif;
          font-size: 2.1rem;
          font-weight: 500;
          color: var(--su-fg);
          line-height: 1.2;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        .form-subtitle {
          font-size: 0.85rem;
          color: var(--su-fg-muted);
        }

        /* Social buttons */
        .social-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.3rem;
        }

        @media (max-width: 480px) {
          .social-btns { grid-template-columns: 1fr; }
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.65rem;
          border-radius: 8px;
          border: 1.5px solid var(--su-border);
          background: var(--su-surface);
          color: var(--su-fg-muted);
          font-size: 0.82rem;
          font-family: var(--font-sans), sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .social-btn:hover {
          border-color: var(--su-border-hover);
          background: var(--su-surface-hover);
          color: var(--su-fg);
        }

        .social-btn svg { width: 16px; height: 16px; flex-shrink: 0; }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 1.2rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--su-border);
        }

        .divider-text {
          font-size: 0.75rem;
          color: var(--su-fg-subtle);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          white-space: nowrap;
        }

        /* Fields */
        .field-group { margin-bottom: 1rem; }

        .field-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--su-fg-muted);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .field-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 6px;
        }

        .field-row .field-label { margin-bottom: 0; }

        .forgot-link {
          font-size: 0.78rem;
          color: var(--su-primary);
          text-decoration: none;
          font-weight: 500;
          transition: opacity 0.2s;
        }
        .forgot-link:hover { opacity: 0.7; text-decoration: underline; }

        .field-input-wrapper { position: relative; }

        .field-input {
          width: 100%;
          background: var(--su-surface);
          border: 1.5px solid var(--su-border);
          border-radius: 8px;
          padding: 0.72rem 1rem;
          font-size: 0.9rem;
          color: var(--su-fg);
          font-family: var(--font-sans), sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s, background 0.2s;
          box-sizing: border-box;
          outline: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder { color: var(--su-fg-subtle); }

        .field-input:focus {
          border-color: var(--su-border-hover);
          box-shadow: 0 0 0 3px var(--su-primary-ring);
          background: var(--su-surface-hover);
        }

        .field-input.with-icon { padding-right: 2.8rem; }

        .field-icon-btn {
          position: absolute;
          right: 10px;
          top: 50%; transform: translateY(-50%);
          background: none; border: none;
          color: var(--su-fg-subtle);
          cursor: pointer;
          display: flex; align-items: center;
          transition: color 0.2s;
          padding: 4px;
        }
        .field-icon-btn:hover { color: var(--su-fg-muted); }

        /* Remember me */
        .checkbox-row {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          margin-bottom: 1.3rem;
        }

        .custom-checkbox {
          width: 16px; height: 16px;
          min-width: 16px;
          border-radius: 4px;
          border: 1.5px solid var(--su-border);
          background: var(--su-surface);
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
        }

        .custom-checkbox.checked {
          background: var(--su-primary);
          border-color: var(--su-primary);
        }

        .checkbox-text {
          font-size: 0.82rem;
          color: var(--su-fg-muted);
          user-select: none;
        }

        /* Error */
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.72rem 0.9rem;
          border-radius: 8px;
          background: var(--su-destructive-bg);
          border: 1px solid color-mix(in oklch, var(--su-destructive) 35%, transparent);
          color: var(--su-destructive);
          font-size: 0.82rem;
          margin-bottom: 1rem;
        }

        /* Submit */
        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 8px;
          border: none;
          background: var(--su-primary);
          color: var(--su-primary-fg);
          font-size: 0.9rem;
          font-weight: 500;
          font-family: var(--font-sans), sans-serif;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          transition: all 0.25s;
          letter-spacing: 0.02em;
          margin-bottom: 1.3rem;
        }

        .submit-btn:hover:not(:disabled) {
          filter: brightness(1.1);
          transform: translateY(-1px);
          box-shadow: 0 8px 24px var(--su-primary-ring);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        /* Demo section */
        .demo-section {
          border: 1.5px solid var(--su-border);
          border-radius: 10px;
          overflow: hidden;
          margin-bottom: 1.3rem;
        }

        .demo-header {
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 0.65rem 0.9rem;
          background: var(--su-surface);
          border-bottom: 1px solid var(--su-border);
        }

        .demo-badge {
          display: inline-flex;
          align-items: center;
          gap: 5px;
          font-size: 0.72rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.08em;
          color: var(--su-primary);
          background: var(--su-primary-soft);
          border-radius: 4px;
          padding: 2px 7px;
        }

        .demo-title {
          font-size: 0.8rem;
          color: var(--su-fg-muted);
          font-weight: 400;
        }

        .demo-btns {
          display: flex;
          flex-direction: column;
        }

        .demo-btn {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 0.7rem 0.9rem;
          background: transparent;
          border: none;
          border-bottom: 1px solid var(--su-border);
          cursor: pointer;
          font-family: 'DM Sans', sans-serif;
          transition: background 0.18s;
          text-align: left;
          width: 100%;
          color: var(--su-fg);
        }

        .demo-btn:last-child { border-bottom: none; }
        .demo-btn:hover { background: var(--su-surface-hover); }
        .demo-btn:disabled { opacity: 0.45; cursor: not-allowed; }

        .demo-btn-emoji {
          font-size: 1rem;
          line-height: 1;
          flex-shrink: 0;
        }

        .demo-btn-info { flex: 1; }

        .demo-btn-label {
          font-size: 0.84rem;
          font-weight: 500;
          color: var(--su-fg);
          display: block;
        }

        .demo-btn-email {
          font-size: 0.75rem;
          color: var(--su-fg-subtle);
        }

        .demo-btn-arrow {
          color: var(--su-fg-subtle);
          transition: transform 0.2s, color 0.2s;
        }

        .demo-btn:hover .demo-btn-arrow {
          transform: translateX(3px);
          color: var(--su-primary);
        }

        /* Sign up link */
        .signup-link {
          text-align: center;
          font-size: 0.82rem;
          color: var(--su-fg-subtle);
        }

        .signup-link a {
          color: var(--su-primary);
          text-decoration: none;
          font-weight: 500;
        }
        .signup-link a:hover { text-decoration: underline; }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: transparent; }
        ::-webkit-scrollbar-thumb { background: var(--su-border); border-radius: 3px; }
      `}</style>

      <div className="login-root">
        {/* ── Left decorative panel ── */}
        <div className="login-panel">
          <div className="panel-noise" />
          <div className="panel-glow" />
          <div className="panel-glow-2" />

          <div className="panel-logo">
            <LogoBadge size={38} />
            <span className="panel-logo-text">StayLux Ke</span>
          </div>

          <div className="panel-main">
            <h2 className="panel-tagline">
              Welcome
              <br />
              <em>back</em> to your
              <br />
              home away.
            </h2>
            <p className="panel-desc">
              Sign in to manage your bookings, message hosts, and discover your
              next destination — all in one place.
            </p>

            <div className="panel-features">
              {[
                {
                  title: "Instant Booking",
                  desc: "Confirm stays in seconds with no back-and-forth.",
                },
                {
                  title: "Trusted Hosts",
                  desc: "Every listing is verified for quality and safety.",
                },
                {
                  title: "24/7 Support",
                  desc: "Our team is always on hand wherever you are.",
                },
              ].map(({ title, desc }) => (
                <div className="feature-item" key={title}>
                  <div className="feature-dot">
                    <Check size={11} />
                  </div>
                  <p className="feature-text">
                    <strong>{title}</strong>
                    {desc}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="panel-stats" style={{ marginBottom: "1.5rem" }}>
              {[
                { number: "4.2M+", label: "Listings" },
                { number: "190+", label: "Countries" },
                { number: "99%", label: "Satisfaction" },
              ].map(({ number, label }) => (
                <div key={label}>
                  <div className="stat-number">{number}</div>
                  <div className="stat-label">{label}</div>
                </div>
              ))}
            </div>

            <div className="panel-testimonial">
              <div className="testimonial-stars">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={12} fill="currentColor" />
                ))}
              </div>
              <p className="testimonial-quote">
                "I've used dozens of platforms — nothing comes close to the
                experience here. Like having a personal concierge."
              </p>
              <p className="testimonial-author">Daniel M. — Host, Nairobi</p>
            </div>
          </div>
        </div>

        {/* ── Right form side ── */}
        <div className="login-form-side">
          <div className="form-container">
            <div className="form-header">
              <p className="form-eyebrow">Welcome back</p>
              <h1 className="form-title">
                Sign in to
                <br />
                your account
              </h1>
              <p className="form-subtitle">
                Don't have one?{" "}
                <Link
                  href="/auth/signup"
                  style={{
                    color: "var(--su-primary)",
                    textDecoration: "none",
                    fontWeight: 500,
                  }}
                >
                  Create a free account →
                </Link>
              </p>
            </div>

            {/* Social sign-in */}
            <div className="social-btns">
              <button className="social-btn" type="button">
                <svg viewBox="0 0 24 24" fill="none">
                  <path
                    d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                    fill="#4285F4"
                  />
                  <path
                    d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                    fill="#34A853"
                  />
                  <path
                    d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                    fill="#FBBC05"
                  />
                  <path
                    d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                    fill="#EA4335"
                  />
                </svg>
                Google
              </button>
              <button className="social-btn" type="button">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                </svg>
                GitHub
              </button>
            </div>

            <div className="divider">
              <div className="divider-line" />
              <span className="divider-text">or sign in with email</span>
              <div className="divider-line" />
            </div>

            {error && (
              <div className="error-box">
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="field-group">
                <label className="field-label">Email Address</label>
                <input
                  className="field-input"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  autoComplete="email"
                />
              </div>

              <div className="field-group">
                <div className="field-row">
                  <label className="field-label">Password</label>
                  <Link href="/auth/forgot-password" className="forgot-link">
                    Forgot password?
                  </Link>
                </div>
                <div className="field-input-wrapper">
                  <input
                    className="field-input with-icon"
                    type={showPassword ? "text" : "password"}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    className="field-icon-btn"
                    onClick={() => setShowPassword((p) => !p)}
                    aria-label={
                      showPassword ? "Hide password" : "Show password"
                    }
                  >
                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                  </button>
                </div>
              </div>

              <label
                className="checkbox-row"
                onClick={() => setRememberMe((p) => !p)}
              >
                <div
                  className={`custom-checkbox ${rememberMe ? "checked" : ""}`}
                >
                  {rememberMe && <Check size={10} color="white" />}
                </div>
                <span className="checkbox-text">
                  Keep me signed in for 30 days
                </span>
              </label>

              <button className="submit-btn" type="submit" disabled={loading}>
                {loading ? "Signing in…" : "Sign In"}
                {!loading && <ArrowRight size={16} />}
              </button>
            </form>

            {/* Demo quick-login */}
            <div className="demo-section">
              <div className="demo-header">
                <span className="demo-badge">
                  <Zap size={10} />
                  Demo
                </span>
                <span className="demo-title">
                  Quick login — no password needed
                </span>
              </div>
              <div className="demo-btns">
                {quickLogins.map(({ label, email: qEmail, icon }) => (
                  <button
                    key={label}
                    className="demo-btn"
                    type="button"
                    onClick={() => handleQuickLogin(qEmail)}
                    disabled={loading}
                  >
                    <span className="demo-btn-emoji">{icon}</span>
                    <span className="demo-btn-info">
                      <span className="demo-btn-label">
                        Continue as {label}
                      </span>
                      <span className="demo-btn-email">{qEmail}</span>
                    </span>
                    <ArrowRight size={14} className="demo-btn-arrow" />
                  </button>
                ))}
              </div>
            </div>

            <p className="signup-link">
              New to StayLux Ke?{" "}
              <Link href="/auth/signup">Create a free account</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
