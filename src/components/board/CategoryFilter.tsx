import { categoryColors } from '../../utils/boardConstants';

const CATEGORIES = ['전체', '자유게시판', '질문게시판', '파티공유', '공략'];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
  onWrite: () => void;
}

const CategoryFilter = ({ selected, onSelect, onWrite }: CategoryFilterProps) => {
  return (
    <aside className="flex flex-col gap-2 w-44 shrink-0 max-[1025px]:w-full max-[1025px]:flex-row max-[1025px]:flex-wrap">
      {CATEGORIES.map((cat) => {
        const color = categoryColors[cat];
        const isActive = selected === cat;
        return (
          <button
            key={cat}
            type="button"
            onClick={() => onSelect(cat)}
            className={`rounded-lg px-4 py-2.5 text-sm text-left transition-colors border ${
              isActive
                ? `${color.text} ${color.bg} ${color.border} font-semibold`
                : 'text-[#4a7a72] bg-white border-transparent hover:bg-[#f4faf9]'
            }`}
          >
            {cat}
          </button>
        );
      })}

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