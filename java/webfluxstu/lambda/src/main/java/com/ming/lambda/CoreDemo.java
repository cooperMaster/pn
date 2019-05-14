package com.ming.lambda;

import java.util.function.Consumer;

public class CoreDemo {
    public static void main(String[] args) {
        Consumer<String> consumer = s -> System.out.println(s);
        consumer.accept("ttt");
        //class com.ming.lambda.CoreDemo$$Lambda$1/0x0000000100067040
        System.out.println(consumer.getClass());

        CoreDemo coreDemo = new CoreDemo();
        coreDemo.test();
    }

    public void test(){
        Consumer<Integer> consumer = i -> {
            //com.ming.lambda.CoreDemo@3834d63f
            System.out.println(this);
            System.out.println(i);
        };

        consumer.accept(22);
        //class com.ming.lambda.CoreDemo$$Lambda$2/0x0000000100066840
        System.out.println(consumer.getClass());
    }
}
