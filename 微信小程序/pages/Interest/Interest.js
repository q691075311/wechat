// pages/interest/interest.js
var netWork = require('../../utils/request.js')

Page({
  data: {
    rightimage: 'rightcopy.png',
    arr: [],
    selecterIndex: [],
    selecterimage: null,
  },
  onLoad: function (options) {
    // 页面初始化 options为页面跳转所带来的参数
    var that = this
    var token = wx.getStorageSync('token')
    var uid = wx.getStorageSync('uid')
    netWork.requestNetWork('/phone/interestInquirer/list', {}, { "token": token, "uid": uid }, 'POST',
      function success(res) {
        var listarr = res.data.attribute.list
        var index = new Array()
        for (var i = 0; i < listarr.length; i++) {
          index[i] = '0';
        }
        that.setData({
          arr: listarr,
          selecterIndex: index,
        })
      },
      function fail(res) {

      },
      function complete(res) {

      }
    )
  },
  // 选中的按钮
  selecter: function (e) {
    // console.log(e)
    var index = e.target.id
    var typeStr = this.data.selecterIndex[index] == '1' ? '0' : '1'
    this.data.selecterIndex[index] = typeStr
    this.setData({
      selecterIndex: this.data.selecterIndex
    })
  },
  // 下一步
  next: function () {
    var seleStr = ''
    for (var i = 0; i < this.data.selecterIndex.length; i++) {
      if (this.data.selecterIndex[i] == '1') {
        var str = this.data.arr[i].id
        if (seleStr.length == 0) {
          seleStr = str
        } else {
          seleStr = seleStr + ',' + str
        }
      }
    }
    console.log(seleStr)
    if (seleStr.length == 0) {
      wx.showToast({
        title: '至少选择一种兴趣！',
      })
      return
    }
    saveUserInterestRequest(seleStr)
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

function saveUserInterestRequest(e) {
  var token = wx.getStorageSync('token')
  var uid = wx.getStorageSync('uid')
  netWork.requestNetWork('/phone/interestInquirer/saveUserInterest', { "interest": e }, { "token": token, "uid": uid }, 'POST',
    function success(res) {
      wx.showToast({
        title: '保存兴趣成功！',
      })
    },
    function fail(res) {

    },
    function complete(res) {

    }
  )
}