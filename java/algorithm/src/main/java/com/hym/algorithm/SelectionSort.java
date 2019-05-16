package com.hym.algorithm;

import java.util.Arrays;

public class SelectionSort {
    /**
     * 选择排序:
     * arr[] = 64 25 12 22 11
     * 选择最小的元素in arr[0...4]放到arr[0]  11 25 12 22 64
     * 选择最小的元素in arr[1...4]放到arr[1]  11 12 25 22 64
     * 选择最小的元素in arr[2...4]放到arr[2]  11 12 22 25 64
     * 选择最小的元素in arr[3...4]放到arr[3]  11 12 22 25 64
     *
     *
     */



    static int[]  sort(int arr[]){
        int n = arr.length;
        for (int i=0; i < n-1; i++){
            //查找最小值的索引
            int min_index = i;
            for ( int j=i+1;j < n; j++) {
                if (arr[min_index] > arr[j]){
                    min_index = j;
                }
            }

            int temp = arr[i];
            arr[i] = arr[min_index];
            arr[min_index] = temp;
        }
        return arr;
    }

    public static void main(String[] args){
        int arr[] = {64, 25, 12, 22, 11};
        System.out.println(Arrays.toString(SelectionSort.sort(arr)));
    }
}
