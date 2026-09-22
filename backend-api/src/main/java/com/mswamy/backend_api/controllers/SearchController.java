package com.mswamy.backend_api.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.SearchParams;
import com.mswamy.backend_api.services.NewsProvider;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/search")
public class SearchController {
    private static final Logger LOGGER = LoggerFactory.getLogger(SearchController.class);

    private final List<NewsProvider> newsProviders;

    public SearchController(List<NewsProvider> newsProviders) {
        this.newsProviders = newsProviders;
    }

    @GetMapping
    @Cacheable(value = "articles", key = "#params.hashCode()", condition = "#params.page() == 1")
    public List<ArticleDTO> searchNews(@ModelAttribute SearchParams params) {
        LOGGER.info("Results not found in cache for query: {}. Fetching from providers...", params.query());

        List<ArticleDTO> articles = new ArrayList<>();

        boolean callAllProviders = params.provider() == null
                || params.provider().isEmpty()
                || params.provider().equalsIgnoreCase("all");

        for (NewsProvider provider : newsProviders) {
            if (callAllProviders || provider.getName().equalsIgnoreCase(params.provider())) {
                LOGGER.info("Fetching articles from: {} for query: {}", provider.getName(), params.query());
                try {
                    articles.addAll(provider.fetchArticles(params));
                } catch (Exception e) {
                    LOGGER.error("{} failed. Error: {}", provider.getName(), e.getMessage(), e);
                }
            } else {
                LOGGER.info("Skipping provider: {}", provider.getName());
            }
        }

        return articles;
    }

    @GetMapping("/providers")
    public List<String> getProviders() {
        LOGGER.info("Getting provider names");
        List<String> providers = new ArrayList<>();
        for (NewsProvider provider : newsProviders) {
            providers.add(provider.getName());
        }

        return providers;
    }
}
