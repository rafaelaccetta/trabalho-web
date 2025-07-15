import { useEffect, useState } from "react";
import type Livro from "../interfaces/Livro";
import type { LivroCarrinho } from "./CardsPorSlugCategoriaPage";
import useRecuperarLivros from "../hooks/useRecuperarLivros";

interface LivroComLivroCarrinho {
  livro: Livro;
  livroCarrinho: LivroCarrinho;
}

const FavoritosPage = () => {
  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const [favoritos, setFavoritos] = useState(() => {
    const itensDeFavoritos = localStorage.getItem("favoritos");
    return itensDeFavoritos ? JSON.parse(itensDeFavoritos) : [];
  });

  useEffect(() => {
    localStorage.setItem("favoritos", JSON.stringify(favoritos));
  }, [favoritos]);

  const alterarFavorito = (livro: Livro) => {
    setFavoritos((prevFavoritos: Number[]) => {
      const favorito = prevFavoritos.find((id) => id === livro.id);
      if (favorito) {
        return prevFavoritos.filter((id) => id != livro.id);
      } else {
        return [...prevFavoritos, livro.id];
      }
    });
  };

  const alterarQuantidade = (livro: Livro, novaQuantidade: number) => {
    if(novaQuantidade >= 0){
    setCarrinho((prevCarrinho: LivroCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
      if (existe) {
        const novoCarrinho: LivroCarrinho[] = prevCarrinho.map(
          (item: LivroCarrinho) =>
            item.idLivro === livro.id
              ? { idLivro: item.idLivro, quantidade: novaQuantidade }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
      } else {
        return [...prevCarrinho, { idLivro: livro.id, quantidade: 1 }]
      }

    });
  }};

  const {
    data: livros,
    isPending: carregandoLivros,
    error: errorLivros,
  } = useRecuperarLivros();

  if (carregandoLivros) return <p>Carregando favoritos...</p>;
  if (errorLivros) throw errorLivros;

  const livrosNosFavoritos: LivroComLivroCarrinho[] = [];
  livros.forEach((livro) => {
    const favorito = favoritos.find((id : number) => id === livro.id);
    if(favorito){
      const livroCarrinho = carrinho.find((item: LivroCarrinho) => item.idLivro === livro.id)
      const livroComLivroCarrinho : LivroComLivroCarrinho = {livro, livroCarrinho}
      livrosNosFavoritos.push(livroComLivroCarrinho)
    }
  });

  if (livrosNosFavoritos.length == 0)
    return (
      <>
        <h4 className="mb-4">Nenhum livro nos favoritos...</h4>
        <div className="">
          <a href="./livros" className="btn btn-secondary">
            Continuar Comprando
          </a>
        </div>
      </>
    );

  return (
    <div className="container mt-4" style={{ marginTop: "720px" }}>
      <section className="py-5 bg-light">
        <h1 className="mb-4">Seus Favoritos</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th scope="col">Produto</th>
                <th scope="col">Descrição</th>
                <th scope="col" className="text-center">
                  Preço
                </th>
                <th scope="col" className="text-center">
                  Quantidade
                </th>
                <th scope="col" className="text-center">
                  Subtotal
                </th>
                <th scope="col" className="text-center">
                  Ações
                </th>
              </tr>
            </thead>

            <tbody>
              {livrosNosFavoritos.map((livroComLivroCarrinho) => (
                <tr>
                  <td style={{ width: "100px" }}>
                    <img
                      src={livroComLivroCarrinho.livro.imagem}
                      alt={livroComLivroCarrinho.livro.nome}
                      className="img-fluid img-thumbnail"
                    />
                  </td>
                  <td>
                    <strong>{livroComLivroCarrinho.livro.nome}</strong>
                    <br />
                    {livroComLivroCarrinho.livro.descricao}
                  </td>
                  <td className="text-center">
                    R${" "}
                    {livroComLivroCarrinho.livro.preco.toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                    })}
                  </td>
                  <td className="text-center">
                    <input
                      type="number"
                      className="form-control text-center"
                      style={{ maxWidth: "80px" }}
                      value={livroComLivroCarrinho.livroCarrinho ? livroComLivroCarrinho.livroCarrinho.quantidade : 0}
                      onChange={(e) => {
                        const valor = e.target.valueAsNumber;
                        if (!Number.isNaN(valor)) {
                          alterarQuantidade(
                            livroComLivroCarrinho.livro,
                            e.target.valueAsNumber
                          );
                        }
                      }}
                    />
                  </td>
                  <td className="text-center">
                    {(livroComLivroCarrinho.livroCarrinho ?
                      livroComLivroCarrinho.livro.preco * livroComLivroCarrinho.livroCarrinho.quantidade : 0
                    ).toLocaleString("pt-BR", {
                      minimumFractionDigits: 2,
                      maximumFractionDigits: 2,
                      useGrouping: true,
                    })}
                  </td>
                  <td className="text-center">
                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() =>
                        alterarFavorito(livroComLivroCarrinho.livro)
                      }
                    >
                      Remover
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="row">
          <div className="col-md-6">
            <a href="./livros" className="btn btn-secondary">
              Continuar Comprando
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default FavoritosPage;
