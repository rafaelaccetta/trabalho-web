import { NavLink } from "react-router-dom";
import type Livro from "../interfaces/Livro";
import { type LivroCarrinho } from "../pages/CardsPorSlugCategoriaPage";

interface Props {
    livro: Livro;
    livroNoCarrinho: LivroCarrinho | null;
    adicionarLivro: (livro: Livro) => void;
    subtrairLivro: (livro: Livro) => void;
}

const Card = ({livro, adicionarLivro, subtrairLivro, livroNoCarrinho} : Props) => {
  return (
    <div className="card mb-4 shadow-sm">
        <img src={livro.imagem} alt={livro.nome} className="card-image-top" />
        <div className="card-body">
            <h5 className="card-title">{livro.nome}</h5>
            <p className="card-text">{livro.descricao}</p>
            <small className="text-muted">
                R${" "}
                {livro.preco.toLocaleString("pt-BR", {
                    minimumFractionDigits: 2,
                    maximumFractionDigits: 2,
                    useGrouping: true
                })}
            </small>

        </div>
        <div className="card-footer mb-4">
          <a href={"/livro/" + livro.id} className="btn btn-outline-secondary mb-2 w-100">Ver Detalhes</a>
          <div style={livroNoCarrinho ? {display: "block"} : {display: "none"}} >
            <div className="btn-group w-100">
              <button onClick={() => subtrairLivro(livro)} type="button" className="btn btn-outline-secondary btn-sm">-</button>
              <button type="button" className="btn btn-outline-secondary btn-sm">{livroNoCarrinho?.quantidade}</button>
              <button onClick={() => adicionarLivro(livro)} type="button" className="btn btn-outline-secondary btn-sm">+</button>
            </div>
          </div>
          <button style={livroNoCarrinho ? {display: "none"} : {display: "block"}} onClick={() => adicionarLivro(livro)} type="button" className="btn btn-success btn-sm w-100">Comprar</button>
      
            
        </div>
    </div>


    /*<div class="col-md-4">
            <div class="card mb-4 shadow-sm">
              <img src="assets/images/product1.jpeg" alt="Imagem do Produto" class="card-img-top">
              <div class="card-body">
                <h5 class="card-title">Nome do Produto</h5>
                <p class="card-text">Descrição breve do produto. Substitua este texto pela sua descrição.</p>
                <div class="d-flex justify-content-between align-items-center">
                  <div class="btn-group">
                    <a href="./produto.html" class="btn btn-sm btn-outline-secondary">Ver Detalhes</a>
                    <a href="#" class="btn btn-sm btn-outline-secondary">Comprar</a>
                  </div>
                  <small class="text-muted">R$ Preço</small>
                </div>
              </div>
            </div>
          </div>
          */
  )
}

export default Card