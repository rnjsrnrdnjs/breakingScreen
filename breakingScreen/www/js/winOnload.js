var bg;
var cvs,ctx;
var main,cmain; var w,h;
window.onload=()=>{
	main=document.getElementById('main');
	cmain=main.cloneNode();
	//main.style.backgroundImage = "url('../img/mainm.jpg')";
	var sel=document.getElementById('select');
	var con=document.getElementById('control');
	w=main.offsetWidth;
	h=main.offsetHeight;
	
	
	bg=new Image();
	sel.addEventListener('change',(e)=>{
		if(sel.files.length==0)return;
		cvs=elt("canvas",{id:"canvas"});
		ctx=cvs.getContext('2d');	
		
		var reader=new FileReader();
		reader.onload=function(){
			bg.src=reader.result;
		}
		bg.onload=()=>{
			bg.width=w;
			bg.height=h;
		}
		reader.readAsDataURL(sel.files[0]);

		console.log(main.offsetWidth+" "+main.offsetHeight);
		console.log(cmain.offsetWidth+" "+cmain.offsetHeight);


		document.body.removeChild(main);
		document.body.appendChild(cvs);

		console.log(main.offsetWidth+" "+main.offsetHeight);
		console.log(cmain.offsetWidth+" "+cmain.offsetHeight);
	
	
		draw();
	},false);
	
};


/*
function play(){
	다시할때 처음화면 돌아가기 
	document.body.append(main);
	document.body.removeChild(cvs);
}
*/

function draw(){
	ctx.drawImage(bg,0,0,w,h);
		
	requestAnimationFrame(draw);
};