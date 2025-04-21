export type MedicineType =
  | 'Tablet'
  | 'Syrup'
  | 'Injection'
  | 'Capsule'
  | 'Ointment'
  | 'Drops';

export type MedicineCategory =
  | 'Pain Relief'
  | 'Antibiotic'
  | 'Antiviral'
  | 'Antifungal'
  | 'Allergy'
  | 'Digestive'
  | 'Supplement'
  | 'Chronic Disease'
  | 'Emergency';

export interface IMedicine {
  _id?: string;
  name: string;
  description?: string;
  price: number;
  quantity: number;
  prescriptionFile: string | null;
  requiredPrescription: boolean;
  manufacturer: string;
  expiryDate: Date;
  type: MedicineType;
  categories: MedicineCategory[];
  symptoms?: string[];
  discount: number;
  imageUrl?: string;
  supplier?: string;
  inStock: boolean;
  isDeleted: boolean;
  sku?: string;
  tags?: string[];
  createdAt?: Date;
  updatedAt?: Date;
}

export interface GetAllMedicinesParams {
  searchTerm?: string;
  tags?: string[];
  symptoms?: string[];
  inStock?: boolean;
  requiredPrescription?: boolean;
  minPrice?: number;
  maxPrice?: number;
  type?: MedicineType;
  categories?: MedicineCategory[];
  page?: number; // optional now
  limit?: number;
  sortBy?: string | 'createdAt';
  sortOrder?: 'asc' | 'desc';
}
