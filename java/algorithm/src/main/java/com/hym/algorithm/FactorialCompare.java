package com.hym.algorithm;

/**
 * Comparing with fact and tail fact
 */
public class FactorialCompare {

    public static int fact(int item){
        if (item == 1) {
            return item;
        }else {
            return item * fact(item - 1);
        }

    }

    public static int factTR(int item, int n){
        if (item == 1){
            return n;
        }else{
            return factTR(item - 1 , item * n);
        }
    }

    public static int fact1(int item){
        return factTR(item, 1);
    }

    public static void main(String[] args){
        System.out.println(fact(5));
        System.out.println(fact1(5));
    }
}
