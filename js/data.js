

//数据分值

var Data = function(){
    this.fruitsNum = 0 ; //吃到果实的数量
    this.doubleScore = 1 ; //分数是否加倍
    this.score = 0;  //分数
    this.alpha = 0;
}


//数据绘制
Data.prototype.draw = function(){
    
    ctx2.save();
    
    var text1 = "已吃果实:"+this.fruitsNum;
    var text2 = "总分:"+this.score;
    
    ctx2.fillText(text1,can2.width/2,30);
    ctx2.fillText(text2,can2.width/2,60);
    ctx2.restore();

    if (gameOver){
        ctx2.save();
        this.alpha += 0.006;
        if (this.alpha > 1){
            this.alpha = 1;
        }
        ctx2.fillStyle = "rgba(255,255,255,"+this.alpha+")"
        ctx2.font = " 40px arial";
        ctx2.shadowOffsetX = 2;
        ctx2.shadowOffsetY = 2;
        ctx2.shadowBlur = 10;
        ctx2.shadowColor = "gray";
        var scc = "GAMEOVER";
        ctx2.fillText(scc,can2.width/2,can2.height/2)
        ctx2.restore() 
    }
    
}

//大鱼喂小鱼后,加分数
Data.prototype.addScore = function(){
    this.score += this.fruitsNum * this.doubleScore * 100;

    //重置
    this.fruitsNum = 0;
    this.doubleScore = 1;

}