package com.roi.springboot.demo.controller;

 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;

import com.roi.springboot.demo.domain.TuserDomain;
import com.roi.springboot.demo.exception.ResourceNotFoundException;
import com.roi.springboot.demo.repository.TuserRepository;
 
/*
 * http://wonwoo.ml/index.php/post/717    JPA 필드. 컬펌 매핑 
 * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/    JPA - Reference 
 * http://appsdeveloperblog.com/how-to-use-like-expression-in-jpa-sql-query/
 */
@Controller
@RequestMapping("/web")
public class DemoJpaWebController {
	@Autowired
	private TuserRepository tuserRepository;
 
	@GetMapping("/userList")
	public String getAllTusers(Model model) {
		//return tuserRepository.findAll();
		List<TuserDomain> userList =  tuserRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		
		model.addAttribute("userList", userList);
	 
		return "user_list";
	}	

	@GetMapping("/userDetail/{id}")
	public String getTuserById(@PathVariable(value = "id") Integer tuserId,Model model)
			throws ResourceNotFoundException {

		System.out.println(" ::::::::::: getTuserById  " +tuserId );
		
		TuserDomain userDetail = tuserRepository.findById(tuserId)
				.orElseThrow(() -> new ResourceNotFoundException("not found for this id : " + tuserId));


		model.addAttribute("user", userDetail);
		
		return "user_detail";
	}

}

	
	
	