package org.example.math;

import java.util.ArrayList;
import java.util.Arrays;

/**
 * TODO NOT DONE
 * 假设现在需要设计一个抽奖系统。
 * 需要依次从 15 个人中，抽取三等奖 3 名，二等奖 2 名和一等奖 1 名。请列出所有可能的组合，需要注意的每人最多只能被抽中 1 次。
 */
public class Lesson8_1QA {
    public static int CNT = 0;
    /**
     * @Description: 抽取中奖的人组成一个arraylist，按照三等奖(3)、二等奖(2)、一等奖(1) 的顺序
     * @param person 当前还有多少人待抽奖
     * @param result 存放抽奖的结果
     * @param n 得奖的总人数
     */
    public static void combine(ArrayList<String> person, ArrayList<String> result, int n){
        if (result.size() == n) {
            CNT++;
            System.out.println(result);
            return;
        }
        for (String p : person) {
            ArrayList<String> new_result = (ArrayList<String>) result.clone();
            new_result.add(p);
            ArrayList<String> new_person = (ArrayList<String>) person.clone();
            new_person.remove(p);

            combine(new_person, new_result, n);
        }
//        for (int i=0; i < person.size(); i++) {
//            ArrayList<String> new_result = (ArrayList<String>) result.clone();
//            new_result.add(person.get(i));
//            ArrayList<String> new_person = new ArrayList<>(person.subList(i+1, person.size()));
//
//            combine(new_person, new_result, n);
//        }

    }

    public static void main(String[] args){
        //ArrayList<String> person = new ArrayList(Arrays.asList(new String[]{"1","2","3","4","5","6","7","8","9","10","11","12","13","14","15"}));
        ArrayList<String> person = new ArrayList(Arrays.asList(new String[]{"1","2","3","4","5"}));

        combine(person, new ArrayList<String>(), 3);
        System.out.println(CNT);
    }
}
