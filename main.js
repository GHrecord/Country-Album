
// function turn(elem){
// 	var cls = elem.className;
// 	if (/photo_front/.test(cls)) {
// 		cls = cls.replace(/photo_front/,'photo_back');
// 	}else{
// 		cls = cls.replace(/photo_back/,'photo_front');
// 	}
// 	return elem.className = cls;
// }

// document.querySelector(".photo_center").addEventListener('click',
// 	function(){
// 		var that = this,
// 		cls = this.className;
// 		console.log(this,cls);
// 		if (/photo_front/.test(cls)) {
// 		cls = cls.replace(/photo_front/,'photo_back');
// 		}else{
// 			cls = cls.replace(/photo_back/,'photo_front');
// 		}
// 		console.log(cls);
// 		that.className = cls;
// 	},false);

var data = data;

function g(selector){
    return selector.substr(0, 1) == '.' ? 
    	document.getElementsByClassName(selector.substr(1)) : 
    	document.getElementById(selector.substr(1));
    //return document.querySelector(selector);
}

//随机数生成函数，在给定的范围内(random([min, max]))随机生成一个值
function random(range){
	var min = Math.min(range[0],range[1]),
		max = Math.max(range[0],range[1]),
		diff = max - min,

		number = Math.round(Math.random()* diff) + min;
	return number;
}

// function addPhotos(){

// 	var template = g('#wrap').innerHTML;
// 	var html = [];
// 	for(var s in data){
// 		var _html = template
// 			.replace('{{index}}',s)
// 			.replace('{{img}}',data[s].img)
// 			.replace('{{caption}}',data[s].caption)
// 			.replace('{{album}}',data[s].album)
// 			.replace('{{artist}}',data[s].artist)
// 			.replace('{{date}}',data[s].date)
// 			.replace('{{desc}}',data[s].desc);

// 		html.push(_html);

// 	}

// 	g('#wrap').innerHTML = html.join('');

// 	rsort(random([-1, data.length-1]));

// }

function addPhotos(){
    var _wrap = '';
    var _nav = '';
    for(var i = 0; i < data.length; i++){//for in 循环中的循环计数器是字符串，而不是数字它包含当前属性的名称或当前数组元素的索引
        _wrap += '<div class="photo  photo_front" onclick="turn(this)" id="photo_' + (i + 1) + '"><div class="photo-wrap"><div class="side side-front"><p class="image"><img src="image/' + data[i].img + '"></p><p class="caption">' + data[i].caption + '</p></div><div class="side side-back"><h2 class="album">'+data[i].album
        +'</h2><div><span>歌手：</span><p class="artist">'+data[i].artist
        +'</p></div><div><span>发行时间：</span><p class="sell-date">'+data[i].date
        +'</p></div><span>专辑介绍：</span><p class="desc">'+data[i].desc+'</p></div></div></div></div>';
        
        _nav += '<span id="nav_' + (i + 1) + '" onclick="turn(g(\'#photo_' + (i + 1) + '\'))" class="i"></span>';
    }
    var navigation = '<div class="nav">' + _nav + '</div>'
    g('#wrap').innerHTML = _wrap + navigation;
    
    rsort(1);
}


function range(){
    /*{left: {x: [左侧区域 left 的最小值, 左侧区域 left 的最大值], y: [左侧区域 top 的最小值, 左侧区域 top 的最大值]}, 
     *right: {x: [右侧区域 left 的最小值, 右侧区域 left 的最大值], y: [右侧区域 top 的最小值, 右侧区域 top 的最大值]}}
     */
    var range = {
        left: {
            x: [], 
            y: []
        }, 
        right: {
            x: [], 
            y: []
        }
    };
    //获取最外围容器的宽度和高度
    var wrap = {
        width: g('#wrap').clientWidth,
        height: g('#wrap').clientHeight
    };
    //获取每一张海报的宽度和高度，因为海报的大小都是一样的，所以取第一张
    var photo = {
        width: g('.photo')[0].clientWidth,
        height: g('.photo')[0].clientHeight
    };
    //按照自己想要显示的区域进行计算，左右区域的高度 (top) 范围是一样的
    range.left.x = [0 - photo.width / 4 + 0, wrap.width / 2 - photo.width * 5 / 4 + 130];
    range.left.y = [0 - photo.height / 4 + 0, wrap.height - photo.height * 3 / 4 + 160];
    range.right.x = [wrap.width / 2 - photo.width / 4 + 0, wrap.width - photo.width / 4 + 0];
    range.right.y = range.left.y;

    return range;
}

 // 排序
