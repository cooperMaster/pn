package com.hym.knights.config;


import com.hym.knights.BraveKnight;
import com.hym.knights.Knight;
import com.hym.knights.Quest;
import com.hym.knights.SlayDragonQuest;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class KnightConfig {

  @Bean
  public Knight knight() {
    return new BraveKnight(quest());
  }
  
  @Bean
  public Quest quest() {
    return new SlayDragonQuest(System.out);
  }

}
