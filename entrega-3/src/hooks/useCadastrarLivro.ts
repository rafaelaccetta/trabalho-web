import { useMutation } from "@tanstack/react-query";
import type Livro from "../interfaces/Livro";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const cadastrarLivro = async (livro: Livro) => {
  const response = await fetch("http://localhost:8080/livros", {
    method: "POST",
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
          "Ocorreu um erro ao cadastrar um livro. Status code = " +
            response.status
        );
      }
    }
  return await response.json(); 
};

const useCadastrarLivro = () => {
  return useMutation({
    mutationFn: (livro: Livro) => cadastrarLivro(livro),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["livros"]
      })
    }
  });
}
export default useCadastrarLivro;
