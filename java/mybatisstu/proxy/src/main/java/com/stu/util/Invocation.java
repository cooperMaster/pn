package com.stu.util;

import com.stu.service.AnimalService;

import java.lang.reflect.InvocationHandler;
import java.lang.reflect.Method;

public class Invocation implements InvocationHandler {

    private AnimalService obj;//具体被监控对象

    public Invocation(AnimalService param){
        this.obj =param;
    }

    /*
     *
     *  invoke方法：在被监控行为将要执行时，会被JVM拦截
     *             被监控行为和行为实现方会被作为参数输送invoke
     *             ****通知JVM,这个被拦截方法是如何与当前次要业务方法绑定实现
     *  invoke方法三个参数
     *
     *           int v= 小明.eat();//JVM拦截
     *            eat方法封装为Mehtod类型对象
     *            eat方法运行时接受所有的实参封装到Object[]
     *            将负责监控小明的代理对象作为invoke方法第一个参数
     *
     */
    @Override
    public Object invoke(Object porxy, Method method, Object[] params) throws Throwable {
        //0.局部变量，接受主要业务方法执行完毕后返回值
        Object value;
        //1.确认当前被拦截行为
        String methodName= method.getName();
        //2.根据被拦截行为不同，决定主要业务和次要业务如何绑定执行
        if("eat".equals(methodName)){//饭前要洗手
            wash();                            //洗手
            value=method.invoke(this.obj, params);   //吃饭
        }else{//便后要洗手
            value=method.invoke(this.obj, params);
            wash();
        }
        return value; //返回被拦截方法，需要调用地方
    }

    //次要业务
    public void wash(){
        System.out.println("-----祈祷----");
    }

}
