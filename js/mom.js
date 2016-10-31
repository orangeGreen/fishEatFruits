

//妈妈

var Mom = function(){
    this.eye = new Image();  //眼睛
    this.body = new Image();  //身体
    this.tail = new Image();   //尾巴
    this.x = 0;
    this.y = 0;
    this.angle = 0; //大于旋转角度
    this.eatLen = 15; //吃果实的距离。。
    this.all = 0; //总共吃了多少个
}

//初始化妈妈
Mom.prototype.init = function(){
    this.eye.src = "image/bigEye0.png";
    this.body.src = "image/bigSwim0.png";
    this.tail.src = "image/bigTail0.png"

    this.x = can2.width*0.5;
    this.y = can2.height*0.5;

    
}

//画妈妈
Mom.prototype.draw = function(){
    ctx2.save();
    ctx2.clearRect(0,0,can2.width,can2.height);
    ctx2.translate(this.x,this.y);  //把画画原点移动到大鱼要画的位置
    ctx2.rotate(this.angle)
    ctx2.drawImage(this.eye,-this.eye.width*0.5,-this.eye.height*0.5);
    ctx2.drawImage(this.body,-this.body.width*0.5,-this.body.height*0.5);
    ctx2.drawImage(this.tail,-this.tail.width*0.5+32,-this.tail.height*0.5);

    ctx2.restore();
}

//鼠标移动事件
Mom.prototype.move =function(x,y){
   
   //用趋近于，可以让鱼不立即显示在鼠标下面，而是在旁边
   this.x = lerpAim(x,this.x,0.9);
   this.y = lerpAim(y,this.y,0.9);
   
   var dx = x-this.x;
   var dy = y-this.y;

   var beta = Math.atan2(dy,dx) + Math.PI;  //加一个pi是因为atan2返回范围是-pi到pi,-PI 到PI
  
   this.angle = lerpAngle(beta,this.angle,0.6)
   
   this.checkBoom();

}

//检测大鱼是否碰到了果实

Mom.prototype.checkBoom = function(){
    for(var i = 0; i < fruit.num; i++){
        if (fruit.fruits[i].alive && Math.abs(fruit.fruits[i].x-this.x) < this.eatLen && Math.abs(fruit.fruits[i].y-this.y) < this.eatLen){
            //
            this.all++;
            console.log("Eat a ",fruit.fruits[i].color," fruit,All = ",this.all)
            
            fruit.fruits[i].alive = false;
        }
    }
}