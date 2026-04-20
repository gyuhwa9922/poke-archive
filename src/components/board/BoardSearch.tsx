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

const BoardSearch = ({ query, filterType, onQueryChange, onFilterChange, onSearch }: BoardSearchProps) => {
  return (
    <div className="flex gap-2">
      <select
        value={filterType}
        onChange={(e) => onFilterChange(e.target.value)}
        className="rounded-lg border border-[#00bba7]/30 px-3 py-2 text-sm text-[#4a7a72] bg-white outline-none focus:border-[#00bba7]"
      >
        {FILTER_OPTIONS.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>

      <div className="flex flex-1 gap-2">
        <input
          type="text"
          value={query}
          onChange={(e) => onQueryChange(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && onSearch()}
          placeholder="검색어를 입력하세요"
          className="flex-1 rounded-lg border border-[#00bba7]/30 px-4 py-2 text-sm text-[#1a3a35] outline-none focus:border-[#00bba7] placeholder:text-[#a0bcb8]"
        />
        <button
          type="button"
          onClick={onSearch}
          className="rounded-lg px-4 py-2 text-sm font-semibold text-white bg-[#00bba7] hover:bg-[#009e8d] transition-colors"
        >
          검색
        </button>
      </div>
    </div>
  );
};

export default BoardSearch;