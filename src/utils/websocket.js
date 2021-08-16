import cookies from 'vue-cookies'

let wsocket = null
let callbackMsg = null

// 初始化连接
let initWebSocket = function (wsKey) {
  //判断当前浏览器是否支持WebSocket
  if ('WebSocket' in window) {
    let host = window.location.host
    wsocket = new WebSocket(`ws://${host}/ws/websocket/${wsKey}?access_token=${cookies.get('tokenWeb')}`)

    // 成功建立连接回调方法
    wsocket.onopen = function() {
      // 成功建立连接后，开启心跳检测
      heartCheck.reset().start();
      console.log("==============成功建立消息通信==========");
    }

    // 连接发生错误回调方法
    wsocket.onerror = function () {
      console.log("=============消息接收失败==============");
    }

    // 连接接收到消息回调方法
    wsocket.onmessage = function (event) {
      let msg = event.data;
      if (msg != null && msg != '' && msg != 'ping' && msg != 'resLogin') {
        if (msg == 'FINISH' || msg == 'FAIL') {
          // 测试完成 关闭连接
          wsocket.send("CLOSE")
        }
        callbackMsg(msg)
      } else if (msg == 'resLogin'){
        // TODO 异地登陆强制退出操作
      }
    }

    // 连接关闭回调方法
    wsocket.onclose = function () {
      heartCheck.reset();
      console.log("==============连接关闭=================");
    }

    //监听窗口关闭事件，当窗口关闭时，主动去关闭websocket连接，防止连接还没断开就关闭窗口，server端会抛异常。
    window.onbeforeunload = function() {
      wsocket.onclose();
    }

  }
}

// 心跳检测
let heartCheck = {
  serverTimeoutObj: null,
  reset: function(){
    clearTimeout(this.serverTimeoutObj);
    return this;
  },
  start: function(wsKey){
    this.serverTimeoutObj = setInterval(function(){
      if(wsocket.readyState == 1){
        // 如果获取到消息，说明连接是正常的，重置心跳检测
        wsocket.send("ping");
        heartCheck.reset().start();
      }else{
        //console.log("断开状态，尝试重连");
        initWebSocket(wsKey);
      }
    }, 55000)
  }
}

// 开启连接
let openSocket = function (wsKey,callback) {
  callbackMsg = callback;
  initWebSocket(wsKey);
}
let closeSocket = function () {
  heartCheck.reset();
  console.log("==============连接关闭=================");
}

export {
  openSocket,
  closeSocket
}
