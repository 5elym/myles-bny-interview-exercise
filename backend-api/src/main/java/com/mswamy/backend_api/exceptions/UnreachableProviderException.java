package com.mswamy.backend_api.exceptions;

public class UnreachableProviderException extends RuntimeException {

    public UnreachableProviderException(String message) {
        super(message);
    }
}
