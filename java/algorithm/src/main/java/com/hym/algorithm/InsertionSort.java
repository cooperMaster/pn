package com.hym.algorithm;

import java.util.Arrays;

public class InsertionSort {
    /**
     * 插入排序：
     * Loop from i = 1 to n-1.
     * ……a) Pick element arr[i] and insert it into sorted sequence arr[0…i-1]
     *
     *
     * Time Complexity: O(n*2)
     *
     * Auxiliary Space: O(1)
     *
     * Boundary Cases: Insertion sort takes maximum time to sort if elements are sorted in reverse order. And it takes minimum time (Order of n) when elements are already sorted.
     *
     * Algorithmic Paradigm: Incremental Approach
     *
     * Sorting In Place: Yes
     *
     * Stable: Yes
     *
     * Online: Yes
     */

    static int[] sort(int[] arr){
        for (int i =1; i < arr.length; i++) {
            int temp = arr[i];
            int j = i - 1;
            while(j >= 0 && arr[j] > temp){
                arr[j+1] = arr[j];
                j--;
            }
            arr[j+1] = temp;
        }

        return arr;
    }

    public static void main(String[] args){
        int arr[] = {64, 25, 12, 22, 11};
        System.out.println(Arrays.toString(InsertionSort.sort(arr)));
    }
}
