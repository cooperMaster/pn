package com.hym.leetcode;

/**
 * Write a function to find the longest common prefix string amongst an array of strings.
 *
 * If there is no common prefix, return an empty string "".
 *
 * Example 1:
 *
 * Input: ["flower","flow","flight"]
 * Output: "fl"
 * Example 2:
 *
 * Input: ["dog","racecar","car"]
 * Output: ""
 * Explanation: There is no common prefix among the input strings.
 * Note:
 *
 * All given inputs are in lowercase letters a-z.
 */
//other solutions: https://leetcode.com/problems/longest-common-prefix/solution/
public class LongestCommonPrefix {


    public String longestCommonPrefix(String[] strs) {
        if(strs == null || strs.length==0){return "";}
//         StringBulder sb = new StringBulder("");
//         int count=0;

//         for(String str : strs){
//              Set<String> set = new HashSet();
//             if(str ==""){return "";}
//             if(str.length == count){return sb.toString();}
//             set.add(str[count]);
//         }

        String tempStr = strs[0];
        for(String str : strs){
            tempStr = accSameStr(tempStr,str);
        }
        return tempStr;
    }

    //my solution
    public String accSameStr(String str1, String str2){
        if(str1 == "" || str2 == ""){return "";}
        int tempLen = str1.length() > str2.length() ? str2.length() : str1.length();
        StringBuilder sb = new StringBuilder();
        for(int i=0;i<tempLen;i++){
            if(str1.charAt(i) == str2.charAt(i)){sb.append(str1.charAt(i));}
            else{break;}
        }
        return sb.toString();

    }
}
