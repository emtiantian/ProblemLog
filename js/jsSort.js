/**
 * 当前示例运用js实现常见的10种排序算法，并比较他们的执行时间。
 * 名词说明
 * 非线性时间比较类排序：通过比较来决定元素间的相对次序，由于其时间复杂度不能突破O(nlogn)，因此称为非线性时间比较类排序。
 *
 * 线性时间非比较类排序：不通过比较来决定元素间的相对次序，它可以突破基于比较排序的时间下界，以线性时间运行，因此称为线性时间非比较类排序。
 *
 * 稳定：如果a原本在b前面，而a=b，排序之后a仍然在b的前面。
 *
 * 不稳定：如果a原本在b的前面，而a=b，排序之后 a 可能会出现在 b 的后面。
 *
 * 时间复杂度：对排序数据的总的操作次数。反映当n变化时，操作次数呈现什么规律。
 *
 * 空间复杂度：是指算法在计算机内执行时所需存储空间的度量，它也是数据规模n的函数。
 *
 * 参考链接：http://www.cnblogs.com/onepixel/p/7674659.html#3954636
 *          https://zh.wikipedia.org/wiki/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95
 *
 *
 */

/**
 * 演示用随机数
 * @type {string}
 */
let string = '133 725 473 646 98 599 851 671 281' +
  ' 944 60 191 978 270 624 736 508 321 275 737 713 709 987 824 420 328 417 190 ' +
  '781 179 156 742 819 202 164 422 657 931 43 546 430 261 475 490 304 358 825 729 159 962 ' +
  '273 134 813 669 75 64 896 228 258 783 248 51 1 537 887 881 65 329 507 403 171 840 932 366' +
  ' 489 577 791 391 13 561 319 739 600 957 517 294 661 990 541 885 267 61 268 567 444 966 682 ' +
  '357 263 998 995 168 360 794 797 821 151 861 643 625 675 654 306 947 757 900 548 513 759 109 ' +
  '146 404 31 347 776 441 663 901 498 471 913 528 858 376 3 950 933 335 432 53 785 155 219 938 569 ' +
  '808 906 50 105 2 942 163 232 313 879 407 551 731 158 367 356 524 856 530 97 196 768 635 889 997 346 ' +
  '743 755 583 453 461 107 523 617 793 427 570 604 439 536 752 674 149 598 425 477 113 402 817 132 57 188 868 101 456'

/**
 * 演示用数组
 * @type {string[]}
 */
let Myarrry = string.split(' ')

/**
 * 计算程序执行时间
 * 这里主要发现 如果在构造函数中设置startTime和endTime 会使这2个属性在类之外都可以改变
 * 很容易出现错误使用，所以考虑把这2个属性设置为private 但是发现es6没有实现私有关键字
 * 参照下方链接间接实现（weakmp形式，和symbol形式）选用weakmap形式（此形式符合所有要求）
 * 这里私有变量的问题参考
 * https://juejin.im/entry/572c0b2d2e958a00667a081d
 * https://www.tangshuang.net/3237.html
 *
 */
//定义一个全局静态变量 防止内存溢出 防止外部可访问私有变量
const _mytimeOpts = new WeakMap()

class mytime {

  constructor () {
    let opts = {'startTime': '', 'endTime': ''}
    _mytimeOpts.set(this, opts)
  }

  strat () {
    let startTime = Date.now()
    _mytimeOpts.get(this).startTime = startTime
  }

  end () {
    let endTime = Date.now()
    _mytimeOpts.get(this).endTime = endTime
  }

  getTime () {
    return _mytimeOpts.get(this).endTime - _mytimeOpts.get(this).startTime
  }

}

/**
 *
 * @param num
 * @returns {Array}
 */
function createArr (num,min,max) {
  let arr = []
  while (num>0){
    arr.push( parseInt((max-min)*(Math.random()))+min)
    num --
  }
  return arr
}

/**
 * 冒泡排序
 * 时间复杂度O(n²)  最优 O(n) 空间复杂度 O(1) 稳定
 * 最优需要改进代码增加标示位 最优排序是 数组原本就是顺序
 * bubbleSort1 内部循环应该去掉对数组最后一位的判断
 * 算法描述：
 * 比较临近的2个元素，如果第一个元素较大交换他们
 * 对每一对相邻元素执行上述判断，最后一个元素应该是最大的
 * 再次循环上述判断，比较到lenght -1 位
 * 直到排序完成完成
 */

/**
 *
 * @param arr
 * @returns {*}
 */
function bubbleSort1 (arr) {
  if (!arr) return
  let length = arr.length
  let times = 0
  while (length > 0) {
    for (let i = 0; i < length - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i + 1]
        arr[i + 1] = arr[i]
        arr[i] = tmp
      }
      times++
    }
    length--
  }
  console.log('执行次数' + times)
  return arr
}

/**
 * bubble2
 */
/**
 * 示例版本
 * @param arr
 * @returns {*}
 */
function bubbleSort2 (arr) {
  let times
  let len = arr.length
  times = 0
  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - 1 - i; j++) {
      if (arr[j] > arr[j + 1]) {        // 相邻元素两两对比
        let temp = arr[j + 1]        // 元素交换
        arr[j + 1] = arr[j]
        arr[j] = temp
      }
      times++
    }
  }
  console.log('执行次数' + times)
  return arr
}

/**
 *
 * @param arr
 * @returns {*}
 */
function bubbleSort3 (arr) {
  let len = arr.length
  let times = 0
  let swap = false
  while (len > 0) {
    for (let i = 0; i < len - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i + 1]
        arr[i + 1] = arr[i]
        arr[i] = tmp
        swap = true
        times++
      }
    }
    if (!swap) {break}
    len--
  }
  console.log('执行次数' + times)
  return arr
}

