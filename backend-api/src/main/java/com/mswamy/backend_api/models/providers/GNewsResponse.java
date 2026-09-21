package com.mswamy.backend_api.models.providers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GNewsResponse(List<Article> articles) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Article(
            String title,
            String description,
            String url,
            String publishedAt,
            Source source,
            String image) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Source(String name) {
    }
}
