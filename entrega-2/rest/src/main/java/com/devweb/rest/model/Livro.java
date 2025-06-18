package com.devweb.rest.model;

import java.math.BigDecimal;
import java.time.LocalDate;

import jakarta.persistence.*;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
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
    
    @NotEmpty(message = "A imagem deve ser informada.")
    private String imagem;
    
    @NotEmpty(message = "O nome deve ser informado.")
    private String nome;
    
    private String slug;
    
    @NotEmpty(message = "A descrição deve ser informada.")
    private String descricao;

    private boolean disponivel;

    @NotNull(message = "A quantidade deve ser informada.")
    @Min(value=0, message = "A quantidade deve ser maior ou igual a 0. ")
    private Integer qtdEstoque;

    @NotNull(message = "O preço deve ser informado.")
    @DecimalMin(inclusive = true, value = "0.1", message = "O preço deve ser maior ou igual a 0.1.")
    private BigDecimal preco;

    @NotNull(message = "A quantidade deve ser informada.")
    private LocalDate dataCadastro;

    @NotNull(message = "A quantidade deve ser informada.")
    @ManyToOne
    private Categoria categoria;

    public Livro(String imagem, String nome, String slug, String descricao, boolean disponivel, int qtdEstoque,
            BigDecimal preco, LocalDate dataCadastro, Categoria categoria) {
        this.imagem = imagem;
        this.nome = nome;
        this.slug = slug;
        this.descricao = descricao;
        this.disponivel = disponivel;
        this.qtdEstoque = qtdEstoque;
        this.preco = preco;
        this.dataCadastro = dataCadastro;
        this.categoria = categoria;
    }
}
