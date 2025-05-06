'use client';

import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Slider } from '../ui/slider';
import './filter.css';
import { Checkbox } from '../ui/checkbox';
import { Separator } from '../ui/separator';
import { useGetAllMedicineQuery } from '@/redux/api/productApi';
import { useState, useEffect } from 'react';
import { useAppDispatch, useAppSelector } from '@/redux/hook';
import { resetFilters, setFilters } from '@/redux/features/productSlice';
import { IMedicine, MedicineCategory, MedicineType } from '@/types';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';

export default function FilterSidebar() {
  const dispatch = useAppDispatch();
  const { filters } = useAppSelector((state) => state.medicines);

  const [priceRange, setPriceRange] = useState<[number, number]>(filters.price);
  const [requiredPrescription, setRequiredPrescription] = useState<
    boolean | 'all'
  >(filters.requiredPrescription || 'all');
  const [inStock, setInStock] = useState<boolean | 'all'>(
    filters.inStock || 'all'
  );
  const [selectedCategories, setSelectedCategories] = useState<
    MedicineCategory[]
  >(filters.categories || []);
  const [selectedType, setSelectedType] = useState<MedicineType | ''>(
    filters.type || ''
  );
  const [selectedTags, setSelectedTags] = useState<string[]>(
    filters.tags || []
  );
  const [selectedSymptoms, setSelectedSymptoms] = useState<string[]>(
    filters.symptoms || []
  );

  const { data: medicines, isLoading } = useGetAllMedicineQuery(undefined, {
    pollingInterval: 30000,
    refetchOnFocus: true,
    refetchOnMountOrArgChange: true,
    refetchOnReconnect: true,
  });

  useEffect(() => {
    // sync local and redux state
    setPriceRange(filters.price);
    setRequiredPrescription(filters.requiredPrescription || 'all');
    setInStock(filters.inStock || 'all');
    setSelectedCategories(filters.categories || []);
    setSelectedType(filters.type || '');
    setSelectedTags(filters.tags || []);
    setSelectedSymptoms(filters.symptoms || []);
  }, [filters]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  const medicinesData = medicines?.data?.data || [];

  // reset all filters
  const handleResetFilters = () => {
    dispatch(resetFilters());
  };

  // price slider
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

  // category filter
  const handleCategoryChange = (category: MedicineCategory) => {
    let updatedCategories;
    if (selectedCategories.includes(category)) {
      updatedCategories = selectedCategories.filter((c) => c !== category);
    } else {
      updatedCategories = [...selectedCategories, category];
    }
    setSelectedCategories(updatedCategories);
    dispatch(setFilters({ categories: updatedCategories }));
  };

  // type filter
  const handleTypeChange = (type: MedicineType) => {
    const newType = selectedType === type ? '' : type;
    setSelectedType(newType);
    dispatch(setFilters({ type: newType }));
  };

  // prescription filter
  const handlePrescriptionChange = (value: boolean | 'all') => {
    setRequiredPrescription(value);
    dispatch(setFilters({ requiredPrescription: value }));
  };

  // availability filter
  const handleAvailabilityChange = (value: boolean | 'all') => {
    setInStock(value);
    dispatch(setFilters({ inStock: value }));
  };

  // tags filter
  const handleTagChange = (tag: string) => {
    let updatedTags;
    if (selectedTags.includes(tag)) {
      updatedTags = selectedTags.filter((t) => t !== tag);
    } else {
      updatedTags = [...selectedTags, tag];
    }
    setSelectedTags(updatedTags);
    dispatch(setFilters({ tags: updatedTags }));
  };

  // symptoms filter
  const handleSymptomChange = (symptom: string) => {
    let updatedSymptoms;
    if (selectedSymptoms.includes(symptom)) {
      updatedSymptoms = selectedSymptoms.filter((s) => s !== symptom);
    } else {
      updatedSymptoms = [...selectedSymptoms, symptom];
    }
    setSelectedSymptoms(updatedSymptoms);
    dispatch(setFilters({ symptoms: updatedSymptoms }));
  };

  const categories: MedicineCategory[] = [
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

  const types: MedicineType[] = [
    'Tablet',
    'Syrup',
    'Injection',
    'Capsule',
    'Ointment',
    'Moisturizer',
    'Drops',
  ];

  // extract unique tags and symptoms
  const allTags = medicinesData.flatMap(
    (med: IMedicine) => med.tags ?? []
  ) as string[];
  const uniqueTags = Array.from(new Set(allTags));

  const allSymptoms = medicinesData.flatMap(
    (med: IMedicine) => med.symptoms ?? []
  ) as string[];
  const uniqueSymptoms = Array.from(new Set(allSymptoms));

  return (
    <div className="mt-4 space-y-4">
      {/* reset filters btn */}
      <Button
        variant="outline"
        onClick={handleResetFilters}
        className="mb-2 w-full"
      >
        Reset All Filters
      </Button>

      {/* sorting */}
      <Card className="w-full rounded-2xl p-4 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Sort by Price</h3>
          <DropdownMenu>
            <DropdownMenuTrigger className="cursor-pointer">
              Sort
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              <DropdownMenuItem
                onClick={() =>
                  dispatch(setFilters({ sortBy: 'price', sortOrder: 'desc' }))
                }
              >
                High to low
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  dispatch(setFilters({ sortBy: 'price', sortOrder: 'asc' }))
                }
              >
                Low to high
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() =>
                  dispatch(setFilters({ sortBy: '', sortOrder: '' }))
                }
              >
                Default
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </CardContent>
      </Card>

      {/* category filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Category</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            {categories.map((category, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox
                  id={`category-${i}`}
                  checked={selectedCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                />
                <label
                  htmlFor={`category-${i}`}
                  className="flex cursor-pointer items-center gap-1 text-sm font-medium"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* type filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Type</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-col gap-2">
            {types.map((type, i) => (
              <div key={i} className="flex items-center gap-2">
                <Checkbox
                  id={`type-${i}`}
                  checked={selectedType === type}
                  onCheckedChange={() => handleTypeChange(type)}
                />
                <label
                  htmlFor={`type-${i}`}
                  className="flex cursor-pointer items-center gap-1 text-sm font-medium"
                >
                  {type}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* price filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Price Range</h3>
          <Separator></Separator>
          <Slider
            min={0}
            max={1000}
            step={10}
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
              max={1000}
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

      {/* required prescription Filter */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Required Prescription</h3>
          <Separator />
          <div className="flex h-full w-full flex-col gap-2">
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="prescription-all"
                checked={requiredPrescription === 'all'}
                onCheckedChange={() => handlePrescriptionChange('all')}
              />
              <label
                htmlFor="prescription-all"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                All
              </label>
            </div>
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="prescription-required"
                checked={requiredPrescription === true}
                onCheckedChange={() => handlePrescriptionChange(true)}
              />
              <label
                htmlFor="prescription-required"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                Required
              </label>
            </div>
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="no-prescription"
                checked={requiredPrescription === false}
                onCheckedChange={() => handlePrescriptionChange(false)}
              />
              <label
                htmlFor="no-prescription"
                className="cursor-pointer text-sm leading-none font-medium"
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
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="availability-all"
                checked={inStock === 'all'}
                onCheckedChange={() => handleAvailabilityChange('all')}
              />
              <label
                htmlFor="availability-all"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                All
              </label>
            </div>
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="instock"
                checked={inStock === true}
                onCheckedChange={() => handleAvailabilityChange(true)}
              />
              <label
                htmlFor="instock"
                className="cursor-pointer text-sm leading-none font-medium"
              >
                In Stock
              </label>
            </div>
            <div className="flex w-full items-center gap-2">
              <Checkbox
                id="outofstock"
                checked={inStock === false}
                onCheckedChange={() => handleAvailabilityChange(false)}
              />
              <label
                htmlFor="outofstock"
                className="cursor-pointer text-sm leading-none font-medium"
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
                key={i}
                className={`custom-border flex cursor-pointer items-center rounded-full px-3 text-black ${
                  selectedSymptoms.includes(symptom)
                    ? 'bg-teal-400 text-white'
                    : ''
                }`}
                onClick={() => handleSymptomChange(symptom)}
              >
                {symptom}
              </p>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* product tags */}
      <Card className="w-full rounded-2xl p-3 shadow-md">
        <CardContent className="space-y-4">
          <h3 className="text-xl font-bold">Product tags</h3>
          <Separator></Separator>
          <div className="flex h-full w-full flex-row flex-wrap gap-2">
            {uniqueTags?.map((tag, i) => (
              <p
                key={i}
                className={`custom-border flex cursor-pointer items-center rounded-full px-3 text-black ${
                  selectedTags.includes(tag) ? 'bg-teal-400 text-white' : ''
                }`}
                onClick={() => handleTagChange(tag)}
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
