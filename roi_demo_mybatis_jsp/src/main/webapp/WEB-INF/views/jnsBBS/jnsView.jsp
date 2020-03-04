<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<script>
$(function(){
	 var commentStr ='<table class="table table-bordered">';
	 var no = ${record.no};
	 //console.log('no',no)
	 $.ajax({
         type:"GET",
         url:"/jnsFirstComment",
         dataType:"text",
         data:{no:no},
         success:function(data){
             //console.log('왔다',data);
             var jObj2 = JSON.parse(data);
             //console.log('jObj2',jObj2);
             $.each(jObj2,function(index,item){
            	 //console.log('12312312312312312')
                 commentStr +='<tr><td title="'+index+'" class="col-md-11"><span style="font-size:large; font-weight: bold;">'+item.id+'</span> '+item.postdate+' </br>'+item.comment+'</td><td><input class="cPwd" type="password" placeholder="비밀번호" id="'+index+'"/></br><a onclick="delOrUp(1,'+item.cno+','+index+')" title="'+index+'">삭제 </a><a onclick="delOrUp(2,'+item.cno+','+index+')" title="'+index+'"> 수정</a></td></tr>';
             });
             commentStr+='</table>';
             //console.log('commentStr',commentStr);
             $('#appendComment').html(commentStr);
         },
         error:function(error){
             console.log("에러",error);
         }
     });

	 //validation 코드 함축 가능하게 만들어야 함.
     var pComment = $('#comment').val();
     var currTitle = '';
     var currId = '';
     var currPwd = '';
     var currComment = $('#comment').val();
     //실시간 값 변경 감지, 값 복사 붙여넣기 감지, F12 개발자 모드에서 값 변경 감지
     $('#cid').on('propertychange change keyup paste input',function(){
         currId = $(this).val();
         isValidate(currId,currPwd,currComment);
     });
     $('#cpwd').on('propertychange change keyup paste input',function(){
         currPwd = $(this).val();
         isValidate(currId,currPwd,currComment);
     });
     $('#comment').on('propertychange change keyup paste input',function(){
    	 currComment = $(this).val();
         isValidate(currId,currPwd,currComment);
     });
     function isValidate(currId,currPwd,currComment){
         if(currId.length != 0 && currPwd.length != 0 && currComment != pComment) $('#submit').attr('disabled',false);
         else $('#submit').attr('disabled',true);
     }
});
</script>
<body>
    <div class="container">
        <!-- 점보트론(Jumbotron) -->
        <div class="jumbotron">
            <h1>답변형 게시판<small>상세보기 페이지</small></h1>
        </div>
        <div class="row">
            <div class="col-md-offset-2 col-md-8">
                <table class="table table-bordered table-striped">
                    <tr>
                        <th class="col-md-4 text-center">번호</th>
                        <td>${record.no}</td>
                    </tr>
                    <tr>
                        <th class="text-center">제목</th>
                        <td>${record.title}</td>
                    </tr>
                    <tr>
                        <th class="text-center">작성자</th>
                        <td>${record.id}</td>
                    </tr>
                    <tr>
                        <th class="text-center">등록일</th>
                        <td>${record.postdate}</td>
                    </tr>
                    <tr>
                        <th class="text-center" colspan="2">내용</th>
                    </tr>
                    <tr>
                        <td colspan="2">${record.content}</td>
                    </tr>
                </table>
            </div>
        </div><!-- row -->
        <div class="row">
            <div class="col-md-offset-2 col-md-8">
                <!-- .center-block 사용시 해당 블락의 크기를 지정하자 -->
                <ul id="pillMenu" class="nav nav-pills center-block" style="width:280px">
                    <li><a class="btn btn-success" href="javascript:fnMovePage()">답변</a></li>

                    <li><a type="button" class="btn btn-success" data-toggle="modal" data-target="#editModal">수정</a></li>
                    <!-- 삭제 취소시에는 모달창이 뜨지 않도록 data-toggle="modal" 제거 그리고 자스로 제어해서 모달창을 띄운다(삭제 확인버튼 클릭시에만) -->
                    <li><a type="button" class="btn btn-success" data-toggle="modal" data-target="#deleteModal" >삭제</a></li>

                    <li><a class="btn btn-success" href="<c:url value='/jnsBBSList?nowPage=${param.nowPage}'/>">목록</a></li>
                </ul>
            </div>
        </div><!-- row -->
        <div class="row" style="margin-top: 30px">
            <div class="col-md-offset-2 col-md-8">
                    <p><h3><댓글></h3></p>
                    <form class="form-horizontal commentForm" method="post" action="<c:url value='/jnsComment'/>">
                        <input type="hidden" value="${record.no }" name="no"/>
                        <div class="col-md-12">
                            <input class="col-md-5" type="text" id="cid" name="id" placeholder="이름을 입력하세요" style="height: 35px"/>
                            <input class="col-md-5" type="password" id="cpwd" name="pwd" placeholder="비밀번호를 입력하세요(숫자만)" style="height: 35px; margin-left: 2px"/>
                        </div>
                        <div class="col-md-12" style="margin-top:15px">
                            <input class="col-md-10" type="text" id="comment" name="comment" placeholder="댓글을 입력하세요" style="height: 35px; width: 602px"/>
                            <input type="button" title="" value="입력" class="btn btn-primary col-md-1 comment" id="submit" style="margin-left: 15px" disabled="disabled"/>
                        </div>
                     </form>
                     <div id="appendComment" style="margin-top: 110px">
                    </div>
            </div>
        </div><!-- row -->
    </div><!-- container -->
    <script>
    //댓글입력
    $('.comment').click(function(){
    	var commentStr ='<table class="table table-bordered">';
    	var title = $('#submit').prop('title');
        var commentData = $('.commentForm').serialize();
        commentData += '&cno='+title;
        var commentMethodType = '';
        if(title.length == 0 ) commentMethodType = 'POST';
        else commentMethodType = 'PUT'
        $.ajax({
            type:commentMethodType,
            url:"/jnsComment",
            dataType:"text",
            data:commentData,
            success:function(data){
                //console.log('왔다',data);
                var jObj = JSON.parse(data);
                //console.log('jObj',jObj);
                $.each(jObj,function(index,item){
                	commentStr +='<tr><td title="'+index+'" class="col-md-11"><span style="font-size:large; font-weight: bold;">'+item.id+'</span> '+item.postdate+' </br>'+item.comment+'</td><td><input class="cPwd" type="password" placeholder="비밀번호" id="'+index+'"/></br><a onclick="delOrUp(1,'+item.cno+','+index+')" title="'+index+'">삭제 </a><a onclick="delOrUp(2,'+item.cno+','+index+')" title="'+index+'"> 수정</a></td></tr>';
                });
                //console.log('commentStr',commentStr);
                $('#appendComment').html(commentStr);
                $('#cid').val('');
                $('#cpwd').val('');
                $('#comment').val('');
                $('#submit').prop('title','');
                $('#submit').prop('disabled',true);
            },
            error:function(error){
                console.log("에러",error);
            }
        });
    });
    </script>
    <!-- 수정 모달 -->
    <div id="editModal" class="modal fade" role="dialog">
      <c:if test=""></c:if>
	  <div class="modal-dialog modal-sm">
	    <!-- Modal content-->
	    <div class="modal-content">
	      <div class="modal-header">
	        <button type="button" class="close" data-dismiss="modal">&times;</button>
	        <h4 class="modal-title">본인 확인</h4>
	      </div>
	      <div class="modal-body">

	        <div class="row">
	            <div class="col-md-12">
                    <form class="form-horizontal" method="post" action="<c:url value='/jnsToEdit'/>">
                        <input id="cno2" type="hidden" name="no" value="${record.no }"/>
                        <input type="hidden" name="nowPage" value="${param.nowPage }"/>
	                    <div class="form-group">
	                        <label class="col-md-4 control-label">비밀번호</label>
	                        <div class="col-md-8">
	                            <input type="password" class="form-control" name="pwd" id="pwd" placeholder="비밀번호를 입력하세요"/>
	                        </div>
	                    </div>
	                    <div class="row">
	                       <div class="col-md-offset-9 col-md-3">
	                           <div class="form-group" >
		                           <input type="submit" class="btn btn-success" value="확인"/>
		                       </div>
	                       </div>
	                    </div>
	               </form>
		        </div>
	        </div>
	      </div>
	      <div class="modal-footer">
	        <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
	      </div>
	    </div>
	  </div>
	</div>
    <!-- 삭제 모달 -->
    <div id="deleteModal" class="modal fade" role="dialog">
      <div class="modal-dialog modal-sm">
        <!-- Modal content-->
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal">&times;</button>
            <h4 class="modal-title">정말로 삭제하시겠습니까?</h4>
          </div>
          <div class="modal-body">

            <div class="row">
                <div class="col-md-12">
                    <form class="form-horizontal" method="post" action="<c:url value='/jnsDelete'/>">
                        <input type="hidden" name="no" value="${record.no }"/>
                        <input type="hidden" name="nowPage" value="${param.nowPage }"/>
                        <div class="form-group">
                            <label class="col-md-4 control-label">비밀번호</label>
                            <div class="col-md-8">
                                <input type="password" class="form-control" name="pwd" id="pwd2" placeholder="비밀번호를 입력하세요"/>
                            </div>
                        </div>
                        <div class="row">
                           <div class="col-md-offset-9 col-md-3">
                               <div class="form-group" >
                                   <input type="submit" class="btn btn-success" value="확인"/>
                               </div>
                           </div>
                        </div>
                   </form>
                </div>
            </div>
          </div>
          <div class="modal-footer">
            <button type="button" class="btn btn-default" data-dismiss="modal">Close</button>
          </div>
        </div>
      </div>
    </div>
     <!-- 답변 폼으로 이동을 POST방식으로 전송하기 -->
    <form id="form" method="post" action="<c:url value='/jnsToReply'/>">
        <input type="hidden" name="no" value="${record.no }"/>
    </form>
    <script>
        function isDelete(){
            if(confirm("정말로 삭제하시겠습니까?")){
                location.replace("<c:url value='/delete?no=${record.no}&nowPage=${param.nowPage}'/>");
            }
        }
        function fnMovePage(){
            $('#form').submit();
        }
        function delOrUp(flag,cno,index){
        	var commentStr ='<table class="table table-bordered">';
        	var fUrl ='';
        	var methodType='';
        	var password =$('#'+index).val();
        	var index = index;
        	var no = ${record.no};
        	var cno = cno;
        	var comment ='';
        	//console.log('pwd',password);
        	if(flag==1) {
        		fUrl = '/jnsCommentDelete';
        		methodType='DELETE';
        	}
        	else {
        		fUrl = '/jnsCommentUpdate';
        		methodType='GET';
        	}
        	$.ajax({
                type:methodType,
                url:fUrl,
                dataType:"text",
                data:{cno:cno,pwd:password,no:no},
                success:function(data){
                    //console.log('왔다',data);
                    //console.log('data',data);
                    var jObj = JSON.parse(data);
                    if(jObj.length !=0){
                        if(data.indexOf('\"edt\":\"ok\"')==-1){
		                    //console.log('jObj',jObj);
		                    $.each(jObj,function(index,item){
		                    	commentStr +='<tr><td title="'+index+'" class="col-md-11"><span style="font-size:large; font-weight: bold;">'+item.id+'</span> '+item.postdate+' </br>'+item.comment+'</td><td><input class="cPwd" type="password" placeholder="비밀번호" id="'+index+'"/></br><a onclick="delOrUp(1,'+item.cno+','+index+')" title="'+index+'">삭제 </a><a onclick="delOrUp(2,'+item.cno+','+index+')" title="'+index+'"> 수정</a></td></tr>';
		                    });
		                    //console.log('commentStr',commentStr);
		                    $('#appendComment').html(commentStr);
                        }
                        else{
                            console.log('index',index);
                            if(index==0){
                                var edtStr = $('td').eq(4+index+1).text();
                                var strArr = edtStr.split(' ');
                                //console.log('strArr',strArr);
                                var id = strArr[0];
                                if(strArr.length==3){
                                    comment = strArr[2];
                                }
                                else if(strArr.length>3){
                                	for(var i=2;i<strArr.length;i++){
                                		comment += strArr[i]+' ';
                                	}
                                }
                            }
                            else{
                            	var edtStr = $('td').eq(4+index+2).text();
                            	var strArr = edtStr.split(' ');
                                //console.log('strArr',strArr);
                            	var id = strArr[0];
                                if(strArr.length==3){
                                    comment = strArr[2];
                                }
                                else if(strArr.length>3){
                                    for(var i=2;i<strArr.length;i++){
                                        comment += strArr[i]+' ';
                                    }
                                }
                            }
                            $('#cid').val(id);
                            $('#comment').val(comment);
                            $('#submit').prop("title",cno);
                        }
                    }
                    else{
                    	alert('비밀번호가 일치하지 않습니다');
                    	$('.cPwd').val('');
                    }
                    $('#submit').prop('disabled',true);
                },
                error:function(error){
                    console.log("에러",error);
                }
            });
        }
    </script>