import { createBrowserRouter } from 'react-router';
import MainLayout from '../Layouts/MainLayout';
import Home from '../Pages/Home/Home';
import ProductDetails from '../Pages/ProductDetails/ProductDetails';
import SingleOrder from '../Pages/Order/SingleOrder';
import CheckoutOrder from '../Pages/Order/CheckoutOrder';

export const router = createBrowserRouter([
  {
    path: '/',
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: Home,
      },
      {
        path: 'product-details/:id',
        Component: ProductDetails,
      },
      {
        path: '/single-order',
        Component: SingleOrder,
      },
      {
        path: '/checkout-order',
        Component: CheckoutOrder,
      },
    ],
  },
]);
