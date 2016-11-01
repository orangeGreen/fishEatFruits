

//海葵类

var Ane = function(){
    this.x = [];  //海葵根部的x坐标
    this.topX = []; //海葵顶部x坐标
    this.topY = []; //海葵顶部y坐标
    this.len = [];  //海葵的长度
    this.color = "purple"; //海葵颜色
    this.alpha = 0.6; //海葵透明度
    this.width = 20; //海葵宽度
    this.cap = "round"; //海葵的两端样式

    this.timer = 0; //摆动计时器
    this.hz = 50; //海葵摆动频率
    this.offsetX = 0; //结束点x偏移,让海葵移动
    this.offsetCtlY = 20; //控制点y偏移，让海葵看起来更正常
    this.offsetNum = 1; //偏移量
}

Ane.prototype.num = 40; //海葵的数量

//初始化海葵
Ane.prototype.init = function(){
    for(var i = 0; i<this.num; i++){
        this.x[i] = i*can1.width/this.num+Math.random()*10;  //0-width
        if (this.x[i] >= can1.width){
            this.x[i] = can1.width-this.width/2;
        }
        this.len[i] = Math.random()*20+100;  //30-50
       
    }
}

//画海葵
Ane.prototype.draw = function(){
    this.timer += deltaTime;
    if (this.timer > this.hz){
        this.offsetX += this.offsetNum;
        if (this.offsetX > 20){
            this.offsetNum = -this.offsetNum;
        }else if(this.offsetX < -20){
            this.offsetNum = -this.offsetNum;
        }
        this.timer = 0;
    }
    for(var i = 0; i < this.num; i++){
        this.drawAne(i);
    }
}

Ane.prototype.drawAne = function(i){
    ctx1.save();
    ctx1.globalAlpha = this.alpha;
    ctx1.beginPath();

    ctx1.strokeStyle = this.color;
    ctx1.lineWidth = this.width;
    ctx1.lineCap = this.cap;
    ctx1.moveTo(this.x[i],can1.height);
    this.topX[i] = this.x[i]-this.offsetX;
    this.topY[i] = can1.height-this.len[i] ;
    ctx1.quadraticCurveTo(this.x[i],can1.height-this.len[i]+this.offsetCtlY,this.topX[i],this.topY[i])
    ctx1.stroke();
    ctx1.closePath();
    ctx1.restore();
}