function rsort(n){
    var _photo = g('.photo');
    var photos = [];
    for(var i = 0; i < _photo.length; i++){
        _photo[i].className = 'photo photo_front';
        _photo[i].style.left = '';
        _photo[i].style.top = '';
        
        _photo[i].style['transform'] = _photo[i].style['-webkit-transform'] = 'scale(1.3)';

        photos.push(_photo[i]);
    }
    //第一张为中心位置
    var photo_center = g('#photo_' + n);
    photo_center.className += ' photo_center';

    photo_center = photos.splice(n-1, 1);//把photo_center从数组里删掉
    // 把剩下的海报分为左右两部分
    var photos_left = photos.splice(0, Math.ceil(photos.length / 2));
    var photos_right = photos;
    var ranges = range();
    // 对左右区域的海报位置进行随机赋值
    for(var j = 0; j < photos_left.length; j++){
        var photo = photos_left[j];
        photo.style.left = random(ranges.left.x) + 'px';
        photo.style.top = random(ranges.left.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }
    for(var s = 0; s < photos_right.length; s++){
        var photo = photos_right[s];
        photo.style.left = random(ranges.right.x) + 'px';
        photo.style.top = random(ranges.right.y) + 'px';
        photo.style['transform'] = photo.style['-webkit-transform'] = 'rotate(' + random([-150, 150]) + 'deg) scale(1)';
    }
    // 控制按钮处理
    var navs = g('.i');
    for(var k = 0; k < navs.length; k++){
        navs[k].className = 'i';
    }
    g('#nav_' + n).className += ' i_current';
}

function turn(elem){
    var cls = elem.className;
    if (/about/.test(cls)) {
    	console.log('test');
    	if (/photo_front/.test(cls)) {
			cls = cls.replace(/photo_front/,'photo_back');
		}else{
			cls = cls.replace(/photo_back/,'photo_front');
		}
		elem.className = cls;
    }else{
    var n = elem.id.split('_')[1];//var n = elem.id.substr(-1, 1)，但是不推荐 substr;
    if(!/photo_center/.test(cls)){//判断当前点击的元素是不是 photo_center，不是的话不执行后面的翻转而进行海报排序
        return rsort(n);
    }
    if(/photo_front/.test(cls)){
        cls = cls.replace(/photo_front/, 'photo_back');
        g('#nav_' + n).className += ' i_back';//同时处理控制按钮
    } else{
        cls = cls.replace(/photo_back/, 'photo_front');
        g('#nav_' + n).className = g('#nav_' + n).className.replace(/\s*i_back\s*/, ' ');//同时处理控制按钮
    }

    elem.className = cls;}
}

addPhotos();

g(".header-nav")[0].addEventListener('click',function(event){
	console.log(this);
	if(event.target.innerHTML == "Home"){
		console.log("Home");
		addPhotos();
	}else if(event.target.innerHTML == "Albums"){
		console.log("ablum");
	}else if(event.target.innerHTML == "About"){
		console.log("me");
		showAbout();
	}
},false);

function showAbout(){
	//var _about = '';
	// _about += '<div class="mask"></div>';
	g(".mask")[0].style.display = "block";

	g("#about").style.display = "block";
	//document.body.innerHTML += _about;
	g(".mask")[0].onclick = function(){
		g(".mask")[0].style.display = "none";

		g("#about").style.display = "none";
	}
}
