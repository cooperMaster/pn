package com.hym.datastruct;

/**
 * https://www.geeksforgeeks.org/linked-list-set-1-introduction/
 */
public class LinkedList {

    Node head;

    /* Linked list Node.  This inner class is made static so that
       main() can access it */
    static class Node{
        int data;
        Node next;
        Node(int d)  { data = d;  next=null; }
    }
    
    public static void main(String[] args){
        LinkedList ll = new LinkedList();
        ll.head = new Node(1);
        Node second = new Node(2);
        Node third = new Node(3);

        /* Three nodes have been allocated  dynamically.
          We have refernces to these three blocks as first,
          second and third

          llist.head        second              third
             |                |                  |
             |                |                  |
         +----+------+     +----+------+     +----+------+
         | 1  | null |     | 2  | null |     |  3 | null |
         +----+------+     +----+------+     +----+------+ */

        ll.head.next = second; // Link first node with the second node

        /*  Now next of first Node refers to second.  So they
            both are linked.

         llist.head        second              third
            |                |                  |
            |                |                  |
        +----+------+     +----+------+     +----+------+
        | 1  |  o-------->| 2  | null |     |  3 | null |
        +----+------+     +----+------+     +----+------+ */

        second.next = third; // Link second node with the third node

        /*  Now next of second Node refers to third.  So all three
            nodes are linked.

         llist.head        second              third
            |                |                  |
            |                |                  |
        +----+------+     +----+------+     +----+------+
        | 1  |  o-------->| 2  |  o-------->|  3 | null |
        +----+------+     +----+------+     +----+------+ */


        printList(ll.head);
    }

    public static void printList(Node n){
        while(n != null) {
            System.out.println(n.data);
            n = n.next;
        }
    }
}
