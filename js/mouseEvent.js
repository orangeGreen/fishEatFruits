

//鼠标事件
var Mouse = function(){
    this.x = 0;
    this.y = 0;
}

//鼠标初始化
Mouse.prototype.init = function(){
    var main = this;
    can2.addEventListener("mousemove",function(e){
    
       main.x = pointConvert(e).x;
       main.y = pointConvert(e).y;
       main.move();
    },false) 
}

//让鱼妈妈移动
Mouse.prototype.move = function(){
    
    mom.move(this.x,this.y);
}

