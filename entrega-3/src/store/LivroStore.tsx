import { create } from "zustand";
import type Livro from "../interfaces/Livro";

interface LivroStore {
    pagina: number;
    tamanho: number;
    nome: string;
    mensagem: string;
    livroSelecionado: Livro;

    setPagina: (novaPagina: number) => void;
    setNome: (novoNome: string) => void;
    setMensagem: (novaMensagem: string) => void;
    setLivroSelecionado: (novoLivroSelecionado: Livro) => void;
}

const useLivroStore = create<LivroStore>((set) => ({
    pagina: 0,
    tamanho: 5,
    nome: "",
    mensagem: "",
    livroSelecionado: {} as Livro,

    setPagina: (novaPagina: number) => set(() => ({pagina: novaPagina})),
    setNome: (novoNome: string) => set(() => ({nome: novoNome})),
    setMensagem: (novaMensagem: string) => set(() => ({mensagem: novaMensagem})),
    setLivroSelecionado: (novoLivroSelecionado: Livro) => set(() => ({livroSelecionado: novoLivroSelecionado}))
}))
export default useLivroStore;