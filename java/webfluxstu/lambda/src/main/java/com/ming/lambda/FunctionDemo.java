package com.ming.lambda;

import java.util.function.Consumer;
import java.util.function.IntPredicate;

public class FunctionDemo {

    public static void main(String[] args){
        //断言函数接口
        IntPredicate intPredicate = i -> i > 0 ;
        System.out.println(intPredicate.test(-9));

        //消费函数接口
        Consumer<String> consumer = s -> System.out.println(s);
        consumer.accept("打印");

    }
}
