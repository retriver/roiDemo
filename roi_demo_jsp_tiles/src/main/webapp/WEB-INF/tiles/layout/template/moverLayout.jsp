<%@ page language="java" contentType="text/html; charset=UTF-8"  pageEncoding="UTF-8"%>
<%@ taglib uri="http://tiles.apache.org/tags-tiles" prefix="tiles" %>
<!DOCTYPE html PUBLIC "-//W3C//DTD HTML 4.01 Transitional//EN" "http://www.w3.org/TR/html4/loose.dtd">
<html lang="ko">
<head>
<tiles:insertAttribute name="common" /> <!-- 공통스크립트 -->
<tiles:insertAttribute name="style" /> <!-- 페이지 그룹별 style, js -->
</head>
<body>
	<!--  line ALERT   START  -->
	<div class="alert alert-warning fade collapse" role="alert" id="myAlert">
	    <button type="button" class="close" data-dismiss="alert" aria-label="Close">
	        <span aria-hidden="true">X</span>
	        <span class="sr-only">Close</span>
	    </button>
	    <strong>ALERT</strong> myAlert Test.
	</div>
	<!-- line  ALERT   END  -->

	<tiles:insertAttribute name="navbarTop" />
	<div class="container-fluid" id="main">
	    <div class="row row-offcanvas row-offcanvas-left">
			<tiles:insertAttribute name="navbarLeft" />
	 		<tiles:insertAttribute name="body"/>	
		</div>
	</div>
	<tiles:insertAttribute name="footer"/>	
</body>
<tiles:insertAttribute name="common_script"/>
<tiles:insertAttribute name="script"/>

<!-- Modal   START -->
<div class="modal fade" id="myModal" tabindex="-1" role="dialog">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h4 class="modal-title" id="myModalLabel">Modal</h4>
                <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">X</span>
                    <span class="sr-only">Close</span>
                </button>
            </div>
            <div class="modal-body">
                <p>This is a dashboard layout for Bootstrap 4. This is an example of the Modal component which you can use to show content.
                Any content can be placed inside the modal and it can use the Bootstrap grid classes.</p>
                <p>
                    <a href="https://www.codeply.com/go/KrUO8QpyXP" target="_ext">Grab the code at Codeply</a>
                </p>
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary-outline" data-dismiss="modal">OK</button>
            </div>
        </div>
    </div>
</div>
<!-- Modal END -->

</html>