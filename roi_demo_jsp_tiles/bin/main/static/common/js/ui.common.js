function initTabOnce(){	 //Panel Tab 정의
		        $(document)
                .on('click', 'ul.tabs>li', function (e) {
                    var $current = $(this);
                    var index = $current.index();
                    var $panels = $current.parent().siblings('.panels');
                    var cls = $current.attr('class').match(/tc[0-9]*/)[0];
                    $current.addClass(cls + '_selected').siblings().removeClass(cls + '_selected');
                    var $target = $panels.find('>.' + cls + '_panel:eq(' + index + ')');
                    $target.addClass(cls + '_selected').siblings().removeClass(cls + '_selected');
                    if($current.parents().hasClass('quick_panel')){
                        $('.quick_panel').addClass('on');
                        $('.quick_panel').find('.btn_toggle').addClass('on');
                        $('.quick_panel').find('.btn_toggle').find('>span').text('닫기');
						$("body").addClass("layerActive");
                    }
                    e.stopPropagation();
                    e.preventDefault();
                })
                .on('click', '.tabLinkWrap li a', function (e){
                    if($(this).hasClass('on')){
                        $('.tabLinkWrap li a').removeClass('on');

                    } else {
                        $('.tabLinkWrap li a').removeClass('on');
                        $(this).addClass('on');
                    }
                });
        }
function initQuickOnce(){	  //Panel 
            var $btn = $('.quick_panel').find('.btn_toggle');
            $(document)
                .on('quickShow','.quick_panel', function(){
                    $(this).addClass('on');
                    $btn.addClass('on');
                    $btn.find('>span').text('닫기');
					$("body").addClass("layerActive");
                })
                .on('quickHide','.quick_panel', function(){
                    $(this).removeClass('on');
                    $btn.removeClass('on');
                    $btn.find('>span').text('열기');
					$("body").removeClass("layerActive");

                })
                .on('click','.quick_panel .btn_toggle', function(e){
					e.preventDefault();
                    var $obj = $(this);
                    if($obj.hasClass('on')){
                        $obj.trigger('quickHide');
                    } else {
                        $obj.trigger('quickShow');
                    }
                });
            }

function selectLayer(){  // 공통 - select layer
	$('.select_wrap').on('mouseenter', function(){
		$('#content .sub_contents').css('overflow','inherit');
		if($(this).hasClass('open')){
			selectClose();
		}else{
			$(this).addClass('open')
			$(this).find('.select_layer').show();
		}		
	});
	
	$('.select_wrap').on('mouseleave', function(){
		selectClose();
	});
	function selectClose(){
		$('.select_wrap').removeClass('open')
		$('.select_layer').hide();
	}

	// 우측 panel 단골공급사
	$(".quick_panel .pn_list li dl.ui_fav dt .select_wrap").mouseover(function(){
		if ($(this).parent().parent().parent().is(':first-child')){
			$(this).removeClass("potBottom");
		} else if  ($(this).parent().parent().parent().is(':last-child')){
			$(this).addClass("potBottom");
		}
	});
}
function mainRolling(){ //메인 롤링  1104수정
		var slider_big = $('.rolling_area .visual_wp').bxSlider({
			mode:'fade', auto: true, autoControls:true, controls:false, autoHover:false ,pause:5000, pagerCustom:'.visual_nav', speed:100
		});
		$('#ad_best').bxSlider({ mode : 'horizontal', pager:true, controls:false, auto : false, autoHover: true , infiniteLoop: true, }); // 세일존-베스트
		$('#ad_season').bxSlider({ mode : 'horizontal', pager:true, controls:false, auto : false, autoHover: true , infiniteLoop: true, }); // 세일존 - 시즌 
		//$('#ad_event').bxSlider({ mode : 'horizontal', pager:false, controls:true, auto : false, infiniteLoop: false, }); // 띠배너
		
		var ad_event_length = $('#ad_event .slide').length;		
		if(ad_event_length != null && ad_event_length != '' && ad_event_length > 1 ){
			var slider_big = $('#ad_event').bxSlider({
				mode:'vertical', auto: true, autoControls:true, controls:false, autoHover:true ,pause:3000, speed:500
			});
		}else{
			$('#ad_event').bxSlider({ mode : 'horizontal', pager:false, controls:true, auto : false, infiniteLoop: false, }); // 띠배너
		}		
		
		$('.visual_nav').on("mouseover", function(e){ 
		//slider_big.stopAuto();
		});
		$('.visual_nav').on("mouseout", function(e){ 
			slider_big.startAuto();
		});
		$('.visual_nav a , .bx-pager').on("click", function(e){	
			slider_big.startAuto();
			return false;
		});
		var lengthM = $('#ad_event > .slide').size();		
		if(lengthM == 1){
			$('.bx-controls-direction').hide();
		}else {			
			$('.bx-controls-direction').show();
		}
}

