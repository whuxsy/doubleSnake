//贪吃蛇类
class Snake {
	constructor(size = 15, type = 1) {
		this.size = size; //单位长度
		this.length = 2; //最开始的身体长度
		this.body = null; //蛇的身体DOM
		this.snakeArr = null; //蛇身体的数组
		this.direct = '39'; //方向【→39，↑38，←37，↓40】
		this.util = new Util();

		this.type = type; //1为1号蛇，2为2号蛇

		let timer = 0; //setInterval的id

		this.createSnake = (element, head_point) => {
			this.map = element ? element : this.map;
			let oldsnake = document.getElementById('snakeBody' + this.type);
			if (oldsnake) {
				this.map.removeChild(oldsnake);
			}
			this.body = this.util.createDom('div');
			this.body.id = 'snakeBody' + this.type;
			this.direct = this.type==1? '68':'39';
			let color = this.type==1? 'red':'black';
			let left = head_point.x * size;
			let top = head_point.y * size;
			let div = null;
			let zindex = 0
			let imgUrl = ''//图片地址

			for (let i = 0; i < this.length; i++) {

				if (i > 0) {
					//身体
					color = this.type==1? '#fff':'green';
					left = head_point.x - this.size * i;
					zindex = i;
					imgUrl = this.type==1? '身体-右.png':'身体2-右.png'
				} else {
					//头
					zindex = this.type == 1 ? 9999:10000;
					imgUrl = this.type==1? '蛇头-右.png':'蛇头2-右.png'
				}
				div = this.util.createDom('div', {
					'width': this.size + 'px',
					'height': this.size + 'px',
					'position': 'absolute',
					'background': 'url(img/'+imgUrl+')',
					'background-size':'contain',
					'left': left,
					'top': top,
					'zIndex': zindex
				});
				this.body.appendChild(div);
				this.snakeArr = this.body.childNodes;
			}
			this.snakeArr[0].id = 'snakeHead' + this.type;

			this.map.appendChild(this.body);
			this.check(); //创建完就开始检测
		}

		this.start = () => {
			clearInterval(timer);
			timer = setInterval(() => {
				let i = 0; //每次运行都是从头部开始
				this.change(i);
			}, 100);
		}



	this.change = (i, x = 0, y = 0) => {

		if (i == 0) { //如果是头部
			let x = this.snakeArr[i].offsetLeft;
			let y = this.snakeArr[i].offsetTop;

			switch (this.direct) {
				case 38: //上
				case 87:
					this.snakeArr[i].style['top'] = y - this.size + 'px';
					this.snakeArr[i].style['background'] = this.type==1?'url(img/蛇头-上.png)':'url(img/蛇头2-上.png)'
					break;
				case 39: //右
				case 68:
					this.snakeArr[i].style['left'] = x + this.size + 'px';
					this.snakeArr[i].style['background'] = this.type==1?'url(img/蛇头-右.png)':'url(img/蛇头2-右.png)'
					break;
				case 40: //下
				case 83:
					this.snakeArr[i].style['top'] = y + this.size + 'px';
					this.snakeArr[i].style['background'] = this.type==1?'url(img/蛇头-下.png)':'url(img/蛇头2-下.png)'
					break;
				case 37: //左
				case 65:
					this.snakeArr[i].style['left'] = x - this.size + 'px';
					this.snakeArr[i].style['background'] = this.type==1?'url(img/蛇头-左.png)':'url(img/蛇头2-左.png)'
					break;
				default:
					this.snakeArr[i].style['left'] = x + this.size + 'px';
					break;
			}
			let food = document.getElementById('food');
			let fx = food.offsetLeft;
			let fy = food.offsetTop;
			if ((this.snakeArr[i].offsetLeft == fx) && (this.snakeArr[i].offsetTop) == fy) { //如果撞到了食物。需要添加一个身体div
				let color = this.type==1? '#fff':'green';
				let imgUrl = this.type==1? 'url(img/身体-右.png)':'url(img/身体2-右.png)';
				let div = this.util.createDom('div', {
					'width': this.size + 'px',
					'height': this.size + 'px',
					'position': 'absolute',
					'background': imgUrl
				});
				this.body.appendChild(div);

			}
			i++;
			this.change(i, x, y);
		} else if (i == this.snakeArr.length) { //如果交替已经到了尾部
			return;
		} else {
			let m = this.snakeArr[i].offsetLeft; //72
			let n = this.snakeArr[i].offsetTop;
			// console.log('i:'+i+'--'+'m:'+m+'x:'+'--'+x);
			this.snakeArr[i].style['left'] = x + 'px';
			this.snakeArr[i].style['top'] = y + 'px';
			i++;
			this.change(i, m, n);
		}
	}

	this.check = () => { //蛇的碰撞检测，包括了身体和墙。
		let timer = setInterval(() => {
			let snakeHead = null;
			snakeHead = document.getElementById('snakeHead' + this.type);
			if (snakeHead.offsetLeft < 0 ||
				snakeHead.offsetLeft > this.map.offsetWidth ||
				snakeHead.offsetTop < 0 ||
				snakeHead.offsetTop > this.map.offsetHeight) {
				// console.log(this.snakeArr.length);
				clearInterval(timer);
				alert(this.type+'号蛇撞墙！失败，游戏结束');
				window.location.reload();

			}
			for (let i = 1; i < this.snakeArr.length; ++i) {
				if (snakeHead.offsetLeft == this.snakeArr[i].offsetLeft && snakeHead.offsetTop == this.snakeArr[i].offsetTop) {
					clearInterval(timer);
					alert(this.type+'号蛇吃到自己了,游戏结束');
					window.location.reload();
				}
			}
		}, 10);
	}

}
}
