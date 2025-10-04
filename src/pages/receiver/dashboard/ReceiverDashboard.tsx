import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReceiverStatsQuery } from "@/redux/features/stats/stats.api";
import { Link } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, CheckCircle, Truck, MapPin } from "lucide-react";

const ReceiverDashboard = () => {
  const { data: stats, isLoading } = useGetReceiverStatsQuery();

  const statusCounts = stats?.data?.statusCounts || {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  const incomingParcels = [
    {
      id: 1,
      trackingId: "TRK123459",
      sender: "Alice Brown",
      status: "in-transit",
      estimatedDelivery: "2024-01-18",
      from: "789 Market St, City",
    },
    {
      id: 2,
      trackingId: "TRK123460",
      sender: "Bob Wilson",
      status: "pending",
      estimatedDelivery: "2024-01-20",
      from: "321 Elm St, Town",
    },
  ];

  const recentDeliveries = [
    {
      id: 1,
      trackingId: "TRK123458",
      sender: "Mike Johnson",
      deliveredAt: "2024-01-10",
      status: "delivered",
    },
    {
      id: 2,
      trackingId: "TRK123457",
      sender: "Sarah Smith",
      deliveredAt: "2024-01-08",
      status: "delivered",
    },
  ];

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <Skeleton className='h-10 w-64' />
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          {[...Array(3)].map((_, i) => (
            <Card key={i}>
              <CardContent className='p-6'>
                <Skeleton className='h-6 w-24 mb-2' />
                <Skeleton className='h-8 w-16' />
              </CardContent>
            </Card>
          ))}
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {[...Array(2)].map((_, i) => (
            <Card key={i}>
              <CardHeader>
                <Skeleton className='h-6 w-32' />
              </CardHeader>
              <CardContent>
                {[...Array(2)].map((_, j) => (
                  <Skeleton key={j} className='h-16 w-full mb-4' />
                ))}
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex justify-between items-center'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Receiver Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Track incoming parcels and manage deliveries
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
        <Card className='bg-gradient-to-r from-blue-50 to-blue-100 dark:from-blue-900/20 dark:to-blue-800/20 border-0'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                  Incoming
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                  {incomingParcels.length}
                </p>
              </div>
              <div className='w-12 h-12 bg-blue-100 dark:bg-blue-900/30 rounded-lg flex items-center justify-center'>
                <Package className='w-6 h-6 text-blue-600 dark:text-blue-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-r from-yellow-50 to-yellow-100 dark:from-yellow-900/20 dark:to-yellow-800/20 border-0'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                  In Transit
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                  {
                    incomingParcels.filter((p) => p.status === "in-transit")
                      .length
                  }
                </p>
              </div>
              <div className='w-12 h-12 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg flex items-center justify-center'>
                <Truck className='w-6 h-6 text-yellow-600 dark:text-yellow-400' />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className='bg-gradient-to-r from-green-50 to-green-100 dark:from-green-900/20 dark:to-green-800/20 border-0'>
          <CardContent className='p-6'>
            <div className='flex items-center justify-between'>
              <div>
                <p className='text-sm font-medium text-gray-600 dark:text-gray-300'>
                  Delivered
                </p>
                <p className='text-2xl font-bold text-gray-900 dark:text-white mt-1'>
                  {statusCounts.delivered}
                </p>
              </div>
              <div className='w-12 h-12 bg-green-100 dark:bg-green-900/30 rounded-lg flex items-center justify-center'>
                <CheckCircle className='w-6 h-6 text-green-600 dark:text-green-400' />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        {/* Incoming Parcels */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <MapPin className='w-5 h-5 mr-2' />
              Incoming Parcels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {incomingParcels.map((parcel) => (
                <div
                  key={parcel.id}
                  className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {parcel.trackingId}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      From: {parcel.sender}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Est: {parcel.estimatedDelivery}
                    </p>
                  </div>
                  <Button size='sm' variant='outline'>
                    Track
                  </Button>
                </div>
              ))}
            </div>
            <div className='mt-4 text-center'>
              <Button asChild variant='outline'>
                <Link to='/receiver/parcels'>View All Incoming</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <CheckCircle className='w-5 h-5 mr-2' />
              Recent Deliveries
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {recentDeliveries.map((delivery) => (
                <div
                  key={delivery.id}
                  className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {delivery.trackingId}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      From: {delivery.sender}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Delivered: {delivery.deliveredAt}
                    </p>
                  </div>
                  <span className='px-2 py-1 text-xs bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400 rounded-full'>
                    Delivered
                  </span>
                </div>
              ))}
            </div>
            <div className='mt-4 text-center'>
              <Button asChild variant='outline'>
                <Link to='/receiver/history'>View Full History</Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
