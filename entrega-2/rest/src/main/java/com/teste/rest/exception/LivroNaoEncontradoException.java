package com.teste.rest.exception;

public class LivroNaoEncontradoException extends RuntimeException {
    public LivroNaoEncontradoException(String message){
        super(message);
    }
}
