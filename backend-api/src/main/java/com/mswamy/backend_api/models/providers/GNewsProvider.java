package com.mswamy.backend_api.models.providers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GNewsProvider(List<Article> articles) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Article(
            String title,
            String description,
            String url,
            String publishedAt,
            Source source) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Source(String name) {
    }
}
