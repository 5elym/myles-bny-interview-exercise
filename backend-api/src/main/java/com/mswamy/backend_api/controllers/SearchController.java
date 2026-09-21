package com.mswamy.backend_api.controllers;

import java.util.ArrayList;
import java.util.List;

import org.springframework.cache.annotation.Cacheable;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.services.NewsProvider;

@CrossOrigin(origins = "http://localhost:5173")
@RestController
@RequestMapping("/search")
public class SearchController {

    private final List<NewsProvider> newsProviders;

    public SearchController(List<NewsProvider> newsProviders) {
        this.newsProviders = newsProviders;
    }

    @GetMapping
    @Cacheable(value = "articles", key = "#q")
    public List<ArticleDTO> searchNews(@RequestParam String q) {
        System.out.println("Results not found in cache for query: " + q + ". Fetching from providers...");

        List<ArticleDTO> articles = new ArrayList<>();

        for (NewsProvider provider : newsProviders) {
            System.out.println("Fetching articles from: " + provider.getName() + " for query: " + q);
            try {
                articles.addAll(provider.fetchArticles(q));
            } catch (Exception e) {
                System.out.println(provider.getName() + " failed.");
                System.out.println("Error: " + e.getMessage());
            }
        }

        return articles;
    }
}
