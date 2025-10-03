package com.sachein.repository;


import com.sachein.model.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {

public User findByEmail(String username);


}

