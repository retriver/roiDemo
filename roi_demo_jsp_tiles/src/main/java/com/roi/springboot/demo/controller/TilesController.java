package com.roi.springboot.demo.controller;


import javax.servlet.http.HttpServletRequest;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.servlet.ModelAndView;
 
 

@Controller
@RequestMapping(value="/tiles")
public class TilesController {

	private static final Logger logger  =  LoggerFactory.getLogger(TilesController.class);

	 
	@RequestMapping(value="/dashboard", method=RequestMethod.GET)
	public String viewDashboard(HttpServletRequest req) {
		logger.debug(":::: viewDashboard String ");
		return "mover/dashboard";
	}
 
	@RequestMapping("/dashboardMv")
	public ModelAndView onCartList(HttpServletRequest req) throws Exception {
		logger.debug(":::: viewDashboard ModelAndView ");
		ModelAndView mv = new ModelAndView();
		mv.addObject("modal", "Y");
		mv.setViewName("mover/dashboard");
		return mv;
	}
 
	@RequestMapping(value="/card", method=RequestMethod.GET)
	public String viewCard(HttpServletRequest req) {
		logger.debug(":::: card String ");
		return "mover/card";
	}
 
	@RequestMapping(value="/palceholder", method=RequestMethod.GET)
	public String viewPalceholder(HttpServletRequest req) {
		logger.debug(":::: viewPalceholder String ");
		return "mover/palceholder";
	}
 
	@RequestMapping(value="/table", method=RequestMethod.GET)
	public String viewTable(HttpServletRequest req) {
		logger.debug(":::: viewPalceholder String ");
		return "mover/table";
	}
 
	@RequestMapping(value="/tab", method=RequestMethod.GET)
	public String viewTab(HttpServletRequest req) {
		logger.debug(":::: viewPalceholder String ");
		return "mover/tab";
	}
}
