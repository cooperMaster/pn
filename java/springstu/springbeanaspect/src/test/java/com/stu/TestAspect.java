package com.stu;

import com.stu.service.EmployeeService;
import org.junit.After;
import org.junit.Before;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestAspect {
    private ApplicationContext ac;

    @Before
    public void before(){
        ac = new ClassPathXmlApplicationContext("springconfigaspect.xml");
    }

    @Test
    public void testAspectj(){
        EmployeeService employeeService = ac.getBean("employeeService", EmployeeService.class);
        System.out.println(employeeService.getEmployee().getName());
        employeeService.getEmployee().setName("Pankaj");
//        employeeService.getEmployee().throwException();

    }


    @After
    public void after(){
    }


}
