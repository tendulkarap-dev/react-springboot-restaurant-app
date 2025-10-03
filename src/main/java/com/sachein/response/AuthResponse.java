package com.sachein.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.sachein.model.USER_ROLE;
import lombok.Data;

@Data
public class AuthResponse {

    private String jwt;

    private String message;


    private USER_ROLE role;
}
