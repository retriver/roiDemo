/*
* jquery 관련 공통 Util을 정의 한다.
* - 임의수정은 하지 말아주세요.
* 
* History : 2016. 5. 2., Kang Ju Seong, 최초 생성 
*/

$(function() { 
	$.fn.serializeObject = function() {
		var result = {};
		var extend = function (i, element) {
			var node = result[element.name];

			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
	
	/* Datepicker Widget 설정 */
	if ($('#_fromDate')[0] !== undefined){
//		var _Today = new Date(2017,0,1);
		var _Today = new Date();
		var _setDay = _Today.getFullYear();
		var _allDay = new Date(_setDay,0,1);
		$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _allDay));
		
		$("#_fromDate").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});
	};
		
	if ($('#_toDate')[0] !== undefined){
		var _Today = new Date();
		$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
		
		$("#_toDate").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});
	};
	
	/* Datepicker Widget 설정 */
	if ($('#_fromMonth')[0] !== undefined){
//		var _Today = new Date(2017,0,1);
		var _Today = new Date();
		var _setDay = _Today.getFullYear();
		var _allDay = new Date(_setDay,0,1);
		$("#_fromMonth").val($.datepicker.formatDate('yy-mm', _allDay));
		
		$("#_fromMonth").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm",
			buttonText: "Select month"
		});
	};
	
	/* Datepicker Widget 설정 */
	if ($('#_toMonth')[0] !== undefined){
		var _Today = new Date();
		$("#_toMonth").val($.datepicker.formatDate('yy-mm', _Today));
		
		$("#_toMonth").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm",
			buttonText: "Select month"
		});
	};
	
	/*날짜 기간 설정 : 오늘*/
	if ($('#_perToday')[0] !== undefined){
		$("#_perToday").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
		
	}
	/*날짜 기간 설정 : 1주일*/
	if ($('#_perWeek')[0] !== undefined){
		$("#_perWeek").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setDate(_Today.getDate()-7);				
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 1개월*/
	if ($('#_per1Month')[0] !== undefined){
		$("#_per1Month").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-1);
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 3개월*/
	if ($('#_per3Month')[0] !== undefined){
		$("#_per3Month").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-3);
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 6개월*/
	if ($('#_per6Month')[0] !== undefined){
		$("#_per6Month").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-6);
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 12개월*/
	if ($('#_per12Month')[0] !== undefined){
		$("#_per12Month").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-12);
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			
			event.preventDefault();
		});
	}
	
	if ($('#_msgBtnReset')[0] !== undefined){
	    $("#_msgBtnReset").click(function() {  
	    	location.reload(true);
	    });  
	};
});




$(function() { 
	$.fn.serializeObject = function() {
		var result = {};
		var extend = function (i, element) {
			var node = result[element.name];

			if ('undefined' !== typeof node && node !== null) {
				if ($.isArray(node)) {
					node.push(element.value);
				} else {
					result[element.name] = [node, element.value];
				}
			} else {
				result[element.name] = element.value;
			}
		};

		$.each(this.serializeArray(), extend);
		return result;
	};
	
	/* Datepicker Widget 설정 */
	if ($('#_fromDate1')[0] !== undefined){
//		var _Today = new Date(2017,0,1);
		var _Today = new Date();
		var _setDay = _Today.getFullYear();
		var _allDay = new Date(_setDay,0,1);
		$("#_fromDate1").val($.datepicker.formatDate('yy-mm-dd', _allDay));
		
		$("#_fromDate1").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});
	};
		
	if ($('#_toDate1')[0] !== undefined){
		var _Today = new Date();
		$("#_toDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
		
		$("#_toDate1").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});
	};
	
	/*날짜 기간 설정 : 오늘*/
	if ($('#_perToday1')[0] !== undefined){
		$("#_perToday1").click(function(event) {
			var _Today = new Date();
			$("#_toDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
			$("#_fromDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
			
			if ($('#_btnSearch1')[0] !== undefined){
				$('#_btnSearch1').click();
			}
			
			event.preventDefault();
		});
		
	}
	/*날짜 기간 설정 : 1주일*/
	if ($('#_perWeek1')[0] !== undefined){
		$("#_perWeek1").click(function(event) {
			var _Today = new Date();
			$("#_toDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setDate(_Today.getDate()-7);				
			$("#_fromDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
			
			if ($('#_btnSearch1')[0] !== undefined){
				$('#_btnSearch1').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 1개월*/
	if ($('#_per1Month1')[0] !== undefined){
		$("#_per1Month1").click(function(event) {
			var _Today = new Date();
			$("#_toDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-1);
			$("#_fromDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch1')[0] !== undefined){
				$('#_btnSearch1').click();
			}
			
			event.preventDefault();
		});
	}
	/*날짜 기간 설정 : 3개월*/
	if ($('#_per3Month1')[0] !== undefined){
		$("#_per3Month1").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			_Today.setMonth(_Today.getMonth()-3);
			$("#_fromDate1").val($.datepicker.formatDate('yy-mm-dd', _Today));

			if ($('#_btnSearch1')[0] !== undefined){
				$('#_btnSearch1').click();
			}
			
			event.preventDefault();
		});
	}
	
	if ($('#_msgBtnReset1')[0] !== undefined){
	    $("#_msgBtnReset1").click(function() {  
	    	location.reload(true);
	    });  
	};
});
