package com.dev.shopping.khj.sStore.service;

import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Propagation;
import org.springframework.transaction.annotation.Transactional;

import com.dev.shopping.khj.sStore.dto.MemberDao;
import com.dev.shopping.khj.sStore.dto.UpdateMemberDao;
import com.dev.shopping.khj.sStore.pojoClass.Member;
import com.dev.shopping.khj.sStore.repository.MemberRepository;

@Service
public class MemberService {

    private final MemberRepository memberRepository;

    public MemberService(MemberRepository memberRepository) {
        this.memberRepository = memberRepository;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean registerService(MemberDao memberDao) {
        Member member = memberRepository.matchId(memberDao);
        if (member != null) {
            if (member.getId() == memberDao.getId()) {
                return false;
            }
        }

        memberRepository.save(memberDao);
        return true;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public boolean loginService(MemberDao memberDao) {
        Member selectMember = memberRepository.selectMember(memberDao, "id");
        if (selectMember != null) {
            if (!selectMember.getId().equals(memberDao.getId())
                    || !selectMember.getPassword().equals(memberDao.getPassword())) {
                return false;
            }
        } else
            return false;
        return true;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Member seletMemberService(MemberDao memberDao, String type) {
        Member selectMember = null;
        if (type == "id") {
            selectMember = memberRepository.selectMember(memberDao, "id");
        } else {
            selectMember = memberRepository.selectMember(memberDao, "email");
        }

        if (selectMember != null) {

            if (selectMember.getId() != null && selectMember.getPassword() != null && selectMember.getEmail() != null) {
                return selectMember;
            }
        }
        return null;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public Member selectOneService(String id) {
        Member member = memberRepository.slectONeMember(id);
        return member;
    }

    @Transactional(propagation = Propagation.REQUIRED)
    public void updateMemberSerivce(UpdateMemberDao updateMemberDao) {
        memberRepository.updateMember(updateMemberDao);
    }

    @Transactional()
    public void deleteMemberSerivce(String id) {
        memberRepository.deleteMember(id);
    }

}
