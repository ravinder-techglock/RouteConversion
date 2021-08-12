import Login from "views/pages/auth/Login";

// import Login from "views/pages/examples/Login";
import Dashboard from "views/pages/dashboards/Dashboard";
// Users
import Users from "views/pages/Users/list/index";
import AddUser from "views/pages/Users/add/index";
import EditUser from "views/pages/Users/edit/index";
// Network
import Networks from "views/pages/Network/list/index";
import AddNetwork from "views/pages/Network/add/index";
import EditNetwork from "views/pages/Network/edit/index";

const routes = [
  {
    path: "/login",
    name: "Login",
    icon: "ni ni-key-25 text-info",
    component: Login,
    layout: "/auth",
    isDisplay: false
  },
  {
    path: "/dashboard",
    name: "Dashboard",
    icon: "ni ni-tv-2 text-primary",
    component: Dashboard,
    layout: "/admin",
    isDisplay: true
  },
  {
    path: "/user/edit/:userId",
    name: "Edit User",
    component: EditUser,
    miniName: "EU",
    layout: "/admin",
    isDisplay: false
  },
  {
    path: "/user/add",
    name: "Add User",
    component: AddUser,
    miniName: "AU",
    layout: "/admin",
    isDisplay: false
  },
  {
    path: "/users",
    name: "Users",
    component: Users,
    icon: "ni ni-circle-08 text-info",
    layout: "/admin",
    isDisplay: true
  },
  {
    path: "/network/edit/:networkId",
    name: "Edit Network",
    component: EditNetwork,
    miniName: "EN",
    layout: "/admin",
    isDisplay: false
  },
  {
    path: "/network/add",
    name: "Add Network",
    component: AddNetwork,
    miniName: "AN",
    layout: "/admin",
    isDisplay: false
  },
  {
    path: "/networks",
    name: "Networks",
    component: Networks,
    icon: "ni ni-world text-info",
    layout: "/admin",
    isDisplay: true
  },
 
];

export default routes;
