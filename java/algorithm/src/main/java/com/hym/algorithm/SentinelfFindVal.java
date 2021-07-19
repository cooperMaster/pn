package com.hym.algorithm;

/**
 * 用哨兵模式和普通模式查找数组中的值
 */
public class SentinelfFindVal {
    private int[] arr;

    public SentinelfFindVal(int[] arr){
        this.arr = arr;
    }

    public int findVal(int target){
        int i = 0;
        int len = arr.length;
        while (i < len) {
            if (arr[i] == target) {
                return i;
            }
            i++;
        }
        return -1;
    }

    /**
     * 此种用哨兵模式，两者对比，思维方式不同，正式代码一般不这样写，可读性有点差，代码的性能虽有提升，但并不是所有的代码都需要极致的性能
     *
     */
    public int findValSentinel(int target){
        int len = arr.length;
        if (len == 0) {return -1;}

        // 这里要将a[len-1]target，下面代码要特殊处理这个值
        if (arr[len-1] == target) { return len-1; }
        // 临时存储
        int temp = arr[len-1];
        // 将target赋值到数组最后一位，保证下面代码while比较值的时候能跳出循环
        arr[len-1] = target;
        int i = 0;
        // 与findVal方法相比，少了i<n,当数组元素很大很大时，此处代码性能会比较好
        while (arr[i] != target) {
            i++;
        }
        // 将临时存储值放回到原数组，维持原数组数据
        arr[len-1] = temp;
        // 当相同值是最后一位，代表数组中没有target
        if (i == len-1) {
            return -1;
        } else {
            return i;
        }

    }

    public static void main(String[] args){
        int[] arr = {1,2,3,4,5,6,7,8,9};
        int target = 5;
        SentinelfFindVal sf = new SentinelfFindVal(arr);

        System.out.println(sf.findVal(target) + "," + sf.findValSentinel(target));
    }
}
