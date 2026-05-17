import type { PartyPokemon } from '../../types/pokemon';
import PokemonCardBase from '../custom/PokemonCardBase';

interface PokemonPickCardProps {
  pokemon: PartyPokemon;
  isInParty: boolean;
  onClick: () => void;
  onDelete: () => void;
}

const PokemonPickCard = ({ pokemon, isInParty, onClick, onDelete }: PokemonPickCardProps) => {
  const img =
    pokemon.sprites?.other?.['official-artwork']?.front_default ??
    pokemon.sprites?.front_default ??
    '';
  const types = pokemon.types.map((t) => t.type.name);

  return (
    <PokemonCardBase
      no={pokemon.id}
      img={img}
      koName={pokemon.koName}
      types={types}
      isBookmarked={true}
      isInParty={isInParty}
      onClick={onClick}
      onDelete={onDelete}
    />
  );
};

export default PokemonPickCard;
