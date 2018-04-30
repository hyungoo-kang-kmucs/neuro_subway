//선택 메뉴 아이디
var $$MENU_ID = '';
//선택 메뉴 Path
var $$MENU_FULL_PATH = '';

/**
 * GNB 로딩시 작업
 */
$('div.navi').ready(function(){
    if ($$MENU_FULL_PATH != undefined && $$MENU_FULL_PATH != ''){
        var depth = $$MENU_FULL_PATH.split('-');        
        
        for(var i = 0; i < depth.length; i++){
            $('.gnb-'+depth[i]).addClass('on');
        }
        
        if(!$('div.navi > ul > li > div').hasClass('on')){
            $('div.navi > ul > li > div').hide();  
        }
    }
});
wSize();   

$(document).ready(function() {   
 
	/*
	 * GNB
	 */
    $('.sec-depth li a img').each( function () {
        var haslist = $(this).parent().parent().parent().parent().children('a').find('img').attr('src');
        var ano = $(this).attr('src');
        if (haslist.match(ano)) {
            var copy = $(this).parent().parent().clone();
            var par = $(this).parent().parent().parent();
            $(this).parent().parent().remove();
            copy.prependTo(par);
        }
    });
	$('.navi>ul>li>a').on("mouseover focus", function(){
			$('.navi ul li div').removeClass('z-index');
			$('.navi>ul>li>a').removeClass('over');
			$(this).addClass('over');
			$(this).next('div').addClass('z-index');
	});
	
	/* sub-header-size */
    if(!$('body').hasClass('main')){
        var subHeader = $('#header').height();
        var gnbSubH = $('.navi ul li div ul').height();
        var totalSubH = subHeader + gnbSubH;
        $('#header').css({'height':totalSubH});
        var offset = $("#depth3").offset();
    };    

	$('#sub-container').mouseover(function(){
		$('.navi ul li div').removeClass('z-index');
		$('.navi>ul>li>a').removeClass('over');
	});

	//utile
	$(".familysite li a").on({
	  click: function(){$('.familysite li.depth2').toggle('fast');}
	 //focus: function(){$('.familysite li.depth2').fadeIn('fast');}
	});
	
	$('.familysite li.menu-4 a').on({
		//mouseleave: function(){$('.familysite li.depth2').fadeOut(100);},
		blur: function(){$('.familysite li.depth2').fadeOut(100);}
	});

	/*
	 * LANGUAGE
	 */
	$('#langWrap').on({
		click: function(){$(this).children('ul').toggle();
    		if($(this).children('a').hasClass('on')){
    			$(this).children('a').removeClass('on');
    		}else{
    			$(this).children('a').addClass('on');
    			return false;
    		}
		}
	});
	
	$('#langWrap ul li:nth-child(2) a').blur(function(){
		$("#langWrap ul").hide();
		$(this).parent().parent().prev('a').removeClass('on');
	});
	
	/*
	 * WEATHER
	 */
	$(".weather").on({
		click: function(){$('.weather ul').toggle();}
	});
	$('.weather a.view').blur(function(){
		$('.weather ul').hide();
	});
	
	wSize();
	/* contents */
	$(window).resize(function(){
		wSize();
	});
	
    /*
     * BREADCRUMB FOLLOW
     */
    $(window).scroll(function(){
        var winTop = $(window).scrollTop();
        if($('body').hasClass("main")){
            // main gnb fix
            /*
            if (winTop >= 608) {
                $('#utiles-wrap').stop().animate({"top":winTop}, 1000);
                $('.navi').appendTo('#utiles-wrap');
                $('.navi').addClass('positionEx');
                $('#main-content').addClass('padding-top');
            } else if (winTop < 608) {
                $('.navi').removeClass('positionEx');
                $('#main-content').removeClass('padding-top');
                $('#utiles-wrap').stop().animate({"top":winTop}, 1000);
                $('.navi').prependTo('#main-content');         
            }
            */
        }else{
            // sub breadcrumb fixed
            if (offset != undefined) {
                var offsetTop = offset.top;
                if(400 <= winTop){
                    $("#depth3").addClass('fixedbread');
                    //$("#depth3").addClass('absolute');
                    //$("#depth3").stop().animate({"top":winTop - 44}, 'fast');
                }else if(offsetTop >= winTop){
                    $("#depth3").removeClass('fixedbread');
                    //$("#depth3").removeClass('absolute');
                    //$("#depth3").stop().animate({"top":winTop - 44}, 0);
                    //$("#depth3").attr('style','');
                }
            }
        }
    });

    /*
     * BREADCRUMB
     */
/*    
	$('.breadcrumb .has-list').mouseover(function(){
		$('.sec-depth').hide();
		$(this).children('.sec-depth').show();
	});
    $('.breadcrumb > .has-list > .sec-depth').mouseleave(function(){
        $(this).hide();
    });

    */
    
    /* 여기가 아마도 오버랩되는거 페이드인페이드아웃*/
    $('#yearbox .breadcrumb .has-list').hover(
       function(){
           $('.sec-depth').hide();
           $('.sub-container').attr("style","min-height:1200px");
           $('.sub-container .content').attr("style","height:1200px");
           $(this).attr("style","background:url('img/hr/jeju/images/common/arrow_rev.png') 100px center no-repeat; background-size:10px 10px");
           $(this).children('.sec-depth').stop().delay(100).slideDown(0);
        },function(){
            $('.sub-container .content').attr("style","height:45px"); 
            $(this).children('.sec-depth').stop().slideUp(200);
            $(this).attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 100px center no-repeat; background-size:10px 10px");
            $('.sub-container').attr("style","min-height:45px");

                  
    });

    $('#monthbox .breadcrumb .has-list').hover(
        function(){
            $('.sec-depth').hide();
            $('.sub-container').attr("style","min-height:1200px");
            $('.sub-container .content').attr("style","height:1200px");
            $(this).attr("style","background:url('img/hr/jeju/images/common/arrow_rev.png') 80px center no-repeat; background-size:10px 10px");
            $(this).children('.sec-depth').stop().delay(100).slideDown(0);
         },function(){
             $('.sub-container .content').attr("style","height:45px"); 
             $(this).children('.sec-depth').stop().slideUp(200);
             $(this).attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 80px center no-repeat; background-size:10px 10px");
             $('.sub-container').attr("style","min-height:45px");
 
                   
     });

     $('#datebox .breadcrumb .has-list').hover(
        function(){
            $('.sec-depth').hide();
            $('.sub-container').attr("style","min-height:1200px");
            $('.sub-container .content').attr("style","height:1200px");
            $(this).attr("style","background:url('img/hr/jeju/images/common/arrow_rev.png') 75px center no-repeat; background-size:10px 10px");
            $(this).children('.sec-depth').stop().delay(100).slideDown(0);
         },function(){
            $('.sub-container .content').attr("style","height:45px"); 
            $(this).children('.sec-depth').stop().slideUp(200);
            $(this).attr("style","background:url('img/hr/jeju/images/common/list-ico.gif_modified_arrow.png') 75px center no-repeat; background-size:10px 10px");
            $('.sub-container').attr("style","min-height:45px");
 
                   
     });

    $('.breadcrumb .has-list a').focus(function(){
        $(this).next('.sec-depth').show();
    });
    $('.breadcrumb .sec-depth li:last-child a').blur(function(){
        $('.sec-depth').hide();
    });    
    $('.breadcrumb > .has-list > .sec-depth').mouseleave(function(){
        //$(this).hide();
    });
    $('.breadcrumb .has-list a').focus(function(){
        //$(this).next('.sec-depth').show();
    });
    $('.breadcrumb .sec-depth li:last-child a').blur(function(){
        //$('.sec-depth').hide();
    });    

	
     $(".sec-depth a").hover(
        //   function(){
		// 		$(this).children().attr("src",$(this).find("img").attr("src").replace("_off","_on"));
		// 	},
		// 	function(){
		// 		$(this).children().attr("src",$(this).find("img").attr("src").replace("_on","_off"));
    //  }
    );

	$('#share a').click(function(){
		$('#sns').toggle();
	});

	

	/* print */
	$('li.print a').click(function(){
	       $(".print-layer").toggleClass("on");
           $(".print-layer .print-close").click(function(){
               $(".print-layer").removeClass("on");
           });	       
	});
	
	$(".package-cont .cont dl").click(function(){
		var url = $(this).children().find("a").attr("href");
		location.href = url;
	});

	//email-layer
	$('#contents, #main-content').after($('#email-layer'));

	// login
	$('ul#pw-list input, #pw-change input, #login-1 input, #login-2 input, #login-3 input, #my-info-pw input').on("click focus",function(){
		$(this).attr('class','');
	});

	//location-toggle
	$('div.toggle dt a').click(function(){
		$(this).parent().next('dd').toggle();
		$(this).parent().children().children('span').toggleClass('on');
		return false;
	});


	// reservation tab
	$(".reservation-tab h3 a").click(function(){
		$(".reservation-tab h3").removeClass("on");
		$(this).parent().addClass("on");
	});
	
    /* gallery */
    jQuery.fn.gallery = function(){       
        $(".thumb li:first-child").addClass('first');
        var ViewEl = $(this).find(".View li");
        var MovieEl = $(this).find(".View li.youtube");
        var ThumEl = $(this).find(".thumb li");
        var thumOn = $(this).find(".thumb li.on");
        var ThumIndex = $(this).find(".thumb li").length;
        var PrevBt = $(this).find(".arrow-left, .layer-left");
        var NextBt = $(this).find(".arrow-right, .layer-right");
        var SizeEl = $(ViewEl).not(".non-img").length;
        var noneImg = $(this).find(".thumb li.non-img").length;
        
        // if thumb img 1EA
        if(noneImg > 3){
            return false;
        }else{
            $(".gallery-wrap>a").mouseover(function(){
                $("a.arrow-left, a.arrow-right").addClass('on');
            });
            $(".gallery-wrap>a").mouseout(function(){
                $("a.arrow-left, a.arrow-right").removeClass('on');
            });
        }
        $(ViewEl).hide().filter(".on").fadeIn();
        
        $(ThumEl).each(function(){
            if($(this).hasClass('youtube')){
                $(this).find('a').append('<span></span>')                
            }
        });
        $(ThumEl).find("a").on({
            click : function(event){
                var youtube = $(this).attr('href');
                var evEl = $(this).parent(); // thumb li
                var next = $(evEl).index(); // thumb li index                
                if(evEl.hasClass('youtube')){
                    MovieEl.find('iframe').attr('src',youtube);
                }else{
                    MovieEl.find('iframe').attr('src',"");                    
                }
                
                $(ViewEl).filter(".on").removeClass("on").fadeOut().addBack().eq(next).addClass("on").fadeIn();
                $(evEl).addClass("on").siblings().removeClass("on");
                $(PrevBt).show();
                $(NextBt).show();
                return false;
            }
        });
        $(PrevBt).on({
            click : function(event){  
                event.preventDefault();     
                var thumbEl = $(".thumb li");
                var thumbli = $(".thumb li.on").prev();
                var test = $(".thumb li.non-img").eq(0);
                if($(thumbEl).eq(0).hasClass('on')){
                    if($(".thumb li:last-child").hasClass("non-img")){
                        $(test).prev().find("a").click();
                        return false;
                    }
                    $(".thumb li:last-child a").click();
                    return false;

                }else{
                    $(ThumEl).filter(".on").prev().find("a").click();
                    return false;
                }
            }
        });
        $(NextBt).on({
            click : function(event){  
                event.preventDefault(); 
                var thumbEl = $(".thumb li");
                var thumbli = $(".thumb li.on").next();
                if($(thumbli).hasClass("non-img")){
                    $(".thumb li.first a").click();
                    return false;
                }else if($(thumbEl).eq(3).hasClass("on")){
                    $(".thumb li.first a").click();
                    return false;
                }else{
                    $(ThumEl).filter(".on").next().find("a").click();
                    return false;
                }
            }
        });
    };
    
    /* main */
    $(".position-main-arrow").hover(
        function(){
            $(".position-main-arrow a").addClass("on");
        },
        function(){
            $(".position-main-arrow a").removeClass("on");
        }
     );    
    $('.visual-image ul li').show();
    jQuery.fn.mainVisual = function(){
        var visualEl = $('.visual-image > ul > li');
        var visualIndex = $('.visual-image ul li.on').index();
        var visualLength = visualEl.length;
        var markerWrap = '<div class="visual-marker"></div>';
        var markerEl = '<a href="#"></a>';
        var marker = $('.visual-marker');
        var btnL = $('.main-arrow-l');
        var btnR = $('.main-arrow-r');

        $(visualEl).hide().filter(".on").fadeIn(1000);
        $('.visual-image').append(markerWrap);
        for(i=1; i<=visualLength; i++){
            $('.visual-marker').append(markerEl);
        };
        $('.visual-marker a').eq(visualIndex).addClass('on');
        $('.visual-marker').children('a').click(function(){
            movieStop();
            var index = $(this).index();
            var indexOn = $('.visual-marker a.on').index();
            $('.visual-marker a').removeClass('on');
            $(this).addClass('on');
            $(visualEl).removeClass('on');
            $(visualEl).eq(index).addClass('on');
            $(visualEl).fadeOut(700).filter(".on").fadeIn(1000);
            return false;
        });
        $(btnR).click(function(){
            var firstChild = $('.visual-marker a:first-child');
            var markerOn = $('.visual-marker a.on');
            var visualEl = $('.visual-image ul li');
            var marker = $('.visual-marker');
            if($('.visual-image ul li:last-child').hasClass('on')){
                $(markerOn).removeClass('on');
                $(firstChild).addClass('on');
            }
            $(markerOn).next().addClass('on').prev().removeClass('on');
            $('.visual-marker a.on').click();
            return false;
        });
        $(btnL).click(function(){
            var lastChild = $('.visual-marker a:last-child');
            var markerOn = $('.visual-marker a.on');
            var visualEl = $('.visual-image ul li');
            var marker = $('.visual-marker');
            if($('.visual-image ul li:first-child').hasClass('on')){
                $(markerOn).removeClass('on');
                $(lastChild).addClass('on');
            }
            $(markerOn).prev().addClass('on').next().removeClass('on');
            $('.visual-marker a.on').click();
            return false;
        });
    };
    // //top-btn 추가
    // $("#footer").before("<a href='#skipnavition' class='top-go'><img src='/img/hr/jeju/images/common/top-go.gif' alt='맨위로 이동' /></a> ");
    // $(window).scroll(function(){
    //     var winTop = $(window).scrollTop();
    //     if(!$('body').hasClass("main")){
    //         if(winTop >= 100){
    //             $(".top-go").fadeIn();
    //         }else if(winTop >= 0){
    //             $(".top-go").fadeOut();
    //         }
    //     }
    // });
    // location
    $(".map-wrap ul li a").click(function(){
        var listId = $(this).attr("id");
        $(".map-wrap ul li a").removeClass("on");
        $(this).addClass("on");
        $("#view-map img").removeClass("on");
        $("img" +"." +  listId).addClass("on");  
        return false;
    });
    $("div.window").addClass("ms-filter");
    $("#layer-gallery").removeClass("ms-filter").addClass("shadow-htc");
    
    $(".re-fresh").click(function(){
       location.reload(); 
    });
    
   
    
});

//채용가이드 팝업
function guidePop(){
    window.open( loginObj.pagePath + '/common/pop/recruitPMan.hvc','guidePop','width=890,height=446,scrollbars=yes,resizable=no');
}

//popup-zipcode
function zipPop(){
	window.open('/kr/html/zip-pop.html', 'zipPop', 'width=740,height=724,scrollbars=yes,resizable=no');
	return false;
}

function wSize(){
    var wWidth = $(window).width();
    if(wWidth<1200){
        $('#footer, #wrap').css({"width":"1200px"});
        $('#contents').addClass('sub-contents');
        $("#utiles-wrap, .navi").addClass('default');
    }else{
        $('#contents').removeClass('sub-contents');
        $('#footer, #wrap').css({"width":"100%"});
        $("#utiles-wrap, .navi").removeClass('default');
    }
}

function brPrint(){
    window.print();
    location.reload();
}

function resPrint(){
    window.print();
}