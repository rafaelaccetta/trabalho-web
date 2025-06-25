package com.devweb.rest.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.devweb.rest.model.Usuario;

public interface UsuarioRepository extends JpaRepository<Usuario, Long> {
    Usuario findByContaAndSenha(String conta, String senha);
    Usuario findByConta(String conta);
}
