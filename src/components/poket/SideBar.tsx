import { useEffect, useState } from 'react';
import axios from 'axios';

interface Pokemon {
  no: number;
  name: string;
}

interface SidebarProps {
  no: number | string;
  name: string;
  onSelect: (no: number | string) => void;
}

export const SidebarItem = ({ no, name, onSelect }: SidebarProps) => {
  return (
    <div
      onClick={() => onSelect(no)}
      className="p-3 text-sm text-gray-400 rounded-xl hover:bg-[#E8F5E9] hover:text-[#05B29F] transition-all flex items-center min-h-12 pl-6 cursor-pointer"
    >
      No.{no} {name}
    </div>
  );
};

interface SideBarProps {
  onFilterChange: (nos: number[]) => void;
  onSelect: (no: number) => void;
}

const SideBar = ({ onFilterChange, onSelect }: SideBarProps) => {
  const [pokemonList, setPokemonList] = useState<Pokemon[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    axios.get<Pokemon[]>('/pokemon_full_ko.json').then((res) => {
      setPokemonList(res.data);
      onFilterChange(res.data.map((p) => p.no));
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const filteredPokemon = pokemonList.filter(
    (p) => p.name.includes(searchQuery) || String(p.no).includes(searchQuery)
  );

  return (
    <aside className="w-full lg:w-[320px] bg-white rounded-xl shadow-xl flex flex-col lg:sticky lg:top-10 border border-gray-50 overflow-hidden transition-all">
      <div
        onClick={() => setSidebarOpen((prev) => !prev)}
        className="flex justify-between items-center cursor-pointer lg:cursor-default hover:bg-gray-50/50 lg:hover:bg-transparent transition-colors select-none"
      >
        <h2 className="text-2xl font-black text-[#05B29F] tracking-tight flex flex-col items-start justify-center py-4 px-6">
          포켓몬 목록
        </h2>

        <div className="lg:hidden pr-6">
          <span
            className={`text-[#05B29F] text-xl transition-transform duration-300 inline-block ${sidebarOpen ? 'rotate-180' : ''}`}
          >
            ▼
          </span>
        </div>
      </div>

      <div
        className={`${sidebarOpen ? 'block' : 'hidden'} lg:block border-t border-gray-50 lg:border-none`}
      >
        <div className="px-4 pb-4">
          <div className="relative">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                const query = e.target.value;
                setSearchQuery(query);
                if (query === '') {
                  onFilterChange(pokemonList.map((p) => p.no));
                } else {
                  const nos = pokemonList
                    .filter((p) => p.name.includes(query) || String(p.no).includes(query))
                    .map((p) => p.no);
                  onFilterChange(nos);
                }
              }}
              placeholder="이름 또는 번호 검색"
              className="w-full p-4 pl-6 rounded-2xl bg-gray-50 border border-transparent outline-none focus:bg-white focus:ring-2 focus:ring-[#05B29F]/10 transition-all"
            />
          </div>
        </div>
        <div className="flex-1 overflow-y-auto px-6 pb-8 [scrollbar-width:none] space-y-1 h-75">
          {filteredPokemon.map((p) => (
            <SidebarItem key={p.no} no={p.no} name={p.name} onSelect={(no) => onSelect(Number(no))} />
          ))}
        </div>
      </div>
    </aside>
  );
};

export default SideBar;
