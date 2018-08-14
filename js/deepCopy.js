// #### 对于拷贝数组不包含引用类型的时候
// 1. es6数组扩展 `...`  `let a = {title:"123"} ,b = {...a,view:"xxx.html"}`
// 2. es5数组方法 `concat`
// 3. 遍历重新创建
// 4. 转为json `let a = [{a:1}],let b = JSON.parse(JSON.stringify(a))`
// 5. 第三方扩展 lodash,lazy.js,Underscore.js
//
// #### 对于拷贝数组包含引用类型的时候
// 1. 遍历重新创建
// 2. 转为json `let a = [{a:1}],let b = JSON.parse(JSON.stringify(a))`
// 3. 第三方扩展 lodash,lazy.js,Underscore.js