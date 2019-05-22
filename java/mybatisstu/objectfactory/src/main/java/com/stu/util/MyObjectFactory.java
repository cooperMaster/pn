package com.stu.util;

import com.stu.dto.Dept;
import org.apache.ibatis.reflection.factory.DefaultObjectFactory;

public class MyObjectFactory  extends DefaultObjectFactory {

    @Override
    public Object create(Class type) {//重新定义Dept类实例对象创建规则，其他类实例对象创建规则不想改变
        if (Dept.class == type) {
            Dept dept = (Dept) super.create(type);
            dept.setCountry("中国");
            return dept;
        }

        return super.create(type);
    }
}
