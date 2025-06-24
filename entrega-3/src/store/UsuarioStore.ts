import { create } from "zustand";

interface UsuarioStore {
  usuarioLogado: number;
  setUsuarioLogado: (novoUsuarioLogado: number) => void;
}

const getUsuarioLogado = () => {
  const usuario = localStorage.getItem("usuarioLogado");
  return usuario ? Number(usuario) : 0;
};

const useUsuarioStore = create<UsuarioStore>((set) => ({
  usuarioLogado: getUsuarioLogado(),
  setUsuarioLogado: (novoUsuarioLogado: number) =>
    set(() => {
      localStorage.setItem("usuarioLogado", String(novoUsuarioLogado));
      return { usuarioLogado: novoUsuarioLogado };
    }),
}));

export default useUsuarioStore;