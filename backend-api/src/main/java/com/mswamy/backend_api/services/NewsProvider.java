package com.mswamy.backend_api.services;

import com.mswamy.backend_api.models.ArticleDTO;
import java.util.*;

public interface NewsProvider {
    List<ArticleDTO> fetchArticles(String query, Integer page);

    String getName(); // For error checking
}
