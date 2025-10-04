import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useGetReceiverParcelsQuery } from "@/redux/features/parcel/parcel.api";
import type { IParcel } from "@/types/parcel.type";
import {
  Package,
  Clock,
  CheckCircle,
  Truck,
  AlertCircle,
  Search,
  Filter,
} from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { Input } from "@/components/ui/input";

export default function ReceiverParcels() {
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<string | null>(null);

  const { data: parcelsData, isLoading } = useGetReceiverParcelsQuery({
    page: currentPage,
    limit: 10,
    searchTerm,
    status: statusFilter,
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "pending":
      case "requested":
        return <Clock className='w-4 h-4 text-yellow-500' />;
      case "processing":
      case "approved":
      case "picked":
      case "dispatched":
        return <Truck className='w-4 h-4 text-blue-500' />;
      case "in-transit":
        return <Truck className='w-4 h-4 text-purple-500' />;
      case "delivered":
        return <CheckCircle className='w-4 h-4 text-green-500' />;
      case "cancelled":
        return <AlertCircle className='w-4 h-4 text-red-500' />;
      default:
        return <Package className='w-4 h-4 text-gray-500' />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
      case "requested":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      case "processing":
      case "approved":
      case "picked":
      case "dispatched":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
      case "in-transit":
        return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    // Search is handled by the query params
  };

  const handleFilterChange = (status: string | null) => {
    setStatusFilter(status);
    setCurrentPage(1); // Reset to first page when filter changes
  };

  return (
    <div className='container mx-auto py-6'>
      <div className='flex flex-col md:flex-row md:items-center md:justify-between mb-6'>
        <div className='mb-4 md:mb-0'>
          <h1 className='text-2xl font-bold'>Incoming Parcels</h1>
          <p className='text-muted-foreground'>
            View all parcels being sent to you and their current status
          </p>
        </div>
      </div>

      <Card>
        <CardHeader>
          <div className='flex flex-col md:flex-row md:items-center md:justify-between gap-4'>
            <div>
              <CardTitle>Parcel List</CardTitle>
              <CardDescription>
                {parcelsData?.meta?.total || 0} parcels found
              </CardDescription>
            </div>

            <div className='flex flex-col md:flex-row gap-2'>
              {/* Search */}
              <form onSubmit={handleSearch} className='flex'>
                <Input
                  placeholder='Search by tracking ID or address'
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className='w-full md:w-64'
                />
                <Button type='submit' variant='outline' className='ml-2'>
                  <Search className='h-4 w-4' />
                </Button>
              </form>

              {/* Filter Dropdown */}
              <div className='relative'>
                <Button
                  variant='outline'
                  className='w-full md:w-auto flex items-center justify-between'
                  onClick={() =>
                    document
                      .getElementById("filter-menu")
                      ?.classList.toggle("hidden")
                  }>
                  <Filter className='h-4 w-4 mr-2' />
                  {statusFilter ? `Filter: ${statusFilter}` : "Filter"}
                </Button>
                <div
                  id='filter-menu'
                  className='hidden absolute right-0 mt-2 w-48 bg-white dark:bg-gray-800 rounded-md shadow-lg z-10 border dark:border-gray-700'>
                  <div className='py-1'>
                    <button
                      onClick={() => handleFilterChange(null)}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700'>
                      All
                    </button>
                    <button
                      onClick={() => handleFilterChange("requested")}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700'>
                      Requested
                    </button>
                    <button
                      onClick={() => handleFilterChange("approved")}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700'>
                      Approved
                    </button>
                    <button
                      onClick={() => handleFilterChange("in-transit")}
                      className='w-full text-left px-4 py-2 text-sm hover:bg-gray-100 dark:hover:bg-gray-700'>
                      In Transit
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          {isLoading ? (
            <div className='flex justify-center items-center py-10'>
              <div className='animate-spin rounded-full h-10 w-10 border-b-2 border-primary'></div>
            </div>
          ) : parcelsData?.data?.length === 0 ? (
            <div className='text-center py-10'>
              <Package className='mx-auto h-12 w-12 text-muted-foreground opacity-50' />
              <h3 className='mt-4 text-lg font-medium'>No parcels found</h3>
              <p className='mt-2 text-muted-foreground'>
                You don't have any incoming parcels at the moment.
              </p>
            </div>
          ) : (
            <div className='space-y-4'>
              {parcelsData?.data?.map((parcel: IParcel) => (
                <div
                  key={parcel._id}
                  className='flex flex-col md:flex-row md:items-center justify-between p-4 border border-gray-200 dark:border-gray-700 rounded-lg hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors'>
                  <div className='flex items-center space-x-4 mb-2 md:mb-0'>
                    {getStatusIcon(parcel.status)}
                    <div>
                      <p className='font-medium text-gray-900 dark:text-white'>
                        {parcel.trackingId}
                      </p>
                      <p className='text-sm text-gray-600 dark:text-gray-300'>
                        Sender: {parcel.sender.name}
                      </p>
                      <p className='text-xs text-gray-500 dark:text-gray-400'>
                        From: {parcel.sender.defaultAddress || "N/A"}
                      </p>
                    </div>
                  </div>
                  <div className='flex flex-col md:items-end'>
                    <p className='text-sm text-gray-600 dark:text-gray-300'>
                      {new Date(parcel.createdAt).toLocaleDateString("en-US")}
                    </p>
                    <span
                      className={`inline-block px-2 py-1 text-xs rounded-full mt-1 ${getStatusColor(
                        parcel.status
                      )}`}>
                      {parcel.status === "pending"
                        ? "requested"
                        : parcel.status === "approved"
                        ? "approved"
                        : parcel.status === "picked"
                        ? "picked"
                        : parcel.status === "dispatched"
                        ? "dispatched"
                        : parcel.status === "in-transit"
                        ? "in-transit"
                        : parcel.status === "delivered"
                        ? "delivered"
                        : parcel.status === "cancelled"
                        ? "cancelled"
                        : parcel.status}
                    </span>
                    <div className='mt-2 flex space-x-2'>
                      <Button
                        variant='outline'
                        size='sm'
                        asChild
                        className='text-xs'>
                        <Link to={`/tracking?id=${parcel.trackingId}`}>
                          Track
                        </Link>
                      </Button>
                      {parcel.status === "in-transit" && (
                        <Button
                          variant='default'
                          size='sm'
                          className='text-xs'>
                          Confirm Delivery
                        </Button>
                      )}
                    </div>
                  </div>
                </div>
              ))}

              {/* Pagination */}
              {parcelsData?.meta?.total > 0 && (
                <div className='flex justify-center mt-6'>
                  <div className='flex space-x-1'>
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}>
                      Previous
                    </Button>
                    {Array.from(
                      {
                        length: Math.ceil((parcelsData?.meta?.total || 0) / 10),
                      },
                      (_, i) => i + 1
                    ).map((page) => (
                      <Button
                        key={page}
                        variant={currentPage === page ? "default" : "outline"}
                        size='sm'
                        onClick={() => handlePageChange(page)}>
                        {page}
                      </Button>
                    ))}
                    <Button
                      variant='outline'
                      size='sm'
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={
                        currentPage ===
                        Math.ceil((parcelsData?.meta?.total || 0) / 10)
                      }>
                      Next
                    </Button>
                  </div>
                </div>
              )}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}