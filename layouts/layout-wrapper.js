import Dashboard from "./DashboardLayout/Dashboard";
import MainLayout from "./MainLayout/MainLayout";
//import AdminLayout from "./admin";

const layouts = {
  //admin: AdminLayout
  Dashboard: Dashboard
};

const LayoutWrapper = (props) => {
  // to get the text value of the assigned layout of each component
  const Layout = layouts[props.children.type.layout];
  // if we have a registered layout render children with said layout
  if (Layout != null) {
    return <Layout {...props}>{props.children}</Layout>;
  }
  // if not render children with fragment
  return <Dashboard {...props}>{props.children}</Dashboard>;
};

export default LayoutWrapper;
