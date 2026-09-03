import React, { useState, useEffect } from "react";

const COLORS = {
  cream: "#FFF3E2",
  ink: "#171310",
  coral: "#FF4F3C",
  blue: "#3552FF",
  mustard: "#FFC845",
  white: "#FFFFFF",
  gray: "#7a7268",
  lightGray: "#F3ECE0",
  green: "#10B981",
};

const API_BASE = import.meta.env.VITE_API_URL || "http://localhost:5000";

function GhostButton({ children, onClick, style = {}, type = "button", ...props }) {
  const [hover, setHover] = useState(false);
  return (
    <button
      type={type}
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        border: `3px solid ${COLORS.ink}`,
        background: COLORS.white,
        padding: "10px 18px",
        borderRadius: 40,
        cursor: "pointer",
        boxShadow: hover ? `5px 5px 0 ${COLORS.ink}` : `3px 3px 0 ${COLORS.ink}`,
        transform: hover ? "translate(-2px, -2px)" : "translate(0, 0)",
        color: COLORS.ink,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "transform .12s ease, box-shadow .12s ease, background .12s ease",
        ...style,
      }}
      {...props}
    >
      {children}
    </button>
  );
}

export default function LoginPage({ onBack, onSuccess }) {
  const [mode, setMode] = useState("login"); // 'login' | 'signup'
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  // Check if a user is already logged in
  useEffect(() => {
    try {
      const stored = localStorage.getItem("ithenthina_user");
      if (stored) {
        setCurrentUser(JSON.parse(stored));
      }
    } catch (e) {
      console.error("Failed to parse stored user", e);
    }
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccessMsg("");

    if (!formData.email.trim() || !formData.password) {
      setError("Please fill in all required fields.");
      return;
    }

    if (mode === "signup" && !formData.name.trim()) {
      setError("Please provide your inventor name.");
      return;
    }

    if (mode === "signup" && formData.password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    setLoading(true);

    try {
      const endpoint = mode === "signup" ? "/api/auth/signup" : "/api/auth/login";
      const payload =
        mode === "signup"
          ? {
              name: formData.name.trim(),
              email: formData.email.trim(),
              password: formData.password,
            }
          : {
              email: formData.email.trim(),
              password: formData.password,
            };

      const res = await fetch(`${API_BASE}${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok || !data.success) {
        throw new Error(data.message || "Authentication failed. Please check your credentials.");
      }

      // Store auth tokens and user profile
      if (data.token) {
        localStorage.setItem("ithenthina_token", data.token);
      }
      if (data.user) {
        localStorage.setItem("ithenthina_user", JSON.stringify(data.user));
        setCurrentUser(data.user);
      }

      setSuccessMsg(
        mode === "signup"
          ? "Account created successfully! Welcome to the lab."
          : `Welcome back, ${data.user?.name || "Inventor"}!`
      );

      // Redirect back or trigger callback after short delay
      setTimeout(() => {
        if (onSuccess) {
          onSuccess(data.user);
        } else if (onBack) {
          onBack();
        }
      }, 1200);
    } catch (err) {
      setError(err.message || "An unexpected error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("ithenthina_token");
    localStorage.removeItem("ithenthina_user");
    setCurrentUser(null);
    setSuccessMsg("Logged out successfully.");
    setTimeout(() => setSuccessMsg(""), 2500);
  };

  return (
    <div
      style={{
        background: COLORS.cream,
        backgroundImage: "radial-gradient(rgba(23,19,16,0.16) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        backgroundPosition: "-10px -10px",
        color: COLORS.ink,
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        position: "relative",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes floatPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }
        @keyframes popCard {
          0% { transform: scale(0.96) translateY(12px); opacity: 0; }
          100% { transform: scale(1) translateY(0); opacity: 1; }
        }

        .auth-input:focus {
          outline: none;
          border-color: ${COLORS.blue} !important;
          box-shadow: 4px 4px 0 ${COLORS.blue} !important;
        }
      `}</style>

      {/* BACKGROUND FLOATING DOODLES (MATCHING LANDING PAGE PALETTE) */}
      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 140,
          left: "4%",
          zIndex: 1,
          animation: "floatGentle 5s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke={COLORS.ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <path
            d="M50 14c-14 0-24 10-24 23 0 9 5 15 10 20 3 3 4 6 4 10h20c0-4 1-7 4-10 5-5 10-11 10-20 0-13-10-23-24-23Z"
            fill={COLORS.mustard}
            fillOpacity="0.4"
          />
          <path d="M42 76h16" />
          <path d="M44 86h12" />
          <path d="M50 4v6M24 18l-5-5M76 18l5-5M14 38h-6M92 38h-6" strokeWidth="3" />
        </svg>
      </div>

      <div
        className="hidden md:block"
        style={{
          position: "absolute",
          top: 220,
          right: "5%",
          zIndex: 1,
          animation: "floatPulse 4.8s ease-in-out infinite",
          pointerEvents: "none",
        }}
      >
        <svg width="56" height="56" viewBox="0 0 100 100" fill="none" stroke={COLORS.ink} strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="50" cy="50" r="36" fill={COLORS.coral} fillOpacity="0.2" strokeWidth="3.2" />
          <path d="M38 34 C38 23 62 21 62 35 C62 45 49 48 49 59" strokeWidth="4.5" />
          <circle cx="49" cy="70" r="4.2" fill={COLORS.ink} />
        </svg>
      </div>

      {/* TOP NAVIGATION */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "20px 24px",
          maxWidth: 1200,
          width: "100%",
          margin: "0 auto",
          position: "relative",
          zIndex: 10,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <GhostButton onClick={onBack}>
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.5">
              <path d="M19 12H5M12 19l-7-7 7-7" />
            </svg>
            Back to Home
          </GhostButton>

          <div
            onClick={onBack}
            style={{
              fontFamily: "'Bungee', cursive",
              fontSize: 20,
              cursor: "pointer",
              userSelect: "none",
            }}
          >
            ITHENTHINA<span style={{ color: COLORS.coral }}>?</span>
          </div>
        </div>

        <div
          style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: 13,
            background: COLORS.white,
            border: `2.5px solid ${COLORS.ink}`,
            borderRadius: 30,
            padding: "6px 14px",
            boxShadow: `3px 3px 0 ${COLORS.ink}`,
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              backgroundColor: currentUser ? COLORS.green : COLORS.coral,
              display: "inline-block",
            }}
          />
          {currentUser ? currentUser.name : "Guest Mode"}
        </div>
      </nav>

      {/* MAIN AUTH SECTION */}
      <main
        style={{
          flex: 1,
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          padding: "24px 16px 60px",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div
          style={{
            width: "100%",
            maxWidth: 460,
            background: COLORS.white,
            border: `3.5px solid ${COLORS.ink}`,
            borderRadius: 24,
            padding: "36px 30px",
            boxShadow: `8px 8px 0 ${COLORS.ink}`,
            position: "relative",
            animation: "popCard 0.25s cubic-bezier(0.34, 1.56, 0.64, 1)",
          }}
        >
          {/* TOP PLAYFUL BADGE */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              background: COLORS.mustard,
              color: COLORS.ink,
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: 0.5,
              padding: "6px 12px",
              border: `2.5px solid ${COLORS.ink}`,
              borderRadius: 30,
              transform: "rotate(-2deg)",
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              marginBottom: 16,
            }}
          >
            <span>🔐</span>
            <span>IDENTITY VERIFICATION LAB</span>
          </div>

          {/* IF CURRENTLY LOGGED IN: SHOW ACTIVE PROFILE CARD */}
          {currentUser ? (
            <div>
              <h1
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 26,
                  margin: "0 0 10px",
                  lineHeight: 1.1,
                }}
              >
                YOU'RE LOGGED IN<span style={{ color: COLORS.coral }}>!</span>
              </h1>
              <p style={{ fontSize: 14, color: COLORS.gray, marginBottom: 24, fontWeight: 500 }}>
                You are currently authenticated as an official inventor of bad ideas.
              </p>

              <div
                style={{
                  background: COLORS.cream,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 16,
                  padding: "16px",
                  marginBottom: 24,
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                }}
              >
                <div style={{ fontSize: 12, fontWeight: 700, color: COLORS.gray, textTransform: "uppercase" }}>
                  Active Inventor
                </div>
                <div style={{ fontSize: 18, fontWeight: 700, marginTop: 4 }}>
                  {currentUser.name}
                </div>
                <div style={{ fontSize: 13, color: COLORS.gray, marginTop: 2 }}>
                  {currentUser.email}
                </div>
              </div>

              {successMsg && (
                <div
                  style={{
                    background: "#DCFCE7",
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 12,
                    padding: "12px 14px",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#166534",
                    marginBottom: 20,
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  {successMsg}
                </div>
              )}

              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <button
                  type="button"
                  onClick={onBack}
                  style={{
                    fontFamily: "'Bungee', cursive",
                    fontSize: 16,
                    border: `3px solid ${COLORS.ink}`,
                    background: COLORS.coral,
                    color: COLORS.white,
                    padding: "14px 20px",
                    borderRadius: 50,
                    cursor: "pointer",
                    boxShadow: `5px 5px 0 ${COLORS.ink}`,
                    letterSpacing: 0.5,
                    transition: "transform .12s ease, box-shadow .12s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-2px, -2px)";
                    e.currentTarget.style.boxShadow = `7px 7px 0 ${COLORS.ink}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = `5px 5px 0 ${COLORS.ink}`;
                  }}
                >
                  CONTINUE TO LAB
                </button>

                <button
                  type="button"
                  onClick={handleLogout}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    border: `2.5px solid ${COLORS.ink}`,
                    background: COLORS.white,
                    color: COLORS.ink,
                    padding: "11px 18px",
                    borderRadius: 50,
                    cursor: "pointer",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                    transition: "transform .12s ease, box-shadow .12s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "translate(-1px, -1px)";
                    e.currentTarget.style.boxShadow = `5px 5px 0 ${COLORS.ink}`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "translate(0, 0)";
                    e.currentTarget.style.boxShadow = `3px 3px 0 ${COLORS.ink}`;
                  }}
                >
                  Log Out / Switch Account
                </button>
              </div>
            </div>
          ) : (
            <div>
              {/* HEADER TITLE */}
              <h1
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 28,
                  margin: "0 0 6px",
                  lineHeight: 1.1,
                }}
              >
                {mode === "login" ? "WELCOME BACK" : "JOIN THE CHAOS"}
                <span style={{ color: COLORS.coral }}>!</span>
              </h1>
              <p
                style={{
                  fontSize: 14,
                  color: "#4b443c",
                  marginBottom: 20,
                  fontWeight: 500,
                  lineHeight: 1.4,
                }}
              >
                {mode === "login"
                  ? "Log in to view saved inventions and track your useless patents."
                  : "Register an inventor profile to stamp your name on disastrous gadgets."}
              </p>

              {/* TOGGLE TABS (LOGIN / SIGN UP) */}
              <div
                style={{
                  display: "flex",
                  background: COLORS.cream,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 14,
                  padding: 4,
                  marginBottom: 22,
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                }}
              >
                <button
                  type="button"
                  onClick={() => {
                    setMode("login");
                    setError("");
                    setSuccessMsg("");
                  }}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    border: "none",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: mode === "login" ? COLORS.white : "transparent",
                    color: COLORS.ink,
                    boxShadow: mode === "login" ? `2px 2px 0 ${COLORS.ink}` : "none",
                    borderStyle: mode === "login" ? "solid" : "none",
                    borderWidth: mode === "login" ? "2px" : "0",
                    borderColor: COLORS.ink,
                    transition: "all .12s ease",
                  }}
                >
                  Log In
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setMode("signup");
                    setError("");
                    setSuccessMsg("");
                  }}
                  style={{
                    flex: 1,
                    padding: "8px 0",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 13,
                    border: "none",
                    borderRadius: 10,
                    cursor: "pointer",
                    background: mode === "signup" ? COLORS.white : "transparent",
                    color: COLORS.ink,
                    boxShadow: mode === "signup" ? `2px 2px 0 ${COLORS.ink}` : "none",
                    borderStyle: mode === "signup" ? "solid" : "none",
                    borderWidth: mode === "signup" ? "2px" : "0",
                    borderColor: COLORS.ink,
                    transition: "all .12s ease",
                  }}
                >
                  Sign Up
                </button>
              </div>

              {/* ERROR ALERT BANNER */}
              {error && (
                <div
                  style={{
                    background: "#FEE2E2",
                    border: `2.5px solid ${COLORS.coral}`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#991B1B",
                    marginBottom: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <span style={{ fontSize: 16 }}>⚠️</span>
                  <span>{error}</span>
                </div>
              )}

              {/* SUCCESS ALERT BANNER */}
              {successMsg && (
                <div
                  style={{
                    background: "#DCFCE7",
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 12,
                    padding: "10px 14px",
                    fontWeight: 600,
                    fontSize: 13,
                    color: "#166534",
                    marginBottom: 18,
                    display: "flex",
                    alignItems: "center",
                    gap: 8,
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <span style={{ fontSize: 16 }}>🎉</span>
                  <span>{successMsg}</span>
                </div>
              )}

              {/* AUTH FORM */}
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {mode === "signup" && (
                  <div>
                    <label
                      htmlFor="inventor-name"
                      style={{
                        display: "block",
                        fontSize: 13,
                        fontWeight: 700,
                        marginBottom: 6,
                        color: COLORS.ink,
                      }}
                    >
                      Inventor Name
                    </label>
                    <input
                      id="inventor-name"
                      name="name"
                      type="text"
                      placeholder="Professor Nonsense"
                      value={formData.name}
                      onChange={handleChange}
                      disabled={loading}
                      className="auth-input"
                      style={{
                        width: "100%",
                        padding: "12px 16px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        border: `2.5px solid ${COLORS.ink}`,
                        borderRadius: 12,
                        background: COLORS.white,
                        color: COLORS.ink,
                        boxShadow: `3px 3px 0 ${COLORS.ink}`,
                        transition: "all .12s ease",
                      }}
                    />
                  </div>
                )}

                <div>
                  <label
                    htmlFor="inventor-email"
                    style={{
                      display: "block",
                      fontSize: 13,
                      fontWeight: 700,
                      marginBottom: 6,
                      color: COLORS.ink,
                    }}
                  >
                    Email Address
                  </label>
                  <input
                    id="inventor-email"
                    name="email"
                    type="email"
                    placeholder="inventor@uselesslab.com"
                    value={formData.email}
                    onChange={handleChange}
                    disabled={loading}
                    className="auth-input"
                    style={{
                      width: "100%",
                      padding: "12px 16px",
                      fontFamily: "'Space Grotesk', sans-serif",
                      fontSize: 14,
                      fontWeight: 600,
                      border: `2.5px solid ${COLORS.ink}`,
                      borderRadius: 12,
                      background: COLORS.white,
                      color: COLORS.ink,
                      boxShadow: `3px 3px 0 ${COLORS.ink}`,
                      transition: "all .12s ease",
                    }}
                  />
                </div>

                <div>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <label
                      htmlFor="inventor-password"
                      style={{
                        fontSize: 13,
                        fontWeight: 700,
                        color: COLORS.ink,
                      }}
                    >
                      Password
                    </label>
                    {mode === "login" && (
                      <span
                        title="Good luck, we probably forgot it too!"
                        style={{
                          fontSize: 11,
                          fontWeight: 600,
                          color: COLORS.gray,
                          cursor: "help",
                          textDecoration: "underline dotted",
                        }}
                      >
                        Forgot password?
                      </span>
                    )}
                  </div>
                  <div style={{ position: "relative" }}>
                    <input
                      id="inventor-password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      placeholder="••••••••"
                      value={formData.password}
                      onChange={handleChange}
                      disabled={loading}
                      className="auth-input"
                      style={{
                        width: "100%",
                        padding: "12px 42px 12px 16px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 14,
                        fontWeight: 600,
                        border: `2.5px solid ${COLORS.ink}`,
                        borderRadius: 12,
                        background: COLORS.white,
                        color: COLORS.ink,
                        boxShadow: `3px 3px 0 ${COLORS.ink}`,
                        transition: "all .12s ease",
                      }}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      style={{
                        position: "absolute",
                        right: 12,
                        top: "50%",
                        transform: "translateY(-50%)",
                        background: "none",
                        border: "none",
                        cursor: "pointer",
                        color: COLORS.gray,
                        padding: 4,
                        display: "flex",
                        alignItems: "center",
                      }}
                      title={showPassword ? "Hide password" : "Show password"}
                    >
                      {showPassword ? (
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
                          <line x1="1" y1="1" x2="23" y2="23" />
                        </svg>
                      ) : (
                        <svg viewBox="0 0 24 24" width={18} height={18} fill="none" stroke="currentColor" strokeWidth="2.2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                          <circle cx="12" cy="12" r="3" />
                        </svg>
                      )}
                    </button>
                  </div>
                  {mode === "signup" && (
                    <div style={{ fontSize: 11, color: COLORS.gray, marginTop: 4, fontWeight: 500 }}>
                      Minimum 6 characters. No actual security secrets required.
                    </div>
                  )}
                </div>

                {/* SUBMIT BUTTON */}
                <button
                  type="submit"
                  disabled={loading}
                  style={{
                    marginTop: 8,
                    fontFamily: "'Bungee', cursive",
                    fontSize: 17,
                    letterSpacing: 1,
                    border: `3.5px solid ${COLORS.ink}`,
                    background: loading ? COLORS.gray : COLORS.coral,
                    color: COLORS.white,
                    padding: "16px 20px",
                    borderRadius: 50,
                    cursor: loading ? "not-allowed" : "pointer",
                    boxShadow: loading ? "none" : `5px 5px 0 ${COLORS.ink}`,
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: 10,
                    transition: "transform .12s ease, box-shadow .12s ease, background .12s ease",
                  }}
                  onMouseEnter={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translate(-2px, -2px)";
                      e.currentTarget.style.boxShadow = `7px 7px 0 ${COLORS.ink}`;
                      e.currentTarget.style.background = COLORS.mustard;
                      e.currentTarget.style.color = COLORS.ink;
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!loading) {
                      e.currentTarget.style.transform = "translate(0, 0)";
                      e.currentTarget.style.boxShadow = `5px 5px 0 ${COLORS.ink}`;
                      e.currentTarget.style.background = COLORS.coral;
                      e.currentTarget.style.color = COLORS.white;
                    }
                  }}
                >
                  {loading ? (
                    <>
                      <svg
                        style={{ animation: "spinFast 1s linear infinite" }}
                        viewBox="0 0 24 24"
                        width={20}
                        height={20}
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="3"
                      >
                        <circle cx="12" cy="12" r="10" strokeOpacity="0.25" />
                        <path d="M12 2a10 10 0 0 1 10 10" />
                      </svg>
                      AUTHENTICATING...
                    </>
                  ) : mode === "login" ? (
                    "ENTER THE LAB"
                  ) : (
                    "CREATE INVENTOR PROFILE"
                  )}
                </button>
              </form>

              {/* FOOTER SWITCH LINK */}
              <div
                style={{
                  marginTop: 24,
                  textAlign: "center",
                  fontSize: 13,
                  fontWeight: 600,
                  color: "#4b443c",
                }}
              >
                {mode === "login" ? (
                  <>
                    Don't have an inventor account yet?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("signup");
                        setError("");
                        setSuccessMsg("");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: COLORS.blue,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                      }}
                    >
                      Sign Up
                    </button>
                  </>
                ) : (
                  <>
                    Already have an account?{" "}
                    <button
                      type="button"
                      onClick={() => {
                        setMode("login");
                        setError("");
                        setSuccessMsg("");
                      }}
                      style={{
                        background: "none",
                        border: "none",
                        color: COLORS.blue,
                        fontWeight: 700,
                        cursor: "pointer",
                        textDecoration: "underline",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontSize: 13,
                      }}
                    >
                      Log In
                    </button>
                  </>
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "24px 16px",
          fontSize: 12,
          fontWeight: 500,
          color: COLORS.gray,
          position: "relative",
          zIndex: 5,
        }}
      >
        ITHENTHINA? — Your credentials are safer with us than humanity is with your inventions.
      </footer>
    </div>
  );
}
