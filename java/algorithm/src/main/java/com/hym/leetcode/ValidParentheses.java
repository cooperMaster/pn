package com.hym.leetcode;

import java.util.HashMap;
import java.util.Map;
import java.util.Stack;

public class ValidParentheses {

    public static boolean isValid(String s) {
        Map<Character,Character> map = new HashMap();
        map.put(')','(');
        map.put('}','{');
        map.put(']','[');

        if(s== null) {return false;}
        if(s.length() == 0) {return true;}
        Stack<Character> stack = new Stack();
        for(int i=0;i<s.length();i++) {
            if(map.get(s.charAt(i)) != null) {
                if(stack.empty()){return false;}
                if(stack.pop().equals(map.get(s.charAt(i)) )){
                    continue;
                }else{
                    return false;
                }

            }else{
                stack.push(s.charAt(i));
            }
        }
        if(!stack.empty()){return false;}
        return true;
    }


    public static void main(String[] args){
//        System.out.println(isValid(""));
//        System.out.println(isValid("("));
        System.out.println(isValid("()"));
        System.out.println(isValid("([]"));
    }
}
