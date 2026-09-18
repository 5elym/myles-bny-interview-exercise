package com.mswamy.backend_api.models.providers;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import java.util.List;

@JsonIgnoreProperties(ignoreUnknown = true)
public record GuardianProvider(ResponseData response) {

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record ResponseData(List<Article> results) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Article(
            @JsonProperty("webTitle") String title,
            @JsonProperty("webUrl") String url,
            @JsonProperty("webPublicationDate") String publishedDate,
            Fields fields) {
    }

    @JsonIgnoreProperties(ignoreUnknown = true)
    public record Fields(
            String trailText,
            String thumbnail // Catches The Guardian thumbnail
    ) {
    }
}
