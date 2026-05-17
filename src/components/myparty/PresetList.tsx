import type { PartyPreset } from '../../types/pokemon';

interface PresetListProps {
  presets: PartyPreset[];
  loadedPresetIndex: number | null;
  onLoad: (index: number) => void;
  onDelete: (index: number) => void;
  onNewSlot: (slotIndex: number) => void;
}

const PRESET_COLORS = [
  { bg: 'bg-orange-50 border-orange-200', text: 'text-orange-600' },
  { bg: 'bg-blue-50 border-blue-200', text: 'text-blue-600' },
  { bg: 'bg-teal-50 border-teal-200', text: 'text-teal-600' },
];

const PresetList = ({ presets, loadedPresetIndex, onLoad, onDelete, onNewSlot }: PresetListProps) => {
  return (
    <div className="flex flex-col gap-2">
      {[0, 1, 2].map((slotIndex) => {
        const preset = presets[slotIndex];
        const isLoaded = loadedPresetIndex === slotIndex;
        const color = PRESET_COLORS[slotIndex];

        if (!preset) {
          return (
            <button
              key={slotIndex}
              type="button"
              onClick={() => onNewSlot(slotIndex)}
              className={`w-full px-4 py-2.5 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 text-gray-400 text-sm font-semibold text-center transition-all hover:border-teal-400 hover:text-teal-600 hover:bg-teal-50
                ${isLoaded ? 'outline outline-2 outline-teal-400 outline-offset-1' : ''}`}
            >
              + 새 파티 저장
            </button>
          );
        }

        return (
          <div
            key={slotIndex}
            className={`flex items-center justify-between rounded-xl px-3 py-2.5 border ${color.bg} transition-all
              ${isLoaded ? 'outline outline-2 outline-teal-400 outline-offset-1' : ''}`}
          >
            <button
              type="button"
              onClick={() => onLoad(slotIndex)}
              className="flex-1 min-w-0 text-left bg-transparent border-none cursor-pointer"
            >
              <span className={`text-sm font-semibold ${color.text} truncate block`}>
                {preset.name}
              </span>
            </button>
            <button
              type="button"
              onClick={() => onDelete(slotIndex)}
              className="ml-2 w-6 h-6 flex items-center justify-center text-gray-300 hover:text-red-400 border-none bg-transparent cursor-pointer rounded-lg text-sm transition-colors"
            >
              ✕
            </button>
          </div>
        );
      })}
    </div>
  );
};

export default PresetList;
