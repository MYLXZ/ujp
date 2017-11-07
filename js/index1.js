;(function($){ $(document).ready(function(){
	function setH(){
		var H=$("#focusImg_ul").find("img").width()/4.5;
		$("#focusImg_ul").find("img").css("height",H)
		$("#focusImg_ul").height(H);
		$(".focusImg").height(H);
		$(".focusImg_main").height(H);
	}
	// setH();
	var num=$('.focusImg_span span').length;
	var i_mun=0;
	var timer_banner=null;

	$('.focusImg_ul li:gt(0)').hide();//页面加载隐藏所有的li 除了第一个
	
//底下小图标点击切换
	$('.focusImg_span span').click(function(){
		$(this).addClass('focusImg_span_one')
			   .siblings('span').removeClass('focusImg_span_one');
		var i_mun1=$('.focusImg_span span').index(this);
		$('.focusImg_ul li').eq(i_mun1).fadeIn('slow')
			                   .siblings('li').fadeOut('slow');

		i_mun=i_mun1;
	});
	
//左边箭头点击时切换
	$('.focusImg_left').click(function(){
		if(i_mun==0){
			i_mun=num
		}
		//大图切换
		$('.focusImg_ul li').eq(i_mun-1).fadeIn('slow')
								   .siblings('li').fadeOut('slow');
		//小图切换
		$('.focusImg_span span').eq(i_mun-1).addClass('focusImg_span_one')
				   .siblings('span').removeClass('focusImg_span_one');

		i_mun--
	});

	//左边按钮移动到其上时更换背景图片
    $('.focusImg_left').mouseover(function(){
		
		$('.focusImg_left').addClass('focusImg_left1');
	});

	//左边按钮移动到其上时还原背景图片
	$('.focusImg_left').mouseout(function(){
		$('.focusImg_left').removeClass('focusImg_left1');
	});

//右边箭头点击时切换
	$('.focusImg_right').click(function(){
		move_banner()
		
	});

	//右边按钮移动到其上时更换背景图片
/*	$('.focusImg_right').mouseover(function(){
		
		$('.focusImg_right').addClass('focusImg_right1');
	});*/

	//右边按钮移动到其上时更换背景图片
/*	$('.focusImg_right').mouseout(function(){
		
		$('.focusImg_right').removeClass('focusImg_right1');
	});
	*/
//鼠标移动到幻灯片上时 显示左右切换案例
	$('.focusImg').mouseover(function(){
		$('.focusImg_left').show();
		$('.focusImg_right').show();
	});

//鼠标离开幻灯片上时 隐藏左右切换案例
	$('.focusImg').mouseout(function(){
		$('.focusImg_left').hide();
		$('.focusImg_right').hide();
	});
	
	//自动播放函数
	function bannerMoveks(){
		timer_banner=setInterval(function(){
			move_banner()
		},3000)
	};
	bannerMoveks();//开始自动播放

	//鼠标移动到banner上时停止播放
	$('.focusImg').mouseover(function(){
		clearInterval(timer_banner);
	});

	//鼠标离开 banner 开启定时播放
	$('.focusImg').mouseout(function(){
		bannerMoveks();
	});
//banner 右边点击执行函数
   function move_banner(){
			if(i_mun==num-1){
				i_mun=-1
			}
			//大图切换
			$('.focusImg_ul li').eq(i_mun+1).fadeIn('slow')
									   .siblings('li').fadeOut('slow');
			//小图切换
			$('.focusImg_span span').eq(i_mun+1).addClass('focusImg_span_one')
					   .siblings('span').removeClass('focusImg_span_one');

			i_mun++
		
		}
//滑过商品显示蒙层
$(".goods_list").hovermask();
//首页秒杀倒计时
function seckill_tick(){
	var time=$("#seckill_time").data("seckill");
	if(!time)return false;
	var t=setInterval(function(){
                time--;
                h=parseInt(time/60/60)<10 ? "0"+parseInt(time/60/60) : parseInt(time/60/60);
                var sT = time%3600;
                m=parseInt(sT/60)<10 ? "0"+parseInt(sT/60) :  parseInt(sT/60);
                    sT = sT%60;
                var s=parseInt(sT)<10 ? "0"+parseInt(sT) : parseInt(sT);
				$("#seckill_time>p>span").eq(0).html(h);
				$("#seckill_time>p>span").eq(1).html(m);
				$("#seckill_time>p>span").eq(2).html(s);
                if(time<=0){
                    clearInterval(t);
                    location.reload();
                }
            },1000);
}
seckill_tick();
//下拉加载更多
/*var loadurl=window.location.pathname;
loadMore($("#goods_list"),300,loadurl,success,"get","","activity");
//加载更多成功后的回掉函数
function success(result){
    console.log(result);
    var str="";
    if(result.status_code==200){
        str=result.data.content;
    }
    $("#goods_list").append($(str));
    $(".loading").remove();
    //滑过显示蒙层
    $("#goods_list").hovermask();
    //图片懒加载
    $("img.lazy").lazyload();
    if(result.data.content!==""){
        return true;
    }else{
        return false;
    }
}*/
/*function success(result){
	console.log(result);
	var n=result.pagesNum.page ? (result.pagesNum.page-2)*20 : (result.pagesNum.offset-20);
	var str="";
	if(result.status_code==200){
		$.each(result.data,function(i,obj){
			n++;
			if(i%5==4){
				str+="<dl class='none'>"
			}else{
				str+="<dl>";
			}
			str+="<dt><a href='/goods/"+obj.goods_id+"?track=home-nonad-"+n+"'><img class='lazy' data-original="+obj.thumbnail+" src='http://ujipinwww.ufile.ucloud.com.cn/static/img/goods_list_default.png'></a></dt><dd><p class='goods_brand'><a>123</a></p><p class='goods_introduce'><a href='/goods/"+obj.goods_id+"?track=home-nonad-"+n+"'>"+obj.goods_name+"</a></p><p class='goods_price'><span class='special_price'>¥ "+obj.goods_price+"</span>";
			if(obj.goods_price*1<obj.market_price*1){
				str+="<span class='market_price'>"+obj.market_price+"</span>";
			}
				str+="</p></dd></dl>";				
		})
	}
	$("#goods_list").append($(str));
	$(".loading").remove();
	$("#goods_list").hovermask();
	//图片懒加载
	$("img.lazy").lazyload();
	if(result.data.length>0){
		return true;
	}else{
		return false;
	}
}
*/


//视频播放
/*$("#cvideo")[0].addEventListener("ended",function(){
	$("#cvideo")[0].load();
})*/



})
})(jQuery)
