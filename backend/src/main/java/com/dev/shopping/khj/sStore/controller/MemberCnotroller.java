package com.dev.shopping.khj.sStore.controller;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import com.dev.shopping.khj.sStore.dto.MemberDao;
import com.dev.shopping.khj.sStore.dto.UpdateMemberDao;
import com.dev.shopping.khj.sStore.pojoClass.Member;
import com.dev.shopping.khj.sStore.repository.MemberRepository;
import com.dev.shopping.khj.sStore.service.MemberService;

import jakarta.servlet.http.HttpSession;

@RestController
@RequestMapping("/api/member")
public class MemberCnotroller {

    private final MemberRepository memberRepository;
    private final MemberService memberService;

    public MemberCnotroller(MemberService memberService, MemberRepository memberRepository) {
        this.memberService = memberService;
        this.memberRepository = memberRepository;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody MemberDao memberDto, HttpSession session) {
        try {
            if (!memberService.registerService(memberDto)) {
                return ResponseEntity.badRequest().body("잘못된 요청입니다");
            }
            Member memberdata = memberService.seletMemberService(memberDto, "id");
            if (memberdata != null)
                session.setAttribute("recountdata", memberdata);
            return ResponseEntity.ok("회원가입 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body("서버 오류" + e.getMessage());
        }

    }

    @PostMapping("/login")
    public ResponseEntity<String> login(@RequestBody MemberDao memberDao, HttpSession session) {
        try {
            if (!memberService.loginService(memberDao)) {
                return ResponseEntity.ok("아이다,비밀번호 중에 일치 하지 않습니다!!");
            }

            Member memberdata = memberService.seletMemberService(memberDao, "id");
            if (memberdata != null)
                session.setAttribute("recountdata", memberdata);

            return ResponseEntity.ok("로그인 성공");
        } catch (Exception e) {
            System.out.println(e.getMessage());
            return ResponseEntity.internalServerError().body("서버 오류" + e.getMessage());
        }
    }

    @GetMapping("/idsearch")
    public ResponseEntity<?> searchId(@RequestParam("email") String email) {
        MemberDao memberDao = new MemberDao();
        memberDao.setEmail(email);
        Member member = memberService.seletMemberService(memberDao, "email");
        if (member == null || member.getId() == null) {
            return ResponseEntity.ok("존재하지않은 아이디입니다");
        }
        return ResponseEntity.ok(member.getId());
    }

    @PostMapping("/pwdSearch")
    public ResponseEntity<?> searchPwd(@RequestBody MemberDao memberDao) {
        Member member = memberService.seletMemberService(memberDao, "id");
        if (member == null || member.getId() == null) {
            System.out.println("존제하지 않습니다");
            return ResponseEntity.ok("해당 계정이 존재하지않습니다");
        }
        return ResponseEntity.ok(member.getPassword());
    }

    @GetMapping("/update")
    public ResponseEntity<?> getMethodName(@RequestParam("id") String id) {
        try {
            Member member = memberService.selectOneService(id);
            if (member != null) {
                return ResponseEntity.ok(member);
            }
            return ResponseEntity.ok("가져오지 못했습니다");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("익셉션이 발생습니다.");
        }
    }

    @PostMapping("/memberUpdate")
    public ResponseEntity<String> memberUpdate(@RequestBody UpdateMemberDao updateMemberDao) {
        try {
            memberService.updateMemberSerivce(updateMemberDao);
            return ResponseEntity.ok("사용자 정보 업데이트 성공");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("사용자 정보 업데이트 실패");
        }
    }

    @GetMapping("/memberDelete")
    public ResponseEntity<String> memberDelete(@RequestParam("id") String id) {
        try {
            memberService.deleteMemberSerivce(id);
            return ResponseEntity.ok("계정 삭제 완료");
        } catch (Exception e) {
            e.printStackTrace();
            return ResponseEntity.internalServerError().body("계정 삭제 실패");
        }
    }

}
