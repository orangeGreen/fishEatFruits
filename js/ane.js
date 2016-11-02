
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

    this.offsetX = 0; //结束点x偏移,让海葵移动
    this.angle = 0; //正弦偏移弧度'
    this.amplitude = []; //每个海葵的振幅
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
        this.amplitude[i] = Math.random()*20+50;
    }
}

//画海葵
Ane.prototype.draw = function(){
    this.angle += deltaTime*0.001;  //以0.001为步进值
    var l = Math.sin(this.angle);
   
    for(var i = 0; i < this.num; i++){
        this.drawAne(i,l);
    }
}

Ane.prototype.drawAne = function(i,l){
    ctx1.save();
    ctx1.globalAlpha = this.alpha;
    ctx1.beginPath();

    ctx1.strokeStyle = this.color;
    ctx1.lineWidth = this.width;
    ctx1.lineCap = this.cap;
    ctx1.moveTo(this.x[i],can1.height);
    this.topX[i] = this.x[i]-l*this.amplitude[i];
    this.topY[i] = can1.height-this.len[i];
    //我们用贝塞尔二次曲线来画弯曲的海葵，并在一定时间改变弯曲程度，达到飘动的画面。
    ctx1.quadraticCurveTo(this.x[i],can1.height-20,this.topX[i],this.topY[i])
    ctx1.stroke();
    ctx1.closePath();
    ctx1.restore();
}