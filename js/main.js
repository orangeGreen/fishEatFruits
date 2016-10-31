
var can1 = document.getElementById('canvas1')
var can2 = document.getElementById('canvas2')

ctx1 = can1.getContext('2d');
ctx2 = can2.getContext('2d');


document.body.onload = function(){
    init();
}

var backImage;
var ane;
var fruit;
var mom;
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
    requestAnimFrame(gameLoop)
}

//画背景图像
function drawBackground(){
    ctx1.drawImage(backImage,0,0,can1.width,can1.height);
}