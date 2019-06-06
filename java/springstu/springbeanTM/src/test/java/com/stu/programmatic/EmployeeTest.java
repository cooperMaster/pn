package com.stu.programmatic;

import com.stu.programmatic.dao.EmpDao;
import com.stu.programmatic.dto.Employee;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;
import org.springframework.test.context.ContextConfiguration;
import org.springframework.test.context.junit4.SpringJUnit4ClassRunner;

import java.util.List;

@RunWith(SpringJUnit4ClassRunner.class)
@ContextConfiguration(locations = "classpath:springTM.xml")
public class EmployeeTest {

    @Autowired
    private EmpDao empDao;

    @Test
    public void testEmployeeProgrammatic(){

        System.out.println("------Records Creation--------" );
//        empDao.create("Raaz", 25, 50000l);

        System.out.println("------Listing Multiple Records--------" );
        List<Employee> employees = empDao.listEmployees();
        for (Employee employee : employees) {
            System.out.print(employee);
        }
    }

    @Autowired
    private com.stu.declarative.dao.EmpDao empDaoDecl;
    @Test
    public void testEmployeeDeclarative(){
        System.out.println("------Records Creation--------" );
        empDaoDecl.createEmployee("Raaz", 25, 50000l);

        System.out.println("------Listing Multiple Records--------" );
        List<Employee> employees = empDaoDecl.listEmployees();
        for (Employee employee : employees) {
            System.out.print(employee);
        }
    }
}
