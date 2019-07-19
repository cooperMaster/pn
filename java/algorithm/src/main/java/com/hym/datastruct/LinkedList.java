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


        ll.printList(ll.head);

        System.out.println("==================");

        //A node can be added in three ways
        //1) At the front of the linked list
        Node node0 = ll.push(0);
        ll.printList(node0);

        System.out.println("==================");

        //Add a node after a given node
        ll.insertAfter(node0.next.next,23);
        ll.printList(node0);

        System.out.println("==================");

        //Add a node at the end
        ll.append(node0, 4);
        ll.printList(node0);
    }

    private Node push(int data) {
        Node node0 = new Node(0);
        node0.next = head;
        return node0;
    }

    private void insertAfter(Node prevNode, int data) {
        if (prevNode == null) { throw new RuntimeException("The given previous node cannot be null");}
        Node newNode = new Node(data);
        //Make next of new Node as next of prev_node
        newNode.next = prevNode.next;
        //make next of prev_node as new_node
        prevNode.next = newNode;
    }

    private void append(Node head,int data){
        Node endNode = new Node(data);
        if (head == null) {head = endNode;}

        Node curr = head;
        /*
            错误的方式，curr.next -> null

            curr = curr.next 当curr = endNode的时候 是重新赋值给curr这个变量
            curr的前节点已经指向NULL

         */

//        while (curr != null) {
//            curr = curr.next;
//        }
//
//        curr = endNode;

        while(curr.next != null) {
            curr = curr.next;
        }
        curr.next = endNode;
        endNode.next = null;
    }

    private void printList(Node n){
        while(n != null) {
            System.out.println(n.data);
            n = n.next;
        }
    }
}
