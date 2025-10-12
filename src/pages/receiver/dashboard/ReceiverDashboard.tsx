import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetReceiverStatsQuery } from "@/redux/features/stats/stats.api";
import { Link, useNavigate } from "react-router";
import { Skeleton } from "@/components/ui/skeleton";
import { Package, CheckCircle, Truck, MapPin, Eye } from "lucide-react";
import {
  useGetIncomingParcelsQuery,
  useGetReceiverParcelHistoryQuery,
} from "@/redux/features/parcel/parcel.api";
import { ParcelStatus } from "@/types/sender.parcel.type";

const ReceiverDashboard = () => {
  const navigate = useNavigate();

  const {
    data: statsData,
    isLoading,
    error: statsError,
  } = useGetReceiverStatsQuery();
  const currentQuery = {
    page: 1,
    limit: 2,
    sort: "-createdAt",
  };

  const {
    data: incomingParcelsData,
    isLoading: isLoadingIncomingParcels,
    isError: isErrorIncomingParcels,
    error: incomingParcelsError,
  } = useGetIncomingParcelsQuery({
    ...currentQuery,
  });
  const {
    data: deliveredParcels,
    isLoading: isLoadingDeliveredParcels,
    isError: isErrorDeliveredParcels,
    error: deliveredParcelsError,
  } = useGetReceiverParcelHistoryQuery({
    ...currentQuery,
    currentStatus: [ParcelStatus.DELIVERED],
  });

  const recentDeliveries = deliveredParcels?.data || [];

  const incomingParcels = incomingParcelsData?.data || [];

  const stats = statsData?.data || {
    pending: 0,
    processing: 0,
    shipped: 0,
    delivered: 0,
    cancelled: 0,
  };

  if (isLoading || isLoadingIncomingParcels || isLoadingDeliveredParcels) {
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

  if (statsError || isErrorIncomingParcels || isErrorDeliveredParcels) {
    return (
      <div className='space-y-6'>
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
        <Card className='border-red-200 dark:border-red-800 bg-red-50 dark:bg-red-900/20'>
          <CardContent className='p-6'>
            <p className='text-red-700 dark:text-red-300 font-medium'>
              Something went wrong while loading the dashboard.
            </p>
            <p className='text-sm text-red-600 dark:text-red-400 mt-1'>
              {statsError ? "Failed to load statistics. " : null}
              {incomingParcelsError
                ? `Incoming parcels: ${incomingParcelsError} `
                : null}
              {deliveredParcelsError
                ? `Delivery history: ${deliveredParcelsError}`
                : null}
            </p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      {/* Header */}
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
            Receiver Dashboard
          </h1>
          <p className='text-gray-600 dark:text-gray-400 mt-1'>
            Track incoming parcels and manage deliveries
          </p>
        </div>
        <Button asChild className='w-full sm:w-auto'>
          <Link
            to='/receiver/dashboard/incoming-parcels'
            className='flex items-center gap-2'>
            <Eye className='mr-1 h-4 w-4' /> View Incoming Parcels
          </Link>
        </Button>
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
                  {stats.totalIncomingParcels}
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
                  {stats.totalInTransitParcels}
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
                  {stats.totalDeliveredParcels}
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
        <Card className="bg-slate-800/40">
          <CardHeader>
            <CardTitle className='flex items-center'>
              <MapPin className='w-5 h-5 mr-2' />
              Incoming Parcels
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className='space-y-4'>
              {incomingParcels?.map((parcel) => (
                <div
                  key={parcel?._id}
                  className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {parcel.trackingId}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      From: {parcel?.sender?.name || "N/A"}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Est:{" "}
                      {parcel.estimatedDelivery
                        ? new Date(
                            parcel.estimatedDelivery
                          ).toLocaleDateString()
                        : "N/A"}
                    </p>
                  </div>
                  <Button
                    onClick={() =>
                      navigate(`/tracking?trackingId=${parcel.trackingId}`)
                    }
                    size='sm'
                    variant='outline'>
                    Track
                  </Button>
                </div>
              ))}
            </div>
            <div className='mt-4 text-center'>
              <Button asChild variant='outline'>
                <Link to='/receiver/dashboard/incoming-parcels'>
                  View All Incoming
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Deliveries */}
        <Card className="bg-slate-800/40">
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
                  key={delivery._id}
                  className='flex items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg'>
                  <div>
                    <p className='font-medium text-gray-900 dark:text-white'>
                      {delivery.trackingId}
                    </p>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      From: {delivery?.sender?.name || "N/A"}
                    </p>
                    <p className='text-xs text-gray-500 dark:text-gray-400'>
                      Delivered:{" "}
                      {delivery.deliveredAt
                        ? new Date(delivery.deliveredAt).toLocaleDateString()
                        : "N/A"}
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
                <Link to='/receiver/dashboard/delivery-history'>
                  View Full History
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ReceiverDashboard;
