// ibsheet license.
//  document.write("<script type='text/javascript' charset='utf-8' src='/resources/common/ibsheet/ibleaders.js'></script>");


//ibsheet 관련 공통함수

/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (Array[sheetname1,sheetname2,....]) : 시트 이름 (여러개 인 경우 모두 넣을 것) 
 * url (String): 조회 url
 * append (boolean) : 기존 데이터에 신규데이터를 append할지 여부
 * sync (boolean): sync 여부
 * subparam (String): 조회 조건
 */
function DataSearch(param){
	
	if(param.sheet!=null){
		var opt = {};
		var qstring = "";
		//단일 시트에 대한 조회
		if(typeof(param.sheet)=="string"||param.sheet.length==1){
			//해당 폼에서 조회조건 추출
			if(param.subparam){
				qstring = param.subparam;	
			}
			//조회방식 동기/비동기 여부 (default : 비동기)
			if(param.sync){
				opt["Sync"] = param.sync;
			}
			
			//기존데이터에 append 여부 (default: false)
			if(param.append){
				opt["Append"] = param.append;
			}
			
			
			//시트객체
			var sheetid=param.sheet;
			//OnSearchEnd 오버라이드
			if(typeof(param.callback)=="function"){
				
				try{
					var dummySearchEnd=null;
					//OnSearchEnd 를 dummySearchEnd 담는다.
					if(typeof(window[sheetid+"_OnSearchEnd"])!="undefined"){  
						
						dummySearchEnd = window[sheetid+"_OnSearchEnd"];
						
					}
					//SmartResize 오버라이드
					window[sheetid+"_OnSearchEnd"] = function(Code, Msg, StCode, StMsg){
						if(dummySearchEnd){
							dummySearchEnd(Code, Msg, StCode, StMsg); //기존에 정의한 OnSearchEnd구문을 동작시킨다.
						}
						param.callback();
					}; 
				}catch(e){
					errorAlert("DataSearch ERROR:\n"+e.message);
				}    
			}
			
			//시트 조회
			window[sheetid].DoSearch(param.url,qstring,opt);
			
		}else{
			//여러개 시트 동시 조회
			//해당 폼에서 조회조건 추출
			if(param.subparam){
				qstring = param.subparam;	
			}
			//시트 조회 
			
			//맨 앞에 시트를 통해 ajax 통신
			var jsonString = window[param.sheet[0]].GetSearchData(param.url,qstring);
			//돌아온 결과를 json 객체로 바꾼다.
			var jsonObj = JSON.parse(jsonString);
			
			
			//시트객체 (마지막 시트의 OnSearchEnd 이벤트를 오버라이드 한다.
			var sheetid=param.sheet[param.sheet.length-1];
			
			//OnSearchEnd 오버라이드
			if(typeof(param.callback)=="function"){
				
				try{
					var dummySearchEnd=null;
					//OnSearchEnd 를 dummySearchEnd 담는다.
					if(typeof(window[sheetid+"_OnSearchEnd"])!="undefined"){  
						
						dummySearchEnd = window[sheetid+"_OnSearchEnd"];
						
					}
					//SmartResize 오버라이드
					window[sheetid+"_OnSearchEnd"] = function(Code, Msg, StCode, StMsg){
						if(dummySearchEnd){
							dummySearchEnd(Code, Msg, StCode, StMsg); //기존에 정의한 OnSearchEnd구문을 동작시킨다.
						}
						param.callback();
					}; 
				}catch(e){
					errorAlert("DataSearch ERROR:\n"+e.message);
				}    
			}
			
			
			
			
			//각 시트에 조회된 데이터를 순차적으로 로딩한다.
			for(var i=0;i<param.sheet.length;i++){
				window[param.sheet[i]].LoadSearchData(  jsonObj[param.sheet[i]] );	
			}
		}
	}else if(param.chart!=null){
		
		window[param.chart].DoSearch(param.url,{"Param":param.subparam});
		window[param.chart].Draw();		
	}
}



/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (Array[sheetname1,sheetname2,....]) : 시트 이름
 * onePageRow(Int) : 한번에 조회해 오는 개수 (default:100)
 * url (String): 조회 url
 * sync (boolean) : sync 여부(default async)
 * useDoSearchPaging (boolean) : DoSearchPaging()함수 사용여부 (default true)
 * page (Int) : 조회할 페이지 
 * subparam (String): 조회 조건
 */