/**
 * 最优bubblesort
 * @param arr
 * @returns {*}
 */
function bubbleSort (arr) {
  let len = arr.length
  let times = 0
  let swap = false
  for (let j = 0; j < len; j++) {
    //len-j-1 不比较已经排好序的部分和本次排序的最后一位
    for (let i = 0; i < len - j - 1; i++) {
      if (arr[i] > arr[i + 1]) {
        let tmp = arr[i + 1]
        arr[i + 1] = arr[i]
        arr[i] = tmp
        swap = true
        times++
      }
    }
    if (!swap) {break}
  }
  console.log('执行次数' + times)
  return arr
}

/**
 * 快速排序
 * 时间复杂度 最优O(n²) 最差O(n²) 空间复杂度 O(1) 稳定
 * 算法描述：
 * 每次寻找最小的（或者最大的）下标  循环n-1 次即可得到有序数组
 *
 */

/**
 * 自己实现版本
 * 出现的问题：排序算法是记录最小数组的下标并不是其中的值，在第一层for循环之后才应该交换数组的值
 * @param arr
 * @returns {*}
 */
function selectionSort1 (arr) {
  let tmp = ''
  let arrlength = arr.length
  let nowIndex = ''
  let times = 0
  for (let i = 0; i < arrlength - 1; i++) {
    nowIndex = i
    for (let j = i + 1; j < arrlength; j++) {
      if (arr[j] < arr[nowIndex]) {
        nowIndex = j
      }
      times++
    }
    tmp = arr[i]
    arr[i] = arr[nowIndex]
    arr[nowIndex] = tmp
  }
  console.log("执行次数"+times)
  return arr
}

/**
 * 网上版本
 * @param arr
 * @returns {*}
 */
function selectionSort2(arr) {
  let len = arr.length;
  let minIndex, temp,times=0;

  for (let i = 0; i < len - 1; i++) {
    minIndex = i;
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     // 寻找最小的数
        minIndex = j;                 // 将最小数的索引保存
      }
      times++
    }
    temp = arr[i];
    arr[i] = arr[minIndex];
    arr[minIndex] = temp;
  }
  console.log("执行时间"+times);
  return arr;
}

/**
 * 插入排序
 * 时间复杂度  最差O(n²) 最好O(n) 空间复杂度 O(1) 稳定
 * 算法描述：第一个数视为有序，对比下一位，较大的放置在右面，依次右向左比较 重复上述步骤n-1次即为有序
 */
/**
 *
 * @param arr
 * @returns {*}
 */
function insertionSort1(arr){
  let len = arr.length
  let i = 1
  let j = 0
  let tmp = 0
  let current = 0
  let times = 0
  for(i;i<len;i++){
    j=i-1
    current = arr[i]
    for(j;j>0;j--){
      if(arr[j] < current){

          continue
      }else{
        tmp = arr[j]
        arr[j] = current
        arr[j+1] = tmp
      }
      times++
    }
  }
  console.log("执行次数"+times)
  return arr
}

/**
 *
 * @param arr
 * @returns {*}
 */
function insertionSort2(arr) {
  var len = arr.length;
  var preIndex, current,times=0;
  for (var i = 1; i < len; i++) {
    preIndex = i - 1;
    current = arr[i];
    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex];
      preIndex--;
      times++
    }
    arr[preIndex + 1] = current;
  }
  console.log("执行次数"+times);
  return arr;
}

/**
 * test 以下都是测试
 */

/**
 * symbol 模式 创建私有变量
 * @type {symbol}
 * @private
 */
const _startTime = Symbol('startTime')
const _endTime = Symbol('endTime')

class mytime1 {

  constructor () {
    this[_startTime] = ''
    this[_endTime] = ''
  }

  strat () {
    this[_startTime] = Date.now()
  }

  end () {
    this[_endTime] = Date.now()
  }

  getTime () {
    return this[_endTime] - this[_startTime]
  }

}

/**
 * 测试自定义类 是否有作用
 */
function testMytime () {
  let s = new mytime1()
  s.strat()
  setTimeout(() => {
    s.end()
    console.log(s.getTime())
  }, 1000)
}

/**
 *
 * @param sort
 * @param arr
 * @param Boolean
 */
function main (sort, arr,showArr=false) {
  let _time = new mytime()

  _time.strat()
  //用于数组的深度拷贝 使测试代码可以一起测试
  let _newArray = sort(arr.concat())
  _time.end()
  if(showArr){
    console.dir(_newArray)
  }

  console.log('执行时间' + _time.getTime())
}

const bobbleOptimumArr = [1, 2, 3, 4, 5]
// 冒泡排序
// 执行时间在太短的情况下并不准确
// main(bubbleSort1, Myarrry)
// main(bubbleSort2, Myarrry)
// main(bubbleSort3, Myarrry)
// main(bubbleSort, Myarrry)

// main(bubbleSort1, bobbleOptimumArr)
// main(bubbleSort2, bobbleOptimumArr)
// main(bubbleSort3, bobbleOptimumArr)
// main(bubbleSort, bobbleOptimumArr)

// 选择排序
// main(selectionSort1, Myarrry)
// main(selectionSort2, Myarrry)

// 查看初始化占用时间为3毫秒
// let  randowArr = createArr(10000,1,100);
// main(selectionSort2, randowArr)
// main(selectionSort1, randowArr)

// 执行时间49995000
// 执行时间94
// 执行次数49995000
// 执行时间91

// 插入排序
const testArr = [1,2,4,5,6,88,9,20,18,7,10,9]
main(insertionSort1,testArr,true)
main(insertionSort2,testArr,true)



