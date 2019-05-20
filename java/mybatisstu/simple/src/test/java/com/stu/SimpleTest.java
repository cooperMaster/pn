package com.stu;

import com.stu.dto.Dept;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

public class SimpleTest {
    public static void main(String[] args) throws IOException {
        Dept dept = new Dept();
        dept.setDeptName("金融");
        dept.setLocation("广州");

        InputStream inputStream = Resources.getResourceAsStream("MyBatis-config.xml");
        SqlSessionFactory sqlSessionFactory = new SqlSessionFactoryBuilder().build(inputStream);
        SqlSession sqlSession = sqlSessionFactory.openSession();
        sqlSession.insert("insertDept",dept);
        sqlSession.commit();
        sqlSession.close();
    }
}
