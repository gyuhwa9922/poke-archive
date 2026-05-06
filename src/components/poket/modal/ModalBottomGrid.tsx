import type { Sprite } from "../../../types/pokemon";
import SpriteCard from "./SpriteCard";

const ModalBottomGrid = ({ sprites }: { sprites: Sprite[] }) => (
  <div
    className="hidden min-[790px]:grid grid-cols-6 gap-2 px-3.5 pb-3.5 pt-2 box-border"
    style={{ flex: 2 }}
  >
    {sprites.map((s) => <SpriteCard key={s.label} {...s} />)}
  </div>
);

export default ModalBottomGrid;
