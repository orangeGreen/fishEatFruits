

//海葵类

var Ane = function(){
    this.x = [];  //海葵的x坐标
    this.len = [];  //海葵的长度
    this.color = "purple"; //海葵颜色
    this.alpha = 0.8; //海葵透明度
    this.width = 20; //海葵宽度
    this.cap = "round"; //海葵的两端样式
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
    ctx1.lineTo(this.x[i],can1.height-this.len[i]);
    
    ctx1.stroke();
    ctx1.closePath();
    ctx1.restore();
}