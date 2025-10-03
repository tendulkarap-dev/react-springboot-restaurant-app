package com.sachein.repository;

import com.sachein.model.Restaurant;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface RestaurantRepository extends JpaRepository<Restaurant,Long> {

    @Query("SELECT r FROM Restaurant r WHERE lower(r.name) LIKE lower(concat('%',:query,'%')) " +
            "OR lower(r.cuisineType) LIKE lower(concat('%',:query,'%')) ")

    List<Restaurant> findBySearchQuery(String Query);
    Restaurant findByOwnerId(Long userId);

    Long id(Long id);
}
