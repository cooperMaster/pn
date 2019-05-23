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
            InputStream inputStream2 = Resources.getResourceAsStream("config2.properties");
            Properties properties = new Properties();
            properties.load(inputStream2);
//            SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(inputStream);
            SqlSessionFactory factory=new SqlSessionFactoryBuilder().build(inputStream,properties);
            session=factory.openSession();
        }catch(Exception exception){
            exception.printStackTrace();
        }
    }
    @Test
    public void test01(){
        DeptDao dao=session.getMapper(DeptDao.class);
        Dept dept =new Dept();
        dept.setDeptName("金融事业部3");
        dept.setLocation("北京");
        dept.setFlag(false);// 表中与之对应数据行flag字段0
        dao.insertDept(dept);
        session.commit();
    }

    @Test
    public void test02(){
        DeptDao dao=session.getMapper(DeptDao.class);
        Dept dept=dao.deptFindById(1);
        System.out.println(dept);
    }

    @Test
    public void test03(){
        DeptDao dao=session.getMapper(DeptDao.class);
        Dept dept =new Dept();
        dept.setDeptName("金融事业");
        dept.setLocation("北京");
        dept.setFlag(true);
        dao.insertDept2(dept);
        session.commit();
    }

    @Test
    public void test04(){
        DeptDao dao=session.getMapper(DeptDao.class);
        List<Dept> dept=dao.deptFindAll();
        System.out.println();
    }

    @After
    public void end(){
        if(session!=null){
            session.close();
        }
    }
}
