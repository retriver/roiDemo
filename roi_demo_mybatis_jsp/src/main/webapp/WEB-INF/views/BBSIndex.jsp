<%@ page language="java" contentType="text/html; charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<!DOCTYPE html>
<html>
<head>

<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/css/bootstrap.min.css">
<script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/3.4.1/js/bootstrap.min.js"></script>
<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">
<title>List</title>
</head>
<body>
    <div class="container">
        <!-- 점보트론(Jumbotron) -->
        <div class="jumbotron">
            <h1>답변형 게시판<small>목록 페이지</small></h1>
        </div>

        <!-- 작성하기 버튼 -->
        <div class="row" style="margin-bottom:10px">
            <div class="col-md-12 text-right">
                <a href="<c:url value='/insertBBS'/>" class="btn btn-success">등록</a>
            </div>
        </div>

        <div class="row">
            <!-- 테이블 전체 가로폭은 테이블을 감싸는  div에 col-*-*로 조정 -->
            <div class="col-md-12">
                <table class="table table-bordered table-hover text-center">
                    <tr>
                        <!-- 각 컬럼의 폭은 <td>계열에 class="col-*-*"추가 -->
                        <th class="col-md-1 text-center">번호</th>
                        <th class="text-center">제목</th>
                        <th class="col-md-1 text-center">작성자</th>
                        <th class="col-md-2 text-center">등록일</th>
                    </tr>
                    <c:if test="${empty bbsList }"  var="isEmpty">
                        <tr>
                            <td colspan="4">등록된 게시물이 없습니다</td>
                        </tr>
                    </c:if>
                    <c:if test="${not isEmpty }">
                        <c:forEach var="item" items="${bbsList}" varStatus="loop">
                            <tr>
                                <td>${totalRecordCount - (((nowPage - 1) * pageSize) + loop.index)}</td>
                                <td class="text-left">
                                <c:forEach begin="1" end="${item.depth}" varStatus="loopvar">
                                    &nbsp;&nbsp;&nbsp;&nbsp;
                                    <c:if test="${loopvar.last}"><!--loopvar.last 이 true이면 마지막 반복이면 -->
                                        └☞
                                    </c:if>
                                </c:forEach>
                                <a href="<c:url value='/view?no=${item.no}&nowPage='/><c:out value='${param.nowPage}' default='1'/>">${item.title }</a>
                                </td>
                                <td>${item.id }</td>
                                <td>${item.postdate}</td>
                            </tr>
                        </c:forEach>
                    </c:if>

                </table>
            </div><!-- col-md-12 -->
        </div><!-- row -->
        <!-- 페이징 -->
        <div class="row">
            <div class="col-md-12 text-center">
            ${pagingString}
            </div>
        </div>
    </div><!-- container -->


    <!-- jQuery (necessary for Bootstrap's JavaScript plugins) -->
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.12.4/jquery.min.js"></script>

</body>
</html>