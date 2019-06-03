package com.stu.util;

import java.lang.reflect.Field;
import java.lang.reflect.Method;
import java.util.*;

public class BeanFactory {
    private List<BeanDefined> beanDefinedList;
    private Map<String,Object> map;//已经创建好的对象

    private BeanPostProcessor beanPostProcessor;


    public BeanFactory(List<BeanDefined> beanDefinedList) throws Exception{
        this.beanDefinedList = beanDefinedList;
        map = new HashMap<String, Object>();

        for (BeanDefined beanDefined : beanDefinedList) {
            if ("singleton".equals(beanDefined.getScope())) {
                Class classFile = Class.forName(beanDefined.getClassPath());
                Object instance = classFile.newInstance();

                isProcessor(classFile,instance);
                map.put(beanDefined.getBeanId(),instance);
            }
        }

    }

    private void isProcessor(Class classFile, Object instance) {
        Class[] interfaces = classFile.getInterfaces();
        if (interfaces == null) {return;}
        for (Class face : interfaces) {
            if (face == BeanPostProcessor.class) {
                this.beanPostProcessor = (BeanPostProcessor) instance;
            }
        }
    }

    public Object getBean(String beanId) throws Exception{
        Object instance = null;
        Object proxyObj = null;//当前实例对象的代理监控对象

        for (BeanDefined beanDefined : beanDefinedList) {
            Class classFile = Class.forName(beanDefined.getClassPath());
            Map property = beanDefined.getProperty();
            if ("prototype".equals(beanDefined.getScope())) {

                String factoryBean = beanDefined.getFactory_bean();
                String factoryMethod = beanDefined.getFactory_method();
                if (factoryBean != null
                        && factoryMethod != null) {
                    Object factoryObj = map.get(factoryBean);
                    Class factoryClass = factoryObj.getClass();
                    Method method = factoryClass.getDeclaredMethod(factoryMethod);
                    method.setAccessible(true);
                    instance = method.invoke(factoryObj);
                }else {
                    instance = classFile.newInstance();
                }
            }else if ("singleton".equals(beanDefined.getScope())) {
                instance = map.get(beanId);
            }

            if (this.beanPostProcessor != null) {
                proxyObj = this.beanPostProcessor.postProcessBeforeInitialization(instance, beanId);
                setValue(instance,classFile,property);

                //实例对象初始化。Spring依赖注入
                proxyObj = this.beanPostProcessor.postProcessAfterInitialization(instance, beanId);
                //此时返回proxyObj可能就是原始bean对象，也有可能就是代理对象
                return proxyObj;
            }else {
                setValue(instance,classFile,property);
                return instance;
            }
        }
        return instance;
    }

    private void setValue(Object instance, Class classFile, Map property) throws Exception {
        Method[] methodArr = classFile.getDeclaredMethods();
        if(property==null){return;}
        Iterator iterator = property.keySet().iterator();
        while (iterator.hasNext()) {
            String filedName = (String) iterator.next();
            String propertyVal = (String) property.get(filedName);
            Field fieldObj = classFile.getDeclaredField(filedName);
            for (Method method : methodArr) {
                if (("set"+filedName).equalsIgnoreCase(method.getName())) {
                    Class fieldType = fieldObj.getType();
                    if(fieldType == String.class){
                        method.invoke(instance, propertyVal);
                    }else if(fieldType == Integer.class){
                        method.invoke(instance, Integer.valueOf(propertyVal));
                    }else if(fieldType == Boolean.class){
                        method.invoke(instance, Boolean.valueOf(propertyVal));
                    }else if(fieldType==List.class){
                        List tempList = new ArrayList();
                        String dataArray[]=propertyVal.split(",");
                        method.invoke(instance, Arrays.asList(dataArray));
                    }else{ //此时属性类型是数组
                        String dataArray[]=propertyVal.split(",");
                        Object data[] = new Object[1];
                        data[0]=dataArray;
                        method.invoke(instance, data);
                    }
                    break;
                }
            }
        }
    }


    public List<BeanDefined> getBeanDefinedList() {
        return beanDefinedList;
    }

    public void setBeanDefinedList(List<BeanDefined> beanDefinedList) {
        this.beanDefinedList = beanDefinedList;
    }


}
