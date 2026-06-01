import React from "react";

import { IoPeopleSharp } from "react-icons/io5";
import { FaBell } from "react-icons/fa";
import { BiCategory } from "react-icons/bi";
import { PiBooksLight } from "react-icons/pi";

export const SidebarData = [
  {
    title: "Admin Dashboard",
    path: "/",
    icon: <PiBooksLight />,
  },
  {
    title: "Books Dashboard",
    path: "/books-dashboard",
    icon: <PiBooksLight />,
  },
  {
    title: "Users Dashboard",
    path: "/users-dashboard",
    icon: <IoPeopleSharp />,
  },
  {
    title: "Books Genres",
    path: "/books-genres-dashboard",
    icon: <BiCategory />,
  },
  // {
  //   title: "Settings",
  //   path: "/",
  //   icon: <IoSettingsOutline />,
  // },
  {
    title: "Notifications",
    path: "/",
    icon: <FaBell />,
  },
];

export const navbarData = [
  {
    title: "Home",
    path: "/",
  },
  {
    title: "About",
    path: "/about-us",
  },
  {
    title: "Bookstore",
    path: "/bookstore",
  },
  {
    title: "Library",
    path: "/library",
  },
  {
    title: "Authors",
    path: "/authors",
  },
  {
    title: "Contact Us",
    path: "/contact-us",
  },
];
