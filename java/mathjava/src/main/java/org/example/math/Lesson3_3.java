package org.example.math;

import java.util.Arrays;

/**
 * 二分查找
 * 多观察问题的现象，思考其本质，看看不断更新变量值或者缩小搜索的区间范围，是否可以获得最终的解（或近似解、局部最优解），如果是，那么你就可以尝试迭代法。
 */
public class Lesson3_3 {

    /**
     * @Description: 查找某个单词是否在字典里出现
     * @param dictionary-排序后的字典,
     * @param wordToFind-待查的单词
     * @return boolean-是否发现待查的单词
     */
    public static boolean search(String[] dictionary, String wordToFind){
        if (dictionary == null) {
            return false;
        }
        if (dictionary.length == 0) {
            return false;
        }

        int left = 0, right = dictionary.length -1;
        while (left <= right) {
//            int mid = (left + right)/2;
            int mid = left + (right - left)/2;
            if (dictionary[mid].equals(wordToFind) ){
                return true;
            } else {
                if (dictionary[mid].compareTo(wordToFind) > 0) {
                    right = mid - 1;
                } else {
                    left = mid + 1;
                }
            }
        }

        return false;
    }


    public static void main(String[] args) {

        String[] dictionary = {"i", "am", "one", "of", "the", "authors", "in", "geekbang"};
        Arrays.sort(dictionary);
        String wordToFind = "in";
        boolean found = search(dictionary, wordToFind);
        if (found) {
            System.out.println(String.format("找到了单词%s", wordToFind));
        } else {
            System.out.println(String.format("未能找到单词%s", wordToFind));
        }

    }
}
