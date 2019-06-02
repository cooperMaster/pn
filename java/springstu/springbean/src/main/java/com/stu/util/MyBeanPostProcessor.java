package com.stu.util;

import com.stu.service.impl.BaseServiceImpl;
import org.springframework.beans.BeansException;
import org.springframework.beans.factory.config.BeanPostProcessor;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Proxy;

public class MyBeanPostProcessor implements BeanPostProcessor {

    @Override
    public Object postProcessBeforeInitialization(Object bean, String beanName) throws BeansException {
        System.out.println("bean Before Initialization...");
        return bean;
    }

    @Override
    public Object postProcessAfterInitialization(Object bean, String beanName) throws BeansException {
        Class clazz = bean.getClass();
        if (clazz == BaseServiceImpl.class) {
            Object proxy = Proxy.newProxyInstance(bean.getClass().getClassLoader(),
                                        bean.getClass().getInterfaces(),
                    (p,method,args) -> {
                        System.out.println("BaseServiceImpl sayHello ...");
                        String result = (String) method.invoke(bean,args);
                        return result.toUpperCase();
                    });

            return proxy;
        }

        return bean;
    }
}
