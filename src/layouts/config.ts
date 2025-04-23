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
    label: "Browse",
    path: "/browse",
  },
  {
    label: "Farmers",
    path: "farmers",
  },
  {
    label: "About",
    path: "about",
  },
  { label: "Messages", path: "messages" },
];
