window.onload = function(){
    drewEle()
}
//绘制相关元素
function drewEle(){
    var clientH = document.documentElement.clientHeight;
    var clientW = document.documentElement.clientWidth;
    var canvas = $('<canvas></canvas>').attr({
        'width':clientW,
        'height':clientH
    });
    $('#drew').append(canvas);

    //1.构造函数
    function Dandelion(options) {
        this._init(options);
    }
    //2.向原型内加入方法
    Dandelion.prototype = {
        _init:function (options) {
            //元素的起始坐标
            this.left = options.left;
            this.top = options.top;
            //起始大小
            this.size = _.random(60,100);

            //变化规律
            this.sd = 1;
            this.LD = _.random(-1,1);
            this.TD = _.random(-1,1);

            //图片地址
            this.src = '/img/dandelion.png'
            this.isDistant = true;
        },
        drew:function(fn){
            var that = this;
            var imgObj = new Image();
            imgObj.src = '/img/dandelion.png';
            imgObj.onload = function(){
                fn(imgObj,that);
            }
        },
        move:function(){
            /* if(this.isDistant){
                 this.size+=this.sd;
                 if(this.size>_.random(50,70)){
                     this.isDistant = false;
                 }
             }else if(this.isDistant){

             }*/
            this.size-=this.sd;
            this.left+=this.LD;
            this.top+=this.TD;

            if(this.size<=0){
                var index = getIndex(arr,this);
                arr[index] = null;
                arr =  _.without(arr,arr[index]);
            }
        }
    }

    //3 Dandelion arr 用于存放元素的数组
    //3.1 页面初始时有的元素
    var arr = [];
    for(var i=0;i<15;i++){
        var ele = new Dandelion({
            left:getPosition().left,
            top:getPosition().top
        });
        arr.push(ele);
    }

    var xtr = canvas.get(0).getContext('2d');
    //4 定时清理
    var timer = setInterval(function(){
        //清理上一帧动画

        xtr.clearRect(0,0,clientW,clientH);
        //重新绘制下一帧
        for(var i=0;i<arr.length;i++){

            arr[i].drew(function(obj,that){
                xtr.drawImage(obj,that.left,that.top,that.size,that.size);
            });
            arr[i].move();
        }

        if(arr.length === 0){
            clearInterval(timer);
        }
    },20);


    //5.监听动画结束
    var timer2 = setTimeout(function(){
        $('#text').addClass('animate');
        $('#text')[0].addEventListener('webkitAnimationEnd',function(){
            $(this).css({
                transform: 'translateY(400px)'
            });
            var button = $('<button></button>').html('我的简历').addClass('btn');

            $(this).append(button);
            button.on('click',function(){
                window.location.href = '/resume';
            });
            //右边划入
            button.animate({
                right: '5px'
            },500,function(){
                var span = $('<span></span>').css({
                    display:'none',
                    width: '50px',
                    height: '40px',
                    background:'url("/img/arrow.png") no-repeat',
                    backgroundSize: '50px 40px',
                    position: 'absolute',
                    bottom:'5px',
                    right:'110px'
                });
                $('#text').append(span);

                span.fadeToggle(500,function(){
                    $(this).addClass('arrows');
                })

            })
        })
    },1500);

}

//获取随机初始位置
function getPosition(){
    var position  = {
        left : _.random(0,$(document).outerWidth()),
        top : _.random(0,$(document).outerHeight())
    }

    return position;

}

function getIndex(arr,item){
    for(var i=0;i<arr.length;i++){
        if(arr[i] === item){
            return i;
        }
    }
}