function DataSearchPaging(param){
	var searchCondition = {"Param":""};
	
	var qstring = "";
	//단일 시트에 대한 조회
	
	//해당 폼에서 조회조건 추출
	if(param.subparam){
		searchCondition["Param"]= param.subparam;	
	}
	
	if(param.onePageRow){
		searchCondition["Param"] = searchCondition["Param"]+"&onepagerow="+param.onePageRow; 
	}else{
		searchCondition["Param"] = searchCondition["Param"]+"&onepagerow=100";
	}
	
	if(param.sync){
		searchCondition["Sync"] =param.sync;
	}
	
	
	searchCondition["UseWaitImage"] = 1;
//	searchCondition["PageParam"]="pageIndex";
	
	//시트 조회
	if(typeof(param.sheet)=="string"){
		window[param.sheet].DoSearchPaging(param.url,searchCondition);
	}else{
		window[param.sheet[0]].DoSearchPaging(param.url,searchCondition);
	}		
}




/*
 * 공통 조회 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet (sheetname1) : 시트 이름
 * onePageRow(Int) : 한번에 조회해 오는 개수 (default:100)
 * url (String): 조회 url
 * form (Form Element): 조회 조건
 */
function DirectDown2Excel(param){
	alert(2222);
}







/*
 * 공통 저장 함수
 * paramlist (json object)
 * json 변수명 (유형) : 설명
 * sheet  (Array[sheetname1,sheetname2,....]) : 시트 이름 (여러개 인 경우 모두 넣을 것) 
 * url (String): 조회 url
 * subparam (String): 조회 조건
 * sync (boolean) : sync 여부
 * quest (boolean) : 저장하시겠습니까? 컨펌 여부.
 * col (int or String) : 특정 컬럼 기준 저장
 * callback : 저장이후 호출할 function 객체
 */
