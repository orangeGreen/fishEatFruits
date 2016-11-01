

//妈妈

var Mom = function(){
  
    this.body = new Image();  //身体
    
    this.x = 0;
    this.y = 0;
    this.angle = 0; //大鱼需要旋转角度
    this.eatLen = 15; //吃果实的距离。。
    this.all = 0; //总共吃了多少个

    this.tailTimer = 0; //尾巴摆动计时器
    this.tailCount = 0;  //尾巴计数器
    this.tailImage = []; //所有尾巴图像
    this.tailInterval = 50; //尾巴每一帧的间隔时间

    this.eyeTimer = 0; //眼睛计时器
    this.eyeCount = 0; //眼睛计数器
    this.eyeImage = []; //所有眼睛图像
    this.eyeInterval = 200; //眨眼睛间隔
    this.eyeIsNictation = true; //是否正在眨眼睛
}

//初始化妈妈
Mom.prototype.init = function(){
    
    this.body.src = "image/bigSwim0.png";
    

    this.x = can2.width*0.5;
    this.y = can2.height*0.5;

    //把尾巴图像加载进去
    for(var i = 0; i < 8; i++){
        var img = new Image();
        img.src = "image/bigTail"+i+".png";
        this.tailImage.push(img);
    }

    //把所有眼睛图像加载进去
    for(var i = 0; i < 2; i++){
        var img = new Image();
        img.src = "image/bigEye"+i+".png";
        this.eyeImage.push(img);
    }
}

//画妈妈
Mom.prototype.draw = function(){
    ctx2.save();
    //尾巴计时器
    this.tailTimer += deltaTime; //加上每一帧的间隔时间
    
    if (this.tailTimer > this.tailInterval){
         
        this.tailCount ++;
        if (this.tailCount > this.tailImage.length-1){  //如过计数器大于尾巴图片数，归零
            this.tailCount = this.tailCount%(this.tailImage.length-1);
        }
        this.tailTimer = this.tailTimer % this.tailInterval; //然后把计时器归位
    }
    //眼睛计时器
    this.eyeTimer += deltaTime;
 
    
    if (this.eyeIsNictation && this.eyeTimer > this.eyeInterval){
        if (this.eyeCount == 1){  //如果是闭上的，那么就把眨眼睛关上
            this.eyeIsNictation = false;
        }
        this.eyeCount ++;
        if (this.eyeCount > this.eyeImage.length - 1){
            this.eyeCount = this.eyeCount % (this.eyeImage.length - 1);
        }
        this.eyeTimer %= this.eyeInterval;
    }else if(!this.eyeIsNictation && (this.eyeTimer > Math.random()*1000+2000)){
        this.eyeIsNictation = true;
        this.eyeTimer  = 0;
    }

    ctx2.clearRect(0,0,can2.width,can2.height);
    ctx2.translate(this.x,this.y);  //把画画原点移动到大鱼要画的位置
    ctx2.rotate(this.angle)
    ctx2.drawImage(this.body,-this.body.width*0.5,-this.body.height*0.5);
    ctx2.drawImage(this.eyeImage[this.eyeCount],-this.eyeImage[this.eyeCount].width*0.5,-this.eyeImage[this.eyeCount].height*0.5);
    ctx2.drawImage(this.tailImage[this.tailCount],-this.tailImage[this.tailCount].width*0.5+32,-this.tailImage[this.tailCount].height*0.5);

    ctx2.restore();
}

//鼠标移动事件
Mom.prototype.move =function(x,y){
   
   //用趋近于，可以让鱼不立即显示在鼠标下面，而是在旁边
   this.x = lerpAim(x,this.x,0.95);
   this.y = lerpAim(y,this.y,0.95);
   
   var dx = x-this.x;
   var dy = y-this.y;

   var beta = Math.atan2(dy,dx) + Math.PI;  //加一个pi是因为atan2返回范围是-pi到pi,-PI 到PI
  
   this.angle = lerpAngle(beta,this.angle,0.6)
   
   this.checkBoom();

}

//检测大鱼是否碰到了果实

Mom.prototype.checkBoom = function(){
    for(var i = 0; i < fruit.num; i++){
        //如果果实和鱼妈妈的距离小于吃的距离，就吃了它
        if (fruit.fruits[i].alive && towPointDistance(fruit.fruits[i].x,fruit.fruits[i].y,this.x,this.y) < this.eatLen){
            this.all++;
            console.log("Eat a ",fruit.fruits[i].color," fruit,All = ",this.all)
        
            fruit.dead(i);
        }
    }
}