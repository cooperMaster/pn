package com.ming.lambda;

import java.util.function.IntSupplier;
import java.util.function.IntUnaryOperator;
import java.util.stream.IntStream;

public class LazyDemo2 {
    public static void main(String[] args){
        MyLazy myLazy = new MyLazy(() -> 10);
        System.out.println("没有调用value最终操作，中间操作的日志不应该打印");

        // 我们在不调用最终操作value的情况下
        // 中间操作doSome存入的函数并不会真正执行
        myLazy.doSome(LazyDemo2::doubleNum).doSome(LazyDemo2::doubleNum);
        System.out.println("调用value最终操作");
        int value = myLazy.doSome(LazyDemo2::doubleNum).doSome(LazyDemo2::doubleNum).value();
        System.out.println("value: " + value);

        // map 就是流里面的中间操作
        // sum 就是流里面的最终操作

        // int sum = IntStream.rangeClosed(1, 3).map(LazyDemo2::doubleNumber)
        // .sum();
        // System.out.println("sum=" + sum);

        // 假设流里面不调用最终操作，那么所有的中间操作都不会真正被执行
        // 这就是流的惰性求值
        // 下面的代码不执行sum这种最终操作
        IntStream.rangeClosed(1, 3).map(LazyDemo2::doubleNum);

    }

    public static int doubleNum(int num){
        System.out.println("method called");
        return num * 2;
    }
}

class MyLazy{

    private final IntSupplier data;

    public MyLazy(IntSupplier data){
        this.data = data;
    }
    /**
     * 中间操作 不调用最终操作value，那么op不会真正被执行
     */
    public MyLazy doSome(IntUnaryOperator op){
        // 为了不影响之前数据，每次返回一个新对象
        return new MyLazy(() -> op.applyAsInt(data.getAsInt()));
    }

    /**
     * 最终操作
     */
    public int value(){
        return data.getAsInt();
    }
    
}