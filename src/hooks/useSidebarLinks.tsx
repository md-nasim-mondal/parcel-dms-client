/* eslint-disable @typescript-eslint/no-explicit-any */
import { useMemo } from "react";
import { role } from "@/constants/role";
import { useAuth } from "@/hooks/useAuth";
import {
  Package,
  PackagePlus,
  Truck,
  Users, // This import was missing
  History, // This import was missing
  LayoutGrid,
} from "lucide-react";

// This helper function is correct and needs no changes.
export const getRoleBasedPathPrefix = (
  userRole: string | undefined
): string => {
  if (!userRole) return "";
  switch (userRole) {
    case role.superAdmin:
      return "/admin";
    case role.deliveryPersonnel:
      return "/delivery-personnel";
    default:
      return `/${userRole.toLowerCase()}`;
  }
};

// This data structure is correct and needs no changes.
export const navLinkGroups = [
  {
    title: "Parcels",
    links: [
      {
        title: "Manage All Parcels",
        url: "/manage-parcels",
        icon: Package,
        roles: [role.superAdmin, role.admin],
      },
      {
        title: "Create Parcel",
        url: "/create-parcel",
        icon: PackagePlus,
        roles: [role.sender, role.admin, role.superAdmin],
      },
      {
        title: "My Parcels",
        url: "/my-parcels",
        icon: Package,
        roles: [role.sender],
      },
      {
        title: "Incoming Parcels",
        url: "/incoming-parcels",
        icon: Truck,
        roles: [role.receiver],
      },
      {
        title: "Delivery History",
        url: "/delivery-history",
        icon: History,
        roles: [role.receiver, role.deliveryPersonnel],
      },
      {
        title: "My Tasks",
        url: "/my-tasks",
        icon: Truck,
        roles: [role.deliveryPersonnel],
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
        roles: [role.superAdmin, role.admin],
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
        links: group.links.filter((link) =>
          link.roles.includes(userRole as string)
        ),
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
