package com.stu.util;

import org.aopalliance.aop.Advice;
import org.springframework.aop.Pointcut;
import org.springframework.aop.PointcutAdvisor;

public class MyPointCutAdvisor implements PointcutAdvisor {
	//采用依赖注入 set
    private Advice advice;//次要业务以及次要业务与主要业务执行顺序
    private Pointcut pointcut;//当前拦截对象和对象调用主要业务方法 BaseServiceImpl对象.eat()
    
    
    
	public void setAdvice(Advice advice) {
		this.advice = advice;
	}

	public void setPointcut(Pointcut pointcut) {
		this.pointcut = pointcut;
	}

	public Advice getAdvice() {
		return this.advice;
	}

	public boolean isPerInstance() {
		return false;
	}

	public Pointcut getPointcut() {
		return this.pointcut;
	}

}
