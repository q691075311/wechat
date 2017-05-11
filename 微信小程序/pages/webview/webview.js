// pages/webview/webview.js
var WxParse = require('../../wxParse/wxParse.js')
var netWork = require('../../utils/request.js')
Page({

  /**
   * 页面的初始数据
   */
  data: {
    htmldata: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    var that = this
    var pam = options.url
    console.log('传值过来的URL！！！')
    console.log(pam)
    netWork.requestNetWork('http://www.baidu.com/', {}, {}, 'GET',
      function success(res) {
        console.log('webview解析到的值！！！！！')
        console.log(res.data)

        var article = this.data.htmldata
        // WxParse.wxParse(article, 'html', article, that, 5);
        console.log('WxParse结束！！！！！！！')

        that.setData({
          htmldata:res.data,
        })
      },
      function fail(res) {
        console.log('webvie请求失败！！！')
      },
      function complete(res) {

      },
    )

    
    /**
    * WxParse.wxParse(bindName , type, data, target,imagePadding)
    * 1.bindName绑定的数据名(必填)
    * 2.type可以为html或者md(必填)
    * 3.data为传入的具体数据(必填)
    * 4.target为Page对象,一般为this(必填)
    * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
    */
    
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