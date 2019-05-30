package com.stu.util;

public class BeanDefined {
    private String beanId;
    private String classPath;
    private String scope="singleton";
    private String factory_bean;
    private String factory_method;

    public String getBeanId() {
        return beanId;
    }

    public void setBeanId(String beanId) {
        this.beanId = beanId;
    }

    public String getClassPath() {
        return classPath;
    }

    public void setClassPath(String classPath) {
        this.classPath = classPath;
    }

    public String getScope() {
        return scope;
    }

    public void setScope(String scope) {
        this.scope = scope;
    }

    public String getFactory_bean() {
        return factory_bean;
    }

    public void setFactory_bean(String factory_bean) {
        this.factory_bean = factory_bean;
    }

    public String getfactory_method() {
        return factory_method;
    }

    public void setfactory_method(String factory_method) {
        this.factory_method = factory_method;
    }
}
