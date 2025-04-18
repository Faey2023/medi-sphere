// app/admin/page.tsx
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { BarChart3, PackageCheck, ClipboardList } from 'lucide-react';

export default function AdminDashboard() {
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
            <div className="text-2xl font-bold">1,245</div>
            <p className="text-muted-foreground text-xs">+10% from last week</p>
          </CardContent>
        </Card>

        {/* Stock Levels */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Stock Levels</CardTitle>
            <PackageCheck className="text-muted-foreground h-5 w-5" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">362 Items</div>
            <p className="text-muted-foreground text-xs">15 low-stock items</p>
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
            <div className="text-2xl font-bold">58</div>
            <p className="text-muted-foreground text-xs">Review required</p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
