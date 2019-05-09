
function searchLayer(){
	//schTabProduct();
		var schTabProduct = function() {//Tab
			$(".sch_layer .sch_cont").css("display","none");
			$(".sch_layer .sch_cont:first").css("display","block");
			$(".sch_layer .tab_sch li").click(function(){ 
				$(this).parent().parent().find(".sch_cont").css("display","none");
				$(this).parent().parent().find(".sch_cont").eq($(this).index()).css("display","block"); 
				$(this).parent().parent().find("li").removeClass("selected");
				$(this).addClass("selected");
			});
		}; schTabProduct();

	//var $fe_event = function(){
	//	var myDiv = $(".search_section").find(".sch_layer").show();
	//}
	
	$('.search_section #header_query').bind('focus', function(){
		var searchForm = document.topSearch;
		if ( searchForm.recommendKeywordType.value != "0" ){
			searchForm.query.value = "";
			searchForm.recommendKeywordType.value = "0";
			//return;
		} 
		
		$(".search_section").find(".sch_layer").show(); 

	});

	$(".sch_layer .btn").on("click", function(){
		$("#src-recommonend").find(".nodata").show()
		$("#src-recommonend .sch_result").height("auto")
		$("#src-recommonend").find(".recentSearch").remove()
		event.preventDefault();
		removeMyKeywordAll();
	});

//	$("body").on({
  //      click: function() {
//			 $(".search_section").find(".sch_layer").hide()
//			event.preventDefault();
//	  }
//    });

	// body click init
	function body_click(){ 
		$('body').click(function(e){
			if(!$(e.target).closest('.search_section').length){
				$('#headerSchLayer').hide();
			}
		});
		$('#nav_category a, .top_section h1 a').bind('focus click', function(){ 
			$('#headerSchLayer').hide();
		});
	}
	body_click();

	$(".sch_layer .btn").on("click", function(){
		$("#src-recommonend").find(".nodata").show()
		$("#src-recommonend .sch_result").height("auto")
		$(this).parent().parent().find(".result_area ul").remove()
		event.preventDefault();
	});
}

$("#header_query").keyup(function(event){
	if (event.keyCode != 13){
		insideSearch(); // 통합검색에서 추가함 11/28
		
		$("#src-recommonend").hide();
		$("#src-user").show();
	}else{ // 통합검색에서 추가함 11/28
		topTotalSearch(); // 통합검색에서 추가함 11/28
	}
});

///////////// 통합검색 작업 시작 ////////////// 11/28
$(".sch_layer .tab_sch li").click(function(){
	var tabId = this.id;
	document.topSearch.top_tabId.value = tabId;
	
	if (tabId == "c_goods_1"){
		document.topSearch.top_collection.value = "c_goods";
		document.topSearch.top_searchField.value = "GOOD_NM_WEB,GOOD_NM_WEB_KMA,GOOD_NM_WEB_CHOSUNG,GOOD_NM_WEB_NON_BLANK,SEARCH_WORD";
		document.topSearch.top_sort.value = "MAKER_NM_KOR_ORDER/ASC,ORDER_CNT/DESC,GOOD_DV_CD/ASC,GOOD_NM_WEB/ASC,PACK_CNT/ASC,RANK/DESC";
	}else if (tabId == "c_goods_2"){
		document.topSearch.top_collection.value = "c_goods";
		document.topSearch.top_searchField.value = "MAKER_NM_KOR,MAKER_NM_KOR_KMA";
		document.topSearch.top_sort.value = "MAKER_NM_KOR_ORDER/ASC,ORDER_CNT/DESC,GOOD_DV_CD/ASC,GOOD_NM_WEB/ASC,PACK_CNT/ASC,RANK/DESC";
	}else if (tabId == "c_goods_3"){
		document.topSearch.top_collection.value = "c_goods";
		document.topSearch.top_searchField.value = "INSURANCE_CD,INSURANCE_CD_MATRIX";
		document.topSearch.top_sort.value = "MAKER_NM_KOR_ORDER/ASC,ORDER_CNT/DESC,GOOD_DV_CD/ASC,GOOD_NM_WEB/ASC,PACK_CNT/ASC,RANK/DESC";
	}else if (tabId == "c_goods_4"){
		document.topSearch.top_collection.value = "c_goods";
		document.topSearch.top_searchField.value = "CONSTRUCT_TXT,EFFECT_TXT,CONSTRUCT_TXT_KMA,EFFECT_TXT_KMA";
		document.topSearch.top_sort.value = "MAKER_NM_KOR_ORDER/ASC,ORDER_CNT/DESC,GOOD_DV_CD/ASC,GOOD_NM_WEB/ASC,PACK_CNT/ASC,RANK/DESC";
	}else if (tabId == "c_vendor"){
		document.topSearch.top_collection.value = "c_vendor";
		document.topSearch.top_searchField.value = "VENDOR_NM,VENDOR_NM_KMA,VENDOR_NM_CHOSUNG";
		document.topSearch.top_sort.value = "DISP_SORT_SEQ/ASC,RANK/DESC";
	}
	insideSearch();
})

