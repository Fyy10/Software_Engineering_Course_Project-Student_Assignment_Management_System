// pages/modifyuser/modifyuser.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    teachers: app.globalData.teachers,
    students: app.globalData.students,
    usertype: '',
    idx: '',
    name: '',
    id: '',
    password: '',
    dialog: false
  },

  inputName: function (e) {
    this.setData({
        name: e.detail.value
    })
  },
  inputID: function (e) {
    this.setData({
        id: e.detail.value
    })
  },
  inputPassword: function (e) {
    this.setData({
        password: e.detail.value
    })
  },
  submitForm() {
    if (this.data.name != "" && this.data.id != "" && this.data.password != "") {
      if (this.data.usertype == 0) {
        app.globalData.teachers[this.data.idx].name = this.data.name,
        app.globalData.teachers[this.data.idx].id = this.data.id,
        app.globalData.teachers[this.data.idx].password = this.data.password
      } else {
        app.globalData.students[this.data.idx].name = this.data.name,
        app.globalData.students[this.data.idx].id = this.data.id,
        app.globalData.students[this.data.idx].password = this.data.password
      }
      wx.showToast({
        title: '修改成功',
      }),
      setTimeout(function () {
        wx.navigateBack({
          delta: 0,
        })
      }, 700)
    } else {
      this.setData ({
        error: '请重新键入'
      })
    }
  },
  deleteUser() {
    this.setData({
      dialog: true
    })
  },
  close() {
    this.setData({
      dialog: false
    })
  },
  proceed() {
    if (this.data.usertype == 0) {
      app.globalData.teachers.splice(this.data.idx, 1)
    } else {
      app.globalData.students.splice(this.data.idx, 1)
    }
    wx.navigateBack({
      delta: 0,
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      teachers: app.globalData.teachers,
      students: app.globalData.students,
      idx: options.idx,
      usertype: options.usertype
    })
    if (this.data.usertype == 0) {
      wx.setNavigationBarTitle({
        title: '修改老师',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '修改学生',
      })
    }
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

  }
})