# fishEatFruits
A big fish eat fruits and feed the small fish

## 1.环境

支持html5 canvas的浏览器

## 2.概述

从慕课学习大鱼吃小鱼后，下来手动实现的一个版本。

##### 需要的基础
* 熟练的javascript技能
* html5 canvas API 
* 面向对象

##### 用到的主要知识
* Canvas大部分API
* 以及两点之间距离，趋近于等概念
* 浏览器提供的动画帧函数requestAnimFrame()
* 池的概念
* Math.sin()，Math.atan2()，Math.random()等数学函数

##### 基本玩法
* 在一个蓝色海里，有飘动的海葵和漂浮物，以及大鱼妈妈和她的孩子
* 海葵会不断产生蓝色和橘色果实
* 大鱼带着孩子吃果实，在一定时间内，大鱼回去喂孩子（触碰），否则小鱼就会死掉
* 每次喂孩子，就会结算相应的分数，吃到蓝色果实分数结算时加倍。

## 3.试玩

##### 本地快速搭建web服务器
* 安装docker for xx (xx = windows || linux || macOS)
* docker pull index.tenxcloud.com/648392706/nginx:1.10.1
* docker run --name ${yourName} -v ${localValuePath}:/usr/share/nginx/html -p ${localHttpPort}:80 -d index.tenxcloud.com/648392706/nginx:1.10.1
* 访问：http://127.0.0.1:localHttpPort/xx.html
* tips:记得把文件拷贝到localValuePath下面。。

##### 在线试玩，支持手机
[fishEatFruits](https://one-boy.github.io/fishEatFruits)

## 4.预览界面：

![image](https://github.com/One-boy/fishEatFruits/blob/master/showImage/fish01.png)

![image](https://github.com/One-boy/fishEatFruits/blob/master/showImage/fish02.png)
