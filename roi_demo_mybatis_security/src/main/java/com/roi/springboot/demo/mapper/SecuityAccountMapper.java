package com.roi.springboot.demo.mapper;


import java.util.List;

import org.apache.ibatis.annotations.Insert;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Param;
import org.apache.ibatis.annotations.Select;

import com.roi.springboot.demo.domain.SecuityAccount;
 
@Mapper
public interface SecuityAccountMapper {
	
	@Select("SELECT * FROM TEST_BOOT_USER WHERE id=#{id}")
	public SecuityAccount readAccount(String id);
	
	@Select("SELECT authority_name FROM TEST_BOOT_AUTHORITY WHERE username=#{id}")
	public List<String> readAutorities(String id);
	
	@Insert("INSERT INTO TEST_BOOT_USER VALUES(#{account.id},#{account.password},#{account.isAccountNonExpired},#{account.isAccountNonLocked},#{account.isCredentialsNonExpired},#{account.isEnabled})")
	public void insertUser(@Param("account") SecuityAccount account);
	
	@Insert("INSERT INTO TEST_BOOT_AUTHORITY VALUES(#{id},#{autority})")
	public void insertUserAutority(@Param("id") String id,@Param("autority")String autority);
	
	@Select("SELECT * FROM TEST_BOOT_USER")
	public List readAllUsers();
}