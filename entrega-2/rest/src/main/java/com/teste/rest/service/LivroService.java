package com.teste.rest.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.teste.rest.exception.LivroNaoEncontradoException;
import com.teste.rest.model.Livro;
import com.teste.rest.repository.LivroRepository;

@Service
public class LivroService {
    
    @Autowired
    private LivroRepository livroRepository;

    public List<Livro> recuperarLivros() {
        return livroRepository.findAll();
    }

    public Livro cadastrarLivro(Livro livro) {
        return livroRepository.save(livro);
    }

    @Transactional(rollbackFor = Exception.class)
    public void removerLivro(long id) {
        livroRepository.deleteById(id);
    }

    public Livro recuperarLivroPorId(long id) {
        return livroRepository.recuperarLivroPorId(id)
            .orElseThrow(() -> new LivroNaoEncontradoException(
                "Livro número " + id + " não encontrado."));
    }

}
