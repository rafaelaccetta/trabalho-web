import { NavLink } from 'react-router-dom'
import book from "../assets/icons/book.svg"
import login from "../assets/icons/login.svg"
import shopping_bag from "../assets/icons/shopping_bag.svg"

const NavBar = () => {
  return (
    <header>
    <nav className="navbar navbar-light bg-light navbar-expand-md fixed-top">
      <div className="container">
        <NavLink className="navbar-brand" to="/">
          <img
            src={book}
            alt="Logo"
            width="30"
            height="24"
            className="d-inline-block align-text-top"
          />
          Livraria
        </NavLink>
        <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu"
            aria-controls="menu"
            aria-expanded="false"
            aria-label="Botão de navegação">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="menu">
          <div className="navbar-nav me-auto">
            <NavLink className="nav-link" aria-current="page" to="/">
            Home
            </NavLink>
            <NavLink className="nav-link" to="/livros">
            Livros
            </NavLink>
          </div>
          <div className="navbar-nav">
            <NavLink className="nav-item nav-link" to="/pedidos">
                Meus Pedidos
                </NavLink>
            <NavLink className="nav-item nav-link" to="/carrinho">
              <img src={shopping_bag} alt="Carrinho"/>
              Carrinho
            </NavLink>
            <NavLink className="nav-item nav-link" to="/login">
              <img src={login} alt="Entrar"/>
              Entrar
            </NavLink>
          </div>
        </div>
      </div>
    </nav>
    </header>
  )
}

export default NavBar