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
        flex w-80 shrink-0 flex-col items-start gap-4 rounded-xl bg-white px-6 pb-6 pt-6 shadow-sm

        max-[1025px]:w-full
        max-[1025px]:flex-row
        max-[1025px]:items-center
        max-[1025px]:gap-3
        max-[1025px]:overflow-hidden
        max-[1025px]:rounded-none
        max-[1025px]:bg-transparent
        max-[1025px]:p-0
        max-[1025px]:shadow-none
      "
    >
      <div
        className="
          flex w-full flex-col items-start gap-3

          max-[1025px]:flex-1
          max-[1025px]:flex-row
          max-[1025px]:items-center
          max-[1025px]:gap-2
          max-[1025px]:overflow-x-auto
          max-[1025px]:[scrollbar-width:none]
          max-[1025px]:[&::-webkit-scrollbar]:hidden
        "
      >
        <p className="mb-1 text-base font-semibold text-[#1a3a35] max-[1025px]:hidden">
          카테고리
        </p>

        {CATEGORIES.map((cat) => {
          const color = categoryColors[cat] ?? categoryColors['전체'];
          const isActive = selected === cat;

          return (
            <button
              key={cat}
              type="button"
              onClick={() => onSelect(cat)}
              className={`
                flex w-full items-center rounded-lg px-4 py-2 text-left text-sm transition-colors

                max-[1025px]:w-auto
                max-[1025px]:shrink-0
                max-[1025px]:rounded-full
                max-[1025px]:px-4
                max-[1025px]:py-2
                max-[1025px]:whitespace-nowrap

                ${
                  isActive
                    ? `${color.text} ${color.bg} font-semibold max-[1025px]:bg-[#9DE5EE] max-[1025px]:text-[#00BBA7]`
                    : 'border border-[#00bba7]/25 bg-white text-[#4a7a72] hover:bg-[#e6f7f5] hover:text-[#00bba7] max-[1025px]:border-none'
                }
              `}
            >
              {cat}
            </button>
          );
        })}
      </div>

      <button
        type="button"
        onClick={onWrite}
        className="
          mt-2 flex h-12 w-full items-center justify-center gap-1.5 rounded-lg bg-[#00BBA7] text-sm font-medium text-white transition-colors hover:bg-[#009d8c]

          max-[1025px]:mt-0
          max-[1025px]:h-10
          max-[1025px]:w-[68px]
          max-[1025px]:shrink-0
          max-[1025px]:text-2xl
          max-[1025px]:font-light
        "
        aria-label="글쓰기"
      >
        <span className="max-[1025px]:hidden">✎ 글쓰기</span>
        <span className="hidden max-[1025px]:inline">+</span>
      </button>
    </aside>
  );
};

export default CategoryFilter;