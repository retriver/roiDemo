package com.roi.springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

/*
 * JPA , Exception  TEST 
 * */
@SpringBootApplication
@EnableJpaAuditing // jpa
public class RoiDemoJpaApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoJpaApplication.class, args);
	}

}
