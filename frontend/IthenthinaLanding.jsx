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

function FloatIcon({
  top,
  left,
  right,
  bottom,
  rotate = 0,
  size = 54,
  path,
  viewBox = "0 0 100 100",
  anim = "floatGentle",
  duration = "5s",
  delay = "0s",
  tooltip = "",
}) {
  return (
    <div
      className="hidden md:block float-icon-wrapper"
      title={tooltip}
      style={{
        position: "absolute",
        top,
        left,
        right,
        bottom,
        zIndex: 1,
        pointerEvents: "auto",
        animation: `${anim} ${duration} ease-in-out infinite`,
        animationDelay: delay,
      }}
    >
      <svg
        className="float-icon-svg"
        style={{
          transform: `rotate(${rotate}deg)`,
          display: "block",
        }}
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
    </div>
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
  const [hover, setHover] = React.useState(false);
  return (
    <div
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        display: "flex",
        alignItems: "center",
        gap: 8,
        background: COLORS.white,
        border: `3px solid ${COLORS.ink}`,
        borderRadius: 40,
        padding: "10px 16px",
        boxShadow: hover ? `5px 5px 0 ${COLORS.ink}` : `3px 3px 0 ${COLORS.ink}`,
        transform: hover ? "translate(-1px,-1px)" : "translate(0,0)",
        transition: "transform .12s ease, box-shadow .12s ease",
        fontWeight: 700,
        fontSize: 13,
        whiteSpace: "nowrap",
        cursor: "default",
      }}
    >
      {icon}
      {label}
    </div>
  );
}

