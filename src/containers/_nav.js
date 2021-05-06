const _nav = [
 
  {
    _tag: "CSidebarNavTitle",
    _children: ["Вакансии"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Вакансии",
    to: "/vacancies",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Резюме"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Резюме",
    to: "/rooms",
    icon: "cilRoom",
  },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Справочник"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Каталог",
    to: "/catalog",
    icon: "cilRoom",
  },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Страны",
  //   to: "/countries",
  //   icon: "cilRoom",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Города",
  //   to: "/cities",
  //   icon: "cilRoom",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Валюта",
  //   to: "/rooms",
  //   icon: "cilRoom",
  // },
  // {
  //   _tag: "CSidebarNavItem",
  //   name: "Язык",
  //   to: "/rooms",
  //   icon: "cilRoom",
  // },
  {
    _tag: "CSidebarNavTitle",
    _children: ["Персонал"],
  },
  {
    _tag: "CSidebarNavItem",
    name: "Пользователи",
    to: "/users",
    icon: "cilUser",
  },
];

export default _nav;
