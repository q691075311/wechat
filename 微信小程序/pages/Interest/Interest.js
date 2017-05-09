// pages/interest/interest.js
Page({
  data: {
    rightimage: 'rightcopy.png',
    arr: [],
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var token = wx.getStorageSync('token')
    var uid = wx.getStorageSync('uid')
    wx.request({
      url: 'http://116.62.7.43/d/phone/interestInquirer/list',
      data: {},
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        "token": token,
        "uid": uid
      }, // 设置请求的 header
      success: function (res) {
        // success
        // console.log(res.data.attribute.list)
        var listarr = res.data.attribute.list;
        console.log(listarr)
        that.setData({
          arr: listarr,
        })
      },
      fail: function (res) {
        // fail
      },
      complete: function (res) {
        // complete
      }
    })
  },
  selecter: function (e) {
    console.log(e)
    var that = this;
    console.log('222222')
    if (that.data.rightimage == 'rightcopy.png') {
      console.log('3333333')
      that.setData({
        rightimage: 'right.png'
      })
    }else{
      console.log('3333333')
      that.setData({
        rightimage: 'rightcopy.png'
      })
    }
  },
  onReady: function () {
    // 页面渲染完成
  },
  onShow: function () {
    // 页面显示
  },
  onHide: function () {
    // 页面隐藏
  },
  onUnload: function () {
    // 页面关闭
  }
})