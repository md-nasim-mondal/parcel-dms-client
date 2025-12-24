import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";

interface CardGridSkeletonProps {
  count?: number;
}

export default function CardGridSkeleton({ count = 6 }: CardGridSkeletonProps) {
  return (
    <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
      {Array.from({ length: count }).map((_, i) => (
        <Card key={i} className='overflow-hidden border-0 shadow-sm'>
          <div className='h-48 w-full'>
            <Skeleton className='h-full w-full bg-slate-200 dark:bg-slate-700' />
          </div>
          <CardHeader className='space-y-2 p-4'>
            <Skeleton className='h-6 w-3/4 bg-slate-200 dark:bg-slate-700' />
            <Skeleton className='h-4 w-1/2 bg-slate-200 dark:bg-slate-700' />
          </CardHeader>
          <CardContent className='p-4 pt-0'>
            <Skeleton className='h-20 w-full bg-slate-200 dark:bg-slate-700' />
          </CardContent>
          <CardFooter className='p-4 pt-0 flex justify-between'>
            <Skeleton className='h-10 w-24 bg-slate-200 dark:bg-slate-700' />
            <Skeleton className='h-10 w-24 bg-slate-200 dark:bg-slate-700' />
          </CardFooter>
        </Card>
      ))}
    </div>
  );
}
