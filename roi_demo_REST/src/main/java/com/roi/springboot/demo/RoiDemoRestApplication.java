package com.roi.springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})  // datasource 없이 사용
public class RoiDemoRestApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoRestApplication.class, args);
	}

}
