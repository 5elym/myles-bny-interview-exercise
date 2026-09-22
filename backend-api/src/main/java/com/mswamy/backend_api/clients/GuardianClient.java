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
import com.mswamy.backend_api.models.providers.GuardianResponse;
import com.mswamy.backend_api.services.NewsProvider;

@Service
@Order(2)
public class GuardianClient implements NewsProvider {
    private static final Logger LOGGER = LoggerFactory.getLogger(GuardianClient.class);

    @Value("${guardian.api.key}")
    private String API_KEY;
    private final String BASE_API_URL = "https://content.guardianapis.com/search";

    private final RestClient restClient = RestClient.create();

    @Override
    public List<ArticleDTO> fetchArticles(SearchParams params) {
        UriComponentsBuilder uri = UriComponentsBuilder.fromUriString(this.BASE_API_URL)
                .queryParam("q", params.query())
                .queryParam("page", params.page())
                .queryParam("lang", "en")
                .queryParam("show-fields", "thumbnail,trailText")
                .queryParam("api-key", this.API_KEY);

        if (params.category() != null) {
            String section = switch (params.category().toLowerCase()) {
                case "sports" -> "sport";
                case "entertainment" -> "culture";
                default -> params.category().toLowerCase();
            };
            uri.queryParam("section", section);
        }

        if (params.fromDate() != null) {
            uri.queryParam("from-date", params.fromDate());
        }
        if (params.toDate() != null) {
            uri.queryParam("to-date", params.toDate());
        }

        GuardianResponse response = restClient.get()
                .uri(uri.build().toUriString())
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

        if (response == null || response.response() == null || response.response().results().size() <= 0) {
            LOGGER.info("No results found on Guardian");
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
