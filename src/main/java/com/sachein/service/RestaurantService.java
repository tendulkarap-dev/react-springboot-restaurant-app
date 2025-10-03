package com.sachein.service;

import com.sachein.dto.RestaurantDto;
import com.sachein.model.Restaurant;
import com.sachein.model.User;
import com.sachein.request.CreateRestaurantRequest;

import java.util.List;

public interface RestaurantService {

    public Restaurant createRestaurant(CreateRestaurantRequest req, User user);

    public Restaurant updateRestaurant (Long restaurantId, CreateRestaurantRequest updatedRestaurant)throws Exception;

    public void deleteRestaurant (Long restaurantId)throws Exception;

    public List<Restaurant> getAllRestaurants();

    public List<Restaurant> searchRestaurant(String keyword);

    public Restaurant findRestaurantById(Long id)throws Exception;

    public Restaurant getRestaurantByUserId(Long userId)throws Exception;

    public RestaurantDto addToFavourites(Long restaurantId, User user)throws Exception;

    public Restaurant updateRestaurantStatus(Long id)throws Exception;


}
