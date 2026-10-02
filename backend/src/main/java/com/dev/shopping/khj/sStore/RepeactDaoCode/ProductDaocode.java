package com.dev.shopping.khj.sStore.RepeactDaoCode;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import org.springframework.jdbc.core.RowMapper;

import com.dev.shopping.khj.sStore.pojoClass.Product;

public class ProductDaocode implements RowMapper<Product> {

    @Override
    public Product mapRow(ResultSet rs, int rowNum) throws SQLException {
        Product product = new Product(
                rs.getString("id"),
                rs.getString("goodsname"),
                rs.getInt("price"),
                rs.getString("company"),
                rs.getObject("product_date", LocalDate.class),
                rs.getString("script"),
                rs.getString("product_file"),
                rs.getInt("page_id"));
        return product;
    }
}
