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
import { Link } from "react-router";
import { Logo1 } from "@/assets/icons/Logo";
import { useSidebarLinks } from "@/hooks/useSidebarLinks";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { user } = useAuth();
  const { state, setOpen, open } = useSidebar();
  const navItems = useSidebarLinks();

  return (
    <Sidebar
      // Change: Updated sidebar background and border for depth
      className='bg-white dark:bg-slate-950 border-r border-slate-200 dark:border-slate-600 shadow-lg'
      collapsible='icon'
      {...props}>
      <SidebarHeader
        // Change: Consistent border color
        className={`${
          state === "expanded" ? "px-5" : "px-1"
        } border-b border-slate-200 dark:border-slate-600`}>
        <div className='flex h-16 items-center justify-between'>
          {state === "expanded" ? (
            <Link to={"/"}>
              <Logo1 size='sm' isExpended={state === "expanded"} />
            </Link>
          ) : (
            <div onClick={() => setOpen(!open)} className="mx-auto text-center">
              <Logo1 size='sm' />
            </div>
          )}
          <SidebarTrigger className='-ml-1 md:hidden' />
        </div>
        {state === "expanded" && (
          <p className='pb-4 text-xs text-muted-foreground capitalize'>
            {user?.role === "super_admin"
              ? "Super Admin"
              : user?.role === "delivery_personnel"
              ? "Delivery Personnel"
              : user?.role}{" "}
            Dashboard Panel
          </p>
        )}
      </SidebarHeader>

      <SidebarContent className='flex h-full flex-col py-4'>
        {navItems.map((group, index) => (
          <div key={index} className='mb-2'>
            {group.title && (
              <h2 className={`py-2 font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider ${state === "expanded" ? "px-4 text-xs" : "text-center text-[8px]"}`}>
                {group.title}
              </h2>
            )}
            <NavMain items={group.links} />
          </div>
        ))}
      </SidebarContent>

      {/* Change: Consistent border color */}
      <SidebarFooter className='border-t border-slate-200 dark:border-slate-600'>
        <NavUser user={user} />
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
}
