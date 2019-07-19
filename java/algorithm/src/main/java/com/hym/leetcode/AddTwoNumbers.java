package com.hym.leetcode;

/*
You are given two non-empty linked lists representing two non-negative integers. The digits are stored in reverse order and each of their nodes contain a single digit. Add the two numbers and return it as a linked list.
You may assume the two numbers do not contain any leading zero, except the number 0 itself.
Example:
Input: (2 -> 4 -> 3) + (5 -> 6 -> 4)
Output: 7 -> 0 -> 8
Explanation: 342 + 465 = 807.
 */
public class AddTwoNumbers {
    public static ListNode addTwoNumbers(ListNode l1, ListNode l2) {
        if(l1 == null || l2 == null){return null;}

        ListNode ln = new ListNode(0);
        int rem = 0;
        while(l1 != null || l2 != null){
            int val1 = l1 != null ? l1.val : 0;
            int val2 = l2 != null ? l2.val : 0;
            int temp = val1 + val2 + rem;
            ln.next = new ListNode(temp%10);
            ln = ln.next;

            rem = temp/10;
            if(l1 != null) l1 = l1.next;
            if(l2 != null) l2 = l2.next;


        }

        return ln;
    }
    
    public static void main(String[] args){
        ListNode l1 = new ListNode(0);
        l1.next = new ListNode(2);
        l1 = l1.next;
        l1.next = new ListNode(4);
        l1 = l1.next;
        l1.next = new ListNode(7);
        l1 = l1.next;
        ListNode l2 = new ListNode(0);
        l2.next = new ListNode(5);
        l2 = l2.next;
        l2.next = new ListNode(6);
        l2 = l2.next;
        l2.next = new ListNode(4);
        l2 = l2.next;

        addTwoNumbers(l1,l2);
    }
}

class ListNode {
      int val;
      ListNode next;
      ListNode(int x) { val = x; }
}
//TODO