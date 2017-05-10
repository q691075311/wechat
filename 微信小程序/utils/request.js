var baseURL = 'http://116.62.7.43/d'

function requestNetWork(url, data, head, method, success, fail, complete) {
  console.log('请求开始!!!!!!')
  console.log(data)
  console.log(head)
  wx.request({
    url: baseURL + url,
    data: data,
    method: method, // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    header: head,
    success: function (res) {
      console.log('请求成功！！！！！！！！')
      // success
      if (res.data.statusCode != 0) {
        judgeStatusCode(res.data.statusMessage)
      } else {
        success(res);
      }
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

function judgeStatusCode(msg) {
  wx.showToast({
    title: msg,
    duration: 2000
  })
  return
}

module.exports = {
  requestNetWork: requestNetWork
}