package com.mswamy.backend_api.exceptions;

public class APIRateLimitedException extends RuntimeException {

    public APIRateLimitedException(String message) {
        super(message);
    }
}
