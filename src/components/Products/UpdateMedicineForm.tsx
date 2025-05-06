'use client';

import {
  useUpdateMedicineMutation,
  useGetSingleMedicineQuery,
} from '@/redux/api/productApi';
import type { IMedicine, MedicineCategory, MedicineType } from '@/types';
import type React from 'react';
import { useEffect, useState } from 'react';
import { Input } from '../ui/input';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '../ui/select';
import { Textarea } from '../ui/textarea';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Loader2 } from 'lucide-react';
import { useRouter, useParams } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

const UpdateMedicineForm = () => {
  const { id } = useParams<{ id: string }>();
  const router = useRouter();

  // fetch medicine
  const {
    data: singleMedicineData,
    isLoading: isLoadingMedicine,
    isError,
    error,
  } = useGetSingleMedicineQuery(id);
  const singleMedicine: IMedicine = singleMedicineData?.data;

  // update
  const [updateMedicine, { isLoading: isUpdating }] =
    useUpdateMedicineMutation();

  // form state
  const [formData, setFormData] = useState<IMedicine>({
    name: '',
    description: '',
    price: 0,
    quantity: 1,
    prescriptionFile: null,
    requiredPrescription: false,
    manufacturer: '',
    expiryDate: new Date(),
    type: 'Tablet',
    categories: [],
    symptoms: [],
    discount: 0,
    imageUrl: '',
    supplier: '',
    inStock: true,
    sku: '',
    tags: [],
    isDeleted: false,
  });

  // file input
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);

  // populate form when data is loaded
  useEffect(() => {
    if (singleMedicine) {
      setFormData({
        ...singleMedicine,
        expiryDate: new Date(singleMedicine.expiryDate),
      });

      // set preview URL from existing image if available
      if (singleMedicine.imageUrl) {
        setPreviewUrl(singleMedicine.imageUrl);
      }
    }
  }, [singleMedicine]);

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  // image file handler
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedImage(file);

      // preview URL
      const fileReader = new FileReader();
      fileReader.onload = () => {
        if (fileReader.readyState === 2) {
          setPreviewUrl(fileReader.result as string);
        }
      };
      fileReader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!id) {
      toast.error('No medicine ID found');
      return;
    }

    try {
      // create FormData object to send file
      const medicineData = new FormData();

      // add all text fields
      Object.keys(formData).forEach((key) => {
        const typedKey = key as keyof IMedicine;

        const value = formData[typedKey];

        if (typedKey !== 'imageUrl' && value !== null && value !== undefined) {
          if (Array.isArray(value)) {
            value.forEach((item: string) => {
              medicineData.append(`${typedKey}[]`, item);
            });
          } else if (typedKey === 'expiryDate' && value instanceof Date) {
            medicineData.append(typedKey, value.toISOString());
          } else {
            medicineData.append(typedKey, String(value));
          }
        }
      });

      // add image file if exists
      if (selectedImage) {
        medicineData.append('image', selectedImage);
      }

      const response = await updateMedicine({
        id,
        data: medicineData,
      }).unwrap();
      console.log('Success:', response);
      toast.success('Medicine updated successfully!');

      // navigate back after successful update
      setTimeout(() => {
        router.back();
      }, 1500);
    } catch (error: unknown) {
      console.error('Error:', error);

      let message = 'Unknown error';

      if (typeof error === 'object' && error !== null) {
        const maybeErr = error as {
          data?: { errorSources?: { message?: string }[] };
          message?: string;
        };

        message =
          maybeErr.data?.errorSources?.[0]?.message ||
          maybeErr.message ||
          message;
      }

      toast.error(`Error updating Medicine: ${message}`);
    }
  };

  // loading
  if (isLoadingMedicine) {
    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <Loader2 className="text-primary h-8 w-8 animate-spin" />
            <p>Loading medicine data...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  type CustomError = {
    data?: {
      message?: string;
    };
  };

  if (isError) {
    const customError = error as CustomError;

    return (
      <Card className="mx-auto max-w-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col items-center justify-center space-y-4 py-12">
            <h2 className="text-xl font-bold text-red-500">
              Error Loading Medicine
            </h2>
            <p>
              {customError?.data?.message || 'Failed to load medicine data'}
            </p>
            <Button onClick={() => router.back()}>Go Back</Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Update Medicine</h2>

      <div>
        <Button onClick={() => router.back()} type="button">
          Back to Previous Page
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Medicine Name</Label>
          <Input
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Medicine 5000mm"
            required
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="manufacturer">Manufacturer</Label>
          <Input
            id="manufacturer"
            name="manufacturer"
            value={formData.manufacturer}
            onChange={handleChange}
            placeholder="Pharma Inc."
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label>Prescription Required</Label>
          <select
            name="requiredPrescription"
            value={formData.requiredPrescription ? 'yes' : 'no'}
            onChange={(e) =>
              setFormData({
                ...formData,
                requiredPrescription: e.target.value === 'yes',
              })
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="no">No</option>
            <option value="yes">Yes</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="price">Price ($)</Label>
          <Input
            id="price"
            name="price"
            type="number"
            min="0"
            step="0.01"
            value={formData.price}
            onChange={handleChange}
            placeholder="499.99"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="quantity">Quantity</Label>
          <Input
            id="quantity"
            name="quantity"
            type="number"
            min="0"
            value={formData.quantity}
            onChange={handleChange}
            placeholder="10"
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="discount">Discount (%)</Label>
          <Input
            id="discount"
            name="discount"
            type="number"
            value={formData.discount}
            onChange={handleChange}
            min="0"
            max="100"
            step="1"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="sku">SKU</Label>
          <Input
            id="sku"
            name="sku"
            value={formData.sku}
            onChange={handleChange}
            placeholder="MED12345"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="tags">Tags (comma-separated)</Label>
          <Input
            id="tags"
            name="tags"
            value={formData.tags?.join(', ') || ''}
            onChange={(e) =>
              setFormData({
                ...formData,
                tags: e.target.value.split(',').map((tag) => tag.trim()),
              })
            }
            placeholder="painkiller, fever, adult"
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="type">Medicine Type</Label>
          <Select
            value={formData.type}
            onValueChange={(value) =>
              setFormData({ ...formData, type: value as MedicineType })
            }
          >
            <SelectTrigger id="type" className="w-full">
              <SelectValue placeholder="Select type" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Tablet">Tablet</SelectItem>
              <SelectItem value="Syrup">Syrup</SelectItem>
              <SelectItem value="Injection">Injection</SelectItem>
              <SelectItem value="Capsule">Capsule</SelectItem>
              <SelectItem value="Ointment">Ointment</SelectItem>
              <SelectItem value="Drops">Drops</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="expiryDate">Expiry Date</Label>
          <Input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={formData.expiryDate?.toISOString().split('T')[0] || ''}
            onChange={(e) =>
              setFormData({ ...formData, expiryDate: new Date(e.target.value) })
            }
            required
            className="w-full"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="supplier">Supplier</Label>
          <Input
            id="supplier"
            name="supplier"
            value={formData.supplier || ''}
            onChange={handleChange}
            placeholder="Global Pharma Supplier"
            className="w-full"
          />
        </div>
        <div className="space-y-2">
          <Label>In Stock</Label>
          <select
            name="inStock"
            value={formData.inStock ? 'yes' : 'no'}
            onChange={(e) =>
              setFormData({
                ...formData,
                inStock: e.target.value === 'yes',
              })
            }
            className="w-full rounded border px-3 py-2"
          >
            <option value="yes">Yes</option>
            <option value="no">No</option>
          </select>
        </div>
      </div>
      <div className="space-y-2">
        <Label htmlFor="categories">Categories (multi)</Label>
        <select
          multiple
          id="categories"
          name="categories"
          value={formData.categories}
          onChange={(e) =>
            setFormData({
              ...formData,
              categories: Array.from(
                e.target.selectedOptions,
                (option) => option.value as MedicineCategory
              ),
            })
          }
          className="w-full rounded border px-3 py-2"
        >
          {[
            'Pain Relief',
            'Antibiotic',
            'Antiviral',
            'Antifungal',
            'Allergy',
            'Digestive',
            'Supplement',
            'Chronic Disease',
            'Emergency',
          ].map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Medicine Image</Label>
        <Input
          id="image"
          name="image"
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="w-full"
        />
        <p className="text-muted-foreground text-xs">
          {formData.imageUrl
            ? 'Current image will be used if no new image is selected'
            : ''}
        </p>
      </div>

      {/* Image preview */}
      {previewUrl && (
        <div className="space-y-2">
          <Label htmlFor="preview">Image Preview</Label>
          <div className="relative h-64 w-full overflow-hidden rounded-lg border">
            <Image
              src={previewUrl || '/placeholder.svg'}
              alt="Medicine Preview"
              fill
              style={{ objectFit: 'contain' }}
              className="p-2"
            />
          </div>
        </div>
      )}

      <div className="space-y-2 md:col-span-2">
        <Label htmlFor="symptoms">Symptoms (comma-separated)</Label>
        <Input
          id="symptoms"
          name="symptoms"
          value={formData.symptoms?.join(', ') || ''}
          onChange={(e) =>
            setFormData({
              ...formData,
              symptoms: e.target.value.split(',').map((s) => s.trim()),
            })
          }
          placeholder="headache, fever, sore throat"
          className="w-full"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          placeholder="Detailed description of the Medicine"
          className="min-h-24 w-full"
        />
      </div>

      <div className="flex justify-center pt-4">
        <Button
          type="submit"
          className="w-full bg-cyan-600 py-2 font-medium text-white hover:bg-cyan-700 md:w-64"
          disabled={isUpdating}
        >
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Updating Medicine...
            </>
          ) : (
            'Update Medicine'
          )}
        </Button>
      </div>
    </form>
  );
};

export default UpdateMedicineForm;
