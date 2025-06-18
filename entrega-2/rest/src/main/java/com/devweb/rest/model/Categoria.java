package com.devweb.rest.model;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;
import jakarta.persistence.Id;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import lombok.ToString;

@Getter
@Setter
@NoArgsConstructor
@ToString
@Entity
public class Categoria {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String nome;
    private String slug;

    @JsonIgnore
    @OneToMany (mappedBy = "categoria")
    private List<Livro> livros;

    public Categoria(String nome, String slug) {
        this.nome = nome;
        this.slug = slug;
    }
}
