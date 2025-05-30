package com.teste.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.teste.rest.model.Livro;
import com.teste.rest.service.LivroService;

@RestController
@RequestMapping("/livros")
public class LivroController {
    
    @Autowired
    private LivroService livroService;

    @GetMapping
    public List<Livro> recuperarLivros() {
        return livroService.recuperarLivros();
    }

    @GetMapping("{idLivro}")
    public Livro recuperarLivroPorId(@PathVariable("idLivro") long id) {
        return livroService.recuperarLivroPorId(id);
    }

    @PostMapping
    public Livro cadastrarLivro(@RequestBody Livro livro) {
        return livroService.cadastrarLivro(livro);
    }

    @DeleteMapping("{idLivro}")
    public void removerLivro(@PathVariable("idLivro") long id) {
        livroService.removerLivro(id);
    }

}
