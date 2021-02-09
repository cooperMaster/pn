package com.hym.algorithm;

import java.util.Arrays;

/**
 * https://www.geeksforgeeks.org/bubble-sort/
 *
 * Worst and Average Case Time Complexity: O(n*n). Worst case occurs when array is reverse sorted.
 *
 * Best Case Time Complexity: O(n). Best case occurs when array is already sorted.
 *
 * Auxiliary Space: O(1)
 *
 * Boundary Cases: Bubble sort takes minimum time (Order of n) when elements are already sorted.
 *
 * Sorting In Place: Yes
 *
 * Stable: Yes
 */
public class BubbleSort {

// what kind of this?
//    static int[] sort(int[] arr){
//        for (int i = 0;i< arr.length -1; i++ ) {
//            for (int j = i+1;j<arr.length;j++) {
//                if (arr[i] > arr[j]) {
//                    int temp = arr[i];
//                    arr[i] = arr[j];
//                    arr[j] = temp;
//                }
//            }
//        }
//        return arr;
//    }

    static int[] sort(int[] arr){
        for (int i = 0; i< arr.length -1;i++) {
            for (int j =0;j<arr.length-1-i;j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                }
            }
        }
        return arr;
    }

    static int[] sort_optimized(int[] arr){
        for (int i=0;i<arr.length - 1;i++) {
            boolean swapped =false;
            for (int j=0;j<arr.length-i-j;j++) {
                if (arr[j] > arr[j+1]) {
                    int temp = arr[j];
                    arr[j] = arr[j+1];
                    arr[j+1] = temp;
                    swapped = true;
                }
            }
            if (!swapped) {
                break;
            }
        }

        return arr;
    }

    public static void main(String[] args){
        int arr[] = {64, 25, 12, 22, 11};
        System.out.println(Arrays.toString(BubbleSort.sort(arr)));
        System.out.println(Arrays.toString(BubbleSort.sort_optimized(arr)));
    }
}
