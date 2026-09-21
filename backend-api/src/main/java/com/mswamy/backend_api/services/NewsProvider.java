package com.mswamy.backend_api.services;

import com.mswamy.backend_api.models.ArticleDTO;
import com.mswamy.backend_api.models.SearchParams;

import java.util.*;

public interface NewsProvider {
    List<ArticleDTO> fetchArticles(SearchParams params);

    String getName(); // For error checking
}
