package com.ming.lambda;

public class TypeDemo {
    public static void main(String[] args){
        //变量类型定义
        IMath iMath = (x, y) -> x+y;
        //放数组里
        IMath[] lambda2 = {(x, y) -> x+y};
        //强转
        Object lambda3 = (IMath) (x, y) -> x+y;

        //通过返回类型
        IMath lambda4 = TypeDemo.createLambda();


        TypeDemo typeDemo = new TypeDemo();
        // 当有二义性的时候，使用强转对应的接口解决
        typeDemo.test((IMath) (x, y) -> x+y);
    }

    public static IMath createLambda(){
        return (x, y) -> x+y;
    }

    public void test(IMath iMath){

    }

    public void test(IMath2 iMath){

    }
}

@FunctionalInterface
interface IMath{
    int add(int x,int y);
}

@FunctionalInterface
interface IMath2{
    int add(int x,int y);
}