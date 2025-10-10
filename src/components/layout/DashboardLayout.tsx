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
              <span className="text-muted-foreground">{text}</span>
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
      <div className="flex min-h-screen w-full overflow-x-hidden bg-slate-100 dark:bg-slate-900">
        {/* Sidebar */}
        <AppSidebar />

        {/* Main content */}
        <SidebarInset className="flex flex-col flex-1 min-w-0 bg-slate-100 dark:bg-slate-900">
          {/* Header */}
          <header className="flex flex-wrap items-center justify-between gap-2 h-16 px-3 sm:px-4 md:px-6 sticky top-0 bg-white/80 dark:bg-slate-950/60 backdrop-blur-sm border-b border-slate-200 dark:border-slate-800 z-10">
            <div className="flex items-center gap-2 flex-wrap">
              <SidebarTrigger className="-ml-1" />
              <Breadcrumb>
                <BreadcrumbList className="flex flex-wrap text-sm sm:text-base">
                  <BreadcrumbItem>
                    <BreadcrumbLink asChild>
                      <span className="text-muted-foreground">Dashboard</span>
                    </BreadcrumbLink>
                  </BreadcrumbItem>
                  {breadcrumbItems}
                </BreadcrumbList>
              </Breadcrumb>
            </div>
            <ModeToggle />
          </header>

          {/* Main Body */}
          <main
            className="
              flex-1
              w-full
              overflow-x-auto
              overflow-y-auto
              p-2 sm:p-4 md:p-6
              min-w-0
            "
          >
            <div className="w-full md:min-w-[600px] min-w-full">
              <Outlet />
            </div>
          </main>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
}
