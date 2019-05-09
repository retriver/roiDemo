/*
* jquery 관련 기본 설정을 정의 한다.
* - 임의수정은 하지 말아주세요.
* 
* History : 2016. 5. 2., Kang Ju Seong, 최초 생성
*/

$(function() {
	/* AJAX common setting */
	$.ajaxSetup({
		cache: false,
		type : "POST",
		dataType : "json",
		error: function(xhr, status, err) {
			if (xhr.status == 401) {
				infoAlert("<spring:message code='ETC-000000' text='세션이 만료되었습니다. 다시 로그인 해주시기 바랍니다.'/>", function(){top.location.href = "/";});
			} else if (xhr.status == 403) {
				infoAlert("<spring:message code='ETC-000000' text='사용 권한이 없습니다.'/>");
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
});