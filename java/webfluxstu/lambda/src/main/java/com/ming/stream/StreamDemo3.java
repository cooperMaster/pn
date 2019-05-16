package com.ming.stream;

import java.util.Random;
import java.util.stream.Stream;

public class StreamDemo3 {
    public static void main(String[] args){
        String str = "Show me your code!";

        //<R> Stream<R> flatMap(Function<? super T, ? extends Stream<? extends R>> mapper);
        //<R> Stream<R> map(Function<? super T, ? extends R> mapper);
        Stream.of(str.split(" ")).map(s -> s.length()).forEach(System.out::println);
        Stream.of(str.split(" ")).flatMap(s -> s.chars().boxed())
                .forEach( i -> System.out.println((char)i.intValue()));

        // peek 用于debug 是个中间操作, forEach 是终止操作
        System.out.println("--------------peek------------");
        Stream.of(str.split(" ")).peek(System.out::println)
                .forEach(System.out::println);

        //limit
        new Random().ints().filter(i -> i > 0).limit(8).forEach(System.out::println);
    }
}
