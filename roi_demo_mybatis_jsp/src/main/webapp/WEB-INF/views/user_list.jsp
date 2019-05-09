 <%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">
<title>Spring Boot ROI TEST</title>
<link rel="stylesheet" href="/resources/css/style.css">
<style>

.scrolltbody {
    display: block;
    width: 830px;
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
.scrolltbody th:nth-of-type(2), .scrolltbody td:nth-of-type(2) { width: 120px; } 
.scrolltbody th:nth-of-type(3), .scrolltbody td:nth-of-type(3) { width: 400px; } 
.scrolltbody th:nth-of-type(4), .scrolltbody td:nth-of-type(4) { width: 160px; } 
.scrolltbody th:last-child { width: 90px; } 
.scrolltbody td:last-child { width: calc( 90px - 19px );  }
</style>
</head>
<body>
  <h1>Spring Boot roi - MVC web sample </h1>
  <hr>
    <table class=scrolltbody>    
            <thead>
                <tr>
                    <th>No</th>
                    <th>이름</th>
                    <th>부서</th>
                    <th>로그인아이디</th>
                    <th>시스템계정</th>
                </tr>
            </thead>
            <tbody>
                <c:forEach var="user" items="${userList}" varStatus="status">
                    <tr>
                        <td>${status.count}</td>
                        <td>${user.User_Nm}</td>
                        <td>${user.User_Part_nm}</td>
                        <td>${user.User_Login_ID}</td>
                        <td>${user.Sys_ID}</td>
                    </tr>
                </c:forEach>
            </tbody>
        </table>        
        <P/>       
 <c:out value="${companyName}"/>( <c:out value="${companyNumber}"/>   /  <c:out value="${companyEmail}"/>)
 <P/>
  <h1><spring:message code="languafe.type" text="default"/></h1>  
  <p/>   http://localhost:8080/index?lang=en
  <p/>   http://localhost:8080/index?lang=ko
  <p/>   http://localhost:8080/userList?lang=en
  <p/>   http://localhost:8080/userList?lang=ko        
</body>
</html>