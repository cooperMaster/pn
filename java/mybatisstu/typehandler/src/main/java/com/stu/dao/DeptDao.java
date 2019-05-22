package com.stu.dao;

import com.stu.dto.Dept;

import java.util.List;

public interface DeptDao {
    public void insertDept(Dept dept);
    public Dept deptFindById(int id);
    public void insertDept2(Dept dept);
    public List<Dept> deptFindAll();
}
