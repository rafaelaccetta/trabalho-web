import { useQuery } from "@tanstack/react-query";
import type Livro from "../interfaces/Livro";
import isErrorResponse from "../util/isErrorResponse";

const useRecuperarLivroPorId = (id: number, removido: boolean) => {
  
  const recuperarLivroPorId = async (id: number): Promise<Livro> => {
    const response = await fetch("http://localhost:8080/livros/" + id);
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao recuperar o livro com id = " +
            id +
            ". Status code = " +
            response.status
        );
      }
    }
    return await response.json();
  };

  return useQuery({
    queryKey: ["produto", id],
    queryFn: () => recuperarLivroPorId(id),
    staleTime: 10_000,
    enabled: !removido
  });
};
export default useRecuperarLivroPorId;
