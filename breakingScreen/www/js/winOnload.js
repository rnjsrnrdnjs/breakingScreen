var bg;
var cvs,ctx;
var main; var w,h;
var conx,cony;
var bgw,bgh;
window.onload=()=>{
  start();
};


function start(){
	main=document.getElementById('main');
	main.style.backgroundSize=100 + "% " + 100 + "%";
	var sel=document.getElementById('select');
	var btn=document.getElementById('btn');
	var con=document.getElementById('control');
	w=main.offsetWidth;
	h=main.offsetHeight;
	conx=w/2;
	cony=h/2;
	bg=new Image();
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
		cvs=elt("canvas",{id:"canvas"});
		ctx=cvs.getContext('2d');	
		
		let reader=new FileReader();
		reader.onload=function(){
			bg.src=reader.result;
		}
		bg.onload=()=>{
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
	ctx.drawImage(bg,0,0,100,150);
		
	requestAnimationFrame(draw);
};