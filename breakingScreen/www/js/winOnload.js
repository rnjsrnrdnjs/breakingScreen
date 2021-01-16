var bg;
var cvs,ctx;
var main; var w,h;
var conx,cony;
var bgw,bgh;
//이미지 변수
/*
	1-ar1=손그림
	2-gun1=m16
	3-house1=집
	4-nature1=허리케인
	spc1=별
	5-spc2=목성
	6-sum1=전사 
	7-sum2=공룡
	8-wpon1=언월도
	9-wpon2=칼
*/
var con,ar1,gun1,house1,nature1,spc1,spc2,sum1,sum2,wpon1,wpon2,play,home,s2b,death,bgl,exp,bomb,blt;
var state=1;
var isPaused = false;
var raf=null;

var ele=[];
var d=[[0,1],[0,-1],[1,0],[1,1],[1,-1],[-1,0],[-1,1],[-1,-1]];

function disableScroll() { 
  document.body.classList.add("stop-scrolling"); 
} 
window.onload=()=>{
 let stopScroll = disableScroll();
 imginit();
 start();
};
function imginit(){
	con=new Image();
	con.src="../img/control.svg";
	ar1=new Image();
	ar1.src="../img/art/a1.svg";
	gun1=new Image();
	gun1.src="../img/gun/g1.svg";
	house1=new Image();
	house1.src="../img/house/h1.svg";
	nature1=new Image();
	nature1.src="../img/nature/n1.svg";
	spc1=new Image();
	spc1.src="../img/spc/sp1.svg";
	spc2=new Image();
	spc2.src="../img/spc/sp2.svg";
	sum1=new Image();
	sum1.src="../img/summons/s1.svg";
	sum2=new Image();
	sum2.src="../img/summons/dino.svg";
	wpon1=new Image();
	wpon1.src="../img/wpon/w1.svg";
	wpon2=new Image();
	wpon2.src="../img/wpon/w2.svg";
	play=new Image();
	play.src="../img/play.svg";
	home=new Image();
	home.src="../img/home.svg";
	s2b=new Image();
	s2b.src="../img/summons/s2b.svg";
	death=new Image();
	death.src="../img/summons/death.svg";
	bgl=new Image();
	bgl.src="../img/summons/bgl.svg";
	exp=new Image();
	exp.src="../img/summons/explosion.svg";
	bomb=new Image();
	bomb.src="../img/summons/bomb.svg";
	blt=new Image();
	blt.src="../img/wpon/blt.svg";
}

