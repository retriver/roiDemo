<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>

<script>
$(function(){
    var pTitle = $('#title').val();
    var pId = $('#id').val();
    var pPwd = $('#pwd').val();
    var pContent = $('#content').val();
    var currTitle = '';
    var currId = '';
    var currPwd = '';
    var currContent = $('#content').val();
    //실시간 값 변경 감지, 값 복사 붙여넣기 감지, F12 개발자 모드에서 값 변경 감지
    $('#title').on('propertychange change keyup paste input',function(){
        currTitle = $(this).val();
        isValidate(currTitle,currId,currPwd,currContent);
    });
    $('#id').on('propertychange change keyup paste input',function(){
        currId = $(this).val();
        isValidate(currTitle,currId,currPwd,currContent);
    });
    $('#pwd').on('propertychange change keyup paste input',function(){
        currPwd = $(this).val();
        isValidate(currTitle,currId,currPwd,currContent);
    });
    $('#content').on('propertychange change keyup paste input',function(){
        currContent = $(this).val();
        isValidate(currTitle,currId,currPwd,currContent);
    });
    function isValidate(currTitle,currId,currPwd,currContent){
        if(currTitle == pTitle || currId == pId || currPwd == pPwd || currContent.length == pContent.length) $('#submit').attr('disabled',true);
        else $('#submit').attr('disabled',false);
    }
});
</script>
<body>
<div class="container">
        <!-- 점보트론(Jumbotron) -->
        <div class="jumbotron">
            <h1>답변형 게시판<small>답변 페이지</small></h1>
        </div>
        <div class="row">
            <div class="col-md-12">
                <form class="form-horizontal" method="post" action="<c:url value='/jnsReply'/>">
                <!-- 원본들의 refer,step,depth설정 -->
                <input type="hidden" name="refer" value="${record.refer }"/>
                <input type="hidden" name="step" value="${record.step }"/>
                <input type="hidden" name="depth" value="${record.depth }"/>
                <!-- 답변 작성 실패시 다시 현재 페이지로 오기위한 no값 설정 -->
                <input type="hidden" name="no" value="${record.no }"/>
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
                            <textarea rows="10" name="content" id="content" class="form-control" placeholder="내용을 입력하세요">

==================${record.id }님이 작성한 글==================
${record.content}

                            </textarea>
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
