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
import java.util.List;
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
        DeptDao dao=session.getMapper(DeptDao.class);
        List<Dept> dept=dao.deptFindAll();
        System.out.println();
    }


}
