import React, { useState, useEffect, useRef } from "react";

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
  lightGray: "#F4EFEA",
};

const PRESET_OBJECTS = [
  { id: "bucket", label: "Bucket", icon: "🪣" },
  { id: "spoon", label: "Spoon", icon: "🥄" },
  { id: "sock", label: "Sock", icon: "🧦" },
  { id: "umbrella", label: "Umbrella", icon: "☂️" },
  { id: "toothbrush", label: "Toothbrush", icon: "🪥" },
  { id: "teddy", label: "Teddy Bear", icon: "🧸" },
  { id: "battery", label: "Battery", icon: "🔋" },
  { id: "wheel", label: "Wheel", icon: "🛞" },
  { id: "magnet", label: "Magnet", icon: "🧲" },
  { id: "rope", label: "Rope", icon: "🪢" },
  { id: "banana", label: "Banana", icon: "🍌" },
  { id: "phone", label: "Phone", icon: "📱" },
];

const LOADING_MESSAGES = [
  "Searching for problems nobody has...",
  "Consulting absolutely no experts...",
  "Making engineers question their careers...",
  "Adding unnecessary Bluetooth connectivity...",
  "Calculating the maximum possible uselessness...",
  "Convincing investors this is revolutionary...",
  "Destroying productivity one invention at a time...",
  "Almost done disappointing humanity...",
  "Generating something you definitely shouldn't build...",
  "Congratulations, electricity is being wasted successfully...",
];

const ROASTS = [
  "Congratulations. You successfully used modern technology to solve a problem that did not exist.",
  "Somewhere, an engineer just quietly resigned.",
  "Investors have politely left the chat.",
  "Human evolution has been delayed by approximately three minutes.",
  "Your invention has been reported to common sense.",
  "This is why aliens don't visit us.",
  "The patent office has already blocked your IP address.",
  "Even Kickstarter refused to take a 5% cut from this tragedy.",
];

function generateInventionData(selectedItems) {
  const names = selectedItems.map((s) => s.label);
  const icons = selectedItems.map((s) => s.icon);

  const cleanNames = names.map((n) => n.toUpperCase().replace(/\s+/g, ""));
  let mainName = "";
  if (cleanNames.length >= 2) {
    const part1 = cleanNames[0].substring(0, Math.min(4, cleanNames[0].length));
    const part2 = cleanNames[1];
    const part3 = cleanNames.length > 2 ? cleanNames[2].slice(-3) : "";
    const suffixes = ["3000™", "MAX PRO", "HYBRID 9000", "ULTRA-GIZMO", "QUANTUM X", "TURBO-MATIC"];
    const suffix = suffixes[Math.floor(Math.random() * suffixes.length)];
    mainName = `${part1}O${part2}${part3} ${suffix}`;
  } else {
    mainName = "CONTRAPTION-O-MATIC 3000™";
  }

  const itemsList = names.join(", ");

  const descriptions = [
    `A breakthrough disaster that fuses ${itemsList} into an over-engineered mechanism designed to execute a trivial task with maximum theatrical failure.`,
    `A revolutionary apparatus that meticulously combines ${itemsList} into a chaotic contraption solving a catastrophic crisis that zero humans ever experienced.`,
    `An automated monstrosity harnessing the raw synergy of ${itemsList}. It requires 18 manual calibration steps, 3 app permissions, and achieves absolutely nothing.`,
  ];

  const problems = [
    `Ever worried that your life is slightly too productive? This solves it instantly by introducing 14 new unresolvable friction points.`,
    `Solves the urgent, non-existent dilemma of needing ${names[0]} and ${names[1]} to interact simultaneously without any physical or logical reason.`,
    `Guarantees that whatever task you were originally trying to do will take 500% longer and cost 10x more energy.`,
  ];

  const uselessScore = Math.floor(Math.random() * 6) + 94;
  const creativityScore = Math.floor(Math.random() * 15) + 82;
  const ridiculousScore = Math.floor(Math.random() * 8) + 92;
  const wasteScore = Math.floor(Math.random() * 5) + 95;
  const overallScore = Math.round((uselessScore + ridiculousScore + wasteScore) / 3);

  const roast = ROASTS[Math.floor(Math.random() * ROASTS.length)];

  return {
    id: "inv_" + Date.now(),
    name: mainName,
    selectedItems: names,
    icons,
    description: descriptions[Math.floor(Math.random() * descriptions.length)],
    problemSolves: problems[Math.floor(Math.random() * problems.length)],
    details: {
      price: "₹" + (Math.floor(Math.random() * 40000) + 19999).toLocaleString(),
      demand: (Math.random() * 0.009 + 0.001).toFixed(3) + "%",
      complexity: "Unnecessarily High",
      environment: "We don't want to talk about it.",
    },
    scores: {
      uselessness: uselessScore,
      creativity: creativityScore,
      ridiculousness: ridiculousScore,
      wasteOfMoney: wasteScore,
      overall: overallScore,
    },
    roast,
    createdAt: new Date().toISOString(),
  };
}

