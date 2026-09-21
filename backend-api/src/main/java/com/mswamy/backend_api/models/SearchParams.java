package com.mswamy.backend_api.models;

public record SearchParams(
        String query,
        Integer page,
        String provider,
        String category,
        String fromDate,
        String toDate) {

    public SearchParams {
        if (page == null || page < 1)
            page = 1;
    }
}
