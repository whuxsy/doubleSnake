//地图类
class Map {
	constructor(width,height) {
		this.width = width;
		this.height = height;
		this.mapDom = null; //map的DOM对象
		this.util = new Util();//工具
		//创建一个map的DOM对象
		this.createMap = function() {
			var div = this.util.createDom('div', {
				'width': this.width + 'px',
				'height': this.height + 'px',
				'position': 'relative',
				'background': 'gray'
			});
			div.id = 'map';
			return div;
		}
		//展示地图
		this.show = function() {
			this.mapDom = this.createMap(); //创建一个地图
			var body = document.getElementsByTagName('body')[0];
			body.appendChild(this.mapDom);
			return this.mapDom;
		}
	}
}
