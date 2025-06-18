import { useQuery } from "@tanstack/react-query";
import type Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarLivrosPorSlugCategoria = (slugCategoria?: string) => {
  const recuperarLivrosPorSlugCategoria = async (
    slugCategoria?: string
  ): Promise<Livro[]> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 500);
    });
    const response = await fetch(
      "http://localhost:8080/livros" +
        (slugCategoria ? "/categoria/" + slugCategoria : "")
    );
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar os livros com slugCategoria = " +
            slugCategoria +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: slugCategoria
      ? ["livros", "categoria", slugCategoria]
      : ["livros"],
    queryFn: () => recuperarLivrosPorSlugCategoria(slugCategoria),
    staleTime: 10_000,
  });
};
export default useRecuperarLivrosPorSlugCategoria;
