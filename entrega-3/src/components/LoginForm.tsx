import { useEffect, useState } from "react";
import useUsuarioStore from "../store/UsuarioStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import type Usuario from "../interfaces/Usuario";
import type TokenResponse from "../interfaces/TokenResponse";

interface FormLogin {
  conta: string;
  senha: string;
}

const LoginForm = () => {
  const setUsuarioLogado = useUsuarioStore((s) => s.setUsuarioLogado);
  const [loginInvalido, setLoginInvalido] = useState(false);

  useEffect(() => {
    setUsuarioLogado(0); // Logout ao entrar na tela de login.
  }, []);

  const location = useLocation();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm<FormLogin>();

  const { mutate: efetuarLogin, error: errorEfetuarLogin } = useEfetuarLogin();

  const submit = ({ conta, senha }: FormLogin) => {
    const usuario: Usuario = { conta, senha };

    efetuarLogin(usuario, {
      onSuccess: (tokenResponse: TokenResponse) => {
        console.log(tokenResponse.token)
        if (tokenResponse.token > 0) {
          setUsuarioLogado(tokenResponse.token);
          if (location.state?.destino) {
            navigate(location.state.destino);
          } else {
            navigate("/");
          }
        } else {
          setLoginInvalido(true);
        }
      },
    });
  };

  if (errorEfetuarLogin) throw errorEfetuarLogin;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {loginInvalido && (
        <div className="row">
          <div className="col-lg-6">
            <div className="alert alert-danger fw-bold" role="alert">
              Login inválido!
            </div>
          </div>
        </div>
      )}
      <div className="row mb-2">
        <label htmlFor="conta" className="col-lg-1 fw-bold mb-2">
          Conta
        </label>
        <div className="col-lg-5">
          <input
            {...register("conta")} // onChange(), onBlur(), name, ref
            type="text"
            id="conta"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="senha" className="col-lg-1 fw-bold mb-2">
          Senha
        </label>
        <div className="col-lg-5">
          <input
            {...register("senha")}
            type="password"
            id="senha"
            className="form-control form-control-sm"
          />
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-1 col-lg-5">
          <button type="submit" className="btn btn-outline-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              className="bi bi-box-arrow-in-left"
              viewBox="0 0 16 16"
            >
              <path
                fill-rule="evenodd"
                d="M10 3.5a.5.5 0 0 0-.5-.5h-8a.5.5 0 0 0-.5.5v9a.5.5 0 0 0 .5.5h8a.5.5 0 0 0 .5-.5v-2a.5.5 0 0 1 1 0v2A1.5 1.5 0 0 1 9.5 14h-8A1.5 1.5 0 0 1 0 12.5v-9A1.5 1.5 0 0 1 1.5 2h8A1.5 1.5 0 0 1 11 3.5v2a.5.5 0 0 1-1 0z"
              />
              <path
                fill-rule="evenodd"
                d="M4.146 8.354a.5.5 0 0 1 0-.708l3-3a.5.5 0 1 1 .708.708L5.707 7.5H14.5a.5.5 0 0 1 0 1H5.707l2.147 2.146a.5.5 0 0 1-.708.708z"
              />
            </svg>
            Entrar
          </button>
        </div>
      </div>
    </form>
  );
};
export default LoginForm;
