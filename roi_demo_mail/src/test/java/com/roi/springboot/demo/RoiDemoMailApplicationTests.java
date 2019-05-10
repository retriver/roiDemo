package com.roi.springboot.demo;

import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.test.context.junit4.SpringRunner;

import com.roi.springboot.demo.service.EmailService;


@RunWith(SpringRunner.class)
@SpringBootTest
public class RoiDemoMailApplicationTests {

	@Autowired
	JavaMailSender javaMailSender;
	
	@Test
	public void contextLoads() {
	}

	// MAIL SEND TEST 
	@Test
	public void sendMail() {
		
		EmailService mailService = new EmailService();
		mailService.setJavaMailSender(javaMailSender);
		
		System.out.println(":::::::::::::::::::::::::::::::::::::::::::: sendSimpleMessage   .txt start");
		mailService.sendSimpleMessage("김성호<retriver@gmail.com>","메일제목 111" , "그런데 말입니다. <br> <strong>메일발송</strong>을 하다보면  말입니다.");	
		System.out.println("::::::::::::::::::::::::::::::::::::::::::::  sendSimpleMessage  .txt Complete");	
		
		System.out.println("::::::::::::::::::::::::::::::::::::::::::::  sendHtmlEmail  .html start");		
		mailService.sendHtmlEmail("김성호<retriver@gmail.com>","메일제목2222 " , "그런데 말입니다. <br> <strong>메일발송</strong>을 하다보면  말입니다.");	
		System.out.println("::::::::::::::::::::::::::::::::::::::::::::  sendHtmlEmail  .html Complete");		 
		
	}
}