function DataSave(param){
    var qstring = "";
    var opt = {}; //default 값
    //단일 시트에 대한 저장
    if(typeof(param.sheet)=="string"||param.sheet.length==1){
           var _sheet;
           
           if(typeof(param.sheet)=="string"){
                   _sheet = param.sheet;
           }else{
                   _sheet = param.sheet[0];
           }
           
           if(param.sync){
                   opt["Sync"] = param.sync;
           }
           
           if(param.quest){
                   opt["Quest"] = param.quest;
           }
           

			
			//OnSaveEnd 오버라이드
			if(typeof(param.callback)=="function"){
				
				try{
					var dummySaveEnd=null;
					//OnSaveEnd 를 dummySaveEnd 담는다.
					if(typeof(window[_sheet+"_OnSaveEnd"])!="undefined"){  
						
						dummySaveEnd = window[_sheet+"_OnSaveEnd"];
						
					}
					//OnSaveEnd 오버라이드
					window[_sheet+"_OnSaveEnd"] = function(Code, Msg, StCode, StMsg){
						if(dummySaveEnd){
							dummySaveEnd(Code, Msg, StCode, StMsg); //기존에 정의한 OnSaveEnd구문을 동작시킨다.
						}
						//OnSaveEnd()이벤트 호출 이후 callback에 정의한 내용을 구동시킨다.
						param.callback();
					} 
				}catch(e){
					errorAlert("DataSave ERROR:\n"+e.message);
				}    
			}
           
           
           
           //해당 폼에서 조회조건 추출
           if(param.subparam){
                   qstring = param.subparam;     
           }
           //IBSheet 각 컬럼에 대한 SAVENAME 전달
           qstring +=  "&"+_sheet+"_SAVENAME="+IBS_ConcatSaveName(window[_sheet]);
           //시트 저장
           opt["Param"] = qstring;
           opt["Mode"] = 2;
           opt["Delim"]= "‡";
           opt["Quest"]= "false";
           
           // Edward  confirm 메시지 개선.  * 특가/타임 세일 기능 개선 
           //    param 에 alertMsg 추가 하여 문구를 넘긴다.
           /* 
			var param = { url: 	, subparam: , sheet: 
				        , alertMsg : "진짜"   
			};								
			DataSave(param); 	 // 이녀석이       confirmAlert   을 또함..-_-;
			*/			
           var confirmMsg = "";
           if(param.alertMsg){
        	   confirmMsg = param.alertMsg + window[_sheet].Lang.Text.SYS_SaveConfirm;  // ex . 진짜 저장하시겠습니까?
           }else{
        	   confirmMsg = window[_sheet].Lang.Text.SYS_SaveConfirm; //  저장하시겠습니까?
           }
           
           alertify.confirmAlert( confirmMsg, function(){
        	   window[_sheet].DoSave(param.url,opt);
           });            
           
    }else{
           //여러개 시트 동시 저장
           //해당 폼내용 추출
           if(param.subparam){
                   qstring = param.subparam;     
           }
           
           var sheetSaveString = "";
           //각시트의 수정된 내용과 각컬럼의 SaveName을 담는다.
           for(var i=0;i<param.sheet.length;i++){
                   var tempStr = "";
                   
                   tempStr =  window[param.sheet[i]].GetSaveString({"Prefix":param.sheet[i]+"_","Mode":2,"Delim":"‡"});
                   sheetSaveString += tempStr;
                   //오류 확인
                   if(tempStr==""&&window[param.sheet[i]].IsDataModified()){
                          return;
                   }
                   if(qstring!=""){
                          qstring += "&"+tempStr;
                   }else{
                          qstring = tempStr;
                   }
                   //IBSheet 각 컬럼에 대한 SAVENAME 전달
                   qstring +=  "&"+param.sheet[i]+"_SAVENAME="+IBS_ConcatSaveName(window[param.sheet[i]]);
           }
           qstring += "&MULTISAVE=true";
           
           
           //수정한 내용이 없으면 저장을 중단한다.
           if(sheetSaveString==""){
                   infoAlert(window[param.sheet[0]].Lang.Text.SYS_EmptySaveContent);
                   return;
           }
           
           
           //마지막 시트 객체 
           var _sheet = param.sheet[param.sheet.length-1];
           //OnSaveEnd 오버라이드
           if(typeof(param.callback)=="function"){
				
				try{
					var dummySaveEnd=null;
					//OnSaveEnd 를 dummySaveEnd 담는다.
					if(typeof(window[_sheet+"_OnSaveEnd"])!="undefined"){  
						
						dummySaveEnd = window[_sheet+"_OnSaveEnd"];
						
					}
					//OnSaveEnd 오버라이드
					window[_sheet+"_OnSaveEnd"] = function(Code, Msg, StCode, StMsg){
						if(dummySaveEnd){
							dummySaveEnd(Code, Msg, StCode, StMsg); //기존에 정의한 OnSaveEnd구문을 동작시킨다.
						}
						//OnSaveEnd()이벤트 호출 이후 callback에 정의한 내용을 구동시킨다.
						param.callback();
					} 
				}catch(e){
					errorAlert("DataSave ERROR:\n"+e.message);
				}    
			}
           
           
           if(param.quest){
                   confirmAlert( window[param.sheet[0]].Lang.Text.SYS_SaveConfirm, function(){
	                	   //맨 앞에 시트를 통해 ajax 통신
	                	   var jsonString = window[param.sheet[0]].GetSaveData(param.url,qstring);
	                	   
	                	   //저장 성공/실패 여부를 각 시트에 동일하게 반영한다.
	                	   for(var i=0;i<param.sheet.length;i++){
	                		   window[param.sheet[i]].LoadSaveData( jsonString );
	                	   }
                   		}
                   	);
           }else{
                   //맨 앞에 시트를 통해 ajax 통신
                   var jsonString = window[param.sheet[0]].GetSaveData(param.url,qstring);
                   
                   //저장 성공/실패 여부를 각 시트에 동일하게 반영한다.
                   for(var i=0;i<param.sheet.length;i++){
                          window[param.sheet[i]].LoadSaveData( jsonString );   
                   }
           }           
    }
}

/*
 * 아이비시트 초기화 이후에 페이지 인덱스를 만들어 주는 함수
 * ibsheetinfo.js 에 IBS_InitSheet를 호출한 뒤, 페이지 인덱스에 해당하는 부분을 만든다.
 */
