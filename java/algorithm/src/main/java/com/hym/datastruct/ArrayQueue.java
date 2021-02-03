package com.hym.datastruct;

import java.util.Arrays;

/**
 * @author whoym
 * 用数组实现队列
 */
public class ArrayQueue<T> {
    private T[] items;
    private int capacity;
    private int head = 0;
    private int tail;
    private int length;

    ArrayQueue(){
        items = (T[]) new Object[10];
        this.capacity = 10;
        this.length = 10;
    }

    ArrayQueue(int capacity){
        items = (T[]) new Object[capacity];
        this.capacity = capacity;
        this.length = capacity;
    }

//    public boolean enqueue(T data){
//        if ( tail == length ) {return  false;}
//        items[tail++] = data;
//        return true;
//    }

    public boolean enqueue(T data){
        if (tail == length) {
            // 队列满了
            if (head == 0) {return false;}
            for (int i = head; i< length; i++) {
                items[i-head] = items[i];
                items[i] = null;
            }
            tail -= head;
            head = 0;
        }
        items[tail++] = data;
        return true;
    }

    public T dequeue() {
        if (head == tail) {return  null;}
        T t = items[head];
        items[head] = null;
        head++;
        return t;
    }

    public static void main(String[] args){
        ArrayQueue<String> aq = new ArrayQueue<>(5);
        aq.enqueue("a");
        aq.enqueue("b");
        aq.enqueue("c");
        aq.enqueue("d");
        aq.enqueue("e");
        System.out.println(Arrays.toString(aq.items));
        aq.dequeue();
        aq.dequeue();
        System.out.println(Arrays.toString(aq.items));
        aq.enqueue("f");
        System.out.println(Arrays.toString(aq.items));
    }
}
