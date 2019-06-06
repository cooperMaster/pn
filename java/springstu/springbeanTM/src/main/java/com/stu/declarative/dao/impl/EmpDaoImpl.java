package com.stu.declarative.dao.impl;

import com.stu.declarative.dao.EmpDao;
import com.stu.programmatic.dto.Employee;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.stereotype.Component;

import java.util.List;

@Component
public class EmpDaoImpl extends JdbcDaoSupport implements EmpDao {

    @Override
    public int createEmployee(String name, int age, Long salary) {
        try {
            String SQL = "INSERT INTO Employee (name, age, salary) VALUES (?, ?, ?)";
            int r = getJdbcTemplate().update(SQL, new Object[]{name, age, salary} );
            System.out.println("Created Record Name = " + name + " Age = " + age+ " Salary = " + salary);
            // to simulate the exception.
            throw new RuntimeException("simulate Error condition") ;
//            return r;
        } catch (Exception e) {
            System.out.println("Error in creating record, rolling back");
            throw e;
        }
    }

    @Override
    public List<Employee> listEmployees() {
        String SQL = "SELECT * FROM Employee";
        List employees = (List) getJdbcTemplate().query(SQL,
                (rs, rowNum) -> {
                    Employee employee = new Employee();
                    employee.setEmpId(rs.getInt("empid"));
                    employee.setName(rs.getString("name"));
                    employee.setAge(rs.getInt("age"));
                    employee.setSalary(rs.getLong("salary"));
                    return employee;
                });
        return employees;
    }
}
