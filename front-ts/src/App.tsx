import { useRoutes } from "react-router-dom"
import Home from "./page/Home"
import ProductDetail from "./page/ProductDetail";
import Register from "./page/Register";
import Login from "./page/Login";
import Profile from "./page/Profile";
import Account from "./page/Account";
import Purchase from "./page/Purchase";
import Topay from "./page/ToPay";
import Toship from "./page/ToShip";
import ToReceive from "./page/ToReceive";
import ToCompleted from "./page/ToCompleted";
import ToCancle from "./page/ToCancle";
import Cart from "./page/Cart";

function App() {
  const routes = [
    {path: "/", element: <Home/>},
    {path: "/product/:id", element: <ProductDetail/>},
    {path: "/register", element: <Register />},
    {path: "/login", element: <Login />},
    {path: "/cart", element: <Cart />},
    {path: "/profile", element: <Profile />,
      children: [
        { index: true, element: <Account /> },
        { path: "account", element: <Account /> },
        {
          path: "purchase",
          element: <Purchase />,
          children: [
            { index: true, element: <Topay /> },
            {
              path: "topay",
              element: <Topay />,
            },
            { path: "toship", element: <Toship /> },
            { path: "toreceive", element: <ToReceive /> },
            { path: "completed", element: <ToCompleted /> },
            { path: "cancelled", element: <ToCancle /> },
          ],}
      ]
    },
  ]
  
  const element = useRoutes(routes);
  return element
}

export default App