function insideSearch(){
	var str = "";
	var query = $("#header_query").val().trim();
	var totalCount = document.topSearch.top_totalCount.value;	//$("#viewResultCount").val().trim();
	var collection = document.topSearch.top_collection.value;	//$("#tab_sch li").prop('value').trim();	// c_goods, c_vendor
	var searchField = document.topSearch.top_searchField.value;
	var sort = document.topSearch.top_sort.value;	// SELL_SORT/DESC, DISP_SORT_SEQ/ASC
	var tabId = document.topSearch.top_tabId.value;

	$.ajax({
		url : "/search/searchJson",		// JSON URL 요청
		type : "POST",					// 전송방식[GET, POST]
		cache: false,					//캐시사용
		async : false,					//비동기 true, 동기 false
		dataType : "json",				// ajax 데이터 타입(xml, text, json)
		data : {
			"query" : query,
			"collection" : collection,
			"totalCount" : totalCount,
			"sort" : sort,
			"searchField" : searchField,
			"charset" : "UTF-8"
		},
		success : function(data) {
 			var list = data.SearchQueryResult.Collection[0].DocumentSet.Document;	//객체 호출(검색결과 배열)
 			var documentTotalCnt = data.SearchQueryResult.Collection[0].DocumentSet.TotalCount;
			//console.log(result.SearchQueryResult.Version);
			//console.log(documentTotalCnt);
			
			// 자동완성 리스트 설정 부분
 			$.each(list, function(index, value) {
 				var item = value.Field;
				
				// 상품 쪽 파라미터 값 변수 세팅
				var imgURL				= "http://image.pharm-street.com";		// 기본 이미지 URL
				var imgURL_KIMS 		= "http://dis.kims.co.kr";		// KIMS 기본 이미지 URL
				var noIMG				= "this.src='/resources/common/images/noImg.png';";
				var MAKER_NM_KOR		= "";	// 제조사명
				var MAKER_NM_KOR_ORI	= "";	// 제조사명
				var GOOD_NM_WEB			= "";	// PC 상품명
				var GOOD_NM_WEB_ORI		= "";	// PC 상품명
				var GOOD_ID				= "";	// 상품코드
				var GOOD_IMG			= "";	// 상품이미지 URL
				var KIMS_IMAGE1_URL		= "";	// KIMS 이미지1 URL
				var KIMS_IMAGE2_URL		= "";	// KIMS 이미지2 URL
				var INSURANCE_UNIT			= "";	// 보험단위
				var PC_LOWEST_PRICE		= "";	// PC 최저가
				var INSURANCE_CD		= "";	// 보험코드
				var NEW_YN				= "";	// 신상품 여부
				var EVENT_YN			= "";	// 행사 여부
				var CONSTRUCT_TXT		= "";	// 주요성분
				var CONSTRUCT_TXT_ORI	= "";	// 주요성분
				var EFFECT_TXT			= "";	// 효능/효과
				var EFFECT_TXT_ORI		= "";	// 효능/효과
				var PACK_CNT			= "";	// 패킷 단위
				
				// 공급사 파라미터 값 변수 세팅
				var VENDOR_NM			= "";	// 공급사명
				var ORD_MIN_AMT			= "";	// 최소주문금액
				var VEN_CHARGE_NM		= "";	// 배송담당자명
				var VEN_TEL_TXT			= "";	// 업체전화번호
				var VEN_WORKING_HOUR	= "";	// 업체근무시간
				
				if(collection == "c_goods") {
					$.each(item, function(index, value) {
						if (index == "MAKER_NM_KOR") {
							MAKER_NM_KOR_ORI = replaceAll(replaceAll(value, "<!HS>", ""), "<!HE>", "");
							MAKER_NM_KOR = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "GOOD_NM_WEB") {
							GOOD_NM_WEB_ORI = replaceAll(replaceAll(value, "<!HS>", ""), "<!HE>", "");
							GOOD_NM_WEB = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "GOOD_IMG") {
							GOOD_IMG = value;
						} else if (index == "KIMS_IMAGE1_URL") {
							KIMS_IMAGE1_URL = value;
						} else if (index == "KIMS_IMAGE2_URL") {
							KIMS_IMAGE2_URL = value;
						} else if (index == "GOOD_ID") {
							GOOD_ID = value;
						} else if (index == "INSURANCE_UNIT") {
							INSURANCE_UNIT = value;
						} else if (index == "PC_LOWEST_PRICE") {
							PC_LOWEST_PRICE = comma(value);
						} else if (index == "INSURANCE_CD") {
							INSURANCE_CD_ORI = replaceAll(replaceAll(value, "<!HS>", ""), "<!HE>", "");
							INSURANCE_CD = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "NEW_YN") {
							NEW_YN = value;
						} else if (index == "EVENT_YN") {
							EVENT_YN = value;
						} else if (index == "CONSTRUCT_TXT") {
							CONSTRUCT_TXT_ORI = replaceAll(replaceAll(value, "<!HS>", ""), "<!HE>", "");
							CONSTRUCT_TXT = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "EFFECT_TXT") {
							EFFECT_TXT_ORI = replaceAll(replaceAll(value, "<!HS>", ""), "<!HE>", "");
							EFFECT_TXT = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "PACK_CNT") {
							PACK_CNT = value;
						}
					});
					
					if (NEW_YN == "Y"){
						NEW_YN = '  <span class="ico_com ico_new" title="신상품">신상품</span>';
					}else{
						NEW_YN = "";
					}
					
					if (EVENT_YN == "P" || EVENT_YN == "A"){
						EVENT_YN = '  <span class="ico_com ico_evt" title="행사중">행사중</span>';
					}else{
						EVENT_YN = "";
					}
					
					var goodImageURL = "";
					if (GOOD_IMG == ""){
						if (KIMS_IMAGE1_URL == ""){
							if (KIMS_IMAGE2_URL == ""){
								goodImageURL = "";
							}else{
								goodImageURL = imgURL_KIMS + KIMS_IMAGE2_URL;
							}
						}else{
							goodImageURL = imgURL_KIMS + KIMS_IMAGE1_URL;
						}
					}else{
						goodImageURL = imgURL + GOOD_IMG;
					}
					
					if (MAKER_NM_KOR == ""){
						MAKER_NM_KOR = "";
						MAKER_NM_KOR_ORI = "";
					}else{
						MAKER_NM_KOR = "["+MAKER_NM_KOR+"]";
						MAKER_NM_KOR_ORI = "["+MAKER_NM_KOR_ORI+"]";
					}
					
					if (PACK_CNT == "" || PACK_CNT == "0"){
						PACK_CNT = "";
					}else{
						PACK_CNT = "(" + PACK_CNT + ")";
					}
					
					if (tabId == "c_goods_4"){
						str += '<li class="selected">';
						str += '	<a href="/goods/goodsList?good_id='+GOOD_ID+'">';
						str += '		<div class="prod_row">';
						str += '			<p class="thmb"><img src="'+goodImageURL+'" alt="'+MAKER_NM_KOR+' '+GOOD_NM_WEB+'" onerror="'+noIMG+'" class="mCS_img_loaded" /></p>';
						str += '			<div class="info">';
						str += '				<p class="ttl" title="'+MAKER_NM_KOR_ORI + GOOD_NM_WEB_ORI +'">'+MAKER_NM_KOR + GOOD_NM_WEB + NEW_YN + EVENT_YN +'</p>';
						str += '				<p class="txt">주요성분 : <span class=""  title="' + CONSTRUCT_TXT_ORI + '">' + CONSTRUCT_TXT + '</span><i class="bar">|</i>효능효과 : <span class="" title="' + EFFECT_TXT_ORI + '">' + EFFECT_TXT + '</span></p>';
						str += '	 		</div>';
						str += '		</div>';
						str += '	</a>';
						str += '</li>';
					}else{
						str += '<li class="selected">';
						str += '	<a href="/goods/goodsList?good_id='+GOOD_ID+'">';
						str += '		<div class="prod_row">';
						str += '			<p class="thmb"><img src="'+goodImageURL+'" alt="'+MAKER_NM_KOR+GOOD_NM_WEB+'" onerror="'+noIMG+'" class="mCS_img_loaded" /></p>';
						str += '			<div class="info">';
						str += '				<p class="ttl" title="'+MAKER_NM_KOR_ORI + GOOD_NM_WEB_ORI +'">'+MAKER_NM_KOR+ GOOD_NM_WEB + NEW_YN + EVENT_YN + '</p>';
						str += '				<p class="txt">'+INSURANCE_UNIT + PACK_CNT + '<i class="bar">|</i>보험코드 : ' + INSURANCE_CD + '</p>';
						str += '			</div>';
						str += '		</div>';
						str += '	</a>';
						str += '</li>';
					}
				}else if(collection == "c_vendor") {
					$.each(item, function(index, value) {
						if (index == "VENDOR_NM") {
							VENDOR_NM = replaceAll(replaceAll(value, "<!HS>", "<strong>"), "<!HE>", "</strong>");
						} else if (index == "ORD_MIN_AMT") {
							ORD_MIN_AMT = comma(value);
						} else if (index == "VEN_CHARGE_NM") {
							VEN_CHARGE_NM = value;
						} else if (index == "VEN_TEL_TXT") {
							VEN_TEL_TXT = value;
						} else if (index == "VEN_WORKING_HOUR") {
							VEN_WORKING_HOUR = value;
						}
					});
					
					str += '<li class="selected">';
					str += '	<a href="#">';
					str += '		<div class="brand_row">';
					str += '			<p class="ttl">'+VENDOR_NM+' <span class="t_p">최소주문금액 : '+ORD_MIN_AMT+'원</span></p>';
					str += '			<p class="txt" >담당 : <span class="length" title="'+VEN_CHARGE_NM+'">'+VEN_CHARGE_NM+'</span><i class="bar">|</i>연락처 : '+VEN_TEL_TXT+' <i class="bar">|</i>근무시간 : '+VEN_WORKING_HOUR+'</p>';
					str += '		</div>';
					str += '	</a>';
					str += '</li>';
				}
			});
			

 			
			// 해당 선택자(ID)에 맞는 html에 변수 str값을 세팅해서 최종 페이지에 뿌려준다.
			if(totalCount > 0 && collection == "c_goods") {
				if (tabId == "c_goods_1"){
					$("#sch_ul_goods_1").html(str);
				}else if (tabId == "c_goods_2"){
					$("#sch_ul_goods_2").html(str);
				}else if (tabId == "c_goods_3"){
					$("#sch_ul_goods_3").html(str);
				}else if (tabId == "c_goods_4"){
					$("#sch_ul_goods_4").html(str);
				}
			}else if(totalCount > 0 && collection == "c_vendor") {
				$("#sch_ul_vendor").html(str);
			}
		},
		error : function(xhr, status, error) {
			if(xhr.status == 401) {
				alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.", { label: "확인",  success: function () { top.location.href = "/"; } });
			} else if(xhr.status == 0){
				alert("시스템에 에러가 발생하였습니다.", { label: "확인",  success: function () {} });
			} else {
				alert("status:" + status + ", error:" + error+"</br>");
			}
		}
	});
}

