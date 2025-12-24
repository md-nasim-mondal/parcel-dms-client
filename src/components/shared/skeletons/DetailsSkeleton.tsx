import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader } from "@/components/ui/card";

export default function DetailsSkeleton() {
  return (
    <div className='space-y-8 animate-pulse'>
      {/* Hero / Header Skeleton */}
      <div className='bg-slate-100 dark:bg-slate-800/50 rounded-2xl p-8 mb-8'>
        <div className='max-w-3xl mx-auto text-center space-y-4'>
          <Skeleton className='h-12 w-24 mx-auto rounded-full bg-slate-200 dark:bg-slate-700' />
          <Skeleton className='h-10 w-3/4 mx-auto bg-slate-200 dark:bg-slate-700' />
          <Skeleton className='h-6 w-1/2 mx-auto bg-slate-200 dark:bg-slate-700' />
        </div>
      </div>

      <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
        {/* Main Content */}
        <div className='lg:col-span-2 space-y-8'>
          <Card className="border-0 shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-1/3 mb-2 bg-slate-200 dark:bg-slate-700" />
            </CardHeader>
            <CardContent className="space-y-4">
              <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-full bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-4 w-5/6 bg-slate-200 dark:bg-slate-700" />
              <Skeleton className="h-40 w-full rounded-xl bg-slate-200 dark:bg-slate-700" />
            </CardContent>
          </Card>
          
           <Card className="border-0 shadow-sm">
            <CardHeader>
              <Skeleton className="h-8 w-1/3 mb-2 bg-slate-200 dark:bg-slate-700" />
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4">
               {[1,2,3,4].map(i => (
                  <Skeleton key={i} className="h-24 w-full rounded-lg bg-slate-200 dark:bg-slate-700" />
               ))}
            </CardContent>
          </Card>
        </div>

        {/* Sidebar */}
        <div className='space-y-6'>
          <Card className="border-0 shadow-sm">
            <CardContent className="p-6 space-y-4">
               <Skeleton className="h-8 w-full bg-slate-200 dark:bg-slate-700" />
               <Skeleton className="h-32 w-full bg-slate-200 dark:bg-slate-700" />
               <Skeleton className="h-12 w-full bg-slate-200 dark:bg-slate-700" />
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
