import { useRoutes } from "react-router-dom"
import Home from "./page/Home"
import ProductDetail from "./page/ProductDetail";
import Register from "./page/Register";
import Login from "./page/Login";

function App() {
  const routes = [
    {path: "/", element: <Home/>},
    {path: "/product/:id", element: <ProductDetail/>},
    {path: "/register", element: <Register />},
    {path: "/login", element: <Login />},
  ]
  
  const element = useRoutes(routes);
  return element
}

export default App
