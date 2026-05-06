import { K_TYPE } from "../../../utils/K_Type";
import { TYPE_COLORS } from "../../../utils/pokemonColors";

interface ModalLeftPanelProps {
  id: number;
  img: string;
  koName: string;
  genus: string;
  types: string[];
  height: number;
  weight: number;
}

const ModalLeftPanel = ({ id, img, koName, genus, types, height, weight }: ModalLeftPanelProps) => (
  <div className="w-full min-[790px]:w-[300px] min-[790px]:min-w-[220px] rounded-[14px] border border-white/60 bg-white flex flex-col items-center justify-center gap-1 p-3 text-center box-border">
    <span className="text-[13px] text-gray-400 font-medium">No. {String(id).padStart(3, "0")}</span>

    <div className="w-[120px] h-[120px] bg-[#f0fafa] rounded-xl flex items-center justify-center my-1">
      <img src={img} className="w-[90px] h-[90px] object-contain" alt={koName} />
    </div>

    <h2 className="text-[25px] font-black text-[#1a1a1a] m-0">{koName}</h2>
    <p className="text-[15px] text-gray-400 m-0">{genus}</p>

    <div className="flex gap-1 flex-wrap justify-center my-0.5">
      {types.map((t) => (
        <span
          key={t}
          className={`${TYPE_COLORS[t] ?? "bg-gray-400"} px-2.5 py-0.5 rounded-full text-[11px] font-bold text-white uppercase`}
        >
          {K_TYPE[t.toUpperCase()] ?? t}
        </span>
      ))}
    </div>

    <div className="text-[12px] text-gray-400 border border-gray-200 rounded-full px-3.5 py-0.5 mt-0.5">
      {(height / 10).toFixed(1)}m &nbsp; {(weight / 10).toFixed(1)}kg
    </div>
  </div>
);

export default ModalLeftPanel;
