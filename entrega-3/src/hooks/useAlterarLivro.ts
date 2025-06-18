import { useMutation } from "@tanstack/react-query";
import type Livro from "../interfaces/Livro";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const alterarLivro = async (livro: Livro) => {
  const response = await fetch("http://localhost:8080/Livros", {
    method: "PUT",
    headers: {
      // tipo do conteúdo que o back-end espera receber
      'Content-Type': 'application/json', 
    },
    body: JSON.stringify(livro)
  });
    if (!response.ok) {
      const error: any = await response.json();
      if (isErrorResponse(error)) {
        throw error;
      } else {
        throw new Error(
          "Ocorreu um erro ao alterar um livro. Status code = " +
            response.status
        );
      }
    }
  return await response.json(); 
};

const useAlterarLivro = () => {
  return useMutation({
    mutationFn: (livro: Livro) => alterarLivro(livro),
    onSuccess: (livroAlterado: Livro) => {
      queryClient.invalidateQueries({
        queryKey: ["livros"]
      })
      queryClient.invalidateQueries({
        queryKey: ["livro", livroAlterado.id]
      })
    }
  });
}
export default useAlterarLivro;
