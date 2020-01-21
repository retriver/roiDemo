package com.roi.springboot.demo.controller;



import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;


@Controller
public class IndexController {

	private static final Logger logger  =  LoggerFactory.getLogger(IndexController.class);


	@RequestMapping(value="/", method=RequestMethod.GET)
	public String viewDashboard() {
		return "default/index";
	}

	@RequestMapping(value="/{pageId}", method=RequestMethod.GET)
	public String viewPage(@PathVariable(value = "pageId") String pageId) {
		logger.info(":::::::::::::::: pageId : "+pageId);
		return "default/"+pageId;
	}
}
