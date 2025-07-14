import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import Home from "../pages/Home";
import Login from "../component/Login";

import SearchPage from "../pages/SearchPage";
import Register from "../component/Register";
import ForgotPassword from "../component/ForgotPassword";
import Dashboard from "../layouts/Dashboard";
import Profile from "../component/Profile";
import Order from "../component/Order";
import Address from "../component/Address";
import Categories from "../component/admin/Category";
import Sub_category from "../component/admin/Sub_category";
import Product from "../component/admin/Product";
import UploadProduct from "../component/admin/UploadProduct";
import AdminPermision from "../layouts/AdminPermision";
import ViewProduct from "../component/admin/ViewProduct";
import ProductPage from "../component/ProductPage";
import NoData from "../component/admin/NoData";
import ProductDisplayPage from "../component/ProductDisplayPage";

const route = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        path: "",
        element: <Home />,
      },
      {
        path: "home",
        element: <Home />,
      },
      {
        path: "login",
        element: <Login />,
      },
      {
        path: "register",
        element: <Register />,
      },
      {
        path: "forgotpassword",
        element: <ForgotPassword />,
      },
      {
        path: "search",
        element: <SearchPage />,
      },
      {
        path: "dashboard",
        element: <Dashboard />,
        children: [
          {
            path: "profile",
            element: <Profile />,
          },
          {
            path: "myorder",
            element: <Order />,
          },
          {
            path: "address",
            element: <Address />,
          },
          {
            path: "category",
            element: (
              <AdminPermision>
                <Categories />
              </AdminPermision>
            ),
          },
          {
            path: "subcategory",
            element: (
              <AdminPermision>
                <Sub_category />
              </AdminPermision>
            ),
          },
          {
            path: "product",
            element: (
              <AdminPermision>
                <Product />
              </AdminPermision>
            ),
          },
          {
            path: "uploadproduct",
            element: (
              <AdminPermision>
                <UploadProduct />
              </AdminPermision>
            ),
          },
          {
            path: "product/view/:id",
            element: (
              <AdminPermision>
                <ViewProduct />
              </AdminPermision>
            ),
          },
        ],
      },
      {
        path: ":categoryid/:categoryName/:all",
        element: <ProductPage />,
        // children: [
        //   {
        //     path: ":subcategory",
        //     element: <ProductPage />,
        //   },
        // ],
      },
      {
        path: "/view/product/:id/:name/:cat_id",
        element: <ProductDisplayPage />,
      },
    ],
  }
]);

export default route;
