package com.roi.springboot.demo.controller;

import javax.servlet.http.HttpServletRequest;
import javax.validation.Valid;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.roi.springboot.demo.repository.SecurityAccountRepository;

@Controller
public class LoginController {
	private static final Logger LOG = LoggerFactory.getLogger (LoginController.class);

	@Autowired
	SecurityAccountRepository accounts;
	
	
	@RequestMapping(value="/", method=RequestMethod.GET)
	public String index(){
		System.out.println("++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return "index";
	}

	
	/*
	@RequestMapping(value="/login", method=RequestMethod.GET)
	public String loginByGet(Model model,HttpServletRequest req){
		model.addAttribute("message",req.getServletContext());
		return "loginPage";
	}

	@GetMapping("/loginSuccess")
	@ResponseBody
	public String loginSuccess(HttpServletRequest req){
		//return accounts.getAccount().getType();
		return "loginSuccess";
		
	}
	*/


}
