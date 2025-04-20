'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@/components/ui/drawer';

import FilterSidebar from '@/components/Filter/FilterSidebar';
import { useAppSelector, useAppDispatch } from '@/redux/hook';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import MedicineCard from './MedicineCard';
import { IMedicine } from '@/types';
import { setFilters } from '@/redux/features/productSlice';

export default function AllMedicines() {
  const [open, setOpen] = useState(false);
  const [page, setPage] = useState(1);
  const limit = 10;
  const [allMedicines, setAllMedicines] = useState<IMedicine[]>([]);
  const [hasMore, setHasMore] = useState(true);
  const [isLoadingMore, setIsLoadingMore] = useState(false);
  const observer = useRef<IntersectionObserver | null>(null);
  const lastMedicineElementRef = useRef<HTMLDivElement | null>(null);

  const dispatch = useAppDispatch();
  const { search, filters } = useAppSelector((state) => state.medicines);

  const queryParams = {
    searchTerm: search,
    tags: filters.tags,
    symptoms: filters.symptoms,
    type: filters.type === '' ? undefined : filters.type,
    categories: filters.categories,
    minPrice: filters.price[0],
    maxPrice: filters.price[1],
    inStock: filters.inStock === 'all' ? undefined : filters.inStock,
    requiredPrescription:
      filters.requiredPrescription === 'all'
        ? undefined
        : filters.requiredPrescription,
    sortBy: filters.sortBy || undefined,
    sortOrder: filters.sortOrder || undefined,
    page,
    limit,
  };

  const { data, isLoading, error, refetch } =
    useGetAllMedicineQuery(queryParams);

  // reset page to 1 when filters change
  useEffect(() => {
    setPage(1);
    setAllMedicines([]);
    setHasMore(true);
  }, [search, filters]);

  // update medicine list when data changes
  useEffect(() => {
    if (data?.data) {
      if (page === 1) {
        setAllMedicines(data.data);
      } else {
        setAllMedicines((prev) => [...prev, ...data.data]);
      }

      const total = data.data.meta?.total || 0;
      const loadedCount =
        page === 1 ? data.data.length : allMedicines.length + data.data.length;
      setHasMore(loadedCount < total);
      setIsLoadingMore(false);
    }
  }, [data, page, allMedicines.length]);

  // intersection observer for infinite scrolling
  const lastMedicineRef = useCallback(
    (node: HTMLDivElement) => {
      if (isLoading) return;

      if (observer.current) observer.current.disconnect();

      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasMore && !isLoadingMore) {
          setIsLoadingMore(true);
          setPage((prevPage) => prevPage + 1);
        }
      });

      if (node) {
        observer.current.observe(node);
        lastMedicineElementRef.current = node;
      }
    },
    [isLoading, hasMore, isLoadingMore]
  );

  // reset filters
  const handleResetAllFilters = () => {
    dispatch(
      setFilters({
        searchTerm: '',
        tags: [],
        symptoms: [],
        inStock: 'all',
        requiredPrescription: 'all',
        price: [0, 1000],
        type: '',
        categories: [],
        sortBy: '',
        sortOrder: '',
      })
    );
  };

  if (error) {
    const safeError =
      error instanceof Error ? error : new Error('Unknown error');
    return (
      <div className="py-10 text-center text-red-500">
        <p>Something went wrong: {safeError.message}</p>
        <Button variant="outline" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  const activeFiltersCount = [
    !!filters.categories?.length,
    !!filters.symptoms?.length,
    !!filters.tags?.length,
    filters.inStock !== 'all',
    filters.requiredPrescription !== 'all',
    filters.price[0] > 0 || filters.price[1] < 1000,
    !!filters.type,
  ].filter(Boolean).length;

  return (
    <div className="container mx-auto p-4">
      {/* mbl drawer */}
      <div className="mb-4 flex md:hidden">
        <Drawer open={open} onOpenChange={setOpen}>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search{' '}
              {activeFiltersCount > 0 && `(${activeFiltersCount})`}
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters & Search</DrawerTitle>
              <DrawerDescription>
                Find the right medicine for your health
              </DrawerDescription>
            </DrawerHeader>
            <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
              <FilterSidebar />
            </div>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline">Close</Button>
              </DrawerClose>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      </div>

      <div className="flex flex-col gap-4 md:flex-row">
        {/* sidebar ==> lg  */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          <FilterSidebar />
        </div>

        {/* main  */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4">
            {search && (
              <div className="mb-2 rounded bg-blue-50 p-2 text-sm">
                <p>
                  Search results for: <strong>&quot;{search}&quot;</strong>
                </p>
              </div>
            )}

            {activeFiltersCount > 0 && (
              <div className="mb-2 flex items-center justify-between rounded bg-gray-100 p-2 text-sm">
                <p>
                  {data?.data?.meta?.total || 0} results found with current
                  filters
                </p>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={handleResetAllFilters}
                  className="text-xs"
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </div>

          {/* medicine  */}
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {isLoading && page === 1 ? (
              Array(4)
                .fill(0)
                .map((_, i) => (
                  <div
                    key={i}
                    className="h-64 animate-pulse rounded-lg bg-gray-200"
                  ></div>
                ))
            ) : allMedicines.length > 0 ? (
              allMedicines.map((medicine: IMedicine, index: number) => {
                // for the last item, attach the ref for infinite scrolling
                if (index === allMedicines.length - 1) {
                  return (
                    <div key={medicine._id || index} ref={lastMedicineRef}>
                      <MedicineCard medicine={medicine} />
                    </div>
                  );
                } else {
                  return (
                    <div key={`${medicine._id}-${index}`} ref={lastMedicineRef}>
                      <MedicineCard medicine={medicine} />
                    </div>
                  );
                }
              })
            ) : (
              // no results found
              <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
                <p className="mb-4">
                  No medicines found matching your criteria.
                </p>
                <Button variant="outline" onClick={handleResetAllFilters}>
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>

          {/* loading more indicator */}
          {isLoadingMore && (
            <div className="mt-6 flex justify-center">
              <div className="h-10 w-10 animate-spin rounded-full border-4 border-blue-200 border-t-blue-900"></div>
            </div>
          )}

          {/* end of results msg */}
          {!hasMore && allMedicines.length > 0 && (
            <div className="mt-6 text-center text-gray-500">
              <p>You have reached the end of results</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
