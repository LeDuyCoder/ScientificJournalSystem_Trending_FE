import { FiBell, FiSettings, FiHelpCircle } from 'react-icons/fi';

export const headerConfig = {
  searchPlaceholder: "Search research, authors, or institutions...",
  userProfile: {
    initials: "JV",
    name: "Dr. Julian Voss",
    role: "Senior Researcher"
  },
  icons: [
    {
      id: "notifications",
      icon: FiBell,
      ariaLabel: "Notifications",
      badge: 3
    },
    {
      id: "settings",
      icon: FiSettings,
      ariaLabel: "Settings"
    },
    {
      id: "help",
      icon: FiHelpCircle,
      ariaLabel: "Help"
    }
  ]
};
