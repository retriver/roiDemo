package com.roi.springboot.demo.service;

import javax.mail.Message.RecipientType;
import javax.mail.MessagingException;
import javax.mail.internet.InternetAddress;
import javax.mail.internet.MimeMessage;

import org.springframework.mail.MailException;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;

public class EmailService {

	JavaMailSender emailSender;
	
	public void setJavaMailSender(JavaMailSender javaMailSender){
		this.emailSender=javaMailSender;
	}
    public void sendSimpleMessage(String to, String subject, String text) {

        SimpleMailMessage message = new SimpleMailMessage();
        message.setTo(to);//보낼 대상
        message.setSubject(subject);//제목
        message.setText(text);;//내용
        try{//예외처리
        	emailSender.send(message);
        }catch(MailException es){
        	es.printStackTrace();
        }
    } 
    public void sendHtmlEmail(String to, String subject, String text) {
      MimeMessage message = emailSender.createMimeMessage();
      try {
        message.setSubject(subject, "UTF-8");
        message.setText(text, "UTF-8", "html");
        message.setFrom(new InternetAddress(to));
        message.addRecipient(RecipientType.TO, new InternetAddress(to));
        emailSender.send(message);
      } catch (MessagingException e) {
        e.printStackTrace();
        return;
      } catch (MailException e) {
        e.printStackTrace();
        return;
      } // try - catch
    }
  
}