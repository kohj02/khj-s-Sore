package com.dev.shopping.khj.sStore.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.dev.shopping.khj.sStore.RepeactDaoCode.ProductDaocode;
import com.dev.shopping.khj.sStore.pojoClass.Product;

@Repository
public class UserRepository {

    private final JdbcTemplate jdbcTemplate;

    public UserRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public List<Product> getUserItem(String id) {
        List<Product> productList = jdbcTemplate.query("SELECT * FROM PRODUCT WHERE id=?",
                new ProductDaocode(), id);

        return productList.isEmpty() ? null : productList;
    }

}
