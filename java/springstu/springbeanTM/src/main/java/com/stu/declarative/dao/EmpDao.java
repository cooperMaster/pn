package com.stu.declarative.dao;

import com.stu.programmatic.dto.Employee;

import java.util.List;

public interface EmpDao {
    int createEmployee(String name, int age, Long salary);
    List<Employee> listEmployees();
}
