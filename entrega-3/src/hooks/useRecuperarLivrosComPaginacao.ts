import { keepPreviousData, useQuery } from "@tanstack/react-query";
import type ResultadoPaginado from "../interfaces/ResultadoPaginado";
import type Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

interface QueryString {  
  pagina: string;
  tamanho: string;
  nome: string;
}

const useRecuperarLivrosComPaginacao = (queryString: QueryString) => {
  
  const recuperarLivrosComPaginacao = async (queryString: QueryString) => {

    const response = await fetch("http://localhost:8080/livros/paginacao?" + 
      new URLSearchParams({
        ...queryString
      }).toString());

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
    return (await response.json()) as ResultadoPaginado<Livro>; // asserção de tipo
  };

  return useQuery({
    // É preciso acrescentar o return antes de useQuery.
    // Veja que na linha 5 o return está implícito.
    queryKey: ["produtos", "paginacao", queryString],
    queryFn: async () => recuperarLivrosComPaginacao(queryString),
    staleTime: 0,
    placeholderData: keepPreviousData, // mostrar com e sem isso. Importante manter o setTimeout.
  });
};
export default useRecuperarLivrosComPaginacao;
