'use client';

import Image from 'next/image';
import {
  Refrigerator,
  Carrot,
  ChefHat,
  X,
  Plus,
  Search,
  Loader2,
  ChevronLeft,
  ChevronRight,
  LogOut,
  LogIn,
  UserPlus,
} from 'lucide-react';

import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import {
  Dialog,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { SignupModal } from '@/components/auth/SignupModal';
import { SigninModal } from '@/components/auth/SigninModal';
import { getAccessTokenFromLocalStorage } from '@/utils/localStorage';
import { SignoutModal } from '@/components/auth/SignoutModal';

type Ingredient = {
  id: number;
  name: string;
};

const RECIPES_PER_PAGE = 6;

export default function Home() {
  const [ingredients, setIngredients] = useState<Ingredient[]>([]);
  const [newIngredient, setNewIngredient] = useState('');
  const [recipes, setRecipes] = useState<Recipe[]>([]);
  const [selectedRecipe, setSelectedRecipe] = useState<Recipe | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalCount, setTotalCount] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isSignUpModalOpen, setIsSignUpModalOpen] = useState(false);
  const [isSignOutModalOpen, setIsSignOutModalOpen] = useState(false);

  const [mounted, setMounted] = useState(false);

  const totalPages = Math.ceil(totalCount / RECIPES_PER_PAGE);

  const addIngredient = () => {
    if (newIngredient.trim() !== '') {
      setIngredients([
        ...ingredients,
        { id: new Date().getTime(), name: newIngredient },
      ]);
      setNewIngredient('');
    }
  };

  const removeIngredient = (id: number) => {
    setIngredients(ingredients.filter((ing) => ing.id !== id));
  };

  const searchRecipes = async (page = 1) => {
    // const ingredientNameList = ingredients.map((ingredient) => ingredient.name);
    // setIsLoading(true);
    // try {
    //   const response = await getRecipesAPI(ingredientNameList, page);
    //   setRecipes(response.data?.recipes?.recipe);
    //   setTotalCount(Number(response.data?.recipes?.totalCount));
    // } catch (error) {
    //   console.error('Error fetching recipes:', error);
    // } finally {
    //   setIsLoading(false);
    // }
  };

  const openRecipeModal = (recipe: Recipe) => {
    setSelectedRecipe(recipe);
    setIsModalOpen(true);
  };

  const goToNextPage = async () => {
    if (currentPage < totalPages) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      await searchRecipes(nextPage); // 페이지 변경 즉시 검색 함수 호출
    }
  };

  const goToPreviousPage = async () => {
    if (currentPage > 1) {
      const previousPage = currentPage - 1;
      setCurrentPage(previousPage);
      await searchRecipes(previousPage); // 페이지 변경 즉시 검색 함수 호출
    }
  };

  const handleLogout = () => {
    setIsSignOutModalOpen(true);
  };

  useEffect(() => {
    setMounted(true);
  }, []);

  /**
   * 로그인 상태를 체크합니다.
   */
  useEffect(() => {
    if (getAccessTokenFromLocalStorage()) {
      setIsLoggedIn(true);
    } else {
      setIsLoggedIn(false);
    }
  }, [isLoginModalOpen, isSignOutModalOpen]);

  if (!mounted) return <></>;
  return (
    <main className="container mx-auto max-w-3xl bg-white shadow-lg rounded-lg p-6">
      <nav className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold flex items-center">
          <Refrigerator className="mr-2" />
          냉장고탈탈
        </h1>
        <div className="flex items-center space-x-2">
          {isLoggedIn ? (
            <Button
              onClick={handleLogout}
              variant="outline"
              className="flex items-center"
            >
              <LogOut className="mr-2" size={18} />
              로그아웃
            </Button>
          ) : (
            <>
              <Button
                onClick={() => setIsLoginModalOpen(true)}
                variant="outline"
                className="flex items-center"
              >
                <LogIn className="mr-2" size={18} />
                로그인
              </Button>
              <Button
                onClick={() => setIsSignUpModalOpen(true)}
                variant="outline"
                className="flex items-center"
              >
                <UserPlus className="mr-2" size={18} />
                회원가입
              </Button>
            </>
          )}
        </div>
      </nav>

      {!isLoggedIn && (
        <Card className="mb-8 bg-pastel-orange/20 border-pastel-orange">
          <CardContent className="p-4">
            <p className="text-pastel-darkorange text-center">
              회원가입하고 레시피를 저장해보세요! 자주 사용하는 레시피를
              언제든지 쉽게 찾아볼 수 있습니다.
            </p>
          </CardContent>
        </Card>
      )}

      <Card className="mb-8 shadow-lg rounded-2xl overflow-hidden border-4">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <Carrot className="mr-2" />
            냉장고 재료
          </CardTitle>
          <CardDescription>냉장고에 있는 재료를 입력하세요</CardDescription>
          <CardContent className="p-6">
            <div className="flex space-x-2 mb-4">
              <Input
                type="text"
                value={newIngredient}
                onChange={(e) => setNewIngredient(e.target.value)}
                placeholder="재료 이름"
                className="rounded-full"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    addIngredient();
                  }
                }}
              />
              <Button
                onClick={addIngredient}
                className="rounded-full bg-pastel-darkorange hover:bg-pastel-darkorange/80 text-white"
              >
                <Plus size={18} />
                추가
              </Button>
            </div>
            <ul className="space-y-2">
              {ingredients.map((ing) => (
                <li
                  key={ing.id}
                  className="flex justify-between items-center p-2 bg-pastel-orange/30 rounded-full"
                >
                  <span className="ml-4">{ing.name}</span>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => removeIngredient(ing.id)}
                    className="rounded-full text-pastel-darkorange hover:text-pastel-darkorange/80"
                  >
                    <X size={18} />
                  </Button>
                </li>
              ))}
            </ul>
          </CardContent>
          <CardFooter className="">
            <Button
              onClick={() => searchRecipes(1)}
              className="w-full rounded-full bg-white hover:bg-pastel-lightorange text-pastel-darkorange"
            >
              <Search size={18} className="mr-2" />
              레시피 검색
            </Button>
          </CardFooter>
        </CardHeader>
      </Card>
      <Card className="mb-8 shadow-lg rounded-2xl overflow-hidden border-4">
        <CardHeader>
          <CardTitle className="flex items-center text-2xl">
            <ChefHat className="mr-2" />
            레시피 목록
          </CardTitle>
        </CardHeader>
        <CardContent className="p-6">
          {isLoading ? (
            <div className="flex justify-center items-center h-40">
              <Loader2 className="w-8 h-8 animate-spin text-pastel-darkorange" />
            </div>
          ) : (
            <div>
              <ul className="grid grid-cols-2 gap-4">
                {recipes?.map((recipe) => (
                  <li key={recipe.id} className="mb-2">
                    <Button
                      variant="outline"
                      onClick={() => openRecipeModal(recipe)}
                      className="w-full h-full rounded-xl hover:bg-pastel-orange/30 flex flex-col items-center justify-center p-4"
                    >
                      <Image
                        src={recipe.imageUrl}
                        alt={recipe.name}
                        width={100}
                        height={100}
                        className="rounded-lg mb-2"
                      />
                      {recipe.name}
                    </Button>
                  </li>
                ))}
              </ul>
              {recipes?.length > 0 ? (
                <div className="flex justify-between items-center mt-4">
                  <Button
                    onClick={goToPreviousPage}
                    disabled={currentPage === 1}
                    className="rounded-full bg-pastel-darkorange hover:bg-pastel-darkorange/80 text-white"
                  >
                    <ChevronLeft size={18} />
                    이전
                  </Button>
                  <span className="text-pastel-darkorange">
                    {currentPage} / {totalPages}
                  </span>
                  <Button
                    onClick={goToNextPage}
                    disabled={currentPage === totalPages}
                    className="rounded-full bg-pastel-darkorange hover:bg-pastel-darkorange/80 text-white"
                  >
                    다음
                    <ChevronRight size={18} />
                  </Button>
                </div>
              ) : (
                <span>레시피 정보가 없습니다</span>
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="bg-white rounded-2xl border-4 border-pastel-orange max-h-[80%] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="text-2xl flex items-center">
              <ChefHat className="mr-2" />
              {selectedRecipe?.name}
            </DialogTitle>
          </DialogHeader>
          <div className="p-6">
            <div className="flex justify-center mb-4">
              <Image
                src={selectedRecipe?.imageUrl || ''}
                alt={selectedRecipe?.name || ''}
                width={200}
                height={200}
                className="rounded-lg"
              />
            </div>
            <h3 className="font-bold mb-2 text-lg">재료:</h3>
            <ul className="list-disc list-inside mb-4 pl-4">
              {selectedRecipe?.ingredients.map((ing, index) => (
                <li key={index} className="mb-1">
                  {ing}
                </li>
              ))}
            </ul>
            <h3 className="font-bold mb-2 text-lg">조리 방법:</h3>
            <ol className="space-y-4">
              {selectedRecipe?.manualSteps.map((manual, index) => (
                <li key={index} className="flex items-start space-x-4">
                  <div className="flex-shrink-0">
                    <Image
                      src={manual.imageUrl}
                      alt={`Step ${index + 1}`}
                      width={150}
                      height={150}
                      className="rounded-lg"
                    />
                  </div>
                  <div className="flex-grow">
                    <p className="text-lg">{manual.step}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
          <DialogFooter>
            <Button
              onClick={() => setIsModalOpen(false)}
              className="w-full rounded-full bg-pastel-orange hover:bg-pastel-orange/80 text-white"
            >
              닫기
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
      <SigninModal
        isLoginModalOpen={isLoginModalOpen}
        setIsLoginModalOpen={setIsLoginModalOpen}
      />
      <SignupModal
        isSignUpModalOpen={isSignUpModalOpen}
        setIsSignUpModalOpen={setIsSignUpModalOpen}
      />
      <SignoutModal
        isSignoutModalOpen={isSignOutModalOpen}
        setIsSignoutModalOpen={setIsSignOutModalOpen}
      />
    </main>
  );
}
