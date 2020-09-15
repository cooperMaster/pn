package org.example.math;

import java.util.ArrayList;

/**
 * @author whoym
 */
public class Lesson5_1_OtherSolution {
    public static int[] rewards = {1, 2, 5, 10}; //四种面额

    public static void getReward(int totalReward, ArrayList<Integer> result){
        if (totalReward == 10) {
            System.out.println(result);
            return;
        }
        if (totalReward > 10) {
            return;
        }

        for (int reward : rewards) {
            ArrayList<Integer> newResult = (ArrayList<Integer>) result.clone();
            newResult.add(reward);
            getReward(totalReward+reward, newResult);
        }

    }

    public static void main(String[] args){
        getReward(0, new ArrayList());
    }
}
