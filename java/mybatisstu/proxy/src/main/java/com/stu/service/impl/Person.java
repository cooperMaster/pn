package com.stu.service.impl;

import com.stu.service.AnimalService;

public class Person implements AnimalService {
    @Override
    public void eat() {
        System.out.println("eat some fruits");
    }

    @Override
    public void doSome() {
        System.out.println("do some work");
    }
}
