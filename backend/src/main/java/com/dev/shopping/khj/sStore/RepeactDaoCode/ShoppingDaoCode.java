package com.dev.shopping.khj.sStore.RepeactDaoCode;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;

import org.springframework.jdbc.core.RowMapper;

import com.dev.shopping.khj.sStore.pojoClass.Shopping;

public class ShoppingDaoCode implements RowMapper<Shopping> {

    @Override
    public Shopping mapRow(ResultSet rs, int rowNum) throws SQLException {
        Shopping shopping = new Shopping(
                rs.getString("id"),
                rs.getString("goodsname"),
                rs.getInt("price"),
                rs.getString("company"),
                rs.getObject("product_date", LocalDate.class),
                rs.getString("script"),
                rs.getString("product_file"),
                rs.getInt("shopping_id"));

        return shopping;
    }

}
