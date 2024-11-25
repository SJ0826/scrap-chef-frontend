import { Dialog, DialogHeader, DialogOverlay } from '@/components/ui/dialog';
import { DialogContent, DialogTitle } from '@radix-ui/react-dialog';
import { Button } from '@/components/ui/button';
import { Dispatch, SetStateAction } from 'react';
import {
  removeAccessTokenFromLocalStorage,
  removeRefreshTokenFromLocalStorage,
} from '@/utils/localStorage';

interface SignoutModalProps {
  isSignoutModalOpen: boolean;
  setIsSignoutModalOpen: Dispatch<SetStateAction<boolean>>;
}

export const SignoutModal = (props: SignoutModalProps) => {
  const { isSignoutModalOpen, setIsSignoutModalOpen } = props;

  const signOutHandler = () => {
    removeAccessTokenFromLocalStorage();
    removeRefreshTokenFromLocalStorage();
    setIsSignoutModalOpen(false);
  };

  return (
    <Dialog open={isSignoutModalOpen} onOpenChange={setIsSignoutModalOpen}>
      <DialogOverlay className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40" />
      <DialogContent className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[90%] max-w-md bg-white rounded-2xl p-6 shadow-lg z-50">
        <DialogHeader className={'pb-4'}>
          <DialogTitle className={'text-2xl font-semibold'}>
            로그아웃
          </DialogTitle>
        </DialogHeader>
        <p className={'pb-4'}>정말 로그아웃 하시겠습니까?</p>
        <Button onClick={signOutHandler} className="w-full">
          로그아웃
        </Button>
      </DialogContent>
    </Dialog>
  );
};
