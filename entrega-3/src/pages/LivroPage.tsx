import { useEffect, useState } from "react";
import useLivroStore from "../store/LivroStore";
import { useNavigate, useParams } from "react-router-dom";
import useRecuperarLivroPorId from "../hooks/useRecuperarLivroPorId";
import useRemoverLivroPorId from "../hooks/useRemoverivroPorId";
import type Livro from "../interfaces/Livro";
import type { LivroCarrinho } from "./CardsPorSlugCategoriaPage";

const LivroPage = () => {
  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const adicionarLivro = (livro: Livro) => {
    setCarrinho((prevCarrinho: LivroCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
      if (existe) {
        const novoCarrinho: LivroCarrinho[] = prevCarrinho.map(
          (item: LivroCarrinho) =>
            item.idLivro === livro.id
              ? { idLivro: item.idLivro, quantidade: item.quantidade + 1 }
              : item
        );
        return novoCarrinho;
      } else {
        return [...prevCarrinho, { idLivro: livro.id, quantidade: 1 }];
      }
    });
  };

  const subtrairLivro = (livro: Livro) => {
    setCarrinho((prevCarrinho: LivroCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
      if (existe) {
        const novoCarrinho: LivroCarrinho[] = prevCarrinho.map(
          (item: LivroCarrinho) =>
            item.idLivro === livro.id
              ? { idLivro: item.idLivro, quantidade: item.quantidade - 1 }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
      } else {
        throw new Error("Erro ao subtrair 1 de livro no carrinho.");
      }
    });
  };

  const [removido, setRemovido] = useState(false);

  const { id } = useParams();

  const {
    data: livro,
    isPending: carregandoLivro,
    error: errorLivro,
  } = useRecuperarLivroPorId(+id!, removido);

  const livroNoCarrinho = carrinho.find(
    (item: LivroCarrinho) => item.idLivro === livro?.id
  );

  if (carregandoLivro) return <p>Carregando livro...</p>;

  if (errorLivro) throw errorLivro;

  return (
    <>
      <section className="py-5 bg-light">
        <div
          className="row justify-content-center"
          style={{ marginLeft: "auto" }}
        >
          <div className="col-md-4">
            <div className="card mb-4 shadow-sm">
              <img
                src={livro.imagem}
                alt={livro.nome}
                className="card-img-top"
              />
              <div className="card-body">
                <h5>
                  <span className="badge rounded-pill text-bg-info">
                    Lançamento!
                  </span>
                </h5>
                <h2 className="card-title">{livro.nome}</h2>
                <h4 className="card-text">Autor</h4>
                <br />
                <h5 className="card-text">
                  R${" "}
                  {livro.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true,
                  })}
                </h5>
              </div>
            </div>
          </div>
          <div className="col-md-6">
            <div className="card mb-4 shadow-sms">
              <div
                className="accordion"
                id="accordionExample"
                style={{ width: "800px" }}
              >
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseOne"
                      aria-expanded="true"
                      aria-controls="collapseOne"
                    >
                      Sinopse
                    </button>
                  </h2>
                  <div
                    id="collapseOne"
                    className="accordion-collapse collapse show"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">{livro.descricao}</div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseTwo"
                      aria-expanded="false"
                      aria-controls="collapseTwo"
                    >
                      Características
                    </button>
                  </h2>
                  <div
                    id="collapseTwo"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <p>Estoque: {livro.qtdEstoque}</p>
                      <p>Editora: XXXXXX</p>
                      <p>Idioma: XXXXXX</p>
                      <p>Número de Páginas: XXXXXX</p>
                    </div>
                  </div>
                </div>
                <div className="accordion-item">
                  <h2 className="accordion-header">
                    <button
                      className="accordion-button collapsed"
                      type="button"
                      data-bs-toggle="collapse"
                      data-bs-target="#collapseThree"
                      aria-expanded="false"
                      aria-controls="collapseThree"
                    >
                      Disponibilidade
                    </button>
                  </h2>
                  <div
                    id="collapseThree"
                    className="accordion-collapse collapse"
                    data-bs-parent="#accordionExample"
                  >
                    <div className="accordion-body">
                      <div className="alert alert-danger" role="alert">
                        {livro.disponivel ? "Disponível :)" : "Indisponível :("}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <span
              className="d-inline-block"
              data-bs-toggle="popover"
              data-bs-trigger="hover focus"
              data-bs-content="Livro esgotado :("
            >
              <div
                style={
                  livroNoCarrinho ? { display: "block" } : { display: "none" }
                }
              >
                <div className="btn-group w-100">
                  <button
                    onClick={() => subtrairLivro(livro)}
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    -
                  </button>
                  <button
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    {livroNoCarrinho?.quantidade}
                  </button>
                  <button
                    onClick={() => adicionarLivro(livro)}
                    type="button"
                    className="btn btn-outline-secondary btn-sm"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                style={
                  livroNoCarrinho ? { display: "none" } : { display: "block" }
                }
                onClick={() => adicionarLivro(livro)}
                type="button"
                className="btn btn-success btn-sm w-100"
              >
                Adicionar ao carrinho
              </button>
            </span>
          </div>
        </div>
      </section>
    </>
  );
};

export default LivroPage;
