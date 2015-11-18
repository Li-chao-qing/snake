window.onload=function(){
var shescene=document.getElementById('shescene');
var HANG=15;
var dict={};
var RIGHT=39,LEFT=37,UP=38,DOWN=40;
var direction=RIGHT;
var chang=(600-HANG)/HANG;
var shuru=document.getElementById('shuru');
var enter=document.getElementById('enter');
// shuru.onkeyup=function(){
//      console.log(this.value);
//      // hang.value=hang.innerHTML;
//      if(this.value){
//         HANG=Number(this.value);
//         console.log(HANG);
//        enter.onclick=function(){
//          for(var i=0;i<HANG;i++){
//         for(var j=0;j<HANG;j++){
//         var she_kuai=document.createElement('div');
//         shescene.appendChild(she_kuai);
//         she_kuai.style.width=chang+'px';
//         she_kuai.style.height=chang+'px';
//         she_kuai.setAttribute('class','she-block');
//         she_kuai.setAttribute('id',i+'-'+j);

//     }

// }
//        };
       
//     }   
// };

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
var she_block=document.getElementById('she-block');



  
var shestart=document.getElementById('shestart');
var shepause=document.getElementById('shepause');
var shek2=false;
shestart.onclick=function(){
    shek2=true;
     document.body.scrollTop=5657;
}
shepause.onclick=function(){
    shek2=false;
     document.body.scrollTop=5657;
}
var shekaiguan=true;


var snake=[{x:0,y:0},{x:0,y:1},{x:0,y:2}];
var drawSnake=function(){
    for(var i=0;i<snake.length;i++){
      
        dict[snake[i].x+'-'+snake[i].y]=true;
         
    document.getElementById(snake[i].x+'-'+snake[i].y).setAttribute('class','she-block shen')
    //  if(i==2){
    // document.getElementById(snake[i].x+'-'+snake[i].y).setAttribute('class','she-block tou')}
        // document.getElementById(snake[i].x+'-'+snake[i].y).style.background='#808080';
         // document.getElementById(snake[i].x+'-'+snake[i].y).style.boxShadow='2px 2px 0 white inset,-2px -2px 0 white inset';
    }
};
drawSnake();

var isInsnake=function(x,y){
    if(dict[x+'-'+y]){
        return true;
    }
    return false;
};
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
    return {foodx:x,foody:y};
};
var food=dropFood();
var zou=function(){
    if(shek2){ 
        var last=snake.length-1;
        var newHead;
        if(direction==RIGHT){
            newHead={x:snake[last].x,y:snake[last].y+1};
        }
        if(direction==LEFT){
            newHead={x:snake[last].x,y:snake[last].y-1};
        }
        if(direction==UP){
            newHead={x:snake[last].x-1,y:snake[last].y};
        }
        if(direction==DOWN){
            newHead={x:snake[last].x+1,y:snake[last].y};
        }
        if(newHead.x>HANG-1||newHead.x<0||newHead.y>HANG-1||newHead.y<0){
            alert('game over');
            clearInterval(tiii);
            shekaiguan=false;
            return;
        }
        if(isInsnake(newHead.x,newHead.y)){
            alert('要自己干嘛');
            clearInterval(tiii);
            shekaiguan=false;
            return;
        }
         // tmp.style.borderRadius='0px';

        snake.push(newHead);
        dict[newHead.x+'-'+newHead.y]=true;
        if(newHead.x==food.foodx&&newHead.y==food.foody){
            var tmp=document.getElementById(food.foodx+'-'+food.foody);
            tmp.style.background='#808080';
            tmp.style.borderRadius='10px';
            // tmp.style.background='url(./images/shen.png)';
             // tmp.style.borderRadius='10px';
            // tmp.style.boxShadow='2px 2px 0 white inset,-2px -2px 0 white inset';
            food=dropFood();
            return;
        }
        var weiba =snake.shift();
        delete dict[weiba.x+'-'+weiba.y];

        var t=document.getElementById(weiba.x+'-'+weiba.y);
        t.style.background='#BCDE03';
        var h=document.getElementById(newHead.x+'-'+newHead.y);
        //  if(direction==RIGHT){
        //     h.style.background='url(./images/tou.png)';
        // }
        // if(direction==LEFT){
        //    h.style.background='url(./images/touz.png)';
        // }
        // if(direction==UP){
        //      h.style.background='url(./images/tous.png)';
        // }
        // if(direction==DOWN){
        //     h.style.background='url(./images/toux.png)';
        // }
         h.style.background='url(./images/shen.png)';
        // h.style.boxShadow='2px 2px 0 white inset,-2px -2px 0 white inset';
        return null;
    }
        
};


document.onkeydown=function(e){
    e.preventDefault();
   // if(document.body.scrollTop==5657){
   //      document.body.scrollTop=5657;
    if(shekaiguan){
        var d=e.keyCode;
        if(d==37||d==38||d==39||d==40){
            if(Math.abs(d-direction)!==2){
                direction=d;
                zou();
            }
        }
    }
   
   // } 
};

var she=document.getElementById('she');
// she.onclick=function(){


// }
clearInterval(tiii);
var tiii=setInterval(zou,1000);

var shereplay=document.getElementById('shereplay');
shereplay.onclick=function(){
location.reload();
  

}

};//最后