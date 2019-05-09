
/*
 * 천단위 마다 숫자 콤마 
 */
function commaNumber(num){
	return (num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ","));
}

/*
 * T_USR_PAGE_VIEW!!
 *  */
function insertUserPageView(page_view_ty, page_view_no,inflow_typ){
	
	var mydata = {
			 "page_view_ty" 		: page_view_ty
			,"page_view_no" 		: page_view_no
			,"inflow_typ"			: "DSP001"
		};
			
	$.ajax({
		url: "/insertUserPageView",
		data: mydata,
		success: function(data, textStatus, xhr){
			if (data.RETVAL == "Y") {	//성공
				//alert(data.returnMsg); 
			} else {					//실패
				//alert(data.returnMsg);
			}
		},
		error:function (XMLHttpRequest, textStatus, errorThrown) {
			//alert( '실패 : ' + textStatus );
		}
	});
}
