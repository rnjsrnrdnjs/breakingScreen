var bg;
var cvs,ctx;
var main;
window.onload=()=>{
	main=document.getElementById('main');
	
	var sel=document.getElementById('select');
	bg=new Image();
	sel.addEventListener('change',(e)=>{
		if(sel.files.length==0)return;
		var reader=new FileReader();
		reader.onload=function(){
			bg.src=reader.result;
		}
		reader.readAsDataURL(sel.files[0]);
		cvs=elt("canvas",{id:"canvas"});
		ctx=cvs.getContext('2d');	
		document.body.removeChild(main);
		document.body.appendChild(cvs);
		draw();
	},false);
	draw();
	
};


/*
function play(){
	다시할때 처음화면 돌아가기 
	document.body.append(main);
	document.body.removeChild(cvs);
}
*/

function draw(){
	ctx.drawImage(bg,0,0);
	
	requestAnimationFrame(draw);
};