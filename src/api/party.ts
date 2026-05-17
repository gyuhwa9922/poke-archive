import instance from './axios';

export interface PartyPresetRaw {
  partyId: number;
  deckname: string;
  gender: string;
  pocketmons: number[];
}

export async function fetchPartyPresets(): Promise<PartyPresetRaw[]> {
  const { data } = await instance.get('/party');
  return Array.isArray(data) ? data : (data.data ?? []);
}

export async function postPartyPreset(
  presetName: string,
  pokemonIds: number[],
  gender: string
): Promise<void> {
  await instance.post('/party', { deckname: presetName, pocketmons: pokemonIds, gender });
}

export async function putPartyPreset(
  apiId: number,
  presetName: string,
  pokemonIds: number[],
  gender: string
): Promise<PartyPresetRaw> {
  const { data } = await instance.put(`/party/${apiId}`, {
    deckname: presetName,
    pocketmons: pokemonIds,
    gender,
  });
  return data;
}

export async function deletePartyPreset(apiId: number): Promise<void> {
  await instance.delete(`/party/${apiId}`);
}
