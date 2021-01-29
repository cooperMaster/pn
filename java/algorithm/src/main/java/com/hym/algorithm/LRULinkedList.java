package com.hym.algorithm;

/**
 * 缓存LRU（Least Recently Used）
 * 基于单链表
 */
public class LRULinkedList<T> {
    //链表长度
    private int length;
    private final static Integer DEFAULT_CAPACITY = 15;
    private int capacity;
    private Node<T> headNode;

    public LRULinkedList(){
        this.headNode = new Node<>();
        this.capacity = DEFAULT_CAPACITY;
        this.length = 0;
    }

    public LRULinkedList(int capacity){
        this.headNode = new Node<>();
        this.capacity = capacity;
        this.length = 0;
    }

    public void add(T data){
        if (data.equals(this.headNode.getElement())) {
            System.out.println("元素在头节点，无需操作");
            return;
        }

        Node node = findPreNode(data);
        //data 节点存在，删除data节点，再将其放到头节点
        if (node != null) {
            //删除data 节点
            delTargetNode(node);
            //放到头节点
            insertTopNode(data);
        } else {
            //不存在data 节点，则先判断容量是否已经满
            //满了，则删掉尾节点，再插入到头节点
            //未满，则直接插入头节点
            if (length == capacity){

            }
            insertTopNode(data);

        }
    }
    //找到是否存在data的节点，若有，则返回前级节点
    private Node findPreNode(T data) {
        Node cur = headNode;
        Node pre = null;
        while (cur.getNext() != null) {
            pre = cur;
            if (data.equals(cur.getNext().getElement())) {
                return pre;
            }
            cur = cur.next;
        }

        return null;
    }

    private void delTargetNode(Node node){
        Node cur = node.getNext();
        node.setNext(cur.getNext());
        cur.setNext(null);
        this.length--;
    }

    private void insertTopNode(T data) {
        Node next = headNode.getNext();
        headNode.setNext(new Node(data, next));
        length++;
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

    public int getCapacity() {
        return capacity;
    }

    public void setCapacity(int capacity) {
        this.capacity = capacity;
    }

    public Node<T> getHeadNode() {
        return headNode;
    }

    public void setHeadNode(Node<T> headNode) {
        this.headNode = headNode;
    }

    public static void main(String[] args){
        LRULinkedList<String> list = new LRULinkedList();
        list.add("a");
        list.add("b");
        list.add("c");
        System.out.println(list.length);
        list.printAll();
        list.add("a");
        System.out.println(list.length);
        list.printAll();
    }

    public void printAll(){
        Node cur = headNode.getNext();
        while (cur != null) {
            System.out.print(" " + cur.getElement());
            cur = cur.next;
        }
        System.out.println("");
    }

}
