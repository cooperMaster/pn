# -*- coding:utf-8 -*-

# https://www.geeksforgeeks.org/selection-sort/
def sort(arr):
    n = len(arr)
    for i in range(n):
        min_index = i
        for j in range(i+1,n):
            if arr[min_index] > arr[j]:
                min_index = j

        arr[i],arr[min_index] = arr[min_index],arr[i]


arr = [64, 25, 12, 22, 11]
print ("Sorted array")
sort(arr)
for i in range(len(arr)):
    print("%d" %arr[i]),


# another write

def findSmallest(arr):
    smallest = arr[0]
    smallest_index = 0
    for i in range(1, len(arr)):
        if smallest > arr[i]:
            smallest = arr[i]
            smallest_index = i
    return smallest_index

def selectionSort(arr):
    new_arr = []
    for i in range(len(arr)):
        smallest_index = findSmallest(arr)
        new_arr.append(arr.pop(smallest_index))
    return new_arr

print(selectionSort([64, 25, 12, 22, 11]))