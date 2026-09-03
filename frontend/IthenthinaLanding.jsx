import React from "react";

const COLORS = {
  cream: "#FFF3E2",
  ink: "#171310",
  coral: "#FF4F3C",
  blue: "#3552FF",
  mustard: "#FFC845",
  white: "#FFFFFF",
};

function GhostButton({ children, className = "", style = {}, ...props }) {
  return (
    <button
      className={className}
      style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: 14,
        border: `3px solid ${COLORS.ink}`,
        background: COLORS.white,
        padding: "11px 20px",
        borderRadius: 40,
        cursor: "pointer",
        boxShadow: `4px 4px 0 ${COLORS.ink}`,
        color: COLORS.ink,
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        transition: "transform .12s ease, box-shadow .12s ease",
        ...style,
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.transform = "translate(-2px,-2px)";
        e.currentTarget.style.boxShadow = `6px 6px 0 ${COLORS.ink}`;
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.transform = "translate(0,0)";
        e.currentTarget.style.boxShadow = `4px 4px 0 ${COLORS.ink}`;
      }}
      {...props}
    >
      {children}
    </button>
  );
}

function FloatIcon({ top, left, right, bottom, rotate, size = 84, path, viewBox = "0 0 100 100" }) {
  return (
    <svg
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        transform: `rotate(${rotate}deg)`,
        zIndex: 1,
      }}
      className="hidden sm:block"
      width={size}
      height={size}
      viewBox={viewBox}
      fill="none"
      stroke={COLORS.ink}
      strokeWidth="3.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {path}
    </svg>
  );
}

function ModeCard({ accent, iconBg, icon, title, desc, cta, onClick }) {
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 270,
        background: COLORS.white,
        border: `3px solid ${COLORS.ink}`,
        borderRadius: 20,
        padding: "26px 24px",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: hover ? `10px 10px 0 ${COLORS.ink}` : `7px 7px 0 ${COLORS.ink}`,
        transform: hover ? "translate(-3px,-3px)" : "translate(0,0)",
        transition: "transform .15s ease, box-shadow .15s ease",
      }}
    >
      <div
        style={{
          width: 46,
          height: 46,
          border: `3px solid ${COLORS.ink}`,
          borderRadius: 12,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          marginBottom: 14,
          background: iconBg,
        }}
      >
        {icon}
      </div>
      <div style={{ fontFamily: "'Bungee', cursive", fontSize: 19, marginBottom: 6 }}>{title}</div>
      <div style={{ fontSize: 14, color: "#4b443c", lineHeight: 1.5, fontWeight: 500 }}>{desc}</div>
      <div style={{ marginTop: 16, fontWeight: 700, fontSize: 14, display: "flex", alignItems: "center", gap: 6, color: accent }}>
        {cta} <span>&rarr;</span>
      </div>
    </div>
  );
}

