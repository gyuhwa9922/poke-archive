import { useState, useEffect } from 'react';
import CategoryFilter from '../components/mypage/CategoryFilter';
import Myinfo from '../components/mypage/Myinfo';
import Myboard from '../components/mypage/Myboard';
import MyPokemons from '../components/mypage/MyPokemons';
import { getMe, getMyPosts, getMyPocketmons } from '../api/user';
import type { User } from '../api/user';

const Mypage = () => {
  const [selected, setSelected] = useState('내 정보');
  const [user, setUser] = useState<User | null>(null);
  const [postCount, setPostCount] = useState(0);
  const [catchCount, setCatchCount] = useState(0);
  const [refreshKey, setRefreshKey] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      const [userResult, postsResult, catchResult] = await Promise.allSettled([
        getMe(),
        getMyPosts(),
        getMyPocketmons(),
      ]);

      if (userResult.status === 'fulfilled') setUser(userResult.value);
      if (postsResult.status === 'fulfilled') setPostCount(postsResult.value.length);
      if (catchResult.status === 'fulfilled') setCatchCount(catchResult.value.length);
    };

    fetchData();
  }, [refreshKey]);

  return (
    <div className="flex justify-center w-full min-h-250 h-auto">
      <div className="w-full max-w-360 m-12 gap-3">
        {/* 페이지 타이틀 */}
        <div className="flex flex-col text-left">
          <h1 className="text-3xl font-bold text-[#1a3a35]">마이페이지</h1>
          <p className="text-sm text-[#5a8a82] mt-1">
            내정보 관리, 내 계시글, 보유 포켓몬을 확인할 수 있습니다.
          </p>
        </div>

        <section className="flex gap-6 w-full items-start max-[1025px]:flex-col max-[1025px]:items-stretch mt-6">
          <CategoryFilter selected={selected} onSelect={setSelected} />

          {selected === '내 정보' && user && (
            <Myinfo
              user={user}
              postCount={postCount}
              catchCount={catchCount}
              onUpdate={() => setRefreshKey((k) => k + 1)}
            />
          )}
          {selected === '작성 게시글' && <Myboard />}
          {selected === '내가 지닌 포켓몬' && <MyPokemons />}
        </section>
      </div>
    </div>
  );
};

export default Mypage;
