package com.ming.lambda.oraclese;

import java.util.function.Predicate;



public class CollectionElementRemovalDemo {

    public void evaluate() {
        Predicate<String> exists = (p) -> {
            return p.equalsIgnoreCase("apple");
        };

        FruitList fruits = new FruitList();
        fruits.addToBasket("apple");
        fruits.addToBasket("peach");
        fruits.addToBasket("orange");
        fruits.addToBasket("orange");
        fruits.addToBasket("pineapple");
        fruits.addToBasket("banana");

        boolean remove = fruits.getFruits().removeIf(exists);

        System.out.println("Apple removed from list? : "+ remove);
        System.out.print("\n");
        fruits.getFruits().forEach(c -> System.out.println(c));
    }



    public static void main(String... args) {
        CollectionElementRemovalDemo demo = new CollectionElementRemovalDemo();
        demo.evaluate();
    }

}