"use client";
import { useState } from "react";

// 3 писюна, летят вправо (направление удара), stagger 0/250/500ms
const PISUNS = [
  { id: 0, delay: 0,   endX: 160, endY: -70, rot: -25 },
  { id: 1, delay: 250, endX: 190, endY: 10,  rot: 5   },
  { id: 2, delay: 500, endX: 150, endY: 70,  rot: 35  },
];

function Pisun({ delay, endX, endY, rot, active }: {
  delay: number; endX: number; endY: number; rot: number; active: boolean;
}) {
  return (
    <div
      className="pisun"
      style={{
        "--ex": `${endX}px`,
        "--ey": `${endY}px`,
        "--rot": `${rot}deg`,
        animationDelay: `${delay}ms`,
        animationPlayState: active ? "running" : "paused",
      } as React.CSSProperties}
    >
      <svg width="28" height="44" viewBox="0 0 28 44" xmlns="http://www.w3.org/2000/svg">
        <rect x="8" y="14" width="12" height="22" rx="6" fill="#ffb347" stroke="#e07000" strokeWidth="1.5"/>
        <ellipse cx="14" cy="13" rx="8" ry="7" fill="#ffcc88" stroke="#e07000" strokeWidth="1.5"/>
        <ellipse cx="9"  cy="36" rx="7" ry="6" fill="#ffb347" stroke="#e07000" strokeWidth="1.5"/>
        <ellipse cx="19" cy="36" rx="7" ry="6" fill="#ffb347" stroke="#e07000" strokeWidth="1.5"/>
        <circle cx="11" cy="11" r="2" fill="#333"/>
        <circle cx="17" cy="11" r="2" fill="#333"/>
        <path d="M 10 16 Q 14 19 18 16" stroke="#e07000" strokeWidth="1" fill="none" strokeLinecap="round"/>
        <ellipse cx="11" cy="9" rx="2" ry="1.2" fill="white" opacity="0.6"/>
      </svg>
    </div>
  );
}

export default function Home() {
  const [pressed, setPressed] = useState<string | null>(null);
  const [clickCount, setClickCount] = useState(0);
  const [hovering, setHovering] = useState(false);

  const handlePress = (id: string) => {
    setPressed(id);
    setClickCount((c) => c + 1);
    setTimeout(() => setPressed(null), 150);
  };

  return (
    <div className="page-bg min-h-screen flex flex-col items-center justify-center gap-10 p-8 overflow-hidden">
      <div className="stars" aria-hidden />

      <h1 className="ololo-text select-none text-center leading-tight">
        ОЛОЛО<br />
        <span className="pysch">ПЫЩПЫЩ ПЫЩ</span>
      </h1>

      <div
        className="upyachka-wrap"
        onMouseEnter={() => setHovering(true)}
        onMouseLeave={() => setHovering(false)}
      >
        {/* Обёртка фиксированного размера = размер SVG, писюны внутри неё */}
        <div className="svg-wrapper">
          {PISUNS.map((p) => (
            <Pisun key={p.id} active={hovering} {...p} />
          ))}

          <svg
            viewBox="0 0 200 280"
            width="200"
            height="280"
            className={`upyachka-svg ${hovering ? "upyachka-kicking" : ""}`}
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="100" cy="70" r="68" fill="url(#glow)" opacity="0.35" className="halo" />
            <circle cx="100" cy="70" r="55" fill="#FFE066" stroke="#FF6B00" strokeWidth="4" />

            <ellipse cx="78" cy="58" rx="14" ry="16" fill="white" />
            <ellipse cx="122" cy="58" rx="14" ry="16" fill="white" />
            <circle cx="82" cy="60" r="8" fill="#222" />
            <circle cx="126" cy="60" r="8" fill="#222" />
            <circle cx="85" cy="56" r="3" fill="white" />
            <circle cx="129" cy="56" r="3" fill="white" />

            {hovering && (
              <>
                <line x1="64" y1="40" x2="92" y2="48" stroke="#FF2200" strokeWidth="4" strokeLinecap="round"/>
                <line x1="108" y1="48" x2="136" y2="40" stroke="#FF2200" strokeWidth="4" strokeLinecap="round"/>
              </>
            )}

            <path
              d={hovering ? "M 72 95 Q 100 85 128 95" : "M 68 88 Q 100 118 132 88"}
              stroke="#FF6B00" strokeWidth="5" fill="none" strokeLinecap="round"
            />

            <ellipse cx="60" cy="82" rx="12" ry="8" fill="#FF9999" opacity="0.6" />
            <ellipse cx="140" cy="82" rx="12" ry="8" fill="#FF9999" opacity="0.6" />

            <line x1="100" y1="124" x2="100" y2="210" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />

            <line x1="100" y1="145" x2="38" y2="100" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
            <line x1="100" y1="145" x2="162" y2="100" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
            <circle cx="38" cy="100" r="8" fill="#FFE066" stroke="#FF6B00" strokeWidth="3" />
            <circle cx="162" cy="100" r="8" fill="#FFE066" stroke="#FF6B00" strokeWidth="3" />

            <line x1="100" y1="210" x2="68" y2="265" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
            {hovering ? (
              <line x1="100" y1="210" x2="155" y2="185" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
            ) : (
              <line x1="100" y1="210" x2="132" y2="265" stroke="#FF6B00" strokeWidth="6" strokeLinecap="round" />
            )}

            <ellipse cx="68" cy="267" rx="14" ry="7" fill="#FFE066" stroke="#FF6B00" strokeWidth="3" />
            {hovering ? (
              <ellipse cx="160" cy="183" rx="14" ry="7" fill="#FFE066" stroke="#FF6B00" strokeWidth="3" transform="rotate(-30 160 183)" />
            ) : (
              <ellipse cx="132" cy="267" rx="14" ry="7" fill="#FFE066" stroke="#FF6B00" strokeWidth="3" />
            )}

            <defs>
              <radialGradient id="glow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FFE066" />
                <stop offset="100%" stopColor="#FF6B00" stopOpacity="0" />
              </radialGradient>
            </defs>
          </svg>
        </div>

        <div className="upyachka-shadow" />

        {hovering && (
          <div className="kick-label">ПАЦ ПАЦ ПАЦ 💥</div>
        )}
      </div>

      {clickCount > 0 && (
        <p className="counter-text">
          нажато {clickCount} раз{clickCount === 1 ? "" : clickCount < 5 ? "а" : ""}! 🔥
        </p>
      )}

      <div className="flex flex-wrap gap-4 justify-center">
        <button
          className={`btn btn-red ${pressed === "a" ? "btn-pressed" : ""}`}
          onPointerDown={() => handlePress("a")}
        >
          ПЫЩПЫЩ
        </button>
        <button
          className={`btn btn-blue ${pressed === "b" ? "btn-pressed" : ""}`}
          onPointerDown={() => handlePress("b")}
        >
          ОЛОЛО
        </button>
        <button
          className={`btn btn-green ${pressed === "c" ? "btn-pressed" : ""}`}
          onPointerDown={() => handlePress("c")}
        >
          УПЯЧКА!
        </button>
      </div>
    </div>
  );
}
