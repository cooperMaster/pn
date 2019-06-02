package com.stu.util;

import com.stu.service.BaseService;
import com.stu.service.impl.BaseServiceImpl;
import org.springframework.aop.ClassFilter;

public class MyClassFilter implements ClassFilter {

	 /*
	  *  1.一个接口下会有多个实现类
	  *  2.判断当前实现类是不是我们织入方式关心的目标类
	  *  BaseService接口我们现在只想管理BaseServiceImpl.
	  *  参数：就是当前被拦截类：可能BaseServiceImpl，可能其他类
	  * */
	public boolean matches(Class<?> clazz) {
	    if(clazz == BaseServiceImpl.class){
	    	return true;//告诉顾问，当前类是需要我们提供织入服务
	    }
	    //Gog
		return false;
	}

}
