package com.mswamy.backend_api.services;

import com.mswamy.backend_api.models.ArticleDTO;
import java.util.*;

public interface NewsArticleMapper<T> {
    List<ArticleDTO> mapToArticleDTOList(T sourcedArticles);
}
