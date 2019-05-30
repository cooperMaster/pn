package com.stu.sql;

import java.lang.reflect.Proxy;

public class DeptDBDrive {

    public static void main(String[] args) throws Exception {
        DeptDBDrive drive = new DeptDBDrive();
        DBoper oper = drive.getDBoperProxy(new DeptMapper());
        oper.save("insert into dept values('finance','SHA',1)");
    }

    DBoper getDBoperProxy(DBoper dboper){
        return (DBoper) Proxy.newProxyInstance(dboper.getClass().getClassLoader(),
                dboper.getClass().getInterfaces(),new DBInocationHandler(dboper));
    }
}
