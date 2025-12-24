import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import {
    Area,
    AreaChart,
    Bar,
    BarChart,
    CartesianGrid,
    Legend,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";

const parcelData = [
  { month: "Jan", booked: 4000, delivered: 2400 },
  { month: "Feb", booked: 3000, delivered: 1398 },
  { month: "Mar", booked: 2000, delivered: 9800 },
  { month: "Apr", booked: 2780, delivered: 3908 },
  { month: "May", booked: 1890, delivered: 4800 },
  { month: "Jun", booked: 2390, delivered: 3800 },
  { month: "Jul", booked: 3490, delivered: 4300 },
];

const revenueData = [
  { month: "Jan", revenue: 24000 },
  { month: "Feb", revenue: 13980 },
  { month: "Mar", revenue: 98000 },
  { month: "Apr", revenue: 39080 },
  { month: "May", revenue: 48000 },
  { month: "Jun", revenue: 38000 },
  { month: "Jul", revenue: 43000 },
];

export default function AdminReports() {
  return (
    <div className='space-y-6 animate-fade-in-up'>
      <div className='flex items-center justify-between'>
        <h1 className='text-3xl font-bold tracking-tight text-slate-900 dark:text-white'>
          System Reports
        </h1>
      </div>

      <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
        {/* Parcel Statistics */}
        <Card className="dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Parcel Statistics</CardTitle>
            <CardDescription>
              Booked vs Delivered parcels over the last 7 months
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <BarChart data={parcelData}>
                  <CartesianGrid strokeDasharray='3 3' className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey='month' className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Legend />
                  <Bar dataKey='booked' fill='#3b82f6' name='Booked' radius={[4, 4, 0, 0]} />
                  <Bar dataKey='delivered' fill='#22c55e' name='Delivered' radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Revenue Growth */}
        <Card className="dark:bg-slate-800/50">
          <CardHeader>
            <CardTitle>Revenue Growth</CardTitle>
            <CardDescription>
              Monthly revenue trends analysis
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className='h-[300px] w-full'>
              <ResponsiveContainer width='100%' height='100%'>
                <AreaChart data={revenueData}>
                  <defs>
                    <linearGradient id='colorRevenue' x1='0' y1='0' x2='0' y2='1'>
                      <stop offset='5%' stopColor='#8884d8' stopOpacity={0.8} />
                      <stop offset='95%' stopColor='#8884d8' stopOpacity={0} />
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray='3 3' className="stroke-slate-200 dark:stroke-slate-700" />
                  <XAxis dataKey='month' className="text-xs" />
                  <YAxis className="text-xs" />
                  <Tooltip 
                    contentStyle={{ backgroundColor: 'var(--background)', borderColor: 'var(--border)' }}
                    itemStyle={{ color: 'var(--foreground)' }}
                  />
                  <Area
                    type='monotone'
                    dataKey='revenue'
                    stroke='#8884d8'
                    fillOpacity={1}
                    fill='url(#colorRevenue)'
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
