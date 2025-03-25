import { useRoutes } from "react-router-dom"
import Home from "./page/Home"
import ProductDetail from "./page/ProductDetail";

function App() {
  const routes = [
    {path: "/", element: <Home/>},
    {path: "/product/:id", element: <ProductDetail/>}

  ]
  
  const element = useRoutes(routes);
  return element
}

export default App
