import { useQuery } from "@tanstack/react-query";
import type Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarLivros = () => {
  const recuperarLivros = async () => {
    const response = await fetch("http://localhost:8080/livros");
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar livros. Status code = " +
            response.status
        );
      }
    }
    return (await response.json()) as Livro[];
  };

  return useQuery({
    queryKey: ["livros"],
    queryFn: () => recuperarLivros(),
    staleTime: 10_000,
  });
};
export default useRecuperarLivros;
