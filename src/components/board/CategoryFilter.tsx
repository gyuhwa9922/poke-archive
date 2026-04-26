import { categoryColors } from '../../utils/boardConstants';

const CATEGORIES = ['전체', '자유게시판', '질문게시판', '파티공유', '공략'];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
  onWrite: () => void;
}

const CategoryFilter = ({ selected, onSelect, onWrite }: CategoryFilterProps) => {
  return (
    <aside
      className="
        flex flex-col gap-2 w-44 shrink-0
        max-[1025px]:w-full
        max-[1025px]:flex-row
        max-[1025px]:overflow-x-auto
        max-[1025px]:gap-2
      "
    >
      {CATEGORIES.map((cat) => {
        const color = categoryColors[cat] ?? categoryColors['전체'];
        const isActive = selected === cat;

        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`rounded-lg px-4 py-2.5 text-sm text-left transition-colors
              ${
                isActive
                  ? `${color.text} ${color.bg} font-semibold`
                  : 'text-[#4a7a72] bg-white border border-[#00bba7]/25 hover:bg-[#e6f7f5]'
              }
            `}
          >
            {cat}
          </button>
        );
      })}

      {/* 글쓰기 */}
      <button
        type="button"
        onClick={onWrite}
        className="mt-2 rounded-lg px-4 py-2.5 text-sm font-semibold text-white bg-[#00bba7] hover:bg-[#009e8d] transition-colors max-[1025px]:mt-0"
      >
        글쓰기
      </button>
    </aside>
  );
};

export default CategoryFilter;