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
    qietype: '有账号？返回登录',
    lor: 'loginclick',
    userphone: '',
    userpsw: '',
    userInfo: {}
  },
  //切换成注册状态
  login: function () {
    this.setData({
      loginorreg: 'reg',
      qietype: '点击注册',
      btntitle: '注册',
      lor: 'regclick',
    })
  },
  //切换成登录状态
  reg: function () {
    this.setData({
      loginorreg: 'login',
      qietype: '有账号？返回登录',
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
    if (userphone.length = 0) {
      this.setData({
        userphone: '55555555',
      })
    }
  },
  //注册btn
  regclick: function () {

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
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        userInfo: userInfo
      })
    })
  }
})
