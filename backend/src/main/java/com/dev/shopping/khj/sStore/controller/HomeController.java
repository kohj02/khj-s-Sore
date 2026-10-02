package com.dev.shopping.khj.sStore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.dev.shopping.khj.sStore.pojoClass.Member;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api")
public class HomeController {

    @GetMapping
    public ResponseEntity<?> home(HttpSession session) {
        Member getSession = (Member) session.getAttribute("recountdata");

        if (getSession == null) {
            return ResponseEntity.status(401).body("로그인되지 않은 사용입니다");
        }

        return ResponseEntity.ok(getSession);
    }

    @GetMapping("/logout")
    public ResponseEntity<String> logout(HttpSession session) {
        session.invalidate();
        return ResponseEntity.ok("로그아웃 성공");
    }
}
