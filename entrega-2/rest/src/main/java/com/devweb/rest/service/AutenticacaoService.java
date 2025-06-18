package com.devweb.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.rest.model.Usuario;
import com.devweb.rest.repository.UsuarioRepository;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario) {
        return usuarioRepository.findByContaAndSenha(
                usuario.getConta(), usuario.getSenha());
    }
}
