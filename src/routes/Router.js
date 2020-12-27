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

//Ui-components Dropdown
const Alerts = lazy(() => import("../views/ui-components/Alert"));
const Badges = lazy(() => import("../views/ui-components/Badge"));
const Spinners = lazy(() => import("../views/ui-components/Spinner"));
const Toasts = lazy(() => import("../views/ui-components/Toasts"));
const Breadcrumbs = lazy(() => import("../views/ui-components/Breadcrumb"));
const Buttons = lazy(() => import("../views/ui-components/Button"));
const Dropdowns = lazy(() => import("../views/ui-components/Dropdown"));
const BtnGroups = lazy(() => import("../views/ui-components/BtnGroup"));
const Cards = lazy(() => import("../views/ui-components/Cards"));
const CollapseComponent = lazy(() => import("../views/ui-components/Collapse"));
const CarouselComponent = lazy(() => import("../views/ui-components/Carousel"));
const JumbotronComponent = lazy(() =>
  import("../views/ui-components/Jumbotron")
);
const LayoutComponent = lazy(() => import("../views/ui-components/Layout"));
const ListComponent = lazy(() => import("../views/ui-components/ListGroup"));
const MediaComponent = lazy(() => import("../views/ui-components/Media"));
const ModalComponent = lazy(() => import("../views/ui-components/Modal"));
const NavbarComponent = lazy(() => import("../views/ui-components/Navbar"));
const NavsComponent = lazy(() => import("../views/ui-components/Navs"));
const PaginationComponent = lazy(() =>
  import("../views/ui-components/Pagination")
);
const PopoverComponent = lazy(() => import("../views/ui-components/Popover"));
const ProgressComponent = lazy(() => import("../views/ui-components/Progress"));
const TableComponent = lazy(() => import("../views/ui-components/Table"));
const TabsComponent = lazy(() => import("../views/ui-components/Tabs"));
const TooltipComponent = lazy(() => import("../views/ui-components/Tooltip"));


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
