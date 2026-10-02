package com.dev.shopping.khj.sStore.controller;

import java.io.File;
import java.io.IOException;
import java.util.List;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

import com.dev.shopping.khj.sStore.dto.ProductDao;
import com.dev.shopping.khj.sStore.dto.ProductUpdateDao;
import com.dev.shopping.khj.sStore.pojoClass.Product;
import com.dev.shopping.khj.sStore.pojoClass.Shopping;
import com.dev.shopping.khj.sStore.service.ProductService;

@RestController
@RequestMapping("/api/product")
public class ProductController {

    @Value("${file.upload-dir}")
    private String uploadDir;
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping("/upload")
    public ResponseEntity<?> uploadProduct(@ModelAttribute ProductDao productDao) {
        // 1.파일 존재 여부 검증
        MultipartFile file = productDao.getFile();
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("상품 이미지가 누락되어있습니다.");
        }

        try {
            // 2.저장 디렉터리가 없을 경우 폴더 생성
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdir();
            }

            // 3. 파일명 중복 방지를 위한 UUID 파일명 설정
            String originalFilename = file.getOriginalFilename();
            String storeFilename = UUID.randomUUID().toString() + "_" + originalFilename;

            // 4.경로 구분자 안전 처리 후 파일 저장
            String destPath = uploadDir.endsWith("/") || uploadDir.endsWith("\\")
                    ? uploadDir + storeFilename
                    : uploadDir + File.separator + storeFilename;

            // 5.지정 경로에 실정 파일 저장
            File dset = new File(destPath);
            file.transferTo(dset);

            System.out.println("수신된 상품 정보:" + productDao);
            System.out.println("저장된 파일명:" + storeFilename);

            productService.insertProductService(productDao, storeFilename);

            return ResponseEntity.ok("상품이 성공적으로 등록되었습니다");
        } catch (IOException e) {
            e.printStackTrace();// 에러가 발생하기 까지의 메서드 호출 경로와 원인을 콘솔로 출력
            // http코드 500와 메세지를 전달
            return ResponseEntity.internalServerError().body("파일 저장 중 오류가 발생해습니다");
        }
    }

    @PostMapping("/updateUpload")
    public ResponseEntity<?> updateUpload(@ModelAttribute ProductUpdateDao productUpdateDao) {
        // 1.파일 존재 여부 검증
        MultipartFile file = productUpdateDao.getFile();
        if (file == null || file.isEmpty()) {
            return ResponseEntity.badRequest().body("상품 이미지가 누락되어있습니다");
        }

        try {
            File folder = new File(uploadDir);
            if (!folder.exists()) {
                folder.mkdir();
            }

            // 3.파일명 중복 방지를 위한 UUID 파일명 설정
            String originalFIleName = file.getOriginalFilename();
            String storeFilename = UUID.randomUUID().toString() + "_" + originalFIleName;

            // 4.경로 구분자 안전 처리 후 파일 저장
            String destPath = uploadDir.endsWith("/") || uploadDir.endsWith("\\")
                    ? uploadDir + storeFilename
                    : uploadDir + File.separator + storeFilename;

            // 5.지정 경로에 실정 파일 저장
            File dest = new File(destPath);
            file.transferTo(dest);
            System.out.println(
                    "page_id: " + productUpdateDao.getPage_id() + "," + "goodsname :"
                            + productUpdateDao.getGoodsname());
            productService.updateProductService(productUpdateDao, storeFilename);
            return ResponseEntity.ok("상품이 정상적으로 등록되었습니다");
        } catch (IOException e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("파일 저장 중 오류가 발생습니다");
        }

    }

    @GetMapping("/loadItem")
    public ResponseEntity<?> itemLoad(@RequestParam("num") int num) {
        try {
            List<Product> productList = productService.loadItemSerivce(num);
            if (productList == null || productList.isEmpty()) {
                return ResponseEntity.ok("가져올 아이템이 없습니다");
            }

            return ResponseEntity.ok(productList);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("아이템을 가져오다가 오류가 발생했습니다");
        }
    }

    @GetMapping("/buy")
    public ResponseEntity<String> buy(@RequestParam("id") String id) {
        try {
            if (productService.insertBuyService(id)) {
                return ResponseEntity.ok("구매목록 삽입 완료");
            } else {
                return ResponseEntity.ok("구매목록 삽입 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("구매목록 삽입중에 익셉션이 발생했습니다.");
        }
    }

    @GetMapping("/putShopping")
    public ResponseEntity<String> putShopping(@RequestParam("page_id") int pageId) {
        try {
            if (productService.putShoppingService(pageId)) {
                return ResponseEntity.ok("장바구니에 담기 완료");
            } else {
                return ResponseEntity.ok("장바구니 담기 실패");
            }
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("구매목록 삽입중에 익셉션이 발생했습니다.");
        }
    }

    @GetMapping("/shoppingAllCount")
    public ResponseEntity<?> shoppingAllCount(@RequestParam("id") String id) {
        try {
            int count = productService.shoppingAllCountService(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("null");
        }

    }

    @GetMapping("/shoppingAllroad")
    public ResponseEntity<?> shoppingAllroad(@RequestParam("id") String id) {
        try {
            List<Shopping> shoppingList = productService.shoppingAllroadSerivce(id);
            if (shoppingList != null) {
                return ResponseEntity.ok(shoppingList);
            }
            return ResponseEntity.ok("데이터 못가져옴");

        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션 발생");
        }
    }

    @GetMapping("/userAllroad")
    public ResponseEntity<?> userCount(@RequestParam("id") String id) {
        try {
            int count = productService.userAllCountSerivce(id);
            return ResponseEntity.ok(count);
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션 발생");
        }

    }

    @GetMapping("/loadPaeg")
    public ResponseEntity<?> loadPaeg(@RequestParam("page_id") String page_id) {
        try {
            Product product = productService.laodPageService(page_id);
            if (product != null) {
                return ResponseEntity.ok(product);
            }
            return ResponseEntity.ok("데이터를 가져오지 못했습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션 발생");
        }
    }

    @GetMapping("/productDelete")
    public ResponseEntity<String> getMethodName(@RequestParam("page_id") String page_id) {
        try {
            productService.deleteProductSerivce(page_id);
            return ResponseEntity.ok("상품 삭제 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션 발생");
        }
    }

    @GetMapping("/search")
    public ResponseEntity<?> productsearch(@RequestParam("text") String text) {
        try {
            List<Product> productList = productService.getSerachRsSerivce(text);
            if (productList != null) {
                return ResponseEntity.ok(productList);
            }
            return ResponseEntity.ok("찾지 못했습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션 발생");
        }
    }

}
