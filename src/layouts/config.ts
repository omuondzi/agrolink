interface NAV_ITEM {
  label: string;
  path: string;
}
export const NAV_ITEMS: NAV_ITEM[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About",
    path: "about",
  },
  {
    label: "Products",
    path: "/products/vegetables",
  },
  {
    label: "Farmers",
    path: "farmers",
  },

  // { label: "Messages", path: "messages" },
];

export type FooterLink = {
  label: string;
  path: string;
};

export const FOOTERLINKS: FooterLink[] = [
  {
    label: "Home",
    path: "/",
  },
  {
    label: "About Us",
    path: "/about",
  },

  {
    label: "Products",
    path: "/products/vegetables",
  },
  {
    label: "Farmers",
    path: "/farmers",
  },
];

export const SUPPORT = [
  {
    label: "Help Center",
    path: "/help-center",
  },
  {
    label: "Contact Support",
    path: "/contact-support",
  },
  {
    label: "Privacy Policy",
    path: "/privacy-policy",
  },
  {
    label: "Terms of Service",
    path: "/terms-of-service",
  },
];
