package com.stu.util;

import java.util.Properties;

import org.apache.ibatis.executor.Executor;
import org.apache.ibatis.mapping.MappedStatement;
import org.apache.ibatis.plugin.Interceptor;
import org.apache.ibatis.plugin.Intercepts;
import org.apache.ibatis.plugin.Invocation;
import org.apache.ibatis.plugin.Plugin;
import org.apache.ibatis.plugin.Signature;
import org.apache.ibatis.session.ResultHandler;
import org.apache.ibatis.session.RowBounds;

@Intercepts(
    {
        @Signature(
            method="query",
            type=Executor.class,
            args={MappedStatement.class, Object.class, RowBounds.class, ResultHandler.class}
        )
    }
)
public class MyInterceptor implements Interceptor {

    /*
     *
     * 参数：Invocation{ 代理对象 ，被监控方法对象  ，当前被监控方法运行时需要实参}
     *
     **/
    public Object intercept(Invocation invocation) throws Throwable {
        System.out.println("被拦截方法执行之前，做的辅助服务.....");
        Object object=invocation.proceed();//执行被拦截方法
        System.out.println("被拦截方法执行之后，做的辅助服务.....");
        return object;
    }

    /*
     *
     *  参数： target 表示被拦截对象,应该Executor接口实例对象
     *  作用：
     *        如果被拦截对象所在的类有实现接口
     *        就为当前拦截对象生成一个【$Proxy】
     *
     *        如果被拦截对象所在的类没有指定接口
     *        这个对象之后行为就不会被代理操作
     *
     * */
    public Object plugin(Object target) {

        return Plugin.wrap(target, this);
    }

    public void setProperties(Properties properties) {
        // TODO Auto-generated method stub

    }

}
