/*
	Boryung
*/
$(function(){
	resize();	
	popLayer(); // 공통레이어팝업
})

var inputLabeling = function() { // Labeling
	$.fn.labeling = function () {$(this).focus(function () {$(this).prev("label").hide();}).focusout(function () {if ($(this).val().length == 0) {$(this).prev("label").show();}});};
	$(".searchName, .inputName, .search_name #searchName").labeling();
	$(".searchName, .inputName, .search_name #searchName").val(""); //  Firefox 초기화 캐시 제거
};

$(function() {
	$(".datepicker").datepicker({ // 달력
		
	});
	
	$.datepicker._gotoToday = function(id) {
		 $(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
	};
});

  //레이어 & 툴팁 
function popLayer(){
	var $modalTarget = $('.popact.eModal');
	var $arertTarget = $('.popact.eModal2');
	var $layer = $('.selectWrap .layerArea');
	var $layerClose = $(".layerClose , .btn_cancel , .btn_close"); 	

	$layerClose.click(function(e){
		$(".layerArea").hide();		
		$(".dimmed").remove();
		e.preventDefault();
	});

	$modalTarget.click(function(e){
		var href = $(this).attr('href');
		var layerArea = $(href).show();
		var wrapHeight = $(document).height();
		var layerWidth = $(href).width();
		var layerHeight = $(href).height();
		$(".selectWrap").removeClass("selected");
		$("body").append(layerArea);
		$("body").append("<div class='dimmed'></div>");
		$(".dimmed").css({
			"height":wrapHeight,
			 "opacity":0
		});
		$(".layer_fix").each(function () {
		var left = ( ($(window).width() - $(this).width()) / 2 );
		var top = ( ($(window).height() - $(this).height()) / 2 );

		if(top<0) top = 0;
		if(left<0) left = 0;

		$(this).css({"left":left, "top":top});
	});
			layerArea.css({"z-index":"300"}).show().attr('tabindex','0').focus();
			$(".dimmed , .layerArea .cancel").click(function(e) {		
			$(".layerArea").hide();
			$(".dimmed").remove();
			});
	  e.preventDefault();
	});

	$arertTarget.click(function(e){  // 딤 회색
		var href = $(this).attr('href');
		var layerArea = $(href).show();
		var wrapHeight = $(document).height();
		var layerWidth = $(href).width();
		var layerHeight = $(href).height();	
		$("body").append(layerArea);
		$("body").append("<div class='dimmed'></div>");
		$(".dimmed").css({
			"height":wrapHeight,
			 "opacity":0.3
		});
		layerArea.css({"z-index":"300"}).show().attr('tabindex','0').focus();
	    e.preventDefault();
	});
}
function resize(){
   $(window).resize(function() {
	     var wrapHeight = $(window).height() - $('#header').height();
		$('#footer').css({ height : wrapHeight  -  $("#container").height() - 202  +  'px' });
		$('#lnb').css({ minHeight  : wrapHeight - 45 + 'px' });
	 }) ;   
    $(window).trigger('resize');
} 
$(document).ready(function () {
	$("input[type='checkbox']").ezMark(); // CheckBox
	$("input[type='radio']").ezMark(); // Radio
	inputLabeling(); // Labeling
	$(".number2").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
});


