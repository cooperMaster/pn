package com.stu.util;

import java.lang.reflect.Method;

import org.springframework.aop.MethodMatcher;

public class MyMethodMatcher implements MethodMatcher {

	/*
	 *  被监控接口比如（BaseService），没有重载方法
	 *  每一个方法名称都是以唯一
	 *  此时可以采用 只根据方法名称判断
	 * 参数：method: 接口中某一个方法
	 *     targetClass: 接口中一个实现类
	 *     
	 *  业务：只想为BaseServiceImpl类中eat方法提供织入
	 */
	
	public boolean matches(Method method, Class<?> targetClass) {
		
		String methodName = method.getName();
		if("eat".equals(methodName)){
			return true;
		}
		return false;
	}

	public boolean isRuntime() {
		// TODO Auto-generated method stub
		return false;
	}

	public boolean matches(Method method, Class<?> targetClass, Object... args) {
		// TODO Auto-generated method stub
		return false;
	}

}
