package com.mswamy.backend_api.clients;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.providers.GNewsProvider;
import com.mswamy.backend_api.services.NewsProvider;

@Service
public class GNewsClient implements NewsProvider {
    @Value("${gnews.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    @Override
    public List<ArticleDTO> fetchArticles(String query) {
        GNewsProvider response = restClient.get()
                .uri("https://gnews.io/api/v4/search?q={query}&apikey={apiKey}", query, apiKey)
                .retrieve()
                .body(GNewsProvider.class);

        if (response == null || response.articles() == null) {
            return List.of();
        }

        return response.articles().stream()
                .map(this::mapToArticleDTO)
                .toList();
    }

    private ArticleDTO mapToArticleDTO(GNewsProvider.Article article) {
        return new ArticleDTO(
                article.title(),
                article.description(),
                article.url(),
                article.publishedAt(),
                article.source().name());
    }
}
