export interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  quantity: number;
  prescriptionFile: string | null;
  requiredPrescription: boolean;
  manufacturer: string;
  expiryDate: string;
  type: string;
  categories: string[];
  symptoms: string[];
  discount: number;
  imageUrl: string;
  supplier: string;
  inStock: boolean;
  isDeleted: boolean;
  sku: string;
  tags: string[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}
