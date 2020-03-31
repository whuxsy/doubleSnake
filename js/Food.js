class Food {
	constructor(size = 15) {
		this.size = size;
		this.x = 0;
		this.y = 0;
		this.map = null; //mapDOM对象
		this.util = new Util();//工具
		this.createFood = (element) => {
			this.map = element ? element : this.map;
			var food = document.getElementById('food'); //获取mapDOM里的食物对象
			if (food) {
				//食物不为空，清除
				this.map.removeChild(food);
			}
			this.map.appendChild(this.getRandomFood());
			this.check();
		}

		//获取随机地址，创建一个foodDOM
		this.getRandomFood = () => {
			//获取随机地址
			let w = (this.map.offsetWidth-2) / this.size; //获取横向格子数
			let h = (this.map.offsetHeight-2) / this.size; //获取纵向格子数
			this.x = parseInt(Math.random() * w) * this.size;
			this.y = parseInt(Math.random() * h) * this.size;
			//创建一个foodDOM
			let food = this.util.createDom('div', {
				'width': this.size + 'px',
				'height': this.size + 'px',
				'background': 'url(img/食物.png)',
				'background-size':'contain',
				'position': 'absolute',
				'top': this.y + 'px',
				'left': this.x + 'px'
				 
			});
			food.id = 'food';
			return food;
		}


		//每10ms检测蛇有没有吃到食物
		this.check = () => {
			setInterval(() => {
				if (this.map.childNodes[1]) {
					//蛇头
					var snakeHead1 = document.getElementById('snakeHead1');
					var snakeHead2 = document.getElementById('snakeHead2');
					if (snakeHead1.offsetLeft && snakeHead1.offsetTop && snakeHead2.offsetLeft && snakeHead2.offsetTop) {
						if (this.x == snakeHead1.offsetLeft && this.y == snakeHead1.offsetTop ||
						(this.x == snakeHead2.offsetLeft && this.y == snakeHead2.offsetTop)) {
							this.createFood();
						}
					}
				}
			}, 10)
		}
	}
}
