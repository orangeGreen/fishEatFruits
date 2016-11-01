

//孩子

var Child = function(){
    this.eye = new Image();  //眼睛
    this.body = new Image();  //身体
    this.tail = new Image();   //尾巴

    this.x = 0;
    this.y = 0;
    this.angle = 0; // 
}

//孩子初始化

Child.prototype.init = function(){
    this.eye.src = "image/babyEye0.png"
    this.body.src = "image/babyFade0.png"
    this.tail.src = "image/babyTail0.png"

    //坐标跟随妈妈
    this.x = can2.width*0.5;
    this.y = can2.height*0.5;
}

//画孩子

Child.prototype.draw = function(){
    ctx2.save();
    //坐标跟随妈妈
    this.x = lerpAim(mom.x,this.x,0.98);  
    this.y = lerpAim(mom.y,this.y,0.98);
    //小鱼需要转动的角度
    var dx = mom.x-this.x;
    var dy = mom.y-this.y;
    var beta = Math.atan2(dy,dx) + Math.PI;
     this.angle = lerpAngle(beta,this.angle,0.9)

    ctx2.translate(this.x,this.y);  //把画画原点移动到大鱼要画的位置
    ctx2.rotate(this.angle);
    ctx2.drawImage(this.eye,-this.eye.width*0.5,-this.eye.height*0.5);
    ctx2.drawImage(this.body,-this.body.width*0.5,-this.body.height*0.5);
    ctx2.drawImage(this.tail,-this.tail.width*0.5+25,-this.tail.height*0.5);
    ctx2.restore();
}