'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PackageCheck, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function AdminDashboard() {
  const [stockData, setStockData] = useState({
    totalStock: 0,
    lowStockItems: 0,
  });

  const [orderData, setOrderData] = useState({
    totalOrders: 0,
    percentageChange: 0,
  });

  const [prescriptionData, setPrescriptionData] = useState({
    pendingPrescriptions: 0,
    reviewRequired: 0,
  });

  useEffect(() => {
    // Fetch stock data from the backend
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stocks`
        );
        const data = await response.json();
        setStockData(data);
      } catch (error) {
        console.error('Error fetching stock data:', error);
      }
    };

    // Fetch order data (for Total Orders and percentage change)
    const fetchOrderData = async () => {
      try {
        const response = await fetch('/api/orders'); // Assuming you have an API for orders
        const data = await response.json();
        setOrderData({
          totalOrders: data.totalOrders,
          percentageChange: data.percentageChange, // Example: +10% from last week
        });
      } catch (error) {
        console.error('Error fetching order data:', error);
      }
    };

    // Fetch prescription data (for Pending Prescriptions)
    const fetchPrescriptionData = async () => {
      try {
        const response = await fetch('/api/prescriptions'); // Assuming you have an API for prescriptions
        const data = await response.json();
        setPrescriptionData({
          pendingPrescriptions: data.pendingPrescriptions,
          reviewRequired: data.reviewRequired,
        });
      } catch (error) {
        console.error('Error fetching prescription data:', error);
      }
    };

    // Call the fetch functions
    fetchStockData();
    fetchOrderData();
    fetchPrescriptionData();
  }, []);

  return (
    <div className="space-y-6 p-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
        {/* Total Orders */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
            <ClipboardList className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{orderData.totalOrders}</div>
            <p className="text-muted-foreground text-xs">
              {orderData.percentageChange}% from last week
            </p>
          </CardContent>
        </Card>

        {/* Stock Levels */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
            <PackageCheck className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stockData.totalStock} Items
            </div>
            <p className="text-muted-foreground text-xs">
              {stockData.lowStockItems} low-stock items
            </p>
          </CardContent>
        </Card>

        {/* Pending Prescriptions */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Pending Prescriptions
            </CardTitle>
            <BarChart3 className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {prescriptionData.pendingPrescriptions}
            </div>
            <p className="text-muted-foreground text-xs">
              {prescriptionData.reviewRequired} review required
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
