class App {
	constructor() {
		this.map = null;
		this.food = null;
		this.snake_1 = null; //1号蛇
		this.snake_2 = null; //2号蛇
		this.init = () => { //初始化游戏
			this.map = new Map(1510, 680);
			let map = this.map.show(); //获得mapDOM

			this.food = new Food(); //创建食物
			this.food.createFood(map);

			this.snake_1 = new Snake(15, 1); //创建1号蛇（按键wasd）
			this.snake_1.createSnake(map, {
				x: 10,
				y: 5
			});

			this.snake_2 = new Snake(15, 2); //创建2号蛇（按键↑↓←→）
			this.snake_2.createSnake(map, {
				x: 50,
				y: 5
			});
		}

		this.start = () => { //开始游戏
			this.snake_1.start();
			this.snake_2.start();
			setInterval(()=>{this.press(),this.judge_ans(), this.eat_snake()},101)
		}

		//按键检测
		this.press = () => { //获取每次按下键值。
			document.onkeydown = (ev) => {
				let code = ev.keyCode ? ev.keyCode : ev.switch;

				switch (code) { //向正方向走的时候，按反方向无效
					case 38: //上
						this.snake_2.direct = this.snake_2.direct == 40 ? 40 : 38;
						break;
					case 39: //右
						this.snake_2.direct = this.snake_2.direct == 37 ? 37 : 39;
						break;
					case 40: //下
						this.snake_2.direct = this.snake_2.direct == 38 ? 38 : 40;
						break;
					case 37: //左
						this.snake_2.direct = this.snake_2.direct == 39 ? 39 : 37;
						break;
					case 87: //上
						this.snake_1.direct = this.snake_1.direct == 83 ? 83 : 87;
						break;
					case 68: //右
						this.snake_1.direct = this.snake_1.direct == 65 ? 65 : 68;
						break;
					case 83: //下
						this.snake_1.direct = this.snake_1.direct == 87 ? 87 : 83;
						break;
					case 65: //左
						this.snake_1.direct = this.snake_1.direct == 68 ? 68 : 65;
						break;
				}
			}
		}
		
		//头部碰撞检测
		this.judge_ans = () =>{ 
			let x_1 = this.snake_1.snakeArr[0].offsetLeft;
			let y_1 = this.snake_1.snakeArr[0].offsetTop;
			let x_2 = this.snake_2.snakeArr[0].offsetLeft;
			let y_2 = this.snake_2.snakeArr[0].offsetTop;
			if(x_1 == x_2 && y_1 == y_2){
				//头部碰撞
				let len_1 = this.snake_1.snakeArr.length;
				let len_2 = this.snake_2.snakeArr.length;
				if(len_1 > len_2){
					alert('1号蛇胜出！')
					window.location.reload();
				}
				else if(len_1 == len_2){
					alert('平局')
					window.location.reload();
				}
				else{
					alert('2号蛇胜出！')
					window.location.reload();
				}
			}
			else{
				return;
			}
		}
		
		
		//吃到另一条蛇的身子
		this.eat_snake=()=>{
			let head_x_1 = this.snake_1.snakeArr[0].offsetLeft;
			let head_y_1 = this.snake_1.snakeArr[0].offsetTop;
			let head_x_2 = this.snake_2.snakeArr[0].offsetLeft;
			let head_y_2 = this.snake_2.snakeArr[0].offsetTop;
			let snakeBody1 = document.getElementById('snakeBody1');
			let snakeBody2 = document.getElementById('snakeBody2');
			//检测1号蛇有没有吃到2号蛇
			for(let i = 1; i < this.snake_2.snakeArr.length; i++){
				if(head_x_1 == this.snake_2.snakeArr[i].offsetLeft &&
				 head_y_1 == this.snake_2.snakeArr[i].offsetTop){
					 //2删除被吃到部分以及之后的节点
					 for(let j = i; j < this.snake_2.snakeArr.length; j++){
						let node = snakeBody2.removeChild(snakeBody2.childNodes[j]);
						//node.style['color'] = '#fff';
						//snakeBody1.appendChild(node);
					}
				 }
			}
			//检测2号蛇有没有吃到1号蛇
			for(let i = 1; i < this.snake_1.snakeArr.length; i++){
				if(head_x_2 == this.snake_1.snakeArr[i].offsetLeft &&
				 head_y_2 == this.snake_1.snakeArr[i].offsetTop){
					 //1删除被吃到部分以及之后的节点
					 for(let j = i; j < this.snake_1.snakeArr.length; j++){
						let node = snakeBody1.removeChild(snakeBody1.childNodes[j]);
						//node.style['color'] = 'green';
						//snakeBody2.appendChild(node);
					}
				 }
			}
		}

	}
}
