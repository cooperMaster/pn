package com.hym.algorithm;

public class BinarySearch {
    /**
     * 用二分法查找元素
     * 已排序非重复的集合
     */
    public int search(int[] arr,int target){
        int low = 0;
        int high = arr.length-1;
        while (low <= high) {
            int mid = low + ((high-low)>>1);
            if (arr[mid] == target) {
                return mid;
            } else if (arr[mid] > target) {
                high = mid - 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            }
        }
        return -1;
    }

    public int searchByRecursion(int[] arr,int low, int high, int target){
        if (low > high) {return -1;}
        int mid = low + ((high-low)>>1);
        if (arr[mid] == target) {
            return mid;
        }else if (arr[mid] > target) {
            return searchByRecursion(arr,low, mid-1, target);
        }else if (arr[mid] < target) {
            return searchByRecursion(arr,mid+1, high, target);
        }
        return -1;
    }

    /**
     * 查找第一个值等于给定的元素
     */
    public int searchFirstEleDup(int[] arr, int target){
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = low + ((high-low)>>1);
            if (arr[mid] > target) {
                high = mid - 1;
            }else if (arr[mid] < target) {
                low = mid + 1;
            }else  {
                if (mid==0 || arr[mid-1] < target) {
                    return mid;
                } else {
                    high = mid - 1;
                }
            }
        }
        return -1;
    }


    public int searchFirstEleDup2(int[] a,  int value) {
        int low = 0;
        int high = a.length - 1;
        while (low <= high) {
            int mid = low + ((high - low) >> 1);
            if (a[mid] >= value) {
                high = mid - 1;
            } else {
                low = mid + 1;
            }
        }

        if (low < a.length && a[low]==value) {return low;}
        else {return -1;}
    }

    /**
     * 查找最后一个值等于给定元素
     */
    public int searchLastEleDup(int[] arr, int target) {
        int low = 0;
        int high = arr.length-1;

        while (low <= high) {
            int mid = low + ((high-low)>>1);
            if (arr[mid] > target) {
                high = mid - 1;
            } else if (arr[mid] < target) {
                low = mid + 1;
            } else {
                if ((mid == arr.length-1) || arr[mid+1] > target) {
                    return mid;
                } else {
                    low = mid + 1;
                }
            }
        }
        return -1;
    }

    /**
     * 查找第一个大于等于给定值的元素
     */
    public int searchFirstGreaterEle(int[] arr, int target){
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = low + ((high-low)>>1);
//            if (arr[mid] < target) {
//                low = mid + 1;
//            } else if (arr[mid] > target) {
//                if (mid == 0 || arr[mid - 1] <= target) {return mid;}
//                else{high = mid - 1;}
//            } else {
//                if (mid ==0 || arr[mid-1] < target) {return mid;}
//                else{high = mid -1;}
//            }

            if (arr[mid] < target) {
                low = mid + 1;
            } else if (arr[mid] >= target) {
                if (mid ==0 || arr[mid-1] < target) {return mid;}
                else{high = mid -1;}
            }
        }

        return -1;
    }

    /**
     * 查找最后一个小于等于给定值的元素
     */
    public int searchLastSmallerEle(int[] arr, int target) {
        int low = 0;
        int high = arr.length - 1;
        while (low <= high) {
            int mid = low + ((high-low)>>1);
            if (arr[mid] > target) {
                high = mid - 1;
            }else if (arr[mid] <= target) {
                if ((mid == arr.length-1) || arr[mid+1] > target) {return mid;}
                else {low = mid + 1;}
            }
        }

        return -1;
    }

    public static void main(String[] args){
        BinarySearch bs = new BinarySearch();
        int[] arr = {1,3,5,7,9,12,15,18};
        int target = 5;
        System.out.println(bs.search(arr, target));
        System.out.println(bs.searchByRecursion(arr,0, arr.length-1,target));


        int[] arrDup = {1,3,5,5,7,7,9,12};
        target = 5;
        System.out.println("The first ele: " + bs.searchFirstEleDup(arrDup,target));
        System.out.println("The first ele: " + bs.searchFirstEleDup2(arrDup,target));
        System.out.println("The last ele: " + bs.searchLastEleDup(arrDup,target));
        System.out.println(bs.searchFirstGreaterEle(arrDup,5));
        System.out.println(bs.searchFirstGreaterEle(arrDup,6));

        System.out.println(bs.searchLastSmallerEle(arrDup,5));
        System.out.println(bs.searchLastSmallerEle(arrDup,6));
    }
}
