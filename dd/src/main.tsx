import ReactDOM from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Home from './pages/Home.tsx';
import LoginPage from './pages/LoginPage.tsx';
import Order from './pages/Order.tsx';
import FoodDetail from './pages/FoodDetail.tsx';
import TmpDetail from './pages/TmpDetail.tsx';
import FakeDetail from './pages/FakeDetail.tsx';
import OrderList from './pages/OrderList.tsx';
import FakeOrder from './pages/FakeOrder.tsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'login',
        element: <LoginPage />,
      },
      {
        path: 'order/:storeName/:tableNumber',
        element: (
          <div className="max-w-lg mx-auto">
            <Order />
          </div>
        ),
      },
      {
        path: 'order/:stock_id',
        element: <FoodDetail />,
      },
      {
        path: 'order_list/:storeName/:tableNumber',
        element: <OrderList />,
      },
      {
        path: 'manage/order',
        element: <TmpDetail />,
      },
      {
        path: 'fake/order',
        element: <FakeOrder />,
      },
    ],
  },
]);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <RouterProvider router={router} />,
);
