package com.hym.leetcode;

/*
Given an array of integers, return indices of the two numbers such that they add up to a specific target.

You may assume that each input would have exactly one solution, and you may not use the same element twice.

Example:

Given nums = [2, 7, 11, 15], target = 9,

Because nums[0] + nums[1] = 2 + 7 = 9,
return [0, 1].
*/

public class TwoSum{

    //my solution
    public int[] twoSum(int[] nums, int target) {
        for(int i = 0; i < nums.length-1; i++){
            for(int j= i+1; j< nums.length; j++){
                int temp = target-nums[i];
                if(temp == nums[j]) {
                    return new int[]{i,j};
                }
            }
        }
        return new int[]{};
    }

//    public int[] twoSum(int[] nums, int target) {
//        Map<Integer,Integer> map = new HashMap();
//        for(int i = 0 ;i < nums.length; i++){
//            map.put(nums[i], i);
//        }
//
//        for(int i = 0 ;i < nums.length; i++){
//            if(map.containsKey(target-nums[i])){
//                return new int[]{i,map.get(target-nums[i])};
//            }
//        }
//
//        throw new IllegalArgumentException("No two sum solution.");
//    }

//    public int[] twoSum(int[] nums, int target) {
//        Map<Integer, Integer> map = new HashMap<>();
//        for (int i = 0; i < nums.length; i++) {
//            int complement = target - nums[i];
//            if (map.containsKey(complement)) {
//                return new int[] { map.get(complement), i };
//            }
//            map.put(nums[i], i);
//        }
//        throw new IllegalArgumentException("No two sum solution");
//    }

    public static void main(String[] args){
        TwoSum ts = new TwoSum();
        int[] nums = {2,3,7,8};
        Println.out(ts.twoSum(nums, 9));
    }
}