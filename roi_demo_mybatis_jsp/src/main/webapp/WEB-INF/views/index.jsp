<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

<!-- Static content -->
<link rel="stylesheet" href="/resources/css/style.css">

<title><spring:message code="WEB.TITLE" text="default"/></title>
</head>
<body>
  <h1><spring:message code="WEB.TITLE" text="default"/></h1>
  <p/>   http://localhost:8080/index?lang=en
  <p/>   http://localhost:8080/index?lang=ko
  <p/>   http://localhost:8080/userList?lang=en
  <p/>   http://localhost:8080/userList?lang=ko
  <a href="<c:url value='/BBSList'/>">답변형 게시판</a>
</body>
</html>