//탭 메뉴 : Javascript
function btnClick(val){
	var searchForm = document.search;
	
	// collection별 출력 건수 제어
	if(searchForm.collection.value == "c_goods") {
		searchForm.viewResultCount.value = 30;
	}else if(searchForm.collection.value == "c_vendor") {
		searchForm.viewResultCount.value = 10;
	}else if(searchForm.collection.value == "c_exhibition") {
		searchForm.viewResultCount.value = 10;
	}else if(searchForm.collection.value == "c_event") {
		searchForm.viewResultCount.value = 10;
	}
	
	searchForm.sort.value = "";
	searchForm.startCount.value = 0;
	searchForm.category.value = "";
	searchForm.categoryDept.value = 1;
	searchForm.collection.value = val;
	searchForm.submit();
}

//통합검색 실행
function topTotalSearch(){
	var searchForm = document.topSearch;
	if (trim(searchForm.query.value) == ""){
		alert("검색어를 입력하세요.");
		return false;
	}
	
	/* 0:추천 검색어 없음, 1:추천검색어로 검색, 2:링크 URL로 이동 */
	if(searchForm.recommendKeywordType.value == "1"){
		searchForm.query.value = searchForm.recommendKeyword.value;
		searchForm.submit();
	}else if(searchForm.recommendKeywordType.value == "2"){
		location.href = searchForm.recommendKeywordURL.value;
	}else {
		searchForm.submit();
	}
}

