package com.ming.lambda;

public class LambdaDemo1 {
    public static void main(String[] args){
        Interface1 i1 = i -> i*2;
        Interface1.sub(10,3);

        System.out.println(i1.doubleNum(5));
        System.out.println(i1.add(3,4));
    }
}

@FunctionalInterface
interface Interface1{
    int doubleNum(int num);

    default int add(int x,int y){
        return x+y;
    }
    static int sub(int x,int y){
        return x-y;
    }
}

@FunctionalInterface
interface Interface2{
    int doubleNum(int num);

    default int add(int x,int y){
        return x+y;
    }
}

@FunctionalInterface
interface Interface3 extends Interface1,Interface2{

    @Override
    default int add(int x, int y) {
        return Interface1.super.add(x,y);
    }
}

