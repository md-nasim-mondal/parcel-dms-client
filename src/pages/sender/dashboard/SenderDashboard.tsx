import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetSenderStatsQuery } from "@/redux/features/stats/stats.api";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Plus,
} from "lucide-react";
import { BarChart, PieChart } from "recharts";

const SenderDashboard = () => {
  const { data: stats, isLoading } = useGetSenderStatsQuery();

  const statusCounts = stats?.data?.statusCounts || {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  const totalParcels = Object.values(statusCounts).reduce(
    (acc: number, curr) => acc + (curr as number),
    0
  );

  const chartData = [
    { name: "Pending", value: statusCounts.pending },
    { name: "Processing", value: statusCounts.processing },
    { name: "Shipped", value: statusCounts.shipped },
    { name: "Delivered", value: statusCounts.delivered },
    { name: "Cancelled", value: statusCounts.cancelled },
  ];

  const monthlyData = stats?.data?.monthlyParcels || [];

  return (
    <div className='space-y-6'>
      <div className='flex items-center justify-between'>
        <div className='flex items-center gap-2'>
          <div className='p-2 bg-blue-100 rounded-lg dark:bg-blue-900'>
            <Package className='h-6 w-6 text-blue-600 dark:text-blue-400' />
          </div>
          <h2 className='text-3xl font-bold tracking-tight'>
            Sender Dashboard
          </h2>
        </div>
        <Button asChild>
          <Link to='/sender/parcels/create'>
            <Plus className='mr-2 h-4 w-4' /> Create New Parcel
          </Link>
        </Button>
      </div>

      {/* Stats Cards */}
      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        {isLoading ? (
          <>
            <Skeleton className='h-32' />
            <Skeleton className='h-32' />
            <Skeleton className='h-32' />
            <Skeleton className='h-32' />
          </>
        ) : (
          <>
            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  Total Parcels
                </CardTitle>
                <Package className='h-4 w-4 text-muted-foreground' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{totalParcels}</div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>
                  In Transit
                </CardTitle>
                <Truck className='h-4 w-4 text-blue-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {statusCounts.processing + statusCounts.shipped}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Delivered</CardTitle>
                <CheckCircle className='h-4 w-4 text-green-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>
                  {statusCounts.delivered}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
                <CardTitle className='text-sm font-medium'>Pending</CardTitle>
                <Clock className='h-4 w-4 text-yellow-500' />
              </CardHeader>
              <CardContent>
                <div className='text-2xl font-bold'>{statusCounts.pending}</div>
              </CardContent>
            </Card>
          </>
        )}
      </div>

      {/* Charts */}
      <div className='grid gap-4 md:grid-cols-2'>
        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Parcel Status Distribution</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            {isLoading ? (
              <Skeleton className='h-80' />
            ) : (
              <PieChart data={chartData} />
            )}
          </CardContent>
        </Card>

        <Card className='col-span-1'>
          <CardHeader>
            <CardTitle>Monthly Shipments</CardTitle>
          </CardHeader>
          <CardContent className='pl-2'>
            {isLoading ? (
              <Skeleton className='h-80' />
            ) : (
              <BarChart data={monthlyData} />
            )}
          </CardContent>
        </Card>
      </div>

      {/* Recent Parcels */}
      <Card>
        <CardHeader className='flex flex-row items-center justify-between'>
          <CardTitle>Recent Parcels</CardTitle>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='space-y-2'>
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
              <Skeleton className='h-10 w-full' />
            </div>
          ) : (
            <div className='text-center py-4'>
              <Button asChild>
                <Link to='/sender/parcels'>View All Parcels</Link>
              </Button>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default SenderDashboard;
