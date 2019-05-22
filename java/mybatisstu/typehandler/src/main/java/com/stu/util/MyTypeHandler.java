package com.stu.util;

import org.apache.ibatis.type.JdbcType;
import org.apache.ibatis.type.TypeHandler;

import java.sql.CallableStatement;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class MyTypeHandler implements TypeHandler {
    @Override
    public void setParameter(PreparedStatement ps, int i, Object parameter, JdbcType jdbcType) throws SQLException {
        if (parameter == null){
            ps.setInt(i,0);
            return;
        }
        boolean flag = (boolean) parameter;
        if (flag) {
            ps.setInt(i,1);
        }else{
            ps.setInt(i,0);
        }

    }

    @Override
    public Object getResult(ResultSet rs, String columnName) throws SQLException {
        int val = rs.getInt(columnName);
        boolean flag = val == 1 ? true : false;
        return flag;
    }

    @Override
    public Object getResult(ResultSet rs, int columnIndex) throws SQLException {
        return null;
    }

    @Override
    public Object getResult(CallableStatement cs, int columnIndex) throws SQLException {
        return null;
    }
}
