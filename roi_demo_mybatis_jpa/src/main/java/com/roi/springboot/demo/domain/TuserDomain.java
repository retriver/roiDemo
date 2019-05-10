package com.roi.springboot.demo.domain;


import java.time.LocalDateTime;
import java.util.Date;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;
import javax.persistence.Temporal;
import javax.persistence.TemporalType;
import javax.persistence.UniqueConstraint;

import org.hibernate.annotations.UpdateTimestamp;

import lombok.Data;
import lombok.ToString;


@Entity
@Data          // lombok  //@Getter //@Setter
@ToString      // lombok
//@NoArgsConstructor    //@AllArgsConstructor   // lombok
@Table(name="T_USER")
/*
@Table(
		name="T_USER",
		uniqueConstraints={
			@UniqueConstraint(
				columnNames={"Sys_ID","User_Login_ID"}
			)
		}
	)
*/
public class TuserDomain {
      
	@Id  // pk
	//@GeneratedValue  // auto-increment 
	@GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name="Sys_ID",nullable=false) 
	private int id;
	 
	@Column(name="User_Login_ID",nullable=false)
	private String loginId;
	
	@Column(name="User_PW",nullable=false)
	private String pwd;
	
	@Column(name="User_Nm",nullable=false)
	private String userNm;	

	// Camel Case 형식의 컬럼인 경우 구분자 없을 때 소문자로 변환..  camelCase 인 경우 대문자를 기준으로 '_' add
	// User_ComOut_Yn  ..음..이런 형식의 컬럼이 많으려나..??
	@Column(name="User_Comout_Yn",nullable=false)
	private String userComOutYn; 	

	@Column(name="User_Del_Yn",nullable=false)
	private String userDelYn;	

	@Column(name="Reg_ID",nullable=false)
	private int regId;

	/*
	@Column(name="Reg_Dt",nullable=false) 
    @Temporal(TemporalType.TIMESTAMP)
	private Date regDt;
	*/	 

	@Column(name="Reg_Dt",nullable=false) 
    @UpdateTimestamp
    private LocalDateTime regDt;
	
}
