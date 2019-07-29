# -*- coding:utf-8 -*-

# https://www.geeksforgeeks.org/insertion-sort/

def sort(arr):
    n = len(arr)
    for i in range(1,n):
        j = i - 1
        while j>= 0 and arr[j] > arr[j+1]:
            arr[j],arr[j+1] = arr[j+1],arr[j]
            j -= 1



arr = [12, 11, 13, 5, 6]
print ("Sorted array")
sort(arr)
for i in range(len(arr)):
    print("%d" %arr[i]),
