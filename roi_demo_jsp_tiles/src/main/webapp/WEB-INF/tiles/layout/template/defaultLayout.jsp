<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<tiles:insertAttribute name="common" /> <!-- 공통스크립트 -->
<tiles:insertAttribute name="style" /> <!-- 페이지 그룹별 style, js -->
</head>
<tiles:insertAttribute name="body"/>	  <!--  body 는 body 로 시작.  -->
<tiles:insertAttribute name="footer"/>	
</body>
<tiles:insertAttribute name="common_script"/>
<tiles:insertAttribute name="script"/>
</html>