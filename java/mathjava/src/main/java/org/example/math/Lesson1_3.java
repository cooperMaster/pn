package org.example.math;
/**
 * 或 与 异或 操作
 */
public class Lesson1_3 {

    /**
     * @Description: 二进制按位“或”的操作
     * @param num1
     * @param num2
     * @return 二进制按位“或”的结果
     */
    public static int or(int num1, int num2){
        return num1 | num2;
    }

    /**
     * @Description: 二进制按位“与”的操作
     * @param num1
     * @param num2
     * @return 二进制按位“与”的结果
     */
    public static int and(int num1, int num2){
        return num1 & num2;
    }

    /**
     * @Description: 二进制按位“异或”的操作
     * @param num1
     * @param num2
     * @return 二进制按位“异或”的结果
     */
    public static int xor(int num1, int num2){
        return num1 ^ num2;
    }


    public static void main(String[] args) {

        int a = 53;
        int b = 35;

        System.out.println(String.format("数字%d(%s)和数字%d(%s)的按位‘或’结果是%d(%s)",
                a, Lesson1_1.decimalToBinary(a), b, Lesson1_1.decimalToBinary(b), or(a, b), Lesson1_1.decimalToBinary(or(a, b)))); //获取十进制数53和35的按位“或”

        System.out.println(String.format("数字%d(%s)和数字%d(%s)的按位‘与’结果是%d(%s)",
                a, Lesson1_1.decimalToBinary(a), b, Lesson1_1.decimalToBinary(b), and(a, b), Lesson1_1.decimalToBinary(and(a, b))));  //获取十进制数53和35的按位“与”

        System.out.println(String.format("数字%d(%s)和数字%d(%s)的按位‘异或’结果是%d(%s)",
                a, Lesson1_1.decimalToBinary(a), a, Lesson1_1.decimalToBinary(a), xor(a, a), Lesson1_1.decimalToBinary(xor(a, a))));  //获取十进制数53和35的按位“异或”

    }


}
