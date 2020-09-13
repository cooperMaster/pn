package org.example.math;

public class Lesson4_2 {

    /**
     * @Description: 使用函数的递归（嵌套）调用，进行数学归纳法证明
     * @param grid 第几格格子
     * @param result 保存当前格子的麦粒数和麦粒总数
     * @return 放到第grid格是否成立
     */
    public static boolean prove(int grid, Result result){

        if (grid == 1) {
            if ( (Math.pow(2,1) - 1) == 1) {
                result.wheatNum = 1;
                result.wheatTotalNum = 1;
                return true;
            } else {
                return false;
            }
        } else {
            // 如果n = (grid-1)时命题成立，证明n = k时命题是否成立
            boolean proveOfPreviousOne = prove(grid - 1, result);
            result.wheatNum *= 2;
            result.wheatTotalNum += result.wheatNum;
            boolean proveOfCurrentOne = false;
            if ( (Math.pow(2, grid) -1) == result.wheatTotalNum) {
                proveOfCurrentOne = true;
            }

            if ( proveOfPreviousOne && proveOfCurrentOne) {
                return true;
            } else {
                return false;
            }
        }
    }

    public static void main(String[] args) {
        int grid = 63;
        Result result = new Result();
        System.out.println(prove(grid, result));
    }
}
class Result {
    public long wheatNum = 0; // 当前格的麦粒数
    public long wheatTotalNum = 0; // 目前为止麦粒的总数
}