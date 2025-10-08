/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { useAuth } from "@/hooks/useAuth";
import {
  Package,
  PackagePlus,
  Truck,
  Users, // This import was missing
  History, // This import was missing
  LayoutGrid,
  type LucideIcon,
} from "lucide-react";
import { Role } from "@/types/user.type";

// This helper function is correct and needs no changes.
export const getRoleBasedPathPrefix = (
  userRole: string | undefined
): string => {
  if (!userRole) return "";
  switch (userRole) {
    case Role.SUPER_ADMIN:
      return "/admin";
    case Role.DELIVERY_PERSONNEL:
      return "/delivery-personnel";
    default:
      return `/${userRole.toLowerCase()}`;
  }
};

interface NavLink {
  title: string;
  url: string;
  icon: LucideIcon;
  roles: Role[];
}

interface NavLinkGroup {
  title: string;
  links: NavLink[];
}

// This data structure is correct and needs no changes.
export const navLinkGroups: NavLinkGroup[] = [
  {
    title: "Parcels",
    links: [
      {
        title: "Manage All Parcels",
        url: "/manage-parcels",
        icon: Package,
        roles: [Role.SUPER_ADMIN, Role.ADMIN],
      },
      {
        title: "Create Parcel",
        url: "/create-parcel",
        icon: PackagePlus,
        roles: [Role.SENDER],
      },
      {
        title: "My Parcels",
        url: "/my-parcels",
        icon: Package,
        roles: [Role.SENDER],
      },
      {
        title: "Incoming Parcels",
        url: "/incoming-parcels",
        icon: Truck,
        roles: [Role.RECEIVER],
      },
      {
        title: "Delivery History",
        url: "/delivery-history",
        icon: History,
        roles: [Role.RECEIVER, Role.DELIVERY_PERSONNEL],
      },
      {
        title: "My Tasks",
        url: "/my-tasks",
        icon: Truck,
        roles: [Role.DELIVERY_PERSONNEL],
      },
    ],
  },
  {
    title: "Users",
    links: [
      {
        title: "Manage Users",
        url: "/manage-users",
        icon: Users,
        roles: [Role.SUPER_ADMIN, Role.ADMIN],
      },
    ],
  },
];

/**
 * A custom hook that generates role-based dashboard navigation links.
 * It encapsulates the logic for filtering and creating dynamic URLs.
 */
export function useSidebarLinks() {
  const { user } = useAuth();
  const pathPrefix = getRoleBasedPathPrefix(user?.role);

  const navItems = useMemo(() => {
    const userRole = user?.role;
    if (!userRole) return []; // Return empty array if user/role is not available

    const dashboardPrefix = `${pathPrefix}/dashboard`;

    const addPrefixToUrls = (links: any[]) =>
      links.map((link) => ({
        ...link,
        url: `${dashboardPrefix}${link.url}`,
      }));

    // Group for the main "Dashboard" link, with no title.
    const topGroup = {
      title: "Dashboard",
      links: addPrefixToUrls([
        { title: "Statistics", url: "", icon: LayoutGrid },
      ]),
    };

    const filteredGroups = navLinkGroups
      .map((group) => ({
        ...group,
        links: group.links.filter((link) => link.roles.includes(userRole)),
      }))
      .filter((group) => group.links.length > 0)
      .map((group) => ({
        ...group,
        links: addPrefixToUrls(group.links),
      }));

    // Optional: Group for the "Settings" link
    // const bottomGroup = {
    //   title: "",
    //   links: addPrefixToUrls([
    //     { title: "Settings", url: "/settings", icon: Settings },
    //   ]),
    // };

    return [topGroup, ...filteredGroups];
  }, [user?.role, pathPrefix]);

  // A custom hook must return a value.
  return navItems;
}
