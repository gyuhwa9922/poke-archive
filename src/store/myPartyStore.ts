import { create } from 'zustand';
import { fetchMyPocketMons, fetchPokemonsByIds, fetchKoNames } from '../api/poket';
import { fetchPartyPresets } from '../api/party';
import type { PartyPokemon, PartyPreset } from '../types/pokemon';

interface MyPartyState {
  pokemons: PartyPokemon[];
  presets: PartyPreset[];
  party: (PartyPokemon | null)[];
  gender: string;
  loadedPresetIndex: number | null;

  fetchPartyData: () => Promise<void>;
  refreshPresets: () => Promise<void>;
  setGender: (gender: string) => void;
  setParty: (party: (PartyPokemon | null)[]) => void;
  setLoadedPresetIndex: (index: number | null) => void;
  swapSlots: (from: number, to: number) => void;
  removePokemon: (id: number) => void;
  setPresets: (presets: PartyPreset[]) => void;
}

async function loadBookmarkedPokemons(): Promise<PartyPokemon[]> {
  try {
    const ids = await fetchMyPocketMons();
    const [details, koList] = await Promise.all([
      fetchPokemonsByIds(ids),
      fetchKoNames(ids),
    ]);
    const koMap: Record<number, string> = {};
    koList.forEach((p) => { koMap[p.no] = p.name; });
    return (details as PartyPokemon[]).map((p) => ({
      ...p,
      koName: koMap[p.id] || p.name,
    }));
  } catch {
    return [];
  }
}

async function loadPresets(pokemonList: PartyPokemon[]): Promise<PartyPreset[]> {
  try {
    const list = await fetchPartyPresets();
    return list.map((p) => ({
      apiId: p.partyId,
      name: p.deckname,
      gender: p.gender || 'man',
      pokemonIds: p.pocketmons,
      party: p.pocketmons.map((id) => pokemonList.find((pk) => pk.id === id) ?? null),
    }));
  } catch {
    return [];
  }
}

export const useMyPartyStore = create<MyPartyState>((set, get) => ({
  pokemons: [],
  presets: [],
  party: Array(6).fill(null),
  gender: 'man',
  loadedPresetIndex: null,

  fetchPartyData: async () => {
    const pokemons = await loadBookmarkedPokemons();
    const presets = await loadPresets(pokemons);
    set({ pokemons, presets });
  },

  refreshPresets: async () => {
    const presets = await loadPresets(get().pokemons);
    set({ presets });
  },

  setGender: (gender) => set({ gender }),

  setParty: (party) => set({ party }),

  setLoadedPresetIndex: (index) => set({ loadedPresetIndex: index }),

  swapSlots: (from, to) =>
    set((state) => {
      const next = [...state.party];
      [next[from], next[to]] = [next[to], next[from]];
      return { party: next };
    }),

  removePokemon: (id) =>
    set((state) => ({
      pokemons: state.pokemons.filter((p) => p.id !== id),
      party: state.party.map((p) => (p?.id === id ? null : p)),
    })),

  setPresets: (presets) => set({ presets }),
}));
