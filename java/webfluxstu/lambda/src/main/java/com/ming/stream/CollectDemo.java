package com.ming.stream;

import java.util.Arrays;
import java.util.IntSummaryStatistics;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

public class CollectDemo {

    public static void main(String[] args){
        // 测试数据
        List<Student> students = Arrays.asList(
                new Student("小明", 10, Gender.MALE, Grade.ONE),
                new Student("大明", 9, Gender.MALE, Grade.THREE),
                new Student("小白", 8, Gender.FEMALE, Grade.TWO),
                new Student("小黑", 13, Gender.FEMALE, Grade.FOUR),
                new Student("小红", 7, Gender.FEMALE, Grade.THREE),
                new Student("小黄", 13, Gender.MALE, Grade.ONE),
                new Student("小青", 13, Gender.FEMALE, Grade.THREE),
                new Student("小紫", 9, Gender.FEMALE, Grade.TWO),
                new Student("小王", 6, Gender.MALE, Grade.ONE),
                new Student("小李", 6, Gender.MALE, Grade.ONE),
                new Student("小马", 14, Gender.FEMALE, Grade.FOUR),
                new Student("小刘", 13, Gender.MALE, Grade.FOUR));

        //获得所有学生的年龄列表
        // s -> s.getAge() --> Student::getAge , 不会多生成一个类似 lambda$0这样的函数
        //List<Integer> list = students.stream().map(s -> s.getAge()).collect(Collectors.toList());
        List<Integer> list = students.stream().map(Student::getAge).collect(Collectors.toList());
        System.out.println(list);

        // 统计汇总信息
        IntSummaryStatistics intSummaryStatistics = students.stream().collect(Collectors.summarizingInt(Student::getAge));
        System.out.println(intSummaryStatistics);

        //分块
        Map<Boolean,List<Student>> genders = students.stream().collect(Collectors.partitioningBy(s -> s.getGender() == Gender.MALE));
        System.out.println("男女学生列表:" + genders);

        //分组
        Map<Grade,List<Student>> grade =
                students.stream().collect(Collectors.groupingBy(Student::getGrade));
        System.out.println("grade:" + grade);

        //得到所有班级学生的个数
        Map<Grade,Long> gradeLongMap =
                students.stream().collect(Collectors.groupingBy(Student::getGrade,Collectors.counting()));
        System.out.println("gradeLongMap:" + gradeLongMap);
    }

}


class Student {
    /**
     * 姓名
     */
    private String name;

    /**
     * 年龄
     */
    private int age;

    /**
     * 性别
     */
    private Gender gender;

    /**
     * 班级
     */
    private Grade grade;

    public Student(String name, int age, Gender gender, Grade grade) {
        super();
        this.name = name;
        this.age = age;
        this.gender = gender;
        this.grade = grade;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getAge() {
        return age;
    }

    public void setAge(int age) {
        this.age = age;
    }

    public Gender getGender() {
        return gender;
    }

    public void setGender(Gender gender) {
        this.gender = gender;
    }

    public Grade getGrade() {
        return grade;
    }

    public void setGrade(Grade grade) {
        this.grade = grade;
    }

    @Override
    public String toString() {
        return "[name=" + name + ", age=" + age + ", gender=" + gender
                + ", grade=" + grade + "]";
    }
}

/**
* 性别
*/
enum Gender {
    MALE, FEMALE
}

/**
 * 班级
 */
enum Grade {
    ONE, TWO, THREE, FOUR;
}
