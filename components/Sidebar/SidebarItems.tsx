"user client";
import { SideNavItem } from "@/types/sidebar";
import React, { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import classNames from "classnames";
import { useSideBarToggle } from "@/hooks/sidebar-toggle";
import { useCurrentRole } from "@/hooks/use-current-role";
export const SidebarItems = ({ item }: { item: SideNavItem }) => {
  const { toggleCollapse } = useSideBarToggle();
  const role = useCurrentRole();
  const pathname = usePathname();

  const [subMenuOpen, setSubMenuOpen] = useState(false);

  const toggleSubMenu = () => {
    setSubMenuOpen(!subMenuOpen);
  };

  const inactiveLink = classNames(
    "h-200 text-sidebar-foreground py-2 pl-1  rounded-md transition duration-200",
    { ["justify-start"]: toggleCollapse }
  );

  const activeLink =
    "font-medium text-bodydark1 bg-blue-700 rounded-r-full disabled";

  const navMenuDropdownItem =
    "dark:text-bodydark2 dark:hover:text-white border border-blue-400 dark:border-boxdark py-2  text-black hover:text-white hover:bg-blue-600 hover:rounded-r-full hover:text-white rounded-md ";

  // Memeriksa apakah role termasuk dalam allowedRole
  if (!role || !item.allowedRole.includes(role)) {
    return null;
  }
  return (
    <>
      {item.submenu ? (
        <div>
          <button
            className="w-[17rem] group relative flex items-center gap-2.5 rounded-md pl-4 pr-8 my-2 py-4 ml-2 font-medium hover:text-bodydark1 text-black border border-blue-700 hover:border-bodydark1 bg-bodydark1 hover:bg-blue-700 dark:hover:bg-meta-4 dark:bg-meta-4 dark:border-boxdark dark:text-bodydark duration-300 ease-in-out "
            onClick={toggleSubMenu}
          >
            <div>{item.icon}</div>
            {!toggleCollapse && (
              <>
                <span className="ml-3 text-base leading-6 font-semibold">
                  {item.title}
                </span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className={`${subMenuOpen ? "rotate-90" : ""} ml-auto h-4 w-4 stroke-2 text-xs`}
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M6.293 5.293a1 1 0 011.414 0L10 8.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414zM10 16a1 1 0 110-2 1 1 0 010 2zM6 10a1 1 0 100-2 1 1 0 000 2zm8 0a1 1 0 100-2 1 1 0 000 2z"
                    clipRule="evenodd"
                  />
                </svg>
              </>
            )}
          </button>
          {subMenuOpen && !toggleCollapse && (
            <div>
              <div className="grid gap-y-2 px-10 leading-5 ml-3 mr-3 ease-linear dark:text-bodydark2 dark:border-boxdark border-blue-700 border rounded-r-lg bg-blue-100 dark:bg-meta-4 py-4 transition">
                {item.subMenuItems?.map((subItem, idx) => (
                  <Link
                    key={idx}
                    href={subItem.path}
                    className={`${navMenuDropdownItem} ${
                      subItem.path === pathname ? activeLink : ""
                    }`}
                  >
                    <button
                      className={`${
                        subItem.path === pathname
                          ? "text-white group relative flex items-center gap-2.5 rounded-md px-4 font-medium"
                          : "group relative flex items-center gap-2.5 rounded-md px-4 font-medium duration-300 ease-in-out"
                      }`}
                    >
                      <div>{subItem.icon}</div>
                      {!toggleCollapse && (
                        <span className="ml-3 w-200 leading-6 font-semibold">
                          {subItem.title}
                        </span>
                      )}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      ) : (
        <Link
          href={item.path}
          className={`${inactiveLink} ${item.path === pathname ? "active" : ""}`}
        >
          <button
            className={`${
              item.path === pathname
                ? "w-[17rem] group relative flex items-center gap-2.5 rounded-r-full px-4 my-2 py-4 font-medium border border-bodydark1  text-bodydark1 bg-blue-700 disabled"
                : "w-[17rem] group relative flex items-center gap-2.5 hover:rounded-r-full px-4 my-0.5 py-4 font-medium duration-300ease-in-out dark:text-bodydark2 hover:text-bodydark1 text-black border border-blue-700 hover:border-bodydark1 bg-bodydark1 hover:bg-blue-700 dark:hover:bg-meta-4 dark:bg-meta-4 dark:border-boxdark"
            }`}
          >
            <div className="min-w-[20px]">{item.icon}</div>
            {!toggleCollapse && (
              <span className="ml-3 w-200 leading-6 font-semibold">
                {item.title}
              </span>
            )}
          </button>
        </Link>
      )}
    </>
  );
};
