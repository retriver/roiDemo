package com.roi.springboot.demo;


import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertNotNull;

import javax.persistence.TemporalType;

import org.hibernate.annotations.UpdateTimestamp;
import org.junit.Test;
import org.junit.runner.RunWith;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.boot.test.web.client.TestRestTemplate;
import org.springframework.boot.web.server.LocalServerPort;
import org.springframework.data.jpa.repository.Temporal;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.test.context.junit4.SpringRunner;
import org.springframework.web.client.HttpClientErrorException;

import com.roi.springboot.demo.domain.TuserDomain;
 
 

@RunWith(SpringRunner.class)
@SpringBootTest(classes = RoiDemoJpaApplication.class, webEnvironment = SpringBootTest.WebEnvironment.RANDOM_PORT)
public class JpaSimpleTest {
	@Autowired
	private TestRestTemplate restTemplate;

	@LocalServerPort
	private int port;

	private String getRootUrl() {
		System.out.println("getRootUrl   port : "+port);
		return "http://localhost:" + port+"/rest";
	}

	@Test
	public void contextLoads() {

	}

	// all list 
	@Test
	public void testGetAlltusers() {
		HttpHeaders headers = new HttpHeaders();
		HttpEntity<String> entity = new HttpEntity<String>(null, headers);

		ResponseEntity<String> response = restTemplate.exchange(getRootUrl() + "/tusers",
				HttpMethod.GET, entity, String.class);			

		System.out.println(" :::::::::::::::: testGetAlltusers  = "+ response.getBody() );
		
		assertNotNull(response.getBody());
		System.out.println(" :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ");
	}

	// detail  
	//@Test
	public void testGettuserById() {
		TuserDomain tuser = restTemplate.getForObject(getRootUrl() + "/tusers/59", TuserDomain.class);
		System.out.println(" :::::::::::::::: testGettuserById  = "+ tuser.getLoginId() );
		System.out.println(" :::::::::::::::: testGettuserById  = "+ tuser.toString() );
		assertNotNull(tuser);
		System.out.println(" :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ");
	}
 
	
	// insert   
	//@Test
	public void testCreateTuser() {
		TuserDomain tuser = new TuserDomain();
		
		//tuser.setId(tuserDetails.getId()); 
		tuser.setLoginId("retriver22");
		tuser.setPwd("retriver22");
		//tuser.setRegDt( Date);  //  entity @UpdateTimestamp 추가 
		tuser.setRegId(59);   //  Admin sysid
		tuser.setUserComOutYn("Y");
		tuser.setUserDelYn("Y");
		tuser.setUserNm("retriver22");
		System.out.println(" :::::::::::::::: testCreatetuser  = "+ tuser.toString() );

		ResponseEntity<TuserDomain> postResponse = restTemplate.postForEntity(getRootUrl() + "/tusers", tuser, TuserDomain.class);
		assertNotNull(postResponse);
		System.out.println(" :::::::::::::::: testCreateTuser postResponse  = "+ postResponse);
		assertNotNull(postResponse.getBody());
		System.out.println(" :::::::::::::::: testCreateTuser postResponse  = "+ postResponse.getBody());
		System.out.println(" :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ");
	}
	
	// update
	//@Test
	public void testUpdateTuser() {
		int id = 3687;  // sys_id 
		TuserDomain tuser = restTemplate.getForObject(getRootUrl() + "/tusers/" + id, TuserDomain.class);
		System.out.println(" :::::::::::::::: testUpdateTuser postResponse  = "+ tuser);
		tuser.setLoginId("retriver33");
		tuser.setPwd("retriver33_pwd");

		restTemplate.put(getRootUrl() + "/tusers/" + id, tuser);

		TuserDomain updatedtuser = restTemplate.getForObject(getRootUrl() + "/tusers/" + id, TuserDomain.class);
		System.out.println(" :::::::::::::::: testUpdateTuser postResponse  = "+ updatedtuser);
		assertNotNull(updatedtuser);
		System.out.println(" :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ");
	}

	// delete 
	//@Test
	public void testDeleteTuser() {
		int id = 3687; // sys_id 
		TuserDomain tuser = restTemplate.getForObject(getRootUrl() + "/tusers/" + id, TuserDomain.class);
		assertNotNull(tuser);
		System.out.println(" :::::::::::::::: testDeleteTuser tuser  = "+ tuser);

		restTemplate.delete(getRootUrl() + "/tusers/" + id);

		try {
			tuser = restTemplate.getForObject(getRootUrl() + "/tusers/" + id, TuserDomain.class);
			System.out.println(" :::::::::::::::: testDeletetuser tuser  = "+ tuser);
		} catch (final HttpClientErrorException e) {
			assertEquals(e.getStatusCode(), HttpStatus.NOT_FOUND);
		}
		System.out.println(" :::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::::: ");
	}
}
