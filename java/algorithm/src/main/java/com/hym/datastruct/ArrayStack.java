package com.hym.datastruct;

import java.util.Arrays;

/**
 * @author whoym
 * 用数组模拟栈
 */
public class ArrayStack<T> {
    private T[] items;
    //栈的大小
    private int length;
    //栈中元素数量
    private int count;

    ArrayStack(int length){
        items = (T[]) new Object[length];
        this.length = length;
    }

    public boolean push(T data){
        if (count == length) {return false;}
        items[count++] = data;
        return true;
    }

    public T pop(){
        if (count == 0) {return null;}
        T t = items[count-1];
        items[count-1] = null;
        count--;
        return t;
    }

    public static void main(String[] args){
        ArrayStack<String> as = new ArrayStack<>(5);
        as.push("a");
        as.push("b");
        as.push("c");
        System.out.println(Arrays.toString(as.items));
        System.out.println(as.pop());
        System.out.println(Arrays.toString(as.items));
    }

}
