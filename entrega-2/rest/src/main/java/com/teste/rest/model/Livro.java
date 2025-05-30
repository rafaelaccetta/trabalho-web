package com.teste.rest.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@Entity
@NoArgsConstructor
public class Livro {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String imagem;
    private String nome;
    private String slug;
    private String descricao;
    private boolean disponivel;
    private int qtdEstoque;
    private BigDecimal preco;
    private LocalDate dataCadastro;


    public Livro(String imagem, String nome, String slug, String descricao, boolean disponivel, int qtdEstoque,
            BigDecimal preco, LocalDate dataCadastro) {
        this.imagem = imagem;
        this.nome = nome;
        this.slug = slug;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.qtdEstoque = qtdEstoque;
        this.preco = preco;
        this.dataCadastro = dataCadastro;
    }
}
