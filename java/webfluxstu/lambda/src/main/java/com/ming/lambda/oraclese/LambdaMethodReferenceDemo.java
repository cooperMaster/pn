package com.ming.lambda.oraclese;

import java.util.Arrays;
import java.util.List;

public class LambdaMethodReferenceDemo {

    public static void main(String[] args) {

        String[] fruits = { "apple", "mango", "banana", "peach", "pomegranate" };
        FruitComparator fruitComparator = new FruitComparator();
        NonFunctionalFruitComparator nonFuntionalComparator = new NonFunctionalFruitComparator();
        List<String> fruitsList = null;

        // pre-java 8 way of using comparator
        Arrays.sort(fruits, fruitComparator);
        fruitsList = Arrays.asList(fruits);
        System.out.print("pre java8 way :- ");
        fruitsList.forEach(s -> System.out.print(s + " "));
        System.out.println();

        // inline comparator using lambda expression syntax
        Arrays.sort(fruits, (s1, s2) -> s1.compareToIgnoreCase(s2));
        fruitsList = Arrays.asList(fruits);
        System.out.print("lambda exp use :- ");
        fruitsList.forEach(s -> System.out.print(s + " "));
        System.out.println();

        // Using method referencing syntax. Here we are using the syntax of the instance
        // variable name, followed by ::, followed by an abstract method name
        // defined in a functional interface
        Arrays.sort(fruits, fruitComparator::compare);
        fruitsList = Arrays.asList(fruits);
        System.out.print("method ref use :- ");
        fruitsList.forEach(s -> System.out.print(s + " "));
        System.out.println();

        // Using method referencing syntax. Here we are using the syntax of the instance
        // variable name, followed by ::, followed by an existing method name
        // defined in the class NonFunctionalFruitComparator class.
        Arrays.sort(fruits, nonFuntionalComparator::compare2);
        fruitsList = Arrays.asList(fruits);
        System.out.print("method ref use :- ");
        fruitsList.forEach(s -> System.out.print(s + " "));

    }

}