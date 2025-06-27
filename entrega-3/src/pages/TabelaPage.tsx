import Paginacao from "../components/Paginacao";
import Pesquisa from "../components/Pesquisa";
import TabelaDeLivros from "../components/TabelaDeLivros";

const TabelaPage = () => {
  return (
    <>
      <div className="mb-4">
        <h5>Tabela de Livros</h5>
        <hr className="mt-1" />
      </div>

      <Pesquisa />
      <TabelaDeLivros />
      <Paginacao />
    </>
  );
};

export default TabelaPage;
