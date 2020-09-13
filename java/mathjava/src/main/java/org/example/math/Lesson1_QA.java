package org.example.math;

/**
 * 如果不使用 Java 语言自带的 BigInteger 类，我们还有什么方法来实现十进制到二进制的转换呢？（提示：可以使用二进制的移位和按位逻辑操作来实现。）
 */
public class Lesson1_QA {

    /**
     * @Description: 十进制转二进制，方法1：余数短除法除以二,对负数无法取二进制
     * @param decimalSource
     * @return
     */
    public static String decimalToBinary(int decimalSource) {
        StringBuilder sb = new StringBuilder();
        while (decimalSource != 0) {
            sb.append(decimalSource % 2);
            decimalSource = decimalSource >> 1;
        }
        return sb.reverse().toString();
    }

    /**
     *  @Description: 十进制转二进制，方法2：降二次幂及减法混合运算,对负数无法取二进制
     * @param decimalSource
     * @return
     */

    public static String decimalToBinary2(int decimalSource) {
        int length = (int) (Math.log(decimalSource) / Math.log(2));
        StringBuffer sb = new StringBuffer();
        do {
            decimalSource = (int) (decimalSource - Math.pow(2, length));
            int power = decimalSource <= 0 ? -1 : (int) (Math.log(decimalSource) / Math.log(2));
            for (int i = length; i > power; i--) {
                if (i == length) {
                    sb.append("1");
                } else {
                    sb.append("0");
                }
            }
            length = power;
        } while (decimalSource > 0);
        return sb.toString();
    }

    /**
     * @Description: 十进制转二进制，方法3：位运算法
     * @param decimalSource
     * @return
     */
    public static String decimalToBinary3(int decimalSource) {
        StringBuffer sb = new StringBuffer();
        while (decimalSource != 0) {
            //此&运算，decimalSource & 1，目的是获取最低位的二进制数值
            sb.append(decimalSource & 1);
            //此>>运算，decimalSource >> 1，目的是将获取到的最低位二进制数值除去
            decimalSource = decimalSource >> 1;
        }
        return sb.reverse().toString();
    }

    public static void main(String[] args) {
        System.out.println(decimalToBinary(6));
        System.out.println(decimalToBinary2(6));
        System.out.println(decimalToBinary3(6));
        //负整数转换为二进制 要点：
        //取反加一 解释：将该负整数对应的正整数先转换成二进制，然后对其“取补”，再对取补后的结果加1即可。
        //例如要把-52换算成二进制：
        //1.先取得52的二进制：00110100
        //2.对所得到的二进制数取反：11001011
        //3.将取反后的数值加一即可：11001100 即：(-52)10=(11001100)2
        int num = -5;

    }
}
