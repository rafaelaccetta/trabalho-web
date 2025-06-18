import { type FormEvent, useRef } from "react";
import useLivroStore from "../store/LivroStore";

const Pesquisa = () => {
  const setNome = useLivroStore((s) => s.setNome);
  const setPagina = useLivroStore((s) => s.setPagina);
  
  const nomeRef = useRef<HTMLInputElement>(null);

  const tratarNome = (nome: string) => {
    setNome(nome);
    setPagina(0);
  };

  return (
    <form
      onSubmit={(event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();   // evita que a requisição seja enviada para o servidor
        tratarNome(nomeRef.current!.value);
      }}
      className="d-flex flex-row mb-3"
    >
      <input
        ref={nomeRef}
        type="text"
        className="form-control form-control-sm me-3"
        placeholder="Informe o nome do produto..."
      />
      <button type="submit" className="btn btn-primary btn-sm px-4">
        Pesquisar
      </button>
    </form>
  );
};
export default Pesquisa;
