//数组冒泡排序
function bubbleSort(arr,isDesc=false){
	if(!arr instanceof Array){
		throw new TypeError(`The parameters must be an array!`);
	}
	for(var i=1;i<arr.length;i++){
		for(var j=0;j<arr.length-i;j++){
			if(arr[j]>arr[j+1]){
				var temp=arr[j];
				arr[j]=arr[j+1];
				arr[j+1]=temp;
			}
		}
	}
	return isDesc?arr.reverse():arr;
}
//数组快速排序
function quickSort(arr,isDesc=false){
	if(!arr instanceof Array){
		throw new TypeError(`The parameters must be an array!`);
	}
	if(arr.length===1){
		return arr;
	}
	var big=[];
	var sml=[];
	var cur=arr[0];
	for(var j=1;j<arr.length;j++){
		arr[j]>cur?big.push(arr[j]):sml.push(arr[j]);
	}
	big=arguments.callee(big);
	sml=arguments.callee(sml);
	arr=[...sml,cur,...big];
	return isDesc?arr.reverse():arr;
}
//数组选择排序
function selectSort(arr,isDesc=false){
	if(!arr instanceof Array){
		throw new TypeError(`The parameters must be an array!`);
	}
	for(var i=1;i<arr.length;i++){
		for(var j=i-1+1;j<arr.length;j++){
			if(arr[i-1]>arr[j]){
				var temp=arr[j];
				arr[j]=arr[i-1];s
				arr[i-1]=temp;
			}
		}
	}
	return isDesc?arr.reverse():arr;
}
// 数组去重
function arrDistinct(arr){
	//splice方法
	/*for(var i=0;i<arr.length;i++){
		for(var j=i+1;j<arr.length;j++){
			if(arr[i]===arr[j]){
				arr.splice(j,1);
				j--;
			}
		}
	}
	return arr;*/
	//ES6 set对象
	return Array.from(new Set(arr));
}
//去除左右空白
function trim(str,rOrl){
	var mode=rOrl||'all';
	switch (mode){
		case 'l':return str.replace(/^\s*/g,"");break;
		case 'r':return str.replace(/\s*$/g,"");break;
		case 'all':return str.replace(/^\s*|\s*$/g,"");break;
	}
	
}
//字符串反转
function strReverse(str){
	return str.split('').reverse().join('');
}
//重复字符串
function strRepeat(str,count){
	return new Array(count+1).join(str);
}
//ul高亮显示
function UlShowColor(ulObj,lightColor){
	var lis=ulObj.getElementsByTagName('li');
	var initColor=getStyleUnInline(lis[0],'background-color');
	for(var i=0;i<lis.length;i++){
		lis[i].style.backgroundColor=initColor;
		lis[i].onmouseover=function(){
			this.style.backgroundColor=lightColor;			
		}
		lis[i].onmouseout=function(){
			this.style.backgroundColor=initColor;
		}
	}
}
//获取鼠标相对页面位置
function getPagePos(ev){
	var scrollTop=document.documentElement.scrollTop||document.body.scrollTop;
	var scrollLeft=document.documentElement.scrollLeft||document.body.scrollLeft;
	return {x:scrollLeft+ev.clientX,y:scrollTop+ev.clientY};
}
//获取两数之间随机数
function range(start,end){
	return Math.floor(Math.random()*(end-start+1)+start);
}
//获取数组中随机一个元素
function getRandFromArr(arr){
	var index=parseInt(Math.random()*arr.length);
	return arr[index];
}
//获取随机颜色
function getRandValOfColor(){
	//return RGBA(range(0,255),range(0,255),range(0,255),1);
	//return HSLA(range(0,360),range(0,100)+'%',range(0,100)+'%',1);
	var str=range(0,255).toString(16);
	while(str.length<6){
		str='0'+str;
	}
	return '#'+str;
}
//设置cookie
function setCookie(key,value,iday){
	var odate=new Date();
	odate.setDate(odate.getDate()+iday);
	document.cookie=key+'='+value+'; expires='+odate;
}
//获取cookie
function getCookie(key){
	var adices=document.cookie.split('; ');
	for(var i=0;i<adices.length;i++){
		var apic=adices[i].split('=');
		if(apic[0]==key){
			return apic[1];
		}
	}
	return '';
}
//删除cookie
function removeCookie(key){
	setCookie(key,1,-1);
}
//Ajax
function Ajax(url,type,data,success,failed){
	var oAjax=null;
	try{
		if(window.XMLHttpRequest){
			oAjax=new XMLHttpRequest;
		}else{
			oAjax=new ActiveXObject('Microsoft.XMLHTTP');
		}
	}catch(e){
		Console.log(e.toString());
	}
	if(type==="get"){
		oAjax.open(type,url,true);
	}
	else if(type==="post"){
		oAjax.open(type,url,true);
		oAjax.setRequestHeader("Content-Type","application/x-www-form-urlencoded;charset=utf-8");
	}
	oAjax.send(data);
	oAjax.onreadystatechange=function(){
		if(oAjax.readyState==4){
			if(oAjax.status==200){
				success(oAjax.responseText);//oAjax.getResponseHeader(name);oAjax.getAllResponseHeaders();oAjax.responseXML;
			}else{
				failed(oAjax.status,oAjax.statusText);
			}
		}
    }
}
//获取样式
function getStyleUnInline(obj,attr){
	if(obj.currentStyle){
		return obj.currentStyle[attr];
	}else{
		return getComputedStyle(obj,false)[attr];
	}
}
//运动函数
function animate(obj,jsonAttr,isEverage,fn){
	var cur;
	var speed;
	var flag=true;
	clearInterval(obj.timer);
	obj.timer=setInterval(function(){
		for(var attr in jsonAttr){
			if(attr=='opacity'){
				cur=getStyleUnInline(obj,attr);
				cur=cur*100;
			}else{
				cur=parseInt(getStyleUnInline(obj,attr));
			}
			if(isEverage===true){
				speed=cur>jsonAttr[attr]?-15:15;
				if(Math.abs(cur-jsonAttr[attr])<Math.abs(speed)){
					if(attr=='opacity'){
					   obj.style[attr]=jsonAttr[attr]/100;
					   obj.style.filter='alpha(opacity:'+jsonAttr[attr]+')';
					}else{
						obj.style[attr]=jsonAttr[attr]+'px';
					}
					continue;
				}
			}else{
			    speed=(jsonAttr[attr]-cur)/7;
			    speed=speed>0?Math.ceil(speed):Math.floor(speed);
			}
			if(cur!=jsonAttr[attr]){
				flag=false;
			}
			if(attr=='opacity')
			{
				var opc=cur+speed;
				obj.style.opacity=opc/100;
				obj.style.filter='alpha(opacity:'+opc+')';
			}
			else{
			    obj.style[attr]=cur+speed+'px';
			}
		}
		if(flag){
			clearInterval(obj.timer);
			if(fn) fn();
		}
	},30);
}
//拖拽
function dragable(obj){
	this.obj=obj;
	this.pos={};
	var _this=this;
	this.obj.onmousedown=function(e){
		var e=e||window.event;
		_this.mousedown(e);
		return false;
	};
}
dragable.prototype.mousedown=function(e){
		var _this=this;
		this.pos={x:e.clientX-this.obj.offsetLeft,y:e.clientY-this.obj.offsetTop};
		document.onmousemove=function(e){
		    var e=e||window.event;
		    _this.mousemove(e);
	};
		document.onmouseup=function(){
		    _this.mouseup(e);
	};
}
dragable.prototype.mousemove=function(e){
			var e=e||window.event;
			var l=e.clientX-this.pos.x;
			var t=e.clientY-this.pos.y;
			this.obj.style.left=l+'px';
			this.obj.style.top=t+'px';
}
dragable.prototype.mouseup=function(){	
			document.onmousemove=null;
			document.onmouseup=null;
}
//受限制拖拽
function limitDrag(obj){
	dragable.call(this,obj);
	this.outer=obj.offsetParent;
}
for(var i in dragable.prototype){
	limitDrag.prototype[i]=dragable.prototype[i];
}
limitDrag.prototype.mousemove=function(e){
			var e=e||window.event;
			var l=e.clientX-this.pos.x;
			var t=e.clientY-this.pos.y;
			if(this.outer.tagName.toLowerCase()=='body'){
				if(l<0){
				   l=0;
			    }else if(l>document.documentElement.clientWidth-this.obj.offsetWidth){
				   l=document.documentElement.clientWidth-this.obj.offsetWidth;
			    }
			    if(t<0){
				   t=0;
			    }else if(t>document.documentElement.clientHeight-this.obj.offsetHeight){
				   t=document.documentElement.clientHeight-this.obj.offsetHeight;
			    }
			}else{
				if(l<0){
				   l=0;
			    }else if(l>this.outer.offsetWidth-this.obj.offsetWidth){
				   l=this.outer.offsetWidth-this.obj.offsetWidth;
			    }
			    if(t<0){
				   t=0;
			    }else if(t>this.outer.offsetHeight-this.obj.offsetHeight){
				   t=this.outer.offsetHeight-this.obj.offsetHeight;
			    }
			}
			this.obj.style.left=l+'px';
			this.obj.style.top=t+'px';
}
//ul轮播图封装
/*
function banner(ulObj,classOfActiveCircle){//,circleOptions
	var ul=ulObj;
	var lis=ul.children;
	var lisw=lis[0].offsetWidth;
	ul.appendChild(lis[0].cloneNode(true));
	ul.style.width=lis.length*lis[0].offsetWidth+'px';
	var ol=document.createElement('ol');
	for(var i=0;i<lis.length-1;i++){
		var cli=document.createElement('li');
		cli.innerHTML=i+1;
		cli.style.cssText="width:20px;height:20px;float:left;border:solid thick 1px;border-radius:50%;list-style:none;margin:2px 4px;line-height:20px;text-align:center;cursor:pointer;";
		ol.appendChild(cli);
	}
	ol.style.cssText="position:absolute;bottom:5px;right:5px;width:"+((lis.length-1)*(4+cli.offsetWidth)+4)+"px;";
	ul.parentNode.appendChild(ol);
	
	var timer;
	var curCircle=0;
	var curIndex=0;
	ol.children[curCircle].classList.add(classOfActiveCircle);
	clearInterval(timer);
	timer=setInterval(function(){
		if(curIndex>=lis.length){
			ul.style.left=0;
			curIndex=1;
		}
		move(ul,-curIndex*lisw);
		curIndex++;
		curCircle%=ol.children.length;
		for(var i=0;i<ol.children.length;i++){
			ol.children[i].classList.remove(classOfActiveCircle);
		}
		ol.children[curCircle].classList.add(classOfActiveCircle);
		curCircle++;
	},3000);
}
function move(obj,target){
		var speed=0;
		var cur;
		clearInterval(obj.timer);
		obj.timer=setInterval(function(){
			cur=obj.offsetLeft;
			speed=target-cur>0?15:-15;
			if(Math.abs(target-cur)<Math.abs(speed)){
				obj.style.left=target+'px';
				clearInterval(obj.timer);
			}else{
				obj.style.left=cur+speed+'px';
			}
		},30);
	}
*/
//ul轮播图面向对象封装
function banner(ulObj,classOfActiveCircle){//,circleOptions
	this.ul=ulObj;
	this.lis=this.ul.children;
	this.lisw=this.lis[0].offsetWidth;
	this.curCircle=0;
	this.curIndex=0;
	this.active=classOfActiveCircle;
	this.ol=document.createElement('ol');
	this.timer=null;
	this.self=this;
	this.old=0;
}
banner.prototype.init=function(){
	this.ul.appendChild(this.lis[0].cloneNode(true));
	this.ul.style.width=this.lis.length*this.lis[0].offsetWidth+'px';
	for(var i=0;i<this.lis.length-1;i++){
		var cli=document.createElement('li');
		cli.innerHTML=i+1;
		cli.index=i+1;
		cli.style.cssText="width:20px;height:20px;float:left;border:solid thick 1px;border-radius:50%;list-style:none;margin:2px 4px;line-height:20px;text-align:center;cursor:pointer;";
		this.ol.appendChild(cli);
	}
	this.ul.parentNode.appendChild(this.ol);
	this.ol.children[this.curCircle].classList.add(this.active);
	this.ol.style.cssText="position:absolute;bottom:5px;right:5px;width:"+((this.lis.length)*(4+cli.offsetWidth)+4)+"px;";
	this.old=this.ol.children[this.curCircle];
	var self=this;
	this.firstIn(this);
	this.ul.onmouseover=function(){
	     self.overIn(self);
	};
	this.ul.onmouseout=function(){
	     self.overLeave(self);
	};
	for(var j=0;j<this.ol.children.length;j++){
		this.ol.children[j].onclick=function(){
		   self.curCircle=this.index-1;
		   self.curIndex=this.index-1;
		   self.old.classList.remove(self.active);
		   self.ol.children[self.curCircle].classList.add(self.active);
		   self.old=self.ol.children[self.curCircle];
		   self.ul.style.left=-self.curIndex*self.lisw+'px';
		   self.curCircle++;
		   self.curIndex++;
		   self.baning();
		};
	}
	return this;
};
banner.prototype.overIn=function(_this){
	clearInterval(_this.timer);
};
banner.prototype.overLeave=function(_this){
	_this.baning();
};
banner.prototype.move=function(target){
	var speed=0;
	var cur;
	clearInterval(this.ul.timer);
	this.ul.timer=setInterval(function(_this){
		cur=_this.ul.offsetLeft;
		speed=target-cur>0?15:-15;
		if(Math.abs(target-cur)<Math.abs(speed)){
			_this.ul.style.left=target+'px';
			clearInterval(_this.ul.timer);
		}else{
			_this.ul.style.left=cur+speed+'px';
		}
	},30,this.self);
};
banner.prototype.firstIn=function(_this){
		if(_this.curIndex>=_this.lis.length){
			_this.ul.style.left=0;
			_this.curIndex=1;
		}
		_this.move(-_this.curIndex*_this.lisw);
		_this.curIndex++;
		_this.curCircle%=_this.ol.children.length;
		_this.old.classList.remove(_this.active);
		_this.ol.children[_this.curCircle].classList.add(_this.active);
		_this.old=_this.ol.children[_this.curCircle];
		_this.curCircle++;
};
banner.prototype.baning=function(){
	clearInterval(this.timer);
	this.timer=setInterval(function(_this){
		_this.firstIn(_this);
	},2500,this.self);
};
function startwith(org,str){
	var s='^'+str;
	return new RegExp(s).test(org);
}
function endwith(org,str){
	var s=str+'$';
	return new RegExp(s).test(org);
}
function padwith(org,len,pad){
	var pad=pad||' ';
	while(org.length<len){
		org=pad+org;
	}
	return org;
}
//解析xml字符串
function parseXMLFromString(xmlstr){
	if(window.DOMParser){
		var parser=new DOMParser();
		var xmldoc=parser.parseFromString(xmlstr,"text/xml");
	}else{
		var xmldoc=new ActiveXObject("Microsoft.XMLDOM");
		xmldoc.async=false;
		xmldoc.loadXML(xmlstr);
	}
	return xmldoc;
}