
//主文件


var can1 = document.getElementById('canvas1')
var can2 = document.getElementById('canvas2')

ctx1 = can1.getContext('2d');
ctx2 = can2.getContext('2d');


document.body.onload = function(){
    init();
}

var lastTime = 0;  //上一次的时间
var deltaTime = 0;  //每帧的间隔时间
var backImage;
var ane;
var fruit;
var mom;
var child;
var mouse;
function init(){
    can1.width = 800;
    can1.height = 600;

    can2.width = 800;
    can2.height = 600;

    //背景图像加载
    backImage = new Image();
    backImage.src = "image/background.jpg";

    backImage.onload = function(){
        
        //海葵初始化
        ane = new Ane();
        ane.init();
        //果实初始化
        fruit = new Fruit();
        fruit.init();
        //大鱼初始化
        mom = new Mom();
        mom.init();
        //小鱼初始化
        child = new Child();
        child.init()
        //鼠标事件初始化
        mouse = new Mouse();
        mouse.init();

        
        //启动游戏
        gameLoop();
    }
}

//游戏循环
function gameLoop(){
    
    drawBackground();
    ane.draw();

    fruit.born();
    mom.draw();
    child.draw();
    
    requestAnimFrame(gameLoop);
    //计算每一帧的间隔时间
    deltaTime = (new Date()).getTime() - lastTime;
    lastTime = (new Date()).getTime();
    
}

//画背景图像
function drawBackground(){
    ctx1.drawImage(backImage,0,0,can1.width,can1.height);
}