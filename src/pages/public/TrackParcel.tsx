// src/pages/TrackingPage.tsx
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { useLazyTrackParcelQuery } from "@/redux/features/parcel/parcel.api";
import {
  AlertCircle,
  CheckCircle,
  Clock,
  Loader2,
  Package,
  Search,
  Truck,
  type LucideIcon,
} from "lucide-react";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";

// TypeScript interfaces (API response অনুযায়ী)
export interface TimelineEvent {
  id: string;
  status: string;
  description: string;
  location: string;
  timestamp: string | null;
  completed: boolean;
}

export interface ShipmentData {
  trackingId: string;
  status: string;
  statusText: string;
  estimatedDelivery: string;
  origin: string;
  destination: string;
  sender: string;
  receiver: string;
  weight: string;
  dimensions: string;
  timeline: TimelineEvent[];
}

export default function Tracking() {
  const [trackingId, setTrackingId] = useState("");

  const [
    trackParcel,
    { data: trackResult, isLoading, isFetching, isError, error },
  ] = useLazyTrackParcelQuery();

  // query-এর রেজাল্ট থেকে UI-এর জন্য state তৈরি করা
  const shipmentData = trackResult?.success ? trackResult.data : null;
  const searchAttempted = trackResult !== undefined;

  const handleTrack = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingId.trim()) {
      toast.warning("Please enter a tracking ID.");
      return;
    }
    trackParcel(trackingId);
  };

  // error handling-এর জন্য useEffect
  useEffect(() => {
    if (isError && error) {
      const errorMessage =
        (error as { data?: { message?: string } })?.data?.message || "Parcel not found or an error occurred.";
      toast.error(errorMessage);
    }
  }, [isError, error]);

  // স্ট্যাটাস অনুযায়ী কালার ও আইকন দেখানোর ফাংশন
  const getStatusColor = (status: string) => {
    switch (status) {
      case "delivered":
        return "text-green-600 bg-green-100 dark:bg-green-900/30";
      case "in_transit":
        return "text-blue-600 bg-blue-100 dark:bg-blue-900/30";
      case "out_for_delivery":
        return "text-orange-600 bg-orange-100 dark:bg-orange-900/30";
      default:
        return "text-gray-600 bg-gray-100 dark:bg-gray-800";
    }
  };

  const getStatusIcon = (status: string): LucideIcon => {
    switch (status) {
      case "delivered":
        return CheckCircle;
      case "in_transit":
      case "out_for_delivery":
        return Truck;
      default:
        return Package;
    }
  };

  const formatDate = (dateString: string | null) => {
    if (!dateString) return "Pending";
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className='min-h-screen bg-gray-50 dark:bg-gray-950'>
      {/* Hero Section */}
      <section className='py-20 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 dark:from-gray-900 dark:via-blue-950 dark:to-indigo-900'>
        <div className='container mx-auto px-4 text-center'>
          <div className='flex justify-center mb-6'>
            <div className='w-24 h-24 bg-white dark:bg-gray-800 rounded-3xl flex items-center justify-center shadow-sm'>
              <Package className='w-12 h-12 text-blue-600 dark:text-blue-400' />
            </div>
          </div>
          <h1 className='text-4xl md:text-5xl font-bold mb-6 text-gray-900 dark:text-white'>
            Track Your Package
          </h1>
          <p className='text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto leading-relaxed'>
            Enter your tracking number below to get real-time updates.
          </p>
        </div>
      </section>

      {/* Tracking Form & Results */}
      <section className='-mt-16 pb-20'>
        <div className='container mx-auto px-4 max-w-3xl'>
          <Card className='border-0 shadow-lg'>
            <CardContent className='p-8'>
              <form onSubmit={handleTrack} className='space-y-4'>
                <label
                  htmlFor='trackingId'
                  className='block text-sm font-medium text-gray-900 dark:text-white'>
                  Enter Tracking Number
                </label>
                <div className='flex flex-col sm:flex-row gap-4'>
                  <Input
                    id='trackingId'
                    type='text'
                    placeholder='e.g., SW123456789'
                    value={trackingId}
                    onChange={(e) => setTrackingId(e.target.value)}
                    className='flex-1 text-base'
                  />
                  <Button
                    type='submit'
                    disabled={isLoading || isFetching || !trackingId.trim()}
                    className='bg-blue-600 hover:bg-blue-700 text-white px-8'>
                    {isLoading || isFetching ? (
                      <Loader2 className='w-4 h-4 mr-2 animate-spin' />
                    ) : (
                      <Search className='w-4 h-4 mr-2' />
                    )}
                    Track
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>

          {/* Loading Indicator */}
          {(isLoading || isFetching) && (
            <div className='mt-8 text-center'>
              <Loader2 className='w-8 h-8 mx-auto animate-spin text-blue-600' />
              <p className='mt-2 text-muted-foreground'>Searching for parcel...</p>
            </div>
          )}

          {/* Results: Parcel Found */}
          {shipmentData && (
            <div className='mt-10 space-y-8 animate-in fade-in-50'>
              {/* Status Overview */}
              <div className='bg-white dark:bg-gray-800 rounded-lg p-6 shadow-md'>
                <div className='flex flex-col md:flex-row md:items-center justify-between mb-6'>
                  <div>
                    <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
                      Tracking #{shipmentData.trackingId}
                    </h2>
                    <div className='flex items-center'>
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(
                          shipmentData.status
                        )}`}>
                        {React.createElement(getStatusIcon(shipmentData.status), {
                          className: "w-4 h-4 mr-1.5",
                        })}
                        {shipmentData.statusText}
                      </span>
                    </div>
                  </div>
                  <div className='mt-4 md:mt-0 flex items-center'>
                    <Clock className='w-5 h-5 text-gray-500 dark:text-gray-400 mr-2' />
                    <div>
                      <p className='text-sm text-gray-500 dark:text-gray-400'>
                        Estimated Delivery
                      </p>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {formatDate(shipmentData.estimatedDelivery)}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Origin and Destination */}
                <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
                  {/* ... (Your existing UI for origin, destination, weight etc.) ... */}
                </div>
              </div>

              {/* Timeline */}
              <div>
                <h3 className='text-xl font-bold text-gray-900 dark:text-white mb-6'>
                  Tracking History
                </h3>
                <div className='space-y-6'>
                  {shipmentData.timeline.map((event: TimelineEvent, index: number) => (
                    <div key={event.id} className='relative pl-8'>
                      {index < shipmentData.timeline.length - 1 && (
                        <div className='absolute left-[15px] top-[24px] bottom-0 w-0.5 bg-gray-200 dark:bg-gray-700' />
                      )}
                      <div
                        className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center ${
                          event.completed
                            ? "bg-blue-100 dark:bg-blue-900/30"
                            : "bg-gray-100 dark:bg-gray-800"
                        }`}>
                        <div
                          className={`w-3 h-3 rounded-full ${
                            event.completed
                              ? "bg-blue-600 dark:bg-blue-400"
                              : "bg-gray-400 dark:bg-gray-600"
                          }`}
                        />
                      </div>
                      <div className='pb-6'>
                        <p
                          className={`font-medium ${
                            event.completed
                              ? "text-gray-900 dark:text-white"
                              : "text-gray-500 dark:text-gray-400"
                          }`}>
                          {event.description}
                        </p>
                        <p className='text-sm text-gray-500 dark:text-gray-400 mt-1'>
                          {event.location}
                        </p>
                        {event.timestamp && (
                          <p className='text-xs text-gray-400 dark:text-gray-500 mt-1'>
                            {formatDate(event.timestamp)}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Initial State or Not Found Message */}
          {!isLoading && !isFetching && !shipmentData && (
            <div className='mt-8 p-6 bg-white dark:bg-gray-800/50 rounded-lg shadow'>
              <div className='flex items-center mb-4'>
                <AlertCircle className='w-5 h-5 text-blue-600 dark:text-blue-400 mr-2' />
                <h3 className='font-semibold text-gray-900 dark:text-white'>
                  {searchAttempted
                    ? "Parcel Not Found"
                    : "Ready to track your parcel?"}
                </h3>
              </div>
              <p className='text-gray-600 dark:text-gray-300 text-sm'>
                {searchAttempted
                  ? "Please double-check the tracking number and try again. If the issue persists, contact support."
                  : "Enter your tracking number above to see the current status and location of your shipment."}
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}