package com.devweb.rest;

import java.math.BigDecimal;
import java.time.LocalDate;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.devweb.rest.model.Categoria;
import com.devweb.rest.model.Livro;
import com.devweb.rest.model.Usuario;
import com.devweb.rest.repository.CategoriaRepository;
import com.devweb.rest.repository.LivroRepository;
import com.devweb.rest.repository.UsuarioRepository;

@SpringBootApplication
public class RestApplication implements CommandLineRunner{

	@Autowired
	private UsuarioRepository usuarioRepository;

	@Autowired
	private CategoriaRepository categoriaRepository;

	@Autowired
	private LivroRepository livroRepository;

	public static void main(String[] args) {
		SpringApplication.run(RestApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		Usuario usuario = new Usuario(
			"admin",
			"senha"
		);
		usuarioRepository.save(usuario);

		Categoria categoria1 = new Categoria("Romance", "romance");
		categoriaRepository.save(categoria1);

		Categoria categoria2 = new Categoria("Tecnologia", "tecnologia");
		categoriaRepository.save(categoria2);

		Categoria categoria3 = new Categoria("Ficção Científica", "ficcao-cientifica");
		categoriaRepository.save(categoria3);

		Livro livro = new Livro(
			"teste.png",
			"Orgulho e Preconceito",
			"orgulho-e-preconceito",
			"Um clássico romance de Jane Austen.",
			true,
			50,
			BigDecimal.valueOf(39.90),
			LocalDate.of(2023, 5, 10),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Clean Code",
			"clean-code",
			"Um guia para escrever código limpo, por Robert C. Martin.",
			true,
			30,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2022, 8, 15),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Duna",
			"duna",
			"O maior épico de ficção científica de todos os tempos.",
			true,
			20,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2021, 11, 1),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Programador Pragmático",
			"programador-pragmatico",
			"Melhore suas habilidades de programação.",
			true,
			15,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2023, 2, 20),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Admirável Mundo Novo",
			"admiravel-mundo-novo",
			"Um clássico da ficção científica por Aldous Huxley.",
			true,
			25,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2020, 7, 12),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Dom Casmurro",
			"dom-casmurro",
			"Obra-prima de Machado de Assis.",
			true,
			40,
			BigDecimal.valueOf(29.90),
			LocalDate.of(2019, 3, 5),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Romeu e Julieta",
			"romeu-e-julieta",
			"A famosa tragédia de William Shakespeare.",
			true,
			60,
			BigDecimal.valueOf(19.90),
			LocalDate.of(2017, 12, 1),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Anna Kariênina",
			"anna-karienina",
			"A profunda obra de Tolstói sobre amor, traição e sociedade.",
			true,
			35,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2019, 11, 23),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Morro dos Ventos Uivantes",
			"o-morro-dos-ventos-uivantes",
			"O clássico de Emily Brontë sobre amor e vingança.",
			true,
			45,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2020, 1, 15),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Grande Gatsby",
			"o-grande-gatsby",
			"O icônico romance de F. Scott Fitzgerald sobre o sonho americano.",
			true,
			55,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2021, 5, 12),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Cem Anos de Solidão",
			"cem-anos-de-solidao",
			"A obra-prima de Gabriel García Márquez sobre a saga de uma família.",
			true,
			40,
			BigDecimal.valueOf(79.90),
			LocalDate.of(2020, 10, 10),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Mataram a Cotovia",
			"mataram-a-cotovia",
			"O romance sobre racismo e perda de inocência de Harper Lee.",
			true,
			20,
			BigDecimal.valueOf(39.90),
			LocalDate.of(2018, 3, 14),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Sol é para Todos",
			"o-sol-e-para-todos",
			"Uma análise profunda sobre a justiça e o preconceito de Harper Lee.",
			true,
			30,
			BigDecimal.valueOf(45.90),
			LocalDate.of(2019, 7, 5),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Retrato de Dorian Gray",
			"o-retrato-de-dorian-gray",
			"A história de Oscar Wilde sobre beleza, moralidade e decadência.",
			true,
			25,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2020, 11, 30),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"As Aventuras de Huckleberry Finn",
			"as-aventuras-de-huckleberry-finn",
			"Mark Twain apresenta uma crítica à sociedade americana em uma narrativa de aventura.",
			true,
			50,
			BigDecimal.valueOf(29.90),
			LocalDate.of(2019, 2, 14),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Frankenstein",
			"frankenstein",
			"O romance gótico de Mary Shelley sobre criação, ambição e monstros.",
			true,
			40,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2020, 4, 17),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"A Insustentável Leveza do Ser",
			"a-insustentavel-leveza-do-ser",
			"A obra filosófica de Milan Kundera sobre o amor e a liberdade.",
			true,
			45,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2021, 3, 10),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Lobo da Estepe",
			"o-lobo-da-estepe",
			"Hermann Hesse explora a dualidade humana em uma história intensa.",
			true,
			35,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2022, 6, 20),
			categoria1
		);
		livroRepository.save(livro);

		// Livros de Ficção Científica
		livro = new Livro(
			"teste.png",
			"Fahrenheit 451",
			"fahrenheit-451",
			"A distopia de Ray Bradbury sobre um futuro onde os livros são proibidos.",
			true,
			20,
			BigDecimal.valueOf(69.90),
			LocalDate.of(2022, 3, 21),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Neuromancer",
			"neuromancer",
			"A obra seminal de William Gibson que inventou o cyberpunk.",
			true,
			40,
			BigDecimal.valueOf(79.90),
			LocalDate.of(2020, 6, 17),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Fundação",
			"fundacao",
			"A obra de Isaac Asimov que iniciou a famosa série de ficção científica.",
			true,
			35,
			BigDecimal.valueOf(69.90),
			LocalDate.of(2021, 1, 10),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Homem do Castelo Alto",
			"o-homem-do-castelo-alto",
			"Uma história alternativa sobre o triunfo do Eixo na Segunda Guerra Mundial.",
			true,
			25,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2022, 4, 12),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Jogo do Exterminador",
			"o-jogo-do-exterminador",
			"Um conto sobre um jovem prodígio do exército interplanetário, de Orson Scott Card.",
			true,
			50,
			BigDecimal.valueOf(39.90),
			LocalDate.of(2023, 6, 14),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Planeta dos Macacos",
			"o-planeta-dos-macacos",
			"A ficção científica clássica de Pierre Boulle sobre uma revolução de macacos.",
			true,
			45,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2021, 8, 5),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"1984",
			"1984",
			"O célebre livro de George Orwell sobre totalitarismo e vigilância.",
			true,
			30,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2020, 12, 1),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"A Máquina do Tempo",
			"a-maquina-do-tempo",
			"O clássico de H.G. Wells sobre viagens no tempo.",
			true,
			50,
			BigDecimal.valueOf(39.90),
			LocalDate.of(2021, 7, 25),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Fim da Infância",
			"o-fim-da-infancia",
			"Arthur C. Clarke apresenta uma visão futurista sobre a evolução da humanidade.",
			true,
			30,
			BigDecimal.valueOf(69.90),
			LocalDate.of(2022, 9, 1),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Guia do Mochileiro das Galáxias",
			"o-guia-do-mochileiro-das-galaxias",
			"Douglas Adams cria uma comédia irreverente e absurdamente divertida sobre o espaço.",
			true,
			40,
			BigDecimal.valueOf(59.90),
			LocalDate.of(2020, 5, 10),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Ciberespaço",
			"o-ciberespaco",
			"A visão visionária de William Gibson sobre o futuro digital e o ciberespaço.",
			true,
			35,
			BigDecimal.valueOf(69.90),
			LocalDate.of(2023, 1, 8),
			categoria3
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"A Guerra dos Mundos",
			"a-guerra-dos-mundos",
			"H.G. Wells narra a invasão de alienígenas na Terra em um dos maiores clássicos da ficção científica.",
			true,
			50,
			BigDecimal.valueOf(49.90),
			LocalDate.of(2021, 11, 17),
			categoria3
		);
		livroRepository.save(livro);

		// Livros de Tecnologia
		livro = new Livro(
			"teste.png",
			"Refatoração",
			"refatoracao",
			"Melhorando a estrutura do código sem alterar seu comportamento, de Martin Fowler.",
			true,
			25,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2021, 9, 18),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Design Patterns",
			"design-patterns",
			"Padrões de design para projetos de software, de Erich Gamma, Richard Helm, Ralph Johnson, John Vlissides.",
			true,
			40,
			BigDecimal.valueOf(109.90),
			LocalDate.of(2020, 10, 25),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Introdução à Algoritmos",
			"introducao-a-algoritmos",
			"Uma introdução moderna ao estudo de algoritmos, de Thomas H. Cormen.",
			true,
			35,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2023, 2, 10),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"The Pragmatic Programmer",
			"the-pragmatic-programmer",
			"O famoso livro sobre a arte de programar de Andrew Hunt e David Thomas.",
			true,
			50,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2022, 11, 20),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Arquitetura Limpa",
			"arquitetura-limpa",
			"Como os princípios de design podem ser aplicados à arquitetura de software, de Robert C. Martin.",
			true,
			40,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2022, 5, 15),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Domain-Driven Design",
			"domain-driven-design",
			"A abordagem de Eric Evans para modelagem de software complexa e de negócios.",
			true,
			45,
			BigDecimal.valueOf(129.90),
			LocalDate.of(2021, 4, 5),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"DevOps: A Cultura e a Prática",
			"devops-cultura-e-pratica",
			"Entenda o movimento DevOps e como ele transforma a entrega de software, de Gene Kim.",
			true,
			30,
			BigDecimal.valueOf(79.90),
			LocalDate.of(2020, 9, 1),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"The Mythical Man-Month",
			"the-mythical-man-month",
			"Reflexões de Fred Brooks sobre desenvolvimento de software e a natureza humana.",
			true,
			30,
			BigDecimal.valueOf(69.90),
			LocalDate.of(2022, 3, 20),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Design de Sistemas",
			"design-de-sistemas",
			"Um guia abrangente sobre como criar sistemas escaláveis e de alto desempenho.",
			true,
			20,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2022, 8, 10),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Programming Pearls",
			"programming-pearls",
			"Dicas e truques sobre programação, algoritmos e problemas computacionais, de Jon Bentley.",
			true,
			40,
			BigDecimal.valueOf(79.90),
			LocalDate.of(2021, 5, 1),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Reinforcement Learning: An Introduction",
			"reinforcement-learning-an-introduction",
			"O manual definitivo sobre aprendizado por reforço, de Richard S. Sutton e Andrew G. Barto.",
			true,
			25,
			BigDecimal.valueOf(119.90),
			LocalDate.of(2023, 4, 18),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Artificial Intelligence: A Modern Approach",
			"artificial-intelligence-modern-approach",
			"A referência mais completa sobre IA, de Stuart Russell e Peter Norvig.",
			true,
			60,
			BigDecimal.valueOf(149.90),
			LocalDate.of(2020, 2, 10),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Data Science for Business",
			"data-science-for-business",
			"Como aplicar técnicas de ciência de dados para melhorar o desempenho nos negócios, de Foster Provost e Tom Fawcett.",
			true,
			40,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2021, 6, 25),
			categoria2
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"O Programador Profissional",
			"programador-profissional",
			"A arte de escrever software com qualidade, de Peter S. C. W. Anderson.",
			true,
			45,
			BigDecimal.valueOf(89.90),
			LocalDate.of(2022, 10, 5),
			categoria2
		);
		livroRepository.save(livro);

	}

}
