package com.roi.springboot.demo.repository;

  
import java.util.List;
 
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import com.roi.springboot.demo.domain.SecuityAccount;
import com.roi.springboot.demo.mapper.SecuityAccountMapper;
 

@Repository
public class SecurityAccountRepository {
	
	@Autowired
	SecuityAccountMapper accountMapper;
	
	
	public SecuityAccount save(SecuityAccount account,String role){
		accountMapper.insertUser(account);
		accountMapper.insertUserAutority(account.getId(), role);
		return account;
	}

	public SecuityAccount findById(String username) {
		// TODO Auto-generated method stub
		return accountMapper.readAccount(username);
	} 
	
	public List<String> findAuthoritiesByID(String username){
		return accountMapper.readAutorities(username);
	}
}