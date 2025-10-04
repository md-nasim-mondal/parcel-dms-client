import { AppSidebar } from "@/components/app-sidebar";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar";
import { Outlet, useLocation } from "react-router";
import { ModeToggle } from "./ModeToggler";
import React from "react";

// Helper function to generate breadcrumbs from the pathname
const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split("/").filter((part) => part);
  const dashboardIndex = pathParts.indexOf("dashboard");

  if (dashboardIndex === -1 || pathParts.length <= dashboardIndex + 1) {
    return null;
  }

  const breadcrumbParts = pathParts.slice(dashboardIndex + 1);

  return breadcrumbParts.map((part, index) => {
    const isLast = index === breadcrumbParts.length - 1;
    const text = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());

    return (
      <React.Fragment key={part}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{text}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <span className='text-muted-foreground'>{text}</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </React.Fragment>
    );
  });
};

export default function DashboardLayout() {
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbs(location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      {/* Change: Updated background colors for a better theme */}
      <SidebarInset className='bg-slate-100 dark:bg-slate-900'>
        {/* Change: Updated header background and border */}
        <header className='flex h-16 shrink-0 items-center gap-4 px-4 md:px-6 sticky top-0 bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-10'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <span className='text-muted-foreground'>Dashboard</span>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {breadcrumbItems}
              </BreadcrumbList>
            </Breadcrumb>
          </div>
          <div className='ml-auto'>
            <ModeToggle />
          </div>
        </header>

        <main className='flex flex-1 flex-col gap-6 p-4 md:p-6'>
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
