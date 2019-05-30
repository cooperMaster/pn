package com.stu.sql;

import java.lang.reflect.Field;
import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.SQLException;

public class DBInocationHandler implements InvocationHandler {

    private DBoper dBoper;
    private Connection connection;
    private PreparedStatement pStatement;

    public DBInocationHandler(DBoper dBoper){
        this.dBoper = dBoper;
    }

    @Override
    public Object invoke(Object proxy, Method method, Object[] args) throws Throwable {
        Object val;
        init();

        Field psFiled = dBoper.getClass().getDeclaredField("ps");
        psFiled.setAccessible(true);
        psFiled.set(dBoper,pStatement);
        val = method.invoke(dBoper,args);


        close();

        return val;
    }

    //次要业务
    private void init()throws Exception{
        Class.forName("com.mysql.jdbc.Driver");
        connection = DriverManager.getConnection("jdbc:mysql://192.168.2.108:3306/stu", "root", "mysql");
        pStatement = connection.prepareStatement("");
    }

    private void close() throws SQLException {
        if(pStatement!=null){
            pStatement.close();
        }
        if(connection!=null){
            connection.close();
        }
    }
}
