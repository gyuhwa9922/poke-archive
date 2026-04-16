import { useState } from "react";
import { NavLink } from "react-router-dom";

const navItems = [
  { label: "포켓몬 도감", to: "/pokedex" },
  { label: "게시판", to: "/board" },
  { label: "내 파티 만들기", to: "/myparty" },
  { label: "마이페이지", to: "/mypage" },
];

const Header = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <header
      className="w-full border-b border-gray-200 shadow-sm"
      style={{
        background: "linear-gradient(90deg, #05b29f 0%, rgba(34, 169, 218, 0.4) 100%)",
      }}
    >
      <div className="grid items-center" style={{ gridTemplateColumns: "1fr 10fr 1fr" }}>
        <div
          className="col-start-2 flex items-center justify-between h-16 w-full"
          style={{ minWidth: "min(1024px, 100%)" }}
        >
          {/* 로고 */}
          <NavLink
            to="/"
            className="flex items-center gap-2 font-bold text-white no-underline"
            style={{ fontFamily: "Galmuri11" }}
          >
            포켓아카이브
          </NavLink>

          {/* PC 네비게이션 */}
          <nav className="hidden md:flex gap-8">
            {navItems.map(({ label, to }) => (
              <NavLink
                key={to}
                to={to}
                className={({ isActive }) =>
                  `text-sm no-underline ${isActive ? "text-white/40" : "text-white"}`
                }
                style={{ fontFamily: "Galmuri11" }}
              >
                {label}
              </NavLink>
            ))}
          </nav>

          {/* 헤더 아이콘 영역 */}
          <div className="flex items-center gap-2.5">
            {/* PC 로그인 버튼 */}
            <button
              className="hidden md:block px-3.5 py-2 rounded-lg cursor-pointer border-none"
              style={{
                background: "white",
                color: "#05b29f",
                fontFamily: "Galmuri11",
                fontSize: "14px",
              }}
            >
              로그인
            </button>

            {/* 검색 아이콘 (태블릿/모바일) */}
            <button className="md:hidden bg-transparent border-none cursor-pointer p-0">
              <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                <path
                  d="M9.16 15.82C12.84 15.82 15.82 12.84 15.82 9.16C15.82 5.48 12.84 2.49 9.16 2.49C5.48 2.49 2.49 5.48 2.49 9.16C2.49 12.84 5.48 15.82 9.16 15.82Z"
                  stroke="white"
                  strokeWidth="1.6"
                />
                <path
                  d="M17.49 17.49L13.91 13.91"
                  stroke="white"
                  strokeWidth="1.6"
                />
              </svg>
            </button>

            {/* 햄버거 메뉴 (태블릿/모바일) */}
            <button
              className="md:hidden bg-transparent border-none cursor-pointer p-0"
              onClick={() => setSidebarOpen(true)}
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path d="M4 6H20" stroke="white" strokeWidth="2" />
                <path d="M4 12H20" stroke="white" strokeWidth="2" />
                <path d="M4 18H20" stroke="white" strokeWidth="2" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      {/* 사이드바 */}
      <div
        className="fixed top-0 w-80 h-screen bg-white flex flex-col z-40 transition-all duration-300"
        style={{
          right: sidebarOpen ? "0" : "-320px",
          boxShadow: "0 25px 50px rgba(0,0,0,0.25)",
        }}
      >
        <div className="flex justify-between p-5 font-bold border-b border-gray-200">
          <span>메뉴</span>
          <button
            onClick={() => setSidebarOpen(false)}
            className="bg-transparent border-none p-0 cursor-pointer flex items-center justify-center active:scale-90"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
              <path
                d="M17.9925 5.99707L5.9975 17.9921"
                stroke="#364153"
                strokeWidth="1.99917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              <path
                d="M5.9975 5.99707L17.9925 17.9921"
                stroke="#364153"
                strokeWidth="1.99917"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>
        </div>

        <nav className="flex flex-col">
          {navItems.map(({ label, to }) => (
            <NavLink
              key={to}
              to={to}
              onClick={() => setSidebarOpen(false)}
              className="py-4 px-5 block no-underline text-[#333]"
              style={{ fontFamily: "Galmuri11" }}
            >
              {label}
            </NavLink>
          ))}
          <div className="flex flex-row items-center">
            <img
              src="https://img.icons8.com/?size=100&id=vQOFSUMXPpGA&format=png&color=000000"
              alt="Login Icon"
              className="w-6 h-6 my-3 ml-3"
            />
            <a
              href="/login"
              className="p-3 no-underline"
              style={{ color: "#e7000b", fontFamily: "Galmuri11" }}
            >
              로그인
            </a>
          </div>
        </nav>
      </div>

      {/* 오버레이 */}
      {sidebarOpen && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black/40 z-10"
          onClick={() => setSidebarOpen(false)}
        />
      )}
    </header>
  );
};

export default Header;
