import { useEffect, useState } from 'react';
import SideBar from '../components/poket/SideBar';
import PocketCard from '../components/poket/PocketCard';
import PocketDetailModal from '../components/poket/PocketDetailModal';
import { fetchMyPocketMons, poketmonReg, poketmonDelete } from '../api/poket';
const PAGE_SIZE = 12;

const Pokedex = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedNo, setSelectedNo] = useState<number | null>(null);
  const [filteredNos, setFilteredNos] = useState<number[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageInput, setPageInput] = useState('');
  const [myPocketMons, setMyPocketMons] = useState<number[]>([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token && token !== 'undefined') {
      fetchMyPocketMons().then(setMyPocketMons);
    }
  }, []);
  const totalPages = Math.ceil(filteredNos.length / PAGE_SIZE);
  const displayNos = filteredNos.slice((currentPage - 1) * PAGE_SIZE, currentPage * PAGE_SIZE);
  //사이드바 이름 검색하면 작동하는 함수
  const sidebarFilter = (nos: number[]) => {
    setFilteredNos(nos);
    setCurrentPage(1);
  };
  //포켓몬 클릭하면 모달창뜰때 필요한 함수
  const detailPoketSelect = (no: number) => {
    setSelectedNo(no);
    setModalOpen(true);
  };
  // 포켓몬 포획 함수
  const poketRegister = async (no: number) => {
    const ok = await poketmonReg(no);
    if (ok) setMyPocketMons((prev) => [...prev, no]);
  };
  // 포켓몬 포획한거 삭제하는 함수
  const poketDelete = async (no: number) => {
    const ok = await poketmonDelete(no);
    if (ok) setMyPocketMons((prev) => prev.filter((id) => id !== no));
  };
  //pagenation 함수
  const pagenation = () => {
    const page = parseInt(pageInput, 10);
    if (!isNaN(page) && page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
    setPageInput('');
  };

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-360 m-12 gap-3">
        <PocketDetailModal isOpen={modalOpen} onClose={() => setModalOpen(false)} no={selectedNo} />

        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-[#1a3a35]">포켓몬 도감</h1>
          <p className="text-sm text-[#5a8a82] mt-1">포켓몬의 정보를 확인하세요</p>
        </div>

        <section className="flex gap-6 w-full items-start max-[1025px]:flex-col max-[1025px]:items-stretch mt-6">
          <SideBar onFilterChange={sidebarFilter} onSelect={detailPoketSelect} />

          <div className="flex-1 flex flex-col gap-12 pb-10">
            <div className="grid gap-8 grid-cols-1 min-[461px]:grid-cols-2 min-[672px]:grid-cols-3 min-[1440px]:grid-cols-4 min-[1920px]:grid-cols-5 min-[2560px]:grid-cols-6">
              {displayNos.map((no) => (
                <PocketCard
                  key={no}
                  no={no}
                  myPocketMons={myPocketMons}
                  onClick={detailPoketSelect}
                  onRegister={poketRegister}
                  onDelete={poketDelete}
                />
              ))}
            </div>

            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-1">
                {[...new Set([1, totalPages, currentPage - 1, currentPage, currentPage + 1])]
                  .filter((p) => p > 0 && p <= totalPages)
                  .sort((a, b) => a - b)
                  .reduce<(number | '...')[]>((acc, p, i, arr) => {
                    if (i > 0 && p - arr[i - 1] > 1) acc.push('...');
                    acc.push(p);
                    return acc;
                  }, [])
                  .map((p, i) =>
                    p === '...' ? (
                      <span key={`e-${i}`} className="px-2 text-gray-400">
                        ...
                      </span>
                    ) : (
                      <button
                        key={p}
                        onClick={() => setCurrentPage(p)}
                        className={`w-10 h-10 rounded-xl font-bold border transition-all ${
                          currentPage === p
                            ? 'bg-[#22A9DA]/40 text-white border-[#22A9DA]'
                            : 'bg-transparent text-gray-400 border-gray-200 hover:border-[#22A9DA]'
                        }`}
                      >
                        {p}
                      </button>
                    )
                  )}

                <div className="flex items-center gap-2 ml-4 border-l pl-4 border-gray-100">
                  <input
                    type="number"
                    value={pageInput}
                    onChange={(e) => setPageInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && pagenation()}
                    placeholder={String(currentPage)}
                    min={1}
                    max={totalPages}
                    className="w-12 h-10 bg-transparent border border-gray-200 rounded-lg text-center text-sm focus:border-[#22A9DA] focus:outline-none"
                  />
                  <button
                    onClick={pagenation}
                    className="px-3 h-10 border border-gray-200 text-gray-500 rounded-lg text-sm font-bold hover:bg-gray-50 transition-colors"
                  >
                    이동
                  </button>
                </div>
              </div>
            )}
          </div>
        </section>
      </div>
    </div>
  );
};

export default Pokedex;
