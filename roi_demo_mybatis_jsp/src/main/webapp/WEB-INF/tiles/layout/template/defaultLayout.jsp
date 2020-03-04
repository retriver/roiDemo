<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<tiles:insertAttribute name="common" /> <!-- 공통스크립트 -->
</head>
<tiles:insertAttribute name="body"/>	  <!--  body 는 body 로 시작.  -->
<tiles:insertAttribute name="footer"/>	
</body>
</html>