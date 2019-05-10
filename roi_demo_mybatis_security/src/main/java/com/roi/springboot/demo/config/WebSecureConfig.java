package com.roi.springboot.demo.config;


import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity; 
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.crypto.factory.PasswordEncoderFactories;
import org.springframework.security.crypto.password.PasswordEncoder; 

@Configuration   
@EnableWebSecurity
public class WebSecureConfig extends WebSecurityConfigurerAdapter{	
	

	// 기본 생성 로그인 페이지 사용
	/*
	@Override
    protected void configure(HttpSecurity http) throws Exception {
    	
    }
	*/
	//  비번 암호화를 위해
	@Bean
	public PasswordEncoder passwordEncoder(){
		return PasswordEncoderFactories.createDelegatingPasswordEncoder();
	}
}