function IBS_InitSheet2(sheet,initSheet,divobj){
	IBS_InitSheet(sheet,initSheet);
	var sheetid = sheet.id;
	
	 //시트 하단에 page index가 보여질 div객체를 생성한다.
	 var idx_div = document.createElement("div");
	 idx_div.id = sheetid+"_index_div";
	 idx_div.style.backGroundColor="#FF0000";
	 idx_div.style.width = "100%";
	 idx_div.style.height = "24px";
	 
	 //현재 페이지를 저장하기 위한 input
	 var input_current = document.createElement("input");
	 input_current.type = "hidden";
	 input_current.id = sheetid+"_current_page";
	 input_current.name = sheetid+"_current_page";
	 input_current.value = "1";
	 idx_div.appendChild(input_current);
	 
	 //전체 건수를 저장하기 위한 input
	 var input_total_row = document.createElement("input");
	 input_total_row.type = "hidden";
	 input_total_row.id = sheetid+"_total_rows";
	 input_total_row.name = sheetid+"_total_rows";
	 idx_div.appendChild(input_total_row);
	    
	//div객체 안에 테이블을 두고 테이블 안에 조회건수표시/페이지인덱스를 둔다.
	var idx_table = document.createElement("table");
	idx_table.style.width = "100%";
	var idx_tbody = document.createElement("tbody");
	idx_tbody.style.width = "100%";
	var idx_tr = document.createElement("tr");
	idx_tr.style.width="100%";
	
	
	//왼쪽에 건수정보를 표시?
	var left_td = document.createElement("td");
	left_td.id = sheetid+"_td_SearchCount";
	left_td.style.width = "170px";

	
	//가운데 pageIndex 표시
	var center_td = document.createElement("td");
	center_td.id = sheetid+"_td_PageIndex";
	center_td.style.width = "auto";
	//오른쪽에 한번에 표시할 record 수 설정
	var right_td = document.createElement("td");
	right_td.id = sheetid+"_td_OnePageCnt";
	right_td.style.width = "170px";
	right_td.style.textAlign  = "right";
	
	//오른쪽에 들어갈 select
	var onePageCnt = document.createElement("select");
	onePageCnt.id = sheetid+"_OnePageCnt";
	onePageCnt.name = sheetid+"_OnePageCnt";
	
	var tArr = [10,20,30,50,100];
	for(var i=0;i<tArr.length;i++){
	    var option = document.createElement("option");
	option.text = tArr[i]+"건";
	    option.value = tArr[i];
	    onePageCnt.add(option, i);
	}
	
	addEventHandler(onePageCnt,"change",function(){
		window[sheetid].RemoveAll();
		document.getElementById(sheetid+"_current_page").value = "1";
		//기존 페이지 인덱스 영역을 clear 하자.
		clearPageIndex(sheetid);
	},"");
	
	
	right_td.appendChild(onePageCnt);
	
	idx_tr.appendChild(left_td);
	idx_tr.appendChild(center_td);
	idx_tr.appendChild(right_td);
	idx_tbody.appendChild(idx_tr);
	idx_table.appendChild(idx_tbody);
	idx_div.appendChild(idx_table);
	
	divobj.parentNode.appendChild(idx_div);
	
	
	window[sheetid].SetCountInfoElement(sheetid+"_td_SearchCount");
	
	
	var code = "td#"+sheetid+"_td_PageIndex"+"{height:20px; width:300px; float:left;margin-left:40%;}" 
	+"td#"+sheetid+"_td_PageIndex"+" ul{margin:0; padding:0; list-style:none; float:left; }"
	+"td#"+sheetid+"_td_PageIndex"+" li{margin:0 1px; background-color:#e7ebf1; padding: 4px; display: block; float: left; width: auto; height:10px; border-top:1px solid #235d9d; border-left:1px solid #235d9d; border-right:1px solid #235d9d;border-bottom:1px solid #235d9d;border-radius:30px;align:center;textalign:center}"
	+"td#"+sheetid+"_td_PageIndex"+" li:hover {background-color:#5588FF;cursor:pointer}"
	
	
	+"td#"+sheetid+"_td_PageIndex"+" a {z-index: 10;	display: block;	float: left; text-decoration: none; white-space: nowrap; width: auto; text-align:center; color:#444444;}"
	
	+"td#"+sheetid+"_td_PageIndex"+" ul.pageindex li a:hover span {background-color:#e7ebf1; color:#000000;}"
	+"td#"+sheetid+"_td_PageIndex"+" li.current{background-color:#1a4677;}"
	+"td#"+sheetid+"_td_PageIndex"+" li.current a{color:#e7ebf1;}"
	+"#"+sheetid+'_OnePageCnt{border:1px solid #999999;color:#666666;margin:0px;overflow:visible;text-align:start;text-indent:0px;line-height:18px;white-space:pre;font-size:11px;font-family:/*IBFN*/"Dotum", "Helvetica", "AppleGothic", sans-serif;}'
	+"#"+sheetid+'_index_div{font-size:/*IBFS*/11px; font-family:/*IBFN*/"Dotum", "Helvetica", "AppleGothic", sans-serif;}';
	insertCss(code);
	
	//상태 변화에 따른 배경색 지정
	sheet.SetRowBackColorU("#DDDDFF");//수정시
	sheet.SetRowBackColorI("#EEFFEE");//신규입력
	sheet.SetRowBackColorD("#FFDDDD");//삭제시

}



