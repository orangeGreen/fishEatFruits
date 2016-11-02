

//孩子

var Child = function(){

    this.x = 0;
    this.y = 0;
    this.angle = 0; // 

    this.tailTimer = 0; //尾巴摆动计时器
    this.tailCount = 0;  //尾巴计数器
    this.tailImage = []; //所有尾巴图像
    this.tailInterval = 50; //尾巴每一帧的间隔时间

    this.eyeTimer = 0; //眼睛计时器
    this.eyeCount = 0; //眼睛计数器
    this.eyeImage = []; //所有眼睛图像
    this.eyeInterval = 2000; //眨眼睛间隔
   

    this.bodyTimer = 0; //身体计时器
    this.bodyCount = 0; //身体计数器
    this.bodyImage = []; //所有身体图片
    this.bodyInterval = 500; //身体变化每一帧间隔
}

//孩子初始化

Child.prototype.init = function(){
    
    //坐标跟随妈妈
    this.x = can2.width*0.5;
    this.y = can2.height*0.5;

    //把尾巴图像加载进去
    for(var i = 0; i < 8; i++){
        var img = new Image();
        img.src = "image/babyTail"+i+".png";
        this.tailImage.push(img);
    }
   
   //把所有眼睛图像加载进去
    for(var i = 0; i < 2; i++){
        var img = new Image();
        img.src = "image/babyEye"+i+".png";
        this.eyeImage.push(img);
    }
    //把所有身体图像加载进去
    for(var i = 0; i < 20; i++){
        var img = new Image();
        img.src = "image/babyFade"+i+".png";
        this.bodyImage.push(img);
    }
}

//画孩子

Child.prototype.draw = function(){
    ctx2.save();

    if (!gameOver){
       //坐标跟随妈妈
        this.x = lerpAim(mom.x,this.x,0.98);  
        this.y = lerpAim(mom.y,this.y,0.98);
        //尾巴计时器
        this.tailTimer += deltaTime; //加上每一帧的间隔时间
        
        if (this.tailTimer > this.tailInterval){
            this.tailCount = (this.tailCount+1)%(this.tailImage.length);
            this.tailTimer = this.tailTimer % this.tailInterval; //然后把计时器归位
        }

        //眼睛计时器
        this.eyeTimer += deltaTime;
    
        if ( this.eyeTimer > this.eyeInterval){
            this.eyeCount = (this.eyeCount + 1) % (this.eyeImage.length);
            //如果眼睛睁开的,那么就要闭着
            if (this.eyeCount == 0){
                this.eyeInterval  =  Math.random()*1000+2000;  //要闭着时间隔长一点
            }else{
                this.eyeInterval  =  Math.random()*200+200;  //时间短一点
            }
        
            this.eyeTimer = 0;  //归零
        }

        //身体计时器
        this.bodyTimer += deltaTime;
        if (this.bodyTimer > this.bodyInterval){
            this.bodyCount ++;
            if (this.bodyCount > this.bodyImage.length-1){

                //Game Over
                console.log("children die !")
                gameOver = true;
                this.bodyCount = this.bodyImage.length-1;
            }
            this.bodyTimer = 0;
        }
    }
    
    
    //小鱼需要转动的角度
    var dx = mom.x-this.x;
    var dy = mom.y-this.y;
    var beta = Math.atan2(dy,dx) + Math.PI;
    this.angle = lerpAngle(beta,this.angle,0.9)
    ctx2.translate(this.x,this.y);  //把画画原点移动到大鱼要画的位置
    ctx2.rotate(this.angle);
    ctx2.drawImage(this.bodyImage[this.bodyCount],-this.bodyImage[this.bodyCount].width*0.5,-this.bodyImage[this.bodyCount].height*0.5);
    ctx2.drawImage(this.eyeImage[this.eyeCount],-this.eyeImage[this.eyeCount].width*0.5,-this.eyeImage[this.eyeCount].height*0.5);
    ctx2.drawImage(this.tailImage[this.tailCount],-this.tailImage[this.tailCount].width*0.5+25,-this.tailImage[this.tailCount].height*0.5);
    ctx2.restore();
}