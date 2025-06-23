import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useRecuperarLivrosPorSlugCategoria from "../hooks/useRecuperarLivrosPorSlugCategoria";
import Card from "../components/Card";
import type Livro from "../interfaces/Livro"
import CardsPlaceholderPage from "./CardsPlaceholderPage";


export interface LivroCarrinho {
    idLivro: number;
    quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {

    const [carrinho, setCarrinho] = useState(() => {
        const itensDeCarrinho = localStorage.getItem("carrinho");
        return itensDeCarrinho ? JSON.parse(itensDeCarrinho) : [];
    });

    useEffect(() => {
        localStorage.setItem("carrinho", JSON.stringify(carrinho))
    }, [carrinho]);

    const adicionarLivro = (livro: Livro) => {
        setCarrinho((prevCarrinho: LivroCarrinho[]) => {
            const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
            if(existe){
                const novoCarrinho: LivroCarrinho[] = prevCarrinho
                    .map((item: LivroCarrinho) => item.idLivro === livro.id ?
                        {idLivro: item.idLivro, quantidade: item.quantidade + 1} : item);
                return novoCarrinho;
            } else {
                return [...prevCarrinho, {idLivro: livro.id, quantidade: 1}]
            }
        });
    };

    const subtrairLivro = (livro: Livro) => {
        setCarrinho((prevCarrinho: LivroCarrinho[]) => {
            const existe = prevCarrinho.find((item) => item.idLivro === livro.id);
            if (existe) {
                const novoCarrinho: LivroCarrinho[] = prevCarrinho
                    .map((item: LivroCarrinho) => item.idLivro === livro.id ? 
                        {idLivro: item.idLivro, quantidade: item.quantidade - 1} : item);
                return novoCarrinho.filter((item) => item.quantidade > 0);    
            } else {
                throw new Error("Erro ao subtrair 1 de livro no carrinho.");
            }
        });
    };

    const [favoritos, setFavoritos] = useState(() => {
        const itensDeFavoritos = localStorage.getItem("favoritos");
        return itensDeFavoritos ? JSON.parse(itensDeFavoritos) : [];
    });

    useEffect(() => {
        localStorage.setItem("favoritos", JSON.stringify(favoritos))
    }, [favoritos]);

    const alterarFavorito = (livro: Livro) => {
        setFavoritos((prevFavoritos: Number[]) => {
            const favorito = prevFavoritos.find((id) => id === livro.id);
            if (favorito) {
                return prevFavoritos.filter((id) => id != livro.id)
            } else {
                return [...prevFavoritos, livro.id]
            }
        }
        )
    }

    const { slugCategoria } = useParams();
    const {
        data: livros,
        isPending: carregandoLivros,
        error: errorLivros
    } = useRecuperarLivrosPorSlugCategoria(slugCategoria);

    if(carregandoLivros) return <CardsPlaceholderPage/>;
    if(errorLivros) throw errorLivros;

    const livrosNoCarrinho: (LivroCarrinho | null)[] = [];
    livros.forEach((livro) => {
        const livroCarrinho = carrinho.find(
            (item: LivroCarrinho) => item.idLivro === livro.id
        );
        livrosNoCarrinho.push(livroCarrinho ? livroCarrinho : null);
    })

    const livrosNosFavoritos: (boolean)[] = [];
    livros.forEach((livro) => {
        const favorito = favoritos.find(
            (id: number) => id === livro.id
        );
        livrosNosFavoritos.push( favorito ? true : false);
    })
    
    return (
    <>
      <h5>
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Produtos"}
      </h5>
      <div className="row">
        {livros.map((livro, index) => (
          <div key={livro.id} className="col-lg-2 col-md-3 col-sm-4 col-6">
            <Card
              livro={livro}
              livroNoCarrinho={livrosNoCarrinho[index]}
              livroNosFavoritos={livrosNosFavoritos[index]}
              adicionarLivro={adicionarLivro}
              subtrairLivro={subtrairLivro}
              alterarFavorito={alterarFavorito}
            />
          </div>
        ))}
      </div>
    </>
    );
}

export default CardsPorSlugCategoriaPage