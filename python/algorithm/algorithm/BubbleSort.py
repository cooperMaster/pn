# -*- coding:utf-8 -*-

#https://www.geeksforgeeks.org/bubble-sort/
def bubbleSort(arr):
    n = len(arr)
    for i in range(n):
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j], arr[j+1] = arr[j+1], arr[j]

def bubleSort_optimized(arr):
    n = len(arr)
    for i in range(n):
        swapped = False;
        for j in range(n-i-1):
            if arr[j] > arr[j+1]:
                arr[j],arr[j+1] = arr[j+1],arr[j]
                swapped = True

        if(swapped == False):
            break


arr = [64, 34, 25, 12, 22, 11, 90]

# bubbleSort(arr)
bubleSort_optimized(arr)
print("Sorted array is:")
for i in range(len(arr)):
    print("%d" % arr[i])