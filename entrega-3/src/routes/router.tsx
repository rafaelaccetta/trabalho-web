import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import LivrosPage from "../pages/LivrosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import LoginPage from "../pages/LoginPage";
import LivroPage from "../pages/LivroPage";
import PedidosPage from "../pages/PedidosPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                path: "",
                element: <HomePage />
            },
            {path: "livros", element: <LivrosPage />},
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "pedidos", element: <PedidosPage />},
            {path: "login", element: <LoginPage />},
            {path: "livros/:id", element: <LivroPage />}
        ]
    }
])
export default router;