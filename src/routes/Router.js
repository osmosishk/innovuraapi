import { lazy } from "react";



//dashboards
const Analytical = lazy(() => import("../views/dashboards/Analytical"));
const Index = lazy(() => import("../views/dashboards/index"));

//Slave Dropdown
const addSlave = lazy(() => import("../views/slave/addslave"));
const editSlave = lazy(() => import("../views/slave/editslave"));

//Address Dropdown
const addAddress = lazy(() => import("../views/address/addaddress"));
const editAddress = lazy(() => import("../views/address/editaddress"));


//Show Data
const showData = lazy(() => import("../views/data/showdata"));





var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/dashboards",
    name: "Home",
    state: "dashboardpages",
    icon: "home",
    child: [
      {
        path: "/dashboards/index",
        name: "Dashboard",
        mini: "B",
        icon: "mdi mdi-adjust",
        component: Index,
      },
      
    ],
  },
  {
    navlabel: true,
    name: "Slave",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/slave",
    name: "Slave",
    state: "uicomponents",
    icon: "cpu",
    extra: "mega-dropdown",
    child: [
      {
        path: "/slave/addlsave",
        name: "Add Slave",
        icon: "mdi mdi-comment-processing-outline",
        component: addSlave,
      },
      {
        path: "/slave/editslave",
        name: "Edit Slave ",
        icon: "mdi mdi-comment-processing-outline",
        component: editSlave,
      },
     

    ],
  },
  {
    navlabel: true,
    name: "Slave Address",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/slave",
    name: "Slave Address",
    state: "uicomponents",
    icon: "file-text",
    extra: "mega-dropdown",
    child: [
      {
        path: "/slave/addaddress",
        name: "Add Slave Address",
        icon: "mdi mdi-comment-processing-outline",
        component: addAddress,
      },
      {
        path: "/slave/editaddress",
        name: "Edit Slave Address",
        icon: "mdi mdi-comment-processing-outline",
        component: editAddress,
      }           
    ],
  },

  {
    navlabel: true,
    name: "data",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    collapse: true,
    path: "/data",
    name: "Show Data",
    state: "uicomponents",
    icon: "file-text",
    extra: "mega-dropdown",
    child: [
      {
        path: "/data/showdata",
        name: "Data View",
        icon: "mdi mdi-comment-processing-outline",
        component: showData,
      },
      
    ],
  },


  {
    path: "/",
    pathTo: "/dashboards/index",
    name: "Dashboard",
    redirect: true,
  },
];
export default ThemeRoutes;
