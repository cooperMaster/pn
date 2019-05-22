package com.ming.lambda.oraclese;

public class NonFunctionalFruitComparator {



    public int compare2(String s1, String s2) {

        int compare = s1.compareToIgnoreCase(s2);

        return compare;

    }

}