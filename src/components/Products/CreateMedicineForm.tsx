'use client';

import { useAddMedicineMutation } from '@/redux/api/productApi';
import { IMedicine, MedicineCategory, MedicineType } from '@/types';
import React, { useState } from 'react';
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
import { useRouter } from 'next/navigation';
import { toast } from 'react-toastify';
import Image from 'next/image';

const CreateMedicineForm = () => {
  const navigate = useRouter();
  const [addMedicine, { isLoading }] = useAddMedicineMutation();
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

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >
  ) => {
    const value =
      e.target.type === 'number' ? Number(e.target.value) : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await addMedicine(formData).unwrap();
      console.log('Success:', response);
      toast.success('Medicine added successfully!');

      // reset form after successful submission
      setFormData({
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
    } catch (error) {
      const err = error as {
        data?: {
          errorSources?: { message?: string }[];
        };
      };

      const message = err.data?.errorSources?.[0]?.message || 'Unknown error';

      console.error('Error:', err);
      toast.error(`Error adding Medicine: ${message}`);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="mx-auto max-w-2xl space-y-4 rounded-lg bg-white p-6 shadow-md"
    >
      <h2 className="mb-6 text-center text-2xl font-bold">Add New Medicine</h2>
      {/* !important */}
      <div>
        <Button onClick={() => navigate.back()}>Back to Previous Page</Button>
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
        <Label htmlFor="imageUrl">Image URL</Label>
        <Input
          id="imageUrl"
          name="imageUrl"
          value={formData.imageUrl}
          onChange={handleChange}
          placeholder="https://example.com/image.jpg"
          required
          className="w-full"
        />
      </div>
      {formData.imageUrl && (
        <div className="space-y-2">
          <Label htmlFor="imageUrl">Image Preview</Label>
          <Image
            src={formData.imageUrl || '/placeholder.png'}
            alt="image preview"
            width={400}
            height={300}
            className="h-auto w-full rounded-lg border"
          />
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
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2"></div>

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
          className="w-full bg-blue-600 py-2 font-medium text-white hover:bg-blue-700 md:w-64"
          disabled={isLoading}
        >
          {isLoading ? (
            <>
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              Adding Medicine...
            </>
          ) : (
            'Add Medicine'
          )}
        </Button>
      </div>
    </form>
  );
};

export default CreateMedicineForm;
