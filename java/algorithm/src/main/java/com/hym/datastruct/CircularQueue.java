package com.hym.datastruct;

/**
 * 基于数组实现的循环队列
 */
public class CircularQueue<T> {
    private T[] items;
    private int length;
    private int front;
    private int rear;

    CircularQueue(int length){
        items = (T[]) new Object[length];
        this.length = length;
        this.front = -1;
        this.rear = -1;
    }

    public boolean enqueue(T data) {
        if (ifFull()) {return false;}
        if (front == -1) {
            front = 0;
        }
        rear = (rear + 1) % length;
        items[rear] = data;
        return true;
    }

    public T dequeue() {
        if (isEmpty()) { return null;}
        T value = items[front];
        // 此时只有一个元素了，删除之后，重置为null
        if (front == rear) {
            front = -1;
            rear = -1;
        } else {
            front = (front + 1) % length;
        }
        return value;
    }

    private boolean isEmpty() {
        if (front == -1) {return true;}
        return false;
    }

    private boolean ifFull() {
        if (front == 0 && (rear+1) == length) {return true;}
        if ((rear+1) == front) {return true;}
        return false;
    }

    void display() {
        /* Function to display status of Circular Queue */
        int i;
        if (isEmpty()) {
            System.out.println("Empty Queue");
        } else {
            System.out.println("Front -> " + front);
            System.out.println("Items -> ");
            for (i = front; i != rear; i = (i + 1) % length) {
                System.out.print(items[i] + " ");
            }
            System.out.println(items[i]);
            System.out.println("Rear -> " + rear);
        }
    }

    public static void main(String[] args){
        CircularQueue<String> cq = new CircularQueue<>(5);
        cq.enqueue("a");
        cq.enqueue("b");
        cq.enqueue("c");
        cq.enqueue("d");
        cq.enqueue("e");
        cq.display();
        System.out.println("Deleted Element is " + cq.dequeue());
        cq.display();
        cq.enqueue("f");
        cq.display();
    }
}
