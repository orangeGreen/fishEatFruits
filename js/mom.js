

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
    this.eyeInterval = 2000; //眨眼睛间隔
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
        this.tailCount  = (this.tailCount+1)%(this.tailImage.length);//如过计数器大于尾巴图片数，归零
        this.tailTimer %= this.tailInterval; //然后把计时器归位
    }
    //眼睛计时器
    this.eyeTimer += deltaTime;
 
    if ( this.eyeTimer > this.eyeInterval){
        this.eyeCount = (this.eyeCount + 1) % (this.eyeImage.length);
        //如果眼睛睁开的,那么就要闭着
        if (this.eyeCount == 0){
            this.eyeInterval  =  Math.random()*1000+2000;
        }else{
            this.eyeInterval  =  Math.random()*200+200;
        }
        this.eyeTimer = 0;  //归零
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
   
   //只有移动大鱼，才进行吃果实和喂小鱼动作
   this.eatFruits();
   this.feedBaby();
}

//大鱼吃果实

Mom.prototype.eatFruits = function(){
    for(var i = 0; i < fruit.num; i++){
        //如果果实和鱼妈妈的距离小于吃的距离，就吃了它
        if (fruit.fruits[i].alive && towPointDistance(fruit.fruits[i].x,fruit.fruits[i].y,this.x,this.y) < this.eatLen){
            this.all++;
            console.log("Eat a ",fruit.fruits[i].color," fruit,All = ",this.all)
            fruit.dead(i);
        }
    }
}

//大鱼喂小鱼

Mom.prototype.feedBaby = function(){
    //如果大鱼和小鱼距离小于xx，则喂鱼
    if (towPointDistance(this.x,this.y,child.x,child.y) < 20){
        child.bodyCount = 0;
    }
}