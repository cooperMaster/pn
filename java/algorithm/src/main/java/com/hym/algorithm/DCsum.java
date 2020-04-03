package com.hym.algorithm;

/**
 * 通过递归求总数组
 *
 * D&C的工作原理：
 * 1、找出简单的基线条件；
 * 2、确定如何缩小问题的规模，使其符合基线条件。
 */
public class DCsum {
    private int[] arrEle;
    private int len;//arr 每次取值后的长度

    public DCsum(){}

    public DCsum(int[] arrEle){
        this.arrEle = arrEle;
        this.len = arrEle.length;
    }

    public int sumArr2(){
        if (len==0){
            return 0;
        }else if (len == 1) {
            return arrEle[arrEle.length - len];
        }else {
            len--;
            return arrEle[arrEle.length - (len+1)] + sumArr2();
        }

    }

    //尾递归
    public int sumArrTR(int len, int item){
        if (len == 0) {
            return item;
        }
        item +=  arrEle[len -1];
        return sumArrTR(len - 1, item );
    }


    public int sumArr(int[] arr){
        if (arr.length==0){
            return 0;
        }else if (arr.length == 1){
            return arr[0];
        }else {
            int[] temArr = new int[arr.length-1];
            for (int i = 1;i< arr.length;i++){
                temArr[i-1] = arr[i];
            }
            return arr[0] + sumArr(temArr);
        }
    }

    public static void main(String[] args){
        int[] arr = {1,2,3,4,5};
        DCsum  dCsum = new DCsum();
        System.out.println(dCsum.sumArr(arr));

        DCsum  dCsum2 = new DCsum(arr);
        System.out.println(dCsum2.sumArr2());

        DCsum  dCsum3 = new DCsum(arr);
        System.out.println(dCsum3.sumArrTR(arr.length, 0));
    }
}
