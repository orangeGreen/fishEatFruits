

//吃果实和喂小鱼圆圈动画

var Arc = function(){
    this.arcPool = [];  //圆圈池子
    this.num = 10; ///池子圆圈数量
    this.maxR = 50; //圈子最大半径
    this.deAlpha = 0.03; //透明度递减值
    this.deR = 2; //半径递增值
    this.lineWidth = 3; //圆圈线宽度
}

//初始化
Arc.prototype.init =function(){
    for(var i = 0; i < this.num; i ++){
         var obj = {
             state:true, //可用状态
             x:0,  //圆圈圆心
             y:0,  
             r:0, //圆圈半径
             alpha:0, //透明度
             color:"red" //颜色
         }
         this.arcPool.push(obj);
    }
}
//画圈
Arc.prototype.draw = function(){
    for(var i =0; i<this.arcPool.length; i++){
        
        if (!this.arcPool[i].state){
            var obj = this.arcPool[i];
            ctx2.save();
            ctx2.beginPath();
            ctx2.lineWidth = this.lineWidth;
            ctx2.globalAlpha = obj.alpha;
         
            ctx2.strokeStyle = obj.color;
            ctx2.arc(obj.x,obj.y,obj.r,0,2*Math.PI);
            ctx2.stroke();
            
            if (obj.r > this.maxR){
                //圆圈半径达到最大半径，这个圈的使命就完成了，那么可用状态改为true
                obj.state = true;
            }else{
                obj.r += this.deR ;
                obj.alpha -= this.deAlpha;
                if (obj.alpha < 0) obj.alpha = 0;
            }
            
            ctx2.restore()
        }
    }
}

//设置圈
Arc.prototype.set = function(obj){
    //设置圆圈时，把池子里可用的拿来修改
     for(var i =0; i<this.arcPool.length; i++){
          if (this.arcPool[i].state){
             
               this.arcPool[i] = obj;
              
               break;
          }
     }
}