//
/* page index */
function makePageIndex(sheetid){
	var current_page = document.getElementById(sheetid+"_current_page").value;
	if(isNaN(current_page)){
		current_page = 0;
	}else{
		current_page = ~~(current_page);
	}
	
	try{
		//기존 페이지 인덱스 영역을 clear 하자.
		clearPageIndex(sheetid);
		
		var sr = window[sheetid].GetTotalRows(); //전체 조회 건수
		var page = document.getElementById(sheetid+"_OnePageCnt").value; //페이지당 레코드 수
		
		var pagecnt = 5; //!!!!!!!!!!!!!중요 한번에 표시할 페이지 개수
		var lastpage = Math.ceil(sr/page); //마지막 페이지 인덱스
		
		var li = null;
		var tt = null;
		var a = null;
		var ul = document.createElement("ul");
		
		var k=1;
		if(current_page!= 1){
			  li = document.createElement("li");
			  a = document.createElement("a");
				tt =  document.createTextNode("<<");
				addEventHandler(li,"click",pagemove,{methodName:"GoToFirstPage",page:1,sheet:sheetid});
				a.appendChild(tt);
				li.appendChild(a);
				ul.appendChild(li);	
				li = document.createElement("li");
				a = document.createElement("a");
				addEventHandler(li,"click",pagemove,{methodName:"GoToPrevPage",page:current_page-1,sheet:sheetid});
				tt =  document.createTextNode("<");
				a.appendChild(tt);
				li.appendChild(a);
				ul.appendChild(li);	
		}
		
		
		var sr = (Math.ceil(current_page/pagecnt)*pagecnt)-(pagecnt-1);
		
		for(var i=sr;i<(sr+pagecnt);i++){
			if(i<=lastpage){
				li = document.createElement("li");
				a = document.createElement("a");
				tt =  document.createTextNode(i);
				addEventHandler(li,"click",pagemove,{methodName:"GoToPageNum",page:i,sheet:sheetid});
				if(i==current_page)		li.className = "current";
				a.appendChild(tt);
				li.appendChild(a);
				ul.appendChild(li);	
			}	
		}		
		
		if(current_page < lastpage){
				a = document.createElement("a");
			  li = document.createElement("li");
				tt =  document.createTextNode(">");
				addEventHandler(li,"click",pagemove,{methodName:"GoToNextPage",page:current_page+1,sheet:sheetid});
				a.appendChild(tt);
				li.appendChild(a);
				ul.appendChild(li);	
				li = document.createElement("li");
				tt =  document.createTextNode(">>");
				a = document.createElement("a");
				addEventHandler(li,"click",pagemove,{methodName:"GoToLastPage",page:lastpage,sheet:sheetid});
				a.appendChild(tt);
				li.appendChild(a);
				ul.appendChild(li);	
		}
		
		ul.className = "pageindex";
		document.getElementById(sheetid+"_td_PageIndex").appendChild(ul);
	}catch(ex){
		errorAlert("error\n:"+ex.message);
	}
}

function clearPageIndex(sheetid){
	if (document.getElementById(sheetid+"_td_PageIndex").firstChild) {
		document.getElementById(sheetid+"_td_PageIndex").removeChild(document.getElementById(sheetid+"_td_PageIndex").firstChild);
	}
}


//페이지 인덱스 클릭시 호출함수.
function pagemove(param){
	
	var mn = param.methodName;
	var page = eval(param.page);
	var sheet = param.sheet;
	

	//현재 선택한 페이지 저장
	document.getElementById(sheet+"_current_page").value = page;
	//조회 함수 호출  
	eval(sheet+"_search("+page+")");
	//페이지 인덱스 부분 다시 그리기
	makePageIndex(sheet);
}

//이벤트 추가
function addEventHandler (obj,evtName,func,param) {
  
  if (obj.addEventListener) {   // all browsers except IE before version 9
      obj.addEventListener (evtName, function(){func(param)} , false );
  } 
  else {
      if (obj.attachEvent) {    // IE before version 9
          obj.attachEvent ("on"+evtName, function(){func(param)});
      }
  }
}
//css class 추가
function insertCss( code ) {
    var style = document.createElement('style');
    style.type = 'text/css';

    if (style.styleSheet) {
        // IE
        style.styleSheet.cssText = code;
    } else {
        // Other browsers
        style.innerHTML = code;
    }

    document.getElementsByTagName("head")[0].appendChild( style );
}

//date 타입을 yyyyMMdd형식으로 변환
function getFormatDate(date) {
	var year = date.getFullYear(); 
	var month = date.getMonth()+1;
	month = month >= 10 ? month : '0' + month;
	var day = date.getDate();
	day = day >= 10 ? day : '0' + day;
	
	return  year + '' + month + '' + day;
}

