import { useState } from 'react';
import CategoryFilter from '../components/mypage/CategoryFilter';
import Myinfo from '../components/mypage/Myinfo';

const Mypage = () => {
  const [selected, setSelected] = useState('내 정보');

  return (
    <div className="flex justify-center w-full">
      <div className="w-full max-w-360 m-12 gap-3">
        {/* 페이지 타이틀 */}
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-[#1a3a35]">마이페이지</h1>
          <p className="text-sm text-[#5a8a82] mt-1">
            내정보 관리, 내 계시글, 보유 포켓몬을 확인할 수 있습니다.
          </p>
        </div>

        <section className="flex gap-6 w-full items-start max-[1025px]:flex-col max-[1025px]:items-stretch mt-6">
          {/* 왼쪽 그리드: 내정보, 내 게시글, 보유 포켓몬, 로그아웃, 회원탈퇴 카테고리 */}
          <CategoryFilter selected={selected} onSelect={setSelected} />

          {/* 오른쪽 그리드: 선택된 카테고리에 따른 상세 정보 영역 */}
          <Myinfo
            user={{ nickname: 'test', loginId: 'test', introduce: '테스트 계정입니다' }}
            postCount={1}
            catchCount={44}
          />
          {/* <Myboard /> */}
          {/* <MyPokemons /> */}
        </section>
      </div>
    </div>
  );
};

export default Mypage;
