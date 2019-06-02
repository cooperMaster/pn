package com.stu.advice;

import org.springframework.aop.MethodBeforeAdvice;

import java.lang.reflect.Method;

public class ServiceBeforeAdvice implements MethodBeforeAdvice {
    
    @Override
    public void before(Method method, Object[] objects, Object o) throws Throwable {
        washHand();
    }
    
    public void washHand(){
        System.out.println("洗手手...");
    }
}
