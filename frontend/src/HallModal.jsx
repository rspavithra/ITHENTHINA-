import React, { useState, useEffect } from "react";

const COLORS = {
  cream: "#FFF3E2",
  ink: "#171310",
  coral: "#FF4F3C",
  blue: "#3552FF",
  mustard: "#FFC845",
  white: "#FFFFFF",
  purple: "#8B5CF6",
  lime: "#A3E635",
};

export default function HallModal({ isOpen, onClose }) {
  const [inventions, setInventions] = useState([]);

  useEffect(() => {
    if (isOpen) {
      try {
        const saved = JSON.parse(localStorage.getItem("ithenthina_hall_of_uselessness") || "[]");
        setInventions(saved);
      } catch (err) {
        console.error("Error reading Hall of Uselessness:", err);
        setInventions([]);
      }
    }
  }, [isOpen]);

  const handleClear = () => {
    if (window.confirm("Are you sure you want to delete all archived useless inventions?")) {
      localStorage.removeItem("ithenthina_hall_of_uselessness");
      setInventions([]);
    }
  };

  if (!isOpen) return null;

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        background: "rgba(23, 19, 16, 0.65)",
        backdropFilter: "blur(8px)",
        WebkitBackdropFilter: "blur(8px)",
        zIndex: 2000,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "20px 16px",
      }}
    >
      <div
        style={{
          background: COLORS.cream,
          backgroundImage: `radial-gradient(rgba(23,19,16,0.16) 1.5px, transparent 1.5px)`,
          backgroundSize: "26px 26px",
          border: `4px solid ${COLORS.ink}`,
          borderRadius: 24,
          boxShadow: `14px 14px 0 ${COLORS.ink}`,
          maxWidth: 700,
          width: "100%",
          maxHeight: "88vh",
          display: "flex",
          flexDirection: "column",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Header */}
        <div
          style={{
            padding: "24px 28px 18px",
            borderBottom: `3px solid ${COLORS.ink}`,
            background: COLORS.mustard,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <span style={{ fontSize: 24 }}>🏛️</span>
            <div>
              <h2 style={{ fontFamily: "'Bungee', cursive", fontSize: 20, margin: 0, color: COLORS.ink }}>
                HALL OF USELESSNESS
              </h2>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#443a2f" }}>
                Humanity's most unnecessary archived breakthroughs
              </div>
            </div>
          </div>

          {/* Profile Icon with Dropdown */}
          <div style={{ position: "relative", display: "flex", gap: 8 }}>
            <button
              onClick={() => setProfileOpen((prev) => !prev)}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: `2.5px solid ${COLORS.ink}`,
                background: COLORS.white,
                cursor: "pointer",
                boxShadow: `2px 2px 0 ${COLORS.ink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              👤
            </button>
            {profileOpen && (
              <div
                style={{
                  position: "absolute",
                  top: "120%",
                  right: 0,
                  background: COLORS.white,
                  border: `2px solid ${COLORS.ink}`,
                  borderRadius: 12,
                  padding: "8px 12px",
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  zIndex: 10,
                  minWidth: 140,
                }}
              >
                <div style={{ fontWeight: 800, marginBottom: 4 }}>User Name</div>
                <button
                  onClick={() => {
                    localStorage.clear();
                    onClose();
                  }}
                  style={{
                    background: COLORS.mustard,
                    border: `2px solid ${COLORS.ink}`,
                    borderRadius: 8,
                    padding: "4px 8px",
                    cursor: "pointer",
                    fontWeight: 700,
                  }}
                >
                  Log Out
                </button>
              </div>
            )}

            {/* Close Cross */}
            <button
              onClick={onClose}
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                border: `2.5px solid ${COLORS.ink}`,
                background: COLORS.white,
                color: COLORS.ink,
                fontWeight: 900,
                fontSize: 24,
                cursor: "pointer",
                boxShadow: `2px 2px 0 ${COLORS.ink}`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              ×
            </button>
          </div>
        </div>

        {/* Content List */}
        <div
          style={{
            padding: "24px 28px",
            overflowY: "auto",
            flex: 1,
          }}
        >
          {inventions.length === 0 ? (
            <div style={{ textAlign: "center", padding: "48px 20px" }}>
              <div style={{ fontSize: 50, marginBottom: 12 }}>🗑️</div>
              <div style={{ fontFamily: "'Bungee', cursive", fontSize: 20, marginBottom: 8 }}>
                NO ARCHIVED MISTAKES YET
              </div>
              <p style={{ color: "#665e54", fontWeight: 600, fontSize: 15, maxWidth: 380, margin: "0 auto" }}>
                The museum is currently empty. Go to Solo Mode, combine random junk, and save your very first useless invention!
              </p>
            </div>
          ) : (
            <div style={{ display: "grid", gap: 16 }}>
              {inventions.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    background: COLORS.white,
                    border: `3px solid ${COLORS.ink}`,
                    borderRadius: 18,
                    padding: "18px 20px",
                    boxShadow: `4px 4px 0 ${COLORS.ink}`,
                  }}
                >
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", gap: 12, flexWrap: "wrap" }}>
                    <div>
                      <div style={{ display: "flex", gap: 6, marginBottom: 6 }}>
                        {inv.icons?.map((ic, i) => (
                          <span key={i} style={{ fontSize: 20 }}>{ic}</span>
                        ))}
                      </div>
                      <h3 style={{ fontFamily: "'Bungee', cursive", fontSize: 18, margin: 0, color: COLORS.ink }}>
                        {inv.name}
                      </h3>
                    </div>

                    <div
                      style={{
                        background: COLORS.lime,
                        border: `2px solid ${COLORS.ink}`,
                        borderRadius: 14,
                        padding: "3px 10px",
                        fontSize: 12,
                        fontWeight: 800,
                      }}
                    >
                      SCORE: {inv.scores?.overall || 96}/100
                    </div>
                  </div>

                  <p style={{ fontSize: 14, color: "#4b443c", lineHeight: 1.5, margin: "10px 0 12px", fontWeight: 500 }}>
                    {inv.description}
                  </p>

                  <div
                    style={{
                      background: "#FFEFEF",
                      border: `2px dashed ${COLORS.ink}`,
                      borderRadius: 12,
                      padding: "8px 12px",
                      fontSize: 13,
                      fontWeight: 600,
                      color: COLORS.ink,
                    }}
                  >
                    🤖 "{inv.roast}"
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {inventions.length > 0 && (
          <div
            style={{
              padding: "14px 28px",
              borderTop: `2.5px solid ${COLORS.ink}`,
              background: COLORS.white,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <span style={{ fontSize: 13, fontWeight: 700, color: "#666" }}>
              {inventions.length} useless creation{inventions.length === 1 ? "" : "s"} archived
            </span>
            <button
              onClick={handleClear}
              style={{
                background: "#FFECEC",
                border: `2px solid ${COLORS.ink}`,
                borderRadius: 20,
                padding: "6px 14px",
                fontSize: 12,
                fontWeight: 700,
                color: COLORS.coral,
                cursor: "pointer",
              }}
            >
              Clear Archive
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
