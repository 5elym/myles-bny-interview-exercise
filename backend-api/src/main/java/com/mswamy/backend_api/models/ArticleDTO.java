package com.mswamy.backend_api.models;

public record ArticleDTO(String title, String summary, String publicationDate, String url,
        String source) {
}
