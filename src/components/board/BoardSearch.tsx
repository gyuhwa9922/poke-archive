interface BoardSearchProps {
  query: string;
  filterType: string;
  onQueryChange: (value: string) => void;
  onFilterChange: (value: string) => void;
  onSearch: () => void;
}

const FILTER_OPTIONS = [
  { value: 'title', label: '제목' },
  { value: 'content', label: '내용' },
  { value: 'nickname', label: '작성자' },
];

const BoardSearch = ({
  query,
  filterType,
  onQueryChange,
  onFilterChange,
  onSearch,
}: BoardSearchProps) => {
  return (
    <div className="flex w-full flex-col items-start rounded-xl border border-[#00bba7]/20 bg-white p-4 max-[640px]:h-auto max-[640px]:pb-4">
      <div className="flex w-full items-center gap-2 max-[579px]:flex-col max-[579px]:items-stretch">
        <div className="relative flex h-[46px] flex-1 items-center rounded-lg border border-[#00bba7]/20 bg-[#f4faf9] py-2.5 pl-10 pr-4 max-[579px]:w-full">
          <span className="absolute left-3.5 text-[#99A1AF]">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.167 15.833A6.667 6.667 0 1 0 9.167 2.5a6.667 6.667 0 0 0 0 13.333Z"
                stroke="#99A1AF"
                strokeWidth="1.667"
                strokeLinecap="round"
              />
              <path
                d="M17.5 17.5l-3.583-3.583"
                stroke="#99A1AF"
                strokeWidth="1.667"
                strokeLinecap="round"
              />
            </svg>
          </span>

          <input
            type="text"
            value={query}
            onChange={(e) => onQueryChange(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && onSearch()}
            placeholder="게시글 검색..."
            className="flex-1 bg-transparent text-sm text-[#1a3a35] outline-none placeholder:text-[#aac9c4]"
          />
        </div>

        <div className="flex gap-2 max-[578px]:mt-2 max-[578px]:w-full">
          <select
            value={filterType}
            onChange={(e) => onFilterChange(e.target.value)}
            className="h-[45px] min-w-20 shrink-0 cursor-pointer rounded-lg border border-[#00bba7]/25 bg-white px-3 text-sm text-[#4a7a72] outline-none"
          >
            {FILTER_OPTIONS.map((opt) => (
              <option key={opt.value} value={opt.value}>
                {opt.label}
              </option>
            ))}
          </select>

          <button
            type="button"
            onClick={onSearch}
            className="flex min-w-[70px] flex-1 items-center justify-center gap-2 rounded-lg bg-[#00BBA7] px-4 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#009d8c]"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="14"
              height="14"
              viewBox="0 0 20 20"
              fill="none"
            >
              <path
                d="M9.167 15.833A6.667 6.667 0 1 0 9.167 2.5a6.667 6.667 0 0 0 0 13.333Z"
                stroke="#fff"
                strokeWidth="1.667"
                strokeLinecap="round"
              />
              <path
                d="M17.5 17.5l-3.583-3.583"
                stroke="#fff"
                strokeWidth="1.667"
                strokeLinecap="round"
              />
            </svg>
            검색
          </button>
        </div>
      </div>
    </div>
  );
};

export default BoardSearch;