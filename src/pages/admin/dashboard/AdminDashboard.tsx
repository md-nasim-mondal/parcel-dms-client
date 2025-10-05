import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useGetParcelStatsQuery, useGetUserStatsQuery } from "@/redux/features/stats/stats.api";
import { Skeleton } from "@/components/ui/skeleton";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Users, Package, CircleDollarSign, BarChart2, UserCheck, UserX, LineChart, PieChart as PieIcon, Blocks
} from "lucide-react";
import {
  ResponsiveContainer, PieChart, Pie, Cell, Tooltip, Legend, Bar, XAxis, YAxis, ComposedChart, Line,
  BarChart
} from "recharts";
import { cn } from "@/lib/utils";

// ========= TypeScript Interfaces for API Data =========
interface ChartDataItem {
  name: string;
  count: number;
}

// ========= Reusable Components with Proper Types =========
interface StatCardProps {
  title: string;
  value: string | number;
  icon: React.ElementType;
  details?: string;
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, icon: Icon, details, className }) => (
  <Card className={cn("border-0 text-white", className)}>
    <CardContent className="p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-white/80">{title}</p>
        <div className="p-2 bg-white/20 rounded-lg"><Icon className="w-5 h-5" /></div>
      </div>
      <p className="text-3xl font-bold mt-2">{value}</p>
      {details && <p className="text-xs text-white/70 mt-1">{details}</p>}
    </CardContent>
  </Card>
);

const formatChartData = (data: { _id: string | null; count: number }[] | undefined): ChartDataItem[] => {
    return data?.map(item => ({ name: (item._id || 'N/A').replace("_", " ").replace(/\b\w/g, c => c.toUpperCase()), count: item.count })) || [];
};

