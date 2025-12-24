import { Skeleton } from "@/components/ui/skeleton";

export const DashboardContentSkeleton = () => {
    return (
        <div className='flex-1 overflow-y-auto p-4 md:p-6 space-y-6'>
            {/* Section Header */}
            <div className='flex items-center justify-between'>
                <div className='space-y-1'>
                    <Skeleton className='h-8 w-48' />
                    <Skeleton className='h-4 w-64' />
                </div>
                <Skeleton className='h-10 w-32 rounded-md' />
            </div>

            {/* Cards Grid */}
            <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
                {[1, 2, 3].map((i) => (
                    <Skeleton key={i} className='h-32 w-full rounded-xl' />
                ))}
            </div>

            {/* Table/Content Area */}
            <div className='space-y-4'>
                <div className='flex gap-2'>
                    <Skeleton className='h-10 w-full max-w-sm rounded-md' />
                    <Skeleton className='h-10 w-24 rounded-md' />
                </div>
                <Skeleton className='h-96 w-full rounded-md' />
            </div>
        </div>
    );
};

const DashboardSkeleton = () => {
  return (
    <div className='flex h-screen w-full bg-slate-100 dark:bg-slate-800 overflow-hidden'>
      {/* Sidebar Skeleton */}
      <div className='hidden md:flex w-64 flex-col gap-4 border-r bg-sidebar p-4 dark:bg-slate-900'>
        <div className='flex items-center gap-2 px-2'>
           <Skeleton className='h-8 w-8 rounded-lg' />
           <Skeleton className='h-6 w-32' />
        </div>
        <div className='mt-8 space-y-1'>
           {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className='flex items-center gap-3 px-2 py-2'>
                 <Skeleton className='h-5 w-5 rounded-md' />
                 <Skeleton className='h-4 w-full' />
              </div>
           ))}
        </div>
      </div>

      {/* Main Content Area */}
      <div className='flex flex-col flex-1 min-w-0 h-full bg-slate-100 dark:bg-slate-900'>
        {/* Header Skeleton */}
        <header className='flex h-16 shrink-0 items-center justify-between gap-4 px-4 md:px-6 sticky top-0 bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-20'>
           <div className='flex items-center gap-3'>
              <Skeleton className='h-8 w-8 rounded-md md:hidden' /> {/* Mobile toggle */}
              <div className='flex gap-2 items-center'>
                 <Skeleton className='h-4 w-16' />
                 <span className='text-muted-foreground'>/</span>
                 <Skeleton className='h-4 w-24' />
              </div>
           </div>
           <div>
              <Skeleton className='h-9 w-9 rounded-full' />
           </div>
        </header>

        {/* Scrollable Main Body Skeleton */}
        <DashboardContentSkeleton />
      </div>
    </div>
  );
};

export default DashboardSkeleton;
