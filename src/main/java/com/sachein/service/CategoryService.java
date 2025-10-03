package com.sachein.service;

import com.sachein.model.Category;

import java.util.List;

public interface CategoryService {

    Category createCategory(String name, Long restaurantId) throws Exception;

    List<Category> findCategoryByRestaurantId(Long restaurantId) throws Exception;

    Category findCategoryById(Long id) throws Exception;
}


