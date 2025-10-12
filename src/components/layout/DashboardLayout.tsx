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
import { Outlet, useLocation, Link } from "react-router"; // Link import
import { ModeToggle } from "./ModeToggler";
import React from "react";

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
  const userRolePath =
    location.pathname.split("/").filter((part) => part)[0] || "admin";

  return (
    <SidebarProvider>
      <div className='flex h-screen w-full bg-slate-100 dark:bg-slate-800 overflow-hidden'>
        {/* Sidebar */}
        <AppSidebar />

        {/* Main Content Area */}
        <SidebarInset className='flex flex-col flex-1 min-w-0 h-full bg-slate-100 dark:bg-slate-900'>
          {/* Header (This is now "sticky" because of the layout) */}
          <header className='flex h-16 shrink-0 items-center justify-between gap-4 px-4 md:px-6 sticky top-0 bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-20'>
            <div className='flex items-center gap-2'>
              <SidebarTrigger className='-ml-1' />
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <Link
                        className='flex gap-1 items-center'
                        to={`/${userRolePath}/dashboard`}>
                        dashboard
                      </Link>
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

          {/* Scrollable Main Body */}
          <div className='flex-1 overflow-y-auto p-4 md:p-6'>
            <Outlet />
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
