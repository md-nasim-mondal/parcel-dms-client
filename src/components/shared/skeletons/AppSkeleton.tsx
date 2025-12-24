import { Skeleton } from "@/components/ui/skeleton";

export const AppContentSkeleton = () => {
  return (
      <main className='flex-1 flex flex-col overflow-x-hidden'>
        {/* Hero Section */}
        <div className='relative overflow-hidden pt-16 md:pt-20 pb-12'>
          <div className='container mx-auto px-4 text-center'>
            <div className='flex flex-col items-center space-y-6'>
               <Skeleton className='h-12 w-3/4 md:w-1/2' />
               <Skeleton className='h-6 w-full md:w-2/3' />
               <div className='flex gap-4 mt-8'>
                  <Skeleton className='h-12 w-36 rounded-md' />
                  <Skeleton className='h-12 w-36 rounded-md' />
               </div>
            </div>
          </div>
        </div>

        {/* Feature Grid Skeleton */}
        <div className='container mx-auto px-4 py-16'>
           <div className='grid grid-cols-1 md:grid-cols-3 gap-8'>
              {[1, 2, 3].map((i) => (
                <div key={i} className='space-y-4 p-6 border rounded-lg'>
                   <Skeleton className='h-10 w-10 rounded-md' />
                   <Skeleton className='h-6 w-1/2' />
                   <Skeleton className='h-4 w-full' />
                   <Skeleton className='h-4 w-3/4' />
                </div>
              ))}
           </div>
        </div>
      </main>
  );
};

const AppSkeleton = () => {
  return (
    <div className='min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950'>
      {/* Navbar Skeleton */}
      <header className='sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60'>
        <div className='container mx-auto px-4 h-16 flex items-center justify-between'>
          <div className='flex items-center gap-2'>
            <Skeleton className='h-8 w-8 rounded-full' />
            <Skeleton className='h-6 w-32' />
          </div>
          <div className='hidden md:flex items-center gap-6'>
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-20' />
            <Skeleton className='h-4 w-20' />
          </div>
          <div className='flex items-center gap-4'>
            <Skeleton className='h-9 w-24 rounded-md' />
            <Skeleton className='h-9 w-24 rounded-md' />
          </div>
        </div>
      </header>

      <AppContentSkeleton />

      {/* Footer Skeleton */}
      <footer className='border-t bg-background py-8'>
        <div className='container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8'>
           {[1, 2, 3, 4].map((i) => (
             <div key={i} className='space-y-3'>
                <Skeleton className='h-5 w-24' />
                <div className='space-y-2'>
                  <Skeleton className='h-4 w-full' />
                  <Skeleton className='h-4 w-2/3' />
                  <Skeleton className='h-4 w-3/4' />
                </div>
             </div>
           ))}
        </div>
      </footer>
    </div>
  );
};

export default AppSkeleton;
