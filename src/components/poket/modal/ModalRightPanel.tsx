import type { Stat } from "../../../types/pokemon";

interface ModalRightPanelProps {
  stats: Stat[];
  flavor: string;
}

const ModalRightPanel = ({ stats, flavor }: ModalRightPanelProps) => (
  <div className="flex-1 rounded-[14px] border border-white/60 bg-white flex flex-col gap-3 px-5 py-[18px] overflow-y-visible min-[790px]:overflow-y-auto box-border">
    <div>
      <p className="text-[15px] font-extrabold text-[#333] tracking-widest m-0 mb-2.5">BASE STATS</p>
      {stats.map((s) => (
        <div key={s.name} className="flex items-center gap-2.5 mb-1.5">
          <span className="text-[12px] text-gray-500 w-9 shrink-0">{s.name}</span>
          <span className="text-[12px] font-bold text-[#222] w-[26px] text-right shrink-0">{s.value}</span>
          <div className="flex-1 bg-[#e8f5f4] rounded-full h-[7px]">
            <div
              className="h-[7px] rounded-full"
              style={{ width: `${Math.min((s.value / 255) * 100, 100)}%`, background: s.color }}
            />
          </div>
        </div>
      ))}
    </div>

    <hr className="border-none border-t border-gray-100 m-0" />

    <div>
      <p className="text-[15px] font-extrabold text-[#333] tracking-widest m-0 mb-1.5">설명</p>
      <p className="text-[18px] text-[#555] leading-relaxed m-0">{flavor}</p>
    </div>
  </div>
);

export default ModalRightPanel;
