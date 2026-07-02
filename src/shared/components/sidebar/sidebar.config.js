import { FiGrid, FiBook, FiLayers, FiHelpCircle, FiLogOut } from 'react-icons/fi';

// Configuration file for the Sidebar component defining menu items, footer items, and logo assets.
export const sidebarConfig = {
  logo: {
    title: "Scientia",
    subtitle: "Bibliometric Excellence",
  },
  menuItems: [
    { label: "Dashboard", segment: "dashboard", icon: FiGrid },
    { label: "Journals", segment: "journals", icon: FiBook },
    { label: "Volumes", segment: "volumes", icon: FiLayers }
  ],
  footerItems: [
    { label: "Support", action: "support", icon: FiHelpCircle },
    { label: "Sign Out", action: "logout", icon: FiLogOut }
  ]
};
