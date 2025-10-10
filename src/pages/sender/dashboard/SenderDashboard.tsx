import React, { useMemo, type FC } from "react";
import { Link } from "react-router";
import { useGetSenderStatsQuery } from "@/redux/features/stats/stats.api";
import {
  Package,
  Truck,
  CheckCircle,
  Clock,
  Plus,
  PieChart as PieIcon,
  BarChart2,
} from "lucide-react";
import {
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Tooltip,
  Legend,
  Bar,
  XAxis,
  YAxis,
  BarChart,
} from "recharts";

// ShadCN UI Components
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { cn } from "@/lib/utils";

// ========= TypeScript Interfaces for API Data =========
interface CountById {
  _id: string;
  count: number;
}

// ========= Reusable Components with Proper Types =========
const StatCard: FC<{
  title: string;
  value: string | number;
  icon: React.ElementType;
  details?: string;
  className?: string;
}> = ({ title, value, icon: Icon, details, className }) => (
  <Card className={cn("border-0 text-white", className)}>
    <CardContent className='p-5'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium text-white/80'>{title}</p>
        <div className='p-2 bg-white/20 rounded-lg'>
          <Icon className='w-5 h-5' />
        </div>
      </div>
      <p className='text-3xl font-bold mt-2'>{value}</p>
      {details && <p className='text-xs text-white/70 mt-1'>{details}</p>}
    </CardContent>
  </Card>
);

const formatChartData = (data: CountById[] | undefined) =>
  data?.map((item) => ({
    name: item._id.replace("_", " ").replace(/\b\w/g, (c) => c.toUpperCase()),
    value: item.count,
  })) || [];

// ========= Main Sender Dashboard Component =========
const SenderDashboard: FC = () => {
  // ✅ FIX: Removed the incorrect generic type from the hook call.
  const { data: statsData, isLoading } = useGetSenderStatsQuery(undefined);

  // ✅ FIX: Access the nested 'data' property correctly.
  const stats = statsData?.data;

  // Calculate stats from the fetched data
  const { deliveredCount, inTransitCount, requestedCount } = useMemo(() => {
    if (!stats?.parcelsByStatus) {
      return { deliveredCount: 0, inTransitCount: 0, requestedCount: 0 };
    }
    const findCount = (status: string) =>
      stats.parcelsByStatus.find((s: CountById) => s._id === status)?.count ||
      0;

    const delivered = findCount("delivered");
    const requested = findCount("requested");
    const inTransit = ["dispatched", "in-transit", "picked", "approved"].reduce(
      (acc, status) => acc + findCount(status),
      0
    );

    return {
      deliveredCount: delivered,
      inTransitCount: inTransit,
      requestedCount: requested,
    };
  }, [stats]);

  if (isLoading) {
    return (
      <div className='space-y-6'>
        <div className='flex justify-between items-center'>
          <Skeleton className='h-10 w-64' />
          <Skeleton className='h-10 w-40' />
        </div>
        <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-28' />
          ))}
        </div>
        <div className='grid gap-4 md:grid-cols-2'>
          {[...Array(2)].map((_, i) => (
            <Skeleton key={i} className='h-80' />
          ))}
        </div>
        <Skeleton className='h-64' />
      </div>
    );
  }

  return (
    <div className='space-y-6'>
      <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
        <div>
          <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>
            Sender Dashboard
          </h1>
          <p className='text-slate-600 dark:text-slate-400 mt-1'>
            Here's an overview of your parcel activities.
          </p>
        </div>
        <Button asChild className='w-full sm:w-auto'>
          <Link
            to='/sender/dashboard/create-parcel'
            className='flex items-center gap-2'>
            <Plus className='mr-2 h-4 w-4' /> Send New Parcel
          </Link>
        </Button>
      </div>

      <div className='grid gap-4 md:grid-cols-2 lg:grid-cols-4'>
        <StatCard
          title='Total Parcels'
          value={stats?.totalParcels ?? 0}
          icon={Package}
          details={`+${stats?.parcelsLast30Days ?? 0} in last 30 days`}
          className='bg-gradient-to-br from-blue-500 to-blue-700'
        />
        <StatCard
          title='Delivered'
          value={deliveredCount}
          icon={CheckCircle}
          className='bg-gradient-to-br from-emerald-500 to-emerald-700'
        />
        <StatCard
          title='In Transit'
          value={inTransitCount}
          icon={Truck}
          className='bg-gradient-to-br from-violet-500 to-violet-700'
        />
        <StatCard
          title='Requested'
          value={requestedCount}
          icon={Clock}
          className='bg-gradient-to-br from-amber-500 to-amber-600'
        />
      </div>

      <div className='grid gap-6 md:grid-cols-2'>
        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <PieIcon className='w-5 h-5 mr-2' />
              Parcel Status
            </CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={formatChartData(stats?.parcelsByStatus)}
                  dataKey='value'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={90}
                  label>
                  {formatChartData(stats?.parcelsByStatus).map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#10B981", "#3B82F6", "#8B5CF6", "#F97316"][index % 4]
                      }
                    />
                  ))}
                </Pie>
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                  itemStyle={{ color: "#cbd5e1" }}
                />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BarChart2 className='w-5 h-5 mr-2' />
              Parcel Breakdown
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='type'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='type'>By Type</TabsTrigger>
                <TabsTrigger value='shipping'>By Shipping</TabsTrigger>
              </TabsList>
              <TabsContent value='type'>
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart
                    data={formatChartData(stats?.parcelsByType)}
                    margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <XAxis
                      dataKey='name'
                      stroke='#a1a1aa'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#a1a1aa'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                      cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
                    />
                    <Bar dataKey='value' fill='#3B82F6' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value='shipping'>
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart
                    data={formatChartData(stats?.parcelsByShippingType)}
                    margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                    <XAxis
                      dataKey='name'
                      stroke='#a1a1aa'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <YAxis
                      stroke='#a1a1aa'
                      fontSize={12}
                      tickLine={false}
                      axisLine={false}
                    />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#1e293b",
                        border: "none",
                        borderRadius: "0.5rem",
                      }}
                      cursor={{ fill: "rgba(100, 116, 139, 0.1)" }}
                    />
                    <Bar dataKey='value' fill='#10B981' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Top Receivers</CardTitle>
          <CardDescription>
            List of receivers you've sent the most parcels to.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Receiver ID</TableHead>
                <TableHead className='text-right'>Parcels Sent</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {/* ✅ FIX: Added type for the 'receiver' parameter */}
              {stats?.parcelsPerReceiver?.map((receiver: CountById) => (
                <TableRow key={receiver._id}>
                  <TableCell className='font-mono text-xs'>
                    {receiver._id}
                  </TableCell>
                  <TableCell className='text-right font-semibold'>
                    {receiver.count}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};

export default SenderDashboard;
