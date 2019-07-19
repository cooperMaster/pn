# https://www.geeksforgeeks.org/linked-list-set-1-introduction/

class Node:
    def __init__(self,data):
        self.data = data
        self.next = None

class LinkedList:
    def __init__(self):
        self.head = None

    def printList(self,node):
        while node:
            print(node.data)
            node = node.next

    def push(self, data):
        node0 = Node(0)
        node0.next = self.head
        return node0


    def insertAfter(self,prevNode,data):
        if prevNode is None:
            print("The given previous node must inLinkedList.")
            return

        node = Node(data)
        node.next = prevNode.next
        prevNode.next = node

    def append(self, data):
        nodeEnd =  Node(data)
        if self.head is None:
            self.head = nodeEnd
            return

        curr = self.head
        # while curr:
        #     curr = curr.next

        # curr = nodeEnd
        # nodeEnd.next = None
        while curr.next:
            curr = curr.next

        curr.next = nodeEnd



if __name__ == "__main__":
    ll = LinkedList()
    ll.head = Node(1)
    second = Node(2)
    third = Node(3)

    ll.head.next = second
    second.next = third

    ll.printList(ll.head)
    print("==========================")

    # A node can be added in three ways
    # At the front of the linked list
    node0 = ll.push(0)
    ll.printList(node0)

    print("==========================")

    # Add a node after a given node
    ll.insertAfter(node0.next.next, 23)
    ll.printList(node0)

    print("==========================")

    # Add a node at the end
    ll.append(4)
    ll.printList(node0)

