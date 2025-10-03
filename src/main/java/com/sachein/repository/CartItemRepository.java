package com.sachein.repository;

import com.sachein.model.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;


public interface CartItemRepository extends JpaRepository<CartItem,Long> {

}
