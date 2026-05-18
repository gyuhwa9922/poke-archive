import { useEffect, useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { postPartyPreset, putPartyPreset, deletePartyPreset } from '../api/party';
import type { PartyPokemon } from '../types/pokemon';
import TrainerCard from '../components/myparty/TrainerCard';
import PokemonPickCard from '../components/myparty/PokemonPickCard';
import PresetList from '../components/myparty/PresetList';
import { useMyPartyStore } from '../store/myPartyStore';
import { usePoketStore } from '../store/poketStore';
import { useAuthStore } from '../store/authStore';
import { showModal, showConfirm, showPrompt } from '../store/modalStore';

const MyParty = () => {
  const navigate = useNavigate();
  const {
    pokemons,
    presets,
    party,
    gender,
    loadedPresetIndex,
    fetchPartyData,
    refreshPresets,
    setGender,
    setParty,
    setLoadedPresetIndex,
    swapSlots,
    removePokemon,
  } = useMyPartyStore();
  const { removeBookmark } = usePoketStore();

  const { isLoggedIn, checkAuth } = useAuthStore();
  const [authChecked, setAuthChecked] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);
  const savingRef = useRef(false);
  // useEffect(() => {
  //   const token = localStorage.getItem('token');
  //   if (!token || token === 'undefined') {
  //     navigate('/');
  //   }
  // }, [navigate]);

  useEffect(() => {
    checkAuth().finally(() => setAuthChecked(true));
  }, [checkAuth]);

  useEffect(() => {
    if (authChecked && !isLoggedIn) {
      showModal('비로그인 상태', '나의 파티 만들기 페이지는 로그인 후 이용 가능합니다.');
      navigate('/login');
    }
  }, [authChecked, isLoggedIn, navigate]);

  useEffect(() => {
    fetchPartyData().finally(() => setLoading(false));
  }, []);

  function handleSlotClick(index: number) {
    setSelectedSlot(index);
  }

  function handlePokemonClick(pokemon: PartyPokemon) {
    if (selectedSlot === null) {
      //모달
      // alert('먼저 트레이너 카드의 슬롯을 선택해주세요.');
      showModal('트레이너 카드 슬롯 미선택', '먼저 트레이너 카드의 슬롯을 선택해주세요.');
      return;
    }
    const next = [...party];
    const duplicatedIndex = next.findIndex((p) => p?.id === pokemon.id);
    if (duplicatedIndex !== -1) {
      if (duplicatedIndex === selectedSlot) {
        next[selectedSlot] = null;
      } else {
        const temp = next[selectedSlot];
        next[selectedSlot] = next[duplicatedIndex];
        next[duplicatedIndex] = temp;
      }
    } else {
      next[selectedSlot] = pokemon;
    }
    setParty(next);
  }

  async function handleDeleteBookmark(id: number) {
    const ok = await removeBookmark(id);
    if (!ok) {
      //모달
      // alert('북마크 삭제에 실패했습니다.');
      showModal('삭제 실패', '북마크 삭제에 실패했습니다.');
      return;
    }
    removePokemon(id);
  }

  function handleReset() {
    setParty(Array(6).fill(null));
    setSelectedSlot(null);
    setLoadedPresetIndex(null);
  }

  async function handleSave() {
    if (savingRef.current) return;
    if (party.filter(Boolean).length === 0) {
      //모달
      // alert('포켓몬을 하나 이상 선택해주세요.');
      showModal('포켓몬 미선택', '포켓몬을 하나 이상 선택해주세요.');
      return;
    }
    if (loadedPresetIndex === null) {
      //모달
      // alert('저장할 슬롯을 선택해주세요.');
      showModal('저장할 슬롯 미선택', '저장할 슬롯을 선택해주세요.');
      return;
    }

    savingRef.current = true;
    try {
      const preset = presets[loadedPresetIndex];
      const pokemonIds = party.filter(Boolean).map((p) => p!.id);

      if (preset) {
        const ok = await showConfirm(
          '파티 덮어쓰기',
          `"${preset.name}" 파티에 현재 구성을 덮어씁니다.`
        );
        // window.confirm(`"${preset.name}" 파티에 현재 구성을 덮어씁니다.`);
        if (ok) {
          await putPartyPreset(preset.apiId, preset.name, pokemonIds, gender);
          await refreshPresets();
        }
      } else {
        if (presets.length >= 3) {
          //모달
          showModal('저장 공간 부족', '파티는 최대 3개까지 저장할 수 있습니다.');
          // alert('파티는 최대 3개까지 저장할 수 있습니다.');
          return;
        }
        const name = await showPrompt('파티 이름 저장', '나만의 파티 이름을 입력해주세요');
        // window.prompt('나만의 파티 이름을 입력해주세요');
        if (name) {
          await postPartyPreset(name, pokemonIds, gender);
          await refreshPresets();
        }
      }
    } catch {
      //모달
      // alert('파티 저장에 실패했습니다.');
      showModal('파티 저장 실패', '파티 저장에 실패했습니다.');
    } finally {
      savingRef.current = false;
    }
  }

  function handleLoadPreset(index: number) {
    const preset = presets[index];
    if (!preset) return;
    setGender(preset.gender || 'man');
    setParty([...preset.party]);
    setSelectedSlot(null);
    setLoadedPresetIndex(index);
  }

  async function handleDeletePreset(index: number) {
    const preset = presets[index];
    if (!preset?.apiId) return;
    try {
      await deletePartyPreset(preset.apiId);
      if (loadedPresetIndex === index) setLoadedPresetIndex(null);
      await refreshPresets();
    } catch {
      //모달
      // alert('파티 삭제에 실패했습니다.');
      showModal('파티 삭제 실패', '파티 삭제에 실패했습니다.');
    }
  }

  function handleNewSlot(slotIndex: number) {
    setParty(Array(6).fill(null));
    setSelectedSlot(null);
    setLoadedPresetIndex(slotIndex);
  }

  const filtered = searchQuery
    ? pokemons.filter(
        (p) =>
          p.koName?.toLowerCase().includes(searchQuery) ||
          p.name?.toLowerCase().includes(searchQuery) ||
          String(p.id).includes(searchQuery)
      )
    : pokemons;

  const partyCount = party.filter(Boolean).length;

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64 text-gray-400">불러오는 중...</div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8">
      {/* 페이지 제목 */}
      <div className="mb-6">
        <h1 className="text-2xl font-black text-gray-800 mb-1">나만의 파티 만들기</h1>
        <p className="text-sm text-gray-500">
          포획한 포켓몬 중 최대 6마리의 포켓몬을 선택하여 나만의 트레이너 카드를 만들어보세요
        </p>
      </div>

      {/* 트레이너 카드 카드 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden mb-8">
        {/* 타이틀 */}
        <div className="flex items-center gap-2 px-8 pt-8 pb-6 max-[768px]:px-4 max-[768px]:pt-5 max-[768px]:pb-4">
          <span className="text-teal-400 text-lg">✦</span>
          <h2 className="text-2xl font-black text-slate-900">트레이너 카드 미리보기</h2>
        </div>

        {/* 2열 그리드 (모바일: 1열) */}
        <div className="grid grid-cols-[1fr_280px] px-8 pb-8 max-[1024px]:grid-cols-1 max-[1024px]:px-5 max-[1024px]:pb-6 max-[768px]:px-4 max-[768px]:pb-5">
          {/* 왼쪽: 카드 미리보기 */}
          <div className="p-8 mr-8 rounded-2xl border border-[#f0fbf5] bg-[#f0fbf5af] max-[1024px]:mr-0 max-[1024px]:mb-5 max-[768px]:mb-4">
            <TrainerCard
              gender={gender}
              party={party}
              selectedSlot={selectedSlot}
              onSlotClick={handleSlotClick}
              onGenderChange={setGender}
              onSwapSlots={swapSlots}
            />
          </div>

          {/* 오른쪽: 버튼 + 저장된 파티 */}
          <div className="flex flex-col gap-5">
            <div className="flex gap-3">
              <button
                type="button"
                onClick={handleReset}
                className="flex-1 flex items-center justify-center gap-1.5 border border-gray-200 rounded-xl text-sm font-medium text-slate-600 hover:bg-slate-50 transition px-4 py-2.5"
              >
                <span>↻</span> 초기화
              </button>
              <button
                type="button"
                onClick={handleSave}
                className="flex-1 bg-teal-500 text-white rounded-xl text-sm font-semibold hover:bg-teal-600 transition px-4 py-2.5"
              >
                완성
              </button>
            </div>

            <div>
              <div className="flex items-center pb-3 px-1">
                <span className="text-sm font-semibold text-slate-600 flex-1">
                  저장된 나의 파티
                </span>
                <span className="text-xs text-slate-400 bg-slate-100 rounded-full px-2 py-0.5">
                  {presets.length} / 3
                </span>
              </div>
              <PresetList
                presets={presets}
                loadedPresetIndex={loadedPresetIndex}
                onLoad={handleLoadPreset}
                onDelete={handleDeletePreset}
                onNewSlot={handleNewSlot}
              />
            </div>
          </div>
        </div>
      </div>

      {/* 포켓몬 목록 */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
        <div className="flex items-center justify-between px-8 pt-8 pb-4 max-[768px]:px-4 max-[768px]:pt-5">
          <span className="text-sm font-bold text-gray-700">북마크 포켓몬</span>
          <span className="text-xs text-gray-400">{partyCount} / 6 선택됨</span>
        </div>

        <div className="px-8 pb-4 max-[1024px]:px-5 max-[768px]:px-4">
          <input
            type="text"
            placeholder="포켓몬 이름 또는 번호로 검색"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value.trim().toLowerCase())}
            className="w-full px-4 py-2 rounded-xl border border-gray-200 text-sm outline-none focus:border-teal-400 transition-colors"
          />
        </div>

        <div className="h-150 overflow-y-auto px-8 pt-2 pb-8 [scrollbar-width:thin] [scrollbar-color:#d1d5db_transparent] [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full max-[1024px]:px-5 max-[1024px]:pb-6 max-[1024px]:h-125 max-[768px]:px-4 max-[768px]:pb-5 max-[768px]:h-100">
          {pokemons.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              북마크된 포켓몬이 없습니다
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex items-center justify-center h-48 text-gray-400 text-sm">
              검색 결과가 없습니다
            </div>
          ) : (
            <div className="grid grid-cols-4 gap-4 max-[1280px]:grid-cols-3 max-[768px]:grid-cols-2 max-[400px]:grid-cols-1">
              {filtered.map((pokemon) => (
                <PokemonPickCard
                  key={pokemon.id}
                  pokemon={pokemon}
                  isInParty={party.some((p) => p?.id === pokemon.id)}
                  onClick={() => handlePokemonClick(pokemon)}
                  onDelete={() => handleDeleteBookmark(pokemon.id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MyParty;
