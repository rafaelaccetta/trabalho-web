package com.devweb.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.rest.model.Categoria;

public interface CategoriaRepository extends JpaRepository<Categoria, Long> {

}
