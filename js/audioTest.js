$(function () {
  //存储上一次报警数据
  var arrayWindTurbineOld
  var isbind = false
  //audio对象
  var alarmAudio = null
  alarmAudio = new Audio()
  alarmAudio.addEventListener('ended', nextPlay, false)

  function nextPlay () {
    //使用juqery包装一下 准备使用触发器模式
    $(alarmAudio).trigger('nextPlay')
  }

  /**
   * 循环报警
   * @param alarmWindTurbine
   */
  function alarmVoice (alarmWindTurbine) {
    //如果数据不变不做处理
    if (arrayWindTurbineOld == alarmWindTurbine) {
      return
    } else {
      //记录当前报警数据
      arrayWindTurbineOld = alarmWindTurbine
      //报警数据数组
      var arrayWindTurbine = new Array()
      //声音文件数组
      var arr = new Array()
      //临时数组
      var tmp = new Array()
      //清空频率（每100次重新初始化audio）
      var times = 1
      //当前运行次数
      var _nowTimes = 0

      console.dir(alarmAudio)

      if (alarmWindTurbine == '') {
        //没有报警 播放数据置空
        arr = []
      } else {
        //处理字符串
        if (alarmWindTurbine.indexOf(',')) {
          arrayWindTurbine = alarmWindTurbine.split(',')
        }
        else {
          arrayWindTurbine.push(alarmWindTurbine)
        }
        //生产播放数组
        for (var i = 0; i < arrayWindTurbine.length; i++) {
          arrayWindTurbine[i] = arrayWindTurbine[i].replace('\#', '')
          arr.push('../common/audio/' + arrayWindTurbine[i] + '.mp3')
        }
      }

      if (arr.length > 0) {
        tmp = null
        tmp = arr.concat()
        palyAudio()
      } else {
        alarmAudio.pause()
      }

      function palyAudio () {

        if (tmp.length == 0) {
          tmp = arr.concat()
        }
        // delete  alarmAudio.src
        alarmAudio.src = tmp.shift()
        alarmAudio.play()
        if (!isbind) {
          isbind = true
          $(alarmAudio).on('nextPlay', palyAudio)
        }
      }

    }

  }

  // how to destroy html  audio

  setTimeout(function () {
    alarmVoice('1,2,3')
  }, 500)

})
