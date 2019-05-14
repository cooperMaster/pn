package com.ming.stream;

import java.util.stream.IntStream;

public class StreamDemo1 {
    public static void main(String[] args){
        int[] nums = {1,2,3,4,5,6,7,8,9};
        int sum = 0 ;
        for (int num : nums) {
            sum += num;
        }
        System.out.println(sum);

        sum = IntStream.of(nums).sum();
        System.out.println(sum);

        sum = IntStream.of(nums).map(StreamDemo1::doubleNum).sum();
        System.out.println(sum);
        
        System.out.println("=====\n惰性求值：指终止操作没有调用的情况下，中间操作不会执行");
        IntStream.of(nums).map(StreamDemo1::doubleNum);
    }

    public static int doubleNum(int num){
        System.out.println("执行了乘以2的操作");
        return num * 2;
    }
}
