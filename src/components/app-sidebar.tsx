import * as React from "react";
import { NavMain } from "@/components/nav-main";
import { NavUser } from "@/components/nav-user";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarRail,
  SidebarTrigger,
  useSidebar,
} from "@/components/ui/sidebar";
import { useAuth } from "@/hooks/useAuth";
import { Link } from "react-router"; // Use react-router-dom
import { Logo1 } from "@/assets/icons/Logo";
import { useSidebarLinks } from "@/hooks/useSidebarLinks";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { state } = useSidebar();
  // We don't need pathPrefix here as it's handled inside the custom hook
  const navItems = useSidebarLinks();

  return (
    <Sidebar
      // I've updated the background color slightly for a more modern dark theme feel
      className='bg-slate-50 dark:bg-slate-900 border-r dark:border-slate-800 shadow-lg'
      collapsible='icon'
      {...props}>
      {/* SidebarHeader remains mostly the same */}
      <SidebarHeader
        className={`${
          state === "expanded" ? "px-5" : "px-1"
        } border-b dark:border-slate-700`}>
        <div className='flex h-14 items-center justify-between'>
          {state === "expanded" ? (
            <Link to={navItems[0]?.links[0]?.url || "/"}>
              <Logo1 size='sm' isExpended={state === "expanded"} />
            </Link>
          ) : (
            <Link to={navItems[0]?.links[0]?.url || "/"}>
              <Logo1 size='sm' />
            </Link>
          )}
          <SidebarTrigger className='-ml-1 md:hidden' />
        </div>
        {state === "expanded" && (
          <p className='pb-4 text-xs text-gray-500 dark:text-gray-400 capitalize'>
            {user?.role === "super_admin"
              ? "Super Admin"
              : user?.role === "delivery_personnel"
              ? "Delivery Personnel"
              : user?.role}{" "}
            Panel
          </p>
        )}
      </SidebarHeader>

      {/* ========== MAIN UI IMPROVEMENT AREA START ========== */}
      <SidebarContent className='flex h-full flex-col px-3 py-4'>
        {navItems.map((group, index) => (
          <div key={index} className='mb-2'>
            {/* Render title only if it exists */}
            {group.title && (
              <h2 className='px-4 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider first:pt-0'>
                {group.title}
              </h2>
            )}
            {/* The NavMain component will render the links */}
            <NavMain items={group.links} />
          </div>
        ))}
      </SidebarContent>
      {/* ========== MAIN UI IMPROVEMENT AREA END ========== */}

      <SidebarFooter className='border-t dark:border-slate-700'>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
