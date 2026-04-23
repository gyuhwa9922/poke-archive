import { register, checkLoginId, checkNickname, type CheckResult } from '../api/user';
import { useState } from 'react';

// Custom hook that manages membership registration logic
export function useRegister() {
  const [loginId, setLoginIdRaw] = useState('');
  const [nickname, setNicknameRaw] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Duplicate check result status
  const [idCheckResult, setIdCheckResult] = useState<CheckResult | null>(null);
  const [nicknameCheckResult, setNicknameCheckResult] = useState<CheckResult | null>(null);

  // Reset duplicate check results when entering login ID and nickname
  const setLoginId = (v: string) => {
    setLoginIdRaw(v.replace(/[^a-zA-Z0-9_]/g, ''));
    setIdCheckResult(null);
  };

  // Initialize duplicate check results when entering nickname
  const setNickname = (v: string) => {
    setNicknameRaw(v);
    setNicknameCheckResult(null);
  };

  // Password display toggle function
  const toggleShowPassword = () => setShowPassword((v) => !v);
  const toggleShowConfirmPassword = () => setShowConfirmPassword((v) => !v);

  // ID duplicate check function
  const handleIdCheck = async () => {
    if (!loginId.trim() || /[^a-zA-Z0-9_]/.test(loginId)) {
      setIdCheckResult({ text: '영문으로 입력해주세요.', ok: false });
      return;
    }
    try {
      const data = await checkLoginId(loginId);
      if (!data.exists) {
        setIdCheckResult({ text: '사용 가능한 아이디입니다.', ok: true });
      } else {
        setIdCheckResult({ text: '이미 사용 중인 아이디입니다.', ok: false });
      }
    } catch {
      setIdCheckResult({ text: '중복 확인에 실패했습니다.', ok: false });
    }
  };

  // Nickname duplicate check function
  const handlenicknameCheck = async () => {
    if (!nickname.trim()) {
      setNicknameCheckResult({ text: '닉네임을 입력해주세요.', ok: false });
      return;
    }
    try {
      const data = await checkNickname(nickname);
      if (!data.exists) {
        setNicknameCheckResult({ text: '사용 가능한 닉네임입니다.', ok: true });
      } else {
        setNicknameCheckResult({ text: '이미 사용 중인 닉네임입니다.', ok: false });
      }
    } catch {
      setNicknameCheckResult({ text: '중복 확인에 실패했습니다.', ok: false });
    }
  };

  // Password strength evaluation
  const SPECIAL = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?~`]/;
  const HAS_LETTER = /[a-zA-Z]/;
  const HAS_NUMBER = /[0-9]/;

  // Define password strength levels
  type PasswordStrength = 'danger' | 'normal' | 'strong' | 'very-strong';

  // Evaluate password strength based on defined criteria
  const passwordStrength: PasswordStrength | null = (() => {
    if (!password) return null;
    if (password.length < 8) return 'danger';
    const hasLetter = HAS_LETTER.test(password);
    const hasNumber = HAS_NUMBER.test(password);
    const hasSpecial = SPECIAL.test(password);
    if (hasLetter && hasNumber && hasSpecial && password.length >= 10) return 'very-strong';
    if (hasLetter && hasNumber && hasSpecial) return 'strong';
    if (hasLetter && hasNumber) return 'normal';
    return 'danger';
  })();

  // Password validation error messages
  const passwordError = (() => {
    if (!password) return null;
    if (password.length < 8) return '비밀번호는 8자 이상이어야 합니다.';
    if (!SPECIAL.test(password)) return '특수문자를 1개 이상 포함해야 합니다.';
    return null;
  })();

  // Confirm password validation error message
  const confirmPasswordError =
    confirmPassword && password !== confirmPassword ? '비밀번호가 일치하지 않습니다.' : null;

  // Form submission availability check
  const canSubmit =
    idCheckResult?.ok === true &&
    nicknameCheckResult?.ok === true &&
    (passwordStrength === 'strong' || passwordStrength === 'very-strong') &&
    confirmPasswordError === null &&
    confirmPassword.length > 0;

  // Membership registration processing function
  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!canSubmit) return;
    try {
      const data = await register(loginId, nickname, password);
      localStorage.setItem('token', data.token);
      alert('회원가입 성공! 메인페이지로 이동합니다.');
      window.location.href = '/';
    } catch (error) {
      console.error('회원가입 실패:', error);
      alert('회원가입에 실패했습니다. 입력한 정보를 확인해주세요.');
    }
  };

  // Function to go to the login page
  const handleLoginRedirect = () => {
    window.location.href = '/login';
  };

  // Return the state and functions to be returned from the hook in object form.
  return {
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
  };
}
