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
var con,ar1,gun1,house1,nature1,spc1,spc2,sum1,sum2,wpon1,wpon2,play,home,s2b,death,bgl,exp,bomb,blt,ham,crk,lb,castle,egg,cannon,uni,chick,dragon,ice,bb1,bb2,rb1,rb2,wiz,wat;
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
	ham=new Image();
	ham.src="../img/wpon/hammer.svg";
	crk=new Image();
	crk.src="../img/wpon/crack.svg";
	lb=new Image();
	lb.src="../img/wpon/lb.svg";
	castle=new Image();
	castle.src="../img/fairytale/castle.svg";
	egg=new Image();
	egg.src="../img/egg/egg.svg";
	cannon=new Image();
	cannon.src="../img/cannon/cannon.svg";
	uni=new Image();
	uni.src="../img/art/unicon.svg";
	chick=new Image();
	chick.src="../img/egg/chick.svg";
	dragon=new Image();
	dragon.src="../img/egg/dragon.svg";
	ice=new Image();
	ice.src="../img/egg/iceberg.svg";
	bb1=new Image();
	bb1.src="../img/cannon/bomb1.svg";
	bb2=new Image();
	bb2.src="../img/cannon/bomb2.svg";
	rb1=new Image();
	rb1.src="../img/fairytale/rabbit1.svg";
	rb2=new Image();
	rb2.src="../img/fairytale/rabbit2.svg";
	wat=new Image();
	wat.src="../img/fairytale/water.svg";
	wiz=new Image();
	wiz.src="../img/fairytale/wizard.svg";
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
		ctx.beginPath();
		ctx.lineWidth=2;
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
		var p=relativePosition(e,ctx.canvas);
		// 버튼 바 클릭시 
		if(p.x>=cvs.width-50 && p.x <=cvs.width && p.y>=cvs.height-50 && p.y <=cvs.height){
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
				if(p.x>=cvs.width/7*3 && p.x <=cvs.width/7*3+cvs.width/9 && p.y>=0 && p.y <=cvs.height/10){
					end();
					return;
				}
				if(p.x>=cvs.width/9*1 && p.x <=cvs.width/9*1+cvs.width/10 && p.y>=cvs.height/9*1 && p.y <=cvs.height/9*1+cvs.height/10)state=1;
				if(p.x>=cvs.width/9*1 && p.x <=cvs.width/9*1+cvs.width/10 && p.y>=cvs.height/9*3 && p.y <=cvs.height/9*3+cvs.height/10)state=2;
				if(p.x>=cvs.width/9*1 && p.x <=cvs.width/9*1+cvs.width/10 && p.y>=cvs.height/9*5 && p.y <=cvs.height/9*5+cvs.height/10)state=3;
				if(p.x>=cvs.width/9*3 && p.x <=cvs.width/9*3+cvs.width/10 && p.y>=cvs.height/9*1 && p.y <=cvs.height/9*1+cvs.height/10)state=4;
				if(p.x>=cvs.width/9*3 && p.x <=cvs.width/9*3+cvs.width/10 && p.y>=cvs.height/9*3 && p.y <=cvs.height/9*3+cvs.height/10)state=5;
				if(p.x>=cvs.width/9*3 && p.x <=cvs.width/9*3+cvs.width/10 && p.y>=cvs.height/9*5 && p.y <=cvs.height/9*5+cvs.height/10)state=6;
				if(p.x>=cvs.width/9*5 && p.x <=cvs.width/9*5+cvs.width/10 && p.y>=cvs.height/9*1 && p.y <=cvs.height/9*1+cvs.height/10)state=7;
				if(p.x>=cvs.width/9*5 && p.x <=cvs.width/9*5+cvs.width/10 && p.y>=cvs.height/9*3 && p.y <=cvs.height/9*3+cvs.height/10)state=8;
				if(p.x>=cvs.width/9*5 && p.x <=cvs.width/9*5+cvs.width/10 && p.y>=cvs.height/9*5 && p.y <=cvs.height/9*5+cvs.height/10)state=9;
				if(p.x>=cvs.width/9*7 && p.x <=cvs.width/9*7+cvs.width/10 && p.y>=cvs.height/9*1 && p.y <=cvs.height/9*1+cvs.height/10)state=16;
				if(p.x>=cvs.width/9*7 && p.x <=cvs.width/9*7+cvs.width/10 && p.y>=cvs.height/9*3 && p.y <=cvs.height/9*3+cvs.height/10)state=17;
				if(p.x>=cvs.width/9*7 && p.x <=cvs.width/9*7+cvs.width/10 && p.y>=cvs.height/9*5 && p.y <=cvs.height/9*5+cvs.height/10)state=18;
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
	ctx.drawImage(con,cvs.width-50,cvs.height-50,50,50);
	eleAction();
	
	raf=requestAnimationFrame(draw);
};

