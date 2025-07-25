import { useEffect, useRef, useState } from "react";
import type Livro from "../interfaces/Livro";
import type { LivroCarrinho } from "./CardsPorSlugCategoriaPage";
import useRecuperarLivros from "../hooks/useRecuperarLivros";

interface LivroComLivroCarrinho {
  livro: Livro;
  livroCarrinho: LivroCarrinho;
}

const CarrinhoPage = () => {
  const [carrinho, setCarrinho] = useState(() => {
    const itensDeCarrinho = localStorage.getItem("carrinho");
    return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
  });

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const inputRef = useRef(null);

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

  const alterarQuantidade = (livro: Livro, novaQuantidade: number) => {
    setCarrinho((prevCarrinho: LivroCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
      if (existe) {
        if(novaQuantidade > 0){
        const novoCarrinho: LivroCarrinho[] = prevCarrinho.map(
          (item: LivroCarrinho) =>
            item.idLivro === livro.id
              ? { idLivro: item.idLivro, quantidade: novaQuantidade }
              : item
        );
        return novoCarrinho.filter((item) => item.quantidade > 0);
        } else return prevCarrinho;
      } else {
        throw new Error("Erro ao alterar quantidade no carrinho.");
      }
    });
  };

  const {
    data: livros,
    isPending: carregandoLivros,
    error: errorLivros,
  } = useRecuperarLivros();

  if (carregandoLivros) return <p>Carregando carrinho...</p>;
  if (errorLivros) throw errorLivros;

  const livrosNoCarrinho: LivroComLivroCarrinho[] = [];
  livros.forEach((livro) => {
    const livroCarrinho = carrinho.find(
      (item: LivroCarrinho) => item.idLivro === livro.id
    );
    if (livroCarrinho) livrosNoCarrinho.push({ livro, livroCarrinho });
  });

  if (livrosNoCarrinho.length == 0)
    return (
      <>
        <h4 className="mb-4">Carrinho vazio!</h4>
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
        <h1 className="mb-4">Seu Carrinho</h1>
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
              {livrosNoCarrinho.map((livroComLivroCarrinho) => (
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
                      value={livroComLivroCarrinho.livroCarrinho.quantidade}
                      onChange={(e) => {
                        const valor = parseInt(e.target.value) || 1;
                        if(valor >= 1) alterarQuantidade(livroComLivroCarrinho.livro, valor)
                      }}
                    />
                  </td>
                  <td className="text-center">
                    {(
                      livroComLivroCarrinho.livro.preco *
                      livroComLivroCarrinho.livroCarrinho.quantidade
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
                        alterarQuantidade(livroComLivroCarrinho.livro, 0)
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

          <div className="col-md-6 text-right">
            <h4>
              Total: R${" "}
              {livrosNoCarrinho
                .map(
                  (livroComLivroCarrinho) =>
                    livroComLivroCarrinho.livro.preco *
                    livroComLivroCarrinho.livroCarrinho.quantidade
                )
                .reduce((total, subtotal) => total + subtotal, 0)
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
                  useGrouping: true,
                })}
            </h4>
            <button className="btn btn-primary btn-lg">Finalizar Compra</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default CarrinhoPage;
