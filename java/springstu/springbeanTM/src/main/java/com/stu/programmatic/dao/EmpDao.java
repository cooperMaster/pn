package com.stu.programmatic.dao;

import com.stu.programmatic.dto.Employee;

import java.util.List;

public interface EmpDao {
    /**
     * This is the method to be used to create
     * a record in the Employee table.
     */
    void create(String name, Integer age, Long salary);
    /**
     * This is the method to be used to list down
     * a record from the Employee table corresponding
     * to a passed Employee id.
     */
    Employee getEmployee(Integer empid);
    /**
     * This is the method to be used to list down
     * all the records from the Employee table.
     */
    List<Employee> listEmployees();
    /**
     * This is the method to be used to delete
     * a record from the Employee table corresponding
     * to a passed Employee id.
     */
    void delete(Integer empid);
    /**
     * This is the method to be used to update
     * a record into the Employee table.
     */
    void update(Integer empid, Integer age);
}
