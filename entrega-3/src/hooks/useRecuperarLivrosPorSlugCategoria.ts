import { useQuery } from "@tanstack/react-query";
import Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarLivrosPorSlugCategoria = (slugCategororia?: string) => {
  const recuperarLivrosPorSlugCategoria = async (
    slugCategororia?: string
  ): Promise<Livro[]> => {
    await new Promise((resolve) => {
      setTimeout(resolve, 2000);
    });
    const response = await fetch(
      "http://localhost:8080/livros" +
        (slugCategororia ? "/categoria/" + slugCategororia : "")
    );
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar os livros com slugCategororia = " +
            slugCategororia +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: slugCategororia
      ? ["livros", "categoria", slugCategororia]
      : ["livros"],
    queryFn: () => recuperarLivrosPorSlugCategoria(slugCategororia),
    staleTime: 10_000,
  });
};
export default useRecuperarLivrosPorSlugCategoria;
