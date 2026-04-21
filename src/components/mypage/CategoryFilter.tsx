const CATEGORIES = [
  {
    label: '내 정보',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M15.8332 17.5V15.8333C15.8332 14.9493 15.482 14.1014 14.8569 13.4763C14.2317 12.8512 13.3839 12.5 12.4998 12.5H7.49984C6.61578 12.5 5.76794 12.8512 5.14281 13.4763C4.51769 14.1014 4.1665 14.9493 4.1665 15.8333V17.5"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    danger: false,
  },
  {
    label: '작성 게시글',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M12.5002 1.66675H5.00016C4.55814 1.66675 4.13421 1.84234 3.82165 2.1549C3.50909 2.46746 3.3335 2.89139 3.3335 3.33341V16.6667C3.3335 17.1088 3.50909 17.5327 3.82165 17.8453C4.13421 18.1578 4.55814 18.3334 5.00016 18.3334H15.0002C15.4422 18.3334 15.8661 18.1578 16.1787 17.8453C16.4912 17.5327 16.6668 17.1088 16.6668 16.6667V5.83341L12.5002 1.66675Z"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M11.6665 1.66675V5.00008C11.6665 5.44211 11.8421 5.86603 12.1547 6.17859C12.4672 6.49115 12.8911 6.66675 13.3332 6.66675H16.6665"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M8.33317 7.5H6.6665"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3332 10.8333H6.6665"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3332 14.1667H6.6665"
          stroke="currentColor"
          strokeWidth="1.66667"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    danger: false,
  },
  {
    label: '내가 지닌 포켓몬',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 30 30"
        fill="none"
      >
        <g clipPath="url(#clip0_405_18)">
          <path
            d="M15 28.5C22.4558 28.5 28.5 22.4558 28.5 15C28.5 7.54416 22.4558 1.5 15 1.5C7.54416 1.5 1.5 7.54416 1.5 15C1.5 22.4558 7.54416 28.5 15 28.5Z"
            stroke="currentColor"
            strokeWidth="3"
          />
          <path d="M1.5 15H9.75" stroke="currentColor" strokeWidth="3" />
          <path d="M20.25 15H28.5" stroke="currentColor" strokeWidth="3" />
          <path
            d="M15 18.75C17.0711 18.75 18.75 17.0711 18.75 15C18.75 12.9289 17.0711 11.25 15 11.25C12.9289 11.25 11.25 12.9289 11.25 15C11.25 17.0711 12.9289 18.75 15 18.75Z"
            stroke="currentColor"
            strokeWidth="3"
          />
        </g>
      </svg>
    ),
    danger: false,
  },
  {
    label: '로그아웃',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <path
          d="M7.49682 17.4928H4.16487C3.72303 17.4928 3.29928 17.3173 2.98685 17.0048C2.67442 16.6924 2.4989 16.2686 2.4989 15.8268V4.165C2.4989 3.72315 2.67442 3.29941 2.98685 2.98698C3.29928 2.67454 3.72303 2.49902 4.16487 2.49902H7.49682"
          stroke="#E7000B"
          strokeWidth="1.66597"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M13.3278 14.1609L17.4927 9.99599L13.3278 5.83105"
          stroke="#E7000B"
          strokeWidth="1.66597"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M17.4927 9.99609H7.49683"
          stroke="#E7000B"
          strokeWidth="1.66597"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    ),
    danger: true,
  },
  {
    label: '회원탈퇴',
    icon: (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="20"
        height="20"
        viewBox="0 0 20 20"
        fill="none"
      >
        <g transform="translate(-1.5, 4) scale(0.80)">
          <path
            d="M15.8332 17.5V15.8333C15.8332 14.9493 15.482 14.1014 14.8569 13.4763C14.2317 12.8512 13.3839 12.5 12.4998 12.5H7.49984C6.61578 12.5 5.76794 12.8512 5.14281 13.4763C4.51769 14.1014 4.1665 14.9493 4.1665 15.8333V17.5"
            stroke="#E7000B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
          <path
            d="M9.99984 9.16667C11.8408 9.16667 13.3332 7.67428 13.3332 5.83333C13.3332 3.99238 11.8408 2.5 9.99984 2.5C8.15889 2.5 6.6665 3.99238 6.6665 5.83333C6.6665 7.67428 8.15889 9.16667 9.99984 9.16667Z"
            stroke="#E7000B"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <line
          x1="14.5"
          y1="1.5"
          x2="18.5"
          y2="5.5"
          stroke="#E7000B"
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
        <line
          x1="18.5"
          y1="1.5"
          x2="14.5"
          y2="5.5"
          stroke="#E7000B"
          strokeWidth="1.66667"
          strokeLinecap="round"
        />
      </svg>
    ),
    danger: true,
  },
];

interface CategoryFilterProps {
  selected: string;
  onSelect: (category: string) => void;
}

const CategoryFilter = ({ selected, onSelect }: CategoryFilterProps) => {
  return (
    <aside className="w-80 shrink-0 bg-white rounded-xl shadow-sm p-4 max-[1025px]:w-full">
      <p className="text-lg font-semibold mb-3 px-1">카테고리</p>
      <div className="flex flex-col gap-1">
        {CATEGORIES.map(({ label, icon, danger }) => {
          const isActive = selected === label;
          return (
            <button
              key={label}
              type="button"
              onClick={() => onSelect(label)}
              className={`flex items-center gap-2.5 rounded-lg px-3 py-2.5 text-sm text-left transition-colors ${
                danger
                  ? 'text-[#E7000B] hover:bg-red-50'
                  : isActive
                    ? 'text-white bg-[#00bba7] font-semibold'
                    : 'text-[#4a7a72] hover:bg-[#f4faf9]'
              }`}
            >
              <span className={isActive && !danger ? 'text-white' : ''}>{icon}</span>
              {label}
            </button>
          );
        })}
      </div>
    </aside>
  );
};

export default CategoryFilter;
