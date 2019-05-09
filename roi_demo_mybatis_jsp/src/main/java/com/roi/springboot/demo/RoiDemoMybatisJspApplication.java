package com.roi.springboot.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.PropertySource;

import com.roi.springboot.demo.config.YamlPropertySourceFactory;
 

@SpringBootApplication
@MapperScan("com.roi.springboot.demo.mapper") // mybatis mapper
@PropertySource(factory=YamlPropertySourceFactory.class, value="classpath:global.yml",ignoreResourceNotFound = true)  
public class RoiDemoMybatisJspApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoMybatisJspApplication.class, args);
	}

}