//통합검색 실행 - 최근 검색어
function doKeyword(query){
	var searchForm = document.topSearch;
	
	$(".searchName, .inputName, .search_name #searchName").prev("label").hide();
	
	searchForm.query.value = query;
	searchForm.collection.value = "c_goods";

	searchForm.submit();
}

// 페이징 처리
function pagings(val) {
	var searchForm = document.search;
	
	searchForm.startCount.value = val;
	searchForm.submit();
}

// Select 페이징 처리
function selPaging(val) {
	var searchForm = document.search;
// 	$("#selGood").val(val).prop("selected", true);
// 	searchForm.select.options[searchForm.selectedIndex].selected = true;
	searchForm.viewResultCount.value = val;
	searchForm.submit();
}

// Sort 정렬 처리
function sorting(val) {
	var searchForm = document.search;
	
	searchForm.sort.value = val;
	searchForm.submit();
}

//카테고리 검색 
function categorySearch(category,categoryDept){
	var searchForm = document.search;
	
	searchForm.startCount.value = 0;
	searchForm.category.value = category;
	searchForm.categoryDept.value = categoryDept;
	searchForm.submit();
}

//쿠키값 조회
function getCookie(c_name) {
	var i,x,y,cookies=document.cookie.split(";");
	for (i=0;i<cookies.length;i++) {
		x=cookies[i].substr(0,cookies[i].indexOf("="));
		y=cookies[i].substr(cookies[i].indexOf("=")+1);
		x=x.replace(/^\s+|\s+$/g,"");
	
		if (x==c_name) {
			return unescape(y);
		}
	}
}

