// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useState } from "react";
// import {
//   useGetAllUsersQuery,
//   useUpdateUserStatusMutation,
// } from "@/redux/features/user/user.api";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Badge } from "@/components/ui/badge";
// import { Skeleton } from "@/components/ui/skeleton";
// import { toast } from "sonner";
// import { Eye, Search, UserCheck, UserX } from "lucide-react";
// import { Link } from "react-router";
// import type { IUser } from "@/types";

import UsersTable from "@/components/modules/admin/users/UsersTable";

// const ManageUsers = () => {
//   const [searchTerm, setSearchTerm] = useState("");
//   const [roleFilter, setRoleFilter] = useState("");
//   const [statusFilter, setStatusFilter] = useState("");
//   const [page, setPage] = useState(1);
//   const limit = 10;

//   const { data, isLoading } = useGetAllUsersQuery({
//     page,
//     limit,
//     searchTerm,
//     role: roleFilter,
//     status: statusFilter,
//   });

//   const [updateUserStatus, { isLoading: isUpdating }] =
//     useUpdateUserStatusMutation();

//   const users = data?.data || [];
//   const meta = data?.meta || { total: 0, page: 1, limit: 10 };
//   const totalPages = Math.ceil(meta.total / meta.limit);

//   const handleStatusChange = async (id: string, status: string) => {
//     try {
//       await updateUserStatus({ id, status }).unwrap();
//       toast.success(`User status updated to ${status}`);
//     } catch (error) {
//       toast.error("Failed to update user status");
//     }
//   };

//   const getRoleBadgeColor = (role: string) => {
//     switch (role) {
//       case "admin":
//         return "bg-purple-100 text-purple-800 dark:bg-purple-900/30 dark:text-purple-400";
//       case "sender":
//         return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
//       case "receiver":
//         return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
//     }
//   };

//   const getStatusBadgeColor = (status: string) => {
//     switch (status) {
//       case "active":
//         return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
//       case "inactive":
//         return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
//       default:
//         return "bg-gray-100 text-gray-800 dark:bg-gray-900/30 dark:text-gray-400";
//     }
//   };

//   return (
//     <div className='space-y-6'>
//       <div className='flex justify-between items-center'>
//         <div>
//           <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
//             Manage Users
//           </h1>
//           <p className='text-gray-600 dark:text-gray-400 mt-1'>
//             View and manage all users in the system
//           </p>
//         </div>
//       </div>

//       {/* Filters */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div className='relative flex-1'>
//           <Search className='absolute left-2.5 top-2.5 h-4 w-4 text-gray-500 dark:text-gray-400' />
//           <Input
//             placeholder='Search by name, email or phone'
//             className='pl-8'
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//         </div>
//         <Select value={roleFilter} onValueChange={setRoleFilter}>
//           <SelectTrigger className='w-[180px]'>
//             <SelectValue placeholder='Filter by role' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='all'>All Roles</SelectItem>
//             <SelectItem value='admin'>Admin</SelectItem>
//             <SelectItem value='sender'>Sender</SelectItem>
//             <SelectItem value='receiver'>Receiver</SelectItem>
//           </SelectContent>
//         </Select>
//         <Select value={statusFilter} onValueChange={setStatusFilter}>
//           <SelectTrigger className='w-[180px]'>
//             <SelectValue placeholder='Filter by status' />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value='all'>All Status</SelectItem>
//             <SelectItem value='active'>Active</SelectItem>
//             <SelectItem value='inactive'>Inactive</SelectItem>
//             <SelectItem value='pending'>Pending</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Users Table */}
//       <div className='border rounded-lg overflow-hidden'>
//         <Table>
//           <TableHeader>
//             <TableRow>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Phone</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead className='text-right'>Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               Array(5)
//                 .fill(0)
//                 .map((_, index) => (
//                   <TableRow key={index}>
//                     <TableCell>
//                       <Skeleton className='h-6 w-32' />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className='h-6 w-40' />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className='h-6 w-28' />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className='h-6 w-20' />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className='h-6 w-20' />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className='h-6 w-24' />
//                     </TableCell>
//                   </TableRow>
//                 ))
//             ) : users.length === 0 ? (
//               <TableRow>
//                 <TableCell
//                   colSpan={6}
//                   className='text-center py-8 text-gray-500 dark:text-gray-400'>
//                   No users found
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user: IUser) => (
//                 <TableRow key={user._id}>
//                   <TableCell className='font-medium'>{user.name}</TableCell>
//                   <TableCell>{user.email}</TableCell>
//                   <TableCell>{user.phone}</TableCell>
//                   <TableCell>
//                     <Badge className={getRoleBadgeColor(user.role)}>
//                       {user.role}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     <Badge className={getStatusBadgeColor(user.status)}>
//                       {user.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className='text-right'>
//                     <div className='flex justify-end gap-2'>
//                       <Button variant='outline' size='sm' asChild>
//                         <Link to={`/admin/users/${user._id}`}>
//                           <Eye className='h-4 w-4' />
//                         </Link>
//                       </Button>
//                       {user.status === "active" ? (
//                         <Button
//                           variant='outline'
//                           size='sm'
//                           onClick={() =>
//                             handleStatusChange(user._id, "inactive")
//                           }
//                           disabled={isUpdating}>
//                           <UserX className='h-4 w-4 text-red-500' />
//                         </Button>
//                       ) : (
//                         <Button
//                           variant='outline'
//                           size='sm'
//                           onClick={() => handleStatusChange(user._id, "active")}
//                           disabled={isUpdating}>
//                           <UserCheck className='h-4 w-4 text-green-500' />
//                         </Button>
//                       )}
//                     </div>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination */}
//       {!isLoading && users.length > 0 && (
//         <div className='flex justify-between items-center'>
//           <div className='text-sm text-gray-500 dark:text-gray-400'>
//             Showing {(page - 1) * limit + 1} to{" "}
//             {Math.min(page * limit, meta.total)} of {meta.total} users
//           </div>
//           <div className='flex gap-2'>
//             <Button
//               variant='outline'
//               size='sm'
//               onClick={() => setPage(page - 1)}
//               disabled={page === 1}>
//               Previous
//             </Button>
//             <Button
//               variant='outline'
//               size='sm'
//               onClick={() => setPage(page + 1)}
//               disabled={page === totalPages}>
//               Next
//             </Button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default ManageUsers;

export default function ManageUsers() {
  return (
    <div>
      <UsersTable />
    </div>
  );
}
