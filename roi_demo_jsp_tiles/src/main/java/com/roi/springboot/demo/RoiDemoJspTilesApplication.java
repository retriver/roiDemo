package com.roi.springboot.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.EnableAutoConfiguration;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.boot.autoconfigure.jdbc.DataSourceAutoConfiguration;
import org.springframework.context.annotation.PropertySource;

import com.roi.springboot.demo.config.YamlPropertySourceFactory;

@SpringBootApplication
@EnableAutoConfiguration(exclude={DataSourceAutoConfiguration.class})  // datasource 미사용
@PropertySource(factory=YamlPropertySourceFactory.class, value="classpath:global.yml",ignoreResourceNotFound = true)  
public class RoiDemoJspTilesApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoJspTilesApplication.class, args);
	}

}
