import { createBrowserRouter } from "react-router-dom";
import Layout from "./Layout";
import HomePage from "../pages/HomePage";
import LivrosPage from "../pages/LivrosPage";
import CarrinhoPage from "../pages/CarrinhoPage";
import LoginPage from "../pages/LoginPage";
import LivroPage from "../pages/LivroPage";
import ErrorPage from "../pages/ErrorPage";
import FavoritosPage from "../pages/FavoritosPage";
import PrivateRoutes from "./PrivateRoutes";
import CardsPorSlugCategoriaPage from "../pages/CardsPorSlugCategoriaPage";
import CadastroUsuarioPage from "../pages/CadastroUsuarioPage";
import CadastroLivroPage from "../pages/CadastroLivroPage";

const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {path: "", element: <HomePage /> },
            {
                path: "livros",
                element: <LivrosPage />,
                children: [
                    {path: ":slugCategoria?", element: <CardsPorSlugCategoriaPage />}
                ]
            },
            {path: "carrinho", element: <CarrinhoPage />},
            {path: "login", element: <LoginPage />},
            {path: "livro/:id", element: <LivroPage />},
            {path: "cadastro-usuario", element: <CadastroUsuarioPage />},
            {path: "cadastro-livro", element: <CadastroLivroPage />}
        ]
    },
    {
        path: "/",
        element: <PrivateRoutes />,
        errorElement: <ErrorPage />,
        children: [
            {path: "favoritos", element: <FavoritosPage />}
        ]
    }
])
export default router;