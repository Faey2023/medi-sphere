'use client';

import { useGetAllOrderQuery } from '@/redux/features/orders/orderApi';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PackageCheck, ClipboardList } from 'lucide-react';
import { useState, useEffect } from 'react';
import Spinner from '@/components/shared/Spinner';

export default function AdminDashboard() {
  const { data: order = [], isLoading } = useGetAllOrderQuery({});  // Fetch all orders
  const orderData = order?.data;

  const [stockData, setStockData] = useState({
    totalStock: 0,
    lowStockItems: 0,
  });

  const [prescriptionData, setPrescriptionData] = useState({
    pendingPrescriptions: 0,
    reviewRequired: 0,
  });

  // Function to fetch stock data
  const fetchStockData = async () => {
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/stocks`
      );
      const data = await response.json();
      setStockData(data);
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // console.error('Error fetching stock data:', error);
    }
  };

  // Function to fetch prescription data
  const fetchPrescriptionData = async () => {
    try {
      const response = await fetch('/api/prescriptions');
      const data = await response.json();
      setPrescriptionData({
        pendingPrescriptions: data.pendingPrescriptions,
        reviewRequired: data.reviewRequired,
      });
    } catch (error) {
      console.error('Error fetching prescription data:', error);
    }
  };

  // Poll data every 5 seconds
  useEffect(() => {
    fetchStockData();
    fetchPrescriptionData();

    const interval = setInterval(() => {
      fetchStockData();
      fetchPrescriptionData();
    }, 5000); // Re-fetch every 5 seconds

    return () => clearInterval(interval); // Cleanup on unmount
  }, []);

  return isLoading ? (
    <div><Spinner /></div>  // Show loading if the data is being fetched
  ) : (
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
            <div className="text-2xl font-bold">{orderData?.length}</div>  {/* Total Orders */}
            <p className="text-muted-foreground text-xs">
              {/* Example: You can calculate the percentage change here if needed */}
              {/* {orderData.percentageChange}% from last week */}
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
