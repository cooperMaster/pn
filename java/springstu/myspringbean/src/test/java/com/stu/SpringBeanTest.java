package com.stu;

import com.stu.util.BeanDefined;
import com.stu.util.BeanFactory;
import org.junit.Test;

import java.util.ArrayList;
import java.util.List;

public class SpringBeanTest {

    @Test
    public void test01() throws Exception {
        BeanDefined beanDefined = new BeanDefined();
        beanDefined.setBeanId("teacher");
        beanDefined.setClassPath("com.stu.dto.Teacher");


        List<BeanDefined> beanDefinedList = new ArrayList<>();
        beanDefinedList.add(beanDefined);

        BeanFactory beanFactory = new BeanFactory(beanDefinedList);

        System.out.println(beanFactory.getBean("teacher"));
        System.out.println(beanFactory.getBean("teacher"));

    }

}
