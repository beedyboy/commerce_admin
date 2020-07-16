import UserProfile from "../views/UserProfile.js";
import Dashboard from "../views/Dashboard";
import Category from "../views/Category/Category.js";
import RoleList from "../views/Roles/RoleList.js";
import StaffList from "../views/Staff/StaffList.js"; 
// import Shops from "../views/Shop/Shops.js";
// import Members from "../views/Membership/index.js";
import Pages from "../views/CMS/Pages/Pages.js";
import CompanyProfile from "../views/Company/CompanyProfile.js";
import Sellers from "../views/Membership/Sellers.js";
import Buyers from "../views/Membership/Buyers.js";

var Menus = [
  {
    path: "/dashboard",
    name: "Dashboard", 
    icon: "tim-icons fa fa-dashboard",
    component: Dashboard,
    layout: "/admin"
  },
  {
    path: "/pages",
    name: "Pages", 
    icon: "tim-icons fa fa-clone",
    component: Pages,
    layout: "/admin"
  },
  {
    path: "/category",
    name: "Category", 
    icon: "tim-icons fa fa-folder",
    component: Category,
    layout: "/admin"
  },
  {
    path: "/buyers",
    name: "Buyers", 
    icon: "tim-icons fa fa-group",
    component: Buyers,
    layout: "/admin"
  },
  {
    path: "/sellers",
    name: "Sellers", 
    icon: "tim-icons fa fa-group",
    component: Sellers,
    layout: "/admin"
  },
  {
    path: "/user-profile",
    name: "User Profile", 
    icon: "tim-icons icon-single-02",
    component: UserProfile,
    layout: "/admin"
  },
  {
    path: "/staff",
    name: "User Management", 
    icon: "tim-icons fa fa-users",
    component: StaffList,
    layout: "/admin"
  },
  {
    path: "/roles",
    name: "Roles", 
    icon: "tim-icons fa fa-key",
    component: RoleList,
    layout: "/admin"
  },
  {
    path: "/company-profile",
    name: "Company Profile", 
    icon: "tim-icons fa fa-database",
    component: CompanyProfile,
    layout: "/admin"
  } 
];
export default Menus;
