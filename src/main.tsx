import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "./pages/Home.tsx";
import LoginPage from "./pages/LoginPage.tsx";
import Order from "./pages/Order.tsx";
import FoodDetail from "./pages/FoodDetail.tsx";
import FakeDetail from "./pages/FakeDetail.tsx";
import OrderList from "./pages/OrderList.tsx";
// import FakeOrder from "./pages/FakeOrder.tsx";
import CartList from "./pages/CartList.tsx";
import SignUpPage from "./pages/SignUpPage.tsx";
// import TmpDetail from "./pages/TmpDetail.tsx";
import PlayGround from "./pages/PlayGround.tsx";
import { PrivateRoute } from "./hooks/PrivateRoute.tsx";

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
        path: "signup",
        element: <SignUpPage />,
      },
      {
        path: "stock/:storeName/:tableNumber",
        element: (
          <PrivateRoute>
            <div className="max-w-lg mx-auto">
              <Order />
            </div>
          </PrivateRoute>
        ),
      },
      {
        path: "playground",
        element: <PlayGround />,
      },
      {
        path: "store/:storeName/:stock_id",
        element: (
          <PrivateRoute>
            <FoodDetail />
          </PrivateRoute>
        ),
      },
      {
        path: "stock_list/:storeName/:tableNumber",
        element: (
          <PrivateRoute>
            <OrderList />
          </PrivateRoute>
        ),
      },
      {
        path: "cart_list/:storeName/:tableNumber",
        element: (
          <PrivateRoute>
            <CartList />
          </PrivateRoute>
        ),
      },
      // {
      //   path: "manage/order",
      //   element: (
      //     <PrivateRoute>
      //       <TmpDetail />
      //     </PrivateRoute>
      //   ),
      // },
      // {
      //   path: "fake/order",
      //   element: <FakeOrder />,
      // },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById("root")!).render(
  <RouterProvider router={router} />
);
