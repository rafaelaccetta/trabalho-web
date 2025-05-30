package com.teste.rest.repository;

import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teste.rest.model.Livro;

import jakarta.persistence.LockModeType;

public interface LivroRepository extends JpaRepository<Livro, Long>{
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select l from Livro l where l.id = :id")
    Optional<Livro> recuperarLivroPorId(@Param("id") Long id);

}
