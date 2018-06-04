$(function () {
  var alarmAudio = new Audio()
  alarmAudio.hidden = 'hidden'
  alarmAudio.preload = true
  alarmAudio.controls = true
  $(document.body).append(alarmAudio)
  alarmAudio.loop = false
  var arrayWindTurbineOld

  function alarmVoice (alarmWindTurbine) {

    if (arrayWindTurbineOld == alarmWindTurbine) {
      return
    } else {
      var arrayWindTurbine = new Array()
      var arr = new Array()
      var tmp = new Array()
      arrayWindTurbineOld = alarmWindTurbine

      if (alarmWindTurbine == '') {
        arr = []
      } else {

        if (alarmWindTurbine.indexOf(',')) {
          arrayWindTurbine = alarmWindTurbine.split(',')
        }
        else {
          arrayWindTurbine.push(alarmWindTurbine)
        }

        for (var i = 0; i < arrayWindTurbine.length; i++) {
          arrayWindTurbine[i] = arrayWindTurbine[i].replace('\#', '')
          arr.push('../common/audio/' + arrayWindTurbine[i] + '.mp3')
        }

      }

      if (arr.length > 0) {
        tmp = arr.concat()
        palyAudio()
      } else {
        alarmAudio.pause()
      }

      function palyAudio () {
        if (tmp.length == 0) {
          tmp = arr.concat()
        }
        alarmAudio.src = tmp.shift()
        alarmAudio.removeEventListener('ended', canplay, false)
        alarmAudio.addEventListener('ended', canplay, false)
        alarmAudio.play()
      }

      function canplay () {
        palyAudio()
      }

    }

  }
  setInterval(function () {
    alarmVoice('1,2,3')
  },500)


})
