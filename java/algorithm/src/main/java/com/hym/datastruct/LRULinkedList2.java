package com.hym.datastruct;

/**
 * 缓存LRU（Least Recently Used）
 * 基于单链表
 */
public class LRULinkedList2<T> {
    private Node<T> headNode;
    private int length;
    private static final Integer DEFAULT_CAPACITY = 10;
    private int capacity;

    LRULinkedList2(){
        this.capacity = DEFAULT_CAPACITY;
        this.length = 0;
    }
    LRULinkedList2(int capacity){
        this.capacity = capacity;
        this.length = 0;
    }

    public void add(T data){
        if (headNode == null) {
            headNode = new Node<>(data);
            this.length++;
            return;
        }
        if (data.equals(headNode.getElement())) {
            System.out.println("元素在头节点，无需操作");
            return;
        }

        //元素是否在链表中
        Node node = findDataReturnPreNode(data);
        //元素在链表中
        if (node != null) {
            //先删
            delTargetNode(node);
            //再插入到头节点
            insetTopNode(data);
        }else {
            //元素不在链表中
            //满了，则删掉尾节点
            if (length == capacity) {
                delTailNode();
            }
            //再插入到头节点
            insetTopNode(data);
        }


    }

    private void delTailNode() {
        Node cur = headNode;
        while (cur.getNext().getNext() != null) {
            cur = cur.getNext();
        }
        Node temp = cur.getNext();
        cur.setNext(null);
        temp = null;
        length--;

    }

    private void insetTopNode(T data) {
        Node node = new Node(data,headNode);
        headNode = node;
        length++;
    }

    private void delTargetNode(Node node) {
        Node cur = node.getNext();
        node.setNext(cur.getNext());
        cur.setNext(null);
        length--;
    }

    private Node findDataReturnPreNode(T data) {
        Node cur = headNode;
        Node pre = null;
        while (cur.getNext() != null) {
            pre = cur;
            if (data.equals(cur.getNext().getElement())) {
                return pre;
            }
            cur = cur.getNext();
        }
        return null;
    }

    class Node<T>{
        private T element;
        private Node next;

        public Node(){}
        public Node(T element){
            this.element = element;
        }
        public Node(T element, Node next){
            this.element = element;
            this.next = next;
        }

        public T getElement() {
            return element;
        }

        public void setElement(T element) {
            this.element = element;
        }

        public Node getNext() {
            return next;
        }

        public void setNext(Node next) {
            this.next = next;
        }
    }

    public void printAll(){
        Node cur = headNode;
        while (cur != null) {
            System.out.print(" " + cur.getElement());
            cur = cur.next;
        }
        System.out.println("");
    }

    public static void main(String[] args){
        LRULinkedList2<String> lrull = new LRULinkedList2<>(3);
        lrull.add("a");
        lrull.add("b");
        lrull.add("c");
        lrull.printAll();
        lrull.add("d");
        lrull.printAll();
        lrull.add("b");
        lrull.printAll();
        lrull.add("b");
        lrull.printAll();
    }

}
