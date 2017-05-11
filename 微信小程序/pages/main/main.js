// pages/main/main.js
var netWork = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    arr: [],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    netWork.requestNetWork('http://116.62.7.43/d/phone/product/bannerList', {}, {}, 'POST',
      function success(res) {
        var bannerList = res.data.attribute.list
        console.log(bannerList)
        that.setData({
          arr: bannerList,
        })
      },
      function fail(res) {

      },
      function complete(res) {

      }
    )
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