import { NavLink } from "react-router-dom";
import type Livro from "../interfaces/Livro";
import { type LivroCarrinho } from "../pages/CardsPorSlugCategoriaPage";
import heart from "../assets/icons/heart.svg";
import heartFill from "../assets/icons/heart-fill.svg";
import useUsuarioStore from "../store/UsuarioStore";

interface Props {
  livro: Livro;
  livroNoCarrinho: LivroCarrinho | null;
  livroNosFavoritos: boolean;
  adicionarLivro: (livro: Livro) => void;
  subtrairLivro: (livro: Livro) => void;
  alterarFavorito: (livro: Livro) => void;
}

const Card = ({
  livro,
  livroNoCarrinho,
  livroNosFavoritos,
  adicionarLivro,
  subtrairLivro,
  alterarFavorito,
}: Props) => {
  const usuarioLogado = useUsuarioStore((s) => s.usuarioLogado);

  return (
    <div className="card mb-4 shadow-sm">
      <img src={livro.imagem} alt={livro.nome} className="card-img-top" />
      <div className="card-body">
        <h5 className="card-title">{livro.nome}</h5>
        <p className="card-text">{livro.descricao}</p>
        <small className="text-muted">
          R${" "}
          {livro.preco.toLocaleString("pt-BR", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
            useGrouping: true,
          })}
        </small>
        <a style={{ display: usuarioLogado ? "block" : "none", cursor: "pointer" }} onClick={() => alterarFavorito(livro)}>
        <img
          src={livroNosFavoritos ? heartFill : heart}
        />
        </a>
      </div>
      <div className="card-footer mb-4">
        <a
          href={"/livro/" + livro.id}
          className="btn btn-outline-secondary mb-2 w-100"
        >
          Ver Detalhes
        </a>
        <div
          style={{ display: livroNoCarrinho ? "block" : "none" }}
        >
          <div className="btn-group w-100">
            <button
              onClick={() => subtrairLivro(livro)}
              type="button"
              className="btn btn-outline-secondary btn-sm"
            >
              -
            </button>
            <button type="button" className="btn btn-outline-secondary btn-sm">
              {livroNoCarrinho?.quantidade}
            </button>
            <button
              onClick={() => adicionarLivro(livro)}
              type="button"
              className="btn btn-outline-secondary btn-sm"
              disabled={!!livroNoCarrinho && livroNoCarrinho.quantidade >= livro.qtdEstoque}
            >
              +
            </button>
          </div>
        </div>
        <button
          style={livroNoCarrinho ? { display: "none" } : { display: "block" }}
          onClick={() => adicionarLivro(livro)}
          type="button"
          className="btn btn-success btn-sm w-100"
        >
          Comprar
        </button>
      </div>
    </div>
  );
};

export default Card;
