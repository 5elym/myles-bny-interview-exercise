package com.mswamy.backend_api.clients;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;

import com.mswamy.backend_api.exceptions.APIRateLimitedException;
import com.mswamy.backend_api.exceptions.InvalidQueryException;
import com.mswamy.backend_api.exceptions.UnreachableProviderException;
import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.providers.GuardianResponse;
import com.mswamy.backend_api.services.NewsProvider;

@Service
@Order(2)
public class GuardianClient implements NewsProvider {
    @Value("${guardian.api.key}")
    private String apiKey;

    private final RestClient restClient = RestClient.create();

    @Override
    public List<ArticleDTO> fetchArticles(String query, Integer page) {
        GuardianResponse response = restClient.get()
                .uri("https://content.guardianapis.com/search?q={query}&page={page}&lang=en&show-fields=trailText,thumbnail&api-key={apiKey}",
                        query, page, apiKey)
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, res) -> {
                    // Error handling
                    switch (res.getStatusCode().value()) {
                        case 400 -> throw new InvalidQueryException("Guardian API received an invalid request!");
                        case 403, 429 -> throw new APIRateLimitedException("Guardian API rate limit reached!");
                        case 500, 503 -> throw new UnreachableProviderException("Cannot reach the Guardian API!");
                        default ->
                            throw new RuntimeException("Error Code from Guardian API: " + res.getStatusCode().value());
                    }
                })
                .body(GuardianResponse.class);

        if (response == null || response.response() == null) {
            return List.of();
        }

        return response.response().results().stream()
                .map(this::mapToArticleDTO)
                .toList();
    }

    private ArticleDTO mapToArticleDTO(GuardianResponse.Article article) {
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
