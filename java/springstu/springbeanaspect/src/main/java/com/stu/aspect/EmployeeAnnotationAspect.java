package com.stu.aspect;

import org.aspectj.lang.annotation.Aspect;
import org.aspectj.lang.annotation.Before;

@Aspect
public class EmployeeAnnotationAspect {

	@Before("@annotation(com.stu.aspect.Loggable)")
	public void myAdvice(){
		System.out.println("EmployeeAnnotationAspect---Executing myAdvice!!");
	}
}
