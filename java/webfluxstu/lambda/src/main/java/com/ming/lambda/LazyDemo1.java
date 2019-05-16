package com.ming.lambda;

import java.util.function.Supplier;

public class LazyDemo1 {
    public static void main(String[] args){
        Log log = new Log();
        log.debug(() -> "print");
    }
}

class Log{

    public boolean isDebug(){
        return true;
    }

    public void debug(String str){
        if (isDebug()){
            System.out.println(str);
        }
    }

    public void debug(Supplier<String> supplier){
        if (isDebug()) {
            // 真正要打印的时候，才调用
            System.out.println(supplier.get());
        } 
    }
    
}