
/*
Given a 32-bit signed integer, reverse digits of an integer.

Example 1:
Input: 123
Output: 321

Example 2:
Input: -123
Output: -321

Example 3:
Input: 120
Output: 21
Note:
Assume we are dealing with an environment which could only store integers within the 32-bit signed integer range: [−2^31,  2^31 − 1].
For the purpose of this problem, assume that your function returns 0 when the reversed integer overflows.
 */
public class ReverseInteger {

    //my solution
//    public int reverse(int x){
//        long reverseNum = 0;
//        if (x == 0 || x == Integer.MAX_VALUE || x == Integer.MIN_VALUE) {return 0;}
//
//        boolean negtive = x < 0 ? true : false;
//        int temp = x < 0 ? -x : x;
//        while(temp > 0){
//            reverseNum = reverseNum *10 + temp%10;
//            temp = temp/10;
//        }
//
//        if (reverseNum > Integer.MAX_VALUE){return 0;}
//
//        if (negtive) {
//            return -(int)reverseNum;
//        }else {
//            return (int) reverseNum;
//        }
//    }

    /*
        To "pop" and "push" digits without the help of some auxiliary stack/array, we can use math.

        //pop operation:
        pop = x % 10;
        x /= 10;

        //push operation:
        temp = rev * 10 + pop;
        rev = temp;

        However, this approach is dangerous, because the statement temp=rev⋅10+pop can cause overflow.
        Luckily, it is easy to check beforehand whether or this statement would cause an overflow.
        To explain, lets assume that rev is positive.
        1. If temp=rev⋅10+pop causes overflow, then it must be that rev≥INTMAX/10
        ​2. If rev>INTMAX/10, then temp=rev⋅10+pop is guaranteed to overflow.
        3. If rev==INTMAX/10, then temp=rev⋅10+pop will overflow if and only if pop>7
        Similar logic can be applied when rev}rev is negative.
    */
    public int reverse(int x){
        int rev = 0;
        while(x != 0) {
            int pop = x % 10;
            x /= 10;
            if (rev > Integer.MAX_VALUE/10 || rev == Integer.MAX_VALUE/10&&pop>7 ){return 0;}
            if (rev < Integer.MIN_VALUE/10 || rev == Integer.MIN_VALUE/10&&pop<-8){return 0;}
            rev = rev * 10 + pop;
        }
        return rev;
    }

    
    public static void main(String[] args){
        ReverseInteger ri = new ReverseInteger();
        Println.out(ri.reverse(123));
    }
}
