/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { useGetAllParcelsQuery, useUpdateParcelStatusMutation } from "@/redux/features/parcel/parcel.api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";
import { toast } from "sonner";
import { Eye, Search, Truck} from "lucide-react";
import { Link } from "react-router";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

const ManageParcels = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [page, setPage] = useState(1);
  const [selectedParcel, setSelectedParcel] = useState<any>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const limit = 10;

  const { data, isLoading } = useGetAllParcelsQuery({
    page,
    limit,
    searchTerm,
    status: statusFilter,
  });

  const [updateParcelStatus, { isLoading: isUpdating }] = useUpdateParcelStatusMutation();

  const parcels = data?.data || [];
  const meta = data?.meta || { total: 0, page: 1, limit: 10 };
  const totalPages = Math.ceil(meta.total / meta.limit);

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateParcelStatus({ id, status }).unwrap();
      toast.success(`Parcel status updated to ${status}`);
      setIsDialogOpen(false);
    } catch (error) {
      toast.error("Failed to update parcel status");
    }
  };

  const getStatusBadgeColor = (status: string) => {
    switch (status) {
      case "pending":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "processing":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
      case "shipped":
        return "bg-indigo-100 text-indigo-800 dark:bg-indigo-900/30 dark:text-indigo-400";
      case "delivered":
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
      case "cancelled":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString();
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
            Manage Parcels
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mt-1">
            View and manage all parcels in the system
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400" />
          <Input
            placeholder="Search by tracking ID or customer name"
            className="pl-8"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        <Select
          value={statusFilter}
          onValueChange={setStatusFilter}
        >
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Filter by status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="">All Status</SelectItem>
            <SelectItem value="pending">Pending</SelectItem>
            <SelectItem value="processing">Processing</SelectItem>
            <SelectItem value="shipped">Shipped</SelectItem>
            <SelectItem value="delivered">Delivered</SelectItem>
            <SelectItem value="cancelled">Cancelled</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* Parcels Table */}
      <div className="border rounded-lg overflow-hidden">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tracking ID</TableHead>
              <TableHead>Sender</TableHead>
              <TableHead>Receiver</TableHead>
              <TableHead>Created At</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(0)
                .map((_, index) => (
                  <TableRow key={index}>
                    <TableCell><Skeleton className="h-6 w-32" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-40" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-28" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-20" /></TableCell>
                    <TableCell><Skeleton className="h-6 w-24" /></TableCell>
                  </TableRow>
                ))
            ) : parcels.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-gray-500 dark:text-gray-400">
                  No parcels found
                </TableCell>
              </TableRow>
            ) : (
              parcels.map((parcel: any) => (
                <TableRow key={parcel.id}>
                  <TableCell className="font-medium">{parcel.trackingId}</TableCell>
                  <TableCell>{parcel.sender.name}</TableCell>
                  <TableCell>{parcel.receiver.name}</TableCell>
                  <TableCell>{formatDate(parcel.createdAt)}</TableCell>
                  <TableCell>
                    <Badge className={getStatusBadgeColor(parcel.status)}>
                      {parcel.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      <Button
                        variant="outline"
                        size="sm"
                        asChild
                      >
                        <Link to={`/admin/parcels/${parcel.id}`}>
                          <Eye className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Dialog open={isDialogOpen && selectedParcel?.id === parcel.id} onOpenChange={(open: boolean) => {
                        setIsDialogOpen(open);
                        if (!open) setSelectedParcel(null);
                      }}>
                        <DialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => setSelectedParcel(parcel)}
                          >
                            <Truck className="h-4 w-4 text-blue-500" />
                          </Button>
                        </DialogTrigger>
                        <DialogContent>
                          <DialogHeader>
                            <DialogTitle>Update Parcel Status</DialogTitle>
                          </DialogHeader>
                          <div className="py-4">
                            <p className="mb-4">Current Status: <Badge className={getStatusBadgeColor(parcel.status)}>{parcel.status}</Badge></p>
                            <p className="mb-2 font-medium">Select New Status:</p>
                            <div className="grid grid-cols-2 gap-2">
                              {parcel.status !== "pending" && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleStatusChange(parcel.id, "pending")}
                                  disabled={isUpdating}
                                >
                                  Pending
                                </Button>
                              )}
                              {parcel.status !== "processing" && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleStatusChange(parcel.id, "processing")}
                                  disabled={isUpdating}
                                >
                                  Processing
                                </Button>
                              )}
                              {parcel.status !== "shipped" && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleStatusChange(parcel.id, "shipped")}
                                  disabled={isUpdating}
                                >
                                  Shipped
                                </Button>
                              )}
                              {parcel.status !== "delivered" && (
                                <Button 
                                  variant="outline" 
                                  onClick={() => handleStatusChange(parcel.id, "delivered")}
                                  disabled={isUpdating}
                                >
                                  Delivered
                                </Button>
                              )}
                              {parcel.status !== "cancelled" && (
                                <Button 
                                  variant="outline" 
                                  className="text-red-500"
                                  onClick={() => handleStatusChange(parcel.id, "cancelled")}
                                  disabled={isUpdating}
                                >
                                  Cancel
                                </Button>
                              )}
                            </div>
                          </div>
                        </DialogContent>
                      </Dialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      {!isLoading && parcels.length > 0 && (
        <div className="flex justify-between items-center">
          <div className="text-sm text-gray-500 dark:text-gray-400">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta.total)} of {meta.total} parcels
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Previous
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageParcels;