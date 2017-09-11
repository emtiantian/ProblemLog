//IIFE 模式 即自执行函数

//var a = [];
//for (var i = 0; i < 10; i++) {
//a[i] = function () {
//  console.log(i);
//  return i;
//};
//}
//a[1](); // 6

//生成器函数 (generator function)  
//生成器是一种可以从中退出并在之后重新进入的函数。生成器的环境（绑定的变量）会在每次执行后被保存，下次进入时可继续使用。
//调用一个生成器函数并不马上执行它的主体，而是返回一个这个生成器函数的迭代器（iterator）对象。
//当这个迭代器的next()方法被调用时，生成器函数的主体会被执行直至第一个yield表达式，该表达式定义了迭代器返回的值，或者，被 yield*委派至另一个生成器函数。
//next()方法返回一个对象，该对象有一个value属性，表示产出的值，和一个done属性，表示生成器是否已经产出了它最后的值。

//function* fibs() {
//let a = 0;
//let b = 1;
//while (true) {
//	console.log("前"+a);//0 
//  yield a;// 每次yield 会保存上一次的a 
//  [a, b] = [b, a + b];
//  console.log("后"+a); //1
//}
//}
//
//let [first, second, third, fourth, fifth, sixth] = fibs();
//console.log(first); //0
//console.log(sixth); //5
//sixth // 5

//解构赋值
//var {x:y = 3} = {x: 5};
////console.log(x); // x应该没有值 x不止没有值  而且没有被创建 解构的默认值要严格和undefine 比较
//console.log(y);// 5

//math 函数 能解构出3个方法 math是一个可以解构的 方法
//console.dir(Math);
//let { log, sin, cos } = Math;
//console.log(log);
