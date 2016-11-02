

//漂浮物制作
//要和海葵振动一致，
var Dust = function(){
    this.imageData = []; //所有漂浮物图像数据
    this.angle = 0; //正弦偏移弧度'
    this.amplitude = []; //每个物体的振幅

    this.x = [];
    this.y = [];

    this.amp = 50; //振动幅度
}

Dust.prototype.init = function(){

    for(var i = 0; i < 7; i++){
        var img = new Image();
        img.src = "image/dust"+i+".png"
        this.imageData.push(img);
        this.x[i] = Math.random()*can1.width;
        this.y[i] = Math.random()*can1.height;
    }
}

Dust.prototype.draw = function(){

    this.angle += deltaTime * 0.001;
    var l = -Math.sin(this.angle)*this.amp;  //取反，和海葵振动方向一样。

    for(var i = 0; i < this.x.length; i++){

        ctx1.save();
        ctx1.drawImage(this.imageData[i],this.x[i]+l,this.y[i])

        ctx1.restore()
    }
}