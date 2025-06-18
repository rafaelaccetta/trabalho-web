import { useMutation } from "@tanstack/react-query";
import queryClient from "../main";
import isErrorResponse from "../util/isErrorResponse";

const removerLivroPorId = async (id: number) => {
  const response = await fetch("http://localhost:8080/livros/" + id, {
    method: "DELETE",
  });
  if (!response.ok) {
    const error: any = await response.json();
    if (isErrorResponse(error)) {
      throw error;
    } else {
      throw new Error(
        "Ocorreu um erro ao remover o livro com id = " +
          id +
          ". Status code = " +
          response.status
      );
    }
  }
};

const useRemoverLivroPorId = () => {
  return useMutation({
    mutationFn: (id: number) => removerLivroPorId(id),
    onSuccess: (_, id) => {
      queryClient.invalidateQueries({
        queryKey: ["livros"],
      });
      queryClient.invalidateQueries({
        queryKey: ["livro", id],
      });
    },
  });
};
export default useRemoverLivroPorId;
