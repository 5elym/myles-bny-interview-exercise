package com.mswamy.backend_api.clients;

import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.core.annotation.Order;
import org.springframework.http.HttpStatusCode;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.web.util.UriComponentsBuilder;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import com.mswamy.backend_api.exceptions.APIRateLimitedException;
import com.mswamy.backend_api.exceptions.InvalidQueryException;
import com.mswamy.backend_api.exceptions.UnreachableProviderException;
import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.SearchParams;
import com.mswamy.backend_api.models.providers.GNewsResponse;
import com.mswamy.backend_api.services.NewsProvider;

@Service
@Order(1)
public class GNewsClient implements NewsProvider {
    private static final Logger LOGGER = LoggerFactory.getLogger(GNewsClient.class);

    @Value("${gnews.api.key}")
    private String API_KEY;
    private static final String SEARCH_API_URL = "https://gnews.io/api/v4/search";
    private static final String TOP_HEADLINES_API_URL = "https://gnews.io/api/v4/top-headlines"; // For category filter

    private final RestClient restClient = RestClient.create();

    @Override
    public List<ArticleDTO> fetchArticles(SearchParams params) {
        boolean hasCategory = params.category() != null && !params.category().isBlank();
        String apiUrl = hasCategory ? TOP_HEADLINES_API_URL : SEARCH_API_URL;

        UriComponentsBuilder uri = UriComponentsBuilder.fromUriString(apiUrl)
                .queryParam("q", params.query())
                .queryParam("page", params.page())
                .queryParam("lang", "en")
                .queryParam("apikey", this.API_KEY);

        if (hasCategory) {
            uri.queryParam("category", params.category());
        }

        // GNews requires ISO-8601 format: YYYY-MM-DDTHH:MM:SSZ
        if (params.fromDate() != null) {
            uri.queryParam("from", params.fromDate() + "T00:00:00Z");
        }
        if (params.toDate() != null) {
            uri.queryParam("to", params.toDate() + "T00:00:00Z");
        }

        GNewsResponse response = restClient.get()
                .uri(uri.build().toUriString())
                .retrieve()
                .onStatus(HttpStatusCode::isError, (request, res) -> {
                    // Error handling
                    switch (res.getStatusCode().value()) {
                        case 400 -> throw new InvalidQueryException("GNews API received an invalid request!");
                        case 403, 429 -> throw new APIRateLimitedException("GNews API rate limit reached!");
                        case 500, 503 -> throw new UnreachableProviderException("Cannot reach the GNews API!");
                        default ->
                            throw new RuntimeException("Error Code from GNews API: " + res.getStatusCode().value());
                    }
                })
                .body(GNewsResponse.class);

        if (response == null || response.articles() == null || response.articles().size() <= 0) {
            LOGGER.info("No results found on GNews");
            return List.of();
        }

        return response.articles().stream()
                .map(this::mapToArticleDTO)
                .toList();
    }

    private ArticleDTO mapToArticleDTO(GNewsResponse.Article article) {
        return new ArticleDTO(
                article.title(),
                article.description(),
                article.publishedAt(),
                article.url(),
                article.source().name(),
                article.image());
    }

    @Override
    public String getName() {
        return "GNews";
    }
}
