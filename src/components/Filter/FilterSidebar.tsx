'use client';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import './filter.css';
// import {
//     DropdownMenu,
//     DropdownMenuContent,
//     DropdownMenuItem,
//     DropdownMenuTrigger,
//   } from '../ui/dropdown-menu';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { setFilters } from '@/redux/features/productSlice';
import { IMedicine } from '@/types';

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.medicines);

  const [priceRange, setPriceRange] = useState<[number, number]>(filters.price);

  const { data: medicines, isLoading } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  if (isLoading) {
    return <span>Loading...</span>;
  }
  const medicinesData = medicines?.data;

  // Price slider
  const handleSliderChange = (value: [number, number]) => {
    setPriceRange(value);
    dispatch(setFilters({ price: value }));
  };

  // price inputs
  const handleInputChange = (index: number, value: number) => {
    const newRange: [number, number] = [...priceRange];
    newRange[index] = value;
    setPriceRange(newRange);
    dispatch(setFilters({ price: newRange }));
  };

  const categories = [
    'Pain Relief',
    'Antibiotic',
    'Antiviral',
    'Antifungal',
    'Allergy',
    'Digestive',
    'Supplement',
    'Chronic Disease',
    'Emergency',
  ];

  const types = [
    'Tablet',
    'Syrup',
    'Injection',
    'Capsule',
    'Ointment',
    'Drops',
  ];

  console.log('medicines?.data?.categories: ', medicinesData);
  const allTags = medicinesData.flatMap(
    (med: IMedicine) => med.tags ?? []
  ) as string[];
  const uniqueTags = Array.from(new Set(allTags));

  const allSymptoms = medicinesData.flatMap(
    (med: IMedicine) => med.symptoms ?? []
  ) as string[];
  const uniqueSymptoms = Array.from(new Set(allSymptoms));

  console.log(uniqueTags);

  return (
    <div className="mt-4 space-y-4">
      {/* reset filters btn */}
      <Button
        variant="outline"
        //   onClick={handleResetFilters}
        className="mb-2 w-full"
      >
        Reset All Filters
      </Button>
      {/* Category filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Category</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            {categories.map((category, i) => (
              <p
                className="flex items-center gap-1 text-sm font-medium"
                key={i}
              >
                <span>
                  <ChevronRight className="text-[2px]" />
                </span>{' '}
                {category}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Category filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Type</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            {types?.map((type, i) => (
              <p
                className="flex items-center gap-1 text-sm font-medium"
                key={i}
              >
                <span>
                  <ChevronRight className="text-[2px]" />
                </span>{' '}
                {type}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* price filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Filter</h3>
          <Separator></Separator>
          <Slider
            min={0}
            max={10000}
            step={100}
            value={priceRange}
            onValueChange={handleSliderChange}
          />

          <div className="flex h-full w-full flex-col gap-2 lg:flex-row">
            <input
              type="number"
              min={0}
              value={priceRange[0]}
              max={priceRange[1]}
              onChange={(e) => handleInputChange(0, Number(e.target.value))}
              placeholder="Min Price"
              className="w-full rounded border p-2"
            />
            <input
              type="number"
              value={priceRange[1]}
              min={priceRange[0]}
              onChange={(e) => handleInputChange(1, Number(e.target.value))}
              max={10000}
              placeholder="Max Price"
              className="w-full rounded border p-2"
            />
          </div>

          <p className="text-sm text-gray-500">
            Price: <strong>${priceRange[0]}</strong> –{' '}
            <strong>${priceRange[1]}</strong>
          </p>
        </CardContent>
      </Card>

      {/* Required Prescription Filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Required Prescription</h3>
          <Separator />
          <div className="flex h-full w-full flex-col gap-2">
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="prescription-required"
                // checked={requiredPrescription === true}
                // onCheckedChange={() => handlePrescriptionChange(true)}
              />
              <label
                htmlFor="prescription-required"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Required
              </label>
            </div>
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="no-prescription"
                // checked={requiredPrescription === false}
                // onCheckedChange={() => handlePrescriptionChange(false)}
              />
              <label
                htmlFor="no-prescription"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Not Required
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* availability filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Availability</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="instock"
                // checked={inStock === true}
                // onCheckedChange={() => handleAvailabilityChange(true)}
              />
              <label
                htmlFor="instock"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                In Stock
              </label>
            </div>
            <div className="flex w-full items-center gap-1">
              <Checkbox
                id="outofstock"
                // checked={inStock === false}
                // onCheckedChange={() => handleAvailabilityChange(false)}
              />
              <label
                htmlFor="outofstock"
                className="text-sm leading-none font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Out of Stock
              </label>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* symptoms filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Symptoms</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            {uniqueSymptoms?.map((symptom, i) => (
              <p
                className="custom-border flex items-center rounded-full px-3 text-black hover:bg-teal-400 hover:text-white"
                key={i}
              >
                {symptom}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Product tags */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Product tags</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-row flex-wrap gap-2">
            {uniqueTags?.map((tag, i) => (
              <p
                className="custom-border flex items-center rounded-full px-3 text-black hover:bg-teal-400 hover:text-white"
                key={i}
              >
                {tag}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
