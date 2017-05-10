//index.js
//获取应用实例
var netWork = require('../../utils/request.js')
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
    userphone: '33333333333',
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
      headImageURL: '/pages/image/logo-120@2x.png',
    })
  },
  //切换成登录状态
  reg: function () {
    var headImage = 'http://116.62.7.43/' + wx.getStorageSync('headImage')
    if (headImage.length <= 0) {
      headImage = '/pages/image/profilecopy.png'
    }
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
      headImageURL: headImage,
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
      showToastfun.falseShow('请输入11位手机号！', '')
      return
    }
    if (this.data.userpsw.length < 6 || this.data.userpsw.length > 18) {
      showToastfun.falseShow('请输入6-18位密码！', 'success')
      return
    }
    //登录请求
    var data = { "username": this.data.userphone, "password": this.data.userpsw }
    netWork.requestNetWork('/phone/login', data, { 'content-type': 'application/json' }, 'POST',
      function success(res) {
        console.log(res.data);
        wx.hideLoading();
        //存储用户token和uid
        var isSelectInterest = res.data.attribute.isSelectInterest;
        var token = res.data.attribute.token;
        var uid = res.data.attribute.uid;
        try {
          wx.setStorageSync('uid', uid)
          wx.setStorageSync('token', token)
        } catch (e) {
        }
        showToastfun.falseShow('登录成功！', '')
        if (isSelectInterest == true) {
          //跳转首页
          pushToController('../logs/logs')
        } else {
          //跳转兴趣爱好
          pushToController('../interest/interest')
        }
        // 获取个人信息请求
        var headInfo = { 'content-type': 'application/json', 'token': token, 'uid': uid }
        netWork.requestNetWork('/phone/user/detail', {}, headInfo, 'POST',
          function success(res) {
            wx.hideLoading()
            var headImage = res.data.attribute.item.headImage
            console.log(headImage)
            try {
              if (headImage.length <= 0) {
                wx.setStorageSync('headImage', '')
              } else {
                wx.setStorageSync('headImage', headImage)
              }
            } catch (e) {
            }
          },
          function fail(res) {

          },
          function complete(res){

          }
        )
      },
      function fail(res) {
        wx.hideLoading()
        console.log(res.data);
      },
      function complete(res) {

      }
    )
  },
  //注册btn
  regclick: function (e) {
    var that = this
    //校验用户名和密码
    if (this.data.userphone.length != 11) {
      showToastfun.falseShow('请输入11位手机号！', '')
      return
    }
    if (this.data.userpsw.length < 6 || this.data.userpsw.length > 18) {
      showToastfun.falseShow('请输入6-18位密码！', '')
      return
    }
    var regData = {
      "username": this.data.userphone,
      "password": this.data.userpsw,
      "regDevice": "ios"
    }
    console.log(regData)
    netWork.requestNetWork('/phone/register', regData, { 'content-type': 'application/json' }, 'POST',
      function success(res) {
        that.setData({
          loginorreg: 'login',
          qietype: '有账号？返回登录',
          btntitle: '登录',
          lor: 'loginclick',
        })
        showToastfun.falseShow('注册成功！', '')
      },
      function fail(res) {
        showToastfun.falseShow('注册失败！', '')
      }
    )
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
    var headImage = 'http://116.62.7.43/' + wx.getStorageSync('headImage')
    if (wx.getStorageSync('headImage').length <= 0) {
      headImage = '/pages/image/profilecopy.png'
    }
    console.log(headImage)
    //调用应用实例的方法获取全局数据
    app.getUserInfo(function (userInfo) {
      //更新数据
      that.setData({
        headImageURL: headImage,
        userInfo: userInfo
      })
    })
  }
})

//公用方法

// 跳转界面
function pushToController(e) {
  wx.navigateTo({
    url: e,
  })
}
//消息提示
var showToastfun = {
  falseShow: function (title, iconname) {
    var icon = 'success';
    if (iconname.length > 0) {
      icon = iconname;
    }
    wx.showToast({
      title: title,
      icon: icon,
      duration: 2000,
      mask: true,
    })
  },
};
