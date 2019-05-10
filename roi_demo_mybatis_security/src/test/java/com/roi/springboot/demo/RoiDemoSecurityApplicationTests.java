package com.roi.springboot.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.test.context.junit4.SpringRunner;

import com.roi.springboot.demo.domain.SecuityAccount;
import com.roi.springboot.demo.service.SecuityAccountService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoiDemoSecurityApplicationTests {


	@Autowired
	SecuityAccountService accountService;
	
	@Test
	public void contextLoads() {
	}
	
	// SECURITY TEST
	@Test
	public void  AccountCreate(){
		SecuityAccount account=new SecuityAccount();
		account.setId("admin");
		account.setPassword("1234");
		accountService.save(account, "ROLE_ADMIN"); 
	}


}
