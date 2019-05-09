package com.roi.springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.scheduling.annotation.EnableScheduling;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})  // datasource 없이 사용
@EnableScheduling   //001-batch 
//@EnableBatchProcessing   //001-batch 
public class RoiDemoBatchApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoBatchApplication.class, args);
	}

}
