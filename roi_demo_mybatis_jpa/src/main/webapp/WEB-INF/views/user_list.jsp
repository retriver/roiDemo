 <%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Spring Boot ROI TEST</title>
<link rel="stylesheet" href="/resources/css/style.css">
<style>

.scrolltbody {
    display: block;
    width: 1160px;
    border-collapse: collapse;
    border: 2px solid #000;
}
.scrolltbody th { border: 1px solid #000; background: pink; }
.scrolltbody td { border: 1px solid #000; border-top: 0; }
.scrolltbody tbody {
    display: block;
    height: 280px;
    overflow: auto;
}
.scrolltbody th:nth-of-type(1), .scrolltbody td:nth-of-type(1) { width: 60px; }
.scrolltbody th:nth-of-type(2), .scrolltbody td:nth-of-type(2) { width: 160px; }  
.scrolltbody th:nth-of-type(3), .scrolltbody td:nth-of-type(3) { width: 180px; }   
.scrolltbody th:nth-of-type(4), .scrolltbody td:nth-of-type(4) { width: 120px; }   
.scrolltbody th:nth-of-type(5), .scrolltbody td:nth-of-type(5) { width: 120px; }
.scrolltbody th:nth-of-type(6), .scrolltbody td:nth-of-type(6) { width: 100px; }     
.scrolltbody th:nth-of-type(7), .scrolltbody td:nth-of-type(7) { width: 180px; }
.scrolltbody th:nth-of-type(8), .scrolltbody td:nth-of-type(8) { width: 120px; }   
.scrolltbody th:last-child { width: 120px; } 
.scrolltbody td:last-child { width: calc( 120px - 19px );  }
</style>
</head>
<body>
  <h1>Spring Boot roi -  jpa sample </h1>
  <hr>
    <table class=scrolltbody>    
            <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>로그인아이디</th>
                    <th>비밀번호</th>
                    <th>시스템계정</th>
                    <th>등록자</th>
                    <th>등록일</th>
                    <th>userComOutYn</th>
                    <th>userDelYn</th>
                </tr>               
    
                    
            </thead>
            <tbody>
                <c:forEach var="user" items="${userList}" varStatus="status">
                    <tr>
                        <td>${status.count}</td>
                        <td>${user.userNm}</td>
                        <td>${user.loginId}</td>
                        <td>${user.pwd}</td>
                        <td>${user.id}</td>
                        <td>${user.regId}</td>
                        <td>${user.regDt}</td>
                        <td>${user.userComOutYn}</td>
                        <td>${user.userDelYn}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>        
        <P/>       
 <P/>  
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