// 행사타입 리턴 (01:진행전, 02: 진행중, 03:종료)
// param : 오늘날짜, 행사시작일, 행사종료일
function getEventStat(date1, date2, date3) {
	var toDate = getFormatDate(date1);
	var stDate = getFormatDate(date2);
	var edDate = getFormatDate(date3);
	var evnTy = '';
	
	if(toDate < stDate) {
		evnTy = '01';
	} else if(toDate >= stDate && toDate <= edDate) {
		evnTy = '02';
	} else {
		evnTy = '03';
	}
	return  evnTy;
}

// 주문요약정보 팝업
function orderDetailSummary(ordNo) {

		showDialog("popOrderDetailSummaryLayer", "주문요약정보 팝업", "/order/orderDetailSummary?ordNo="+ordNo, 1000 , 550);
}

// 업체정보 조회 팝업
// frame_id: 팝업 frame_id
// multi_yn: 멀티 선택 가능 여부
// popup_yn: 팝업 여부
// tab_yn:   탭 여부
// tab_idx:  탭 번호
function popVendorSearch(params) {
	var param = "/vendor/popVendorSearch?frame_id=" + params.frame_id + "&multi_yn=" + params.multi_yn + "&popup_yn=" + params.popup_yn + "&tab_yn=" + params.tab_yn + "&tab_idx=" + params.tab_idx + "&vet_yn=" + params.vet_yn;

	showDialog("popVendorSearchLayer", "업체정보 조회 팝업", param, 1000 , 600);
}

//우편번호 조회 팝업
//frame_id: 팝업 frame_id
//popup_yn: 팝업 여부
//tab_yn:   탭 여부
//tab_idx:  탭 번호
function popZipcodeSearch(frame_id, popup_yn, tab_yn, tab_idx) {
	var param = "/zipcode/zipcodeSearch?frame_id=" + frame_id + "&popup_yn=" + popup_yn + "&tab_yn=" + tab_yn + "&tab_idx=" + tab_idx;

	showDialog("popZipcodeSearchLayer", "우편번호 검색", param, 700 , 550);
}
//사업자 등록증 팝업
//frame_id: 팝업 frame_id
//popup_yn: 팝업 여부
//tab_yn:   탭 여부
//tab_idx:  탭 번호
function popCustomerImg(frame_id, popup_yn, tab_yn, tab_idx, type, url) {
	var param = "/customer/popCustomerImg?frame_id=" + frame_id + "&popup_yn=" + popup_yn + "&tab_yn=" + tab_yn + "&tab_idx=" + tab_idx+"&customerURL="+url;
	
	showDialog("popCustomerImgLayer", (type == 'biz') ? "사업자등록증보기" : "동물약국등록증" , param, 700 , 550);
}

//회원정보 조회 팝업
//frame_id: 팝업 frame_id
//multi_yn: 멀티 선택 가능 여부
//popup_yn: 팝업 여부
//tab_yn:   탭 여부
//tab_idx:  탭 번호
function popCustomerSearch(frame_id, multi_yn, popup_yn, tab_yn, tab_idx) {
	var param = "/customer/popCustomerSearch?frame_id=" + frame_id + "&multi_yn=" + multi_yn + "&popup_yn=" + popup_yn + "&tab_yn=" + tab_yn + "&tab_idx=" + tab_idx;

	showDialog("popCustomerSearchLayer", "회원정보 조회 팝업", param, 730 , 620);
}

//쿠폰조회 팝업
//frame_id: 팝업 frame_id
//multi_yn: 멀티 선택 가능 여부
//popup_yn: 팝업 여부
//tab_yn:   탭 여부
//tab_idx:  탭 번호
//typ_cd :  발급:01, 선택:02
//tag_idx:  태그 인덱스 (한 페이지에 여러개의 조회가 필요할경우)
//user_id:  발급대상회원아이디
function popCouponSearch(frame_id, multi_yn, popup_yn, tab_yn, tab_idx, typ_cd, tag_idx, user_id) {
	var param = "/promotion/coupon/popCouponSearch?frame_id=" + frame_id + "&multi_yn=" + multi_yn + "&popup_yn=" + popup_yn + "&tab_yn=" + tab_yn + "&tab_idx=" + tab_idx + "&typ_cd=" + typ_cd + "&tag_idx=" + tag_idx + "&user_id=" + user_id;

	showDialog("popCouponSearchLayer", "쿠폰조회 팝업", param, 1200 , 630);
}