function faq(){
	var article = $('.faq_list .article');
			article.addClass('none');
			article.find('.answer').slideUp(100);
			
			$('.faq_list .article .trigger').click(function(){
				var others = $(this).parents('.article:first');
				if(others.hasClass('none')){
					article.addClass('none').removeClass('show'); //  아코디언 삭제
					article.find('.answer').slideUp(100); // 아코디언 삭제
					$(this).parents().find(".none").find("button").removeClass("btn_up ").addClass("btn_down").attr("title", "펼치기").children().text("펼치기");
					others.removeClass('none').addClass('show');
					others.find('.answer').slideDown(100);
					$(this).parents().find(".show").find("button").removeClass("btn_down").addClass("btn_up").attr("title", "접기").children().text("접기");

				} else {
					others.removeClass('show').addClass('none');
					others.find('.answer').slideUp(100);
					$(this).parents().find(".none").find("button").removeClass("btn_up").addClass("btn_down").attr("title", "펼치기").children().text("펼치기");
				}
			});
}

// 통합검색결과 공급사 레이어
function supply_layer(){
	$('.totalSearch .supply_box').on('mouseenter', function(){
		$('.totalSearch .supply_list').hide();
		$(this).children('.supply_list').show();
	});
	$('.totalSearch .supply_box').on('mouseleave', function(){
		$('.totalSearch .supply_list').hide();
	});
}

// Layer  Toggle 
function toggle_display(obj){
	var obj = document.getElementById(obj);
	if(obj.style.display == 'none'){
		obj.style.display = 'block';
	}else {
		obj.style.display = 'none';
		return false;
	}
}

 $(document).ready(function(){
	mainRolling();
	initTabOnce();
	initQuickOnce();
	selectLayer();
	searchLayer();
	popLayer();
	supply_layer();
});
	
//Main Start

	 //Tab Product
	var mainTabProduct = function() {
		$(".pr_section .tap_con").css("display","none");
		$(".pr_section .tap_con:first").css("display","block");
		$(".pr_section .tap_menu ul li").on("click mouseover", function(){
			$(".pr_section .tap_con").css("display","none");
			$(".pr_section .tap_con").eq($(this).index()).css("display","block"); 
			$(".pr_section .tap_menu ul li").removeClass("on");
			$(this).addClass("on");
		});
	};
	mainTabProduct();

	 //Tab News
	var mainTabNews = function() {
		$(".ph_notice .tap_con").css("display","none");
		$(".ph_notice .tap_con:first").css("display","block");
		$(".ph_notice .tap_menu ul li").on("click mouseover", function(){
			$(".ph_notice .tap_con").css("display","none");
			$(".ph_notice .tap_con").eq($(this).index()).css("display","block"); 
			$(".ph_notice .tap_menu ul li").removeClass("on");
			$(this).addClass("on");
		});
	};
	mainTabNews();


/*
function mainpopOpen(){// 메인팝업 열기
	$("body").append("<div class='dimmed'></div>");
	$(".dimmed").css({
		"height":($(document).height())+'px',
		 "opacity":0.7
	});
	$('#mainpop_wrap').show();
	mainpopPos();

	$('#mainpop_wrap').animate({
		'opacity':1
	},800);
}
*/

function mainpopPos(){ // 메인팝업 포지션
	$("#mainpop_wrap ").each(function () {
		var size = $('.mainpop_banner li').size();
		var padding = 23*(size-1);
		var con_w = ($('.mainpop_banner li').width() * size) + padding;
		$('.mainpop_banner').css('width' , con_w);
		$(this).css('width' , con_w+14);

		var left = ( ($(window).width() - $(this).width()) / 2 );
		var top = ( ($(window).height() - $(this).height()) / 2 );
		if(top<0) top = 0;
		if(left<0) left = 0;
		$(this).css({"left":left, "top":top});
	});
}

