package com.roi.springboot.demo.controller;

import java.util.List;
import java.util.Map;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import com.roi.springboot.demo.mapper.UserMapper;


@Controller
public class DemoSQLController {
	private static final Logger LOG = LoggerFactory.getLogger ( DemoSQLController.class );


	@Value("${company.name}")
	private String companyName;

	@Value("${company.email}")
	private String companyEmail;    

	@Value("${company.number}")
	private String companyNumber; 

	@RequestMapping("/index")
	public String index() {
		return "index";
	}  

	@Autowired 
	UserMapper userMapper;
	
	@SuppressWarnings("rawtypes")
	@RequestMapping("/listJson")
	@ResponseBody
	public String userList( ) {
		List<Map<String, Object>> ret = userMapper.readUserList();
		return ((List) ret).toString(); 
	} 

	@RequestMapping("/userList")
	public String userList(Model model) {
		model.addAttribute("userList", userMapper.readUserList());
	 
		model.addAttribute("companyName", companyName);
		model.addAttribute("companyEmail", companyEmail);
		model.addAttribute("companyNumber", companyNumber);
	 
		return "user_list";
	} 


}