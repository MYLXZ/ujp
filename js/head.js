$(function(){
	//app头部二维码	
	$(".download-app").on("mouseenter",function(){
        $(".download-app div").show();
    });   
     $(".download-app").on("mouseleave",function(){
        $(".download-app div").hide();
    });   
    //app尾部二维码
     $(".weichat").on("mouseenter",function(){
        $(".weichat div").show();
    });   
     $(".weichat").on("mouseleave",function(){
        $(".weichat div").hide();
    });   
//下拉菜单部分
	var p = null;
	$("#nav-bar>ul>li").hover(function(){
            $(this).addClass("on").siblings().removeClass("on");
            if($(this).hasClass("brand")){
                $("#nav-bar-cont").hide();
                $(this).children("p").fadeIn("400").end().siblings().children("p").hide();
                return false;
            }
            $("#nav-bar-cont").slideDown(400);
            $(this).children("ol").clone().appendTo($("#nav-bar-cont").empty());
            $(this).children("p").fadeIn("400").end().siblings().children("p").hide();
        },function(){
            // $(this).children("p").fadeOut("400");
            // $(this).removeClass("on");
        })
	$("#nav-bar").hover(function(){
            clearTimeout(p);
            // $("#nav_bar_cont").slideDown(600);
        },function(e){
            var event=e || window.event;
            clearTimeout(p);
            p=setTimeout(function(){
                $("#nav-bar-cont").slideUp(600,function(){
                    $("#nav-bar").find("li").removeClass("on");
                    $("#nav-bar>ul>li p").hide();
                });
            },400)
    })
//点击搜索显示输入框
    $("#search-box").on("click",function(){
        if(!$(this).find("p").is(":animated") && $(this).find("p").css("width")=="200px"){
            // $(this).find("p").css("border-bottom","1px solid #CBCAC8");
            $(this).find("p").stop().animate({"width":300},400,function(){
                $("#hot-list").show();
                $("#search-box").css("background","white");
            });
            $(this).find("input").css("display","inline-block");
            $(this).find("input").animate({"width":270},400,function(){
            	$(this).focus();
            });
        }else{
            return false;
            
        }
        // $(this).find("input").animate({"width":120},600);
    })
//点击页面除搜索框以外的地方，隐藏搜索框
    $(document).on("click",function(e){
        var event=e || window.event,
            tar=$(event.target);
        if($("#search-word").css("width")=="270px" && tar.attr("id")!="search-box" && tar.attr("id")!="search" && tar.attr("id")!="search-word"){
            $("#search-word").val("");
            $("#search-word").stop().animate({"width":170},400);
            $("#search-word").parent().animate({"width":200},400,function(){
                // $(this).css("border-bottom","none");
                $("#search-word").blur().val("");
                $("#search-box").css("background","#F8F8F8");
            });
            $("#search-box em").animate({"width":0},400);
        };
    })
    //点击搜索
    $("#search-box").on("click",function(){
        console.log(111);
    })
    /*$("#shopping_bag").on("mouseenter",function(){
        
    })*/
    //
    W=$(window).width();
    $("#nav-bar>li>ol").css("width",W)
//nav滚动
		$(window).on("scroll",function(){
			var _scrollTop = $(this).scrollTop();
			// console.log(_scrollTop)
			//获取nav前布局结构的高度
			var _top = $(".header-container").offset().top;
			console.log(_top)
			//判断head的位置
			if(_scrollTop>_top){
				$(".nav-bar-container").css({"position":"fixed","top":"0px"});
				$(".scroll-shop").show()
				$("#web-im-kf").hide()
			}
			else{
				$(".nav-bar-container").css({"position":"fixed","top":"71px"});
				$(".scroll-shop").hide()
				$("#web-im-kf").show()
			}

		});
})
