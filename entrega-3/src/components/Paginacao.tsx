import type { ReactNode } from "react";
import useLivroStore from "../store/LivroStore";
import useRecuperarLivrosComPaginacao from "../hooks/useRecuperarLivrosComPaginacao";

const Paginacao = () => {
  const pagina = useLivroStore((s) => s.pagina);
  const tamanho = useLivroStore((s) => s.tamanho);
  const nome = useLivroStore((s) => s.nome);

  const setPagina = useLivroStore((s) => s.setPagina);

  const {
    data: resultadoPaginado,
    isPending: carregandoLivros,
    error: errorLivros,
  } = useRecuperarLivrosComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });

  const tratarPaginacao = (pagina: number) => {
    setPagina(pagina);
  };

  if (carregandoLivros)
    return <p className="fw-bold">Carregando livros...</p>;
  if (errorLivros) throw errorLivros;

  const totalDePaginas: number = resultadoPaginado.totalDePaginas;

  const arrayDePaginas: ReactNode[] = [];

  for (let i = 0; i < totalDePaginas; i++) {
    arrayDePaginas.push(
      <li key={i} className={pagina === i ? "page-item active" : "page-item"}>
        <a
          onClick={() => tratarPaginacao(i)}
          className="page-link"
          aria-current="page"
        >
          {i + 1}
        </a>
      </li>
    );
  }

  if (totalDePaginas < 2) return;

  return (
    <nav aria-label="paginaco">
      <ul className="pagination" style={{cursor: "pointer"}}>
        <li className={pagina === 0 ? "page-item disabled" : "page-item"}>
          <a onClick={() => tratarPaginacao(pagina - 1)} className="page-link">
            Anterior
          </a>
        </li>
        {arrayDePaginas}
        <li
          className={
            pagina === totalDePaginas - 1 ? "page-item disabled" : "page-item"
          }
        >
          <a onClick={() => tratarPaginacao(pagina + 1)} className="page-link">
            Próxima
          </a>
        </li>
      </ul>
    </nav>
  );
};
export default Paginacao;
