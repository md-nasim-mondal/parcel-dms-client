import {
  Truck,
  Package,
  CheckCircle,
  Clock,
  MapPin,
  Navigation,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { cn } from "@/lib/utils";
import { toast } from "sonner";

const StatCard = ({ title, value, icon: Icon, className }: any) => (
  <Card className={cn("border-0 text-white", className)}>
    <CardContent className='p-5'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium text-white/80'>{title}</p>
        <div className='p-2 bg-white/20 rounded-lg'>
          <Icon className='w-5 h-5' />
        </div>
      </div>
      <p className='text-3xl font-bold mt-2'>{value}</p>
    </CardContent>
  </Card>
);

export default function DeliveryDashboard() {
  // Stats Data
  const stats = {
      assigned: 12,
      delivered: 145,
      pending: 5,
      efficiency: "98%"
  };

  const assignedParcels = [
      { id: "TRK-123456", address: "123 Main St, NY", status: "Out for Delivery", time: "2:00 PM", contact: "555-0123" },
      { id: "TRK-789012", address: "456 Park Ave, NY", status: "Assigned", time: "Pending", contact: "555-4567" },
      { id: "TRK-345678", address: "789 Broadway, NY", status: "Picked Up", time: "4:30 PM", contact: "555-8901" },
  ];

  const handleStartShift = () => {
    toast.success("Shift started! You are now online.");
  };

  const handleNavigate = (address: string) => {
    toast.info(`Starting navigation to: ${address}`);
  };

  const handleViewDetails = (id: string) => {
    toast.info(`Viewing details for parcel ${id}`);
  };

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>
            Delivery Dashboard
          </h1>
          <p className='text-slate-600 dark:text-slate-400 mt-1'>
            Overview of your delivery tasks and performance.
          </p>
        </div>
         <Button onClick={handleStartShift} className="bg-blue-600 hover:bg-blue-700 text-white">
            <Truck className="w-4 h-4 mr-2" /> Start Shift
         </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Assigned Parcels'
          value={stats.assigned}
          icon={Package}
          className='bg-gradient-to-br from-blue-500 to-blue-700'
        />
        <StatCard
          title='Delivered (Total)'
          value={stats.delivered}
          icon={CheckCircle}
          className='bg-gradient-to-br from-emerald-500 to-emerald-700'
        />
        <StatCard
          title='Pending Delivery'
          value={stats.pending}
          icon={Clock}
          className='bg-gradient-to-br from-amber-500 to-amber-600'
        />
         <StatCard
          title='On-Time Rate'
          value={stats.efficiency}
          icon={Navigation}
          className='bg-gradient-to-br from-violet-500 to-violet-700'
        />
      </div>

      <div className="grid gap-6 md:grid-cols-3">
          {/* Main Assigned List */}
          <Card className="md:col-span-2 border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
             <CardHeader>
                <CardTitle>Assigned Deliveries</CardTitle>
                <CardDescription>Parcels currently assigned to you for delivery.</CardDescription>
             </CardHeader>
             <CardContent>
                 <Table>
                    <TableHeader>
                       <TableRow>
                          <TableHead>Tracking ID</TableHead>
                          <TableHead>Address</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead className="text-right">Action</TableHead>
                       </TableRow>
                    </TableHeader>
                    <TableBody>
                        {assignedParcels.map((parcel, i) => (
                           <TableRow key={i}>
                              <TableCell className="font-mono">{parcel.id}</TableCell>
                              <TableCell>
                                 <div className="flex items-center">
                                    <MapPin className="w-3 h-3 text-gray-400 mr-1" />
                                    {parcel.address}
                                 </div>
                              </TableCell>
                              <TableCell>
                                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                                      parcel.status === 'Out for Delivery' ? 'bg-blue-100 text-blue-700' :
                                      parcel.status === 'Picked Up' ? 'bg-amber-100 text-amber-700' :
                                      'bg-gray-100 text-gray-700'
                                  }`}>
                                      {parcel.status}
                                  </span>
                              </TableCell>
                              <TableCell className="text-right">
                                  <Button size="sm" variant="outline" onClick={() => handleViewDetails(parcel.id)}>View</Button>
                              </TableCell>
                           </TableRow>
                        ))}
                    </TableBody>
                 </Table>
             </CardContent>
          </Card>

          {/* Quick Actions / Map Placeholder */}
          <div className="space-y-6">
              <Card className="bg-blue-600 text-white border-0">
                  <CardHeader>
                      <CardTitle>Current Route</CardTitle>
                      <CardDescription className="text-blue-100">Next stop estimated in 15 mins</CardDescription>
                  </CardHeader>
                  <CardContent>
                      <div className="bg-white/10 p-4 rounded-lg mb-4">
                          <p className="font-medium text-lg">123 Main St, NY</p>
                          <p className="text-sm opacity-80">Customer: John Doe</p>
                      </div>
                      <Button variant="secondary" className="w-full text-blue-700" onClick={() => handleNavigate("123 Main St, NY")}>
                          <Navigation className="w-4 h-4 mr-2" /> Navigate
                      </Button>
                  </CardContent>
              </Card>
          </div>
      </div>
    </div>
  );
}
