

//鼠标事件
var Mouse = function(){
    this.x = 0;
    this.y = 0;
}

//鼠标初始化
Mouse.prototype.init = function(){
    var main = this;
    //鼠标
    can2.addEventListener("mousemove",function(e){
        e.preventDefault(); //阻止默认事件
       main.x = pointConvert(e).x;
       main.y = pointConvert(e).y;
       main.pcmove();
    },false) 


    //触摸
    can2.addEventListener("touchmove",function(e){
        e.preventDefault(); //阻止默认事件
       main.x = e.touches[0].clientX;
       main.y = e.touches[0].clientY;
      
       main.mobilemove();
    },false) 
}

//让鱼妈妈移动
Mouse.prototype.pcmove = function(){
    
    mom.move(this.x,this.y);
}
Mouse.prototype.mobilemove = function(){
     mom.move(this.x,this.y);
}
