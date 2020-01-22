<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<script
  src="https://code.jquery.com/jquery-3.4.1.js"
  integrity="sha256-WpOohJOqMqqyKL9FccASB9O0KwACQJpFTUBLTYOVvVU="
  crossorigin="anonymous"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>Write</title>
</head>
<script>
$(function(){
	var isTitle = false;
	var isId = false;
	var isPwd = false;
	var isContent = false;
	$('#title').on('propertychange change keyup paste input',function(){
	    var currVal = $(this).val();
	    if(currVal.length==0){
	    	isTitle = false;
	    }
	    else{
	    	   isTitle = true;
	    }
	    if(isTitle && isId && isPwd && isContent){
            $('#submit').prop('disabled',false);
        }
	    else{
	    	$('#submit').attr('disabled',true);
	    }
	});
	$('#id').on('propertychange change keyup paste input',function(){
        var currVal = $(this).val();
        if(currVal.length==0){
        	isId = false;
        }
        else{
            isId = true;
        }
        if(isTitle && isId && isPwd && isContent){
            $('#submit').prop('disabled',false);
        }
        else{
            $('#submit').attr('disabled',true);
        }
    });
	$('#pwd').on('propertychange change keyup paste input',function(){
        var currVal = $(this).val();
        if(currVal.length==0){
        	isPwd = false;
        }
        else if(!$.isNumeric(currVal)){
        	isPwd = false;
        }
        else{
        	isPwd = true;
        }
        if(isTitle && isId && isPwd && isContent){
            $('#submit').prop('disabled',false);
        }
        else{
            $('#submit').attr('disabled',true);
        }
    });
	$('#content').on('propertychange change keyup paste input',function(){
        var currVal = $(this).val();
        if(currVal.length==0){
        	isContent = false;
        }
        else{
            isContent = true;
        }
        if(isContent && isTitle && isId && isPwd){
            $('#submit').prop('disabled',false);
        }
        else if(!isContent){
            $('#submit').attr('disabled',true);
        }
    });

});
</script>
<body>
    <div class="container">
        <!-- 점보트론(Jumbotron) -->
        <div class="jumbotron">
            <h1>답변형 게시판<small>등록 페이지</small></h1>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal" method="post" action="<c:url value='/insertBBS'/>">
                    <div class="form-group">
                        <label class="col-md-2 control-label">제&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;목</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" name="title" id="title" placeholder="제목을 입력하세요"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">작&nbsp;&nbsp;성&nbsp;&nbsp;자</label>
                        <div class="col-md-8">
                            <input type="text" class="form-control" name="id" id="id" placeholder="이름을 입력하세요"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">비밀번호</label>
                        <div class="col-md-8">
                            <input type="password" class="form-control" name="pwd" id="pwd" placeholder="비밀번호를 입력하세요(숫자만)"/>
                        </div>
                    </div>
                    <div class="form-group">
                        <label class="col-md-2 control-label">내&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;용</label>
                        <div class="col-md-8">
                            <textarea rows="10" name="content" id="content" class="form-control" placeholder="내용을 입력하세요"></textarea>
                        </div>
                    </div>
                    <div class="form-group">
                        <div class="col-md-offset-2 col-md-10">
                            <button type="submit" id="submit" class="btn btn-info" disabled="disabled">등록</button>
                        </div>
                    </div>
                </form>
            </div>
        </div><!-- row -->
    </div><!-- container -->
</body>
</html>