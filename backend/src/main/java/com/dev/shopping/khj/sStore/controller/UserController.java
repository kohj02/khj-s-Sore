package com.dev.shopping.khj.sStore.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev.shopping.khj.sStore.pojoClass.Product;
import com.dev.shopping.khj.sStore.service.UserService;

@RestController
@RequestMapping("/api/user")
public class UserController {

    private final UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @GetMapping("/laodUser")
    public ResponseEntity<?> laodUser(@RequestParam("id") String id) {
        try {
            List<Product> productList = userService.loadUserService(id);
            if (productList != null) {
                return ResponseEntity.ok(productList);
            }
            return ResponseEntity.ok("가져오는 것을 실패하였습니다.");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션이 발생함");
        }
    }

}
