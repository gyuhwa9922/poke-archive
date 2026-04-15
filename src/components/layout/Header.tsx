import { NavLink } from "react-router-dom";

const navItems = [
  { label: "홈", to: "/" },
  { label: "포켓몬 도감", to: "/pokedex" },
  { label: "게시판", to: "/board" },
  { label: "내 파티", to: "/myparty" },
  { label: "마이페이지", to: "/mypage" },
];

const Header = () => {
  return (
    <header className="w-full bg-red-600 text-white shadow-md">
      <div className="max-w-5xl mx-auto flex items-center justify-between px-6 py-3">
        <NavLink to="/" className="text-xl font-bold tracking-wide">
          PokeArchive
        </NavLink>
        <nav className="flex gap-6 text-sm font-medium">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              className={({ isActive }) =>
                isActive
                  ? "underline underline-offset-4"
                  : "hover:underline hover:underline-offset-4"
              }
            >
              {label}
            </NavLink>
          ))}
        </nav>
      </div>
    </header>
  );
};

export default Header;
