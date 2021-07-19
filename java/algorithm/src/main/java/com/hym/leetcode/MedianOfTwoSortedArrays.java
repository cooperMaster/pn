package com.hym.leetcode;

/**
 * Given two sorted arrays nums1 and nums2 of size m and n respectively, return the median of the two sorted arrays.
 *
 * The overall run time complexity should be O(log (m+n)).
 *
 *
 *
 * Example 1:
 *
 * Input: nums1 = [1,3], nums2 = [2]
 * Output: 2.00000
 * Explanation: merged array = [1,2,3] and median is 2.
 * Example 2:
 *
 * Input: nums1 = [1,2], nums2 = [3,4]
 * Output: 2.50000
 * Explanation: merged array = [1,2,3,4] and median is (2 + 3) / 2 = 2.5.
 * Example 3:
 *
 * Input: nums1 = [0,0], nums2 = [0,0]
 * Output: 0.00000
 * Example 4:
 *
 * Input: nums1 = [], nums2 = [1]
 * Output: 1.00000
 * Example 5:
 *
 * Input: nums1 = [2], nums2 = []
 * Output: 2.00000
 *
 *
 * Constraints:
 *
 * nums1.length == m
 * nums2.length == n
 * 0 <= m <= 1000
 * 0 <= n <= 1000
 * 1 <= m + n <= 2000
 * -106 <= nums1[i], nums2[i] <= 106
 */
public class MedianOfTwoSortedArrays {
    public double findMedianSortedArrays(int[] nums1, int[] nums2) {
        int m = nums1.length;
        int n = nums2.length;

        int mod = (m+n) % 2;
        int mid = (m+n) / 2;

        int[] temp = new int[mid+1];
        int count = 0;
        int i = 0;
        int j = 0;

        while (i < m && j < n && count < temp.length) {
            if (nums1[i] < nums2[j]) {
                temp[count++] = nums1[i];
                i++;
            } else {
                temp[count++] = nums2[j];
                j++;
            }
        }

        while (count < temp.length) {
            if (i < m ) {
                temp[count++] = nums1[i];
                i++;
            }

            if (j < n ) {
                temp[count++] = nums2[j];
                j++;
            }
        }

        if (mod == 0 ) {
            return (double)(temp[count-1] + temp[count-2])/2;
        } else {
            return (double)temp[count-1];
        }

    }
    
    public static void main(String[] args){
        int[] nums1 = {1,3};
        int[] nums2 = {2,4};

        MedianOfTwoSortedArrays medianOfTwoSortedArrays = new MedianOfTwoSortedArrays();
        double d = medianOfTwoSortedArrays.findMedianSortedArrays(nums1, nums2);
        System.out.println(d);

    }

}
