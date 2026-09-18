package com.mswamy.backend_api.models;

public record ArticleDTO(String headline, String summary, String author, String publicationDate, String url,
        String source) {
}
