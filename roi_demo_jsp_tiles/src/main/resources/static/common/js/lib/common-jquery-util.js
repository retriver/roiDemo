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
	
	/* AJAX common setting */
	$.ajaxSetup({
		cache: false,
		type : "POST",
		dataType : "json",
		error: function(xhr, status, err) {
			if (xhr.status == 401) {
				alert("세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.", { label: "확인",  success: function () { top.location.href = "/"; } });
			} else if (xhr.status == 403) {
				alert("사용 권한이 없습니다.");
			}
		}
	});
	
	/* Validator common setting */
	var validatorAlert = true;
	$.validator.setDefaults({
		ignore : '*:not([name])',
		onkeyup:false,
		onclick:false,
		onfocusout:false,
		errorClass:'error',
		errorPlacement: function (error, element) { },
		invalidHandler: function(form, validator) {
			if (validator.numberOfInvalids()) {
				alert(validator.errorList[0].message);
				validator.errorList[0].element.focus();
			}
		}
	});

		/* Datepicker Widget 설정 */
	if ($('#_fromDate')[0] !== undefined){
		var _Today = new Date();
		$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
/*		
		$("#_fromDate").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});*/
	};

	if ($('#_toDate')[0] !== undefined){
		var _Today = new Date();
		$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
/*		
		$("#_toDate").datepicker({
			showOn: "button",
			buttonImage: "/resources/common/images/back/calendar_blue.png",
			buttonImageOnly: true,
			dateFormat:"yy-mm-dd",
			buttonText: "Select date"
		});*/
	};

	/*날짜 기간 설정 : 오늘*/
	if ($('#_perToday')[0] !== undefined){
		$("#_perToday").click(function(event) {
			var _Today = new Date();
			$("#_toDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			$("#_fromDate").val($.datepicker.formatDate('yy-mm-dd', _Today));
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
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
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
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
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
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
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
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
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
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
			/*
			if ($('#_btnSearch')[0] !== undefined){
				$('#_btnSearch').click();
			}
			*/
			event.preventDefault();
		});
	}
});
