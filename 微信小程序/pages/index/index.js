//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    motto: 'Hello World',
    width: '1px',
    usercolor: '#cd302c',
    userimage: '/pages/image/profile.png',
    pswcolor: '#cd302c',
    pswimage: '/pages/image/password.png',
    btntitle: '登录',
    loginorreg: 'login',
    qietype: '点击注册',
    lor: 'loginclick',
    userphone: '11111111111',
    userpsw: '111111',
    headImageURL: '/pages/image/logo-120@2x.png',
    userInfo: {}
  },
  //切换成注册状态
  login: function () {
    wx.setNavigationBarTitle({
      title: '账号注册',
      success: function (res) {
        // success
      }
    })
    this.setData({
      loginorreg: 'reg',
      qietype: '有账号？返回登录',
      btntitle: '注册',
      lor: 'regclick',
    })
  },
  //切换成登录状态
  reg: function () {
    wx.setNavigationBarTitle({
      title: '账号登录',
      success: function (res) {
        // success
      }
    })
    this.setData({
      loginorreg: 'login',
      qietype: '点击注册',
      btntitle: '登录',
      lor: 'loginclick',
    })
  },
  //监听用户名输入的文字
  phoneinput: function (e) {
    var str = e.detail.value;
    this.setData({
      userphone: str,
    })
  },
  //监听密码输入的文字
  pswinput: function (e) {
    var str = e.detail.value;
    this.setData({
      userpsw: str,
    })
  },
  //登录btn
  loginclick: function () {
    wx.showLoading({
      title: '加载中',
    })
    //校验用户名和密码
    if (this.data.userphone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号！',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    if (this.data.userpsw.length < 6 || this.data.userpsw.length > 18) {
      wx.showToast({
        title: '请输入6-18位密码！',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    //登录请求
    wx.request({
      url: 'http://116.62.7.43/d/phone/login',
      data: {
        "username": this.data.userphone,
        "password": this.data.userpsw
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        // 设置请求的 header
        'content-type': 'application/json'
      },
      success: function (res) {
        wx.hideLoading()
        console.log(res)
        var isSelectInterest = res.data.attribute.isSelectInterest;
        var token = res.data.attribute.token;
        var uid = res.data.attribute.uid;
        try {
          wx.setStorageSync('uid', uid)
          wx.setStorageSync('token', token)
        } catch (e) {
        }
        // success
        //判断返回状态码
        if (res.data.statusCode != 0) {
          wx.showToast({
            title: res.data.statusMessage,
            icon: 'fail',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '登录成功！',
            icon: 'success',
            duration: 2000
          })
          if (isSelectInterest = false) {
            //跳转首页
            wx.navigateTo({
              url: "../logs/logs",
              success: function (res) {
                // success
              },
              fail: function (res) {
                // fail
              },
              complete: function (res) {
                // complete
              }
            })
          } else {
            //跳转兴趣爱好
            wx.navigateTo({
              url: '../Interest/Interest',
              success: function(res){
                // success
              },
              fail: function(res) {
                // fail
              },
              complete: function(res) {
                // complete
              }
            })
          }
          wx.request({
            url: 'http://116.62.7.43/d/phone/user/detail',
            data: {},
            method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
            header: { 'content-type': 'application/json', 'token': token, 'uid': uid }, // 设置请求的 header
            success: function (res) {
              console.log(res.data)
              // success
              var headImage = res.data.attribute.item.headImage
              try {
                wx.setStorageSync('headImage', headImage)
              } catch (e) {
              }
              console.log(headImageURL)
            },
            fail: function (res) {
              // fail
            },
            complete: function (res) {
              // complete
            }
          })
        }
      },
      fail: function (res) {
        // fail
        wx.hideLoading()
        console.log(res)
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //注册btn
  regclick: function () {
    var that = this
    //校验用户名和密码
    if (this.data.userphone.length != 11) {
      wx.showToast({
        title: '请输入11位手机号！',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    if (this.data.userpsw.length < 6 || this.data.userpsw.length > 18) {
      wx.showToast({
        title: '请输入6-18位密码！',
        icon: 'fail',
        duration: 2000
      })
      return
    }
    wx.request({
      url: 'http://116.62.7.43/d/phone/register',
      data: {
        "username": this.data.userphone,
        "password": this.data.userpsw,
        "regDevice": "ios"
      },
      method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      header: {
        'content-type': 'application/json'
      }, // 设置请求的 header
      success: function (res) {
        that.setData({
          loginorreg: 'login',
          qietype: '有账号？返回登录',
          btntitle: '登录',
          lor: 'loginclick',
        })
        // success
        console.log(res)
        //判断返回状态码
        if (res.data.statusCode != 0) {
          wx.showToast({
            title: res.data.statusMessage,
            icon: 'fail',
            duration: 2000
          })
        } else {
          wx.showToast({
            title: '注册成功！',
            icon: 'success',
            duration: 2000
          })

        }
      },
      fail: function (res) {
        // fail
        wx.showToast({
          title: '注册失败！',
          icon: 'fail',
          duration: 2000
        })
      },
      complete: function (res) {
        // complete
      }
    })
  },
  //输入用户名时的方法
  useredit: function () {
    this.setData({
      usercolor: '#C0C0C0',
      userimage: '/pages/image/profilecopy.png',
    });
  },
  //输入密码是触发的方法
  pswedit: function () {
    this.setData({
      pswimage: '/pages/image/passwordh.png',
      pswcolor: '#C0C0C0',
    })
  },
  endedit: function () {
    this.setData({
      pswcolor: '#cd302c',
      pswimage: '/pages/image/password.png',
      usercolor: '#cd302c',
      userimage: '/pages/image/profile.png',
    })
  },
  //页面加载完成
  onLoad: function () {
    console.log('onLoad')
    var that = this
    var headImageURL = wx.getStorageSync('headImage')
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        headImageURL : 'http://116.62.7.43/'+headImageURL,
        userInfo: userInfo
      })
    })
  }
})
