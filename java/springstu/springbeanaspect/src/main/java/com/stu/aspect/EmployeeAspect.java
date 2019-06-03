package com.stu.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class EmployeeAspect {

	@Before("execution(public String getName())")
	public void getNameAdvice(){
		System.out.println("EmployeeAspect---Executing Advice on getName()");
	}
	
	@Before("execution(* com.stu.service.*.get*())")
	public void getAllAdvice(){
		System.out.println("EmployeeAspect---Service method getter called");
	}
}
