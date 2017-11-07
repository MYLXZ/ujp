//下拉加载更多
    function loadMore(tar,bH,url,success,type,data,scrollType){
        var bH=bH?bH:300;;//距离底部300px时开始请求数据
        var data=data?data:{};
        var n=2;
        if(scrollType!="activity"){
            data.page=n;
            data.page_num=20;
        }else{
            data.offset=20;
            data.count=20;
        }
        var flag=true,
            scr=true;
        //滚动
        $(window).scroll(function() {
            //$(document).scrollTop() 获取垂直滚动的距离
            //$(document).scrollLeft() 这是获取水平滚动条的距离
            if(!flag) return false;
            if(!scr) return false;
            if ($(document).scrollTop() >= $(document).height() - $(window).height()-bH) {
                var hea = defaultHeader();
                    hea["Content-type"] = "application/json";
                    if(getCookie("_ujp_access_token")){
                         hea["Authorization"] = "Bearer " + getCookie("_ujp_access_token");
                    }
                $.ajax({
                    url:url,
                    data:data,
                    type:type,
                    headers:hea,
                    beforeSend: function(){
                        if($(".loading").length==0){tar.append($("<div class='loading'><img src='http://ujipinwww.ufile.ucloud.com.cn/static/img/loading.gif'></div>"))};
                        flag=false;
                    },
                    success:function(result){
                        if(scrollType!="activity"){
                            n++;
                            data.page=n;
                        }else{
                            data.offset+=data.count;
                        }
                        result.pagesNum=data;
                        scr=success(result);
                        flag=true;
                    },
                    error:function(data){
                        console.log(data);
                        console.log(data.message);
                    }
                })
            }
        });
    }
