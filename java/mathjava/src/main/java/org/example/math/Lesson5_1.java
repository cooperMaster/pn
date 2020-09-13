package org.example.math;

import java.util.ArrayList;

/**
 * 假设有四种面额的钱币，1 元、2 元、5 元和 10 元，而您一共给我 10 元，
 * 那您可以奖赏我 1 张 10 元，或者 10 张 1 元，或者 5 张 1 元外加 1 张 5 元等等。
 * 如果考虑每次奖赏的金额和先后顺序，那么最终一共有多少种不同的奖赏方式呢？
 */
public class Lesson5_1 {
    public static long[] rewards = {1, 2, 5, 10}; //四种面额

    /**
     * @Description: 使用函数的递归（嵌套）调用，找出所有可能的奖赏组合
     * @param totalReward 总奖赏额
     * @param result 保存当前解
     *
     */
    public static void getReward(long totalReward, ArrayList<Long> result){
        if (totalReward == 0) {
            System.out.println(result);
            return;
        } else if (totalReward < 0) {
            return;
        } else {
            for (int i = 0; i < rewards.length; i++) {
                ArrayList<Long> newResult = (ArrayList<Long>) result.clone(); // 由于有4种情况，需要clone当前的解并传入被调用的函数
                newResult.add(rewards[i]);// 记录当前的选择，解决一点问题
                getReward(totalReward - rewards[i], newResult);// 剩下的问题，留给嵌套调用去解决
            }
        }
    }

    public static void main(String[] args) {
        int totalRewards = 10;
        getReward(totalRewards, new ArrayList());
    }
}
