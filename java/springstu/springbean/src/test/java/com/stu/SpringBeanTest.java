package com.stu;

import com.stu.dto.Teacher;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;


public class SpringBeanTest {
    ApplicationContext ac;

    @Before
    public void start(){
        ac = new ClassPathXmlApplicationContext("springconfig.xml");
    }
    @Test
    public void testAppCon() throws Exception {

        Teacher teacher = (Teacher) ac.getBean("teacher");

        System.out.println(teacher);
    }

    @Test
    public void testFactoryBean(){
        Teacher teacher = (Teacher) ac.getBean("t1");
        System.out.println(teacher);
    }

    @Test
    public void testStaticFactoryBean(){
        Teacher teacher = (Teacher) ac.getBean("t2");
        System.out.println(teacher);
    }

}
