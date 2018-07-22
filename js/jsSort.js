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
 * 判断是否有序
 * @param array
 * @returns {boolean}
 */
function isOrdered (array) {
  let length = array.length
  let i = 0
  for (i; i < length; i++) {
    if (array[i] > array[i + 1]) {
      return false
    }
  }
  return true
}

/**
 * 演示用随机数
 * @param max
 * @param min
 * @param num
 * @returns {Array}
 */
function createArray (max, min, num) {
  let arr = [],
    i = 0
  for (i; i < num; i++) {
    arr.push(Math.round(Math.random() * (max - min) + min))
  }
  return arr
}

// console.dir(createArray(1000,100,10));

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
 * 冒泡排序
 * 时间复杂度O(n²)  最优 O(n)
 * 空间复杂度 O(1) 稳定
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
  console.log('交换次数' + times)
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
  console.log('交换次数' + times)
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
  console.log('交换次数' + times)
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
  console.log('交换次数' + times)
  return arr
}

/**
 * 选择排序
 * 时间复杂度 最优O(n²) 最差O(n²)
 * 空间复杂度 O(1) 稳定
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
  console.log('交换次数' + times)
  return arr
}

/**
 * 网上版本
 * @param arr
 * @returns {*}
 */
function selectionSort2 (arr) {
  let len = arr.length
  let minIndex, temp, times = 0

  for (let i = 0; i < len - 1; i++) {
    minIndex = i
    for (let j = i + 1; j < len; j++) {
      if (arr[j] < arr[minIndex]) {     // 寻找最小的数
        minIndex = j                 // 将最小数的索引保存
      }
      times++
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  console.log('执行时间' + times)
  return arr
}

/**
 * 插入排序
 * 时间复杂度  最差O(n²) 最好O(n)
 * 空间复杂度 O(1) 稳定
 * 算法描述：第一位数视为有序，对比下一位，较大的放置在右面，依次右向左比较 重复上述步骤n-1次即为有序
 */
/**
 *
 * @param arr
 * @returns {*}
 */
function insertionSort1 (arr) {
  let len = arr.length,
    i = 1,
    j = 0,
    tmp = 0,
    current = 0,
    times = 0
  for (i; i < len; i++) {
    j = i - 1
    current = arr[i]
    //这里应该详细考虑是否包含0的问题
    for (j; j >= 0; j--) {
      if (arr[j] <= current) {
        //这里有2点要注意对相等的值也不做比较直接跳出
        //这里要使用break跳出当前循环而不是continue
        break
      } else {
        tmp = arr[j]
        arr[j] = current
        arr[j + 1] = tmp
        times++
      }
    }
  }
  console.log('交换次数' + times)
  return arr
}

/**
 * 参考网站上的实现方式
 * @param arr
 * @returns {*}
 */
function insertionSort2 (arr) {
  var len = arr.length
  var preIndex, current, times = 0
  for (var i = 1; i < len; i++) {
    preIndex = i - 1
    current = arr[i]

    while (preIndex >= 0 && arr[preIndex] > current) {
      arr[preIndex + 1] = arr[preIndex]
      preIndex--
      times++
    }
    arr[preIndex + 1] = current
  }
  console.log('交换次数' + times)
  return arr
}

/**
 * 希尔排序
 * 时间复杂度 最差 O(n²) 最优O(nlog²n) 平均 O(nlogn)
 * 稳定性 不稳定
 * 算法描述
 * 希尔排序是变步长的插入排序，步长是影响效率的关键因素，只要是步长最后一步是1的都可以实现排序
 * 最佳步长(1, 5, 19, 41, 109,...) 这个步长怎么算没找到   数据规模变化步长性能不同  有个问题交换次数多了时间竟然还短(这个可能是维基上说的主要是比较而不是交换)
 * 参考 https://zh.wikipedia.org/wiki/%E5%B8%8C%E5%B0%94%E6%8E%92%E5%BA%8F
 */
/**
 * 自己实现版本
 * @param arr
 * @returns {*}
 */
function shellSort (arr) {
  let len = arr.length,
    temp,
    gap = 1,
    times = 0,
    min = -1
  // 根据数据规模算出最大步长  这个算法是例子中的来源于《算法（第4版）》 并非最优 （gap*3+1 ）不如 （gap/2） 下取整
  // 数据规模变化步长性能不同
  while (gap < len / 3) {
    gap = gap * 3 + 1
  }
  // gap = Math.floor(len/2)
  //根据步长进行插入排序
  while (gap > 0) {
    for (let i = gap; i < len; i ++) {
      temp = arr[i]
      for (let j = i - gap; j >= 0; j -=gap ) {
        if (temp < arr[j]) {
          arr[j+gap] = arr[j]
          min = j
          times++
        }else{
          break
        }
      }
      if (min != -1) {
        arr[min] = temp
      }
      min = -1
    }
    gap = (gap - 1) / 3
    // gap = Math.floor(gap/2)

  }
  console.log('交换次数：' + times)
  return arr
}

/**
 * 网上版本
 * @param arr
 * @returns {*}
 */
function shellSort1 (arr) {
  var len = arr.length,
    temp,
    gap = 1,
    tiems = 0
  while (gap < len / 3) {          // 动态定义间隔序列
    gap = gap * 3 + 1
  }
  for (gap; gap > 0; gap = Math.floor(gap / 3)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
        tiems++
      }
      arr[j + gap] = temp
    }
  }
  console.log('交换次数：' + tiems)
  return arr
}

