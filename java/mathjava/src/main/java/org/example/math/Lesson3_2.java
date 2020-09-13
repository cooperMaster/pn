package org.example.math;

/**
 * 采用二分法，求解一个值的近似平方根
 */
public class Lesson3_2 {

    /**
     * @Description: 计算大于1的正整数之平方根
     * @param number 被求数
     * @param deltaThreshold 误差的阈值
     * @param maxTry 二分查找的最大次数
     * @return 平方根的解
     */
    public static double getSquareResult(int number, double deltaThreshold, int maxTry){
        if (number <= 1) {
            throw new RuntimeException("请输入大于1的整数");
        }
        double min = 1.0, max = (double)number;
        for (int i = 0; i < maxTry; i++) {
            double middle = (min + max)/2;
            double square = middle * middle;
            double delta = Math.abs(square/number - 1);
            if (delta <= deltaThreshold) {
                return middle;
            }else {
                if (square > number) {
                    max = middle;
                } else {
                    min = middle;
                }
            }
        }
        throw new RuntimeException("未能找到解");
    }

    public static void main(String[] args) {
        int number = 10;
        double squareRes = getSquareResult(number, 0.000001, 10000);
        System.out.println(String.format("%d的平方根是%f", number, squareRes));
    }
}
