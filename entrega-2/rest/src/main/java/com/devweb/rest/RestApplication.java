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

		Categoria categoria1 = new Categoria(
			"Categoria Z",
			"categoriaz"
		);
		categoriaRepository.save(categoria1);

		Categoria categoria2 = new Categoria(
			"Categoria X",
			"categoriax"
		);
		categoriaRepository.save(categoria2);

		Categoria categoria3 = new Categoria(
			"Categoria Y",
			"categoriay"
		);
		categoriaRepository.save(categoria3);

		Livro livro = new Livro(
			"teste.png",
			"Livro X",
			"livrox",
			"livro x.",
			true,
			100,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2025, 1, 1),
			categoria1
		);
		livroRepository.save(livro);

		livro = new Livro(
			"teste.png",
			"Livro Y",
			"livroy",
			"livro y.",
			true,
			100,
			BigDecimal.valueOf(999.90),
			LocalDate.of(2025, 1, 1),
			categoria2
		);
		livroRepository.save(livro);
		
		livro = new Livro(
			"teste.png",
			"Livro Z",
			"livroz",
			"livro z.",
			false,
			100,
			BigDecimal.valueOf(9.90),
			LocalDate.of(2025, 1, 1),
			categoria3
		);
		livroRepository.save(livro);
		
		livro = new Livro(
			"teste.png",
			"Livro XXX",
			"livroxxx",
			"livro xxx.",
			true,
			100,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2025, 1, 1),
			categoria1
		);
		livroRepository.save(livro);
		
		livro = new Livro(
			"teste.png",
			"Livro Xxxxx",
			"livroxxxxx",
			"livro xxxxx.",
			true,
			100,
			BigDecimal.valueOf(99.90),
			LocalDate.of(2025, 1, 1),
			categoria1
		);
		livroRepository.save(livro);
		
		livro = new Livro(
			"teste.png",
			"Livro YYYY",
			"livroyyyy",
			"livro yyyy.",
			true,
			666,
			BigDecimal.valueOf(666.00),
			LocalDate.of(2025, 1, 1),
			categoria2
		);
		livroRepository.save(livro);
	}

}
