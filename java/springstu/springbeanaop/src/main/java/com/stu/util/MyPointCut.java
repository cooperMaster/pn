package com.stu.util;

import org.springframework.aop.ClassFilter;
import org.springframework.aop.MethodMatcher;
import org.springframework.aop.Pointcut;

public class MyPointCut implements Pointcut {
	
	
	/*
	 *        //织入方式:次要业务方法和 BaseServiceImpl.eat()执行顺序
	 *        //前置通知
	 *          wash（）；
	 *          BaseServiceImpl.eat()
	 *    }
	 * 
	 * */
	//使用依赖注入
	private ClassFilter classFilter;
	private MethodMatcher methodMatcher;

	public void setClassFilter(ClassFilter classFilter) {
		this.classFilter = classFilter;
	}

	public void setMethodMatcher(MethodMatcher methodMatcher) {
		this.methodMatcher = methodMatcher;
	}

	public ClassFilter getClassFilter() {
		return this.classFilter;
	}

	public MethodMatcher getMethodMatcher() {
		return this.methodMatcher;
	}

}
