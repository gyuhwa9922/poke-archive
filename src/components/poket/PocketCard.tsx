import { useEffect, useState } from 'react';
import { fetchPokemonDetail, fetchPokemonSpecies } from '../../api/poket';
import { useAuthStore } from '../../store/authStore';
import { TYPE_COLORS } from '../../utils/pokemonColors';
import { K_TYPE } from '../../utils/K_Type';
import type { PokemonDetail, PokemonSpecies } from '../../types/pokemon';
import PocketBall from './custom/PocketBall';

interface PocketCardProps {
  no: number;
  myPocketMons: number[];
  onClick: (no: number) => void;
  onRegister: (id: number) => void;
  onDelete: (id: number) => void;
}

const PocketCard = ({ no, myPocketMons = [], onClick, onRegister, onDelete }: PocketCardProps) => {
  const { isLoggedIn } = useAuthStore();
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    fetchPokemonDetail(no).then((data) => setDetail(data as PokemonDetail));
    fetchPokemonSpecies(no).then((data) => setSpecies(data as PokemonSpecies));
  }, [no]);

  const koName = species?.names.find((n) => n.language.name === 'ko')?.name ?? '-';
  const img =
    detail?.sprites.other?.['official-artwork']?.front_default ??
    detail?.sprites.front_default ??
    '';
  const types = detail?.types.map((t) => t.type.name) ?? [];
  const isInParty = myPocketMons.includes(no);
  return (
    <div className="group bg-white rounded-2xl shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col border border-gray-100 overflow-hidden h-fit w-full">
      {/* 이미지 영역 */}
      <div
        onClick={() => onClick(no)}
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

      {/* 정보 영역 */}
      <div className="flex flex-col gap-4 p-2.5">
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-black text-gray-300 tracking-wider leading-none px-1.25">
            No.{String(no).padStart(3, '0')}
          </span>

          <div className="flex justify-between items-center px-1.25">
            <h3 className="text-xl font-black text-gray-800 leading-tight">{koName}</h3>

            {isLoggedIn &&
              (isInParty ? (
                <button
                  onClick={() => onDelete(no)}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                >
                  <PocketBall isOn={true} />
                </button>
              ) : (
                <button
                  onClick={() => onRegister(no)}
                  className="w-7 h-7 flex items-center justify-center cursor-pointer transition-transform hover:scale-110"
                >
                  <PocketBall isOn={false} />
                </button>
              ))}
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

export default PocketCard;
