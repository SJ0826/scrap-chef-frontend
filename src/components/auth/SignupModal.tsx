'use client';

import { Dispatch, FormEvent, SetStateAction, useState } from 'react';
import { Dialog, DialogHeader, DialogOverlay } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Eye, EyeOff } from 'lucide-react';

import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { toast } from 'react-toastify';
import { TOAST_MESSAGE } from '@/constants/toastMessage';
import { useMutation } from '@tanstack/react-query';
import { postSignupApi } from '@/services/auth';
import { AxiosError } from 'axios';
import { GenericResponse } from '@/types/common.interface';

interface SignupModalProps {
  isSignUpModalOpen: boolean;
  setIsSignUpModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SignupModal = (props: SignupModalProps) => {
  const { isSignUpModalOpen, setIsSignUpModalOpen } = props;
  const [loginId, setLoginId] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { mutate: signupMutate } = useMutation({
    mutationFn: postSignupApi,
    onSuccess: (res) => {
      toast.success(TOAST_MESSAGE.SIGNUP_SUCCESS);
      setIsSignUpModalOpen(false);
    },
    onError: (error) => {
      const axiosError = error as AxiosError;
      const message =
        (axiosError.response?.data as GenericResponse)?.message ||
        'An unknown error occurred';

      toast.error(message);
    },
  });
  const handleSignUp = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // 모든 입력란이 유효한지 확인
    if (!loginId) {
      toast('아이디를 입력해주세요');
      return;
    }
    if (!password) {
      toast.error('비밀번호를 입력해주세요');
      return;
    }
    if (!confirmPassword) {
      toast.error('비밀번호 확인을 입력해주세요');
      return;
    }

    // 비밀번호와 비밀번호 확인이 일치하는지 확인
    if (password !== confirmPassword) {
      toast.error(TOAST_MESSAGE.PASSWORD_CONFIRM_FAIL);
      return;
    }

    signupMutate({ loginId, password });
  };

  return (
    <Dialog open={isSignUpModalOpen} onOpenChange={setIsSignUpModalOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg z-50">
        <DialogHeader className={'pb-4'}>
          <DialogTitle className={'text-2xl font-semibold'}>
            회원가입
          </DialogTitle>
        </DialogHeader>
        <form onSubmit={handleSignUp}>
          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="signup-username">아이디</Label>
              <Input
                id="signup-username"
                placeholder="아이디를 입력하세요"
                value={loginId}
                onChange={(e) => setLoginId(e.target.value)}
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="signup-password">비밀번호</Label>
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
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="confirm-password">비밀번호 확인</Label>
              <div className="relative">
                <Input
                  id="confirm-password"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="비밀번호를 다시 입력하세요"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  {showConfirmPassword ? (
                    <Eye className="h-4 w-4" />
                  ) : (
                    <EyeOff className="h-4 w-4" />
                  )}
                </Button>
              </div>
            </div>
            <Button type="submit" className="w-full">
              가입하기
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
