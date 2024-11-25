import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogOverlay,
  DialogTitle,
} from '@/components/ui/dialog';
import {
  Dispatch,
  FormEvent,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import { Eye, EyeOff } from 'lucide-react';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { useMutation } from '@tanstack/react-query';
import { postSigninApi, postSignupApi } from '@/services/auth';
import { toast } from 'react-toastify';
import { AxiosError } from 'axios';
import { GenericResponse } from '@/types/common.interface';
import {
  setAccessTokenFromLocalStorage,
  setRefreshTokenFromLocalStorage,
} from '@/utils/localStorage';

interface SigninModalProps {
  isLoginModalOpen: boolean;
  setIsLoginModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SigninModal = (props: SigninModalProps) => {
  const { isLoginModalOpen, setIsLoginModalOpen } = props;

  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { mutate: signinMutate } = useMutation({
    mutationFn: postSigninApi,
    onSuccess: (res) => {
      const { accessToken, refreshToken } = res.data;
      setAccessTokenFromLocalStorage(accessToken);
      setRefreshTokenFromLocalStorage(refreshToken);

      toast.success('로그인에 성공했습니다');
      setIsLoginModalOpen(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const message =
        (axiosError.response?.data as GenericResponse)?.message ||
        'An unknown error occurred';

      toast.error(message);
    },
  });

  const handleLogin = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signinMutate({ loginId, password });
  };

  useEffect(() => {
    // 모달이 닫히면 input이 초기화 됩니다.
    setLoginId('');
    setPassword('');
  }, [isLoginModalOpen]);

  return (
    <Dialog open={isLoginModalOpen} onOpenChange={setIsLoginModalOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />

      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg z-50">
        <DialogHeader className={'pb-4'}>
          <DialogTitle className={'text-2xl font-semibold'}>로그인</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleLogin}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="username">사용자 이름</Label>
              <Input
                id="loginId"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">비밀번호</Label>
              <div className="relative">
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 입력하세요"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="h-4 w-4" />
                  ) : (
                    <Eye className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              로그인
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