export default function IthenthinaLanding({ onStartSolo, onOpenHall, onOpenLogin, currentUser: propUser, onLogout }) {
  const checkLoggedInUser = () => {
    try {
      const token = typeof window !== 'undefined' ? localStorage.getItem('ithenthina_token') : null;
      if (!token) return null;
      if (propUser) return propUser;
      const stored = localStorage.getItem('ithenthina_user');
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  };

  const [user, setUser] = React.useState(checkLoggedInUser);
  const [profileOpen, setProfileOpen] = React.useState(false);

  React.useEffect(() => {
    setUser(checkLoggedInUser());
  }, [propUser]);

  React.useEffect(() => {
    const handleClickOutside = (e) => {
      if (!e.target.closest("#landing-profile-btn")) {
        setProfileOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);
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
        position: "relative",
      }}
    >
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Bungee&family=Space+Grotesk:wght@400;500;600;700&display=swap');

        @keyframes floatGentle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-7px); }
        }
        @keyframes floatReverse {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(7px); }
        }
        @keyframes floatWiggle {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          30% { transform: translateY(-5px) rotate(-3deg); }
          70% { transform: translateY(-2px) rotate(3deg); }
        }
        @keyframes floatPulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.06); }
        }

        .float-icon-wrapper {
          cursor: pointer;
          transition: filter 0.2s ease;
        }
        .float-icon-wrapper:hover {
          filter: drop-shadow(4px 5px 0px rgba(23,19,16,0.3));
        }
        .float-icon-wrapper:hover .float-icon-svg {
          transform: scale(1.2) !important;
          transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
        }
      `}</style>

      {/* MAIN CONTAINER: Houses the clean center content and the side-flank icons */}
      <div
        style={{
          position: "relative",
          maxWidth: 1260,
          margin: "0 auto",
          padding: "0 24px",
        }}
      >
        {/* =========================================================================
            LEFT FLANK ONLY (Subtly scattered, purely in left margin, zero text overlap)
            ========================================================================= */}

        {/* L1. Questionable Lightbulb */}
        <FloatIcon
          top={130}
          left="3.5%"
          rotate={-12}
          size={54}
          anim="floatGentle"
          duration="5.2s"
          tooltip="Invention #001: Questionable Lightbulb"
          path={
            <>
              <path
                d="M50 14c-14 0-24 10-24 23 0 9 5 15 10 20 3 3 4 6 4 10h20c0-4 1-7 4-10 5-5 10-11 10-20 0-13-10-23-24-23Z"
                fill={COLORS.mustard}
                fillOpacity="0.35"
              />
              <path d="M42 76h16" />
              <path d="M44 86h12" />
              <path d="M50 4v6M24 18l-5-5M76 18l5-5M14 38h-6M92 38h-6" strokeWidth="3" />
            </>
          }
        />

        {/* L2. Banana Phone */}
        <FloatIcon
          top={250}
          left="1.5%"
          rotate={-16}
          size={58}
          anim="floatReverse"
          duration="5.6s"
          tooltip="Invention #404: Banana Phone"
          path={
            <>
              <path
                d="M22 34 C36 20 66 22 78 44 C84 54 82 72 70 82 C60 76 66 58 56 46 C48 38 34 36 22 34 Z"
                fill={COLORS.mustard}
                fillOpacity="0.5"
                strokeWidth="3.5"
              />
              <path d="M78 44 L86 40" strokeWidth="3.5" />
              <path d="M22 34 L14 24" strokeWidth="3.5" />
              <circle cx="12" cy="22" r="3.5" fill={COLORS.coral} strokeWidth="2" />
              <circle cx="56" cy="52" r="2" fill={COLORS.ink} />
              <circle cx="62" cy="57" r="2" fill={COLORS.ink} />
              <circle cx="68" cy="63" r="2" fill={COLORS.ink} />
            </>
          }
        />

        {/* L3. Crossed Tinkering Tools */}
        <FloatIcon
          top={370}
          left="4.5%"
          rotate={14}
          size={52}
          anim="floatGentle"
          duration="6s"
          tooltip="Invention #088: Duct-Tape Repair Kit"
          path={
            <>
              <path d="M26 74 L68 32" strokeWidth="3.5" />
              <path d="M68 32 L78 22 L84 28 L74 38 Z" fill={COLORS.mustard} fillOpacity="0.5" strokeWidth="3" />
              <path d="M26 74 L18 82" strokeWidth="5" strokeLinecap="square" />
              <path d="M74 74 L34 34" strokeWidth="3.5" />
              <path d="M30 30 C26 24 20 26 15 31 C12 34 13 38 17 41 L27 45 L39 33 L35 23 C32 19 28 20 30 30 Z" fill={COLORS.white} strokeWidth="3" />
              <circle cx="78" cy="78" r="7" fill={COLORS.white} strokeWidth="3" />
              <circle cx="78" cy="78" r="2.5" fill={COLORS.ink} />
            </>
          }
        />

        {/* L4. Bouncy Spring Gizmo */}
        <FloatIcon
          top={490}
          left="2%"
          rotate={-10}
          size={50}
          anim="floatWiggle"
          duration="5.3s"
          tooltip="Invention #099: Suspicious Spring Gizmo"
          path={
            <>
              <path d="M36 20 Q64 12 64 24 Q64 36 36 34 Q64 40 64 52 Q64 64 36 62 Q64 68 64 80 Q64 90 36 86" strokeWidth="3.8" />
              <path d="M22 16 L14 12 M20 30 L10 28 M22 88 L14 92" strokeWidth="3" />
              <path d="M76 22 L84 18 M78 82 L86 86" strokeWidth="3" />
            </>
          }
        />

        {/* L5. Over-Engineered Gearbox */}
        <FloatIcon
          top={610}
          left="4.5%"
          rotate={8}
          size={52}
          anim="floatGentle"
          duration="5.8s"
          tooltip="Invention #314: Over-engineered Gearbox"
          path={
            <>
              <circle cx="50" cy="50" r="14" fill={COLORS.white} strokeWidth="3.5" />
              <path d="M50 22v12M50 66v12M78 50H66M34 50H22M70 30l-8.5 8.5M38.5 61.5L30 70M70 70l-8.5-8.5M38.5 38.5L30 30" strokeWidth="3.5" />
              <circle cx="50" cy="50" r="5" fill={COLORS.ink} />
            </>
          }
        />

        {/* L6. Perpetual Motion / Looping Mechanism */}
        <FloatIcon
          top={720}
          left="2%"
          rotate={12}
          size={50}
          anim="floatReverse"
          duration="5.3s"
          tooltip="Invention #777: Perpetual Motion Doodle"
          path={
            <>
              <circle cx="50" cy="50" r="28" fill={COLORS.coral} fillOpacity="0.2" strokeWidth="3" />
              <path d="M50 22 A28 28 0 0 1 78 50" strokeWidth="3.5" />
              <path d="M72 44 L78 50 L84 44" strokeWidth="3" />
              <path d="M50 78 A28 28 0 0 1 22 50" strokeWidth="3.5" />
              <path d="M28 56 L22 50 L16 56" strokeWidth="3" />
              <circle cx="50" cy="50" r="6" fill={COLORS.ink} />
            </>
          }
        />

        {/* =========================================================================
            RIGHT FLANK ONLY (Subtly scattered, purely in right margin, zero text overlap)
            Clean clearance under top-right "Hall of Uselessness" button.
            ========================================================================= */}

        {/* R1. Funky "?" Malayalam Doodle */}
        <FloatIcon
          top={210}
          right="2%"
          rotate={14}
          size={54}
          anim="floatPulse"
          duration="4.5s"
          tooltip="Invention #???: Why Does This Exist?"
          path={
            <>
              <circle cx="50" cy="50" r="36" fill={COLORS.coral} fillOpacity="0.18" strokeWidth="3.2" />
              <path d="M38 34 C38 23 62 21 62 35 C62 45 49 48 49 59" strokeWidth="4.5" />
              <circle cx="49" cy="70" r="4.2" fill={COLORS.ink} />
              <path d="M18 24 L10 18 M82 24 L90 18 M50 8 L50 2 M88 50 L96 50" strokeWidth="3" />
            </>
          }
        />

        {/* R2. Paper Airplane with Looping Trail */}
        <FloatIcon
          top={330}
          right="4.5%"
          rotate={-10}
          size={54}
          anim="floatReverse"
          duration="5.4s"
          tooltip="Invention #101: Aerodynamic Disaster"
          path={
            <>
              <path d="M12 74 C16 52 36 48 36 60 C36 72 24 70 26 54 C30 30 52 36 58 30" strokeDasharray="5 5" strokeWidth="2.8" />
              <path d="M58 30 L88 16 L74 44 L64 34 Z" fill={COLORS.white} strokeWidth="3.2" />
              <path d="M88 16 L64 34 L54 38 Z" fill={COLORS.blue} fillOpacity="0.3" strokeWidth="2.8" />
              <path d="M64 34 L66 46 L71 39" fill={COLORS.ink} strokeWidth="2.8" />
            </>
          }
        />

        {/* R3. Sarcastic AI Robot Face */}
        <FloatIcon
          top={450}
          right="2%"
          rotate={-8}
          size={54}
          anim="floatGentle"
          duration="5.5s"
          tooltip="Invention #007: Overqualified Sarcastic AI"
          path={
            <>
              <rect x="24" y="34" width="52" height="42" rx="12" fill={COLORS.white} strokeWidth="3.5" />
              <circle cx="39" cy="53" r="4.5" fill={COLORS.ink} />
              <circle cx="61" cy="53" r="4.5" fill={COLORS.ink} />
              <path d="M38 65h24" strokeWidth="3" />
              <path d="M50 34V18" strokeWidth="3.5" />
              <circle cx="50" cy="14" r="5" fill={COLORS.coral} strokeWidth="2.5" />
              <path d="M16 52h8M76 52h8" strokeWidth="3.2" />
            </>
          }
        />

        {/* R4. 30-Sec Countdown Battle Hourglass */}
        <FloatIcon
          top={560}
          right="4.5%"
          rotate={12}
          size={52}
          anim="floatReverse"
          duration="5.1s"
          tooltip="Invention #030: 30 Seconds of Shame Clock"
          path={
            <>
              <path d="M28 20 H72 M28 80 H72" strokeWidth="4" />
              <path d="M32 20 C32 44 68 44 68 20 Z" fill={COLORS.white} strokeWidth="3.2" />
              <path d="M32 80 C32 56 68 56 68 80 Z" fill={COLORS.white} strokeWidth="3.2" />
              <path d="M38 73 C43 67 57 67 62 73 Z" fill={COLORS.coral} fillOpacity="0.6" strokeWidth="2.5" />
              <circle cx="50" cy="49" r="2.2" fill={COLORS.coral} />
              <circle cx="50" cy="55" r="2.2" fill={COLORS.coral} />
              <circle cx="50" cy="61" r="2.4" fill={COLORS.coral} />
              <path d="M74 34 Q82 31 86 35" strokeWidth="2.5" />
              <path d="M74 65 Q82 68 86 64" strokeWidth="2.5" />
            </>
          }
        />

        {/* R5. Battery at 1% with Spark */}
        <FloatIcon
          top={660}
          right="2%"
          rotate={-12}
          size={48}
          anim="floatWiggle"
          duration="5.7s"
          tooltip="Invention #002: Powered by 1% Battery & Panic"
          path={
            <>
              <rect x="22" y="32" width="52" height="36" rx="8" fill={COLORS.white} strokeWidth="3.2" />
              <path d="M74 44 H80 V56 H74" strokeWidth="3.2" />
              <rect x="28" y="38" width="12" height="24" rx="4" fill={COLORS.coral} strokeWidth="2" />
              <path d="M52 42 L46 50 H54 L50 58" strokeWidth="2.8" stroke={COLORS.coral} />
              <path d="M30 22 Q34 16 38 20" strokeWidth="2.5" />
            </>
          }
        />

        {/* R6. Steaming Midnight Hackathon Chai */}
        <FloatIcon
          top={730}
          right="3.5%"
          rotate={10}
          size={48}
          anim="floatGentle"
          duration="4.9s"
          tooltip="Invention #247: Hackathon Fuel (Cold Coffee)"
          path={
            <>
              <path d="M26 38 H68 V66 C68 76 60 82 50 82 C40 82 32 76 32 66 V38" fill={COLORS.white} strokeWidth="3.2" />
              <path d="M68 44 C76 44 82 50 82 56 C82 62 76 68 68 68" strokeWidth="3.2" />
              <path d="M38 28 C36 22 42 18 40 12" strokeWidth="2.8" />
              <path d="M50 28 C48 20 54 16 52 8" strokeWidth="2.8" />
              <path d="M62 28 C60 22 66 18 64 12" strokeWidth="2.8" />
            </>
          }
        />

        {/* NAV: 100% clean, unobstructed */}
        <nav
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            padding: "24px 8px",
            position: "relative",
            zIndex: 5,
          }}
        >
          <div style={{ fontFamily: "'Bungee', cursive", fontSize: 20 }}>
            ITHENTHINA<span style={{ color: COLORS.coral }}>?</span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
            {user && (
              <GhostButton onClick={onOpenHall} style={{ background: COLORS.mustard }}>
                <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.4">
                  <path d="M4 21V9l8-6 8 6v12" />
                  <path d="M9 21v-7h6v7" />
                </svg>
                Hall of Uselessness
              </GhostButton>
            )}

            {user ? (
              <div id="landing-profile-btn" style={{ position: "relative" }}>
                <GhostButton
                  onClick={() => setProfileOpen((p) => !p)}
                  style={{
                    background: COLORS.white,
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 8,
                  }}
                >
                  <svg viewBox="0 0 24 24" width={17} height={17} fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <span>{user.name}</span>
                  <svg
                    viewBox="0 0 24 24"
                    width={13}
                    height={13}
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="3"
                    style={{
                      transform: profileOpen ? "rotate(180deg)" : "rotate(0deg)",
                      transition: "transform .15s ease",
                    }}
                  >
                    <path d="M6 9l6 6 6-6" />
                  </svg>
                </GhostButton>

                {profileOpen && (
                  <div
                    style={{
                      position: "absolute",
                      top: "calc(100% + 10px)",
                      right: 0,
                      background: COLORS.white,
                      border: `2.5px solid ${COLORS.ink}`,
                      borderRadius: 16,
                      padding: "16px 18px",
                      boxShadow: `5px 5px 0 ${COLORS.ink}`,
                      minWidth: 220,
                      zIndex: 100,
                      textAlign: "left",
                    }}
                  >
                    {/* Top Triangle Arrow */}
                    <div
                      style={{
                        position: "absolute",
                        top: -10,
                        right: 20,
                        width: 0,
                        height: 0,
                        borderLeft: "8px solid transparent",
                        borderRight: "8px solid transparent",
                        borderBottom: `10px solid ${COLORS.ink}`,
                      }}
                    />

                    {/* User info row */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 10,
                        marginBottom: 12,
                        paddingBottom: 10,
                        borderBottom: `2px dashed ${COLORS.ink}`,
                      }}
                    >
                      <div
                        style={{
                          width: 38,
                          height: 38,
                          borderRadius: "50%",
                          background: COLORS.mustard,
                          border: `2px solid ${COLORS.ink}`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: 18,
                          flexShrink: 0,
                        }}
                      >
                        👤
                      </div>
                      <div style={{ overflow: "hidden" }}>
                        <div
                          style={{
                            fontWeight: 800,
                            fontSize: 14,
                            color: COLORS.ink,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user.name}
                        </div>
                        <div
                          style={{
                            fontSize: 11,
                            color: "#7a7268",
                            fontWeight: 600,
                            whiteSpace: "nowrap",
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                          }}
                        >
                          {user.email || "Certified Inventor"}
                        </div>
                      </div>
                    </div>

                    {/* Account page link */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        if (onOpenLogin) onOpenLogin();
                      }}
                      style={{
                        width: "100%",
                        background: COLORS.cream,
                        border: `2px solid ${COLORS.ink}`,
                        borderRadius: 10,
                        padding: "8px 12px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        color: COLORS.ink,
                        cursor: "pointer",
                        marginBottom: 8,
                        display: "flex",
                        alignItems: "center",
                        gap: 6,
                        boxShadow: `2px 2px 0 ${COLORS.ink}`,
                      }}
                    >
                      <span>⚙️</span>
                      <span>Manage Account</span>
                    </button>

                    {/* Logout button */}
                    <button
                      type="button"
                      onClick={() => {
                        setProfileOpen(false);
                        localStorage.removeItem("ithenthina_token");
                        localStorage.removeItem("ithenthina_user");
                        setUser(null);
                        if (onLogout) onLogout();
                      }}
                      style={{
                        width: "100%",
                        background: COLORS.coral,
                        border: `2px solid ${COLORS.ink}`,
                        borderRadius: 10,
                        padding: "8px 12px",
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 12,
                        color: COLORS.white,
                        cursor: "pointer",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        boxShadow: `2px 2px 0 ${COLORS.ink}`,
                      }}
                    >
                      <span>🚪</span>
                      <span>Log Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              onOpenLogin && (
                <GhostButton onClick={onOpenLogin} style={{ background: COLORS.white }}>
                  <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.4">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  Login
                </GhostButton>
              )
            )}
          </div>
        </nav>

        {/* HERO: 100% clean center column with zero icons in center or under text */}
        <section style={{ position: "relative", padding: "36px 12px 20px", textAlign: "center", zIndex: 2 }}>
          
          {/* Pill Badge */}
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
              marginBottom: 24,
              position: "relative",
              zIndex: 2,
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

          <div style={{ display: "flex", justifyContent: "center", marginTop: 44, position: "relative", zIndex: 2 }}>
            <button
              onClick={onStartSolo}
              style={{
                fontFamily: "'Bungee', cursive",
                fontSize: "clamp(20px, 3vw, 28px)",
                letterSpacing: 1.5,
                border: `4px solid ${COLORS.ink}`,
                background: COLORS.coral,
                color: COLORS.white,
                padding: "20px 48px",
                borderRadius: 50,
                cursor: "pointer",
                boxShadow: `7px 7px 0 ${COLORS.ink}`,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                transition: "transform .15s ease, box-shadow .15s ease, background .15s ease, color .15s ease",
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translate(-3px, -3px)";
                e.currentTarget.style.boxShadow = `10px 10px 0 ${COLORS.ink}`;
                e.currentTarget.style.background = COLORS.mustard;
                e.currentTarget.style.color = COLORS.ink;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translate(0, 0)";
                e.currentTarget.style.boxShadow = `7px 7px 0 ${COLORS.ink}`;
                e.currentTarget.style.background = COLORS.coral;
                e.currentTarget.style.color = COLORS.white;
              }}
            >
              START THE CHAOS
            </button>
          </div>

          <p style={{ marginTop: 30, fontSize: 13, fontWeight: 500, color: "#7a7268", position: "relative", zIndex: 2 }}>
            No refunds on dignity. Results may cause uncontrollable pride in bad ideas.
          </p>
        </section>

        {/* THE 4 TEXTS (FEATURES SECTION) — The icons end at this row, strictly nothing under */}
        <section style={{ margin: "48px auto 0", padding: "0 12px", position: "relative", zIndex: 2 }}>
          <div style={{ display: "flex", justifyContent: "center", gap: 14, flexWrap: "wrap", position: "relative", zIndex: 2 }}>
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
            {user && (
              <div onClick={onOpenHall} style={{ cursor: "pointer" }}>
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
            )}
          </div>
        </section>
      </div>

      {/* FOOTER — Completely clean, NO ICONS underneath */}
      <footer style={{ textAlign: "center", padding: "50px 20px 45px", fontSize: 13, fontWeight: 500, color: "#7a7268", position: "relative", zIndex: 2 }}>
        ITHENTHINA? — a museum for inventions humanity absolutely did not need.
      </footer>
    </div>
  );
}
