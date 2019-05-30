package com.stu.util;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class BeanFactory {
    private List<BeanDefined> beanDefinedList;
    private Map<String,Object> map;//已经创建好的对象


    public BeanFactory(List<BeanDefined> beanDefinedList) throws Exception{
        this.beanDefinedList = beanDefinedList;
        map = new HashMap<String, Object>();

        for (BeanDefined beanDefined : beanDefinedList) {
            if ("singleton".equals(beanDefined.getScope())) {
                Class classFile = Class.forName(beanDefined.getClassPath());
                Object obj = classFile.newInstance();
                map.put(beanDefined.getBeanId(),obj);
            }
        }

    }

    public Object getBean(String beanId) throws Exception{
        Object instance = null;

        for (BeanDefined beanDefined : beanDefinedList) {
            Class classFile = Class.forName(beanDefined.getClassPath());

            if ("prototype".equals(beanDefined.getScope())) {
                instance = classFile.newInstance();
            }else if ("singleton".equals(beanDefined.getScope())) {
                instance = map.get(beanId);
            }
        }
        return instance;
    }



    public List<BeanDefined> getBeanDefinedList() {
        return beanDefinedList;
    }

    public void setBeanDefinedList(List<BeanDefined> beanDefinedList) {
        this.beanDefinedList = beanDefinedList;
    }


}
