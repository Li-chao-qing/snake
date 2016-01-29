window.onload=function(){

var shescene=document.getElementById('shescene');
var HANG=15;
var dict={};
var RIGHT=39,LEFT=37,UP=38,DOWN=40;
var direction=RIGHT;//默认方向
var chang=(600)/HANG;
var shuru=document.getElementById('shuru');
var enter=document.getElementById('enter');
//画块
var huakuai=function(){
    for(var i=0;i<HANG;i++){
        for(var j=0;j<HANG;j++){
            var she_kuai=document.createElement('div');
            shescene.appendChild(she_kuai);
            she_kuai.style.width=chang+'px';
            she_kuai.style.height=chang+'px';
            she_kuai.setAttribute('class','she-block');
            she_kuai.setAttribute('id',i+'-'+j);

        }
    }
};
huakuai();
// 输入
shuru.onkeyup=function(e){
    HANG=Number(this.value);
    chang=(600)/HANG; 
};
// shuru.blur=function(){};
var shestart=document.getElementById('shestart');
var shepause=document.getElementById('shepause');
var shek2=false;
shestart.onclick=function(){
    shek2=true;
}
shepause.onclick=function(){
    shek2=false;
}
var shekaiguan=true;

//花蛇
var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
var drawSnake=function(){
    for(var i=0;i<snake.length;i++){
        dict[snake[i].x+'-'+snake[i].y]=true; 
        document.getElementById(snake[i].x+'-'+snake[i].y).setAttribute('class','she-block shen')
    }
};
drawSnake();


// 食物是否在蛇身上
var isInsnake=function(x,y){
    if(dict[x+'-'+y]){
        return true;
    }
    return false;
};

// 投食物
var dropFood=function(){
    var 
    x=Math.floor(Math.random()*HANG),
    y=Math.floor(Math.random()*HANG);
    if(snake.length==HANG*HANG){
        alert('you win');
        return;
    }
    while(isInsnake(x,y)){
         x=Math.floor(Math.random()*HANG),
         y=Math.floor(Math.random()*HANG);
    }
    document.getElementById(x+'-'+y).style.background='url(./images/ping.png)';
    document.getElementById(x+'-'+y).style.backgroundSize='cover';
    return {foodx:x,foody:y};
};
var food=dropFood();
// 点击确定时重新生成页面
enter.onclick=function(){
    var ccc=shescene.children.length;
    for(var i=0;i<ccc;i++){
        shescene.removeChild(shescene.lastElementChild);
    }
    
     huakuai();
     drawSnake();
     food=dropFood();
};
var tiii;
// 蛇走
var zou=function(){
    if(shek2){ 
        var last=snake.length-1;
        var newHead;
        if(direction==RIGHT){
            newHead={x:snake[last].x,y:snake[last].y+1};
        }
        else if(direction==LEFT){
            newHead={x:snake[last].x,y:snake[last].y-1};
        }
        else if(direction==UP){
            newHead={x:snake[last].x-1,y:snake[last].y};
        }
        else if(direction==DOWN){
            newHead={x:snake[last].x+1,y:snake[last].y};
        }
        //撞墙

        if(newHead.x>HANG-1||newHead.x<0||newHead.y>HANG-1||newHead.y<0){
            alert('game over');
            clearInterval(tiii);
            shekaiguan=false;
            return;
        }
        //幢自己
        if(isInsnake(newHead.x,newHead.y)){
            alert('碰到自己了');
            clearInterval(tiii);
            shekaiguan=false;
            return;
        }

        snake.push(newHead);
        dict[newHead.x+'-'+newHead.y]=true;
        if(newHead.x==food.foodx&&newHead.y==food.foody){
            var tmp=document.getElementById(food.foodx+'-'+food.foody);
            tmp.style.background='#808080';
            tmp.style.borderRadius='10px';
            food=dropFood();
            return;
        }
        var weiba =snake.shift();
        delete dict[weiba.x+'-'+weiba.y];

        var t=document.getElementById(weiba.x+'-'+weiba.y);
        t.style.background='#BCDE03';
        var h=document.getElementById(newHead.x+'-'+newHead.y);
        h.style.background='url(./images/shen.png)';
        h.style.backgroundSize='cover';
        return null;
    }
        
};
//按键时
document.onkeydown=function(e){
    if(e.target!==shuru){
         e.preventDefault();
    }

    if(shekaiguan){
        var d=e.keyCode;
        if(d==37||d==38||d==39||d==40){
            if(Math.abs(d-direction)!==2){
                direction=d;
                zou();
            }
        }
    }
 
};

clearInterval(tiii);
tiii=setInterval(zou,1000);

var shereplay=document.getElementById('shereplay');
shereplay.onclick=function(e){
    // e.preventDefault();
    location.reload();
}
// document.onmousedown=function(e){
//     if(e.target!==shuru){
//          e.preventDefault();
//     }
//     // e.preventDefault();
// };

};//最后