 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Spring Boot ROI TEST</title>
<link rel="stylesheet" href="/resources/css/style.css">
</head>
<body>
  <h1>Spring Boot roi -  jpa sample Detail</h1>
  <hr> 
        <p>${user.userNm}</p>
        <p>${user.loginId}</p>
        <p>${user.pwd}</p>
        <p>${user.id}</p>
        <p>${user.regId}</p>
        <p>${user.regDt}</p>
        <p>${user.userComOutYn}</p>
        <p>${user.userDelYn}</p>
                 
 
  <pre>
     http://localhost:8080/
     http://localhost:8080/index     * 404 에러 
     
     http://localhost:8080/rest/tusers             *  json data 
     http://localhost:8080/rest/tusers/{Sys_ID}    *  json data 
          > http://localhost:8080/rest/tusers/3672 * 있음
          > http://localhost:8080/rest/tusers/1    * 없음
  
     http://localhost:8080/web/userList            *  jsp page  
     http://localhost:8080/web/userDetail/{Sys_ID} *  jsp page
          > http://localhost:8080/web/userDetail/3672 * 있음
          > http://localhost:8080/web/userDetail/1    * 없음
  </pre>     
</body>
</html>