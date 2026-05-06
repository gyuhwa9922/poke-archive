import instance from './axios';
import axios from 'axios';
import type { PokemonSpecies } from '../types/pokemon';

const pokemonCache = new Map<number, unknown>();

export async function fetchPokemonDetail(no: number) {
  if (pokemonCache.has(no)) {
    return pokemonCache.get(no);
  }

  try {
    const res = await axios.get(`https://pokeapi.co/api/v2/pokemon/${no}`);
    pokemonCache.set(no, res.data);
    return res.data;
  } catch (error) {
    console.error(`포켓몬 ${no} 데이터 로드 실패:`, error);
    return null;
  }
}

// 포켓몬 api에서 id 값으로 불러오는 함수
export async function fetchPokemonSpecies(no: number): Promise<PokemonSpecies> {
  const res = await axios.get(`https://pokeapi.co/api/v2/pokemon-species/${no}`);
  return res.data;
}

// 내 포켓몬 목록 조회
export async function fetchMyPocketMons(): Promise<number[]> {
  try {
    const res = await instance.get('/pocketmons');
    return res.data.data.myPocketmons as number[];
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('포켓몬 목록 조회 에러:', error.response?.data || error.message);
    }
    return [];
  }
}

//포켓몬 추가임
export async function poketmonReg(poketmonId: number | string) {
  try {
    await instance.post('/pocketmons', {
      pocketmonId: Number(poketmonId),
    });
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('포켓몬 등록 에러:', error.response?.data || error.message);
    }
    return false;
  }
}

//포켓몬 상세 정보 다수 조회
export async function fetchPokemonsByIds(ids: number[]) {
  const results = await Promise.all(ids.map((id) => fetchPokemonDetail(id)));
  return results.filter(Boolean);
}

// 한국어 이름 목록 조회
export async function fetchKoNames(ids: number[]) {
  const results = await Promise.all(
    ids.map(async (id) => {
      try {
        // fetchPokemonSpecies가 axios를 사용한다고 가정
        const species = await fetchPokemonSpecies(id);
        const koEntry = species.names.find((n) => n.language.name === 'ko');
        return { no: id, name: koEntry?.name ?? String(id) };
      } catch {
        return { no: id, name: String(id) };
      }
    })
  );
  return results;
}

//  포켓몬 삭제 (DELETE)
export async function poketmonDelete(poketmonId: number | string) {
  try {
    await instance.delete(`/pocketmons/${poketmonId}`);
    return true;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.error('포켓몬 삭제 에러:', error.response?.data || error.message);
    }
    return false;
  }
}
