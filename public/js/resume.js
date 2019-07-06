$(function(){
    getImg();
    $(window).on('resize',function(){
        getImg();
    });

    var isScroll = true;
    var arrH = [
        0,
        $('#header #per1').offset().top,
        $('#header #edu').offset().top,
        $('#school').offset().top,
        $('#skill').offset().top
    ];
    var Index = 0;

    $(window).on('scroll',function(){
       if(isScroll){
           var scrollH = document.documentElement.scrollTop;
           if(scrollH>arrH[1] && scrollH<=arrH[2]){
               classW($('#floor li:nth-child(1)'),$($("#floor li").get(Index)));
               Index=0;
           }else if(scrollH > arrH[2] && scrollH<=arrH[3]){
               classW($('#floor li:nth-child(2)'),$($("#floor li").get(Index)));
               Index=1;
           }else if(scrollH > arrH[3] && scrollH<document.documentElement.scrollHeight-document.documentElement.clientHeight-10){
               classW($('#floor li:nth-child(3)'),$($("#floor li").get(Index)));
               Index=2;
           }else if(scrollH >= document.documentElement.scrollHeight-document.documentElement.clientHeight){
               classW($('#floor li:nth-child(4)'),$($("#floor li").get(Index)));
               Index=3;
           }
           console.log(Index);
       }
    });

    $.each($('#floor li'),function(index,val){
        $(val).on('click',function(){
            isScroll = false;
            var obj =0 ,timer;
            if(index===0){
                obj = $('#header #per1').offset().top;
            }else if(index === 1){
                obj = $('#header #edu').offset().top;
            }else if(index === 2){
                obj = $('#school').offset().top;
            }else if(index === 3){
                obj = document.documentElement.scrollHeight - document.documentElement.clientHeight;
            }else if(index === 4){
                obj = 0;
            }
            var timer;
            var that = this;
            slowScroll(obj,timer,function(){
                clearTimeout(timer);
                if(index !== 4){
                    classW($(that),$($("#floor li").get(Index)));
                    Index = index;
                }else{
                    classW($('#floor li:first-child'),$($("#floor li").get(Index)));
                    Index = 0;
                };

                timer = setTimeout(function () {
                    isScroll = true;
                },500)

            });

        })
    });

    function classW(obj1,last){
        var data = obj1.data('bg');
        var lastData = last.data('bg');
        last.removeClass('active').removeClass(lastData);
        obj1.addClass('active').addClass(data);
    }
})

function slowScroll(target,timer,fn){
    var begin=document.documentElement.scrollTop;
    timer = setInterval(function(){
        begin += (target-begin)*0.2;
        begin = (target-begin)>0 ? Math.ceil(begin):Math.floor(begin);
        /*console.log(target-begin);*/
        window.scrollTo(0,begin);

        if(begin === target){
            clearInterval(timer);
            fn();
        }
    },20)

}
function getImg(){
    var carouselW = $('#carousel').innerWidth();

    //获取轮播图列表
    var imgList = $('#carousel .imgItem');

    var isBig = carouselW > 900;

    $.each(imgList,function(index,val){
        var src = isBig ? $(val).data('lg-img'):$(val).data('md-img');
        /*console.log(src);*/
        $(val).css({
            background: 'url("' + src + '") center center no-repeat',
            'background-size': 'cover'
        })

        if(!isBig){
            var img = $('<img>').attr('src',src);
            $(val).empty().append(img);
        }else{
            $(val).empty();
        }
    })
}