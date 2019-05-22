package com.stu.dao;

import com.stu.dto.Dept;

public interface DeptDao {
    public void insertDept();
    public Dept deptFindById(int id);
}
