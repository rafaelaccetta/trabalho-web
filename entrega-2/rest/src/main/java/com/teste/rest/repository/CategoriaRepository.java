package com.teste.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.teste.rest.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
