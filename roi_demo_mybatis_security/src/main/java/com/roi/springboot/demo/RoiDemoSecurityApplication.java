package com.roi.springboot.demo;

import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

/*
 * simple security.
 *  JUnit Test 를 통한 계정 생성
 *  
 -- 1. 테스트를 위한 테이블 생성 
	CREATE TABLE mpms_20190225.dbo.TEST_BOOT_USER (    // Account 
		id  nvarchar(20) COLLATE Korean_Wansung_CI_AS NOT NULL,
		password nvarchar(500) COLLATE Korean_Wansung_CI_AS NOT NULL, 
		isAccountNonExpired char(1) COLLATE Korean_Wansung_CI_AS NOT NULL,
		isAccountNonLocked char(1) COLLATE Korean_Wansung_CI_AS NOT NULL,
		isCredentialsNonExpired char(1) COLLATE Korean_Wansung_CI_AS NULL,
		isEnabled char(1) COLLATE Korean_Wansung_CI_AS NULL
		CONSTRAINT PK_TEST_BOOT_USER PRIMARY KEY (id)
	) ; 
	
	
	CREATE TABLE mpms_20190225.dbo.TEST_BOOT_AUTHORITY (
		username  nvarchar(20) COLLATE Korean_Wansung_CI_AS NOT NULL,
		authority_name  nvarchar(20) COLLATE Korean_Wansung_CI_AS NOT NULL
	);
	
	-- 2. 테스트를 위한 계정 생성  (admin  / 1234 )
	     JUnit Test 실행
	     RoiDemoSecurityApplicationTests.java
	-- 3. 접속. 
		http://localhost:8080/
    -- 4. 로그인
           계정  : admin  / 1234    * 로그인 이후 정상 접속확인.
*/	     
	     

@SpringBootApplication
//@MapperScan("com.roi.springboot.demo.mapper") // mybatis mapper
public class RoiDemoSecurityApplication {

	public static void main(String[] args) {
		SpringApplication.run(RoiDemoSecurityApplication.class, args);
	}

}