// 쿠키값 설정
function setCookie(c_name,value,exdays) {
	var exdate=new Date();
	exdate.setDate(exdate.getDate() + exdays);
	var c_value=escape(value) + ((exdays==null) ? "" : "; expires="+exdate.toUTCString());
	document.cookie=c_name + "=" + c_value +  "; path=/ "; 
	
}

//통합검색 내가 찾은 검색어 삭제 
function removeMyKeywordAll() {
	setCookie("mykeyword", "", 365);	
}

// 내가 찾은 검색어 삭제
function removeMyKeyword(keyword) {
	var myKeyword = getCookie("mykeyword");
	if( myKeyword == null) {
		myKeyword = "";
	}

	var myKeywords = myKeyword.split("^%");

	var i = 0;
	while (i < myKeywords.length) {
		if (myKeywords[i] == keyword) {
			myKeywords.splice(i, 1);
		} else { 
			i++; 
		}
	}

	setCookie("mykeyword", myKeywords.join("^%"), 365);	
}

// 내가 찾은 검색어 조회
function getMyKeyword(keyword, totCount) {
	var MYKEYWORD_COUNT = 13; //내가 찾은 검색어 갯수 + 1
	var myKeyword = getCookie("mykeyword");
	if( myKeyword== null) {
		myKeyword = "";
	}

	var myKeywords = myKeyword.split("^%");

	if( totCount > 0 ) {
		var existsKeyword = false;
		for( var i = 0; i < myKeywords.length; i++) {
			if( myKeywords[i] == keyword) {
				existsKeyword = true;
				break;
			}
		}

		if( !existsKeyword ) {
			myKeywords.push(keyword);
			if( myKeywords.length == MYKEYWORD_COUNT) {
				myKeywords = myKeywords.slice(1,MYKEYWORD_COUNT);
			}
		}
		setCookie("mykeyword", myKeywords.join("^%"), 365);
	}

	showMyKeyword(myKeywords.reverse());
}
 
