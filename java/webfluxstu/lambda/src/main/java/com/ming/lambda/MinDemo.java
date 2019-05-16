package com.ming.lambda;

import java.util.stream.IntStream;

public class MinDemo {
    public static void main(String[] args){
        int[] nums = {23,31,10,30,9};
        int min = Integer.MAX_VALUE;
        for (int num : nums) {
            if (min > num){
                min = num;
            }
        }
        System.out.println(min);

        int min2 = IntStream.of(nums).parallel().min().getAsInt();
        System.out.println(min2);
    }
}
