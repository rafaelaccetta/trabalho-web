import { useEffect, useState } from "react";
import useUsuarioStore from "../store/UsuarioStore";
import { useLocation, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import useEfetuarLogin from "../hooks/useEfetuarLogin";
import type Usuario from "../interfaces/Usuario";
import type TokenResponse from "../interfaces/TokenResponse";
import useCadastrarUsuario from "../hooks/useCadastrarUsuario";
import z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

const schema = z
  .object({
    conta: z.string().email(),
    senha: z
      .string()
      .trim()
      .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
      .trim(),
    confirmacaoSenha: z
      .string()
      .trim()
      .min(4, { message: "A senha deve ter pelo menos 4 caracteres" })
      .trim(),
  })
  .refine((data) => data.senha === data.confirmacaoSenha, {
    message: "As senhas devem ser iguais.",
    path: ["confirmacaoSenha"],
  });

type CadastroUsuarioForm = z.infer<typeof schema>;

const CadastroUsuarioForm = () => {

  const [usuarioJaExiste, setUsuarioJaExiste] = useState(false);

  const navigate = useNavigate();

  const { mutate: cadastrarUsuario, error: errorCadastrarUsuario } =
    useCadastrarUsuario();

  const {
    register,
    handleSubmit,
    setValue,
    reset,
    formState: { errors },
  } = useForm<CadastroUsuarioForm>({
    defaultValues: {
      conta: "",
      senha: "",
      confirmacaoSenha: "",
    },
    resolver: zodResolver(schema),
  });

  const submit = ({ conta, senha, confirmacaoSenha }: CadastroUsuarioForm) => {
    const usuario: Usuario = { conta, senha };

    cadastrarUsuario(usuario, {
      onSuccess: (response) => {
        console.log(response);
        if(response.Token == 0) {
          setUsuarioJaExiste(true);
        } else {
        navigate("/login")
        }
      }
    });
  };

  if (errorCadastrarUsuario) throw errorCadastrarUsuario;

  return (
    <form autoComplete="off" onSubmit={handleSubmit(submit)}>
      {usuarioJaExiste && (
        <div className="row">
          <div className="col-lg-6">
            <div className="alert alert-danger fw-bold" role="alert">
              Já existe um usuário com essa conta!
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
            placeholder="E-mail - Ex: user@mail.com"
            className={errors.conta ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
          />
          <div className="invadid-feedback">
            {errors.conta?.message}
          </div>
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
            placeholder="A senha deve ter pelo menos 4 caracteres."
            className={errors.senha ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
          />
          <div className="invadid-feedback">
            {errors.senha?.message}
          </div>
        </div>
      </div>

      <div className="row mb-3">
        <label htmlFor="confirmacaoSenha" className="col-lg-1 fw-bold mb-2">
          Confirmação da senha
        </label>
        <div className="col-lg-5">
          <input
            {...register("confirmacaoSenha")}
            type="password"
            id="confirmacaoSenha"
            placeholder="Insira novamente a senha."
            className={errors.confirmacaoSenha ? "form-control form-control-sm is-invalid" : "form-control form-control-sm"}
          />
          <div className="invadid-feedback">
            {errors.confirmacaoSenha?.message}
          </div>
        </div>
      </div>

      <div className="row">
        <div className="offset-lg-1 col-lg-5">
          <button type="submit" className="btn btn-outline-primary">
            Cadastrar
          </button>
        </div>
      </div>
    </form>
  );
};
export default CadastroUsuarioForm;
