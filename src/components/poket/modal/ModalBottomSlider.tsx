import { useState } from "react";
import type { Sprite } from "../../../types/pokemon";

const ModalBottomSlider = ({ sprites }: { sprites: Sprite[] }) => {
  const [idx, setIdx] = useState(0);
  const total = sprites.length;

  return (
    <div className="flex min-[790px]:hidden items-center shrink-0 h-27.5 px-3.5 pb-3.5 box-border relative">
      <button
        onClick={() => setIdx((i) => Math.max(0, i - 1))}
        disabled={idx === 0}
        className="absolute left-4.5 z-10 w-8 h-8 rounded-full bg-white/25 border border-white/60 text-white text-xl flex items-center justify-center cursor-pointer disabled:opacity-25 disabled:pointer-events-none hover:bg-white/45 transition-colors"
      >
        ‹
      </button>

      <div className="flex-1 overflow-hidden rounded-xl mx-11">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${idx * 100}%)` }}
        >
          {sprites.map((s, i) => (
            <div
              key={s.label}
              className="flex-none w-full rounded-xl border border-white/60 bg-white/20 flex flex-col items-center justify-center gap-1 p-2"
            >
              {s.src
                ? <img src={s.src} className="w-16 h-16 object-contain" style={{ imageRendering: "pixelated" }} alt={s.label} />
                : <div className="w-16 h-16 bg-white/20 rounded-lg" />
              }
              <span className="text-[11px] text-white/90 font-medium">{s.label}</span>
              <span className="text-[10px] text-white/50">{i + 1} / {total}</span>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={() => setIdx((i) => Math.min(total - 1, i + 1))}
        disabled={idx === total - 1}
        className="absolute right-4.5 z-10 w-8 h-8 rounded-full bg-white/25 border border-white/60 text-white text-xl flex items-center justify-center cursor-pointer disabled:opacity-25 disabled:pointer-events-none hover:bg-white/45 transition-colors"
      >
        ›
      </button>
    </div>
  );
};

export default ModalBottomSlider;
