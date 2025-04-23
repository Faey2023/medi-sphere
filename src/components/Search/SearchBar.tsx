'use client';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { useEffect, useState } from 'react';
import { setSearch } from '@/redux/features/productSlice';
import { useRouter, usePathname } from 'next/navigation';

export default function SearchBar() {
  const dispatch = useAppDispatch();
  const { search } = useAppSelector((state) => state.medicines);
  const [input, setInput] = useState(search);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    setInput(search);
  }, [search]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setInput(value);
  };

  // automatically dispatch when input is cleared
  useEffect(() => {
    if (input.trim() === '') {
      dispatch(setSearch(''));
    }
  }, [input, dispatch]);

  const handleSearch = () => {
    dispatch(setSearch(input));
    // navigate to shop page if not already there
    if (pathname !== '/shop') {
      router.push('/shop');
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="mx-8 max-w-xl flex-1">
      <div className="relative">
        <Input
          type="text"
          value={input}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder="Search by name"
          className="w-full rounded-full border-gray-200 pr-12 placeholder:text-[10px] lg:placeholder:text-base"
        />
        <Button
          onClick={handleSearch}
          className="absolute top-0 right-0 h-full rounded-l-none rounded-r-full bg-blue-900 hover:bg-blue-700"
        >
          <Search className="h-5 w-5" />
          <span className="sr-only">Search</span>
        </Button>
      </div>
    </div>
  );
}
