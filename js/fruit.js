

//果实类

var Fruit = function(){
    this.fruits = []; //果实数组

    this.growMax = 10; //长大极限
    this.growSpeed = 0.1; //长大速度
    this.moveSpeed = 0.5; //果实移动速度
    this.maxNum = 15; //激活果实的数量
    this.orangeImage = new Image();  //黄色果实
    this.blueImage = new Image(); //蓝色果实
    
}
Fruit.prototype.num = 30;  //果实的数量
//初始化果实

Fruit.prototype.init = function(){
    this.orangeImage.src = "image/fruit.png";
    this.blueImage.src = "image/blue.png"
    for(var i = 0; i < this.num; i++){
        var fruitObj = {
            alive : false, //果实激活状态
            x : 0, //果实x坐标
            y : 0,  //果实y坐标
            aneI:0,//诞生时所在海葵的下标
            growUp : 0, //成长状态
            growSpeed : Math.random()+this.growSpeed,  //果实成长速度
            moveSpeed : Math.random()+this.moveSpeed, //果实移动速度
            color : "orange"  //果实颜色
        }
        this.fruits.push(fruitObj);
    }
    
}

//果实的诞生

Fruit.prototype.born = function(){
    //激活数量少于maxnum，那么就诞生
    if(this.getAliveNum() < this.maxNum){
        var i = this.getDiedNum();
        //找一个海葵的坐标来诞生
        var aneI = parseInt(Math.random()*ane.num);
        var x = ane.topX[aneI];
        var y = ane.topY[aneI];
        this.fruits[i].alive = true;
        this.fruits[i].x = x;
        this.fruits[i].y = y;
        this.fruits[i].growUp = 0;
        this.fruits[i].aneI = aneI;
    }

    this.draw();
    this.setColor();
}

//果实颜色平衡黄色70%，蓝色30%;
Fruit.prototype.setColor = function(){
    var num = 0;
    for(var i = 0; i<this.num;i++){
        if (this.fruits[i].color == "orange"){
            num++;
        }
    }

    if (num/this.num > 0.9){
       for(var i = 0; i<this.num;i++){
            if (!this.fruits[i].alive && this.fruits[i].color == "orange"){
                this.fruits[i].color = "blue";
                break;
            }
        } 
    }
}
//获取一个将诞生果实的下标
Fruit.prototype.getDiedNum =function(){
    for(var i = 0; i < this.num;i++){
        if (!this.fruits[i].alive){
            return i;
        }
    }
}

//画果实
Fruit.prototype.draw = function(){
    for (var i = 0; i<this.num;i++){
        if (this.fruits[i].alive ){
            this.drawFruit(i);
        }
    }
}
Fruit.prototype.drawFruit = function(i){
    if (this.fruits[i].growUp < this.growMax){  //未长大
        //使诞生中的果实保持和运动的海葵顶部一样，
        this.fruits[i].x = ane.topX[this.fruits[i].aneI];
        this.fruits[i].y = ane.topY[this.fruits[i].aneI];

        this.fruits[i].growUp+=this.growSpeed;
        ctx1.drawImage(this.orangeImage,this.fruits[i].x-this.fruits[i].growUp/2,this.fruits[i].y,this.fruits[i].growUp,this.fruits[i].growUp);
    }else{  //长大了往上移动
        //this.fruits[i].x = ane.topX[i];
        if (this.fruits[i].color == "orange"){
            var pic = this.orangeImage;
        }else{
            var pic = this.blueImage;
        }
         ctx1.drawImage(pic,this.fruits[i].x-this.fruits[i].growUp/2,this.fruits[i].y-=this.fruits[i].moveSpeed,this.fruits[i].growUp,this.fruits[i].growUp);
    }
    
    if (this.fruits[i].y <= 0){  //是否移除画面
        this.dead(i)
    }
}

//激活果实的数量
Fruit.prototype.getAliveNum = function(){
    var num = 0;
    for(var i = 0; i < this.num; i++){
        if(this.fruits[i].alive){
            num++;
        }
    }
    return num;
}
//果实死了

Fruit.prototype.dead = function(i){
     this.fruits[i].alive = false;
}