package com.dev.shopping.khj.sStore.repository;

import java.util.List;

import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import com.dev.shopping.khj.sStore.RepeactDaoCode.MemberDaoCode;
import com.dev.shopping.khj.sStore.dto.MemberDao;
import com.dev.shopping.khj.sStore.dto.UpdateMemberDao;
import com.dev.shopping.khj.sStore.pojoClass.Member;

@Repository
public class MemberRepository {

    private JdbcTemplate jdbcTemplate;

    public MemberRepository(JdbcTemplate jdbcTemplate) {
        this.jdbcTemplate = jdbcTemplate;
    }

    public void save(MemberDao member) {
        String sql = "INSERT INTO MEMBER(id,password,email,user_id) VALUES(?,?,?,seq_MEMBER_user_id.NEXTVAL)";
        System.out.println(jdbcTemplate.update(sql, member.getId(), member.getPassword(), member.getEmail()));
    }

    public Member matchId(MemberDao memberDao) {
        List<Member> memberList = jdbcTemplate.query(
                "SELECT * FROM MEMBER WHERE id=? ",
                new MemberDaoCode(),
                memberDao.getId());
        return memberList.isEmpty() ? null : memberList.get(0);
    }

    public Member selectMember(MemberDao memberDao, String type) {
        List<Member> memberList = null;
        if (type == "id") {
            memberList = jdbcTemplate.query(
                    "SELECT * FROM MEMBER WHERE id=?",
                    new MemberDaoCode(),
                    memberDao.getId());
        } else {
            memberList = jdbcTemplate.query(
                    "SELECT * FROM MEMBER WHERE email=?",
                    new MemberDaoCode(),
                    memberDao.getEmail());
        }

        return memberList.isEmpty() ? null : memberList.get(0);
    }

    public Member slectONeMember(String id) {

        List<Member> memberList = jdbcTemplate.query(
                "SELECT * FROM MEMBER WHERE id=?",
                new MemberDaoCode(), id);

        return memberList.isEmpty() ? null : memberList.get(0);
    }

    public void updateMember(UpdateMemberDao updateMemberDao) {

        jdbcTemplate.execute("ALTER TABLE SHOPPING DISABLE CONSTRAINT FK_SHOPPING_KEY");
        jdbcTemplate.execute("ALTER TABLE PURCHASE DISABLE CONSTRAINT FK_PURCHASE_ID");
        jdbcTemplate.execute("ALTER TABLE PRODUCT DISABLE CONSTRAINT FK_ID");

        jdbcTemplate.update("UPDATE SHOPPING SET id=? where id=?",
                updateMemberDao.getId(), updateMemberDao.getExiting_id());

        jdbcTemplate.update("UPDATE PURCHASE SET id=? where id=?",
                updateMemberDao.getId(), updateMemberDao.getExiting_id());

        jdbcTemplate.update("UPDATE PRODUCT SET id=? where id=?",
                updateMemberDao.getId(), updateMemberDao.getExiting_id());

        jdbcTemplate.update("UPDATE MEMBER SET id=?, password=?, email=? WHERE id=?",
                updateMemberDao.getId(), updateMemberDao.getPassword(), updateMemberDao.getEmail(),
                updateMemberDao.getExiting_id());

        jdbcTemplate.execute("ALTER TABLE SHOPPING ENABLE CONSTRAINT FK_SHOPPING_KEY");
        jdbcTemplate.execute("ALTER TABLE PURCHASE ENABLE CONSTRAINT FK_PURCHASE_ID");
        jdbcTemplate.execute("ALTER TABLE PRODUCT ENABLE CONSTRAINT FK_ID");

    }

    public void deleteMember(String id) {
        jdbcTemplate.update("DELETE FROM SHOPPING WHERE id=?", id);
        jdbcTemplate.update("DELETE FROM PURCHASE WHERE id=?", id);
        jdbcTemplate.update("DELETE FROM PRODUCT WHERE id=?", id);
        jdbcTemplate.update("DELETE FROM MEMBER WHERE id=?", id);
    }

}
