package com.hym.datastruct;

/**
 * @author whoym
 * 用单链表实现队列
 */
public class LinkedListQueue<T> {
    private Node head;
    private Node tail;

    public boolean enqueue(T data) {
        if (head == null) {
            head = new Node(data);
            tail = head;
            return true;
        }
        tail.next = new Node(data);
        tail = tail.next;
        return true;
    }

    public T dequeue() {
        if (head == null) {return null;}
        T value = (T) head.data;
        head = head.next;
        if (head == null) {tail = null;}
        return value;
    }

    public static void main(String[] args){
        LinkedListQueue<String> llq = new LinkedListQueue<>();
        llq.enqueue("a");
        llq.enqueue("b");
        llq.enqueue("c");
        llq.printAll();
        llq.dequeue();
        llq.printAll();
        llq.enqueue("d");
        llq.printAll();
    }

    private class Node<T> {
        T data;
        Node next;
        Node(T data){
            this.data = data;
            this.next = null;
        }
    }

    public void printAll() {
        Node p = head;
        while (p != null) {
            System.out.print(p.data + " ");
            p = p.next;
        }
        System.out.println();
    }
}
