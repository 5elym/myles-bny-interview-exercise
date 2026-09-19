package com.mswamy.backend_api.clients;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.providers.GuardianProvider;
import com.mswamy.backend_api.services.NewsProvider;

@Service
@Order(2)
public class GuardianClient implements NewsProvider {
    @Value("${guardian.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    @Override
    public List<ArticleDTO> fetchArticles(String query) {
        GuardianProvider response = restClient.get()
                .uri("https://content.guardianapis.com/search?q={query}&lang=en&&show-fields=trailText,thumbnail&api-key={apiKey}",
                        query, apiKey)
                .retrieve()
                .body(GuardianProvider.class);

        if (response == null || response.response() == null) {
            return List.of();
        }

        return response.response().results().stream()
                .map(this::mapToArticleDTO)
                .toList();
    }

    private ArticleDTO mapToArticleDTO(GuardianProvider.Article article) {
        return new ArticleDTO(
                article.title(),
                article.fields() != null ? article.fields().trailText() : null,
                article.publishedDate(),
                article.url(),
                "The Guardian",
                article.fields() != null ? article.fields().thumbnail() : null);
    }

    @Override
    public String getName() {
        return "The Guardian";
    }
}