/**
 * 网上实现版本2
 * @param arr
 * @returns {*}
 */
function shellSort2 (arr) {
  var len =arr.length,
  gap = Math.floor(len/2),
  times = 0 ;
  while(gap!==0){
    for(var i = gap;i<len;i++){
      var temp = arr[i];
      var j;
      for(j=i-gap;j>=0&&temp<arr[j];j-=gap){
        arr[j+gap] = arr[j];
        times++
      }
      arr[j+gap] = temp;
    }
    gap=Math.floor(gap/2);
  }
  console.log("执行次数："+ times)
  return arr;
}

function shellSort3 (arr) {
    let len = arr.length;
    let gap, i, temp;
    var j
    for(gap = Math.floor(len/2); gap > 0; gap =Math.floor(gap/2)) {
      //插入排序简洁写法
      for(i = gap; i < len; i++) {
        temp= arr[i];
        for(j = i-gap; j>=0 && arr[j]>temp; j-=gap)
          arr[j+gap] = arr[j];
        arr[j+gap] = temp;
      }
    }
    return arr
}

/**
 * 复制示例1 的方法 修改步长计算
 * @param arr
 * @returns {*}
 */
function shellSort4 (arr) {
  var len = arr.length,
    temp,
    gap = 1,
    tiems = 0
  // while (gap < len / 3) {          // 动态定义间隔序列
  //   gap = gap * 3 + 1
  // }
  gap = Math.floor( len/ 2)
  for (gap; gap > 0; gap = Math.floor(gap / 2)) {
    for (var i = gap; i < len; i++) {
      temp = arr[i]
      for (var j = i - gap; j >= 0 && arr[j] > temp; j -= gap) {
        arr[j + gap] = arr[j]
        tiems++
      }
      arr[j + gap] = temp
    }
  }
  console.log('交换次数：' + tiems)
  return arr
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
function main (sort, arr, showArr = false) {
  let _time = new mytime(),
    _isolder = '无序'
  _time.strat()
  //用于数组的深度拷贝 使测试代码可以一起测试
  console.log('深度复制后的数组是否相等：' + arr.concat === arr)
  let _newArray = sort(arr.concat())
  _time.end()
  if (showArr) {
    console.dir(_newArray)
  }
  if (isOrdered(_newArray)) {
    _isolder = '有序'
  }

  console.log('执行结果是否有序：' + _isolder)
  console.log('执行时间：' + _time.getTime() + 'ms')
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
// 交换次数49995000
// 执行时间91

// 插入排序
// const testArr = [1,2,4,5,6,88,9,20,18,7,10,9]
const testArr = [1, 2, 4, 5, 6, 7, 10, 100, 100,88,99,102,3,78,44,23]
let testArr1 = createArray(10000000, 1, 9000000)
// main(insertionSort1, testArr1, false)
// main(insertionSort2, testArr1, false)
// main(selectionSort1, testArr1, false)
// main(bubbleSort,testArr1,false)
// main(shellSort, testArr1, true)
// main(shellSort1, testArr1, true)
// main(shellSort2, testArr1, true)

main(shellSort, testArr1, false)
main(shellSort1, testArr1, false)
main(shellSort2, testArr1, false)
main(shellSort3, testArr1, false)
main(shellSort4, testArr1, false)
console.log( 23.101493571 * 9000000)
