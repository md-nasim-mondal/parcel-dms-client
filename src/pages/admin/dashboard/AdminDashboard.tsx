import React from "react";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import {
  useGetParcelStatsQuery,
  useGetUserStatsQuery,
} from "@/redux/features/stats/stats.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users,
  Package,
  CircleDollarSign,
  BarChart2,
  UserCheck,
  UserX,
  LineChart,
  PieChart as PieIcon,
  Blocks,
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
  ComposedChart,
  Line,
  BarChart,
} from "recharts";
import { cn } from "@/lib/utils";

// TypeScript Interfaces

// ✅ Reusable Stat Card Component with new "eye-peaceful" background colors
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  details?: string;
  className?: string; // We will use className to pass bg and text colors
}

const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  icon: Icon,
  details,
  className,
}) => (
  <Card className={cn("border-0", className)}>
    <CardContent className='p-5'>
      <div className='flex items-center justify-between'>
        <p className='text-sm font-medium opacity-80'>{title}</p>
        <div className='p-2 bg-black/10 dark:bg-white/10 rounded-lg'>
          <Icon className='w-5 h-5' />
        </div>
      </div>
      <p className='text-3xl font-bold mt-2'>{value}</p>
      {details && <p className='text-xs opacity-70 mt-1'>{details}</p>}
    </CardContent>
  </Card>
);

const formatChartData = (
  data: { _id: string | null; count: number }[] | undefined
): { name: string; count: number }[] => {
  return (
    data?.map((item) => ({
      name: (item._id || "N/A")
        .replace(/_/g, " ")
        .replace(/\b\w/g, (c) => c.toUpperCase()),
      count: item.count,
    })) || []
  );
};

