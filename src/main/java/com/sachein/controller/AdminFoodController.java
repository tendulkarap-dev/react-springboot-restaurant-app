package com.sachein.controller;

import com.sachein.model.Food;
import com.sachein.model.Restaurant;
import com.sachein.model.User;
import com.sachein.request.CreateFoodRequest;
import com.sachein.response.MessageResponse;
import com.sachein.service.FoodService;
import com.sachein.service.RestaurantService;
import com.sachein.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequestMapping("/api/admin/food")
@RestController
public class AdminFoodController {

    @Autowired
    private FoodService foodService;

    @Autowired
    private UserService userService;

    @Autowired
    private RestaurantService restaurantService;

    @PostMapping
    public ResponseEntity<Food> createFood(@RequestBody CreateFoodRequest req,
                                           @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken((jwt));
        Restaurant restaurant=restaurantService.getRestaurantByUserId(user.getId());
        Food food=foodService.createFood(req,req.getCategory(),restaurant);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<MessageResponse> deleteFood(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken((jwt));
        foodService.deleteFood(id);
        MessageResponse res=new MessageResponse();
        res.setMessage("food deleted successfully");
        return new ResponseEntity<>(res, HttpStatus.CREATED);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Food> updateFoodAvailabilityStatus(@PathVariable Long id,
                                                      @RequestHeader("Authorization") String jwt) throws Exception {
        User user=userService.findUserByJwtToken((jwt));
        Food food=foodService.updateAvailabilityStatus(id);
        return new ResponseEntity<>(food, HttpStatus.CREATED);
    }


}
