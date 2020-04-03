package com.hym.leetcode;

import java.util.Stack;

public class BackspaceStringCompare {
    public boolean backspaceCompare(String S, String T) {
        return build(S).equals(build(T));
    }

    public String build(String S){
        Stack<Character> sStack = new Stack();
        for(int i=0;i<S.length();i++){
            char c = S.charAt(i);
            if (!sStack.empty() && c == '#') {
                sStack.pop();
            }else {
                sStack.push(c);
            }
        }

        return String.valueOf(sStack);
    }
}