function OptionCard({ tag, icon, title, desc, cta, onClick, accent }) {
  const [hover, setHover] = useState(false);
  return (
    <div
      onClick={onClick}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
      style={{
        width: 380,
        maxWidth: "100%",
        background: COLORS.white,
        border: `3.5px solid ${COLORS.ink}`,
        borderRadius: 24,
        padding: "32px 28px",
        textAlign: "left",
        cursor: "pointer",
        boxShadow: hover ? `11px 11px 0 ${COLORS.ink}` : `7px 7px 0 ${COLORS.ink}`,
        transform: hover ? "translate(-3px,-3px)" : "translate(0,0)",
        transition: "transform .15s ease, box-shadow .15s ease",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <div>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              border: `3px solid ${COLORS.ink}`,
              borderRadius: 14,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 26,
              background: accent,
            }}
          >
            {icon}
          </div>
          <span
            style={{
              fontSize: 11,
              fontWeight: 800,
              textTransform: "uppercase",
              letterSpacing: 1,
              background: COLORS.lightGray,
              border: `2px solid ${COLORS.ink}`,
              borderRadius: 20,
              padding: "4px 10px",
              color: COLORS.ink,
            }}
          >
            {tag}
          </span>
        </div>

        <div style={{ fontFamily: "'Bungee', cursive", fontSize: 20, marginBottom: 8, color: COLORS.ink }}>
          {title}
        </div>

        <p style={{ fontSize: 14, color: "#4b443c", lineHeight: 1.5, fontWeight: 500, margin: 0 }}>
          {desc}
        </p>
      </div>

      <div
        style={{
          marginTop: 24,
          fontWeight: 700,
          fontSize: 14,
          display: "flex",
          alignItems: "center",
          gap: 6,
          color: accent === COLORS.mustard ? "#B45309" : "#7C3AED",
        }}
      >
        {cta} <span style={{ fontSize: 16 }}>&rarr;</span>
      </div>
    </div>
  );
}