function eleAction(){
	for(let i=0;i<ele.length;i++){
		if(ele[i].state==1){
			if(!ele[i].live || ele[i].cnt<0){
				ele.push({state:19,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:40,height:40});
				ele.splice(i,1);
				continue;
			}
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(ar1,ele[i].x,ele[i].y,ele[i].width,ele[i].height);
			}
		}
		else if(ele[i].state==2){
			if(!ele[i].live){
				ele.splice(i,1);
				continue;
			}
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(gun1,cvs.width-301,cvs.height-201,300,200);
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+70 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+70)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			}
			ctx.drawImage(blt,ele[i].x-30,ele[i].y-30,ele[i].width,ele[i].height);
			
		}
		else if(ele[i].state==3){
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
				continue;
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
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i, 1);
				continue;
			}
			ctx.drawImage(nature1,ele[i].x,ele[i].y,150,150);
		}
		else if(ele[i].state==5){
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
				if(ele[j].live &&  ele[j].x < ele[i].x+100 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+100)
				ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
			}
			ctx.drawImage(spc2,ele[i].x,ele[i].y,100,100);
			ele[i].cnt--;
			if(ele[i].cnt%10==0){
				ctx.drawImage(spc1,ele[i].x,ele[i].y,100,100);
			}
		}
		else if(ele[i].state==6){ //전사
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
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
		else if(ele[i].state==7){ //공룡
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);continue;
				}
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*1;
				ele[i].y+=d[r][1]*1;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*1;
					ele[i].y-=d[r][1]*1;
				}
				ctx.drawImage(sum2,ele[i].x,ele[i].y,65,65);
				let rr=Math.floor(Math.random()*100);
				if(rr%15==0)
				ctx.drawImage(s2b,ele[i].x+100,ele[i].y,65,65);
			}
		}
		else if(ele[i].state==8){   //언월도
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(wpon1,ele[i].x,ele[i].y,100,100);
			}/* 스태이트 12~15 번개 */
			else{
				ele.push({state:12,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:13,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:14,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:15,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.splice(i,1);
				continue;
			}
		}
		else if(ele[i].state==9){   //망치
			if(!ele[i].live){
				ele.splice(i,1);
				continue;
			}
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(ham,ele[i].x,ele[i].y,60,60);
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+70 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+70)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			}
			ctx.drawImage(crk,ele[i].x-30,ele[i].y-30,ele[i].width,ele[i].height);
		}
		else if(ele[i].state==10){//도둑
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);continue;
				}
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
				continue;
			}
		}
		else if(ele[i].state==12){ //번개
			ele[i].x+=d[0][0]*2.5;
			ele[i].y+=d[0][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(lb,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==13){
			ele[i].x+=d[1][0]*2.5;
			ele[i].y+=d[1][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(lb,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==14){
			ele[i].x+=d[2][0]*2.5;
			ele[i].y+=d[2][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(lb,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==15){
			ele[i].x+=d[5][0]*2.5;
			ele[i].y+=d[5][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(lb,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==16){ //에그
			ele[i].cnt--;
			if(!ele[i].live ){
				ele.splice(i,1);
				continue;
			}
			else if(ele[i].cnt<=0){
				var r=Math.floor(Math.random()*2);
				if(r==1) ele.push({state:20,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:30,height:30});
				else ele.push({state:21,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:100,height:100});
				ele.splice(i,1);
				continue;
			}
			else{
				ctx.drawImage(egg,ele[i].x,ele[i].y,30,30);
			}
		}
		else if(ele[i].state==17){ //대포
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
				continue;
			}
			ctx.drawImage(cannon,ele[i].x,ele[i].y,80,80);
			ele[i].cnt--;
			if(ele[i].cnt%100==0){
				ele.push({state:26,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:110,height:110,endBomb:Math.floor(Math.random()*(cvs.height-ele[i].y)),iy:ele[i].y });
			}
		}
		else if(ele[i].state==18){ //동화
			if(!ele[i].live || ele[i].cnt<=0){
				ele.splice(i,1);
				continue;
			}
			ctx.drawImage(castle,ele[i].x,ele[i].y,80,80);
			ele[i].cnt--;
			if(ele[i].cnt%100==0){
				var r2=Math.floor(Math.random()*2);
				if(r2==1){
					ele.push({state:28,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:40,height:40});
				}
				else{
					ele.push({state:30,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:50,height:50});
				}
			}
		}
		else if(ele[i].state==19){
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				ctx.strokeStyle ="#" + Math.round(Math.random() * 0xffffff).toString(16);
				var r=Math.floor(Math.random()*8);
				ctx.moveTo(ele[i].x,ele[i].y);
				ele[i].x+=d[r][0]*4;
				ele[i].y+=d[r][1]*4;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*4;
					ele[i].y-=d[r][1]*4;
				}
				ctx.lineTo(ele[i].x, ele[i].y);
				ctx.stroke();
				ctx.drawImage(uni,ele[i].x-30,ele[i].y-30,60,60);
			}
		}
		else if(ele[i].state==20){ //병아리
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*0.5;
				ele[i].y+=d[r][1]*0.5;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*0.5;
					ele[i].y-=d[r][1]*0.5;
				}
				ctx.drawImage(chick,ele[i].x,ele[i].y,30,30);
			}
		}
		else if(ele[i].state==21){ //드래곤
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				var r2=Math.floor(Math.random()*2000);
				if(r2==1000){
				ele.push({state:22,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:23,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:24,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				ele.push({state:25,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:80,height:80});
				}
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*2;
				ele[i].y+=d[r][1]*2;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*2;
					ele[i].y-=d[r][1]*2;
				}
				ctx.drawImage(dragon,ele[i].x,ele[i].y,100,100);
			}
		}
		else if(ele[i].state==22){ //얼음
			ele[i].x+=d[0][0]*2.5;
			ele[i].y+=d[0][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(ice,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==23){
			ele[i].x+=d[1][0]*2.5;
			ele[i].y+=d[1][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(ice,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==24){
			ele[i].x+=d[2][0]*2.5;
			ele[i].y+=d[2][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(ice,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==25){
			ele[i].x+=d[5][0]*2.5;
			ele[i].y+=d[5][1]*2.5;
			if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
				ele.splice(i,1);
				continue;
			}
			for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+80 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+80)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			ctx.drawImage(ice,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==26){ //포탄
			ele[i].x+=d[0][0]*2.5;
			ele[i].y+=d[0][1]*2.5;
			if(ele[i].y>=ele[i].iy+ele[i].endBomb|| ele[i].y>=cvs.height-ele[i].height){
				ele.push({state:27,x:ele[i].x,y:ele[i].y,live:true,cnt:100,width:ele[i].width,height:ele[i].height});
				ele.splice(i,1);
				continue;
			}
			ctx.drawImage(bb1,ele[i].x,ele[i].y,80,80);
		}
		else if(ele[i].state==27){ //포탄폭팔
			ele[i].cnt--;
			if(ele[i].cnt>=0){
				ctx.drawImage(bb2,ele[i].x,ele[i].y,120,120);
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+120 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+120)
					ele[j].live=false;
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			}
			else {
				ele.splice(i,1);
				continue;
			}
		}
		else if(ele[i].state==28){ //토끼
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					var r2=Math.floor(Math.random()*5);
					for(let i=0;i<r2;i++){
						ele.push({state:29,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:40,height:40});
					}
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				var r=Math.floor(Math.random()*8);
				ele[i].x+=d[r][0]*1;
				ele[i].y+=d[r][1]*1;
				if(ele[i].x>cvs.width || ele[i].x<0 || ele[i].y>cvs.height || ele[i].y<0){
					ele[i].x-=d[r][0]*1;
					ele[i].y-=d[r][1]*1;
				}
				ctx.drawImage(rb1,ele[i].x,ele[i].y,40,40);
			}
		}
		else if(ele[i].state==29){ //토끼2
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				var rrr=Math.floor(Math.random()*200);
				if(rrr==100){
					var rx=Math.random()*cvs.width-ele[i].width;
					var ry=Math.random()*cvs.width-ele[i].height;
					ele[i].x=rx;
					ele[i].y=ry;
				}
				ctx.drawImage(rb2,ele[i].x,ele[i].y,ele[i].width,ele[i].height);
			}
		}
		else if(ele[i].state==30){ //마법사
			if(!ele[i].live){
				ele[i].cnt--;
				ctx.drawImage(death,ele[i].x,ele[i].y,30,30);
				if(ele[i].cnt<=0){
					ele.splice(i,1);
					continue;					
				}
			}
			else{
				var rrrr=Math.floor(Math.random()*1000);
				var rrr=Math.floor(Math.random()*200);
				if(rrrr==1)ele.push({state:31,x:ele[i].x,y:ele[i].y,live:true,cnt:10,width:110,height:110});
				if(rrr==100){
					var rx=Math.random()*cvs.width-ele[i].width;
					var ry=Math.random()*cvs.width-ele[i].height;
					ele[i].x=rx;
					ele[i].y=ry;
				}
				ctx.drawImage(wiz,ele[i].x,ele[i].y,ele[i].width,ele[i].height);
			}
		}
		else if(ele[i].state==31){ //파도
			ele[i].x+=3;
			if(ele[i].x<=cvs.width-ele[i].width){
				ctx.drawImage(wat,ele[i].x,ele[i].y,120,120);
				for(let j=0;j<ele.length;j++){ //소환수 일때
					if(ele[j].live &&  ele[j].x < ele[i].x+110 && ele[j].x+ele[j].width>ele[i].x &&ele[j].y>ele[i].y && ele[j].y+ele[j].height <ele[i].y+110){
						if(ele[j].x>=cvs.width-ele[j].width)ele[j].x-=1;
						else ele[j].x+=1;
					}
				//if (RectA.Left < RectB.Right && RectA.Right > RectB.Left && RectA.Top > RectB.Bottom && RectA.Bottom < RectB.Top )
				}
			}
			else {
				ele.splice(i,1);
				continue;
			}
		}
	}
}
function stateAction(p){
	if(state==1){ //그리기
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:40,width:60,height:60});
	}  
	else if(state==2){ //총
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:40,width:60,height:60});
	}
	else if(state==3){//집
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:80,height:80});
	}
	else if(state==4){//허리케인
		ele.push({state:state,x:p.x,y:p.y});
	}
	else if(state==5){ //목성
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:100,height:100});
	}	
	else if(state==6){//전사
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:10,width:30,height:30});
	}
	else if(state==7){ //공룡
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:10,width:65,height:65});
	}
	else if(state==8){ //칼
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:40,width:60,height:60});
	}
	else if(state==9){ //망치
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:40,width:60,height:60});
	}
	else if(state==16){ //에그
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:300,width:30,height:30});
	}
	else if(state==17){ //대포
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:100,height:100});
	}
	else if(state==18){ //동화
		ele.push({state:state,x:p.x,y:p.y,live:true,cnt:1000,width:80,height:80});
		
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
	ctx.drawImage(home,cvs.width/7*3,0,cvs.width/9,cvs.height/10);
	ctx.drawImage(ar1,cvs.width/9*1,cvs.height/9*1,cvs.width/10,cvs.height/10);
	ctx.drawImage(gun1,cvs.width/9*1,cvs.height/9*3,cvs.width/10,cvs.height/10);
	ctx.drawImage(house1,cvs.width/9*1,cvs.height/9*5,cvs.width/10,cvs.height/10);
	ctx.drawImage(nature1,cvs.width/9*3,cvs.height/9*1,cvs.width/10,cvs.height/10);
	ctx.drawImage(spc2,cvs.width/9*3,cvs.height/9*3,cvs.width/10,cvs.height/10);
	ctx.drawImage(sum1,cvs.width/9*3,cvs.height/9*5,cvs.width/10,cvs.height/10);
	ctx.drawImage(sum2,cvs.width/9*5,cvs.height/9*1,cvs.width/10,cvs.height/10);
	ctx.drawImage(wpon1,cvs.width/9*5,cvs.height/9*3,cvs.width/10,cvs.height/10);
	ctx.drawImage(ham,cvs.width/9*5,cvs.height/9*5,cvs.width/10,cvs.height/10);
	ctx.drawImage(egg,cvs.width/9*7,cvs.height/9*1,cvs.width/10,cvs.height/10);
	ctx.drawImage(cannon,cvs.width/9*7,cvs.height/9*3,cvs.width/10,cvs.height/10);
	ctx.drawImage(castle,cvs.width/9*7,cvs.height/9*5,cvs.width/10,cvs.height/10);
}