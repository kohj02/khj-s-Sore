
package com.dev.shopping.khj.sStore.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.dev.shopping.khj.sStore.RepeactDaoCode.ProductDaocode;
import com.dev.shopping.khj.sStore.RepeactDaoCode.ShoppingDaoCode;
import com.dev.shopping.khj.sStore.dto.ProductDao;
import com.dev.shopping.khj.sStore.dto.ProductUpdateDao;
import com.dev.shopping.khj.sStore.pojoClass.Product;
import com.dev.shopping.khj.sStore.pojoClass.Shopping;

@Repository
public class ProductRepository {

    private JdbcTemplate jdbcTemplate;

    public ProductRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void inserstProduct(ProductDao productDao, String storeFilename) {
        jdbcTemplate.update(
                "INSERT INTO PRODUCT(id,goodsname,price,company,product_date,script,product_file,page_id) VALUES(?,?,?,?,?,?,?,seq_PRODUCT_page_id.NEXTVAL) ",
                productDao.getId(), productDao.getGoodsname(), productDao.getMoney(),
                productDao.getCompany(), productDao.getDate(), productDao.getScript(), storeFilename);
    }

    public List<Product> selectItem(int num) {
        int productNum = 6 * num;

        List<Product> productList = jdbcTemplate.query(
                "SELECT * FROM PRODUCT ORDER BY page_id DESC FETCH FIRST  ? ROWS ONLY",
                new ProductDaocode(), productNum);

        return productList.isEmpty() ? null : productList;
    }

    public List<Product> selectMemberItem(String id) {
        List<Product> productList = jdbcTemplate.query(
                "SELECT * FROM PRODUCT WHERE id=?",
                new ProductDaocode(), id);

        return productList.isEmpty() ? null : productList;
    }

    public Product selectOneShopping(int paegId) {
        System.out.println("paegId :" + paegId);
        List<Product> shoppingList = jdbcTemplate.query(
                "SELECT * FROM PRODUCT WHERE page_Id=?",
                new ProductDaocode(), paegId);

        return shoppingList.isEmpty() ? null : shoppingList.get(0);
    }

    public void insertBuy(List<Product> productes) {
        String sql = "INSERT INTO PURCHASE(purchase_id,id,goodsname,price,company,product_date,script,product_file)"
                + "VALUES(?,?,?,?,?,?,?,?)";
        for (Product product : productes) {
            jdbcTemplate.update(sql, product.getPage_id(), product.getId(), product.getGoodsname(), product.getMoney(),
                    product.getCompany(), product.getDate(), product.getScript(), product.getFile());
        }

    }

    public void insertShopping(Product product) {
        String sql = "INSERT INTO SHOPPING(shopping_id,id,goodsname,price,company,product_date,script,product_file)"
                + "VALUES(?,?,?,?,?,?,?,?)";

        jdbcTemplate.update(sql, product.getPage_id(), product.getId(), product.getGoodsname(), product.getMoney(),
                product.getCompany(), product.getDate(), product.getScript(), product.getFile());
    }

    public int allCount(String id) {
        int count = jdbcTemplate.queryForObject("SELECT COUNT(*) FROM SHOPPING WHERE id = ?", Integer.class, id);
        return count;
    }

    public List<Shopping> getShoppingAllroad(String id) {
        List<Shopping> productList = jdbcTemplate.query("SELECT * FROM SHOPPING WHERE id=?",
                new ShoppingDaoCode(), id);

        return productList.isEmpty() ? null : productList;
    }

    public int userAllCount(String id) {
        int count = jdbcTemplate.queryForObject("SELECT  COUNT(*) FROM SHOPPING WHERE id=?", Integer.class, id);
        return count;
    }

    public Product getProductPageData(String page_id) {
        List<Product> productList = jdbcTemplate.query("SELECT * FROM PRODUCT WHERE page_id=?",
                new ProductDaocode(), page_id);

        return productList.isEmpty() ? null : productList.get(0);
    }

    public void updateProduct(ProductUpdateDao productUpdateDao, String storeFilename) {
        String sql = "UPDATE PRODUCT "
                + "SET goodsname=?, price=?, company=?, product_date=?, script=?, product_file=?"
                + " WHERE page_id=? ";
        jdbcTemplate.update(sql, productUpdateDao.getGoodsname(), productUpdateDao.getMoney(),
                productUpdateDao.getCompany(), productUpdateDao.getDate(),
                productUpdateDao.getScript(), storeFilename,
                productUpdateDao.getPage_id());
    }

    public void deleteProduct(String page_id) {
        String sql = "DELETE FROM PRODUCT WHERE page_id=?";
        jdbcTemplate.update(sql, page_id);
    }

    public List<Product> selectSearchProduct(String text) {
        String sql = "SELECT * FROM PRODUCT WHERE goodsname=?";
        List<Product> productList = jdbcTemplate.query(sql, new ProductDaocode(), text);

        return productList.isEmpty() ? null : productList;
    }

}