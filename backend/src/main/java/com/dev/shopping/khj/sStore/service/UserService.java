package com.dev.shopping.khj.sStore.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.dev.shopping.khj.sStore.pojoClass.Product;
import com.dev.shopping.khj.sStore.repository.UserRepository;

@Service
public class UserService {

    private final UserRepository userRepository;

    public UserService(UserRepository userRepository) {
        this.userRepository = userRepository;
    }

    @Transactional()
    public List<Product> loadUserService(String id) {
        List<Product> productList = userRepository.getUserItem(id);
        return productList;
    }
}