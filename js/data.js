

//数据分值

var Data = function(){
    this.fruitsNum = 0 ; //吃到果实的数量
    this.doubleScore = 0 ; //分数是否加倍
    this.score = 0;  //分数
}

//数据重置
Data.prototype.reset = function(){
    this.fruitsNum = 0;
    this.doubleScore = 0;
    this.score = 0;
}


//数据绘制
Data.prototype.draw = function(){
    
    ctx2.save();
    ctx2.beginPath();
    ctx2.fillStyle = "green";
    ctx2.font = "bold 30px sans-serif";
    ctx2.textAlign = "center"
    var text1 = "已吃果实:"+this.fruitsNum;
    var text2 = "总分:"+this.score;

    ctx2.fillText(text1,can2.width/2,30);
    ctx2.fillText(text2,can2.width/2,60);
    ctx2.closePath();
    ctx2.restore();
}