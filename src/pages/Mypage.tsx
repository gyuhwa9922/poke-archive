import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import CategoryFilter from '../components/mypage/CategoryFilter';
import Myinfo from '../components/mypage/Myinfo';
import Myboard from '../components/mypage/Myboard';
import MyPokemons from '../components/mypage/MyPokemons';
import { getMe, getMyPosts, getMyPocketmons, withdraw } from '../api/user';
import type { User } from '../api/user';
import { useAuthStore } from '../store/authStore';
import { useModalStore, showModal, showPrompt } from '../store/modalStore';

const Mypage = () => {
  const nav = useNavigate();
  const { setLoggedOut } = useAuthStore();
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

  const handleSelect = async (category: string) => {
    if (category === '로그아웃') {
      const confirmed = await useModalStore.getState().openModal({
        title: '로그아웃',
        desc: '정말 로그아웃 하시겠습니까?',
        modalType: 'confirm',
        colorType: 'default',
      });
      if (!confirmed) return;
      localStorage.removeItem('token');
      setLoggedOut();
      nav('/', { replace: true });
      return;
    }

    if (category === '회원탈퇴') {
      const confirmed = await useModalStore.getState().openModal({
        title: '회원탈퇴',
        desc: '탈퇴 시 모든 데이터가 삭제되며 복구할 수 없습니다.\n정말 탈퇴하시겠습니까?',
        modalType: 'confirm',
        colorType: 'danger',
      });
      if (!confirmed) return;

      const password = await showPrompt(
        '비밀번호 확인',
        '탈퇴를 위해 비밀번호를 입력해 주세요.',
        'password'
      );
      if (password === null || password === '') return;

      try {
        await withdraw(password);
        localStorage.removeItem('token');
        setLoggedOut();
        await showModal('탈퇴 완료', '회원 탈퇴가 완료되었습니다.');
        nav('/', { replace: true });
      } catch {
        showModal('오류', '비밀번호가 올바르지 않습니다.\n다시 시도해 주세요.', 'danger');
      }
      return;
    }

    setSelected(category);
  };

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
          <CategoryFilter selected={selected} onSelect={handleSelect} />

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