function mainpopClose(){// 메인팝업 닫기
	$(".dimmed").remove();
	$('#mainpop_wrap').hide();
}
//Main End
	
//GNB
$(".top_banner .btn_close_layer01").on("click", function(){
	$('.top_banner').animate({height: 0}, 500);
});

function tick(){ // Hot 랭킹 티커
	$('#ranking li:first').slideUp( function () { $(this).appendTo($('#ranking')).slideDown(); });
}setInterval(function(){ tick () }, 5000);

$('.rank_article').on('mouseenter', function(){
	$(this).addClass('open').find('.list_rank_on').stop(true,true).animate({
		height: 421
	},400);
});
$('.rank_article').on('mouseleave', function(){
	$(this).removeClass('open').find('.list_rank_on').stop(true,true).animate({
		height: 0
	},400);
});

$(window).resize(function() {
	$('.quick_panel .panels .area').height($(window).height() - 40);
});
$(window).trigger('resize');

function weatherTab(){
	var tabWrap = $(".l_weather_box__tab-wrap");
	var tabList = $(" > ul > li", tabWrap);
	var tabBtn = $(" > a", tabList);
	var mapContents = $(".l_weather_box__map-wrap__contents");
	var temp = 0;

	tabBtn.on("click", function(e){
		e.preventDefault();;
		temp = $(this).parent().index();
		if(temp == 0){
			tabList.removeClass("on");
			$(this).parent().addClass("on");
			mapContents.eq(0).show();
			mapContents.eq(1).hide();

		} else if (temp == 1){
			tabList.removeClass("on");
			$(this).parent().addClass("on");
			mapContents.eq(0).hide();
			mapContents.eq(1).show();
		}
	});
}

function weatherTabReload(idx){

	if(idx ==0) {
	
		$("#weather_day_1").addClass("on");
		
		for(i=2; i<=7; i++){
			$("#weather_day_"+i).removeClass("on");
			$("#weather_day_"+i).unbind("click");
		}
	} else if (idx == -1) {
			
		$("#weather_day_1").addClass("on");
		
		for(i=2; i<=7; i++){
			$("#weather_day_"+i).removeClass("on");
			$("#weather_day_"+i).bind("click");
		}
		dateFunction();
	}
}

function countryList(){
	var btn = $("[data-weather-tab='btn']");
	var dept2List =$(".select_area__dept2 > li");
	var dept2Btn =$("> a", dept2List);

	dept2Btn.on("click",function(){
		$(this).closest(".select_area__dept2").hide();
		$(this).closest(".select_area__dept2").siblings("[data-weather-tab='btn']").text($(this).text())
	})
	btn.on("click", function(){
		toggleNext($(this));
	});

	function toggleNext(me){
		if(me.next(".select_area__dept2").is(":visible") ===true){
			me.next(".select_area__dept2").hide();
		} else{
			me.next(".select_area__dept2").show();
		}
	}
}

function lastDept2Btn(){
	var lastDept2Btn = $(".select_area > ul > li:last-child");
	lastDept2Btn.on("click",function(){
		$(this).closest(".select_area__dept2").hide();
		$(this).closest(".select_area__dept2").siblings("[data-weather-tab='btn']").text($(this).text())
	})
}

function lastDept2BtnReload(){
	var lastDept2Btn = $(".select_area > ul > li:last-child > ul > li");
	lastDept2Btn.on("click",function(){
		$(this).closest(".select_area__dept2").hide();
		$(this).closest(".select_area__dept2").siblings("[data-weather-tab='btn']").text($(this).text())
	})
}

function dateFunction(){
	var dateWrap = $(".date");
	var dateList = $("> ul > li",dateWrap);
	dateList.on("click", function(){
		dateList.removeClass("prev");
		dateList.removeClass("on");
		$(this).prev().addClass("prev");
		$(this).addClass("on");
	})
}
weatherTab();
lastDept2Btn();
countryList();
dateFunction();