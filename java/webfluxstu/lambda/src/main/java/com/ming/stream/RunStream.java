package com.ming.stream;

import java.util.Random;
import java.util.concurrent.TimeUnit;
import java.util.stream.Stream;

public class RunStream {
    public static void main(String[] args){
        Random random = new Random();
        Stream<Integer> stream =
                Stream.generate(() -> random.nextInt()).limit(500)
                        // 第1个无状态操作
                        .peek(s -> print("peek: " + s))
                        // 第2个无状态操作
                        .filter(s -> {
                            print("filter: " + s);
                            return s > 1000000;
                        });
        // 终止操作
        stream.count();
    }

    public static void print(String s) {
        // System.out.println(s);
        // 带线程名(测试并行情况)
        System.out.println(Thread.currentThread().getName() + " > " + s);
        try {
            TimeUnit.MILLISECONDS.sleep(5);
        } catch (InterruptedException e) {
        }
    }
}
