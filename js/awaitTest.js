/**
 * 测试 es6异步使用方式
 * 结论： es6 异步需要在异步方法中使用 async标明函数是异步的 其他调用异步函数 不需要考虑
 * async function 返回的是一个Promise对象
 *
 */
function a () {
  return new Promise((resolve) => {
    setTimeout(resolve,2000)
  })
}
function b () {
  return new Promise((resolve, reject)=>{
    setTimeout(resolve,4000)
  })

}

async function c () {
  console.log("1")
  await a();
  console.log("2")
  await b();
  console.log("3")
}

function main(){
  console.log("4")
  c().then(()=>{
    console.log("5")
  })
  console.log("6")
}

async function main1(){
  console.log("4")
  await c().then(()=>{
    console.log("5")
  })
  console.log("6")
  return "123";
}

// main() // 4,1,6,2,3,5
main1().then((re)=>{console.log(re)})// 4,1,2,3,5,6 123