
//通用的js函数


//用浏览器提供的动画帧接口
window.requestAnimFrame = (function() {
	return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
		function( /* function FrameRequestCallback */ callback, /* DOMElement Element */ element) {
			return window.setTimeout(callback, 1000 / 60);
		};
})();


//坐标转换
 function pointConvert(e){
    return {
        x:e.layerX == "undefined" ? e.offsetX : e.layerX,
        y:e.layerY == "undefined" ? e.offsetY : e.layerY
    }
}


//一个数值趋近于目标数值

function lerpAim(aim,s,per){  //目标值，原值，趋近百分比，0-1
    var cur = s-aim;
    return aim+cur*per;
}

//角度趋近于目标角度
function lerpAngle(a, b, t) {
	var d = b - a;
	if (d > Math.PI) d = d - 2 * Math.PI;
	if (d < -Math.PI) d = d + 2 * Math.PI;
	return a + d * t;
}