function start(){
	main=document.getElementById('main');
	//main.style.backgroundSize=100 + "% " + 100 + "%";
	var sel=document.getElementById('select');
	var btn=document.getElementById('btn');
	var con=document.getElementById('control');
	w=document.querySelector('body').offsetWidth;
	h=document.querySelector('body').offsetHeight;
	
	conx=w/2;
	cony=h/2;
	bg=new Image();
	cvs=elt("canvas",{id:"canvas",Width:w,Height:h});
	ctx=cvs.getContext('2d');
	
	sel.addEventListener('change',(e)=>{
		var lbf=document.getElementById('lbf');
		lbf.style.backgroundSize=100 + "% " + 100 + "%";
		let reader=new FileReader();
		var lbimg=new Image();
		reader.onload=function(){
			lbimg.src=reader.result;
		}
		lbimg.onload=()=>{
			lbf.style.backgroundImage=`url(${lbimg.src})`;
		}
		reader.readAsDataURL(sel.files[0]);
	},false);
	
	con.addEventListener('click',(e)=>{
		if(sel.files.length==0)return;
		let reader=new FileReader();
		reader.onload=function(){
			bg.src=reader.result;
		}
		reader.readAsDataURL(sel.files[0]);
		document.body.removeChild(main);
		document.body.appendChild(cvs);
		cvsClick();
		raf=requestAnimationFrame(draw);
	},false);
}
function end(){
	document.body.removeChild(cvs);
	document.body.appendChild(main);
	start();
}
function cvsClick(){
	cvs.addEventListener("click",(e)=>{
		console.log(1);
		var p=relativePosition(e,ctx.canvas);
		// 버튼 바 클릭시 
		if(p.x>=cvs.width-49 && p.x <=cvs.width && p.y>=cvs.height-49 && p.y <=cvs.height){
			if(!isPaused){
				isPaused=true;
				cancelAnimationFrame(raf);
				choose();
				return;
			}
		}
		else{
			if(isPaused){
				//처음껀 홈화면
				isPaused=false;
				if(p.x>=cvs.width/7*3 && p.x <=cvs.width/7*3+100 && p.y>=0 && p.y <=100){
					end();
					return;
				}
				if(p.x>=cvs.width/7*1 && p.x <=cvs.width/7*1+cvs.width/10 && p.y>=cvs.height/7*1 && p.y <=cvs.height/7*1+cvs.width/10)state=1;
				if(p.x>=cvs.width/7*1 && p.x <=cvs.width/7*1+cvs.width/10 && p.y>=cvs.height/7*3 && p.y <=cvs.height/7*3+cvs.width/10)state=2;
				if(p.x>=cvs.width/7*1 && p.x <=cvs.width/7*1+cvs.width/10 && p.y>=cvs.height/7*5 && p.y <=cvs.height/7*5+cvs.width/10)state=3;
				if(p.x>=cvs.width/7*3 && p.x <=cvs.width/7*3+cvs.width/10 && p.y>=cvs.height/7*1 && p.y <=cvs.height/7*1+cvs.width/10)state=4;
				if(p.x>=cvs.width/7*3 && p.x <=cvs.width/7*3+cvs.width/10 && p.y>=cvs.height/7*3 && p.y <=cvs.height/7*3+cvs.width/10)state=5;
				if(p.x>=cvs.width/7*3 && p.x <=cvs.width/7*3+cvs.width/10 && p.y>=cvs.height/7*5 && p.y <=cvs.height/7*5+cvs.width/10)state=6;
				if(p.x>=cvs.width/7*5 && p.x <=cvs.width/7*5+cvs.width/10 && p.y>=cvs.height/7*1 && p.y <=cvs.height/7*1+cvs.width/10)state=7;
				if(p.x>=cvs.width/7*5 && p.x <=cvs.width/7*5+cvs.width/10 && p.y>=cvs.height/7*3 && p.y <=cvs.height/7*3+cvs.width/10)state=8;
				if(p.x>=cvs.width/7*5 && p.x <=cvs.width/7*5+cvs.width/10 && p.y>=cvs.height/7*5 && p.y <=cvs.height/7*5+cvs.width/10)state=9;
				raf=requestAnimationFrame(draw);
			}
			else{
				//선택한 무기에 대한 이벤트 발생
				stateAction(p);
			}
			
		}
	},false);
}
function draw(){
	ctx.drawImage(bg,0,0,cvs.width,cvs.height);
	ctx.drawImage(con,cvs.width-49,cvs.height-49,50,50);
	eleAction();
	
	raf=requestAnimationFrame(draw);
};

