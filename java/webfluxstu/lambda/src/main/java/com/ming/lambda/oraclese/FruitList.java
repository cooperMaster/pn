package com.ming.lambda.oraclese;

import java.util.ArrayList;
import java.util.List;
import java.util.function.Predicate;
import java.util.stream.Stream;


public class FruitList {


    private List<String> fruits = null;

    public FruitList() {
        fruits = new ArrayList<String>();
    }


    public List<String> getFruits() {
        return fruits;
    }


    public void setFruits(List<String> fruits) {
        this.fruits = fruits;
    }


    public void addToBasket(String fruit) {
        fruits.add(fruit);
    }


    public boolean fruitExists(Predicate<String> fruitExists) {
        if (fruitExists == null) {
            new NullPointerException("null predicate");
        }

        Stream<String> listStream = fruits.stream();
        boolean exists = listStream.anyMatch(fruitExists);
        return exists;
    }


    public boolean sameFruits(Predicate<String> sameFruits) {
        if (sameFruits == null) {
            new NullPointerException("null predicate");
        }
        Stream<String> listStream = fruits.stream();
        boolean allSame = listStream.allMatch(sameFruits);
        return allSame;
    }

}