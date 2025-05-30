package com.teste.rest.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.teste.rest.model.Livro;

import jakarta.persistence.LockModeType;

public interface LivroRepository extends JpaRepository<Livro, Long>{
    
    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select l from Livro l left outer join fetch l.categoria where l.id = :id")
    Optional<Livro> recuperarLivroPorIdComLock(@Param("id") Long id);

    @Query("select l from Livro l left outer join fetch l.categoria order by l.id")
    List<Livro> recuperarLivrosComCategoria();

    @Query("select l from Livro l left outer join fetch l.categoria where l.id = :id")
    Optional<Livro> recuperarLivroPorId(@Param("id") Long id);

    @Query(
            value = "select l " +
                    "from Livro l " +
                    "left outer join fetch l.categoria " +
                    "where l.nome like :nome " +
                    "order by l.id",
            countQuery = "select count(l) from Livro l where l.nome like :nome"
    )
    Page<Livro> recuperarLivrosComPaginacao(Pageable pageable, @Param("nome") String nome);

    @Query("select l from Livro l " +
            "left outer join fetch l.categoria c " +
            "where c.slug = :slugCategoria " +
            "order by l.id")
    List<Livro> recuperarLivrosPorSlugCategoria(@Param("slugCategoria") String slugCategoria);
}
