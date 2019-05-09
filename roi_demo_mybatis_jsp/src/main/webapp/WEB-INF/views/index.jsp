<%@ page language="java" contentType="text/html; charset=EUC-KR" pageEncoding="EUC-KR"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<meta http-equiv="Content-Type" content="text/html; charset=EUC-KR">

<!-- Static content -->
<link rel="stylesheet" href="/resources/css/style.css">
<script type="text/javascript" src="/resources/js/app.js"></script>

<title><spring:message code="WEB.TITLE" text="default"/></title>
</head>
<body>
  <h1><spring:message code="WEB.TITLE" text="default"/></h1>
  <p/>   http://localhost:8080/index?lang=en
  <p/>   http://localhost:8080/index?lang=ko
  <p/>   http://localhost:8080/userList?lang=en
  <p/>   http://localhost:8080/userList?lang=ko  
</body>
</html>