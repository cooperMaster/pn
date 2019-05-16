package com.ming.lambda;

import java.util.ArrayList;
import java.util.List;
import java.util.function.*;

public class MethodReferenceDemo {

    public static void main(String[] args){
        //方法引用
        Consumer<String> consumer = System.out::println;
        consumer.accept("hello lambda");

        Dog dog = new Dog();
        //静态方法的引用
        Consumer<Dog> dogConsumer = Dog::bark;
        dogConsumer.accept(dog);

        //非静态方法，使用对象实列的方法引用
//        Function<Integer,Integer> function = dog::eat;
//        UnaryOperator<Integer> function = dog::eat;
//        System.out.println("还剩" + function.apply(3));
        IntUnaryOperator function = dog::eat;
//        dog =null;//java传值引用，23行代码必不会报NullPointer
        System.out.println("还剩" + function.applyAsInt(3));

        //非静态方法，使用类名来进行方法引用
        BiFunction<Dog,Integer,Integer> dogIntegerIntegerBiFunction = Dog::eat;
        System.out.println("还剩" + dogIntegerIntegerBiFunction.apply(dog, 4));

        //构造函数的方法引用
        Supplier<Dog> supplier = Dog::new;
        System.out.println("创建了"+supplier.get());

        //带参构造函数的方法引用
        Function<String,Dog> createDog = Dog::new;
        System.out.println("创建了" + createDog.apply("小m"));


        /*
        java 传值的引用
            第一次 null
            第二次 []
         */
        List<String> ll = null;
        System.out.println(ll);

        ll = new ArrayList();
        testValRef(ll);

        System.out.println(ll);
    }

    public static void testValRef(List<String> list){
        list = null;
    }
}


class Dog{
    private String name = "小D";
    private int dogFood = 20;

    public Dog(){

    }

    public Dog(String name){
        this.name = name;
    }

    public static void bark(Dog dog){
        System.out.println(dog + " barking.");
    }

    public int eat(int food){
        System.out.println("eat " + food);
        dogFood -= food;
        return dogFood;
    }

    @Override
    public String toString() {
        return this.name;
    }

}