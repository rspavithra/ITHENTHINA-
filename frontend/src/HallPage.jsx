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
  darkGray: "#4b443c",
};

const API_BASE = 'http://localhost:5000';

export default function HallPage({ onBack }) {
  const [inventions, setInventions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fetchError, setFetchError] = useState('');
  const [profileOpen, setProfileOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(() => {
    try {
      const stored = localStorage.getItem("ithenthina_user");
      return stored ? JSON.parse(stored) : null;
    } catch (e) {
      return null;
    }
  });

  const userName = currentUser?.name || "Inventor";

  useEffect(() => {
    // Fetch from backend Hall of Uselessness API
    setLoading(true);
    setFetchError('');
    fetch(`${API_BASE}/api/inventions`)
      .then((r) => r.json())
      .then((data) => {
        if (data.success && Array.isArray(data.inventions)) {
          // Map backend shape to what the cards expect
          const mapped = data.inventions.map((item) => ({
            id: item._id,
            name: item.name,
            description: item.idea || item.description || '',
            roast: item.roast || '',
            icons: [],  // Backend does not have icons; kept for compat
            scores: item.scores || {},
            selectedItems: item.selectedItems || [],
            imageUrl: item.image || null,
            creator: item.creator || 'Anonymous',
            createdAt: item.createdAt,
          }));
          setInventions(mapped);
        } else {
          setFetchError(data.message || 'Could not load inventions.');
        }
      })
      .catch(() => setFetchError('Could not reach server. Check your connection.'))
      .finally(() => setLoading(false));

    // Close profile dropdown on outside click
    const handler = (e) => {
      if (!e.target.closest("#profile-btn")) setProfileOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const handleClear = () => {
    // No-op: Hall is now managed by the backend
    alert('Inventions are stored in the cloud and cannot be bulk-deleted from here.');
  };

  const handleLogout = () => {
    setProfileOpen(false);
    localStorage.removeItem("ithenthina_token");
    localStorage.removeItem("ithenthina_user");
    setCurrentUser(null);
    localStorage.removeItem("ithenthina_hall_of_uselessness");
    onBack();
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.cream,
        backgroundImage:
          "radial-gradient(rgba(23,19,16,0.12) 1.5px, transparent 1.5px)",
        backgroundSize: "26px 26px",
        fontFamily: "'Space Grotesk', sans-serif",
        color: COLORS.ink,
      }}
    >
      {/* ── NAV ─────────────────────────────────────────────── */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "22px 28px",
          maxWidth: 1100,
          margin: "0 auto",
          position: "relative",
          zIndex: 20,
        }}
      >
        {/* Left: back + logo */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onBack}
            style={{
              background: COLORS.white,
              border: `2.5px solid ${COLORS.ink}`,
              borderRadius: 30,
              padding: "7px 16px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              color: COLORS.ink,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            ← Back to Home
          </button>
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

        {/* Right: profile icon and name */}
        <div id="profile-btn" style={{ position: "relative" }}>
          <button
            onClick={() => setProfileOpen((p) => !p)}
            title="Profile"
            style={{
              borderRadius: 30,
              border: `3px solid ${COLORS.ink}`,
              background: COLORS.mustard,
              cursor: "pointer",
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              display: "flex",
              alignItems: "center",
              gap: 8,
              padding: "7px 16px",
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              color: COLORS.ink,
              transition: "transform 0.12s",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.transform = "scale(1)")
            }
          >
            <span style={{ fontSize: 18 }}>👤</span>
            <span>{userName}</span>
          </button>

          {/* Dropdown */}
          {profileOpen && (
            <div
              style={{
                position: "absolute",
                top: "calc(100% + 10px)",
                right: 0,
                background: COLORS.white,
                border: `2.5px solid ${COLORS.ink}`,
                borderRadius: 16,
                padding: "14px 16px",
                boxShadow: `5px 5px 0 ${COLORS.ink}`,
                minWidth: 180,
                zIndex: 200,
                textAlign: "left",
              }}
            >
              {/* Arrow indicator */}
              <div
                style={{
                  position: "absolute",
                  top: -10,
                  right: 14,
                  width: 0,
                  height: 0,
                  borderLeft: "8px solid transparent",
                  borderRight: "8px solid transparent",
                  borderBottom: `10px solid ${COLORS.ink}`,
                }}
              />

              {/* Name row */}
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
                    width: 36,
                    height: 36,
                    borderRadius: "50%",
                    background: COLORS.mustard,
                    border: `2px solid ${COLORS.ink}`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 18,
                  }}
                >
                  🤔
                </div>
                <div>
                  <div
                    style={{
                      fontWeight: 800,
                      fontSize: 14,
                      color: COLORS.ink,
                    }}
                  >
                    {userName}
                  </div>
                  <div style={{ fontSize: 11, color: "#7a7268", fontWeight: 600 }}>
                    Certified Useless Inventor
                  </div>
                </div>
              </div>

              {/* Log out button */}
              <button
                onClick={handleLogout}
                style={{
                  width: "100%",
                  background: "#FFECEC",
                  border: `2px solid ${COLORS.ink}`,
                  borderRadius: 10,
                  padding: "8px 12px",
                  cursor: "pointer",
                  fontWeight: 700,
                  fontSize: 13,
                  color: COLORS.coral,
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  boxShadow: `2px 2px 0 ${COLORS.ink}`,
                }}
              >
                🚪 Log Out
              </button>
            </div>
          )}
        </div>
      </nav>

      {/* ── HEADER ─────────────────────────────────────────── */}
      <div style={{ textAlign: "center", padding: "20px 20px 8px" }}>
        <h1
          style={{
            fontFamily: "'Bungee', cursive",
            fontSize: "clamp(32px, 5vw, 60px)",
            margin: 0,
            color: COLORS.ink,
            lineHeight: 1,
          }}
        >
          🏛️ HALL OF USELESSNESS
        </h1>
        <p
          style={{
            fontSize: 16,
            fontWeight: 600,
            color: COLORS.darkGray,
            marginTop: 10,
          }}
        >
          Humanity's most unnecessary archived breakthroughs
        </p>
        {inventions.length > 0 && (
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.lime,
              border: `2.5px solid ${COLORS.ink}`,
              borderRadius: 30,
              padding: "5px 14px",
              fontWeight: 700,
              fontSize: 13,
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              marginTop: 10,
            }}
          >
            {inventions.length} useless creation{inventions.length === 1 ? "" : "s"} archived
          </div>
        )}
      </div>

      {/* ── CONTENT ───────────────────────────────────────── */}
      <main
        style={{
          maxWidth: 800,
          margin: "28px auto 80px",
          padding: "0 20px",
        }}
      >
        {loading ? (
          <div
            style={{
              background: COLORS.white,
              border: `4px solid ${COLORS.ink}`,
              borderRadius: 24,
              padding: "60px 32px",
              textAlign: "center",
              boxShadow: `8px 8px 0 ${COLORS.ink}`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 14 }}>⏳</div>
            <div
              style={{
                fontFamily: "'Bungee', cursive",
                fontSize: 20,
                marginBottom: 10,
              }}
            >
              LOADING THE ARCHIVE...
            </div>
          </div>
        ) : fetchError ? (
          <div
            style={{
              background: "#FEE2E2",
              border: `3px solid ${COLORS.coral}`,
              borderRadius: 20,
              padding: "40px 32px",
              textAlign: "center",
              boxShadow: `6px 6px 0 ${COLORS.ink}`,
            }}
          >
            <div style={{ fontSize: 48, marginBottom: 14 }}>⚠️</div>
            <div style={{ fontFamily: "'Bungee', cursive", fontSize: 20, marginBottom: 10 }}>
              FAILED TO LOAD
            </div>
            <p style={{ color: COLORS.coral, fontWeight: 600, fontSize: 14 }}>{fetchError}</p>
          </div>
        ) : inventions.length === 0 ? (
          <div
            style={{
              background: COLORS.white,
              border: `4px solid ${COLORS.ink}`,
              borderRadius: 24,
              padding: "60px 32px",
              textAlign: "center",
              boxShadow: `8px 8px 0 ${COLORS.ink}`,
            }}
          >
            <div style={{ fontSize: 56, marginBottom: 14 }}>🗑️</div>
            <div
              style={{
                fontFamily: "'Bungee', cursive",
                fontSize: 22,
                marginBottom: 10,
              }}
            >
              NO ARCHIVED MISTAKES YET
            </div>
            <p
              style={{
                color: "#665e54",
                fontWeight: 600,
                fontSize: 15,
                maxWidth: 380,
                margin: "0 auto 24px",
              }}
            >
              The museum is empty. Go to Solo Mode, combine random junk, and
              save your very first useless invention!
            </p>
            <button
              onClick={onBack}
              style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 700,
                fontSize: 15,
                padding: "12px 28px",
                borderRadius: 40,
                border: `3px solid ${COLORS.ink}`,
                background: COLORS.coral,
                color: COLORS.white,
                cursor: "pointer",
                boxShadow: `4px 4px 0 ${COLORS.ink}`,
              }}
            >
              ← Back to Invent Something Useless
            </button>
          </div>
        ) : (
          <>
            <div style={{ display: "grid", gap: 20 }}>
              {inventions.map((inv) => (
                <div
                  key={inv.id}
                  style={{
                    background: COLORS.white,
                    border: `3px solid ${COLORS.ink}`,
                    borderRadius: 20,
                    padding: "22px 24px",
                    boxShadow: `6px 6px 0 ${COLORS.ink}`,
                  }}
                >
                  {/* Card header */}
                  <div
                    style={{
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "flex-start",
                      gap: 12,
                      flexWrap: "wrap",
                      marginBottom: 12,
                    }}
                  >
                    <div>
                      <div
                        style={{ display: "flex", gap: 6, marginBottom: 6 }}
                      >
                        {inv.icons?.map((ic, i) => (
                          <span key={i} style={{ fontSize: 22 }}>
                            {ic}
                          </span>
                        ))}
                      </div>
                      <h3
                        style={{
                          fontFamily: "'Bungee', cursive",
                          fontSize: 20,
                          margin: 0,
                          color: COLORS.ink,
                        }}
                      >
                        {inv.name}
                      </h3>
                    </div>
                    <div
                      style={{
                        background: COLORS.lime,
                        border: `2px solid ${COLORS.ink}`,
                        borderRadius: 14,
                        padding: "4px 12px",
                        fontSize: 13,
                        fontWeight: 800,
                        boxShadow: `2px 2px 0 ${COLORS.ink}`,
                        whiteSpace: "nowrap",
                      }}
                    >
                      SCORE: {inv.scores?.overall || 96}/100
                    </div>
                  </div>

                  {/* Description */}
                  <p
                    style={{
                      fontSize: 14,
                      color: COLORS.darkGray,
                      lineHeight: 1.6,
                      margin: "0 0 14px",
                      fontWeight: 500,
                    }}
                  >
                    {inv.description}
                  </p>

                  {/* AI Roast */}
                  <div
                    style={{
                      background: "#FFEAEA",
                      border: `2px dashed ${COLORS.ink}`,
                      borderRadius: 12,
                      padding: "10px 14px",
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

            {/* Clear archive */}
            <div style={{ textAlign: "center", marginTop: 28 }}>
              <button
                onClick={handleClear}
                style={{
                  background: "#FFECEC",
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 30,
                  padding: "8px 20px",
                  fontSize: 13,
                  fontWeight: 700,
                  color: COLORS.coral,
                  cursor: "pointer",
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                }}
              >
                🗑️ Clear Archive
              </button>
            </div>
          </>
        )}
      </main>
    </div>
  );
}
