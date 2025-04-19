'use client';

import { Search } from 'lucide-react';
import { Button } from '../ui/button';
import { Input } from '../ui/input';

export default function SearchBar() {
  return (
    <>
      {/* Search bar */}
      <div className="mx-8 max-w-xl flex-1">
        <div className="relative">
          <Input
            type="text"
            //   value={input}
            //   onChange={handleInputChange}
            placeholder="Search by name or category"
            className="w-full rounded-full border-gray-200 pr-12"
          />
          <Button
            // onClick={handleSearch}
            className="absolute top-0 right-0 h-full rounded-l-none rounded-r-full bg-teal-500 hover:bg-teal-600"
          >
            <Search className="h-5 w-5" />
            <span className="sr-only">Search</span>
          </Button>
        </div>
      </div>
    </>
  );
}
