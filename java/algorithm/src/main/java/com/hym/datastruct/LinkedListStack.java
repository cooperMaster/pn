package com.hym.datastruct;

/**
 * @author whoym
 * 基于单链表实现的栈
 */
public class LinkedListStack<T> {
    private Node top;

    public boolean push(T data) {
        if (top == null) {
            top = new Node(data, null);
            return true;
        }
        Node temp = new Node(data, top);
        top = temp;
        return true;
    }

    public T pop(){
        if (top == null) {return null;}
        Node temp = top;
        top = top.next;
        T value = (T) temp.data;
        return value;
    }

    private class Node<T>{
        private T data;
        private Node next;

        Node(T data, Node node){
            this.data = data;
            this.next = node;
        }
    }

    public static void main(String[] args){
        LinkedListStack<Integer> lls = new LinkedListStack<>();
        lls.push(1);
        lls.push(2);
        lls.push(3);
        lls.printAll();
        lls.pop();
        lls.push(4);
        lls.printAll();
    }

    public void printAll() {
        Node p = top;
        while (p != null) {
            System.out.print(p.data + " ");
            p = p.next;
        }
        System.out.println();
    }
}
