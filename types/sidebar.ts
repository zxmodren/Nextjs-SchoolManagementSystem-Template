import { UserRole } from "@prisma/client";
import { UserStatus } from "@prisma/client";

export type SideNavItem = {
  allowedRole: UserRole[];
  allowedStatus: UserStatus[];
  title: string;
  path: string;
  icon?: JSX.Element;
  submenu?: boolean;
  subMenuItems?: SideNavItem[];
};

export type SideNavItemGroup = {
  title: string;
  allowedRole: UserRole[];
  allowedStatus: UserStatus[];
  menuList: SideNavItem[];
};
