import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import { SideNavItemGroup } from "@/types/sidebar";
import React from "react";
import { SidebarItems } from "./SidebarItems";
import classNames from "classnames";
import { useCurrentRole } from "@/hooks/use-current-role";
import { useCurrentStatus } from "@/hooks/use-current-status";

const SideBarMenuGroup = ({ menuGroup }: { menuGroup: SideNavItemGroup }) => {
  const role = useCurrentRole();
  const status = useCurrentStatus();
  const { toggleCollapse } = useSideBarToggle();

  const menuGroupTitleSyle = classNames(
    "ml-4 text-sm font-semibold text-white dark:text-bodydark2",
    {
      "text-center": toggleCollapse,
    }
  );

  if (!role || !menuGroup.allowedRole.includes(role)) {
    return null;
  }
  if (!status || !menuGroup.allowedStatus.includes(status)) {
    return null;
  }
  return (
    <>
      <h3 className={menuGroupTitleSyle}>
        {!toggleCollapse ? menuGroup.title : "..."}
      </h3>
      {menuGroup.menuList?.map((item, index) => {
        return <SidebarItems key={index} item={item} />;
      })}
    </>
  );
};

export default SideBarMenuGroup;
