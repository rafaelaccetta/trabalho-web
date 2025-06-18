import { NavLink, Outlet } from "react-router-dom"

const LivrosPage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <nav className="nav nav-pills d-flex flex-column">
          <h5>Categorias</h5>
          <NavLink className="nav-link" to="/livros">
            Todos
          </NavLink>
          <NavLink className="nav-link" to="/livros">
            Todos
          </NavLink>
          <NavLink className="nav-link" to="/livros">
            Todos
          </NavLink>
        </nav>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    
    </div>
  )
}

export default LivrosPage