import { SideNavItemGroup } from "@/types/sidebar";
import { BsEnvelope, BsHouseDoor, BsQuestionCircle } from "react-icons/bs";
import { FiUser, FiBook } from "react-icons/fi";
import { PiUserListLight, PiCalendarCheck } from "react-icons/pi";
import { IoSchoolOutline } from "react-icons/io5";
import { LuSchool2 } from "react-icons/lu";
import { MdOutlineAssignment } from "react-icons/md";
import { UserRole, UserStatus } from "@prisma/client";

export const SIDEBAR_ITEMS: SideNavItemGroup[] = [
  {
    title: "Dashboards",
    allowedRole: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedRole: [UserRole.ADMIN, UserRole.TEACHER, UserRole.STUDENT],
        allowedStatus: [UserStatus.ACTIVE],
        title: "Dashboard",
        path: "/home",
        icon: <BsHouseDoor size={20} />,
      },
    ],
  },
  {
    title: "Manage",
    allowedRole: [UserRole.ADMIN],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.ADMIN],
        title: "User",
        path: "/admin",
        icon: <FiUser size={20} />,
        submenu: true,
        subMenuItems: [
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "User List",
            path: "/admin/list/user",
            icon: <PiUserListLight size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Teacher List",
            path: "/admin/list/teacher",
            icon: <PiUserListLight size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Student List",
            path: "/admin/list/student",
            icon: <PiUserListLight size={20} />,
          },
        ],
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.ADMIN],
        title: "Academy",
        path: "/admin",
        icon: <IoSchoolOutline size={20} />,
        submenu: true,
        subMenuItems: [
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Class Room",
            path: "/admin/manage/classroom",
            icon: <LuSchool2 size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Lessons",
            path: "/admin/manage/lesson",
            icon: <FiBook size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Schedule",
            path: "/admin/manage/schedule",
            icon: <PiCalendarCheck size={20} />,
          },
          {
            allowedStatus: [UserStatus.ACTIVE],
            allowedRole: [UserRole.ADMIN],
            title: "Assignment",
            path: "/admin/manage/assignment",
            icon: <MdOutlineAssignment size={20} />,
          },
        ],
      },
    ],
  },
  {
    title: "Academy",
    allowedRole: [UserRole.TEACHER],
    allowedStatus: [UserStatus.ACTIVE],
    menuList: [
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.TEACHER],
        title: "Schedule",
        path: "/teacher/schedule",
        icon: <PiCalendarCheck size={20} />,
      },
      {
        allowedStatus: [UserStatus.ACTIVE],
        allowedRole: [UserRole.TEACHER],
        title: "Assignment",
        path: "/teacher/assignment",
        icon: <MdOutlineAssignment size={20} />,
      },
    ],
  },
  {
    title: "Others",
    allowedRole: [
      UserRole.ADMIN,
      UserRole.TEACHER,
      UserRole.STUDENT,
      UserRole.UNKNOW,
    ],
    allowedStatus: [
      UserStatus.ACTIVE,
      UserStatus.IN_ACTIVE,
      UserStatus.BANNED,
      UserStatus.UNKNOW,
    ],
    menuList: [
      {
        allowedStatus: [
          UserStatus.ACTIVE,
          UserStatus.IN_ACTIVE,
          UserStatus.BANNED,
          UserStatus.UNKNOW,
        ],
        allowedRole: [
          UserRole.ADMIN,
          UserRole.TEACHER,
          UserRole.STUDENT,
          UserRole.UNKNOW,
        ],
        title: "Help",
        path: "/help",
        icon: <BsQuestionCircle size={20} />,
      },
      {
        allowedStatus: [
          UserStatus.ACTIVE,
          UserStatus.IN_ACTIVE,
          UserStatus.BANNED,
          UserStatus.UNKNOW,
        ],
        allowedRole: [
          UserRole.ADMIN,
          UserRole.TEACHER,
          UserRole.STUDENT,
          UserRole.UNKNOW,
        ],
        title: "Feedbacks",
        path: "/feedbacks",
        icon: <BsEnvelope size={20} />,
      },
    ],
  },
];
