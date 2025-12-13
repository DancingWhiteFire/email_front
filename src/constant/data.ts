export const menuGroups = [
  {
    name: "MENU",
    menuItems: [
      {
        icon: "LayoutDashboard",
        label: "Dashboard",
        route: "/",
      },
      {
        icon: "Mailbox",
        label: "Emails",
        route: "/mails",
      },
      {
        icon: "CalendarRange",
        label: "Calendar",
        route: "/calendar",
      },
      {
        icon: "User",
        label: "Profile",
        route: "#",
        children: [
          { label: "Public", route: "/profile/public" },
          { label: "Private", route: "/profile/private" },
        ],
      },
      {
        icon: "TextInitial",
        label: "Forms",
        route: "#",
        children: [
          { label: "Form Elements", route: "/forms/form-elements" },
          { label: "Form Layout", route: "/forms/form-layout" },
        ],
      },
      {
        icon: "Sheet",
        label: "Tables",
        route: "/tables",
      },
      {
        icon: "Cog",
        label: "Settings",
        route: "/settings",
      },
    ],
  },
  {
    name: "OTHERS",
    menuItems: [
      {
        icon: "ChartPie",
        label: "Chart",
        route: "/chart",
      },
      {
        icon: "Shell",
        label: "UI Elements",
        route: "#",
        children: [
          { label: "Alerts", route: "/ui/alerts" },
          { label: "Buttons", route: "/ui/buttons" },
        ],
      },
    ],
  },
];

export const PLAN_VALUES = Object.freeze({
  FREE: "free",
  PRO: "pro",
  TEAM: "team",
});

export const AUTH_VALUES = Object.freeze({
  GOOGLE: "google",
  MICROSOFT: "microsoft",
});
