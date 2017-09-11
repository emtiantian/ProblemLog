//js 封装 简单模式
function cat (name,type){
	this.name = name;
	this.type = type;
}

var cat1 = new cat("haohe","type1");
var	cat2 = new cat("shiyang","type2");
console.log(cat1.constructor === cat); // constructor 指向对象的构造函数 
console.log( cat2 instanceof cat) // instanceof 验证实例对象与原型对象之间的关系。
console.log( cat2 instanceof cat1.constructor) 

// js 封装不变的属性 与方法 优先考虑 proptotype

