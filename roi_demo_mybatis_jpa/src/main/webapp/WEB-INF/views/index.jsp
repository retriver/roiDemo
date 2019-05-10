<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Static content -->
<link rel="stylesheet" href="/resources/css/style.css">

<title>Spring Boot ROI TEST</title>
</head>
<body>
  <h1>Spring Boot roi -  jpa sample </h1>
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
          > http://localhost:8080/web/userDetail/1    * 없음  에러 공통처리 .( josn data )
  </pre>
</body>
</html>