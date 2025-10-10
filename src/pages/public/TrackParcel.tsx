import React, { useState, useMemo, type FC, useEffect } from "react";
// ✅ Step 1: Import useSearchParams for both reading and writing to the URL
import { useSearchParams } from "react-router";
import { useLazyTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import { toast } from "sonner";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Package,
  Search,
  Truck,
  MapPin,
  Building,
  Check,
} from "lucide-react";

// ShadCN UI Components
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";
import { Role } from "@/types/user.type";

// TypeScript Interfaces
interface IStatusLog {
  status: string;
  location: string;
  note: string;
  updatedAt: string;
  updatedBy: { name: string; role: string };
}
interface IParcelTrackData {
  trackingId: string;
  currentStatus: string;
  estimatedDelivery: string;
  pickupAddress: string;
  deliveryAddress: string;
  deliveredAt: string | null;
  statusLog: IStatusLog[];
}

// Helper Functions
const getStatusIcon = (status: string): FC<{ className?: string }> => {
  switch (status) {
    case "delivered":
      return CheckCircle;
    case "dispatched":
    case "in-transit":
      return Truck;
    case "approved":
    case "picked":
      return Check;
    default:
      return Package;
  }
};
const formatDate = (dateString: string | null): string => {
  if (!dateString) return "Pending";
  return new Date(dateString).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
};

