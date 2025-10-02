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
import { Outlet, useLocation, Link } from "react-router"; // Import Link
import { ModeToggle } from "./ModeToggler";
import { Home } from "lucide-react";
import { Fragment } from "react/jsx-runtime";

// Helper function to generate breadcrumbs from the pathname
const generateBreadcrumbs = (pathname: string) => {
  const pathParts = pathname.split("/").filter((part) => part);
  // Example: /admin/dashboard/all-parcels -> ["admin", "dashboard", "all-parcels"]

  if (pathParts.length < 2) return null; // Don't show on base dashboard

  // We are interested in parts after "dashboard"
  const dashboardIndex = pathParts.indexOf("dashboard");
  const breadcrumbParts = pathParts.slice(dashboardIndex + 1);

  return breadcrumbParts.map((part, index) => {
    const isLast = index === breadcrumbParts.length - 1;
    const text = part
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase()); // "all-parcels" -> "All Parcels"

    // We can build a link for parts that are not the last one, if needed.
    // For simplicity, we'll just show the path.
    return (
      <Fragment key={part}>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          {isLast ? (
            <BreadcrumbPage>{text}</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              {/* This link logic can be improved to navigate to parent paths */}
              <span className='text-muted-foreground'>{text}</span>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
      </Fragment>
    );
  });
};

export default function DashboardLayout() {
  const location = useLocation();
  const breadcrumbItems = generateBreadcrumbs(location.pathname);

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset className='bg-slate-50 dark:bg-slate-950'>
        <header className='flex h-16 shrink-0 items-center gap-4 px-4 md:px-6 sticky top-0 bg-slate-50 dark:bg-slate-950 border-b dark:border-slate-800 z-10'>
          <div className='flex items-center gap-2'>
            <SidebarTrigger className='-ml-1' />
            <Breadcrumb>
              <BreadcrumbList>
                <BreadcrumbItem>
                  <BreadcrumbLink asChild>
                    <Link to='/'>
                      <Home className='h-4 w-4' />
                    </Link>
                  </BreadcrumbLink>
                </BreadcrumbItem>
                {/* Dynamic breadcrumb items will be rendered here */}
                {breadcrumbItems}
              </BreadcrumbList>
            </Breadcrumb>
          </div>

          <div className='ml-auto'>
            <ModeToggle />
          </div>
        </header>

        <main className='flex flex-1 flex-col gap-6 p-4 md:p-6'>
          {/* Outlet renders the specific dashboard page (e.g., Statistics, Manage Parcels) */}
          <Outlet />
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
