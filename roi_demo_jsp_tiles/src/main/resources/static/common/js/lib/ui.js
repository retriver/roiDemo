/*
	Boryung
*/
var inputLabeling = function() { // Labeling
	$.fn.labeling = function () {$(this).focus(function () {$(this).prev("label").hide();}).focusout(function () {if ($(this).val().length == 0) {$(this).prev("label").show();}});};
	$(".searchName, .inputName, .search_name #searchName").labeling();
	$(".searchName, .inputName, .search_name #searchName").val(""); //  Firefox 초기화 캐시 제거
};

var commonTab = function() { // Tab
	$(".tab_section>.tab_cont").parent().children(".tab_cont").css("display","none");
	$(".tab_section .tab_cont").parent().find(".tab_cont:first").css("display","block");
	$(".tab_section .tab li").click(function(){ 
		$(this).parent().parent().find(".tab_cont").css("display","none");
		$(this).parent().parent().find(".tab_cont").eq($(this).index()).css("display","block"); 
		$(this).parent().parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
};

var galleryVisual = function() { // galleryVisual
	$(".gallery_box p").parent().children("p").css("display","none");
	$(".gallery_box p").parent().find("p:first").css("display","block");
	$(".gallery_box .control li").hover(function(){ 
		$(this).parent().parent().find("p").css("display","none");
		$(this).parent().parent().find("p").eq($(this).index()).css("display","block"); 
		$(this).parent().parent().find("li").removeClass("on");
		$(this).addClass("on");
	});
};

var boardScroll = function() { // BoardScroll
	$(".board_scroll .list_scroll table").each(function(index){
		// $(this).css('width', $(".board_scroll .list_scroll").width() - 13 );
		if($(this).find("tr").length>6){ // tr의 개수 체크
			$(this).parent().parent().parent().parent().parent().addClass("reSize");
			//$(".board_scroll.reSize .list_scroll table").parent().find("table").css('width', $(".board_scroll .list_scroll").width() - 13 );
		}
	});
	$(".block_scroll ul").each(function(index){
		if($(this).find("li").length>4){ // li의 개수 체크
			$(this).parent().parent().parent().parent().addClass("reSize");
		}
	});
};

var tooltipLayer = function() { // CommonTooltip
	$(".tooltipLayer .layer").hide();
	$(".tooltipLayer").bind("mouseenter", function() {
		$(this).children(".tooltipHover").addClass("on");
		$(this).children(".layer").show();
	}).bind("mouseleave", function(){
		$(this).children(".tooltipHover").removeClass("on");
		$(this).children(".layer").hide();
	});
};

var heightResize = { // Category 
	init : function(){
		var that = this;
		this.wrap = $("#categorybox");
		this.box = $(" > .boxing", this.wrap);
		this.ul = $("> .list", this.box);
		this.dep1 = $("> li", this.ul);
		this.dep1_on = $("> li.on", this.ul);
		this.nav = $("> .nav", this.dep1);
		this.boxHeight = this.box.innerHeight();

		function checkThisBox(){
			var myBox = $('#categorybox .boxing .list li.on .nav');
			var thatBox = $('#categorybox .boxing');

			if(myBox.innerHeight() > thatBox.innerHeight()){
				thatBox.css('height', myBox.innerHeight());
			} else{
				thatBox.css('height', 'auto');
			}
		}

		this.dep1.mouseenter(function(){
			checkThisBox.apply(this);
		});
	}
};

function heightLayer(){ // 0201 카테고리 스크롤링 추가
	$('.depth3type').each(function(){
		var categoryHeight = $("#categorybox .depth3type.nav").height();	
			if(categoryHeight >= 910){
			$(this).find(".block_sub").addClass("mCustomScrollbar");
		}
	    $(".mCustomScrollbar").mCustomScrollbar();	
	});
	$('.depth3type').each(function(){// 배너없을 Case
			if($(this).find('.banner').length == 0){
			$(this).find('.block_sub').addClass('link');
		}
	});
}
var maxHeightResize = function(){ // Max Height Search
	var intTemp = 0;
	{
		$(".order_total_box .box_detail").each(function(){ // 장바구니
			if (intTemp < $(this).height()){
				intTemp = $(this).height();
			}
		}).height(intTemp);
	}
	var intTemp02 = 0;
	{
		$(".order_step .division_step03 .order_total_box dl.sum dd .num").each(function(){ // 주문완료
			if (intTemp02 < $(this).height()){
				intTemp02 = $(this).height();
			}
		}).height(intTemp02);
	}
};

var layerFix = function() { // LayerFix
	$('.layerDim').css('width', $("body").width());
	$('.layerDim').css('height', $("body").height());

	$(".layer_fix").each(function () {
		var left = ( ($(window).width() - $(this).width()) / 2 );
		var top = ( ($(window).height() - $(this).height()) / 2 );

		if(top<0) top = 0;
		if(left<0) left = 0;

		$(this).css({"left":left, "top":top});
	});
	
	$(window).resize(function() {
		$('.layerDim').css('width', $("body").width());
		$('.layerDim').css('height', $("body").height());

		$(".layer_fix").each(function () {
			var left = ( ($(window).width() - $(this).width()) / 2 );
			var top = ( ($(window).height() - $(this).height()) / 2 );

			if(top<0) top = 0;
			if(left<0) left = 0;

			$(this).css({"left":left, "top":top});
		});
	});
};

var layerClose = function() { // LayerClose
	$(".layerArea .btn_close, .layerArea .layerClose, .layer_wrap .btn_close, .layer_wrap .btn_cancel, .layerDim").click(function(e){
		e.preventDefault();
		$(".layer_wrap").hide();
		$(".layerDim").hide().removeAttr("style");
		$("body").removeClass("layerActive layerActiveDim");
		$('body').css('overflow', '');
	});
};

$(function() {
	$(".datepicker").datepicker({ // 달력
		beforeShow: function (input) { 
		//	dpClearButton(input);
			$('#ui-datepicker-div').removeClass('type02');
		}
	});
	function dpClearButton (input) {
		setTimeout(function() {
			$('<button type=button class=clear><span>clear</span></button>').click(function(){
			$.datepicker._clearDate( input );
			}).insertAfter('.ui-datepicker-current.ui-state-default.ui-priority-secondary.ui-corner-all');
		}, 1 );
	}
	$.datepicker._gotoToday = function(id) {
		 $(id).datepicker('setDate', new Date()).datepicker('hide').blur(); 
	};
});

 //레이어 & 툴팁 
function popLayer(){
	var $layerTarget = $('.selectWrap .popact');
	var $modalTarget = $('.popact.eModal');
	var $arertTarget = $('.popact.eModal2');
	var $layer = $('.selectWrap .layerArea');
	var $layerClose = $(".layerClose , .btn_cancel , .btn_close"); 
	$layerTarget.click(function(e){
		var href = $(this).attr('href');
		$layer.hide();
		$(href).show();
		$(".selectWrap").removeClass("selected");
		$(this).parents(".selectWrap").addClass("selected");			
		e.preventDefault();		
	});

	$layerClose.click(function(e){
		$(".layerArea").hide();
		$(this).parent().parent().parent().removeClass("selected");
		$(".dimmed").remove();
		$('body').css('overflow', '');
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

	$(".eTip").bind("mouseenter",function(e){
		var href = $(this).attr('href');
		$layer.hide();
		$(href).show();
		$(".selectWrap").removeClass("selected");
		$(this).parent(".selectWrap").addClass("selected");
	});

	$(".eTip").bind("mouseleave",function(e){
		var href = $(this).attr('href');
		$layer.hide();
		$(".selectWrap").removeClass("selected");
	});
}

$(document).ready(function () {
	$("input[type='checkbox']").ezMark(); // CheckBox
	$("input[type='radio']").ezMark(); // Radio
	$(".scroll-pane").jScrollPane(); // Scrooll
//  selectBase(); // SelectBox
	inputLabeling(); // Labeling
	layerClose(); // LayerClose
	layerFix(); // LayerFix
	tooltipLayer(); // CommonTooltip
	commonTab(); // Tab
	galleryVisual(); // Gallery Visual
	maxHeightResize(); // Max Height Search
	boardScroll(); // BoardScroll
	heightResize.init(); // Category Height Resize
	popLayer(); // 공통레이어팝업

$(".number2").keyup(function(){$(this).val( $(this).val().replace(/[^0-9]/g,"") );} );
	/*
		Gnb
	*/
	$("#gnb ul li").bind("mouseenter", function() { 
		$(this).addClass("on").children(".menu_sub").show();
	}).bind(" mouseleave", function(){
		$(this).removeClass("on").children(".menu_sub").hide();
	});
	/*
		상품카테고리 Nav
	*/
	$("#nav_category").bind("mouseenter", function() {		
		$(this).addClass("active").children("#categorybox").show();
		heightResize.init();
		

	}).bind(" mouseleave", function(){
		$(this).removeClass("active").children("#categorybox").hide();
		heightResize.init();
	});
	
	$("#categorybox .nav").hide(); // Sub Event
	$("#categorybox ul.list>li:first-child .nav").show();
	$("#categorybox ul.list>li").hover(function(){
		heightLayer(); 
		$("#categorybox .nav").css("display","none");
		$("#categorybox .nav").eq($(this).index()).css("display","block");
		$("#categorybox ul.list li").removeClass("on");
		$(this).addClass("on");
	});

	$("#nav_category .close").on("click", function() { // Close
		$(this).parent().hide();
	});
	// 카테고리 배너없을 case
	$('.depth3type').each(function(){
			if($(this).find('.banner').length == 0){
			$(this).find('.block_sub').addClass('link');
		}
	});
	/*
		공급사별 Nav
	*/
	$("#pahrmbox .divder").css("height", $("#pahrmbox .boxing").height());
	$("#pahrmbox .nav ul li").each(function(index){
		if($(this).parent().find("li").length<4){ // li의 개수 체크
			//$(this).parents().find("#pahrmbox ul.list").addClass("heightAuto");
			$(this).parent().parent().parent().parent().parent().addClass("heightAuto")
			$(this).parent().insertBefore(".heightAuto > .scroll-pane");
			$(this).parent().parent().children().remove(".scroll-pane");
		}
	})
	$("#pahrmbox ul.list>li:odd").addClass("odd");
	$("#pahrmbox ul.list>li").mouseenter(function(e){
		var wrap = $("#pahrmbox .scrollBox");
		var y = $(this).position().top;
		var layer = $(this).find(".nav");
		var base = "";

		if(y + layer.height() < wrap.height()){
			base = "top";
			$(this).removeClass("potBottom");
		}else{
			base = "bottom";
			$(this).addClass("potBottom");
		}
		layer.css(base, 0);
		//layer.css('left', $("a", this).width() + 60);
		$("#pahrmbox ul.list>li:nth-child(n+15):nth-child(-n+16)").addClass("spc"); // 운영 시 경우의 수 수정.
		$(this).addClass("on");
		$(".scroll-pane").jScrollPane(".pharm_article");
	});
	$("#pahrmbox ul.list>li").mouseleave(function(e){
		$(this).removeClass("on");
	});

	$(".pharm_article").bind("mouseenter", function() { 
		$(this).addClass("active").children(".pahrmbox").show();
		$(".scroll-pane").jScrollPane(".pharm_article"); // Scrooll
	}).bind(" mouseleave", function(){
		$(this).removeClass("active").children(".pahrmbox").hide();
	});

	$(".pharm_article .close").on("click", function() { // Close
		$(this).parent().hide();
	});

	/*
		상품목록 검색
	*/

	$("#easySearch input").bind('focusin focusout', function() {
		$("#easySearch .easyList").show();
		function body_click(){ //검색레이어 열린 상태에서 바디 클릭 시 레이어 닫힘
			$('body').bind('click', function(e){
				if(!$(e.target).closest('.search_section').length){
					$('.easyList').hide();
				};
			});
			$('.search_section .search .btn_search, .location a').bind('click focus', function(){ // 검색버튼 포커스 or 로케이션에 포커스 되면 레이어 닫힘(탭키 컨트롤)
				$('.easyList').hide();
			});
		}
		body_click();
	});
	/*
		즐겨찾기추가
	*/
	$('#favorite').on('click', function(e) {
		var bookmarkURL = window.location.href;
		var bookmarkTitle = document.title;
		var triggerDefault = false;

		if (window.sidebar && window.sidebar.addPanel) {
			// Firefox version < 23
			window.sidebar.addPanel(bookmarkTitle, bookmarkURL, '');
		} else if ((window.sidebar && (navigator.userAgent.toLowerCase().indexOf('firefox') > -1)) || (window.opera && window.print)) {
			// Firefox version >= 23 and Opera Hotlist
			var $this = $(this);
			$this.attr('href', bookmarkURL);
			$this.attr('title', bookmarkTitle);
			$this.attr('rel', 'sidebar');
			$this.off(e);
			triggerDefault = true;
		} else if (window.external && ('AddFavorite' in window.external)) {
			// IE Favorite
			window.external.AddFavorite(bookmarkURL, bookmarkTitle);
		} else {
			// WebKit - Safari/Chrome
			alert((navigator.userAgent.toLowerCase().indexOf('mac') != -1 ? 'Cmd' : 'Ctrl') + '+D 키를 눌러 즐겨찾기에 등록하실 수 있습니다.');
		}

		return triggerDefault;
	});

	/* 
		Location
	*/
	$("#location ul li.on .nav>.scroll-pane").css('width', $("#location .nav>ul>li>a").width());

	if ( $(".location ul li .nav").length > 0 ) { // Nav Check
		$(".location ul li").find(".nav").parent("li").addClass("active").find("a").attr("title", "펼치기");
	}
	$("#location ul>li.active>a").click(function () { // Click Event
		if ($(this).parent().hasClass("on")){
			$(this).attr("title", "펼치기").parent().removeClass("on").find(".nav").slideUp("fast");
		} else {
			$(this).parent().parent().find("li.on>a").attr("title", "펼치기");
			$(this).parent().parent().find("li").removeClass("on").find(".nav").slideUp("fast");
			$(this).attr("title", "접기").parent().addClass("on").find(".nav").slideDown("fast");
		}
		return false;
	});

	/* 
		카테고리
	*/

	$(".categoryLayer").hide(); // 카테고리
	// $(".category_section>ul>li:nth-child(-n+5)").addClass("fst");
	$(".category_section>ul>li:nth-child(5n+1)").addClass("none");
	$("ul.categoryList>li").mouseover(function () {
		//$(this).parent().find("ul");
		if (!$(this).parent().hasClass("on")) {
			$(this).addClass("on");
			$(this).find(".categoryLayer").show();
		}
	});

	$("ul.categoryList>li").mouseleave(function () {
		//$(this).parent().find("ul");
		$(this).removeClass("on");
		$(this).find(".categoryLayer").hide();
	});

	/*
		Toggle
	*/

	$("#slideToggle dd").hide();  // Slide Toggle
	$("#slideToggle dd:first").show();
	// Click Event 
	$("#slideToggle dt a").click(function(e){
		if ($(this).parent().hasClass("on")){
			$(this).parent().removeClass("on").next("dd:first").slideUp();
			$(this).children('button').attr('title','펼치기').children().text('펼치기');
		} else {
			$(this).parent().parent().find("dt").removeClass("on").next("dd").slideUp('fast');
			$(this).parent().addClass("on").next("dd").slideDown('fast');
			$(this).children('button').attr('title','접기').children().text('접기');
		}
		return false;
	});

	/*
		부가서비스
	*/

	var datepicker_month = { // 달력-년도,월만 존재
		showOn: 'both',
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: '-10:+0', //전체년도 범위설정 'c-10:c+10'
		showOtherMonths: true,
		selectOtherMonths: true
	}
	datepicker_month.onClose = function (dateText, inst) {
		var month = $("#ui-datepicker-div .ui-datepicker-month :selected").val();
		var year = $("#ui-datepicker-div .ui-datepicker-year :selected").val();
		$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
		$(this).datepicker('setDate', new Date(year, month, 1));
	}
	datepicker_month.beforeShow = function () {
		var selectDate = $(".datepicker_month").val().split("-");
		var year = Number(selectDate[0]);
		var month = Number(selectDate[1]) - 1;
		$(this).datepicker( "option", "defaultDate", new Date(year, month, 1) );
	}
	$(".datepicker_month").datepicker(datepicker_month);
	$(".datepicker_month").datepicker("show");
	/*
		마이페이지 캘린더(연, 월 바로 선택 가능)
	*/
	$(".datepicker_type02").datepicker({
		changeMonth: true,
		changeYear: true,
		showButtonPanel: true,
		yearRange: 'c-90:c',
		showOtherMonths: true,
		selectOtherMonths: true,
		beforeShow: function(input){
		//	dpClearButton(input);
			$('#ui-datepicker-div').addClass('type02');
		}
	});
	function dpClearButton(input){
		setTimeout(function(){
			$('<button type=button class=clear><span>clear</span></button>').click(function(){
				$.datepicker._clearDate( input );
			}).insertAfter('.ui-datepicker-current.ui-state-default.ui-priority-secondary.ui-corner-all');
		}, 1);
	}
	// hoverLayerpop (Hover타입)
	var hoverLayerpop = function() {
		$(".hoverLayerpop .layer_wrap").hide();
		$(".hoverLayerpop").bind("mouseenter", function() {
			$(this).children(".layerHover").addClass("on");
			$(this).children(".layer_wrap").show();
		}).bind("mouseleave", function(){
			$(this).children(".layerHover").removeClass("on");
			$(this).children(".layer_wrap").hide();
		});
		$(".hoverLayerpop .btn_close").on("click", function() {
			$(".hoverLayerpop .layer_wrap").hide();
		});
	};
	hoverLayerpop();

});


