"use client";

import { useEffect, useState } from "react";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  AlertCircle,
  Eye,
  EyeOff,
  Home,
  Users,
  Check,
  ArrowRight,
  Star,
} from "lucide-react";
import LogoBadge from "@/components/shared/logo-badge";
import { LocationSelector } from "@/components/auth/location-selector";

export default function SignupPage() {
  const router = useRouter();
  const [isMounted, setIsMounted] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    role: "guest" as "guest" | "host",
    agreeToTerms: false,
    subscribeNewsletter: false,
    country: "Kenya",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [step, setStep] = useState(1); // Multi-step form

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return <div className="min-h-screen bg-background" />;
  }

  const passwordStrength = (pwd: string) => {
    if (!pwd) return { score: 0, label: "", color: "" };
    let score = 0;
    if (pwd.length >= 8) score++;
    if (/[A-Z]/.test(pwd)) score++;
    if (/[0-9]/.test(pwd)) score++;
    if (/[^A-Za-z0-9]/.test(pwd)) score++;
    const levels = [
      { label: "Too weak", color: "#ef4444" },
      { label: "Weak", color: "#f97316" },
      { label: "Fair", color: "#eab308" },
      { label: "Strong", color: "#22c55e" },
      { label: "Very strong", color: "#16a34a" },
    ];
    return { score, ...levels[score] };
  };

  const strength = passwordStrength(formData.password);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNextStep = () => {
    if (!formData.firstName || !formData.lastName || !formData.email) {
      setError("Please fill in all required fields.");
      return;
    }
    setError("");
    setStep(2);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // DEMO MODE: Skip validation checks

    setLoading(true);
    try {
      const result = await signIn("credentials", {
        email: formData.email,
        password: formData.password,
        role: formData.role,
        country: formData.country,
        redirect: false,
      });

      if (result?.error) {
        setError("This email is already registered. Please sign in.");
      } else if (result?.ok) {
        // Redirect based on selected role
        router.push("/" + formData.role);
      }
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{`
        .signup-root {
          min-height: 100vh;
          display: grid;
          grid-template-columns: 1fr 1fr;
          font-family: var(--font-sans), sans-serif;
          background: var(--background);
          color: var(--foreground);
        }

        @media (max-width: 1024px) {
          .signup-root { grid-template-columns: 1fr; }
          .signup-panel { display: none !important; }
        }

        /* ── Left decorative panel ── */
        .signup-panel {
          position: relative;
          overflow: hidden;
          background:
            radial-gradient(circle at top left, color-mix(in oklch, var(--primary) 18%, transparent), transparent 65%),
            linear-gradient(145deg, color-mix(in oklch, var(--card) 92%, var(--background) 8%), var(--background));
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding: 3.5rem;
          border-right: 1px solid var(--border);
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
          background: radial-gradient(circle, color-mix(in oklch, var(--primary) 20%, transparent) 0%, transparent 70%);
          top: -100px; left: -100px;
          pointer-events: none;
        }

        .panel-glow-2 {
          position: absolute;
          width: 350px; height: 350px;
          border-radius: 50%;
          background: radial-gradient(circle, color-mix(in oklch, var(--primary) 14%, transparent) 0%, transparent 70%);
          bottom: 50px; right: -60px;
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
          background: var(--primary);
          border-radius: 10px;
          display: flex; align-items: center; justify-content: center;
          color: white;
          font-size: 18px;
        }

        .panel-logo-text {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.4rem;
          font-weight: 600;
          color: var(--foreground);
          letter-spacing: 0.02em;
        }

        .panel-main {
          z-index: 1;
        }

        .panel-tagline {
          font-family: var(--font-sans), sans-serif;
          font-size: clamp(2.2rem, 3.5vw, 3rem);
          font-weight: 300;
          color: var(--foreground);
          line-height: 1.25;
          margin-bottom: 1.5rem;
          letter-spacing: -0.01em;
        }

        .panel-tagline em {
          font-style: italic;
          color: var(--primary);
        }

        .panel-desc {
          font-size: 0.92rem;
          color: var(--muted-foreground);
          line-height: 1.7;
          max-width: 340px;
        }

        .panel-stats {
          display: flex;
          gap: 2rem;
          margin-top: 2.5rem;
          z-index: 1;
        }

        .stat-item {}

        .stat-number {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.8rem;
          font-weight: 600;
          color: var(--primary);
        }

        .stat-label {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.08em;
          margin-top: 2px;
        }

        .panel-testimonial {
          z-index: 1;
          border-top: 1px solid var(--border);
          padding-top: 1.5rem;
          margin-top: 1rem;
        }

        .testimonial-stars {
          display: flex; gap: 3px; margin-bottom: 0.6rem;
          color: var(--primary);
        }

        .testimonial-quote {
          font-family: var(--font-sans), sans-serif;
          font-size: 1.05rem;
          font-style: italic;
          color: var(--foreground);
          line-height: 1.6;
          margin-bottom: 0.6rem;
        }

        .testimonial-author {
          font-size: 0.78rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.08em;
        }

        /* ── Right form side ── */
        .signup-form-side {
          display: flex;
          align-items: center;
          justify-content: center;
          background: var(--background);
          padding: 2rem 1.25rem;
          overflow-y: auto;
        }

        .form-container {
          width: 100%;
          max-width: 430px;
        }

        .form-header {
          margin-bottom: 2.2rem;
        }

        .form-header-top {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 0.3rem;
        }

        .form-step-indicator {
          display: flex;
          gap: 6px;
          align-items: center;
        }

        .step-dot {
          width: 6px; height: 6px;
          border-radius: 50%;
          background: color-mix(in oklch, var(--primary) 30%, transparent);
          transition: all 0.3s;
        }

        .step-dot.active {
          width: 20px;
          border-radius: 3px;
          background: var(--primary);
        }

        .form-title {
          font-family: var(--font-sans), sans-serif;
          font-size: 2rem;
          font-weight: 500;
          color: var(--foreground);
          line-height: 1.2;
          margin-bottom: 0.4rem;
          letter-spacing: -0.01em;
        }

        .form-subtitle {
          font-size: 0.85rem;
          color: var(--muted-foreground);
        }

        /* Role cards */
        .role-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.5rem;
        }

        @media (max-width: 480px) {
          .role-cards { grid-template-columns: 1fr; }
          .fields-row { grid-template-columns: 1fr !important; }
        }

        .role-card {
          position: relative;
          padding: 1rem;
          border-radius: 10px;
          border: 1.5px solid var(--border);
          background: color-mix(in oklch, var(--card) 85%, var(--background));
          cursor: pointer;
          transition: all 0.25s;
          text-align: center;
          color: var(--muted-foreground);
        }

        .role-card:hover {
          border-color: color-mix(in oklch, var(--primary) 40%, var(--border));
          background: color-mix(in oklch, var(--primary) 10%, transparent);
          color: var(--foreground);
        }

        .role-card.selected {
          border-color: var(--primary);
          background: color-mix(in oklch, var(--primary) 16%, transparent);
          color: var(--foreground);
        }

        .role-card-icon {
          margin: 0 auto 0.5rem;
          display: flex; align-items: center; justify-content: center;
          width: 36px; height: 36px;
          border-radius: 8px;
          background: color-mix(in oklch, var(--primary) 16%, transparent);
        }

        .role-card.selected .role-card-icon {
          background: color-mix(in oklch, var(--primary) 28%, transparent);
        }

        .role-card-title {
          font-size: 0.82rem;
          font-weight: 500;
          margin-bottom: 2px;
        }

        .role-card-desc {
          font-size: 0.72rem;
          opacity: 0.6;
          line-height: 1.4;
        }

        .role-check {
          position: absolute;
          top: 8px; right: 8px;
          width: 16px; height: 16px;
          border-radius: 50%;
          background: var(--primary);
          display: flex; align-items: center; justify-content: center;
          opacity: 0;
          transform: scale(0.6);
          transition: all 0.2s;
        }

        .role-card.selected .role-check {
          opacity: 1;
          transform: scale(1);
        }

        /* Fields */
        .field-group {
          margin-bottom: 1rem;
        }

        .field-label {
          display: block;
          font-size: 0.78rem;
          font-weight: 500;
          color: var(--muted-foreground);
          margin-bottom: 6px;
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .field-label span {
          color: var(--primary);
          margin-left: 2px;
        }

        .field-input-wrapper {
          position: relative;
          width: 100%;
        }

        .field-input {
          width: 100%;
          background: color-mix(in oklch, var(--input) 75%, var(--background));
          border: 1.5px solid var(--border);
          border-radius: 8px;
          padding: 0.7rem 1rem;
          font-size: 0.9rem;
          color: var(--foreground);
          font-family: var(--font-sans), sans-serif;
          transition: border-color 0.2s, box-shadow 0.2s;
          box-sizing: border-box;
          outline: none;
          -webkit-appearance: none;
        }

        .field-input::placeholder { color: color-mix(in oklch, var(--muted-foreground) 55%, transparent); }

        .field-input:focus {
          border-color: var(--primary);
          box-shadow: 0 0 0 3px color-mix(in oklch, var(--ring) 20%, transparent);
          background: color-mix(in oklch, var(--primary) 8%, var(--input));
        }

        .field-input.with-icon { padding-right: 2.8rem; }

        .field-icon-btn {
          position: absolute;
          right: 10px;
          top: 50%; transform: translateY(-50%);
          background: none; border: none;
          color: var(--muted-foreground);
          cursor: pointer;
          display: flex; align-items: center;
          transition: color 0.2s;
          padding: 4px;
        }

        .field-icon-btn:hover { color: var(--foreground); }

        .fields-row {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1rem;
        }

        .fields-row .field-group { margin-bottom: 0; }

        /* Password strength */
        .password-strength {
          margin-top: 6px;
        }

        .strength-bars {
          display: flex; gap: 4px; margin-bottom: 3px;
        }

        .strength-bar {
          height: 3px;
          flex: 1;
          border-radius: 2px;
          background: var(--muted);
          transition: background 0.3s;
        }

        .strength-label {
          font-size: 0.72rem;
          color: var(--muted-foreground);
        }

        /* Divider */
        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 1.2rem 0;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background: var(--border);
        }

        .divider-text {
          font-size: 0.75rem;
          color: var(--muted-foreground);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        /* Social buttons */
        .social-btns {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 10px;
          margin-bottom: 1.2rem;
        }

        .social-btn {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          padding: 0.65rem;
          border-radius: 8px;
          border: 1.5px solid var(--border);
          background: color-mix(in oklch, var(--card) 90%, var(--background));
          color: var(--foreground);
          font-size: 0.82rem;
          font-family: var(--font-sans), sans-serif;
          cursor: pointer;
          transition: all 0.2s;
          font-weight: 500;
        }

        .social-btn:hover {
          border-color: color-mix(in oklch, var(--primary) 30%, var(--border));
          background: color-mix(in oklch, var(--primary) 10%, var(--card));
          color: var(--foreground);
        }

        .social-btn svg { width: 16px; height: 16px; flex-shrink: 0; }

        /* Checkbox */
        .checkbox-row {
          display: flex;
          align-items: flex-start;
          gap: 10px;
          margin-bottom: 0.8rem;
          cursor: pointer;
        }

        .custom-checkbox {
          width: 16px; height: 16px;
          min-width: 16px;
          border-radius: 4px;
          border: 1.5px solid var(--border);
          background: color-mix(in oklch, var(--input) 75%, var(--background));
          display: flex; align-items: center; justify-content: center;
          transition: all 0.2s;
          margin-top: 1px;
        }

        .custom-checkbox.checked {
          background: var(--primary);
          border-color: var(--primary);
        }

        .checkbox-text {
          font-size: 0.8rem;
          color: var(--muted-foreground);
          line-height: 1.5;
        }

        .checkbox-text a {
          color: var(--primary);
          text-decoration: none;
        }

        .checkbox-text a:hover { text-decoration: underline; }

        /* Error */
        .error-box {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 0.7rem 0.9rem;
          border-radius: 8px;
          background: rgba(239,68,68,0.1);
          border: 1px solid rgba(239,68,68,0.25);
          color: #fca5a5;
          font-size: 0.82rem;
          margin-bottom: 1rem;
        }

        /* Submit button */
        .submit-btn {
          width: 100%;
          padding: 0.85rem;
          border-radius: 8px;
          border: none;
          background: var(--primary);
          color: var(--primary-foreground);
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
          margin-bottom: 1.2rem;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          background: color-mix(in oklch, var(--primary) 85%, white);
          transform: translateY(-1px);
          box-shadow: 0 8px 25px color-mix(in oklch, var(--primary) 28%, transparent);
        }

        .submit-btn:disabled {
          opacity: 0.5;
          cursor: not-allowed;
          transform: none;
        }

        .back-btn {
          background: transparent;
          border: 1.5px solid var(--border);
          color: var(--muted-foreground);
          width: 100%;
          padding: 0.75rem;
          border-radius: 8px;
          font-family: var(--font-sans), sans-serif;
          font-size: 0.88rem;
          cursor: pointer;
          transition: all 0.2s;
          margin-bottom: 1.2rem;
        }

        .back-btn:hover {
          border-color: color-mix(in oklch, var(--primary) 30%, var(--border));
          color: var(--foreground);
        }

        .signin-link {
          text-align: center;
          font-size: 0.82rem;
          color: var(--muted-foreground);
        }

        .signin-link a {
          color: var(--primary);
          text-decoration: none;
          font-weight: 500;
        }

        .signin-link a:hover { text-decoration: underline; }

        /* Step transition */
        .step-form { animation: fadeUp 0.35s ease; }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(12px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Scrollbar */
        ::-webkit-scrollbar { width: 5px; }
        ::-webkit-scrollbar-track { background: var(--background); }
        ::-webkit-scrollbar-thumb { background: color-mix(in oklch, var(--primary) 35%, transparent); border-radius: 3px; }
      `}</style>

      <div className="signup-root" suppressHydrationWarning>
        {/* ── Left decorative panel ── */}
        <div className="signup-panel">
          <div className="panel-noise" />
          <div className="panel-glow" />
          <div className="panel-glow-2" />

          <div className="panel-logo">
            <LogoBadge size={38} />
            <span className="panel-logo-text">StayLux Ke</span>
          </div>

          <div className="panel-main">
            <h2 className="panel-tagline">
              Find your next
              <br />
              <em>perfect stay</em>
              <br />
              anywhere.
            </h2>
            <p className="panel-desc">
              Join thousands of travellers and hosts on the platform built for
              memorable experiences. Whether you're exploring the world or
              sharing your home — you belong here.
            </p>

            <div className="panel-stats">
              <div className="stat-item">
                <div className="stat-number">4.2M+</div>
                <div className="stat-label">Listings</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">190+</div>
                <div className="stat-label">Countries</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">99%</div>
                <div className="stat-label">Satisfaction</div>
              </div>
            </div>
          </div>

          <div className="panel-testimonial">
            <div className="testimonial-stars">
              {[...Array(5)].map((_, i) => (
                <Star key={i} size={12} fill="currentColor" />
              ))}
            </div>
            <p className="testimonial-quote">
              "Booked a villa in Santorini in minutes. The whole experience felt
              premium from start to finish."
            </p>
            <p className="testimonial-author">Amara K. — Guest, Nairobi</p>
          </div>
        </div>

        {/* ── Right form side ── */}
        <div className="signup-form-side">
          <div className="form-container">
            <div className="form-header">
              <div className="form-header-top">
                <div className="form-step-indicator">
                  <div className={`step-dot ${step === 1 ? "active" : ""}`} />
                  <div className={`step-dot ${step === 2 ? "active" : ""}`} />
                </div>
                <span
                  style={{
                    fontSize: "0.78rem",
                    color: "var(--muted-foreground)",
                  }}
                >
                  Step {step} of 2
                </span>
              </div>
              <h1 className="form-title">
                {step === 1 ? "Create your account" : "Secure your account"}
              </h1>
              <p className="form-subtitle">
                {step === 1
                  ? "Tell us a bit about yourself to get started."
                  : "Choose a strong password and set your preferences."}
              </p>
            </div>

            {error && (
              <div className="error-box">
                <AlertCircle size={14} style={{ flexShrink: 0 }} />
                {error}
              </div>
            )}

            {step === 1 && (
              <div className="step-form">
                {/* Social sign-up */}
                <div className="social-btns">
                  <button className="social-btn" type="button">
                    <svg
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
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
                    <svg
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.578 9.578 0 0 1 12 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.202 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z" />
                    </svg>
                    GitHub
                  </button>
                </div>

                <div className="divider">
                  <div className="divider-line" />
                  <span className="divider-text">or with email</span>
                  <div className="divider-line" />
                </div>

                {/* Name row */}
                <div className="fields-row">
                  <div className="field-group">
                    <label className="field-label">
                      First Name <span>*</span>
                    </label>
                    <input
                      className="field-input"
                      name="firstName"
                      placeholder="John"
                      value={formData.firstName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="field-group">
                    <label className="field-label">
                      Last Name <span>*</span>
                    </label>
                    <input
                      className="field-input"
                      name="lastName"
                      placeholder="Doe"
                      value={formData.lastName}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Email Address <span>*</span>
                  </label>
                  <input
                    className="field-input"
                    name="email"
                    type="email"
                    placeholder="you@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Phone Number{" "}
                    <span
                      style={{ color: "var(--muted-foreground)", marginLeft: 4 }}
                    >
                      (optional)
                    </span>
                  </label>
                  <input
                    className="field-input"
                    name="phone"
                    type="tel"
                    placeholder="+254 700 000 000"
                    value={formData.phone}
                    onChange={handleChange}
                  />
                </div>

                {/* Role selection */}
                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    className="field-label"
                    style={{ marginBottom: 10, display: "block" }}
                  >
                    I want to
                  </label>
                  <div className="role-cards">
                    {[
                      {
                        value: "guest",
                        icon: <Users size={16} color="var(--primary)" />,
                        title: "Book Stays",
                        desc: "Explore & reserve unique homes worldwide",
                      },
                      {
                        value: "host",
                        icon: <Home size={16} color="var(--primary)" />,
                        title: "Host Property",
                        desc: "List your space and earn income",
                      },
                    ].map(({ value, icon, title, desc }) => (
                      <div
                        key={value}
                        className={`role-card ${formData.role === value ? "selected" : ""}`}
                        onClick={() =>
                          setFormData((p) => ({
                            ...p,
                            role: value as "guest" | "host",
                          }))
                        }
                      >
                        <div className="role-check">
                          <Check size={9} color="white" />
                        </div>
                        <div className="role-card-icon">{icon}</div>
                        <div className="role-card-title">{title}</div>
                        <div className="role-card-desc">{desc}</div>
                      </div>
                    ))}
                  </div>
                </div>

                  <LocationSelector 
                    onValueChange={(v) => setFormData(prev => ({ ...prev, country: v }))}
                    defaultValue={formData.country}
                    className="mt-4"
                  />

                  <button
                    className="submit-btn"
                    type="button"
                    onClick={handleNextStep}
                    style={{ marginTop: "1.5rem" }}
                  >
                    Continue <ArrowRight size={18} />
                  </button>

                <p className="signin-link">
                  Already have an account?{" "}
                  <Link href="/auth/login">Sign in</Link>
                </p>
              </div>
            )}

            {step === 2 && (
              <form className="step-form" onSubmit={handleSubmit}>
                <div className="field-group">
                  <label className="field-label">
                    Password <span>*</span>
                  </label>
                  <div className="field-input-wrapper">
                    <input
                      className="field-input with-icon"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="Min. 8 characters"
                      value={formData.password}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="field-icon-btn"
                      onClick={() => setShowPassword((p) => !p)}
                    >
                      {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                    </button>
                  </div>
                  {formData.password && (
                    <div className="password-strength">
                      <div className="strength-bars">
                        {[0, 1, 2, 3].map((i) => (
                          <div
                            key={i}
                            className="strength-bar"
                            style={{
                              background:
                                i < strength.score ? strength.color : undefined,
                            }}
                          />
                        ))}
                      </div>
                      <span
                        className="strength-label"
                        style={{ color: strength.color }}
                      >
                        {strength.label}
                      </span>
                    </div>
                  )}
                </div>

                <div className="field-group">
                  <label className="field-label">
                    Confirm Password <span>*</span>
                  </label>
                  <div className="field-input-wrapper">
                    <input
                      className="field-input with-icon"
                      name="confirmPassword"
                      type={showConfirmPassword ? "text" : "password"}
                      placeholder="Repeat your password"
                      value={formData.confirmPassword}
                      onChange={handleChange}
                      required
                    />
                    <button
                      type="button"
                      className="field-icon-btn"
                      onClick={() => setShowConfirmPassword((p) => !p)}
                    >
                      {showConfirmPassword ? (
                        <EyeOff size={15} />
                      ) : (
                        <Eye size={15} />
                      )}
                    </button>
                  </div>
                </div>

                <div style={{ marginBottom: "1.2rem" }}>
                  <label
                    className="checkbox-row"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        agreeToTerms: !p.agreeToTerms,
                      }))
                    }
                  >
                    <div
                      className={`custom-checkbox ${formData.agreeToTerms ? "checked" : ""}`}
                    >
                      {formData.agreeToTerms && (
                        <Check size={10} color="white" />
                      )}
                    </div>
                    <span className="checkbox-text">
                      I agree to the{" "}
                      <a href="/terms" onClick={(e) => e.stopPropagation()}>
                        Terms of Service
                      </a>{" "}
                      and{" "}
                      <a href="/privacy" onClick={(e) => e.stopPropagation()}>
                        Privacy Policy
                      </a>{" "}
                      <span style={{ color: "var(--primary)" }}>*</span>
                    </span>
                  </label>

                  <label
                    className="checkbox-row"
                    onClick={() =>
                      setFormData((p) => ({
                        ...p,
                        subscribeNewsletter: !p.subscribeNewsletter,
                      }))
                    }
                  >
                    <div
                      className={`custom-checkbox ${formData.subscribeNewsletter ? "checked" : ""}`}
                    >
                      {formData.subscribeNewsletter && (
                        <Check size={10} color="white" />
                      )}
                    </div>
                    <span className="checkbox-text">
                      Send me travel tips, exclusive deals, and new listings by
                      email.
                    </span>
                  </label>
                </div>

                <button className="submit-btn" type="submit" disabled={loading}>
                  {loading ? "Creating your account…" : "Create Account"}
                  {!loading && <ArrowRight size={16} />}
                </button>

                <button
                  className="back-btn"
                  type="button"
                  onClick={() => {
                    setStep(1);
                    setError("");
                  }}
                >
                  ← Back to details
                </button>

                <p className="signin-link">
                  Already have an account?{" "}
                  <Link href="/auth/login">Sign in</Link>
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
