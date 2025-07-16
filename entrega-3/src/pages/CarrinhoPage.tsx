import { useEffect, useRef, useState } from "react";
import type Livro from "../interfaces/Livro";
import type { LivroCarrinho } from "./CardsPorSlugCategoriaPage";
import useRecuperarLivros from "../hooks/useRecuperarLivros";

interface LivroComLivroCarrinho {
  livro: Livro;
  livroCarrinho: LivroCarrinho;
}

const CarrinhoPage: React.FC = () => {
  const [carrinho, setCarrinho] = useState<LivroCarrinho[]>(() => {
    const itens = localStorage.getItem("carrinho");
    return itens ? JSON.parse(itens) : [];
  });

  const [editingValues, setEditingValues] = useState<Record<number, string>>({});
  const inputRefs = useRef<Record<number, HTMLInputElement | null>>({});

  useEffect(() => {
    localStorage.setItem("carrinho", JSON.stringify(carrinho));
  }, [carrinho]);

  const alterarQuantidade = (livro: Livro, novaQuantidade: number) => {
    setCarrinho((prevCarrinho: LivroCarrinho[]) => {
      const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
      if (!existe) throw new Error("Livro não encontrado no carrinho.");

      if (novaQuantidade > 0) {
        return prevCarrinho.map((item) =>
          item.idLivro === livro.id
            ? { idLivro: item.idLivro, quantidade: novaQuantidade }
            : item
        );
      }

      return prevCarrinho.filter((item) => item.idLivro !== livro.id);
    });
  };

  const {
    data: livros,
    isPending: carregando,
    error,
  } = useRecuperarLivros();

  if (carregando) return <p>Carregando carrinho...</p>;
  if (error) throw error;

  const livrosNoCarrinho: LivroComLivroCarrinho[] = [];
  livros.forEach((livro) => {
    const lc = carrinho.find((item) => item.idLivro === livro.id);
    if (lc) livrosNoCarrinho.push({ livro, livroCarrinho: lc });
  });

  if (livrosNoCarrinho.length === 0) {
    return (
      <>
        <h4 className="mb-4">Carrinho vazio!</h4>
        <a href="./livros" className="btn btn-secondary">
          Continuar Comprando
        </a>
      </>
    );
  }

  return (
    <div className="container mt-4">
      <section className="py-5 bg-light">
        <h1 className="mb-4">Seu Carrinho</h1>
        <div className="table-responsive">
          <table className="table table-bordered table-hover">
            <thead className="thead-light">
              <tr>
                <th>Produto</th>
                <th>Descrição</th>
                <th className="text-center">Preço</th>
                <th className="text-center">Quantidade</th>
                <th className="text-center">Subtotal</th>
                <th className="text-center">Ações</th>
              </tr>
            </thead>
            <tbody>
              {livrosNoCarrinho.map(({ livro, livroCarrinho }) => {
                const id = livro.id!;
                const edited = editingValues[id];
                const displayValue = edited !== undefined
                  ? edited
                  : livroCarrinho.quantidade.toString();

                return (
                  <tr key={id}>
                    <td style={{ width: "100px" }}>
                      <img
                        src={livro.imagem}
                        alt={livro.nome}
                        className="img-fluid img-thumbnail"
                      />
                    </td>
                    <td>
                      <strong>{livro.nome}</strong>
                      <br />
                      {livro.descricao}
                    </td>
                    <td className="text-center">
                      R${" "}
                      {livro.preco.toLocaleString("pt-BR", {
                        minimumFractionDigits: 2,
                        maximumFractionDigits: 2,
                      })}
                    </td>
                    <td className="text-center">
                      <input
                        type="number"
                        className="form-control text-center"
                        style={{ maxWidth: "80px" }}
                        value={displayValue}
                        ref={(ref) => {
                          inputRefs.current[id] = ref;
                        }}
                        onChange={(e) => {
                          const v = e.currentTarget.value;
                          setEditingValues((prev) => ({ ...prev, [id]: v }));
                          const num = parseInt(v, 10);
                          if (!isNaN(num) && num >= 1) {
                            alterarQuantidade(livro, num);
                          }
                        }}
                        onBlur={() => {
                          const v = editingValues[id]?.trim();
                          const num = parseInt(v ?? "", 10);

                          if (!v || isNaN(num) || num < 1) {
                            const input = inputRefs.current[id];
                            if (input) input.focus();
                          } else {
                            setEditingValues((prev) => {
                              const copy = { ...prev };
                              delete copy[id];
                              return copy;
                            });
                          }
                        }}
                      />
                    </td>
                    <td className="text-center">
                      {(livro.preco * livroCarrinho.quantidade).toLocaleString(
                        "pt-BR",
                        {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        }
                      )}
                    </td>
                    <td className="text-center">
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => alterarQuantidade(livro, 0)}
                      >
                        Remover
                      </button>
                    </td>
                  </tr>
                );
              })}
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
                .reduce(
                  (acc, { livro, livroCarrinho }) =>
                    acc + livro.preco * livroCarrinho.quantidade,
                  0
                )
                .toLocaleString("pt-BR", {
                  minimumFractionDigits: 2,
                  maximumFractionDigits: 2,
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