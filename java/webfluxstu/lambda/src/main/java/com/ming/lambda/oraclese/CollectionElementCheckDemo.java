package com.ming.lambda.oraclese;

import java.util.function.Predicate;

public class CollectionElementCheckDemo {

    public void evaluate() {
        Predicate<String> apples = (p) -> {
            return p.equalsIgnoreCase("apple");
        };

        FruitList fruits = new FruitList();
        fruits.addToBasket("apple");
        fruits.addToBasket("peach");
        fruits.addToBasket("orange");
        fruits.addToBasket("orange");
        fruits.addToBasket("pineapple");
        fruits.addToBasket("banana");

        boolean appleAvailable = fruits.fruitExists(apples);
        boolean allApples = fruits.sameFruits(apples);

        System.out.println("Apple in list? : "+ appleAvailable);
        System.out.println("All same fruits? : "+ allApples);
        System.out.print("\n");

        // clearing previous list entries
        fruits.getFruits().clear();
        // adding new entries to list
        fruits.addToBasket("avocado");
        fruits.addToBasket("avocado");
        fruits.addToBasket("avocado");
        fruits.addToBasket("avocado");
        boolean avocadoAvailable = fruits.fruitExists(a -> a.equalsIgnoreCase("avocado"));
        boolean allAvocados = fruits.sameFruits(a -> a.equalsIgnoreCase("avocado"));
        System.out.println("Avocados in list? : "+ avocadoAvailable);
        System.out.println("All same fruits? : "+ allAvocados);
    }


    public static void main(String... args) {
        CollectionElementCheckDemo demo = new CollectionElementCheckDemo();
        demo.evaluate();
    }

}