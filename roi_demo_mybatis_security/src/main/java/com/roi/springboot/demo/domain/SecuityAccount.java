package com.roi.springboot.demo.domain;

import java.util.Collection;

import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import lombok.Data;


@Data 
public class SecuityAccount implements UserDetails{
	
	private String id;
	private String password;	
	private boolean isAccountNonExpired; 	
	private boolean isAccountNonLocked;
	private boolean isCredentialsNonExpired; 
	private boolean isEnabled;
	
	private Collection <? extends GrantedAuthority> authorities;
	
	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		// TODO Auto-generated method stub
		return null;
	}
	@Override
	public String getUsername() {
		// TODO Auto-generated method stub
		return null;
	}
	

}
