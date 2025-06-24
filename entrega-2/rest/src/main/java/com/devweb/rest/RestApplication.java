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
	}

}
