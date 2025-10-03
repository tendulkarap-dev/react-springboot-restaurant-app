package com.sachein.request;

import com.sachein.model.Address;
import com.sachein.model.ContactInformation;
import lombok.Data;

import java.util.List;

@Data

public class CreateRestaurantRequest {

    private Long id;
    private String name;
    private String description;
    private Address address;
    private String cuisineType;
    private ContactInformation contactInformation;
    private String openingHours;
    private List<String> images;


}
