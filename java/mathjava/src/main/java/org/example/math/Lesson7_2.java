package org.example.math;

import java.util.ArrayList;
import java.util.Arrays;
import java.util.HashMap;

public class Lesson7_2 {
    // 设置齐王的马跑完所需时间
    public static HashMap<String, Double> q_horses_time = new HashMap<String, Double>(){
        {
            put("q1", 1.0);
            put("q2", 2.0);
            put("q3", 3.0);
        }
    };

    // 设置田忌的马跑完所需时间
    public static HashMap<String, Double> t_horses_time = new HashMap<String, Double>(){
        {
            put("t1", 1.5);
            put("t2", 2.5);
            put("t3", 3.5);
        }
    };

    // 存储满足排列后的马的数据
    private ArrayList<ArrayList> total_result = new ArrayList<>();

    public ArrayList<ArrayList> getTotal_result() {
        return total_result;
    }

    public  void permutate(ArrayList<String> horses, ArrayList<String> result){

        if (horses.size() == 0) {
            total_result.add(result);
            return;
        }

        for (String horse : horses) {
            ArrayList<String> new_result = (ArrayList<String>) result.clone();
            new_result.add(horse);

            ArrayList<String> reset_horse = (ArrayList<String>) horses.clone();
            reset_horse.remove(horse);

            permutate(reset_horse, new_result);
        }
    }

    public static void compare(ArrayList<String> t, ArrayList<String> q) {
        int t_won_cnt = 0;
        for (int i = 0; i < t.size(); i++) {
            System.out.println(t_horses_time.get(t.get(i)) + " " +  q_horses_time.get(q.get(i)));
            if (t_horses_time.get(t.get(i)) < q_horses_time.get(q.get(i))) { t_won_cnt++; }
        }

        if (t_won_cnt > (t.size() / 2)) {System.out.println("田忌获胜！");}
        else {System.out.println("齐王获胜！");}

        System.out.println();
    }
    
    public static void main(String[] args){
        Lesson7_2 l = new Lesson7_2();
        ArrayList<String> t_horses = new ArrayList<String>(Arrays.asList("t1", "t2", "t3"));
        l.permutate(t_horses,new ArrayList<>());
        ArrayList<ArrayList> t_results = l.getTotal_result();

        Lesson7_2 l2 = new Lesson7_2();
        ArrayList<String> q_horses = new ArrayList<String>(Arrays.asList("q1", "q2", "q3"));
        l2.permutate(q_horses,new ArrayList<>());
        ArrayList<ArrayList> q_results = l2.getTotal_result();

        for (int i = 0; i < t_results.size(); i++) {
            for (int j = 0; j < q_results.size(); j++) {
                compare(t_results.get(i), q_results.get(j));
            }
        }
    }
}
