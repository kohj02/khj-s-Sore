package com.dev.shopping.khj.sStore.RepeactDaoCode;

import java.sql.ResultSet;
import java.sql.SQLException;

import org.springframework.jdbc.core.RowMapper;

import com.dev.shopping.khj.sStore.pojoClass.Member;

public class MemberDaoCode implements RowMapper<Member> {

    @Override
    public Member mapRow(ResultSet rs, int rowNum) throws SQLException {
        Member member = new Member(
                rs.getString("id"),
                rs.getString("password"),
                rs.getString("email"));
        return member;
    }

}
