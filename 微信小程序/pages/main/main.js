// pages/main/main.js
var netWork = require('../../utils/request.js')
var app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
    typeArr: [],
    DWITH: app.systemInfo.windowWidth,
    DHEIGTH: app.systemInfo.windowHeight,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  imageclock: function (e) {
    var link = e.currentTarget.dataset.link
    console.log(link)
    wx.navigateTo({
      url: '../webview/webview?url=' + link,
      success: function (res) {

      },
      fail: function (res) {
        console.log(res)
      },
      complete: function (res) { },
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    var self = this
    requestADList(self)
    requestActType(self)
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})

// 请求广告内容
function requestADList(self) {
  netWork.requestNetWork('/phone/product/bannerList', {}, {}, 'POST',
    function success(res) {
      var bannerList = res.data.attribute.list
      console.log(bannerList)
      self.setData({
        arr: bannerList,
      })
    },
    function fail(res) {

    },
    function complete(res) {

    }
  )
}
// 请求产品类型
function requestActType(self) {
  netWork.requestNetWork('/phone/productType/list', {}, {}, 'POST',
    function success(res) {
      var dataArr = res.data.attribute.list
      var obj = [{'id': 0,'pictureAddress': 'all','typeName': '全部'}]
      dataArr = obj.concat(dataArr)
      console.log('获取产品类型的数据')
      console.log(dataArr)
      self.setData({
        typeArr: dataArr
      })
    },
    function fail() {
      console.log(res)
    },
    function complete() {

    }
  )
}