package com.stu;

import com.stu.dto.Teacher;
import com.stu.service.BaseService;
import com.stu.util.BeanDefined;
import com.stu.util.BeanFactory;
import org.junit.Test;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

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

    @Test
    public void testFactoryBean() throws Exception {
        BeanDefined beanDefined = new BeanDefined();
        beanDefined.setBeanId("teacher");
        beanDefined.setClassPath("com.stu.dto.Teacher");
        beanDefined.setScope("prototype");
        beanDefined.setFactory_method("createTeacher");
        beanDefined.setFactory_bean("factory");

        BeanDefined beanCreateFactory = new BeanDefined();
        beanCreateFactory.setBeanId("factory");
        beanCreateFactory.setClassPath("com.stu.util.TeacherFactory");



        List<BeanDefined> beanDefinedList = new ArrayList<>();
        beanDefinedList.add(beanDefined);
        beanDefinedList.add(beanCreateFactory);

        BeanFactory beanFactory = new BeanFactory(beanDefinedList);
        Teacher teacher = (Teacher) beanFactory.getBean("teacher");
        System.out.println(teacher);

    }

    @Test
    public void testBaseService() throws Exception {
        BeanDefined beanDefined = new BeanDefined();
        beanDefined.setBeanId("baseService");
        beanDefined.setClassPath("com.stu.service.impl.BaseServiceImpl");

        BeanDefined beanPostProcessorDefined = new BeanDefined();
        beanPostProcessorDefined.setClassPath("com.stu.util.MyBeanPostProcessor");

        List<BeanDefined> beanDefinedList = new ArrayList<>();
        beanDefinedList.add(beanDefined);
        beanDefinedList.add(beanPostProcessorDefined);

        BeanFactory beanFactory = new BeanFactory(beanDefinedList);
        BaseService baseService = (BaseService) beanFactory.getBean("baseService");
        System.out.println(baseService.sayHello());
    }

    @Test
    public void testDI() throws Exception {
        BeanDefined beanDefined = new BeanDefined();
        beanDefined.setBeanId("teacher");
        beanDefined.setClassPath("com.stu.dto.Teacher");
        beanDefined.setScope("prototype");
        Map map = new HashMap();
        map.put("name", "Miss li");
        map.put("friends", "D,Z,B");
        map.put("school", "清华,北京理工大学");
//        map.put("age","25");
        beanDefined.setProperty(map);


        List<BeanDefined> beanDefinedList = new ArrayList<>();
        beanDefinedList.add(beanDefined);

        BeanFactory beanFactory = new BeanFactory(beanDefinedList);

        System.out.println(beanFactory.getBean("teacher"));
    }
}
