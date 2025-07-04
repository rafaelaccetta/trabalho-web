package com.devweb.rest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.devweb.rest.exception.EntidadeNaoEncontradaException;
import com.devweb.rest.model.Livro;
import com.devweb.rest.repository.LivroRepository;

@Service
public class LivroService {
    
    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> recuperarLivros() {
        return livroRepository.recuperarLivrosComCategoria();
    }

    public Livro cadastrarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional
    public Livro alterarLivro(Livro livro) {
        livroRepository.recuperarLivroPorIdComLock(livro.getId())
            .orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Livro número " + livro.getId() + " não encontrado."));
        return livroRepository.save(livro);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerLivro(long id) {
        livroRepository.deleteById(id);
    }

    public Livro recuperarLivroPorId(long id) {
        return livroRepository.recuperarLivroPorId(id)
            .orElseThrow(() -> new EntidadeNaoEncontradaException(
                "Livro número " + id + " não encontrado."));
    }

    public Page<Livro> recuperarLivrosComPaginacao(Pageable pageable, String nome) {
        return livroRepository.recuperarLivrosComPaginacao(pageable, "%" + nome + "%");
    }

    public List<Livro> recuperarLivrosPorSlugCategoria(String slugCategoria) {
        return livroRepository.recuperarLivrosPorSlugCategoria(slugCategoria);
    }

    public Page<Livro> recuperarLivrosPaginadosPorSlugCategoria(String slugCategoria, Pageable pageable) {
        if(!slugCategoria.isEmpty()) {
            return livroRepository.recuperarLivrosPaginadosPorSlugCategoria(slugCategoria, pageable);
        }
        else {
            return livroRepository.recuperarLivrosPaginados(pageable);
        }
    }

}
