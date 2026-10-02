package com.dev.shopping.khj.sStore.service;

import java.util.List;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dev.shopping.khj.sStore.dto.ProductDao;
import com.dev.shopping.khj.sStore.dto.ProductUpdateDao;
import com.dev.shopping.khj.sStore.pojoClass.Product;
import com.dev.shopping.khj.sStore.pojoClass.Shopping;
import com.dev.shopping.khj.sStore.repository.ProductRepository;

@Service
public class ProductService {

    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void insertProductService(ProductDao productDao, String storeFilename) {
        productRepository.inserstProduct(productDao, storeFilename);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Product> loadItemSerivce(int num) {
        List<Product> productList = productRepository.selectItem(num);
        return productList;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean insertBuyService(String id) {
        List<Product> productList = productRepository.selectMemberItem(id);
        if (productList != null) {
            productRepository.insertBuy(productList);
            return true;
        }
        return false;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean putShoppingService(int paegId) {
        Product product = productRepository.selectOneShopping(paegId);
        if (product != null) {
            productRepository.insertShopping(product);
            return true;
        }
        return false;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public int shoppingAllCountService(String id) {
        int count = productRepository.allCount(id);
        return count;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public List<Shopping> shoppingAllroadSerivce(String id) {
        List<Shopping> productList = productRepository.getShoppingAllroad(id);
        return productList;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public int userAllCountSerivce(String id) {
        int count = productRepository.userAllCount(id);
        return count;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Product laodPageService(String page_id) {
        Product product = productRepository.getProductPageData(page_id);
        return product;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void updateProductService(ProductUpdateDao productUpdateDao, String storeFilename) {
        productRepository.updateProduct(productUpdateDao, storeFilename);
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void deleteProductSerivce(String page_id) {
        productRepository.deleteProduct(page_id);
    }

    @Transactional()
    public List<Product> getSerachRsSerivce(String text) {
        List<Product> productList = productRepository.selectSearchProduct(text);
        return productList;
    }

}
