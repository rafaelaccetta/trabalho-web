package com.devweb.rest.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.devweb.rest.model.Usuario;
import com.devweb.rest.repository.UsuarioRepository;
import com.devweb.rest.util.TokenResponse;

@Service
public class AutenticacaoService {

    @Autowired
    private UsuarioRepository usuarioRepository;

    public Usuario login(Usuario usuario) {
        return usuarioRepository.findByContaAndSenha(
                usuario.getConta(), usuario.getSenha());
    }

    public TokenResponse cadastrarUsuario(Usuario usuario) {
        Usuario existe = usuarioRepository.findByConta(usuario.getConta());
        if(existe != null) {
            return new TokenResponse(0);
        } else {
            usuarioRepository.save(usuario);
            return new TokenResponse(1);
        }
    }
}
