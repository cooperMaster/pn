package com.hym.datastruct;

/**
 * @author whoym
 * 反转单链表
 */
public class ReverseLinkedList {

    Node headNode;

    static class Node {
        int value;
        Node next;
        Node(int value){
            this.value = value;
            this.next=null;
        }
    }

    public static void main(String[] args){
        Node one = new Node(1);
        Node two = new Node(2);
        Node three = new Node(3);
        ReverseLinkedList rll = new ReverseLinkedList();
        rll.headNode = one;
        one.next = two;
        two.next = three;

        rll.printList(rll.headNode);
        System.out.println("");
        rll.printList(rll.reverse(rll.headNode));

    }

    Node reverse(Node node){
        Node pre = null;
        Node cur = node;
        Node next = null;
        while (cur != null) {
            next = cur.next;
            cur.next = pre;
            pre = cur;
            cur = next;
        }
        node = pre;
        return node;
    }

    void printList(Node node)
    {
        while (node != null) {
            System.out.print(node.value + " ");
            node = node.next;
        }
    }
}
