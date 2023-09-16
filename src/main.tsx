import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Order from "./pages/Order.tsx";
import FoodDetail from "./pages/FoodDetail.tsx";
import TmpDetail from "./pages/TmpDetail.tsx";
import FakeDetail from "./pages/FakeDetail.tsx";
import OrderList from "./pages/OrderList.tsx";
import FakeOrder from "./pages/FakeOrder.tsx";
import CartList from "./pages/CartList.tsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: "login",
        element: <LoginPage />,
      },
      {
        path: "stock/:storeName/:tableNumber",
        element: (
          <div className="max-w-lg mx-auto">
            <Order />
          </div>
        ),
      },
      {
        path: "store/:storeName/:stock_id",
        element: <FoodDetail />,
      },
      {
        path: "stock_list/:storeName/:tableNumber",
        element: <OrderList />,
      },
      {
        path: "cart_list/:storeName/:tableNumber",
        element: <CartList />,
      },
      // {
      //   path: 'manage/order',
      //   element: <TmpDetail />,
      // },
      // {
      //   path: 'fake/order',
      //   element: <FakeOrder />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
