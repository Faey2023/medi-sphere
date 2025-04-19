'use client';

import FilterSidebar from '@/components/Filter/FilterSidebar';
// import SearchBar from "@/components/Search/SearchBar";
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
import { Menu } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
// import { useEffect, useState } from 'react';
import { IMedicine } from '@/types';
import MedicineCard from './MedicineCard';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
// import MedicineCard from "@/components/Medicine/MedicineCard";

export default function AllMedicines() {
  // const [medicines, setMedicines] = useState<{ data: IMedicine[] } | null>(
  //   null
  // );
  // const [loading, setLoading] = useState(true);

  const { data } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });
  // console.log("data from", data)
  // useEffect(() => {
  //   const fetchMedicines = async () => {
  //     try {
  //       const res = await fetch('http://localhost:5000/api/medicines');
  //       const data = await res.json();
  //       setMedicines(data);
  //     } catch (err) {
  //       console.error('Failed to fetch medicines:', err);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };

  //   fetchMedicines();
  // }, []);

  // if (loading) return <p className="text-center">Loading...</p>;
  const medicineData: IMedicine[] = data?.data;

  return (
    <div className="container mx-auto bg-[#f2f3f5] p-4">
      {/* Mobile Drawer */}
      <div className="mb-4 flex md:hidden">
        <Drawer>
          <DrawerTrigger asChild>
            <Button variant="outline" className="w-full">
              <Menu className="mr-2 h-4 w-4" />
              Filters & Search
            </Button>
          </DrawerTrigger>
          <DrawerContent>
            <DrawerHeader>
              <DrawerTitle>Filters & Search</DrawerTitle>
              <DrawerDescription>
                Find the perfect medicine for your needs
              </DrawerDescription>
            </DrawerHeader>
            <div className="max-h-[60vh] overflow-y-auto px-4 pb-4">
              {/* <SearchBar /> */}
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
        {/* Sidebar */}
        <div className="hidden md:block md:w-1/4 lg:w-1/5">
          {/* <SearchBar /> */}
          <FilterSidebar />
        </div>

        {/* Main Content */}
        <div className="w-full md:w-3/4 lg:w-4/5">
          <div className="mb-4 flex flex-col items-center justify-between md:flex-row">
            <p>Total products: {medicineData?.length}</p>
            <Select>
              <SelectTrigger className="w-[300px]">
                <SelectValue placeholder="Default Sorting" />
              </SelectTrigger>
              <SelectContent>
                <SelectGroup>
                  <SelectLabel>Sort</SelectLabel>
                  <SelectItem value="popularity">Sort by popularity</SelectItem>
                  <SelectItem value="rating">Sort by average rating</SelectItem>
                  <SelectItem value="latest">Sort by latest</SelectItem>
                  <SelectItem value="low-high">
                    Sort by price: low to high
                  </SelectItem>
                  <SelectItem value="high-low">
                    Sort by price: high to low
                  </SelectItem>
                </SelectGroup>
              </SelectContent>
            </Select>
          </div>

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4">
            {medicineData?.length > 0 ? (
              medicineData?.map((medicine: IMedicine) => (
                <MedicineCard key={medicine._id} medicine={medicine} />
              ))
            ) : (
              <div className="col-span-full flex flex-col items-center py-10 text-center text-gray-500">
                <p className="mb-4">
                  No medicines found matching your criteria.
                </p>
                <Button
                  variant="outline"
                  onClick={() => window.location.reload()}
                >
                  Reset All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
