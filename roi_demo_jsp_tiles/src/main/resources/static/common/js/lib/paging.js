

	/* 공통 페이징 처리
	 * 작성자 : aga,김기웅
	divId : 페이징 태그가 그려질 div
	pageIndx : 현재 페이지 위치가 저장될 input 태그 id
	recordCount : 페이지당 레코드 수
	totalCount : 전체 조회 건수 
	eventName : 페이징 하단의 숫자 등의 버튼이 클릭되었을 때 호출될 함수 이름
	*/
	var gfv_pageIndex = null;
	var gfv_eventName = null;
	var first = null;
	var last = null;
	var prev = null;
	var next = null;
	var page_block = 10;
	function gfn_renderPaging(params){
	    var divId = params.divId; //페이징이 그려질 div id
	    gfv_pageIndex = params.pageIndex; //현재 위치가 저장될 input 태그
	    var totalCount = params.totalCount; //전체 조회 건수
	    var currentIndex = $("#"+params.pageIndex).val(); //현재 위치
	    if($("#"+params.pageIndex).length == 0 || currentIndex == null){
	        currentIndex = 1;
	    }
	     
	    var recordCount = params.recordCount; //페이지당 레코드 수
	    if(recordCount == null){
	        recordCount = 20;
	    }
	    var totalIndexCount = Math.ceil(totalCount / recordCount); // 전체 인덱스 수
	    gfv_eventName = params.eventName;
	 
	     
	    $("#"+divId).empty();
	    var preStr = "";
	    var postStr = "";
	    var str = "";
	    first = (parseInt((currentIndex-1) / page_block) * page_block) + 1;//21
//	    last = (parseInt(totalIndexCount/page_block) == parseInt(currentIndex/page_block) || totalCount == 0) ? totalIndexCount%page_block : page_block;
	    last = first+page_block-1;
	    if(last>totalIndexCount) last = totalIndexCount;
	    
	    prev = (parseInt((currentIndex-1)/page_block)*page_block) - 9 > 0 ? (parseInt((currentIndex-1)/page_block)*page_block) : 1; 
	    next = (parseInt((currentIndex-1)/page_block)+1) * page_block + 1 < totalIndexCount ? (parseInt((currentIndex-1)/page_block)+1) * page_block + 1 : totalIndexCount;
	    if(totalIndexCount > page_block){ //전체 인덱스가 page_block이 넘을 경우, 맨앞, 앞 태그 작성
	    	var pageFirst = 1;
	        preStr += "<ul><li class='fst'><a href='#' onclick='_movePage("+pageFirst+"); return false;' ><span>맨처음</span></a></li>";
	        preStr += "<li class='pre'><a href='#' onclick='_movePage("+prev+"); return false;' ><span>이전</span></a></li>";
	        
	    }
	    
	    else if(totalIndexCount <=page_block && totalIndexCount >= 1){ //전체 인덱스가 page_block보다 작을경우, 맨앞 태그 작성
	        preStr += "<ul>";
	    }
	     
	    if(last < totalIndexCount){ //전체 인덱스가 last페이지를 넘을 경우, 맨뒤, 뒤 태그 작성
	    	postStr += "<li class='next'><a href='#' onclick='_movePage("+next+"); return false;'><span>다음</span></a></li>";
	    	postStr += "<li class='end'><a href='#' onclick='_movePage("+totalIndexCount+"); return false;' ><span>마지막</span></a></li></ul>";
	    }
	    else if(totalIndexCount <=page_block && totalIndexCount >= 1){ //전체 인덱스가 page_block보다 작을경우, 맨뒤 태그 작성
	        postStr += "</ul>";
	    }
	     
	    for(var i=first; i<=last; i++){
	        if(i != currentIndex){
	        	str += "<li><a href='#' onclick='_movePage("+i+"); return false;'>"+i+"</a></li>";
	        }
	        else{
	        	str += "<li><strong>"+i+"</strong></li>";
	        }
	    }
	    $("#"+divId).append(preStr + str + postStr);
	}
	 
	function _movePage(value){
	    $("#"+gfv_pageIndex).val(value);
	    if(typeof(gfv_eventName) == "function"){
	        gfv_eventName(value);
	    }
	    else {
	        eval(gfv_eventName + "(value);");
	    }
	}