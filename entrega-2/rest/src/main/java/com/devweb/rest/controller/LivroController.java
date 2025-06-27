package com.devweb.rest.controller;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.web.bind.annotation.*;

import com.devweb.rest.model.Livro;
import com.devweb.rest.model.ResultadoPaginado;
import com.devweb.rest.service.LivroService;

@CrossOrigin("http://localhost:5173")
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

    @GetMapping("categoria/{slugCategoria}")
    public List<Livro> recuperarLivrosPorSlugCategoria(@PathVariable("slugCategoria") String slugCategoria) {
        return livroService.recuperarLivrosPorSlugCategoria(slugCategoria);
    }

    @PostMapping
    public Livro cadastrarLivro(@RequestBody Livro livro) {
        return livroService.cadastrarLivro(livro);
    }

    @PutMapping
    public Livro alterarLivro(@RequestBody Livro livro) {
        return livroService.alterarLivro(livro);
    }

    @DeleteMapping("{idLivro}")
    public void removerLivro(@PathVariable("idLivro") long id) {
        livroService.removerLivro(id);
    }

    @GetMapping("paginacao")
    public ResultadoPaginado<Livro> recuperarLivrosComPaginacao(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "5") int tamanho,
            @RequestParam(value = "nome", defaultValue = "") String nome) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Livro> page = livroService.recuperarLivrosComPaginacao(pageable, nome);
        ResultadoPaginado<Livro> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

    @GetMapping("categoria/paginacao")
    public ResultadoPaginado<Livro> recuperarLivrosPaginadosPorSlugCategoria(
            @RequestParam(value = "pagina", defaultValue = "0") int pagina,
            @RequestParam(value = "tamanho", defaultValue = "3") int tamanho,
            @RequestParam(value = "slugCategoria", defaultValue = "") String slugCategoria) {
        Pageable pageable = PageRequest.of(pagina, tamanho);
        Page<Livro> page = livroService.recuperarLivrosPaginadosPorSlugCategoria(slugCategoria, pageable);
        ResultadoPaginado<Livro> resultadoPaginado = new ResultadoPaginado<>(
                page.getTotalElements(),
                page.getTotalPages(),
                page.getNumber(),
                page.getContent());
        return resultadoPaginado;
    }

}
