package com.hym.algorithm;

/**
 * 约瑟夫问题 -- 人们站在一个等待被处决的圈子里。 计数从圆圈中的指定点开始，并沿指定方向围绕圆圈进行。
 * 在跳过指定数量的人之后，处刑下一个人。 对剩下的人重复该过程，从下一个人开始，朝同一方向跳过相同数量的人，
 * 直到只剩下一个人，并被释放。
 */
public class JosephusProblem {
    class Node{
        int value;
        Node next;
        Node(){}
        Node(int value){ this. value = value;}

        @Override
        public String toString() {
            return "Node{" +
                    "value=" + value +
                    '}';
        }
    }

    //n 要创建的节点个数
    public Node createLinkNodes(int n){
        Node head = new Node(1);
        Node pre = head;
        for (int i = 2; i<= n; i ++){
            Node newNode = new Node(i);
            pre.next = newNode;
            pre = newNode;
        }
        pre.next = head;
        return head;
    }

    public void solveProblem(int n, int m) {
        if (m == 1) {
            // 每个节点都是
        } else {
            Node headNode = createLinkNodes(n);
            Node cur = headNode;
            Node pre = null;
            while (cur.next != cur) {
                //跳过的节点
                for (int i=0; i< m -1 ;i++) {
                    pre = cur;
                    cur = cur.next;
                }
                //要被处理的节点
                System.out.println(cur);
                pre.next = cur.next;
                cur.next = null;
                cur = pre.next;
            }

            System.out.println("success: " + cur);
        }
    }

    public static void main(String[] args){
        int n = 5;
        int m = 2;

        JosephusProblem jp = new JosephusProblem();
        jp.solveProblem(n, m);

        jp.solveProblem(10, 3);
    }
}
