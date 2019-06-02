package com.stu.dto;

import java.util.Arrays;
import java.util.List;

public class Teacher {

    private String name;
    private int age;
    private List<String> school;
    private String[] friends;


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public List<String> getSchool() {
        return school;
    }

    public void setSchool(List<String> school) {
        this.school = school;
    }

    public String[] getFriends() {
        return friends;
    }

    public void setFriends(String[] friends) {
        this.friends = friends;
    }

    @Override
    public String toString() {
        return "Teacher{" +
                "name='" + name + '\'' +
                ", age=" + age +
                ", school=" + school +
                ", friends=" + Arrays.toString(friends) +
                '}';
    }
}
