package com.stu;

import com.stu.service.BaseService;
import org.junit.Test;
import org.springframework.context.ApplicationContext;
import org.springframework.context.support.ClassPathXmlApplicationContext;

public class TestAdvice {
    /*
           规定：
               washHand -> eat
               doSome -> washHand
        */
    
    @Test
    public void testBeforeAdvice(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("spring_config.xml");
        BaseService baseService = (BaseService) ac.getBean("proxyFactoryBean");
        baseService.eat();
//        baseService.doSome();
    }

    @Test
    public void testBeforeAdvisor(){
        ApplicationContext ac = new ClassPathXmlApplicationContext("spring_config.xml");
        BaseService baseService = (BaseService) ac.getBean("proxyFactoryBean2");
        baseService.eat();
        baseService.doSome();
    }
}
