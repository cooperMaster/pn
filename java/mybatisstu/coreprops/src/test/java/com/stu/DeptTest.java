package com.stu;

import com.stu.dao.DeptDao;
import com.stu.dto.Dept;
import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;

import java.io.InputStream;
import java.util.Properties;

public class DeptTest {

    private SqlSession session;
    @Before
    public void start(){
        try{
            InputStream inputStream = Resources.getResourceAsStream("MyBatis-config.xml");
            InputStream inputStream2= Resources.getResourceAsStream("config.properties");
            Properties properties = new Properties();
            properties.load(inputStream2);
            //SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(inputStream, null, properties);
            SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(inputStream, "development");
            session=factory.openSession();
        }catch(Exception exception){
            exception.printStackTrace();
        }
    }

    @After
    public void end(){
        if(session!=null){
            session.close();
        }
    }


    @Test
    public void test01(){
        Dept dept = new Dept();
        dept.setDeptName("贸易");
        dept.setLocation("北京");

        try{
            session.insert("insertDept", dept);
            session.commit();
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test02(){
        try{
            Dept dept= session.selectOne("deptFindById", 1);
            System.out.println(dept.getDeptName());
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

    @Test
    public void test03(){
        try{
            DeptDao dao=	session.getMapper(DeptDao.class);
            Dept dept=dao.deptFindById(1);
            System.out.println(dept.getDeptName());
        }catch (Exception e) {
            e.printStackTrace();
        }
    }

}