export default function StatisticsPage() {
  const { data: parcelStatsData, isLoading: isLoadingParcel } =
    useGetParcelStatsQuery(undefined);
  const { data: userStatsData, isLoading: isLoadingUser } =
    useGetUserStatsQuery(undefined);

  const isLoading = isLoadingParcel || isLoadingUser;
  const userStats = userStatsData?.data;
  const parcelStats = parcelStatsData?.data;

  const parcelGrowthData = [
    {
      name: "Last 30d",
      newParcels: parcelStats?.parcelCreatedInLast30Days ?? 0,
    },
    {
      name: "Last 14d",
      newParcels: parcelStats?.parcelCreatedInLast14Days ?? 0,
    },
    { name: "Last 7d", newParcels: parcelStats?.parcelCreatedInLast7Days ?? 0 },
  ];

  if (isLoading) {
    // Skeleton structure remains the same
    return (
      <div className='space-y-8'>
        <div className='space-y-2'>
          <Skeleton className='h-8 w-1/3 bg-slate-200 dark:bg-slate-700' />
          <Skeleton className='h-4 w-1/2 bg-slate-200 dark:bg-slate-700' />
        </div>
        <div>
          <Skeleton className='h-4 w-1/4 mb-4 bg-slate-200 dark:bg-slate-700' />
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-28 bg-slate-200 dark:bg-slate-700' />
            ))}
          </div>
        </div>
        <div>
          <Skeleton className='h-4 w-1/4 mb-4 bg-slate-200 dark:bg-slate-700' />
          <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
            {[...Array(4)].map((_, i) => (
              <Skeleton key={i} className='h-28 bg-slate-200 dark:bg-slate-700' />
            ))}
          </div>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
          {[...Array(4)].map((_, i) => (
            <Skeleton key={i} className='h-80 bg-slate-200 dark:bg-slate-700' />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className='space-y-8'>
      {/* Header */}
      <div>
        <h1 className='text-3xl font-bold text-slate-900 dark:text-white'>
          System Analytics
        </h1>
        <p className='text-slate-600 dark:text-slate-400 mt-1'>
          An overview of key metrics and data trends across the platform.
        </p>
      </div>

      {/* ✅ User Statistics Cards with new background colors */}
      <div>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <Users className='w-5 h-5 mr-2 text-primary' /> User Statistics
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <StatCard
            title='Total Users'
            value={userStats?.totalUsers ?? 0}
            icon={Users}
            details={`+${userStats?.newUsersInLast30Days ?? 0} in 30 days`}
            className='bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-200'
          />
          <StatCard
            title='Active Users'
            value={userStats?.totalActiveUsers ?? 0}
            icon={UserCheck}
            details={`+${userStats?.newUsersInLast7Days ?? 0} this week`}
            className='bg-green-100 dark:bg-green-950 text-green-800 dark:text-green-200'
          />
          <StatCard
            title='Inactive Users'
            value={userStats?.totalInActiveUsers ?? 0}
            icon={UserX}
            className='bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-200'
          />
          <StatCard
            title='Blocked Users'
            value={userStats?.totalBlockedUsers ?? 0}
            icon={UserX}
            className='bg-red-100 dark:bg-red-950 text-red-800 dark:text-red-200'
          />
        </div>
      </div>

      {/* ✅ Parcel Statistics Cards with new background colors */}
      <div>
        <h2 className='text-xl font-semibold mb-4 flex items-center'>
          <Package className='w-5 h-5 mr-2 text-primary' /> Parcel Statistics
        </h2>
        <div className='grid grid-cols-2 md:grid-cols-4 gap-6'>
          <StatCard
            title='Total Parcels'
            value={parcelStats?.totalParcel ?? 0}
            icon={Package}
            details={`+${
              parcelStats?.parcelCreatedInLast30Days ?? 0
            } in 30 days`}
            className='bg-violet-100 dark:bg-violet-950 text-violet-800 dark:text-violet-200'
          />
          <StatCard
            title='Avg. Fee'
            value={`৳${(parcelStats?.avgFeePerParcel?.[0]?.avgFee || 0).toFixed(
              2
            )}`}
            icon={CircleDollarSign}
            details='Per parcel'
            className='bg-cyan-100 dark:bg-cyan-950 text-cyan-800 dark:text-cyan-200'
          />
          <StatCard
            title='Unique Senders'
            value={parcelStats?.totalParcelCreatedByUniqueSender ?? 0}
            icon={Users}
            className='bg-sky-100 dark:bg-sky-950 text-sky-800 dark:text-sky-200'
          />
          <StatCard
            title='Unique Receivers'
            value={parcelStats?.totalParcelReceiverByUniqueReceiver ?? 0}
            icon={Users}
            className='bg-teal-100 dark:bg-teal-950 text-teal-800 dark:text-teal-200'
          />
        </div>
      </div>

      {/* Charts Grid */}
      <div className='grid grid-cols-1 lg:grid-cols-2 gap-6'>
        <Card className='border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <PieIcon className='w-5 h-5 mr-2' />
              User Role Distribution
            </CardTitle>
            <CardDescription>
              A breakdown of all users by their assigned roles.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <PieChart>
                <Pie
                  data={formatChartData(userStats?.usersByRole)}
                  dataKey='count'
                  nameKey='name'
                  cx='50%'
                  cy='50%'
                  outerRadius={90}
                  label>
                  {formatChartData(userStats?.usersByRole).map((_, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        ["#3B82F6", "#10B981", "#F97316", "#8B5CF6"][index % 4]
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

        <Card className='border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <BarChart2 className='w-5 h-5 mr-2' />
              Parcel Status
            </CardTitle>
            <CardDescription>
              The current status distribution of all parcels.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <BarChart
                data={formatChartData(parcelStats?.totalParcelByStatus)}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
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
                <Bar dataKey='count' fill='#8B5CF6' radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className='border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <LineChart className='w-5 h-5 mr-2' />
              New Parcels Trend
            </CardTitle>
            <CardDescription>
              Number of new parcels created over time.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width='100%' height={300}>
              <ComposedChart
                data={parcelGrowthData}
                margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <XAxis dataKey='name' stroke='#a1a1aa' fontSize={12} />
                <YAxis stroke='#a1a1aa' fontSize={12} />
                <Tooltip
                  contentStyle={{
                    backgroundColor: "#1e293b",
                    border: "none",
                    borderRadius: "0.5rem",
                  }}
                />
                <Legend />
                <Line
                  type='monotone'
                  dataKey='newParcels'
                  name='New Parcels'
                  stroke='#34D399'
                  strokeWidth={2}
                />
              </ComposedChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card className='border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900'>
          <CardHeader>
            <CardTitle className='flex items-center'>
              <Blocks className='w-5 h-5 mr-2' />
              Parcel Breakdown
            </CardTitle>
            <CardDescription>
              Further breakdown of parcels by type and shipping method.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue='type'>
              <TabsList className='grid w-full grid-cols-2'>
                <TabsTrigger value='type'>By Type</TabsTrigger>
                <TabsTrigger value='shipping'>By Shipping Method</TabsTrigger>
              </TabsList>
              <TabsContent value='type'>
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart
                    data={formatChartData(parcelStats?.parcelPerType)}
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
                    <Bar dataKey='count' fill='#3B82F6' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
              <TabsContent value='shipping'>
                <ResponsiveContainer width='100%' height={250}>
                  <BarChart
                    data={formatChartData(parcelStats?.parcelPerShippingType)}
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
                    <Bar dataKey='count' fill='#10B981' radius={[4, 4, 0, 0]} />
                  </BarChart>
                </ResponsiveContainer>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
