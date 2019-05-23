package com.stu;

import com.stu.service.AnimalService;
import com.stu.service.impl.Person;
import com.stu.util.ProxyFactory;
import org.junit.Test;

public class ProxyTest {

    @Test
    public void test01() throws Exception {
        AnimalService animalService = ProxyFactory.Builder(Person.class);
        animalService.eat();
    }
}
