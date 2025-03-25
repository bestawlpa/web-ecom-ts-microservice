import { useRoutes } from "react-router-dom"
import Home from "./page/Home"
import ProductDetail from "./page/ProductDetail";
import Register from "./page/Register";

function App() {
  const routes = [
    {path: "/", element: <Home/>},
    {path: "/product/:id", element: <ProductDetail/>},
    {path: "/register", element: <Register />},

  ]
  
  const element = useRoutes(routes);
  return element
}

export default App
