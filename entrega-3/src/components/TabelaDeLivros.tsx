import dayjs from "dayjs";
import type Livro from "../interfaces/Livro";
import { Link, useNavigate } from "react-router-dom";
import useLivroStore from "../store/LivroStore";
import useRecuperarLivrosComPaginacao from "../hooks/useRecuperarLivrosComPaginacao";
import useRemoverLivroPorId from "../hooks/useRemoverLivroPorId";

const TabelaDeLivros = () => {
  const pagina = useLivroStore((s) => s.pagina);
  const tamanho = useLivroStore((s) => s.tamanho);
  const nome = useLivroStore((s) => s.nome);

  const setPagina = useLivroStore((s) => s.setPagina);
  const setMensagem = useLivroStore((s) => s.setMensagem);
  const setLivroSelecionado = useLivroStore((s) => s.setLivroSelecionado)

  const navigate = useNavigate();

  const {
    data: resultadoPaginado,
    isPending: carregandoLivros,
    error: errorLivros,
  } = useRecuperarLivrosComPaginacao({
    pagina: pagina.toString(),
    tamanho: tamanho.toString(),
    nome: nome,
  });
  
  const { mutate: removerLivro, error: errorRemocaoLivro } =
    useRemoverLivroPorId();

  const tratarRemocao = (id: number) => {
    removerLivro(id);
    setPagina(0);
    window.location.reload();
  };

  if (carregandoLivros)
    return <p className="fw-bold">Carregando livros...</p>;
  if (errorLivros) throw errorLivros;
  if (errorRemocaoLivro) throw errorRemocaoLivro;

  const livros: Livro[] = resultadoPaginado.itens;

  return (
    <div className="table-responsive">
      <table className="table table-bordered table-sm table-hover table-striped">
        <thead>
          <tr>
            <th className="text-center align-middle">Id</th>
            <th className="text-center align-middle">Imagem</th>
            <th className="text-center align-middle">Categoria</th>
            <th className="text-center align-middle">Nome</th>
            <th className="text-center align-middle">Data de Cadastro</th>
            <th className="text-center align-middle">Quantidade</th>
            <th className="text-center align-middle">Preço</th>
            <th className="text-center align-middle">Ação</th>
          </tr>
        </thead>
        <tbody>
          {livros.map((livro) => (
            <tr key={livro.id} style={{height: "60px"}}>
              <td width="8%" className="text-center align-middle">
                {livro.id}
              </td>
              <td width="13%" className="text-center align-middle">
                <img
                  src={livro.imagem}
                  alt="imagem de livro"
                  style={{ width: "40px" }}
                />
              </td>
              <td width="13%" className="text-center align-middle">
                {livro.categoria.nome}
              </td>
              <td width="17%" className="align-middle ps-3">
                <Link
                  onClick={() => setMensagem("")}
                  style={{ textDecoration: "none" }}
                  to={"/livro/" + livro.id}
                >
                  {livro.nome}
                </Link>
              </td>
              <td width="13%" className="text-center align-middle">
                {dayjs(livro.dataCadastro).format("DD/MM/YYYY")}
              </td>
              <td width="13%" className="text-center align-middle">
                {livro.qtdEstoque}
              </td>
              <td width="10%" className="text-end align-middle pe-3">
                {livro.preco.toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
              </td>
              <td width="13%" className="text-center align-middle">
                <button
                  onClick={() => tratarRemocao(livro.id!)}
                  className="btn btn-danger btn-sm"
                  type="button"
                >
                  Remover
                </button>
                <button
                  onClick={() => {
                    setLivroSelecionado(livro);
                    navigate("/cadastro-livro")
                  }}
                  className="btn btn-success btn-sm"
                  type="button"
                >
                  Editar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td className="text-center align-middle fw-bold" colSpan={5}>
              Total...
            </td>
            <td className="text-center align-middle fw-bold" colSpan={2}>
              R${" "}
              {livros
                .reduce(
                  (total, livro) =>
                    total + livro.qtdEstoque * livro.preco,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </td>
            <td></td>
          </tr>
        </tfoot>
      </table>
    </div>
  );
};
export default TabelaDeLivros;