export default function SoloMode({ onBack, onOpenHall }) {
  // Option state: null (initial 2 cards) | 'preset' | 'custom'
  const [activeOption, setActiveOption] = useState(null);

  const [selectedIds, setSelectedIds] = useState([]);
  const [customObjects, setCustomObjects] = useState([]);
  const [customInput, setCustomInput] = useState("");
  const [inputError, setInputError] = useState("");

  // Loading state
  const [isLoading, setIsLoading] = useState(false);
  const [loadingMsgIndex, setLoadingMsgIndex] = useState(0);

  // Result state
  const [showModal, setShowModal] = useState(false);
  const [generatedResult, setGeneratedResult] = useState(null);
  const [toastMessage, setToastMessage] = useState("");

  const loadingTimerRef = useRef(null);
  const messageIntervalRef = useRef(null);

  // Rotate loading messages
  useEffect(() => {
    if (isLoading) {
      setLoadingMsgIndex(0);
      messageIntervalRef.current = setInterval(() => {
        setLoadingMsgIndex((prev) => (prev + 1) % LOADING_MESSAGES.length);
      }, 1800);

      loadingTimerRef.current = setTimeout(() => {
        setIsLoading(false);
        if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);

        const allItems = [
          ...PRESET_OBJECTS.filter((o) => selectedIds.includes(o.id)),
          ...customObjects.filter((o) => selectedIds.includes(o.id)),
        ];

        const result = generateInventionData(allItems);
        setGeneratedResult(result);
        setShowModal(true);
      }, 5600);
    } else {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    }

    return () => {
      if (messageIntervalRef.current) clearInterval(messageIntervalRef.current);
      if (loadingTimerRef.current) clearTimeout(loadingTimerRef.current);
    };
  }, [isLoading]);

  useEffect(() => {
    if (toastMessage) {
      const t = setTimeout(() => setToastMessage(""), 3500);
      return () => clearTimeout(t);
    }
  }, [toastMessage]);

  const toggleSelect = (id) => {
    if (selectedIds.includes(id)) {
      setSelectedIds(selectedIds.filter((item) => item !== id));
    } else {
      if (selectedIds.length >= 3) {
        setInputError("Maximum 3 objects allowed! Choose your junk wisely.");
        setTimeout(() => setInputError(""), 3000);
        return;
      }
      setSelectedIds([...selectedIds, id]);
    }
  };

  const handleAddCustom = (e) => {
    e.preventDefault();
    const trimmed = customInput.trim();
    if (!trimmed) return;

    if (customObjects.length >= 3) {
      setInputError("You can add at most 3 custom objects!");
      setTimeout(() => setInputError(""), 3000);
      return;
    }

    const newId = "custom_" + Date.now();
    const newCustom = {
      id: newId,
      label: trimmed,
      icon: "✨",
      isCustom: true,
    };

    setCustomObjects([...customObjects, newCustom]);
    setCustomInput("");
    setInputError("");

    if (selectedIds.length < 3) {
      setSelectedIds([...selectedIds, newId]);
    }
  };

  const handleRemoveCustom = (id, e) => {
    e.stopPropagation();
    setCustomObjects(customObjects.filter((o) => o.id !== id));
    setSelectedIds(selectedIds.filter((item) => item !== id));
  };

  const handleGenerate = () => {
    if (selectedIds.length < 2 || selectedIds.length > 3) return;
    setIsLoading(true);
  };

  const handleSaveToHall = () => {
    if (!generatedResult) return;
    try {
      const existing = JSON.parse(localStorage.getItem("ithenthina_hall_of_uselessness") || "[]");
      const updated = [generatedResult, ...existing.filter((item) => item.id !== generatedResult.id)];
      localStorage.setItem("ithenthina_hall_of_uselessness", JSON.stringify(updated));
      setToastMessage("Successfully archived in the Hall of Uselessness 🏛");
    } catch (err) {
      console.error("Failed to save to localStorage:", err);
      setToastMessage("Archived in memory (Storage unavailable)");
    }
  };

  const handleMakeAnotherMistake = () => {
    setShowModal(false);
    setSelectedIds([]);
    setCustomObjects([]);
    setCustomInput("");
    setGeneratedResult(null);
    setActiveOption(null); // Return to the two option cards
  };

  const isGenerateDisabled = selectedIds.length < 2 || selectedIds.length > 3;

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
        position: "relative",
        overflowX: "hidden",
      }}
    >
      {/* Toast Notification */}
      {toastMessage && (
        <div
          style={{
            position: "fixed",
            top: 24,
            left: "50%",
            transform: "translateX(-50%)",
            zIndex: 9999,
            background: COLORS.lime,
            color: COLORS.ink,
            border: `3px solid ${COLORS.ink}`,
            borderRadius: 40,
            padding: "12px 24px",
            fontWeight: 700,
            fontSize: 15,
            boxShadow: `5px 5px 0 ${COLORS.ink}`,
            display: "flex",
            alignItems: "center",
            gap: 10,
            animation: "bounceIn 0.3s ease-out",
          }}
        >
          <span>✓</span>
          {toastMessage}
        </div>
      )}

      {/* NAV */}
      <nav
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          padding: "24px 24px",
          maxWidth: 1240,
          margin: "0 auto",
          position: "relative",
          zIndex: 5,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <button
            onClick={onBack}
            style={{
              background: COLORS.white,
              border: `2.5px solid ${COLORS.ink}`,
              borderRadius: 30,
              padding: "6px 14px",
              fontWeight: 700,
              fontSize: 13,
              cursor: "pointer",
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              color: COLORS.ink,
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

        {Boolean(typeof window !== 'undefined' && localStorage.getItem('ithenthina_token')) && (
          <button
            onClick={onOpenHall}
            style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 700,
              fontSize: 14,
              border: `3px solid ${COLORS.ink}`,
              background: COLORS.mustard,
              padding: "11px 20px",
              borderRadius: 40,
              cursor: "pointer",
              boxShadow: `4px 4px 0 ${COLORS.ink}`,
              color: COLORS.ink,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
            }}
          >
            <svg viewBox="0 0 24 24" width={16} height={16} fill="none" stroke="currentColor" strokeWidth="2.4">
              <path d="M4 21V9l8-6 8 6v12" />
              <path d="M9 21v-7h6v7" />
            </svg>
            Hall of Uselessness
          </button>
        )}
      </nav>

      {/* MAIN CONTAINER */}
      <main
        style={{
          maxWidth: 900,
          margin: "0 auto",
          padding: "20px 20px 80px",
          textAlign: "center",
          filter: isLoading ? "blur(3px)" : "none",
          transition: "filter 0.3s ease",
          pointerEvents: isLoading ? "none" : "auto",
        }}
      >
        {/* HEADER */}
        <div style={{ marginBottom: 36 }}>
          <h1
            style={{
              fontFamily: "'Bungee', cursive",
              fontSize: "clamp(38px, 6vw, 68px)",
              letterSpacing: 1,
              margin: 0,
              color: COLORS.ink,
              lineHeight: 1,
            }}
          >
            WHAT SHOULD WE RUIN?
          </h1>

          <p
            style={{
              fontSize: "clamp(16px, 2.2vw, 22px)",
              fontWeight: 700,
              marginTop: 12,
              marginBottom: 16,
              color: COLORS.ink,
            }}
          >
            Give us anything. We'll make it useless.
          </p>

          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: COLORS.mustard,
              border: `3px solid ${COLORS.ink}`,
              borderRadius: 30,
              padding: "7px 16px",
              fontWeight: 700,
              fontSize: 13,
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
            }}
          >
            <span>⚠</span>{" "}
            {activeOption === "preset"
              ? "Pick 2–3 things that have absolutely no business being together."
              : activeOption === "custom"
              ? "Add 2–3 objects from your questionable imagination."
              : "Choose how you'd like to disappoint humanity today."}
          </div>
        </div>

        {/* =========================================================================
            STATE 1: INITIAL TWO LARGE OPTION CARDS (When activeOption === null)
            ========================================================================= */}
        {activeOption === null && (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              gap: 24,
              flexWrap: "wrap",
              marginTop: 18,
            }}
          >
            {/* Card 1: CHOOSE YOUR OBJECTS (RANDOM OBJECTS) */}
            <OptionCard
              tag="SECTION 1"
              icon="🎲"
              title="CHOOSE YOUR OBJECTS"
              desc="Pick from our collection of completely unrelated objects and let chaos do the rest."
              cta="Choose Objects"
              accent={COLORS.mustard}
              onClick={() => {
                setActiveOption("preset");
                setSelectedIds([]);
              }}
            />

            {/* Card 2: ADD YOUR OWN OBJECTS */}
            <OptionCard
              tag="SECTION 2"
              icon="✍️"
              title="ADD YOUR OWN OBJECTS"
              desc="Got something weird in mind? Throw in your own objects and we'll make them spectacularly useless."
              cta="Add Your Own"
              accent={COLORS.purple}
              onClick={() => {
                setActiveOption("custom");
                setSelectedIds([]);
                setCustomObjects([]);
                setCustomInput("");
              }}
            />
          </div>
        )}

        {/* =========================================================================
            STATE 2: ONLY SECTION 1 (When activeOption === 'preset')
            ========================================================================= */}
        {activeOption === "preset" && (
          <div>
            <div style={{ textAlign: "left", marginBottom: 18 }}>
              <button
                type="button"
                onClick={() => {
                  setActiveOption(null);
                  setSelectedIds([]);
                }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  border: `2.5px solid ${COLORS.ink}`,
                  background: COLORS.white,
                  padding: "8px 16px",
                  borderRadius: 30,
                  cursor: "pointer",
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  color: COLORS.ink,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ← BACK TO OPTIONS
              </button>
            </div>

            <section
              style={{
                background: COLORS.white,
                border: `3.5px solid ${COLORS.ink}`,
                borderRadius: 24,
                padding: "32px 28px",
                boxShadow: `8px 8px 0 ${COLORS.ink}`,
                marginBottom: 36,
                textAlign: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  flexWrap: "wrap",
                  gap: 12,
                  marginBottom: 24,
                }}
              >
                <h2
                  style={{
                    fontFamily: "'Bungee', cursive",
                    fontSize: 22,
                    margin: 0,
                    color: COLORS.ink,
                    textAlign: "left",
                  }}
                >
                  SECTION 1 — CHOOSE YOUR OBJECTS
                </h2>

                <div
                  style={{
                    background: selectedIds.length >= 2 ? COLORS.lime : COLORS.lightGray,
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 20,
                    padding: "4px 14px",
                    fontWeight: 700,
                    fontSize: 13,
                    boxShadow: `2px 2px 0 ${COLORS.ink}`,
                  }}
                >
                  {selectedIds.length} object{selectedIds.length === 1 ? "" : "s"} selected{" "}
                  <span style={{ color: selectedIds.length < 2 ? COLORS.coral : COLORS.ink, fontSize: 12 }}>
                    (min 2, max 3)
                  </span>
                </div>
              </div>

              <p style={{ fontSize: 14, color: COLORS.darkGray, marginBottom: 20, fontWeight: 500, textAlign: "left" }}>
                Pick 2–3 things that have absolutely no business being together.
              </p>

              {/* OBJECT CHIPS GRID */}
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fill, minmax(130px, 1fr))",
                  gap: 14,
                }}
              >
                {PRESET_OBJECTS.map((obj) => {
                  const isSelected = selectedIds.includes(obj.id);
                  return (
                    <button
                      key={obj.id}
                      onClick={() => toggleSelect(obj.id)}
                      type="button"
                      style={{
                        fontFamily: "'Space Grotesk', sans-serif",
                        fontWeight: 700,
                        fontSize: 14,
                        padding: "14px 10px",
                        borderRadius: 16,
                        cursor: "pointer",
                        border: `3px solid ${COLORS.ink}`,
                        background: isSelected ? COLORS.purple : COLORS.white,
                        color: isSelected ? COLORS.white : COLORS.ink,
                        boxShadow: isSelected ? `5px 5px 0 ${COLORS.ink}` : `3px 3px 0 ${COLORS.ink}`,
                        transform: isSelected ? "translate(-2px, -2px)" : "translate(0, 0)",
                        transition: "transform 0.12s ease, box-shadow 0.12s ease, background 0.12s ease",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        justifyContent: "center",
                        gap: 6,
                        userSelect: "none",
                      }}
                    >
                      <span style={{ fontSize: 28 }}>{obj.icon}</span>
                      <span>{obj.label}</span>
                      {isSelected && (
                        <span
                          style={{
                            fontSize: 10,
                            background: COLORS.lime,
                            color: COLORS.ink,
                            padding: "1px 7px",
                            borderRadius: 10,
                            border: `1.5px solid ${COLORS.ink}`,
                            marginTop: 2,
                          }}
                        >
                          SELECTED ✓
                        </span>
                      )}
                    </button>
                  );
                })}
              </div>
            </section>

            {/* GENERATE BUTTON */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: "clamp(17px, 2.4vw, 24px)",
                  padding: "20px 42px",
                  borderRadius: 50,
                  border: `4px solid ${COLORS.ink}`,
                  background: isGenerateDisabled ? "#D1C7BD" : COLORS.coral,
                  color: isGenerateDisabled ? "#7A7268" : COLORS.white,
                  cursor: isGenerateDisabled ? "not-allowed" : "pointer",
                  boxShadow: isGenerateDisabled ? `3px 3px 0 ${COLORS.ink}` : `8px 8px 0 ${COLORS.ink}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  letterSpacing: 0.5,
                }}
              >
                <span>⚡</span> GENERATE USELESS INVENTION <span>🚀</span>
              </button>

              <p
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  color: isGenerateDisabled ? COLORS.coral : "#7A7268",
                }}
              >
                {selectedIds.length < 2
                  ? `Select at least ${2 - selectedIds.length} more object${2 - selectedIds.length === 1 ? "" : "s"} to unlock invention`
                  : `${selectedIds.length} objects loaded and ready to ruin humanity.`}
              </p>
            </div>
          </div>
        )}

        {/* =========================================================================
            STATE 3: ONLY SECTION 2 (When activeOption === 'custom')
            ========================================================================= */}
        {activeOption === "custom" && (
          <div>
            <div style={{ textAlign: "left", marginBottom: 18 }}>
              <button
                type="button"
                onClick={() => {
                  setActiveOption(null);
                  setSelectedIds([]);
                  setCustomObjects([]);
                  setCustomInput("");
                }}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 13,
                  border: `2.5px solid ${COLORS.ink}`,
                  background: COLORS.white,
                  padding: "8px 16px",
                  borderRadius: 30,
                  cursor: "pointer",
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  color: COLORS.ink,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                }}
              >
                ← BACK TO OPTIONS
              </button>
            </div>

            <section
              style={{
                background: COLORS.white,
                border: `3.5px solid ${COLORS.ink}`,
                borderRadius: 24,
                padding: "32px 28px",
                boxShadow: `8px 8px 0 ${COLORS.ink}`,
                marginBottom: 36,
                textAlign: "left",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
                <h2
                  style={{
                    fontFamily: "'Bungee', cursive",
                    fontSize: 20,
                    margin: 0,
                    color: COLORS.ink,
                  }}
                >
                  SECTION 2 — ADD YOUR OWN OBJECTS
                </h2>
                <span
                  style={{
                    background: selectedIds.length >= 2 ? COLORS.lime : COLORS.lightGray,
                    border: `2px solid ${COLORS.ink}`,
                    borderRadius: 20,
                    padding: "3px 12px",
                    fontSize: 13,
                    fontWeight: 700,
                    color: COLORS.ink,
                  }}
                >
                  {selectedIds.length} added (min 2, max 3)
                </span>
              </div>

              <p style={{ fontSize: 14, color: COLORS.darkGray, marginBottom: 18, fontWeight: 500 }}>
                Add 2–3 objects from your questionable imagination.
              </p>

              <form
                onSubmit={handleAddCustom}
                style={{
                  display: "flex",
                  gap: 12,
                  flexWrap: "wrap",
                }}
              >
                <input
                  type="text"
                  value={customInput}
                  onChange={(e) => setCustomInput(e.target.value)}
                  placeholder="Type something completely unnecessary..."
                  maxLength={35}
                  style={{
                    flex: "1 1 280px",
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: 15,
                    fontWeight: 600,
                    padding: "12px 18px",
                    border: `3px solid ${COLORS.ink}`,
                    borderRadius: 40,
                    outline: "none",
                    background: COLORS.white,
                    color: COLORS.ink,
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                />

                <button
                  type="submit"
                  disabled={!customInput.trim() || customObjects.length >= 3}
                  style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 700,
                    fontSize: 14,
                    padding: "12px 22px",
                    border: `3px solid ${COLORS.ink}`,
                    background: customInput.trim() && customObjects.length < 3 ? COLORS.blue : COLORS.lightGray,
                    color: customInput.trim() && customObjects.length < 3 ? COLORS.white : "#888",
                    borderRadius: 40,
                    cursor: customInput.trim() && customObjects.length < 3 ? "pointer" : "not-allowed",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                    whiteSpace: "nowrap",
                  }}
                >
                  + Add Object
                </button>
              </form>

              {inputError && (
                <div style={{ color: COLORS.coral, fontSize: 13, fontWeight: 700, marginTop: 10 }}>
                  ⚠ {inputError}
                </div>
              )}

              {/* CUSTOM CHIPS */}
              {customObjects.length > 0 && (
                <div style={{ marginTop: 22 }}>
                  <div style={{ fontSize: 12, fontWeight: 700, textTransform: "uppercase", color: "#777", marginBottom: 10 }}>
                    Your Custom Junk:
                  </div>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
                    {customObjects.map((cust) => {
                      const isSelected = selectedIds.includes(cust.id);
                      return (
                        <div
                          key={cust.id}
                          onClick={() => toggleSelect(cust.id)}
                          style={{
                            display: "inline-flex",
                            alignItems: "center",
                            gap: 8,
                            padding: "8px 16px",
                            borderRadius: 30,
                            border: `2.5px solid ${COLORS.ink}`,
                            background: isSelected ? COLORS.purple : COLORS.white,
                            color: isSelected ? COLORS.white : COLORS.ink,
                            fontWeight: 700,
                            fontSize: 14,
                            boxShadow: isSelected ? `4px 4px 0 ${COLORS.ink}` : `2px 2px 0 ${COLORS.ink}`,
                            cursor: "pointer",
                            userSelect: "none",
                            transition: "transform 0.12s ease",
                          }}
                        >
                          <span>{cust.icon}</span>
                          <span>{cust.label}</span>
                          <button
                            type="button"
                            onClick={(e) => handleRemoveCustom(cust.id, e)}
                            title="Remove custom object"
                            style={{
                              background: isSelected ? COLORS.white : COLORS.ink,
                              color: isSelected ? COLORS.ink : COLORS.white,
                              border: "none",
                              borderRadius: "50%",
                              width: 20,
                              height: 20,
                              display: "inline-flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 12,
                              cursor: "pointer",
                              marginLeft: 4,
                            }}
                          >
                            ×
                          </button>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </section>

            {/* GENERATE BUTTON */}
            <div style={{ textAlign: "center" }}>
              <button
                onClick={handleGenerate}
                disabled={isGenerateDisabled}
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: "clamp(17px, 2.4vw, 24px)",
                  padding: "20px 42px",
                  borderRadius: 50,
                  border: `4px solid ${COLORS.ink}`,
                  background: isGenerateDisabled ? "#D1C7BD" : COLORS.coral,
                  color: isGenerateDisabled ? "#7A7268" : COLORS.white,
                  cursor: isGenerateDisabled ? "not-allowed" : "pointer",
                  boxShadow: isGenerateDisabled ? `3px 3px 0 ${COLORS.ink}` : `8px 8px 0 ${COLORS.ink}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 12,
                  letterSpacing: 0.5,
                }}
              >
                <span>⚡</span> GENERATE USELESS INVENTION <span>🚀</span>
              </button>

              <p
                style={{
                  marginTop: 16,
                  fontSize: 13,
                  fontWeight: 600,
                  color: isGenerateDisabled ? COLORS.coral : "#7A7268",
                }}
              >
                {selectedIds.length < 2
                  ? `Add at least ${2 - selectedIds.length} more custom object${2 - selectedIds.length === 1 ? "" : "s"} to unlock invention`
                  : `${selectedIds.length} custom objects ready to ruin humanity.`}
              </p>
            </div>
          </div>
        )}
      </main>

      {/* =========================================================================
          LOADING OVERLAY (Centered card, blurred backdrop, rotating messages, spinner)
          ========================================================================= */}
      {isLoading && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(23, 19, 16, 0.45)",
            backdropFilter: "blur(7px)",
            WebkitBackdropFilter: "blur(7px)",
            zIndex: 999,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: 20,
          }}
        >
          <div
            style={{
              background: COLORS.white,
              border: `4.5px solid ${COLORS.ink}`,
              borderRadius: 28,
              padding: "44px 36px",
              boxShadow: `14px 14px 0 ${COLORS.ink}`,
              maxWidth: 520,
              width: "100%",
              textAlign: "center",
              animation: "popIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >
            {/* Playful Orbit Spinner in Purple & Lime */}
            <div
              style={{
                position: "relative",
                width: 90,
                height: 90,
                margin: "0 auto 28px",
              }}
            >
              <div
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  border: `4px dashed ${COLORS.purple}`,
                  animation: "spinSlow 4s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  inset: 12,
                  borderRadius: "50%",
                  border: `4px solid ${COLORS.lime}`,
                  borderTopColor: "transparent",
                  animation: "spinFast 1.2s linear infinite",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  transform: "translate(-50%, -50%)",
                  fontSize: 28,
                }}
              >
                ⚡
              </div>
            </div>

            <h3
              style={{
                fontFamily: "'Bungee', cursive",
                fontSize: 23,
                color: COLORS.ink,
                margin: "0 0 16px",
                letterSpacing: 0.5,
              }}
            >
              AI IS WASTING ELECTRICITY...
            </h3>

            <div
              style={{
                background: COLORS.lightGray,
                border: `2.5px solid ${COLORS.ink}`,
                borderRadius: 16,
                padding: "14px 18px",
                minHeight: 54,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontSize: 15,
                fontWeight: 600,
                color: COLORS.ink,
                boxShadow: `3px 3px 0 ${COLORS.ink}`,
                animation: "fadeIn 0.25s ease",
              }}
            >
              "{LOADING_MESSAGES[loadingMsgIndex]}"
            </div>

            <div
              style={{
                marginTop: 22,
                height: 10,
                background: "#E5DEC9",
                border: `2px solid ${COLORS.ink}`,
                borderRadius: 20,
                overflow: "hidden",
              }}
            >
              <div
                style={{
                  height: "100%",
                  background: `linear-gradient(90deg, ${COLORS.purple}, ${COLORS.lime})`,
                  width: "100%",
                  animation: "fillProgress 5.6s linear forwards",
                }}
              />
            </div>
          </div>
        </div>
      )}

      {/* =========================================================================
          RESULT MODAL POPUP (All 7 requested sections)
          ========================================================================= */}
      {showModal && generatedResult && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(23, 19, 16, 0.65)",
            backdropFilter: "blur(9px)",
            WebkitBackdropFilter: "blur(9px)",
            zIndex: 1000,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "20px 16px",
            overflowY: "auto",
          }}
        >
          {/* Close button — fixed to viewport top-right, never scrolls away */}
          <button
            onClick={() => setShowModal(false)}
            aria-label="Close"
            style={{
              position: "fixed",
              top: 20,
              right: 24,
              zIndex: 2000,
              width: 42,
              height: 42,
              borderRadius: "50%",
              border: `3px solid ${COLORS.ink}`,
              background: COLORS.white,
              color: COLORS.ink,
              fontWeight: 900,
              fontSize: 22,
              cursor: "pointer",
              boxShadow: `3px 3px 0 ${COLORS.ink}`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              transition: "transform 0.12s ease",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.transform = "scale(1.1)")}
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            ×
          </button>

          <div
            style={{
              background: "#FFFDF9",
              border: `4.5px solid ${COLORS.ink}`,
              borderRadius: 28,
              boxShadow: `14px 14px 0 ${COLORS.ink}`,
              maxWidth: 720,
              width: "100%",
              maxHeight: "92vh",
              overflowY: "auto",
              position: "relative",
              padding: "36px 32px 40px",
              textAlign: "left",
              animation: "modalPopIn 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)",
            }}
          >

            {/* 1. INVENTION HERO */}
            <div style={{ textAlign: "center", marginBottom: 28, borderBottom: `3px dashed ${COLORS.ink}`, paddingBottom: 28 }}>
              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.cream}, #FFE4D6)`,
                  border: `3.5px solid ${COLORS.ink}`,
                  borderRadius: 20,
                  height: 180,
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  boxShadow: `6px 6px 0 ${COLORS.ink}`,
                  marginBottom: 20,
                  position: "relative",
                  overflow: "hidden",
                }}
              >
                <div style={{ display: "flex", gap: 16, alignItems: "center", zIndex: 2 }}>
                  {generatedResult.icons.map((ic, idx) => (
                    <div
                      key={idx}
                      style={{
                        fontSize: 44,
                        background: COLORS.white,
                        border: `2.5px solid ${COLORS.ink}`,
                        borderRadius: 16,
                        padding: "8px 12px",
                        boxShadow: `3px 3px 0 ${COLORS.ink}`,
                        transform: idx % 2 === 0 ? "rotate(-6deg)" : "rotate(6deg)",
                      }}
                    >
                      {ic}
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    position: "absolute",
                    top: 10,
                    right: 14,
                    fontSize: 26,
                    opacity: 0.7,
                  }}
                >
                  ⚡
                </div>
                <div
                  style={{
                    position: "absolute",
                    bottom: 10,
                    left: 14,
                    fontSize: 24,
                    opacity: 0.7,
                  }}
                >
                  ⚙️
                </div>
              </div>

              <div
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: 1.5,
                  textTransform: "uppercase",
                  color: COLORS.blue,
                  marginBottom: 6,
                }}
              >
                AI-GENERATED USELESS INVENTION
              </div>

              <h2
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: "clamp(24px, 4vw, 36px)",
                  margin: "0 0 12px",
                  color: COLORS.ink,
                  lineHeight: 1.1,
                }}
              >
                {generatedResult.name}
              </h2>

              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: COLORS.lime,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 20,
                  padding: "4px 14px",
                  fontWeight: 800,
                  fontSize: 12,
                  boxShadow: `2px 2px 0 ${COLORS.ink}`,
                }}
              >
                ✓ CERTIFIED POINTLESS
              </div>
            </div>

            {/* 2. WHAT IS IT? */}
            <div style={{ marginBottom: 22 }}>
              <div
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 16,
                  color: COLORS.ink,
                  marginBottom: 6,
                }}
              >
                WHAT IS THIS THING?
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: COLORS.darkGray,
                  fontWeight: 500,
                  margin: 0,
                  background: COLORS.lightGray,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 14,
                  padding: "14px 18px",
                }}
              >
                {generatedResult.description}
              </p>
            </div>

            {/* 3. PROBLEM IT SOLVES */}
            <div style={{ marginBottom: 24 }}>
              <div
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 16,
                  color: COLORS.ink,
                  marginBottom: 6,
                }}
              >
                THE PROBLEM IT SOLVES
              </div>
              <p
                style={{
                  fontSize: 15,
                  lineHeight: 1.6,
                  color: COLORS.darkGray,
                  fontWeight: 500,
                  margin: 0,
                  background: COLORS.lightGray,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 14,
                  padding: "14px 18px",
                }}
              >
                {generatedResult.problemSolves}
              </p>
            </div>

            {/* 4. UNNECESSARY PRODUCT DETAILS */}
            <div style={{ marginBottom: 28 }}>
              <div
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 16,
                  color: COLORS.ink,
                  marginBottom: 10,
                }}
              >
                UNNECESSARY PRODUCT DETAILS
              </div>
              <div
                style={{
                  display: "grid",
                  gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
                  gap: 12,
                }}
              >
                <div
                  style={{
                    background: COLORS.white,
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 14,
                    padding: "12px",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>💸 Estimated Price</div>
                  <div style={{ fontFamily: "'Bungee', cursive", fontSize: 18, color: COLORS.ink, marginTop: 4 }}>
                    {generatedResult.details.price}
                  </div>
                </div>

                <div
                  style={{
                    background: COLORS.white,
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 14,
                    padding: "12px",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>📉 Market Demand</div>
                  <div style={{ fontFamily: "'Bungee', cursive", fontSize: 18, color: COLORS.coral, marginTop: 4 }}>
                    {generatedResult.details.demand}
                  </div>
                </div>

                <div
                  style={{
                    background: COLORS.white,
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 14,
                    padding: "12px",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>🔧 Complexity</div>
                  <div style={{ fontWeight: 800, fontSize: 14, color: COLORS.ink, marginTop: 4 }}>
                    {generatedResult.details.complexity}
                  </div>
                </div>

                <div
                  style={{
                    background: COLORS.white,
                    border: `2.5px solid ${COLORS.ink}`,
                    borderRadius: 14,
                    padding: "12px",
                    boxShadow: `3px 3px 0 ${COLORS.ink}`,
                  }}
                >
                  <div style={{ fontSize: 12, fontWeight: 700, color: "#666" }}>🌍 Environment</div>
                  <div style={{ fontWeight: 700, fontSize: 13, color: COLORS.coral, marginTop: 4 }}>
                    {generatedResult.details.environment}
                  </div>
                </div>
              </div>
            </div>

            {/* 5. AI ANALYSIS / SCORES */}
            <div
              style={{
                background: COLORS.white,
                border: `3px solid ${COLORS.ink}`,
                borderRadius: 18,
                padding: "20px",
                boxShadow: `5px 5px 0 ${COLORS.ink}`,
                marginBottom: 24,
              }}
            >
              <div
                style={{
                  fontFamily: "'Bungee', cursive",
                  fontSize: 16,
                  color: COLORS.ink,
                  marginBottom: 14,
                }}
              >
                AI ANALYSIS / POINTLESS SCORES
              </div>

              <div style={{ display: "grid", gap: 12, marginBottom: 18 }}>
                {[
                  { label: "USELESSNESS", val: generatedResult.scores.uselessness, color: COLORS.purple },
                  { label: "CREATIVITY", val: generatedResult.scores.creativity, color: COLORS.coral },
                  { label: "RIDICULOUSNESS", val: generatedResult.scores.ridiculousness, color: COLORS.mustard },
                  { label: "WASTE OF MONEY", val: generatedResult.scores.wasteOfMoney, color: COLORS.lime },
                ].map((m) => (
                  <div key={m.label}>
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 12, fontWeight: 800, marginBottom: 4 }}>
                      <span>{m.label}</span>
                      <span>{m.val}%</span>
                    </div>
                    <div
                      style={{
                        height: 10,
                        background: "#EAE5DC",
                        borderRadius: 20,
                        border: `2px solid ${COLORS.ink}`,
                        overflow: "hidden",
                      }}
                    >
                      <div
                        style={{
                          height: "100%",
                          width: `${m.val}%`,
                          background: m.color,
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div
                style={{
                  background: `linear-gradient(135deg, ${COLORS.purple}, #6366F1)`,
                  color: COLORS.white,
                  border: `2.5px solid ${COLORS.ink}`,
                  borderRadius: 14,
                  padding: "16px",
                  textAlign: "center",
                  boxShadow: `3px 3px 0 ${COLORS.ink}`,
                }}
              >
                <div style={{ fontSize: 13, fontWeight: 700, letterSpacing: 1, textTransform: "uppercase" }}>
                  OVERALL POINTLESSNESS SCORE
                </div>
                <div style={{ fontFamily: "'Bungee', cursive", fontSize: 44, lineHeight: 1, margin: "6px 0" }}>
                  {generatedResult.scores.overall} <span style={{ fontSize: 24, opacity: 0.85 }}>/ 100</span>
                </div>
                <div style={{ fontSize: 14, fontWeight: 600, color: COLORS.lime }}>
                  "Humanity will survive without this."
                </div>
              </div>
            </div>

            {/* 6. AI ROAST */}
            <div
              style={{
                background: "#FFEAEA",
                border: `3px solid ${COLORS.ink}`,
                borderRadius: 18,
                padding: "20px",
                boxShadow: `5px 5px 0 ${COLORS.ink}`,
                marginBottom: 32,
              }}
            >
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 6,
                  background: COLORS.coral,
                  color: COLORS.white,
                  padding: "4px 12px",
                  borderRadius: 20,
                  fontSize: 12,
                  fontWeight: 800,
                  border: `2px solid ${COLORS.ink}`,
                  marginBottom: 10,
                }}
              >
                🤖 AI ROAST
              </div>
              <p
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontSize: 16,
                  fontWeight: 700,
                  color: COLORS.ink,
                  margin: 0,
                  lineHeight: 1.5,
                }}
              >
                "{generatedResult.roast}"
              </p>
            </div>

            {/* 7. RESULT ACTIONS */}
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                gap: 16,
                flexWrap: "wrap",
                borderTop: `3px dashed ${COLORS.ink}`,
                paddingTop: 24,
              }}
            >
              <button
                onClick={handleSaveToHall}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 26px",
                  borderRadius: 40,
                  border: `3px solid ${COLORS.ink}`,
                  background: COLORS.mustard,
                  color: COLORS.ink,
                  cursor: "pointer",
                  boxShadow: `5px 5px 0 ${COLORS.ink}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                💾 SAVE TO HALL OF USELESSNESS
              </button>

              <button
                onClick={handleMakeAnotherMistake}
                style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: 15,
                  padding: "14px 26px",
                  borderRadius: 40,
                  border: `3px solid ${COLORS.ink}`,
                  background: COLORS.white,
                  color: COLORS.ink,
                  cursor: "pointer",
                  boxShadow: `5px 5px 0 ${COLORS.ink}`,
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                }}
              >
                🔄 MAKE ANOTHER MISTAKE
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FOOTER */}
      <footer
        style={{
          textAlign: "center",
          padding: "36px 20px",
          fontSize: 13,
          fontWeight: 500,
          color: "#7a7268",
          borderTop: `2px dashed rgba(23,19,16,0.15)`,
          maxWidth: 900,
          margin: "0 auto",
        }}
      >
        ITHENTHINA? Invention Lab — where bad ideas find their true potential.
      </footer>
    </div>
  );
}
