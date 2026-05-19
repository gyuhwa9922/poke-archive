import { useEffect, useState } from 'react';
import { usePoketStore } from '../../store/poketStore';
import PocketCard from '../poket/PocketCard';
import PocketDetailModal from '../poket/PocketDetailModal';

const MyPokemons = () => {
  const { bookmarkedIds, fetchBookmarkedIds, addBookmark, removeBookmark } = usePoketStore();
  const [loading, setLoading] = useState(true);
  const [selectedNo, setSelectedNo] = useState<number | null>(null);

  useEffect(() => {
    fetchBookmarkedIds().finally(() => setLoading(false));
  }, [fetchBookmarkedIds]);

  return (
    <div className="flex flex-col gap-4 flex-1">
      {loading && (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-gray-400 shadow-sm">
          <p className="text-lg font-medium">불러오는 중...</p>
        </div>
      )}

      {!loading && bookmarkedIds.length === 0 && (
        <div className="flex items-center justify-center rounded-2xl border border-dashed border-gray-200 bg-white py-20 text-gray-400 shadow-sm">
          <p className="text-lg font-medium">보유한 포켓몬이 없습니다.</p>
        </div>
      )}

      {!loading && bookmarkedIds.length > 0 && (
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5">
          {[...bookmarkedIds].sort((a, b) => a - b).map((no) => (
            <PocketCard
              key={no}
              no={no}
              myPocketMons={bookmarkedIds}
              onClick={(id) => setSelectedNo(id)}
              onRegister={(id) => addBookmark(id)}
              onDelete={(id) => removeBookmark(id)}
            />
          ))}
        </div>
      )}

      <PocketDetailModal
        isOpen={selectedNo !== null}
        onClose={() => setSelectedNo(null)}
        no={selectedNo}
      />
    </div>
  );
};

export default MyPokemons;