function eleAction(){
	for(let i=0;i<ele.length;i++){
		if(ele[i].state==1){
			
		}
		else if(ele[i].state==2){
			if(!ele[i].live)
				ele.splice(i,1);
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(gun1,cvs.width-301,cvs.height-201,300,200);
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+70 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+70)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			}
			ctx.drawImage(blt,ele[i].x,ele[i].y,ele[i].width,ele[i].height);
			
		}
		else if(ele[i].state==3){
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
			}
			ctx.drawImage(house1,ele[i].x,ele[i].y,80,80);
			ele[i].cnt--;
			if(ele[i].cnt%100==0){
				ele.push({state:10,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:50,height:50});
			}
		}
		else if(ele[i].state==4){
			var r=Math.floor(Math.random()*4);
			ele[i].x+=d[r][0]*2;
			ele[i].y+=d[r][1]*2;
			for(let j=0;j<ele.length;j++){ //소환수 일때
				if(ele[j].live &&  ele[j].x < ele[i].x+150 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+150     )
				ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
			}
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0)
				ele.splice(i, 1);
			ctx.drawImage(nature1,ele[i].x,ele[i].y,150,150);
		}
		else if(ele[i].state==5){
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
			}
			ctx.drawImage(spc2,ele[i].x,ele[i].y,100,100);
			ele[i].cnt--;
			if(ele[i].cnt%10==0){
				ctx.drawImage(spc1,ele[i].x,ele[i].y,100,100);
			}
		}
		else if(ele[i].state==6){
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0)ele.splice(i,1);
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*0.5;
				ele[i].y+=d[r][1]*0.5;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*0.5;
					ele[i].y-=d[r][1]*0.5;
				}
				ctx.drawImage(sum1,ele[i].x,ele[i].y,30,30);
			}
		}
		else if(ele[i].state==7){
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0)ele.splice(i,1);
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*0.4;
				ele[i].y+=d[r][1]*0.4;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*0.4;
					ele[i].y-=d[r][1]*0.4;
				}
				ctx.drawImage(sum2,ele[i].x,ele[i].y,100,100);
				let rr=Math.floor(Math.random()*100);
				if(rr%15==0)
				ctx.drawImage(s2b,ele[i].x+100,ele[i].y,100,100);
			}
		}
		else if(ele[i].state==8){
			
		}
		else if(ele[i].state==9){
			
		}
		else if(ele[i].state==10){//도둑
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0)ele.splice(i,1);
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*2;
				ele[i].y+=d[r][1]*2;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*2;
					ele[i].y-=d[r][1]*2;
				}
				let rr=Math.floor(Math.random()*2000);
				if(rr==500)ele.push({state:11,x:ele[i].x,y:ele[i].y,live:true,cnt:400,width:60,height:60});
				ctx.drawImage(bgl,ele[i].x,ele[i].y,40,40);
			}
		}
		else if(ele[i].state==11){//폭탄
			ele[i].cnt--;
			if(ele[i].cnt>=100){ctx.drawImage(bomb,ele[i].x,ele[i].y,40,40);}
			else if(ele[i].cnt>=0){
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+70 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+70)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
				ctx.drawImage(exp,ele[i].x,ele[i].y,40,40);
			}
			else {
				ele.splice(i,1);
			}
		}

	}
}
function stateAction(p){
	if(state==1){
		
	}  
	else if(state==2){ //총
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:50,width:60,height:60});
	}
	else if(state==3){//집
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:80,height:80});
	}
	else if(state==4){//허리케인
		ele.push({state:state,x:p.x,y:p.y});
	}
	else if(state==5){
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:100,height:100});
	}	
	else if(state==6){//전사
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:10,width:30,height:30});
	}
	else if(state==7){ //공룡
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:10,width:100,height:100});
	}
	else if(state==8){
	
	}
	else if(state==9){
	
	}
}
function setDragListeners(ctx,img,draw){
	var mousemoveEventListener=function(e){
		ctx.putImageData(img,0,0);
		draw(relativePosition(e,ctx.canvas));
	}
	document.addEventListener("mousemove",mousemoveEventListener,false);
	document.addEventListener("mouseup",function(e){
		ctx.putImageData(img,0,0);
		draw(relativePosition(e,ctx.canvas));
		document.removeEventListener("mousemove",mousemoveEventListener,false);
		document.removeEventListener("mouseup",arguments.callee,false);
	},false);
}

function relativePosition(e,element){
	var rect=element.getBoundingClientRect();
	return {x:Math.floor(e.clientX-rect.left),y:Math.floor(e.clientY-rect.top)};
}

function choose(){
	var imgData=ctx.getImageData(0,0,cvs.width,cvs.height);
	// imgdata 투명도 낮추기
	for (let i=0;i<imgData.data.length;i+=4){
  		imgData.data[i+3]=100;
  	}
	ctx.putImageData(imgData,0,0);
	ctx.drawImage(home,cvs.width/7*3,0,cvs.width/10,cvs.width/10);
	ctx.drawImage(ar1,cvs.width/7*1,cvs.height/7*1,cvs.width/10,cvs.width/10);
	ctx.drawImage(gun1,cvs.width/7*1,cvs.height/7*3,cvs.width/10,cvs.width/10);
	ctx.drawImage(house1,cvs.width/7*1,cvs.height/7*5,cvs.width/10,cvs.width/10);
	ctx.drawImage(nature1,cvs.width/7*3,cvs.height/7*1,cvs.width/10,cvs.width/10);
	ctx.drawImage(spc2,cvs.width/7*3,cvs.height/7*3,cvs.width/10,cvs.width/10);
	ctx.drawImage(sum1,cvs.width/7*3,cvs.height/7*5,cvs.width/10,cvs.width/10);
	ctx.drawImage(sum2,cvs.width/7*5,cvs.height/7*1,cvs.width/10,cvs.width/10);
	ctx.drawImage(wpon1,cvs.width/7*5,cvs.height/7*3,cvs.width/10,cvs.width/10);
	ctx.drawImage(wpon2,cvs.width/7*5,cvs.height/7*5,cvs.width/10,cvs.width/10);
}