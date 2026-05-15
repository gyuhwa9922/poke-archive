import { TYPE_COLORS } from '../../utils/pokemonColors';
import { K_TYPE } from '../../utils/K_Type';
import PocketBall from '../poket/custom/PocketBall';

interface PokemonCardBaseProps {
  no: number;
  img: string;
  koName: string;
  types: string[];
  isBookmarked: boolean;
  isLoggedIn?: boolean;
  isInParty?: boolean;
  onClick: () => void;
  onRegister?: () => void;
  onDelete: () => void;
}

const PokemonCardBase = ({
  no,
  img,
  koName,
  types,
  isBookmarked,
  isLoggedIn = true,
  isInParty = false,
  onClick,
  onRegister,
  onDelete,
}: PokemonCardBaseProps) => {
  return (
    <div
      className={`group relative bg-white rounded-2xl shadow-sm transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden h-fit w-full
        ${isInParty
          ? 'opacity-60 outline outline-2 outline-teal-400 outline-offset-2 cursor-not-allowed'
          : 'hover:shadow-xl hover:-translate-y-1'}`}
    >
      {isInParty && (
        <span className="absolute top-2 left-2 z-10 w-6 h-6 bg-teal-400 rounded-full flex items-center justify-center shadow">
          <svg width="14" height="14" fill="none" stroke="white" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}

      <div
        onClick={onClick}
        className="relative h-44 flex items-center justify-center bg-[#F7F9F8] group-hover:bg-[#E8F5E9] transition-colors shrink-0 cursor-pointer"
      >
        {img && (
          <img
            src={img}
            alt={koName}
            className="w-28 h-28 object-contain drop-shadow-md transition-transform duration-300 group-hover:scale-110"
          />
        )}
      </div>

      <div className="flex flex-col gap-4 p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black text-gray-300 tracking-wider leading-none px-1.25">
            No.{String(no).padStart(3, '0')}
          </span>

          <div className="flex justify-between items-center px-1.25">
            <h3 className="text-xl font-black text-gray-800 leading-tight">{koName}</h3>

            {isLoggedIn && (
              isBookmarked ? (
                <button
                  onClick={(e) => { e.stopPropagation(); onDelete(); }}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                >
                  <PocketBall isOn={true} />
                </button>
              ) : (
                <button
                  onClick={(e) => { e.stopPropagation(); onRegister?.(); }}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                >
                  <PocketBall isOn={false} />
                </button>
              )
            )}
          </div>
        </div>

        <div className="flex flex-wrap gap-2 px-1.25">
          {types.map((t) => (
            <span
              key={t}
              className={`flex items-center justify-center px-3 py-1 h-6 rounded-full text-white text-md uppercase tracking-tight ${TYPE_COLORS[t] ?? 'bg-gray-400'} shadow-sm min-w-15`}
            >
              {K_TYPE[t.toUpperCase()] ?? t}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

export default PokemonCardBase;
