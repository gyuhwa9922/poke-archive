import { useEffect, useState } from 'react';
import { fetchPokemonDetail, fetchPokemonSpecies } from '../../api/poket';
import { useAuthStore } from '../../store/authStore';
import type { PokemonDetail, PokemonSpecies } from '../../types/pokemon';
import PokemonCardBase from '../custom/PokemonCardBase';

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

  return (
    <PokemonCardBase
      no={no}
      img={img}
      koName={koName}
      types={types}
      isBookmarked={myPocketMons.includes(no)}
      isLoggedIn={isLoggedIn}
      onClick={() => onClick(no)}
      onRegister={() => onRegister(no)}
      onDelete={() => onDelete(no)}
    />
  );
};

export default PocketCard;
