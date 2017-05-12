var baseURL = 'http://116.62.7.43/d'

function requestNetWork(url, data, head, method, success, fail, complete) {
  console.log('请求开始!!!!!!')
  var requestURL = null
  if (url.indexOf('http')==0){
    console.log('包含http')
    requestURL = url
  }else{
    requestURL = baseURL+url
  }
  console.log(requestURL)
  wx.request({
    url: requestURL,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: head,
    success: function (res) {
      console.log(res)
      console.log('请求成功！！！！！！！！')
      success(res);
      // success
      // if (res.data.statusCode != 0) {
      //   judgeStatusCode(res.data.statusMessage)
      // } else {
      //   success(res);
      // }
    },
    fail: function (res) {
      console.log('请求失败！！！！！！！！')
      // fail
      fail(res);
    },
    complete: function (res) {
      // complete
      complete(res);
    }
  })
}

// function judgeStatusCode(msg) {
//   wx.showToast({
//     title: msg,
//     duration: 2000
//   })
//   return
// }

module.exports = {
  requestNetWork: requestNetWork
}