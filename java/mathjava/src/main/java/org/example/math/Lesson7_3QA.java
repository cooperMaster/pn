package org.example.math;

import java.util.ArrayList;
import java.util.List;

/**
 * 假设有一个 4 位字母密码，每位密码是 a～e 之间的小写字母。你能否编写一段代码，来暴力破解该密码？
 * （提示：根据可重复排列的规律，生成所有可能的 4 位密码。）
 */
public class Lesson7_3QA {
    private static final ArrayList<Character> LOWER = new ArrayList<Character>(){
        {
            add('a');
            add('b');
            add('c');
            add('d');
            add('e');
        }
    };

    public static void acq4pass(ArrayList<Character> lower, ArrayList<Character> result, ArrayList<ArrayList<Character>> totalResult){
        if (lower.size() == 1) {
            totalResult.add(result);
            return;
        }

        for (Character c : lower) {
            ArrayList<Character> new_result = (ArrayList<Character>) result.clone();
            new_result.add(c);

            ArrayList<Character> reset_lower = (ArrayList<Character>)lower.clone();
            reset_lower.remove(c);

            acq4pass(reset_lower, new_result, totalResult);
        }

    }

    public static void main(String[] args){
        ArrayList<ArrayList<Character>> totalResult = new ArrayList<ArrayList<Character>>();
        acq4pass(LOWER, new ArrayList<Character>(), totalResult);

        System.out.println(totalResult);
        System.out.println(totalResult.size());
    }
}
