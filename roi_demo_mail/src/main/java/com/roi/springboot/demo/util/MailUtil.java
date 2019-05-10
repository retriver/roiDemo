package com.roi.springboot.demo.util;

 
import java.util.Properties;
  
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean; 
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.stereotype.Component;

@Component
public class MailUtil {
	
	Properties pt=new Properties();
	
    @Value("${MAIL.SMTP.PORT}")
    private int port;
    @Value("${MAIL.SMTP.SOCKETFACTORY.PORT}")
    private int socketPort;
    @Value("${MAIL.SMTP.AUTH}")
    private boolean auth;
    @Value("${MAIL.SMTP.STARTTLS.ENABLE}")
    private boolean starttls;
    @Value("${MAIL.SMTP.STARTTLS.REQUIRED}")
    private boolean startlls_required;
    @Value("${MAIL.SMTP.SOCKETFACTORY.FALLBACK}")
    private boolean fallback;


	 @Bean
	 public JavaMailSender javaMailService() {
	       JavaMailSenderImpl javaMailSender = new JavaMailSenderImpl();
	       javaMailSender.setHost("smtp.gmail.com");
	       javaMailSender.setUsername("retriver@gmail.com");
	       javaMailSender.setPassword("71011672sh!");
	       javaMailSender.setPort(port);
	        
	       pt.put("mail.smtp.socketFactory.port", socketPort); 
	       pt.put("mail.smtp.auth", auth);
	       pt.put("mail.smtp.starttls.enable", starttls); 
	       pt.put("mail.smtp.starttls.required", startlls_required);
	       pt.put("mail.smtp.socketFactory.fallback",fallback);
	       pt.put("mail.smtp.socketFactory.class", "javax.net.ssl.SSLSocketFactory");
	       javaMailSender.setJavaMailProperties(pt);       
	       javaMailSender.setDefaultEncoding("UTF-8");
	       return javaMailSender;
	 }
	    
}