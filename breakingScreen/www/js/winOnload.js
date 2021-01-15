var bg;
var cvs,ctx;
var main; var w,h;
var conx,cony;
var bgw,bgh;
//이미지 변수
var con,ar1,gun1,house1,nature1,spc1,spc2,sum1,sum2,wpon1,wpon2;

var state=0;
var isPaused = false;

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
		draw();
	},false);
}
function end(){
	document.body.removeChild(cvs);
	document.body.appendChild(main);
	start();
}

function draw(){
	ctx.drawImage(bg,0,0,cvs.width,cvs.height);
	
	ctx.drawImage(con,Math.floor(conx-25),Math.floor(cony-25),50,50);
	
	// 컨트롤바의 클릭시와 드래그바설정
	cvs.addEventListener("click",(e)=>{
		var p=relativePosition(e,ctx.canvas);
		
		
	},false);
	
	requestAnimationFrame(draw);
};

function relativePosition(e,element){
	var rect=element.getBoundingClientRect();
	return {x:Math.floor(e.clientX-rect.left),y:Math.floor(e.clientY-rect.top)};
}

function choose(){
	
	//게임 다시실행
	//isPaused=false;
}