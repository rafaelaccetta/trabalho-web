import { NavLink, Outlet } from "react-router-dom"

const categorias = [
  { nome: "Romance", slug: "romance" },
  { nome: "Tecnologia", slug: "tecnologia" },
  { nome: "Ficção Científica", slug: "ficcao-cientifica" },
];

const LivrosPage = () => {
  return (
    <div className="row">
      <div className="col-lg-2">
        <nav className="nav nav-pills d-flex flex-column gap-2">
          <h5>Categorias</h5>
          <NavLink
            className={({ isActive }) => "nav-link" + (isActive ? " active" : "")}
            to="/livros"
            end
          >
            Todos
          </NavLink>
          {categorias.map((categoria) => (
            <NavLink
              key={categoria.slug}
              className="nav-link"
              to={`/livros/${categoria.slug}`}
            >
              {categoria.nome}
            </NavLink>
          ))}
        </nav>
      </div>
      <div className="col-lg-10">
        <Outlet />
      </div>
    </div>
  )
}

export default LivrosPage