import { useMutation } from "@tanstack/react-query";
import type Usuario from "../interfaces/Usuario";
import isErrorResponse from "../util/isErrorResponse";

const efetuarLogin = async (usuario: Usuario) => {
  const response = await fetch("http://localhost:8080/autenticacao/login", {
    method: "POST",
    headers: {
      // tipo do conteúdo que o back-end espera receber
      "Content-Type": "application/json",
    },
    body: JSON.stringify(usuario),
  });

  console.log(response);

  if (!response.ok) {
    const error: any = await response.json();
    if (isErrorResponse(error)) {
      throw error;
    } else {
      throw new Error(
        "Ocorreu um erro ao efetuar login. Status code = " + response.status
      );
    }
  }
  const responseJson = await response.json();
  console.log(responseJson);
  return responseJson;
};

const useEfetuarLogin = () => {
  return useMutation({
    mutationFn: (usuario: Usuario) => efetuarLogin(usuario),
  });
};
export default useEfetuarLogin;