/*
	상품 마스터 조회 팝업 (전시순서 미포함)
	site_cd        : 사이트 코드
	grid_id        : 상품이 추가될 그리드명
	grid_good_id   : 그리드의 상품코드 헤더명
	multi_yn       : 멀티 셀렉트 여부
	call_ty        : 호출타입(리스트:1, 팝업:2) - 상품검색 팝업을 호출하는 화면의 타입 (2일 경우 pop_iframe 반드시 넣을것)
	pop_iframe_id1 : 상세(등록) 팝업의1 iframe id값 (리스트의 경우 없음)
	pop_iframe_id2 : 상세(등록) 팝업의2 iframe id값 (리스트의 경우 없음)
	good_pop_id    : 상품검색 팝업 호출 div id 값
*/
function popGoodMstSearch(param) {
	var params = "/goods/popGoodsMstSearch?site_cd="+param.site_cd+"&good_id="+param.good_id+"&grid_id="+param.grid_id+"&multi_yn="+param.multi_yn+"&call_ty="+param.call_ty+"&pop_iframe_id1="+param.pop_iframe_id1+"&pop_iframe_id2="+param.pop_iframe_id2+"&good_pop_id="+param.good_pop_id+"&vendor_id="+param.vendor_id+"&good_typ="+param.good_typ;
	showDialog(param.good_pop_id, "상품추가", params , 1000 , 800);
}

/*
	상품 마스터 조회 팝업2 (전시순서 포함)
	site_cd        : 사이트 코드
	grid_id        : 상품이 추가될 그리드명
	grid_good_id   : 그리드의 상품코드 헤더명
	multi_yn       : 멀티 셀렉트 여부
	call_ty        : 호출타입(리스트:1, 팝업:2) - 상품검색 팝업을 호출하는 화면의 타입 (2일 경우 pop_iframe 반드시 넣을것)
	pop_iframe_id1 : 상세(등록) 팝업의1 iframe id값 (리스트의 경우 없음)
	pop_iframe_id2 : 상세(등록) 팝업의2 iframe id값 (리스트의 경우 없음)
	good_pop_id    : 상품검색 팝업 호출 div id 값
*/
function popGoodDispMstSearch(param) {
	var params = "/goods/popGoodDispMstSearch?site_cd="+param.site_cd+"&good_id="+param.good_id+"&grid_id="+param.grid_id+"&multi_yn="+param.multi_yn+"&call_ty="+param.call_ty+"&pop_iframe_id1="+param.pop_iframe_id1+"&pop_iframe_id2="+param.pop_iframe_id2+"&good_pop_id="+param.good_pop_id+"&vendor_id="+param.vendor_id+"&good_typ="+param.good_typ;
	showDialog(param.good_pop_id, "상품추가", params , 1000 , 800);
}

/*
	상품 가격 조회 팝업
	site_cd        : 사이트 코드
	grid_id        : 상품이 추가될 그리드명
	grid_good_id   : 그리드의 상품코드 헤더명
	multi_yn       : 멀티 셀렉트 여부
	call_ty        : 호출타입(리스트:1, 팝업:2) - 상품검색 팝업을 호출하는 화면의 타입 (2일 경우 pop_iframe 반드시 넣을것)
	pop_iframe_id1 : 상세(등록) 팝업의1 iframe id값 (리스트의 경우 없음)
	pop_iframe_id2 : 상세(등록) 팝업의2 iframe id값 (리스트의 경우 없음)
	good_pop_id    : 상품검색 팝업 호출 div id 값
 */
function popGoodPrcSearch(param) {
	var params = "/goods/popGoodsPriceSearch?site_cd="+param.site_cd+"&good_id="+param.good_id+"&grid_id="+param.grid_id+"&multi_yn="+param.multi_yn+"&call_ty="+param.call_ty+"&pop_iframe_id1="+param.pop_iframe_id1+"&pop_iframe_id2="+param.pop_iframe_id2+"&good_pop_id="+param.good_pop_id+"&vendor_id="+param.vendor_id+"&tax_yn="+param.tax_yn+"&dataRows="+param.dataRows+"&search_type="+param.search_type;
	showDialog(param.good_pop_id, "상품추가", params , 1000 , 800);
}