function FeatureChip({ icon, label }) {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: COLORS.white,
        border: `3px solid ${COLORS.ink}`,
        borderRadius: 40,
        padding: "10px 16px",
        boxShadow: `3px 3px 0 ${COLORS.ink}`,
        fontWeight: 700,
        fontSize: 13,
        whiteSpace: "nowrap",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

export default function IthenthinaLanding() {
  return (
    <div
      style={{
        background: COLORS.cream,
        backgroundImage: `radial-gradient(rgba(23,19,16,0.16) 1.5px, transparent 1.5px)`,
        backgroundSize: "26px 26px",
        backgroundPosition: "-10px -10px",
        color: COLORS.ink,
        fontFamily: "'Space Grotesk', sans-serif",
        minHeight: "100vh",
        overflowX: "hidden",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Space+Grotesk:wght@400;500;600;700&display=swap');
      `}</style>

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "26px 32px",
          maxWidth: 1180,
          margin: "0 auto",
        }}
      >
        <div style={{ fontFamily: "'Bungee', cursive", fontSize: 20 }}>
          ITHENTHINA<span style={{ color: COLORS.coral }}>?</span>
        </div>
        <GhostButton style={{ background: COLORS.mustard }}>
          <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.4">
            <path d="M4 21V9l8-6 8 6v12" />
            <path d="M9 21v-7h6v7" />
          </svg>
          Hall of Uselessness
        </GhostButton>
      </nav>

      {/* HERO */}
      <section style={{ position: "relative", padding: "60px 32px 40px", maxWidth: 1180, margin: "0 auto", textAlign: "center" }}>
        {/* lightbulb idea */}
        <FloatIcon
          top={54}
          left="2%"
          rotate={-12}
          size={80}
          path={
            <>
              <path d="M50 14c-14 0-24 10-24 23 0 9 5 15 10 20 3 3 4 6 4 10h20c0-4 1-7 4-10 5-5 10-11 10-20 0-13-10-23-24-23Z" />
              <path d="M42 76h16" />
              <path d="M44 86h12" />
            </>
          }
        />
        {/* sparkle / magic wand */}
        <FloatIcon
          top={40}
          right="3%"
          rotate={10}
          size={82}
          path={
            <>
              <path d="M28 82 74 36" />
              <path d="M64 26l4 8 8 4-8 4-4 8-4-8-8-4 8-4z" />
              <path d="M26 60l2.5 5 5 2.5-5 2.5-2.5 5-2.5-5-5-2.5 5-2.5z" />
            </>
          }
        />
        {/* gear / invention */}
        <FloatIcon
          bottom={64}
          left="6%"
          rotate={8}
          size={70}
          path={
            <>
              <circle cx="50" cy="50" r="14" />
              <path d="M50 24v10M50 66v10M76 50H66M34 50H24M67.5 32.5l-7 7M39.5 60.5l-7 7M67.5 67.5l-7-7M39.5 39.5l-7-7" />
            </>
          }
        />
        {/* robot face */}
        <FloatIcon
          bottom={26}
          right="8%"
          rotate={-9}
          size={78}
          path={
            <>
              <rect x="26" y="34" width="48" height="40" rx="10" />
              <circle cx="40" cy="54" r="4" fill={COLORS.ink} />
              <circle cx="60" cy="54" r="4" fill={COLORS.ink} />
              <path d="M40 64h20" />
              <path d="M50 34V20" />
              <circle cx="50" cy="16" r="4" />
            </>
          }
        />

        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            background: COLORS.blue,
            color: COLORS.white,
            fontWeight: 700,
            fontSize: 13,
            padding: "8px 16px",
            border: `3px solid ${COLORS.ink}`,
            borderRadius: 40,
            transform: "rotate(-3deg)",
            boxShadow: `4px 4px 0 ${COLORS.ink}`,
            marginBottom: 28,
          }}
        >
          30 seconds of shame, guaranteed
        </div>

        <h1
          style={{
            fontFamily: "'Bungee', cursive",
            fontSize: "clamp(52px, 9vw, 118px)",
            lineHeight: 0.92,
            letterSpacing: 1,
            position: "relative",
            zIndex: 2,
            margin: 0,
          }}
        >
          ITHENTHINA<span style={{ color: COLORS.coral }}>?</span>
        </h1>

        <p style={{ fontSize: "clamp(18px,2.4vw,26px)", fontWeight: 700, marginTop: 22, position: "relative", zIndex: 2 }}>
          Give us anything. We'll make it useless.
        </p>
        <p style={{ fontSize: 16, color: "#4b443c", fontWeight: 500, maxWidth: 520, margin: "14px auto 0", position: "relative", zIndex: 2 }}>
          An AI invention lab with zero standards and even less shame. Feed it junk, get back a patent nobody asked for.
        </p>

        <div style={{ display: "flex", justifyContent: "center", gap: 22, marginTop: 44, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
          <ModeCard
            accent={COLORS.mustard}
            iconBg={COLORS.mustard}
            icon={
              <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={COLORS.ink} strokeWidth="2.4" strokeLinecap="round">
                <circle cx="12" cy="8" r="4" />
                <path d="M4 21c0-4.4 3.6-8 8-8s8 3.6 8 8" />
              </svg>
            }
            title="Solo mode"
            desc="Grab random junk, let the AI turn it into a useless masterpiece, and read your roast alone."
            cta="Start inventing"
          />
          <ModeCard
            accent={COLORS.coral}
            iconBg={COLORS.coral}
            icon={
              <svg viewBox="0 0 24 24" width={24} height={24} fill="none" stroke={COLORS.ink} strokeWidth="2.4" strokeLinecap="round">
                <circle cx="7" cy="8" r="3.4" />
                <circle cx="17" cy="8" r="3.4" />
                <path d="M2 21c0-3.6 2.4-6.4 5.6-7" />
                <path d="M22 21c0-3.6-2.4-6.4-5.6-7" />
                <path d="M11 21c.3-3.2 2-5.6 4.6-6.6" />
                <path d="M13 21c-.3-3.2-2-5.6-4.6-6.6" />
              </svg>
            }
            title="Two-player battle"
            desc="Same objects, same clock, opposite ideas. AI judges both disasters and crowns a winner."
            cta="Start a battle"
          />
        </div>

        <p style={{ marginTop: 30, fontSize: 13, fontWeight: 500, color: "#7a7268", position: "relative", zIndex: 2 }}>
          No refunds on dignity. Results may cause uncontrollable pride in bad ideas.
        </p>
      </section>

      {/* FEATURES — static row instead of scrolling marquee */}
      <section style={{ maxWidth: 1180, margin: "60px auto 0", padding: "0 32px" }}>
        <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap" }}>
          <FeatureChip
            label="Uselessness score"
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={COLORS.ink} strokeWidth="2.4">
                <path d="M3 17l6-6 4 4 8-8" />
                <path d="M15 7h6v6" />
              </svg>
            }
          />
          <FeatureChip
            label="AI-generated roast"
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={COLORS.ink} strokeWidth="2.4">
                <path d="M8 10h.01M16 10h.01" />
                <path d="M8 15c1.5 1.5 6.5 1.5 8 0" />
                <circle cx="12" cy="12" r="9" />
              </svg>
            }
          />
          <FeatureChip
            label="Random object generator"
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={COLORS.ink} strokeWidth="2.4">
                <rect x="4" y="4" width="16" height="16" rx="3" />
                <circle cx="8.5" cy="8.5" r="1" fill={COLORS.ink} />
                <circle cx="15.5" cy="15.5" r="1" fill={COLORS.ink} />
                <circle cx="15.5" cy="8.5" r="1" fill={COLORS.ink} />
                <circle cx="8.5" cy="15.5" r="1" fill={COLORS.ink} />
              </svg>
            }
          />
          <FeatureChip
            label="Hall of Uselessness"
            icon={
              <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke={COLORS.ink} strokeWidth="2.4">
                <path d="M4 21V9l8-6 8 6v12" />
                <path d="M9 21v-7h6v7" />
              </svg>
            }
          />
        </div>
      </section>

      <footer style={{ textAlign: "center", padding: "44px 20px 50px", fontSize: 13, fontWeight: 500, color: "#7a7268" }}>
        ITHENTHINA? — a museum for inventions humanity absolutely did not need.
      </footer>
    </div>
  );
}