// ========= Main Statistics Page Component =========
export default function StatisticsPage() {
  // ✅ FIX: Removed incorrect generic types. RTK Query infers this automatically.
  const { data: parcelStatsData, isLoading: isLoadingParcel } = useGetParcelStatsQuery(undefined);
  const { data: userStatsData, isLoading: isLoadingUser } = useGetUserStatsQuery(undefined);
  
  const isLoading = isLoadingParcel || isLoadingUser;

  // ✅ FIX: Access data directly from the response.
  const userStats = userStatsData?.data;
  const parcelStats = parcelStatsData?.data;

  const parcelGrowthData = [
    { name: 'Last 30d', newParcels: parcelStats?.parcelCreatedInLast30Days ?? 0 },
    { name: 'Last 14d', newParcels: parcelStats?.parcelCreatedInLast14Days ?? 0 },
    { name: 'Last 7d', newParcels: parcelStats?.parcelCreatedInLast7Days ?? 0 },
  ];

  if (isLoading) {
    // A more detailed skeleton for a better loading experience
    return (
      <div className="space-y-8">
        <div className="space-y-2"><Skeleton className="h-8 w-1/3" /><Skeleton className="h-4 w-1/2" /></div>
        <div><Skeleton className="h-4 w-1/4 mb-4" /><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}</div></div>
        <div><Skeleton className="h-4 w-1/4 mb-4" /><div className="grid grid-cols-2 md:grid-cols-4 gap-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-28" />)}</div></div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">{[...Array(4)].map((_, i) => <Skeleton key={i} className="h-80" />)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white">Comprehensive Statistics</h1>
        <p className="text-slate-600 dark:text-slate-400 mt-1">An in-depth look at all user and parcel metrics from the database.</p>
      </div>

      {/* User Statistics Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Users className="w-5 h-5 mr-2 text-blue-500" /> User Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Users" value={userStats?.totalUsers ?? 0} icon={Users} details={`+${userStats?.newUsersInLast30Days ?? 0} in last 30 days`} className="bg-gradient-to-br from-blue-500 to-blue-700" />
          <StatCard title="Active Users" value={userStats?.totalActiveUsers ?? 0} icon={UserCheck} details={`+${userStats?.newUsersInLast7Days ?? 0} new this week`} className="bg-gradient-to-br from-green-500 to-green-700" />
          <StatCard title="Inactive Users" value={userStats?.totalInActiveUsers ?? 0} icon={UserX} className="bg-gradient-to-br from-amber-500 to-amber-600" />
          <StatCard title="Blocked Users" value={userStats?.totalBlockedUsers ?? 0} icon={UserX} className="bg-gradient-to-br from-red-500 to-red-700" />
        </div>
      </div>

      {/* Parcel Statistics Cards */}
      <div>
        <h2 className="text-xl font-semibold mb-4 flex items-center"><Package className="w-5 h-5 mr-2 text-violet-500" /> Parcel Statistics</h2>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <StatCard title="Total Parcels" value={parcelStats?.totalParcel ?? 0} icon={Package} details={`+${parcelStats?.parcelCreatedInLast30Days ?? 0} in last 30 days`} className="bg-gradient-to-br from-violet-500 to-violet-700" />
          <StatCard title="Avg. Fee" value={`৳${(parcelStats?.avgFeePerParcel?.[0]?.avgFee || 0).toFixed(2)}`} icon={CircleDollarSign} details="Per parcel" className="bg-gradient-to-br from-cyan-500 to-cyan-600" />
          <StatCard title="Unique Senders" value={parcelStats?.totalParcelCreatedByUniqueSender ?? 0} icon={Users} className="bg-gradient-to-br from-sky-500 to-sky-700" />
          <StatCard title="Unique Receivers" value={parcelStats?.totalParcelReceiverByUniqueReceiver ?? 0} icon={Users} className="bg-gradient-to-br from-teal-500 to-teal-700" />
        </div>
      </div>
      
      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardHeader><CardTitle className="flex items-center"><PieIcon className="w-5 h-5 mr-2" />User Role Distribution</CardTitle></CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <PieChart>
                          <Pie data={formatChartData(userStats?.usersByRole)} dataKey="count" nameKey="name" cx="50%" cy="50%" outerRadius={90} label>
                              {formatChartData(userStats?.usersByRole).map((_, index) => (
                                  <Cell key={`cell-${index}`} fill={["#3B82F6", "#10B981", "#F97316", "#8B5CF6"][index % 4]} />
                              ))}
                          </Pie>
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} itemStyle={{color: '#cbd5e1'}} />
                          <Legend />
                      </PieChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>

          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardHeader><CardTitle className="flex items-center"><BarChart2 className="w-5 h-5 mr-2" />Parcel Status</CardTitle></CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <BarChart data={formatChartData(parcelStats?.totalParcelByStatus)} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                          <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
                          <Bar dataKey="count" fill="#8B5CF6" radius={[4, 4, 0, 0]} />
                      </BarChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>
          
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
              <CardHeader><CardTitle className="flex items-center"><LineChart className="w-5 h-5 mr-2" />New Parcels Trend</CardTitle></CardHeader>
              <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                      <ComposedChart data={parcelGrowthData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                          <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} />
                          <YAxis stroke="#a1a1aa" fontSize={12} />
                          <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} />
                          <Legend />
                          <Line type="monotone" dataKey="newParcels" name="New Parcels" stroke="#34D399" strokeWidth={2} />
                      </ComposedChart>
                  </ResponsiveContainer>
              </CardContent>
          </Card>

          {/* ✅ New Tabbed Chart for Parcel Types and Shipping Methods */}
          <Card className="border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
            <CardHeader>
              <CardTitle className="flex items-center"><Blocks className="w-5 h-5 mr-2" />Parcel Breakdown</CardTitle>
            </CardHeader>
            <CardContent>
                <Tabs defaultValue="type">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="type">By Type</TabsTrigger>
                        <TabsTrigger value="shipping">By Shipping Method</TabsTrigger>
                    </TabsList>
                    <TabsContent value="type">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={formatChartData(parcelStats?.parcelPerType)} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
                                <Bar dataKey="count" fill="#3B82F6" radius={[4, 4, 0, 0]} />
                            </BarChart>
                        </ResponsiveContainer>
                    </TabsContent>
                    <TabsContent value="shipping">
                        <ResponsiveContainer width="100%" height={250}>
                            <BarChart data={formatChartData(parcelStats?.parcelPerShippingType)} margin={{ top: 20, right: 20, left: -10, bottom: 5 }}>
                                <XAxis dataKey="name" stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#a1a1aa" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip contentStyle={{ backgroundColor: '#1e293b', border: 'none', borderRadius: '0.5rem' }} cursor={{fill: 'rgba(100, 116, 139, 0.1)'}} />
                                <Bar dataKey="count" fill="#10B981" radius={[4, 4, 0, 0]} />
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