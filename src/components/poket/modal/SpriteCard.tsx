import type { Sprite } from "../../../types/pokemon";

const SpriteCard = ({ src, label }: Sprite) => (
  <div className="rounded-xl border border-white/60 bg-white/20 flex flex-col items-center justify-center gap-1 p-2 box-border">
    {src
      ? <img src={src} className="w-11 h-11 object-contain" alt={label} />
      : <div className="w-11 h-11 bg-white/20 rounded-lg" />
    }
    <span className="text-[10px] text-white/85 font-medium">{label}</span>
  </div>
);

export default SpriteCard;