//다음(Daum)우편번호 검색 팝업
function popDaumZipcode() {
	var popDaumZipLayer = document.getElementById('popDaumZipLayer');

	daum.postcode.load(function(){
		new daum.Postcode({
			oncomplete: function(data) {
			var fullAddr = '';
			var extraAddr = '';

			if (data.userSelectedType === 'R') {	// 도로명 주소를 선택했을 경우
				fullAddr = data.roadAddress;
			} else {								// 지번 주소를 선택했을 경우(J)
				fullAddr = data.jibunAddress;
			}

			// 사용자가 선택한 주소가 도로명 타입일때 조합한다.
			if(data.userSelectedType === 'R'){
				// 법정동명이 있을 경우 추가한다. 
				if(data.bname !== ''){
					extraAddr += data.bname;
				}
				// 건물명이 있을 경우 추가한다. 
				if(data.buildingName !== ''){
					extraAddr += (extraAddr !== '' ? ', ' + data.buildingName : data.buildingName);
				}

				// 조합형주소의 유무에 따라 양쪽에 괄호를 추가하여 최종 주소를 만든다. 
				fullAddr += (extraAddr !== '' ? ' ('+ extraAddr +')' : '');
			}

			// 우편번호와 주소 정보를 해당 필드에 넣는다. 
			$('#rtn_zipcd').val(data.zonecode);			// 우편번호 
			$('#rtn_zipaddr_1').val(fullAddr);			// 기본주소 

			popDaumZipLayer.style.display = 'none';
			
			$('#rtn_zipaddr_2').focus();
			},
			width : '100%',
			height : '100%'
		}).embed(popDaumZipLayer);

		popDaumZipLayer.style.display = 'block';

		initLayerPosition();
	});
}

//다음(Daum)우편번호 검색 팝업 위치 조정 
function initLayerPosition(){
	var width = 500;
	var height = 400;
	var borderWidth = 2;

	var popDaumZipLayer = document.getElementById('popDaumZipLayer');

	popDaumZipLayer.style.width = width + 'px';
	popDaumZipLayer.style.height = height + 'px';
	popDaumZipLayer.style.border = borderWidth + 'px solid';

	popDaumZipLayer.style.left = (((window.innerWidth || document.documentElement.clientWidth) - width)/2 - borderWidth) + 'px';
	popDaumZipLayer.style.top = (((window.innerHeight || document.documentElement.clientHeight) - height)/2 - borderWidth) + 'px';
}

//다음(Daum)우편번호 검색 팝업 close
function closeDaumPostcode() {
	var popDaumZipLayer = document.getElementById('popDaumZipLayer');

	popDaumZipLayer.style.display = 'none';
}

/*
제조사코드 조회 팝업
*/
function popMakerCdSearch(param) {
	var params = "/maker/popMakerCdSearch?frame_id=" + param.frame_id + "&multi_yn=" + param.multi_yn + "&popup_yn=" + param.popup_yn + "&tab_yn=" + param.tab_yn + "&tab_idx=" + param.tab_idx;

	showDialog(param.frame_id, "제조사코드 조회 팝업", params , 1000 , 560);
}
/* 날자 형식으로 자동 세팅 . 단 날자 형식 체크는 안함.. */
function auto_date_format( e,  obj ){       
    var num_arr = [ 
        97, 98, 99, 100, 101, 102, 103, 104, 105, 96,
        48, 49, 50, 51, 52, 53, 54, 55, 56, 57
    ]        
    var key_code = ( e.which ) ? e.which : e.keyCode;
    if( num_arr.indexOf( Number( key_code ) ) != -1 ){        
        var len = obj.value.length;
        if( len == 4 ) obj.value += "-";
        if( len == 7 ) obj.value += "-";        
    }      
}


/* 
 * Add Edward      일반 Table ( ibsheet 말고.. )에 mouserOver 효과 주기
  tagId  : 테이블 ID 
  class : 마우스 오버시 지정할  css   id  ( 공통으로 지정한 색상이 없으므로..각 페이지마다 css등록해준다 )
*/
function setMouseHover(tagId, classNm){

    $('#'+tagId+' tr').hover(
        function () {
            $(this).children().addClass(classNm);    // td 에도 class 적용되므로..
            $(this).addClass(classNm);
        },
        function () {
            $(this).removeClass(classNm);
            $(this).children().removeClass(classNm);   
        }
    );
}
 

//한글 byte 체크 2017.11.21
//사용법 : jsCheckStrLen(폼네임, 체크할 문자열, 제한사이즈)
//  	ex) jsCheckStrLen("이름", "name", 200)
function jsCheckStrLen(fname, fstr, maxlen)
{
	var temp; //들어오는 문자값...
	var msglen;
	var result = true;
	var length = fstr.length; 
	
	msglen = maxlen;
	
	if (length > 0){
		for(k=0;k<length;k++) {
			temp = fstr.charAt(k);
	
			if (escape(temp).length > 4){
				msglen -= 2;
			}
			else {
				msglen--;
			}
				
			if(msglen < 0)  {
				alert(fname+"은 최대 "+maxlen+"바이트(한글 2Byte, 영문 1Byte)를 넘을수 없습니다.");
				result = false;
				break;
			}
		}
	}
	return result;
}