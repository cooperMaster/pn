package com.ming.stream;

import java.util.List;
import java.util.Optional;
import java.util.OptionalInt;
import java.util.Random;
import java.util.stream.Collector;
import java.util.stream.Collectors;
import java.util.stream.Stream;

public class StreamDemo4 {
    public static void main(String[] args){
        String str = "Welcome to the program world.";

        //并行流
        str.chars().parallel().forEach(c -> System.out.print((char)c));
        System.out.println("");
        str.chars().parallel().forEachOrdered(c -> System.out.print((char)c));

        System.out.println("");
        List<String> list = Stream.of(str.split(" ")).collect(Collectors.toList());
        System.out.println(list);

        //reduce
        Optional<String> redStr = Stream.of(str.split(" ")).reduce((s1, s2) -> s1 +"-"+ s2);
        System.out.println(redStr.orElse(""));
        //带初始化值的reduce
        String redStr2 = Stream.of(str.split(" ")).reduce("",(s1,s2) -> s1 +"-"+ s2);

        //max
        Optional<String> maxStr = Stream.of(str.split(" ")).max((s1, s2) -> s1.length()-s2.length());
        if (maxStr.isPresent()) {
            System.out.println(maxStr.get());
        }

        // 使用 findFirst 短路操作
        OptionalInt findFirst = new Random().ints().findFirst();
        System.out.println(findFirst.getAsInt());

    }
}
