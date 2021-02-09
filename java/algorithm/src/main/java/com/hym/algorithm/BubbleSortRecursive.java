package com.hym.algorithm;


import java.util.Arrays;

/**
 * @author whoym
 * 递归法实现冒泡排序
 */
public class BubbleSortRecursive {

    public static void bubbleSort(int[] arr, int n){
        if (n == 1) {
            return;
        }
        boolean swapped = false;
        for (int i=0; i< n - 1; i++) {
            if (arr[i] > arr[i+1]) {
                int temp = arr[i];
                arr[i] = arr[i+1];
                arr[i+1] = temp;
                swapped=true;
            }
        }
        System.out.println(Arrays.toString(arr));
        if (!swapped) {return;}
        bubbleSort(arr, n-1);
    }

    public static void main(String[] args)
    {
        int arr[] = {64, 34, 25, 12, 22, 11, 90};

        bubbleSort(arr, arr.length);

        System.out.println("Sorted array : ");
        System.out.println(Arrays.toString(arr));
    }

}