// 내가 찾은 검색어 
function showMyKeyword(myKeywords) {
	var str = "";
	
	for( var i = 0; i < myKeywords.length; i++) {
		if ( trim(myKeywords[i]) == "") continue;		
		str += "<li><a href=\"javascript:doKeyword('"+myKeywords[i]+"')\">"
		str += "<div class=\"prod_row\">"
		str += myKeywords[i]
		str += "</div>"
		str += "</a>"
		str += "</li>"
	}
	$("#recentQuery").html(str);
}

//통합검색 내가 찾은 검색어 
function showMyKeywordTop() {
	var MYKEYWORD_COUNT = 13; //내가 찾은 검색어 갯수 + 1
	var myKeyword = getCookie("mykeyword");
	if( myKeyword== null) {
		myKeyword = "";
	}

	var myKeywords = myKeyword.split("^%");

	alert(myKeywords.length);
	var str = "";
	
	for( var i = 0; i < myKeywords.length; i++) {
		if ( myKeywords[i] == "") continue;		
		str += "<li><a href=\"javascript:doKeyword('"+myKeywords[i]+"')\">"
		str += "<div class=\"prod_row\">"
		str += myKeywords[i]
		str += "</div>"
		str += "</a>"
		str += "</li>"
	}
	$("#recentQuery").html(str);
}

//Replace All
function replaceAll(str, orgStr, repStr) {
	return str.split(orgStr).join(repStr);
}

// 공백 제거
function trim(str) {
	return str.replace(/^\s\s*/, '').replace(/\s\s*$/, '');
}

