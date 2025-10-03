package com.sachein.controller;

import com.sachein.model.Category;
import com.sachein.model.User;
import com.sachein.request.IngredientCategoryRequest;
import com.sachein.service.CategoryService;
import com.sachein.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api")
public class CategoryController {

    @Autowired
    private CategoryService categoryService;

    @Autowired
    private UserService userService;

    // CREATE CATEGORY
    @PostMapping("/admin/category")
    public ResponseEntity<Category> createCategory(
            @RequestBody IngredientCategoryRequest request,
            @RequestHeader("Authorization") String jwt) throws Exception {

        if (request.getRestaurantId() == null) {
            throw new Exception("restaurantId is required in request body");
        }

        User user = userService.findUserByJwtToken(jwt);

        // Pass restaurantId from DTO
        Category createdCategory = categoryService.createCategory(request.getName(), request.getRestaurantId());

        return new ResponseEntity<>(createdCategory, HttpStatus.CREATED);
    }

    // GET CATEGORIES BY RESTAURANT ID
    @GetMapping("/category/restaurant/{id}")
    public ResponseEntity<List<Category>> getRestaurantCategory(
            @PathVariable Long id,
            @RequestHeader("Authorization") String jwt) throws Exception {

        User user = userService.findUserByJwtToken(jwt);

        List<Category> categories = categoryService.findCategoryByRestaurantId(id);
        return new ResponseEntity<>(categories, HttpStatus.OK);
    }
    @GetMapping("/test")
    public ResponseEntity<String> testEndpoint() {
        return ResponseEntity.ok("Controller is working");
    }

}
