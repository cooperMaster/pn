package com.ming.lambda.oraclese;

import java.util.ArrayList;
import java.util.function.Consumer;

public class CollectionElementProcessDemo {

    public void evaluate() {
        Consumer<String> listEntries = (l) -> {
            System.out.println("processing : "+ l);
            switch (l) {
                case "USA":
                    System.out.println("Hello " + l);
                    break;
                case "Spain":
                    System.out.println("Hola " + l);
                    break;
                case "France":
                    System.out.println("Bonjour " + l);
                    break;
                case "India":
                    System.out.println("Namaste " + l);
                    break;
                case "China":
                    System.out.println("你好 " + l);
                    break;
            }

            System.out.print("\n");

        };

        ArrayList<String> countryList = new ArrayList<String>();
        countryList.add("India");
        countryList.add("USA");
        countryList.add("Thailand");
        countryList.add("France");
        countryList.add("Spain");
        countryList.add("China");
        countryList.add("abc");

        System.out.print("\n"); // evaluates each element of collection
        countryList.stream().forEach(listEntries);

    }



    public static void main(String... args) {
        CollectionElementProcessDemo demo = new CollectionElementProcessDemo();
        demo.evaluate();

    }

}