//콤마찍기
function comma(str) {
	str = String(str);
	return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

 //콤마풀기
function uncomma(str) {
	str = String(str);
	return str.replace(/[^\d]+/g, '');
}
///////////// 통합검색 작업 끝 //////////////


// 상품 상세 화면에서 레이어 팝업을 띄운다. 

function jsLayerPopup(type, np, cp, gp, total_cnt){
	good_id = $('#s_good_id').val();
	evn_no = $('#evn_no').val();
	
	$.ajax({
		type: 'post',
		data : {tab_ty:type, s_good_id:good_id,s_vendor_id:$('#s_vendor_id').val(), np:np, cp:cp, gp:gp, total_cnt:total_cnt, evn_no:evn_no},
		url: '/goods/goodsEtcInfo',
		dataType : 'html',
		cache: false,
		success: function(data) {
			$('#popupArea').html(data);
			$(".layer_prdcdetail").show();		// 레이어 팝업 영역 보이기
			$("body").addClass("layerActive");
			layerFix($(".layer_findadrs")); 	// LayerFix
			layerClose($(".layer_prdcdetail")); // LayerClose
			commonTab($(".layer_supply")); 		// Tab
			galleryVisual($(".layer_supply")); 	// galleryVisual
			$(".layer_prdcdetail .scroll-pane").jScrollPane(); // Scrooll
			$(".tab_section .tab_cont").parent().find(".tab_cont:first").css("display","none");
			$('#dtlLayer_1').show();
			jsAlert();
			$('#dtlLayer_1').hide();
			$('#dtlLayer_'+type).show();	// 선택한 타입의 탭을 보여준다.
		}
	});		
}


/*상품 상세 화면에서 레이어 팝업을 띄운다. (팝업용)
 * 2017-07-12 엄기백 작성
*/

function jsLayerPopupPop(type, np, cp, gp, total_cnt){
	good_id = $('#s_good_id').val();
	evn_no = $('#evn_no').val();
	
	$.ajax({
		type: 'post',
		data : {tab_ty:type, s_good_id:good_id,s_vendor_id:$('#s_vendor_id').val(), np:np, cp:cp, gp:gp, total_cnt:total_cnt, evn_no:evn_no},
		url: '/goods/popGoodsEtcInfo',
		dataType : 'html',
		cache: false,
		success: function(data) {
			$('#popupArea').html(data);
			$(".layer_prdcdetail").show();		// 레이어 팝업 영역 보이기
			$("body").addClass("layerActive");
			layerFix($(".layer_findadrs")); 	// LayerFix
			layerClose($(".layer_prdcdetail")); // LayerClose
			commonTab($(".layer_supply")); 		// Tab
			galleryVisual($(".layer_supply")); 	// galleryVisual
			$(".layer_prdcdetail .scroll-pane").jScrollPane(); // Scrooll
			$(".tab_section .tab_cont").parent().find(".tab_cont:first").css("display","none");
			$('#dtlLayer_1').show();
			jsAlert();
			$('#dtlLayer_1').hide();
			$('#dtlLayer_'+type).show();	// 선택한 타입의 탭을 보여준다.
		}
	});		
}




// 사은품 탭 클릭 시, 스크롤바 생성 - 추후 개선여지 확인

var prdcDetailLayer = function(){ // Layer Common - 이벤트 독립적으로 스크립트 작업해야함!!
	$(".prdcGift, .prdcDetail, .prdcInsurance").click(function(e){
		e.preventDefault();
		
		jsLayerPopup(this.id, '5', '1', '1', '');
	});
};

function jsLocation(loc){
	location.hash = "";
	location.hash = "position_"+loc;
	setTimeout(function(){
		location.hash = "position_"+loc;
		$('html, body').stop().animate( { scrollTop : '-=60' } );
	}, 10)
}

function jsAlert(){
$(".layer_prdcdetail .mCustomScrollbar").jScrollPane(); // Scrooll
}

// 동일성분 적용

function jsMainComp(mainCompCd, good_id, makerNmKor, goodImg, goodNmWeb){
	
	jQuery("#mainCompImageArea").attr("src", (goodImg).replace(/ /gi, ""));	// 상품 이미지
	$('#mainCompMakerArea').text(makerNmKor.replace(/ /gi, ""));	// 제조사
	$('#mainCompTitleArea').text(goodNmWeb.replace(/ /gi, ""));		// 상품명(PC)
	
	$('#main_comp_cd').val(mainCompCd.replace(/ /gi, ""));				// 주성분코드
	$('#main_comp_good_id').val(good_id.replace(/ /gi, ""));			// 주성분 코드 상품코드
	
	jsMainCompSearch();	// 동일성분 검색
	return;
}

function jsMainCompSearch(){
	var mainCompCd = $('#main_comp_cd').val();				// 주성분코드
	$('#main_comp_search').val("Y");
	jsPage(1,1);
}

// 레이어팝업의 페이징을 클릭 했을 때

function jsPageLayer(cp, gp){
	var np = $('#np_layer').val();
	var total_cnt_layer = $('#total_cnt_layer').val();
	
	jsLayerPopup('3', np, cp, gp, total_cnt_layer);
	return;
}


function jsSearchBlur(){
	$('.easyList').hide();
}