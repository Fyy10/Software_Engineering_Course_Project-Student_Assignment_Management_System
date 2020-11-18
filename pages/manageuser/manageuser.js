// pages/manageuser/manageuser.js
const app = getApp()
const db=wx.cloud.database()//连接数据库

Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertype: '',
    // teachers: app.globalData.teachers,
    // students: app.globalData.students,
    teachers: '',
    students: ''
  },

  setUsers(usertype){
    // 从数据库获取所有老师or学生
    if(usertype==0){
      wx.cloud.callFunction({
        name:"getUsers",
        data:{
          usertype:usertype
        }
      }).then(res=>{
        // console.log(res)
        this.setData({
          teachers:res.result.data
        })
      })
    }
    else{
      wx.cloud.callFunction({
        name:"getUsers",
        data:{
          usertype:usertype
        }
      }).then(res=>{
        // console.log(res)
        this.setData({
          students:res.result.data
        })
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData ({
      // teachers: app.globalData.teachers,
      // students: app.globalData.students,
      usertype: options.usertype
    })
    this.setUsers(this.data.usertype)
    if (this.data.usertype == 0) {
      wx.setNavigationBarTitle({
        title: '全部老师',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '全部学生',
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
    this.setUsers(this.data.usertype)
    // this.setData ({
    //   teachers: app.globalData.teachers,
    //   students: app.globalData.students
    // })
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