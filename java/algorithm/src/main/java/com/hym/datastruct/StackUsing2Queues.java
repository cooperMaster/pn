package com.hym.datastruct;

import java.util.LinkedList;
import java.util.Queue;

/**
 * @author whoym
 */
public class StackUsing2Queues<T> {
    Queue<T> q1;
    Queue<T> q2;

    StackUsing2Queues(){
        q1 = new LinkedList<>();
        q2 = new LinkedList<>();
    }

    public void push(T data) {
        if (q1.size() == 0) {
            q1.add(data);
        } else {
            while (q1.size() > 0) {
                q2.add(q1.remove());
            }
            q1.add(data);
            while (q2.size() > 0) {
                q1.add(q2.remove());
            }

        }
    }

    public T pop() {
        if (q1.size() == 0) {return null;}
        return q1.remove();
    }

    public static void main(String[] args){
        StackUsing2Queues<Integer> stack = new StackUsing2Queues();
        stack.push(20);
        stack.push(40);
        stack.push(70);
        stack.push(50);
        stack.push(90);
        stack.push(110);
        stack.push(30);
        System.out.println("Removed element : "+ stack.pop());
        stack.push(170);
        System.out.println("Removed element : "+ stack.pop());
    }
}
