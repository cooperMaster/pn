package com.stu.util;

import com.stu.dto.Teacher;

public class TeacherFactory {

    public Teacher createTeacher(){
        Teacher t = new Teacher();
        System.out.println("TeacherFactory创建teacher对象");
        return t;
    }

    public static Teacher createTeacherStatic(){
        Teacher t = new Teacher();
        System.out.println("Static TeacherFactory创建teacher对象");
        return t;
    }
}
