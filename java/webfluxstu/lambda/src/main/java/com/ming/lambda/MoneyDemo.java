package com.ming.lambda;

import java.text.DecimalFormat;
import java.util.function.Function;

public class MoneyDemo {
    private final int money;
    
    public MoneyDemo(int money){
        this.money = money;
    }
    
    public void printMoney(Function<Integer,String> moneyFormat){
        System.out.println("存款：" + moneyFormat.apply(money));
    }

    public static void main(String[] args){
        MoneyDemo mo = new MoneyDemo(10000000);

        Function<Integer,String> function = i -> new DecimalFormat("#,###").format(i);

        mo.printMoney(function);
        // 函数接口链式操作
        mo.printMoney(function.andThen(s -> "$" +s ));
    }
}
