package com.stu.programmatic.dao.impl;

import com.stu.programmatic.dao.EmpDao;
import com.stu.programmatic.dto.Employee;
import com.stu.programmatic.util.EmployeeMapper;
import com.stu.programmatic.util.EmployeeMapper;
import org.springframework.dao.DataAccessException;
import org.springframework.jdbc.core.support.JdbcDaoSupport;
import org.springframework.transaction.PlatformTransactionManager;
import org.springframework.transaction.TransactionDefinition;
import org.springframework.transaction.TransactionStatus;
import org.springframework.transaction.support.DefaultTransactionDefinition;

import java.util.List;

public class EmpDaoImpl extends JdbcDaoSupport implements EmpDao {

    private PlatformTransactionManager transactionManager;

    public void setTransactionManager(
            PlatformTransactionManager transactionManager) {
        this.transactionManager = transactionManager;
    }

    @Override
    public void create(String name, Integer age, Long salary) {
        TransactionDefinition def = new DefaultTransactionDefinition();
        TransactionStatus status = transactionManager.getTransaction(def);
        try {
            String SQL = "INSERT INTO Employee (name, age, salary) VALUES (?, ?, ?)";
            getJdbcTemplate().update(SQL, new Object[]{name, age, salary} );
            int error = 1/0;
            transactionManager.commit(status);
            System.out.println("Created Record Name = " + name + " Age = " + age+ " Salary = " + salary);
            // to simulate the exception.
//            throw new RuntimeException("simulate Error condition") ;
        } catch (Exception e) {
            System.out.println("Error in creating record, rolling back");
            transactionManager.rollback(status);
            throw e;
        }
    }

    @Override
    public Employee getEmployee(Integer empid) {
        String SQL = "SELECT * FROM Employee WHERE empid = ?";
        Employee employee = (Employee) getJdbcTemplate().queryForObject(SQL, new Object[]{empid}, new EmployeeMapper());
        return employee;
    }

    @Override
    public List listEmployees() {
        String SQL = "SELECT * FROM Employee";
//        List employees = (List) getJdbcTemplate().query(SQL, new EmployeeMapper());
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

    @Override
    public void delete(Integer empid) {
        String SQL = "DELETE FROM Employee WHERE empid = ?";
        getJdbcTemplate().update(SQL, new Object[]{empid});
        System.out.println("Deleted Record with EMPID = " + empid );
    }

    @Override
    public void update(Integer empid, Integer age) {
        String SQL = "UPDATE Employee SET age = ? WHERE empid = ?";
        getJdbcTemplate().update(SQL, new Object[]{age, empid});
        System.out.println("Updated Record with EMPID = " + empid );
    }
}
