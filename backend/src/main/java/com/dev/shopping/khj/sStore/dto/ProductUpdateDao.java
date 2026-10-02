package com.dev.shopping.khj.sStore.dto;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.web.multipart.MultipartFile;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class ProductUpdateDao {
    private int page_id;
    private String goodsname;
    private String money;
    private String company;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String script;
    private MultipartFile file;
}
