package com.dev.shopping.khj.sStore.pojoClass;

import java.time.LocalDate;

import org.springframework.format.annotation.DateTimeFormat;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Shopping {
    private String id;
    private String goodsname;
    private int money;
    private String company;
    @DateTimeFormat(pattern = "yyyy-MM-dd")
    private LocalDate date;
    private String script;
    private String file;
    private int shopping_id;

    public Shopping(String id, String goodsname, int money, String company, LocalDate date, String script,
            String file, int shopping_id) {
        this.id = id;
        this.goodsname = goodsname;
        this.money = money;
        this.company = company;
        this.date = date;
        this.script = script;
        this.file = file;
        this.shopping_id = shopping_id;
    }
}
