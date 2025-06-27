import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Card from "../components/Card";
import type Livro from "../interfaces/Livro";
import CardsPlaceholderPage from "./CardsPlaceholderPage";
import useLivroStore from "../store/LivroStore";
import useRecuperarLivrosPorSlugCategoriaComPaginacao from "../hooks/useRecuperarLivrosPorSlugCategoriaComPaginacao";
import InfiniteScroll from "react-infinite-scroll-component"


export interface LivroCarrinho {
  idLivro: number;
  quantidade: number;
}

const CardsPorSlugCategoriaPage = () => {
  const tamanho = useLivroStore((s) => s.tamanho);

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

  const { slugCategoria } = useParams();
  const {
    data,
    isPending: carregandoLivros,
    error: errorLivros,
    hasNextPage,
    fetchNextPage,
    isFetchingNextPage
  } = useRecuperarLivrosPorSlugCategoriaComPaginacao({
    tamanho: tamanho.toString(),
    slugCategoria: slugCategoria || "",
  });

  if (carregandoLivros) return <CardsPlaceholderPage />;
  if (errorLivros) throw errorLivros;

  const livrosNoCarrinho: (LivroCarrinho | null)[] = [];
  data.pages.forEach((page) => {
    if(page){
        page.itens.forEach((livro) => {
            const livroCarrinho = carrinho.find(
                (item: LivroCarrinho) => item.idLivro === livro.id
            );
        livrosNoCarrinho.push(livroCarrinho ? livroCarrinho : null);
        });
    };
  });

  const livrosNosFavoritos: boolean[] = [];
  data.pages.forEach((page) => {
    if(page){
    page.itens.forEach((livro) => {
      const favorito = favoritos.find((id: number) => id === livro.id);
      livrosNosFavoritos.push(favorito ? true : false);
    });
    };
  });

  return (
    <InfiniteScroll
        style={{overflowX: "hidden"}}
        dataLength={data.pages.reduce((total, page) => total + page.totalDeItens, 0)}
        hasMore={hasNextPage}
        next={() => fetchNextPage()}
        loader={<h6>Carregando...</h6>}
    >
      <h5>
        {slugCategoria
          ? slugCategoria.charAt(0).toUpperCase() + slugCategoria.slice(1)
          : "Produtos"}
      </h5>
      <div className="row">
        {data.pages.map((page, pagina) => (
                page.itens.map((livro, index) => (
                <div key={livro.id} className="col-lg-4 col-md-4 col-sm-4 col-6 h-75">
            <Card
              livro={livro}
              livroNoCarrinho={livrosNoCarrinho[pagina * tamanho + index]}
              livroNosFavoritos={livrosNosFavoritos[pagina * tamanho + index]}
              adicionarLivro={adicionarLivro}
              subtrairLivro={subtrairLivro}
              alterarFavorito={alterarFavorito}
            />
            </div>
            ))

        ))}
      </div>
    </InfiniteScroll>
  );
};

export default CardsPorSlugCategoriaPage;
