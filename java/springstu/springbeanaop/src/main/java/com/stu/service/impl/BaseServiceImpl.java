package com.stu.service.impl;

import com.stu.service.BaseService;

public class BaseServiceImpl implements BaseService {
    /*
        规定：
            washHand -> eat
            doSome -> washHand
     */
    @Override
    public void eat() {
        System.out.println("eating ...");
    }

    @Override
    public void doSome() {
        System.out.println("doing some thing.");
    }
}
