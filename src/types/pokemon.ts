export interface PokemonDetail {
  id: number;
  height: number;
  weight: number;
  sprites: {
    front_default: string;
    back_default: string;
    front_shiny: string;
    back_shiny: string;
    other?: {
      "official-artwork"?: { front_default: string };
      home?: { front_default: string };
      dream_world?: { front_default: string };
    };
  };
  types: { type: { name: string } }[];
  stats: { stat: { name: string }; base_stat: number }[];
}

export interface PokemonSpecies {
  names: { name: string; language: { name: string } }[];
  flavor_text_entries: { flavor_text: string; language: { name: string } }[];
  genera?: { genus: string; language: { name: string } }[];
}

export interface Sprite {
  label: string;
  src: string | undefined;
}

export interface Stat {
  name: string;
  value: number;
  color: string;
}
