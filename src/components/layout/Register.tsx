import { useRegister } from '../../hooks/useRegister';

// Register page component
const Register = () => {
  // Use the custom useRegister hook to manage registration state and actions
  const {
    loginId,
    setLoginId,
    nickname,
    setNickname,
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    showPassword,
    showConfirmPassword,
    toggleShowPassword,
    toggleShowConfirmPassword,
    idCheckResult,
    nicknameCheckResult,
    passwordStrength,
    passwordError,
    confirmPasswordError,
    canSubmit,
    handlenicknameCheck,
    handleIdCheck,
    handleRegister,
    handleLoginRedirect,
  } = useRegister();

  // Render the registration form with appropriate styling and functionality
  return (
    <main className="w-screen min-h-250 flex flex-col items-center justify-center gap-5 bg-[linear-gradient(135deg,#FEF2F2_0%,#FFF_50%,#FFF7ED_100%)]">
      {/* icon & header */}
      <div className="flex flex-col items-center gap-2">
        <a href="/" data-page="home" className="flex flex-col items-center gap-2 no-underline">
          <img
            src="/assets/pokearchive.png"
            alt="포켓아카이브"
            loading="eager"
            className="h-25 w-auto"
          />
          <h1 className="text-xl font-bold text-[#1a3a35]">포켓 아카이브</h1>
        </a>
        <p className="text-xs text-[#5a8a82] tracking-widest text-center">
          포켓몬 트레이너 커뮤니티에
          <br className="hidden max-[315px]:block" /> 오신 것을 환영합니다!
        </p>
      </div>

      {/* register box */}
      <div className="bg-white rounded-xl border-t-8 border-b-8 border-[#00BBA7] shadow-[0_8px_32px_rgba(0,187,167,0.15)] flex flex-col items-start gap-6 w-md max-[501px]:w-[calc(100vw-32px)] max-[501px]:h-auto max-[501px]:px-5 max-[501px]:pb-6 p-8">
        <h2 className="text-2xl font-bold text-[#00BBA7] mb-1">회원가입</h2>

        <form name="registerForm" className="w-full flex flex-col gap-4" onSubmit={handleRegister}>
          {/* nickname */}
          <div className="flex min-h-24 flex-col items-start gap-2 shrink-0 self-stretch">
            <p className="text-s">닉네임</p>
            <div className="flex flex-row items-center gap-2 w-full">
              <input
                type="text"
                id="register_nickname"
                name="register_nickname"
                placeholder="닉네임을 입력하세요"
                value={nickname}
                onChange={(e) => setNickname(e.target.value)}
                className="w-full h-12 bg-[#f4faf9] border border-[#d0eeea] rounded-lg text-sm text-[#1a3a35] placeholder-[#aac8c3] outline-none focus:border-[#00BBA7] transition-colors pl-3 pr-4"
              />
              <button
                type="button"
                onClick={handlenicknameCheck}
                id="checkNicknameBtn"
                className="inline-flex h-12 py-2.25 px-6.25 justify-center items-center rounded-[10px] border border-[#00BBA7] bg-white/10 text-[#0A0A0A] text-center text-xs font-normal leading-6 whitespace-nowrap transition-colors cursor-pointer"
              >
                중복확인
              </button>
            </div>
            {nicknameCheckResult && (
              <p
                className={`text-xs -mt-1 ${nicknameCheckResult.ok ? 'text-[#00BBA7]' : 'text-red-500'}`}
              >
                {nicknameCheckResult.text}
              </p>
            )}
          </div>

          {/* ID */}
          <div className="flex min-h-24 flex-col items-start gap-2 shrink-0 self-stretch">
            <p className="text-s">아이디</p>
            <div className="flex flex-row items-center gap-2 w-full">
              <input
                type="text"
                id="register_id"
                name="register_id"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                className="w-full h-12 bg-[#f4faf9] border border-[#d0eeea] rounded-lg text-sm text-[#1a3a35] placeholder-[#aac8c3] outline-none focus:border-[#00BBA7] transition-colors pl-3 pr-4"
              />
              <button
                type="button"
                onClick={handleIdCheck}
                id="checkIdBtn"
                className="inline-flex h-12 py-2.25 px-6.25 justify-center items-center rounded-[10px] border border-[#00BBA7] bg-white/10 text-[#0A0A0A] text-center text-xs font-normal leading-6 whitespace-nowrap transition-colors cursor-pointer"
              >
                중복확인
              </button>
            </div>
            {idCheckResult && (
              <p
                className={`text-xs -mt-1 ${idCheckResult.ok ? 'text-[#00BBA7]' : 'text-red-500'}`}
              >
                {idCheckResult.text}
              </p>
            )}
          </div>

          {/* Password */}
          <div className="flex min-h-24 flex-col items-start gap-2 shrink-0 self-stretch">
            <p className="text-s">비밀번호</p>
            <div className="relative w-full">
              <input
                type={showPassword ? 'text' : 'password'}
                id="register_password"
                name="register_password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full h-12 bg-[#f4faf9] border border-[#d0eeea] rounded-lg pr-11 text-sm text-[#1a3a35] placeholder-[#aac8c3] outline-none focus:border-[#00BBA7] transition-colors pl-3"
              />
              <button
                type="button"
                id="eye"
                aria-label="비밀번호 표시"
                onClick={toggleShowPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aac8c3] hover:text-[#00BBA7] transition-colors cursor-pointer bg-transparent border-0 p-0 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line
                    id="eye-slash"
                    x1="4"
                    y1="4"
                    x2="20"
                    y2="20"
                    strokeDasharray="24"
                    strokeDashoffset={showPassword ? 0 : 24}
                    className="[transition:stroke-dashoffset_0.2s]"
                  />
                </svg>
              </button>
            </div>
            {passwordStrength &&
              (() => {
                const levels = [
                  { key: 'danger', label: '위험', bar: 'bg-red-500', text: 'text-red-500' },
                  { key: 'normal', label: '보통', bar: 'bg-orange-400', text: 'text-orange-400' },
                  { key: 'strong', label: '강력', bar: 'bg-yellow-400', text: 'text-yellow-500' },
                  {
                    key: 'very-strong',
                    label: '매우강력',
                    bar: 'bg-[#00BBA7]',
                    text: 'text-[#00BBA7]',
                  },
                ] as const;
                const idx = levels.findIndex((l) => l.key === passwordStrength);
                const { label, bar, text } = levels[idx];
                return (
                  <div className="w-full flex flex-col gap-1 mt-1">
                    <div className="flex gap-1">
                      {levels.map((l, i) => (
                        <div
                          key={l.key}
                          className={`h-1 flex-1 rounded-full transition-colors ${i <= idx ? bar : 'bg-gray-200'}`}
                        />
                      ))}
                    </div>
                    <p className={`text-xs ${text}`}>{label}</p>
                  </div>
                );
              })()}
            {passwordError && <p className="text-xs text-red-500">{passwordError}</p>}
          </div>

          {/* Password confirm */}
          <div className="flex min-h-24 flex-col items-start gap-2 shrink-0 self-stretch">
            <p className="text-s">비밀번호 확인</p>
            <div className="relative w-full">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                id="register_password_confirm"
                name="register_password_confirm"
                placeholder="비밀번호를 다시 입력하세요"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full h-12 bg-[#f4faf9] border border-[#d0eeea] rounded-lg pr-11 text-sm text-[#1a3a35] placeholder-[#aac8c3] outline-none focus:border-[#00BBA7] transition-colors pl-3"
              />
              <button
                type="button"
                id="eye2"
                aria-label="비밀번호 확인 표시"
                onClick={toggleShowConfirmPassword}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-[#aac8c3] hover:text-[#00BBA7] transition-colors cursor-pointer bg-transparent border-0 p-0 flex items-center"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
                  <circle cx="12" cy="12" r="3" />
                  <line
                    id="eye-slash2"
                    x1="4"
                    y1="4"
                    x2="20"
                    y2="20"
                    strokeDasharray="24"
                    strokeDashoffset={showConfirmPassword ? 0 : 24}
                    className="[transition:stroke-dashoffset_0.2s]"
                  />
                </svg>
              </button>
            </div>
            {confirmPasswordError && <p className="text-xs text-red-500">{confirmPasswordError}</p>}
          </div>

          {/* Error message */}
          <p
            id="register-msg"
            className="hidden text-s text-red-500 bg-red-50 rounded-md px-3 py-2 mb-3"
          ></p>

          {/* Register button */}
          <button
            disabled={!canSubmit}
            type="submit"
            className="w-full h-12 bg-[#00BBA7] hover:bg-[#009e8d] text-white rounded-full text-base font-bold transition-colors cursor-pointer border-0 mb-5 disabled:opacity-50 disabled:cursor-not-allowed"
            id="signupBtn"
          >
            회원가입
          </button>

          {/* Back to login */}
          <div className="flex items-center justify-center gap-2 text-sm">
            <p className="text-[#8a9a98] m-0">이미 계정이 있으신가요?</p>
            <button
              type="button"
              onClick={handleLoginRedirect}
              className="bg-transparent border-0 text-[#00BBA7] hover:text-[#009e8d] text-sm underline cursor-pointer p-0"
              id="loginBtn"
            >
              로그인
            </button>
          </div>
        </form>
      </div>

      {/* footer */}
      <p className="text-xs text-[#8a9a98]">포켓몬 마스터가 되는 여정을 시작하세요!</p>
    </main>
  );
};

export default Register;
