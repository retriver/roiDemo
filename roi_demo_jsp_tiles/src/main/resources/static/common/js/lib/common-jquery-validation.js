/*
* jquery validation 관련 추가 함수를 정의 한다.
* - 임의수정은 하지 말아주세요.
* 
* History : 2016. 5. 2., Kang Ju Seong, 최초 생성 
*/

$(function() { 
	
	/* From ~ To 날짜 체크 Validator method
	 * Validator는 readonly, disabled 처리된 필드는 검색하지 않으므로, 체크할 경우 속성을 제거해줘야 함.
	 * 체크 후 필드는 readonly 처리함. 
	 * EndDate: { periodDate: "#StartDate" }
	 * */
	$.validator.addMethod("periodDate", function(value, element, params) {
		var rVal = false;
		if (!/Invalid|NaN/.test(new Date(value))) {
	        rVal = new Date(value) >= new Date($(params).val());
	    }
		$(element).prop('readonly', true);
		
		return this.optional(element) || rVal;
	},"<spring:message code='ETC-000010' text='시작날짜가 종료날짜보다 클 수 없습니다.'/>");
	
	/* 오늘이후 날짜 체크 Validator method
	 * Validator는 readonly, disabled 처리된 필드는 검색하지 않으므로, 체크할 경우 속성을 제거해줘야 함.
	 * 체크 후 필드는 readonly 처리함.
	 * Date: { afterDate }
	 * */
	$.validator.addMethod("afterDate", function(value, element, params) {
		var rVal = false;
		
		if (!/Invalid|NaN/.test(new Date(value))) {
			rVal = $.datepicker.formatDate('yy-mm-dd', new Date(value)) > $.datepicker.formatDate('yy-mm-dd', new Date());
	    }
		$(element).prop('readonly', true);
		
		return this.optional(element) || rVal;
	},"<spring:message code='ETC-000011' text='오늘 이후의 날짜를 선택하세요.'/>");
	
	
/*	에러구문이 없을 경우 
 * 수정이 필요한 부분임
 * $.ajaxSetup({
        error: function (x, status, error, data) {
            if (x.status == 403) {
                alert("Sorry, your session has expired. Please login again to continue");
            }
            else {
                alertify.errorAlert(x.responseText);
            }
        }
    });*/

	
	// Byte 체크 vaildator 추가
	$.validator.addMethod("byteCheck", function (value, element, params) {
		var temp= 0;

		for(var idx=0; idx < value.length; idx++) {
			var c = escape(value.charAt(idx));

			if( c.length==1 ) temp ++;
			else if( c.indexOf("%u")!=-1 ) temp += 2;
			else if( c.indexOf("%")!=-1 ) temp += c.length/3;
		}

		if(temp > params){
			return false;
		}
		return true;
		}
	);

	// 금액 단위 vaildator 추가
	$.validator.addMethod("amtCheck", function(value, element) {
		if( (value % 10) != 0){
			return false;
		}
		return true;
		}
	);
});
