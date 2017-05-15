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
    imageSrc: null,
    redColorIndex: 0,
    actListArr: [],
    selecterTypeID: '',
    reachBottomCount: 1,
    isAllowLoadMore: true,
    DWITH: app.systemInfo.windowWidth,
    DHEIGTH: app.systemInfo.windowHeight,
  },
  /**
   * 切换活动类型
   */
  changetype: function (e) {
    this.setData({
      actListArr: []
    })
    var index = e.currentTarget.dataset.index
    var that = this
    console.log(that.data.typeArr[index].id)
    requestActList(that, 1, that.data.typeArr[index].id == 0 ? '' : that.data.typeArr[index].id)
    this.setData({
      reachBottomCount: 1,
      redColorIndex: e.currentTarget.dataset.index,
      selecterTypeID: that.data.typeArr[index].id == 0 ? '' : that.data.typeArr[index].id
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {


  },
  //点击广告页图片
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
    console.log('获取上拉加载的ID！！！！')
    console.log(this.data.selecterTypeID)
    var that = this
    that.setData({
      page: this.data.reachBottomCount++
    })
    if (that.data.isAllowLoadMore == true){
      requestActList(that, this.data.reachBottomCount, that.data.selecterTypeID)
    }else{
      return
    }
    console.log('上拉了了饿了饿了额乐乐饿了额乐乐了eel')
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  }
})
/**
  *请求广告内容
  */
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
/**
  * 请求产品类型
  */
function requestActType(self) {
  netWork.requestNetWork('/phone/productType/list', {}, {}, 'POST',
    function success(res) {
      var dataArr = res.data.attribute.list
      var obj = [{ 'id': 0, 'pictureAddress': '/pages/image/all.png', 'typeName': '全部' }]
      dataArr = obj.concat(dataArr)
      console.log('获取产品类型的数据')
      console.log(dataArr)
      for (var i = 1; i < dataArr.length; i++) {
        dataArr[i].pictureAddress = 'http://116.62.7.43' + dataArr[i].pictureAddress
      }
      self.setData({
        typeArr: dataArr
      })
      requestActList(self, 1, '')
    },
    function fail() {
      console.log(res)
    },
    function complete() {

    }
  )
}
/**
  * 请求活动列表
  */
function requestActList(self, currentPage, productTypeId) {
  netWork.requestNetWork('/phone/product/list', { "page": { "currentPage": currentPage, "itemsperpage": 1 }, "orderGuize": " create_date desc", "productTypeId": productTypeId }, {}, 'POST',
    function success(res) {
      if (res.data.attribute.list.length == 0) {
        self.setData({
          isAllowLoadMore: false
        })
        return
      }
      var arr = new Array()
      arr = self.data.actListArr.concat(res.data.attribute.list)
      self.setData({
        actListArr: arr,
        isAllowLoadMore:true
      })
    },
    function fail(res) {

    },
    function complete(res) {

    }
  )
}