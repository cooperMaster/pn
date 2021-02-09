package com.hym.datastruct;

/**
 * @author whoym
 * 基于数组实现的队列
 * 队尾下标不存储，保留为null，会浪费一个空间
 */
public class CircularQueue2<T> {
    private T[] items;
    private int length;
    private int head;
    private int tail;

    CircularQueue2(int length) {
        items = (T[]) new Object[length];
        this.length = length;
        this.head = 0;
        this.tail = 0;
    }

    public boolean enqueue(T data){
        //空间满了
        if ((tail + 1) % length == head ) {return false;}
        items[tail] = data;
        tail = (tail + 1) % length;
        return true;
    }

    public T dequeue() {
        if (head == tail) {return null;}
        T value = items[head];
        head = (head + 1) % length;
        return value;
    }

    void display() {
        /* Function to display status of Circular Queue */
        int i;
        if (head == tail) {
            System.out.println("Empty Queue");
        } else {
            System.out.println("Front -> " + head);
            System.out.println("Items -> ");
            for (i = head; i != tail; i = (i + 1) % length) {
                System.out.print(items[i] + " ");
            }
            System.out.println();
            System.out.println("Rear -> " + tail);
        }
    }

    public static void main(String[] args){
        CircularQueue2<String> cq = new CircularQueue2<>(5);
        cq.enqueue("a");
        cq.enqueue("b");
        cq.enqueue("c");
        cq.enqueue("d");
        cq.display();
        System.out.println("Deleted Element is " + cq.dequeue());
        cq.display();
        cq.enqueue("f");
        cq.display();
    }
}
