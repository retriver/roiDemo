package com.roi.springboot.demo.controller;

 
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.validation.Valid;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.http.ResponseEntity;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.roi.springboot.demo.domain.TuserDomain;
import com.roi.springboot.demo.exception.ResourceNotFoundException;
import com.roi.springboot.demo.repository.TuserRepository;
 
/*
 * http://wonwoo.ml/index.php/post/717    JPA 필드. 컬펌 매핑 
 * https://docs.spring.io/spring-data/jpa/docs/current/reference/html/    JPA - Reference 
 * http://appsdeveloperblog.com/how-to-use-like-expression-in-jpa-sql-query/
 */
@RestController
@RequestMapping("/rest")
public class DemoJpaRESTController {
	@Autowired
	private TuserRepository tuserRepository;

	@GetMapping("/tusers")
	@ResponseBody
	public List<TuserDomain> getAllTusers() {
		//return tuserRepository.findAll();
		List<TuserDomain> userList =  tuserRepository.findAll(Sort.by(Sort.Direction.DESC, "id"));
		return userList;
	}

	@GetMapping("/tusers/{id}")
	public ResponseEntity<TuserDomain> getTuserById(@PathVariable(value = "id") Integer tuserId)
			throws ResourceNotFoundException {

		System.out.println(" ::::::::::: getTuserById  " +tuserId );
		
		TuserDomain tuser = tuserRepository.findById(tuserId)
				.orElseThrow(() -> new ResourceNotFoundException("tuser not found for this id :: " + tuserId));

		System.out.println(" ::::::::::: getTuserById  " +tuserId );
		
		return ResponseEntity.ok().body(tuser);
	}

	@PostMapping("/tusers")
	public TuserDomain createTuser(@Valid @RequestBody TuserDomain tuser) {
		return tuserRepository.save(tuser);
	}

	@PutMapping("/tusers/{id}")
	public ResponseEntity<TuserDomain> updateTuser(@PathVariable(value = "id") Integer tuserId,
			@Valid @RequestBody TuserDomain tuserDetails) throws ResourceNotFoundException {
		TuserDomain tuser = tuserRepository.findById(tuserId)
				.orElseThrow(() -> new ResourceNotFoundException("tuser not found for this id :: " + tuserId));

		tuser.setId(tuserDetails.getId()); 
		tuser.setLoginId(tuserDetails.getLoginId());
		tuser.setPwd(tuserDetails.getPwd());
		tuser.setRegDt(tuserDetails.getRegDt());
		tuser.setRegId(tuserDetails.getRegId());
		tuser.setUserComOutYn(tuserDetails.getUserComOutYn());
		tuser.setUserDelYn(tuserDetails.getUserDelYn());
		tuser.setUserNm(tuserDetails.getUserNm());

		final TuserDomain updatedtuser = tuserRepository.save(tuser);
		return ResponseEntity.ok(updatedtuser);
	}

	@DeleteMapping("/tusers/{id}")
	public Map<String, Boolean> deleteTuser(@PathVariable(value = "id") Integer tuserId)
			throws ResourceNotFoundException {
		TuserDomain tuser = tuserRepository.findById(tuserId)
				.orElseThrow(() -> new ResourceNotFoundException("tuser not found for this id :: " + tuserId));

		tuserRepository.delete(tuser);
		Map<String, Boolean> response = new HashMap<>();
		response.put("deleted", Boolean.TRUE);
		return response;
	}
}

	
	
	