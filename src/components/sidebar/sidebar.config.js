import { FiGrid, FiBook, FiFileText, FiLayers, FiUser, FiHelpCircle, FiLogOut } from 'react-icons/fi';

// Configuration file for the Sidebar component defining menu items, footer items, and logo assets.
export const sidebarConfig = {
  logo: {
    title: "Scientia",
    subtitle: "Bibliometric Excellence",
    full: "/assets/logo/full.svg",
    icon: "/assets/logo/icon.svg"
  },
  menuItems: [
    { label: "Dashboard", path: "/dashboard", icon: FiGrid },
    { label: "Journals", path: "/journals", icon: FiBook },
    { label: "Articles", path: "/embed/article-graph", icon: FiFileText },
    { label: "Volumes", path: "/volumes", icon: FiLayers },
    { label: "Account", path: "/account", icon: FiUser }
  ],
  footerItems: [
    { label: "Support", action: "support", icon: FiHelpCircle },
    { label: "Sign Out", action: "logout", icon: FiLogOut }
  ]
};
