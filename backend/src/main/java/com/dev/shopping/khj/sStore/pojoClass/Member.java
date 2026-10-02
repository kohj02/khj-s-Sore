package com.dev.shopping.khj.sStore.pojoClass;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class Member {

    private String id;
    private String password;
    private String email;

    public Member(String id, String password, String email) {
        this.id = id;
        this.password = password;
        this.email = email;
    }

}
