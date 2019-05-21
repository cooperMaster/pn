package com.ming.lambda.oraclese;

import java.util.Comparator;



public class FruitComparator implements Comparator<String> {



    @Override

    public int compare(String s1, String s2) {



        int compare = s1.compareToIgnoreCase(s2);

        return compare;

    }



}