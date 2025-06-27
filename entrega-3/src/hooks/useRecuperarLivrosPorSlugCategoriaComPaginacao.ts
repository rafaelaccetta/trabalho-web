import { keepPreviousData, useInfiniteQuery } from "@tanstack/react-query";
import type ResultadoPaginado from "../interfaces/ResultadoPaginado";
import type Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

interface QueryString {  
  tamanho: string;
  slugCategoria?: string;
}

interface QueryStringComPagina {  
  pagina: string;
  tamanho: string;
  slugCategoria?: string;
}

const useRecuperarLivrosPorSlugCategoriaComPaginacao = (queryString: QueryString) => {
  
  const recuperarLivrosPorSlugCategoriaComPaginacao = 
    async (queryStringComPagina: QueryStringComPagina): Promise<ResultadoPaginado<Livro>> => {
    
    const response = await fetch("http://localhost:8080/livros/categoria/paginacao?" + 
      new URLSearchParams({
        // pagina: queryString.pagina,
        // tamanho: queryString.tamanho
        ...queryStringComPagina
      }));

    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar livros com paginação. Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };
  
  return useInfiniteQuery({
    queryKey: ["livros", "categoria", "paginacao", queryString],
    queryFn: async ({pageParam}) => recuperarLivrosPorSlugCategoriaComPaginacao({
      pagina: pageParam.toString(),
      ...queryString
    }),
    staleTime: 0,
    placeholderData: keepPreviousData,
    initialPageParam: 0,
    getNextPageParam: (lastPage) => {
      return lastPage.paginaCorrente < lastPage.totalDePaginas - 1 ? lastPage.paginaCorrente + 1 : undefined;
    }
  });
};
export default useRecuperarLivrosPorSlugCategoriaComPaginacao;
