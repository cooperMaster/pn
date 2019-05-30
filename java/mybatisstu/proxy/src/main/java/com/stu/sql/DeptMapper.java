package com.stu.sql;

import java.sql.PreparedStatement;

public class DeptMapper implements DBoper{

    private PreparedStatement ps;

    @Override
    public int save(String sql) throws Exception {
        int num = ps.executeUpdate(sql);
        return num;
    }
}
