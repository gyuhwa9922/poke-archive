import { useEffect, useState } from "react";
import { fetchPokemonDetail, fetchPokemonSpecies } from "../../api/poket";
import { STAT_MAP } from "../../utils/K_Type";
import { STAT_COLORS } from "../../utils/pokemonColors";
import type { PokemonDetail, PokemonSpecies, Sprite, Stat } from "../../types/pokemon";
import ModalLeftPanel from "./modal/ModalLeftPanel";
import ModalRightPanel from "./modal/ModalRightPanel";
import ModalBottomGrid from "./modal/ModalBottomGrid";
import ModalBottomSlider from "./modal/ModalBottomSlider";

interface PocketDetailModalProps {
  isOpen: boolean;
  onClose: () => void;
  no: number | null;
}

const PocketDetailModal = ({ isOpen, onClose, no }: PocketDetailModalProps) => {
  const [detail, setDetail] = useState<PokemonDetail | null>(null);
  const [species, setSpecies] = useState<PokemonSpecies | null>(null);

  useEffect(() => {
    if (!no) return;
    fetchPokemonDetail(no).then((data) => setDetail(data as PokemonDetail));
    fetchPokemonSpecies(no).then((data) => setSpecies(data as PokemonSpecies));
  }, [no]);

  if (!isOpen || !no) return null;

  const isLoading = !detail || detail.id !== no;

  const koName = species?.names.find((n) => n.language.name === "ko")?.name ?? "";
  const genus =
    species?.genera?.find((g) => g.language.name === "ko")?.genus ??
    species?.genera?.find((g) => g.language.name === "en")?.genus ?? "";
  const flavorEntry =
    species?.flavor_text_entries.find((e) => e.language.name === "ko") ??
    species?.flavor_text_entries.find((e) => e.language.name === "en");
  const flavor = flavorEntry?.flavor_text.replace(/\f|\n/g, " ") ?? "";
  const img =
    detail?.sprites.other?.["official-artwork"]?.front_default ??
    detail?.sprites.front_default ?? "";
  const types = detail?.types.map((t) => t.type.name) ?? [];
  const stats: Stat[] = (detail?.stats ?? [])
    .filter((s) => ["hp", "attack", "defense", "speed"].includes(s.stat.name))
    .map((s) => ({
      name: STAT_MAP[s.stat.name],
      value: s.base_stat,
      color: STAT_COLORS[s.stat.name],
    }));
  const sprites: Sprite[] = detail
    ? [
        { label: "Front", src: detail.sprites.front_default },
        { label: "Back", src: detail.sprites.back_default },
        { label: "Shiny", src: detail.sprites.front_shiny },
        { label: "Shiny Back", src: detail.sprites.back_shiny },
        { label: "Home", src: detail.sprites.other?.home?.front_default },
        { label: "Dream", src: detail.sprites.other?.dream_world?.front_default },
      ]
    : [];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div onClick={onClose} className="absolute inset-0 bg-black/50 backdrop-blur-sm" />

      <div
        className="relative z-10 w-full mx-8 max-w-197.25 max-h-[85vh] overflow-y-auto min-[790px]:overflow-visible min-[790px]:h-148.5 rounded-[26px] flex flex-col box-border"
        style={{
          background: "linear-gradient(121deg, #05B29F -1.1%, #22A9DA 98.38%)",
          boxShadow: "0 0 0 4px rgba(5,178,159,0.40), 0 0 0 7px rgba(34,169,218,0.20), 0 24px 60px 0 rgba(0,0,0,0.35)",
        }}
      >
        <button
          onClick={onClose}
          className="absolute top-3.75 right-3.75 bg-transparent border-0 cursor-pointer z-9999 p-0"
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="30" height="30" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="12" r="11" fill="#FF6B6B" />
            <path d="M8.4 17L12 13.4L15.6 17L17 15.6L13.4 12L17 8.4L15.6 7L12 10.6L8.4 7L7 8.4L10.6 12L7 15.6L8.4 17ZM12 22C10.6167 22 9.31667 21.7375 8.1 21.2125C6.88333 20.6875 5.825 19.975 4.925 19.075C4.025 18.175 3.3125 17.1167 2.7875 15.9C2.2625 14.6833 2 13.3833 2 12C2 10.6167 2.2625 9.31667 2.7875 8.1C3.3125 6.88333 4.025 5.825 4.925 4.925C5.825 4.025 6.88333 3.3125 8.1 2.7875C9.31667 2.2625 10.6167 2 12 2C13.3833 2 14.6833 2.2625 15.9 2.7875C17.1167 3.3125 18.175 4.025 19.075 4.925C19.975 5.825 20.6875 6.88333 21.2125 8.1C21.7375 9.31667 22 10.6167 22 12C22 13.3833 21.7375 14.6833 21.2125 15.9C20.6875 17.1167 19.975 18.175 19.075 19.075C18.175 19.975 17.1167 20.6875 15.9 21.2125C14.6833 21.7375 13.3833 22 12 22ZM12 20C14.2333 20 16.125 19.225 17.675 17.675C19.225 16.125 20 14.2333 20 12C20 9.76667 19.225 7.875 17.675 6.325C16.125 4.775 14.2333 4 12 4C9.76667 4 7.875 4.775 6.325 6.325C4.775 7.875 4 9.76667 4 12C4 14.2333 4.775 16.125 6.325 17.675C7.875 19.225 9.76667 20 12 20Z" fill="white" />
          </svg>
        </button>

        {isLoading ? (
          <div className="flex-1 flex items-center justify-center text-white text-lg">로딩 중...</div>
        ) : (
          <>
            <div
              className="flex flex-col min-[790px]:flex-row gap-2.5 p-3.5 pb-2 min-h-0 box-border"
              style={{ flex: 8 }}
            >
              <ModalLeftPanel
                id={detail.id}
                img={img}
                koName={koName}
                genus={genus}
                types={types}
                height={detail.height}
                weight={detail.weight}
              />
              <ModalRightPanel stats={stats} flavor={flavor} />
            </div>

            <ModalBottomGrid sprites={sprites} />
            <ModalBottomSlider key={no} sprites={sprites} />
          </>
        )}
      </div>
    </div>
  );
};

export default PocketDetailModal;