export default function TrackingPage() {
  const [trackingId, setTrackingId] = useState<string>("");
  // ✅ Step 2: Get both searchParams and setSearchParams from the hook
  const [searchParams, setSearchParams] = useSearchParams();

  const [
    trackParcel,
    { data: trackResult, isLoading, isFetching, isError, error },
  ] = useLazyTrackParcelQuery();

  const searchAttempted = trackResult !== undefined;

  const shipmentData = useMemo(() => {
    if (!trackResult?.success || !trackResult.data) return null;
    return trackResult.data as IParcelTrackData;
  }, [trackResult]);

  // ✅ Step 3: This useEffect is now the single source for triggering the API call
  useEffect(() => {
    // We use "id" as the URL parameter name, e.g., /track?id=TRK123
    const urlTrackingId = searchParams.get("trackingId");
    if (urlTrackingId) {
      setTrackingId(urlTrackingId); // Sync input field with URL
      trackParcel(urlTrackingId); // Automatically trigger the search
    }
  }, [searchParams, trackParcel]);

  // ✅ Step 4: The handleTrack function now only updates the URL search params
  const handleTrack = (e: React.FormEvent) => {
    e.preventDefault();
    const trimmedId = trackingId.trim();
    if (!trimmedId) {
      toast.warning("Please enter a tracking ID.");
      return;
    }
    // This will update the URL to /track?id=... and trigger the useEffect above
    setSearchParams({ trackingId: trimmedId });
  };

  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message ||
        "Parcel not found.";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  return (
    <div className='min-h-screen bg-slate-50 dark:bg-slate-950'>
      {/* Hero & Search Section */}
      <section className='py-20 bg-gradient-to-br from-slate-100 to-slate-200 dark:from-slate-900 dark:to-slate-800'>
        <div className='container mx-auto px-4 text-center max-w-3xl'>
          <div className='flex justify-center mb-4'>
            <div className='w-20 h-20 bg-white dark:bg-slate-950 rounded-2xl flex items-center justify-center shadow-md'>
              <Truck className='w-10 h-10 text-blue-600 dark:text-blue-400' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-4 text-slate-900 dark:text-white'>
            Track Your Shipment
          </h1>
          <p className='text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto'>
            Enter your tracking number to get real-time updates on your parcel's
            journey.
          </p>
          <Card className='mt-8 shadow-lg border-slate-200/50 dark:border-slate-800/50'>
            <CardContent className='p-6'>
              <form
                onSubmit={handleTrack}
                className='flex flex-col sm:flex-row gap-4'>
                <Input
                  id='trackingId'
                  type='text'
                  placeholder='e.g., TRK-2025...'
                  value={trackingId}
                  onChange={(e) => setTrackingId(e.target.value)}
                  className='flex-1 text-base py-6'
                />
                <Button
                  type='submit'
                  disabled={isLoading || isFetching}
                  className='py-6 px-8 text-base'>
                  {isLoading || isFetching ? (
                    <Loader2 className='w-5 h-5 mr-2 animate-spin' />
                  ) : (
                    <Search className='w-5 h-5 mr-2' />
                  )}{" "}
                  Track
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Results Section */}
      <section className='py-12'>
        <div className='container mx-auto px-4 max-w-4xl'>
          {(isLoading || isFetching) && (
            <div className='space-y-6'>
              <Skeleton className='h-48 w-full' />
              <Skeleton className='h-64 w-full' />
            </div>
          )}
          {!isLoading && !isFetching && shipmentData && (
            <div className='space-y-8 animate-in fade-in-50'>
              <Card className='overflow-hidden'>
                <CardHeader className='bg-slate-50 dark:bg-slate-800/50 p-6'>
                  <div className='flex flex-col md:flex-row md:items-start justify-between gap-4'>
                    <div>
                      <p className='text-sm text-muted-foreground'>
                        Tracking ID
                      </p>
                      <CardTitle className='font-mono'>
                        {shipmentData.trackingId}
                      </CardTitle>
                    </div>
                    <div className='flex items-center gap-2 text-right'>
                      <Clock className='w-5 h-5 text-muted-foreground flex-shrink-0' />
                      <div>
                        <p className='text-sm text-muted-foreground'>
                          Estimated Delivery
                        </p>
                        <p className='font-semibold text-slate-900 dark:text-white'>
                          {formatDate(shipmentData.estimatedDelivery)}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className='p-6 grid grid-cols-1 md:grid-cols-3 gap-6 items-center'>
                  <div className='flex items-center gap-4'>
                    <Building className='w-8 h-8 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-semibold'>Origin</p>
                      <p className='text-muted-foreground'>
                        {shipmentData.pickupAddress}
                      </p>
                    </div>
                  </div>
                  <div className='text-center'>
                    <Truck className='w-10 h-10 mx-auto text-blue-500' />
                    <Badge className='mt-2 capitalize'>
                      {shipmentData.currentStatus.replace(/_/g, " ")}
                    </Badge>
                  </div>
                  <div className='flex items-center gap-4 md:justify-end'>
                    <MapPin className='w-8 h-8 text-muted-foreground' />
                    <div>
                      <p className='text-sm font-semibold'>Destination</p>
                      <p className='text-muted-foreground'>
                        {shipmentData.deliveryAddress}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader>
                  <CardTitle>Tracking History</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className='relative space-y-8 pl-6'>
                    {shipmentData.statusLog?.map((event, index) => {
                      const Icon = getStatusIcon(event.status);
                      const isLast =
                        index === shipmentData.statusLog.length - 1;
                      return (
                        <div key={index} className='relative flex gap-6'>
                          {!isLast && (
                            <div className='absolute left-[19px] top-12 bottom-0 w-0.5 bg-slate-200 dark:bg-slate-700' />
                          )}
                          <div
                            className={cn(
                              "z-10 w-10 h-10 rounded-full flex items-center justify-center",
                              isLast
                                ? "bg-blue-600"
                                : "bg-slate-100 dark:bg-slate-800"
                            )}>
                            <Icon
                              className={cn(
                                "w-5 h-5",
                                isLast
                                  ? "text-white"
                                  : "text-slate-500 dark:text-slate-400"
                              )}
                            />
                          </div>
                          <div className='flex-1 pb-4'>
                            <p
                              className={cn(
                                "font-semibold capitalize",
                                isLast
                                  ? "text-slate-900 dark:text-white"
                                  : "text-muted-foreground"
                              )}>
                              {event.status.replace(/_/g, " ")}
                            </p>
                            <p className='text-sm text-muted-foreground'>
                              {event.note}
                            </p>
                            {event.location && (
                              <p className='text-sm text-muted-foreground mt-1 flex items-center gap-1.5'>
                                <MapPin className='w-3 h-3' /> {event.location}
                              </p>
                            )}
                            <p className='text-xs text-muted-foreground/80 mt-1'>
                              Updated by: {event.updatedBy?.name} (
                              {event?.updatedBy?.role === Role.SUPER_ADMIN
                                ? "ADMIN"
                                : event?.updatedBy?.role?.toUpperCase()}
                              )
                            </p>
                            <p className='text-xs text-muted-foreground/70 mt-1'>
                              {formatDate(event.updatedAt)}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </CardContent>
              </Card>
            </div>
          )}
          {!isLoading && !isFetching && !shipmentData && (
            <Card className='mt-8'>
              <CardContent className='p-8 text-center'>
                <AlertCircle className='w-12 h-12 text-muted-foreground mx-auto mb-4' />
                <h3 className='font-semibold text-lg text-slate-900 dark:text-white'>
                  {searchAttempted ? "Parcel Not Found" : "Ready to track?"}
                </h3>
                <p className='text-muted-foreground text-sm mt-2 max-w-md mx-auto'>
                  {searchAttempted
                    ? "Please double-check the tracking ID. If it's correct, the parcel may not be in our system yet."
                    : "Enter your tracking number above to see the status of your shipment."}
                </p>
              </CardContent>
            </Card>
          )}
        </div>
      </section>
    </div>
  );
}
