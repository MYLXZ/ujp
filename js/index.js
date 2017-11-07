//nav下面横线鼠标移入移出
$(function() {
	$(".nav").delegate("li","mouseenter",function(){
		var _index = $(this).index();
		$(".nav p").eq(_index).show();

	});
	$(".nav").delegate("li","mouseleave",function(){
		var _index = $(this).index();
		$(".nav p").eq(_index).hide();
	});	
	


//下拉菜单部分


//轮播图
var imgs = $("#banner li"),
			len = imgs.length,
			currentIndex = 0,
			nextIndex = 1,
			circles = $("i"),
			timer = null;

		timer = setInterval(move,3000)	

		$("#banner").onmouseenter = function(){
			clearInterval(timer);
		}
		$("#banner").onmouseleave = function(){
				timer = setInterval(move,3000)	
		}
		
		// 点击小圆点切换图片
		for(let i =0;i<circles.length;i++){
			circles[i].onclick = function(){
				if(i===currentIndex)
					return;
				nextIndex = i;
				move()
			}
		}
		//向左
		$("#pre").onclick = function(){
			console.log(1234)
			nextIndex = currentIndex -1;
			if(nextIndex<0)
				nextIndex = len-1;
			move();
		}
		//向右
		$("#next").onclick = function(){
			move();
		}
		function move(){
			fadeOut(imgs[currentIndex],2000);
			fadeIn(imgs[nextIndex],2000);
			circles[currentIndex].className = "";
			circles[nextIndex].className = "current";
			//修改索引值
			currentIndex = nextIndex;
			nextIndex++;
			if(nextIndex>=len)
				nextIndex = 0;
		}
});