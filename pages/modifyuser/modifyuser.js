// pages/modifyuser/modifyuser.js
const app = getApp()
const db=wx.cloud.database()//连接数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // teachers: app.globalData.teachers,
    teachers: '',
    // students: app.globalData.students,
    students: '',
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
      //更新这个用户的信息
      var users=this.data.usertype==0?this.data.teachers:this.data.students
      wx.cloud.callFunction({
        name:"upUser",
        data:{
          _id:users[this.data.idx]._id,
          name: this.data.name,
          id: this.data.id,
          password: this.data.password,
          // idx:this.data.idx,
          usertype:this.data.usertype
        }
      })

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
    // if (this.data.usertype == 0) {
    //   app.globalData.teachers.splice(this.data.idx, 1)
    // } else {
    //   app.globalData.students.splice(this.data.idx, 1)
    // }

    // 从数据库中删除该用户（待完成）
    var users=this.data.usertype==0?this.data.teachers:this.data.students
    wx.cloud.callFunction({
      name:"deleUser",
      data:{
        _id:users[this.data.idx]._id,
        usertype:this.data.usertype
      }
    }).then(res=>{
      console.log(res)
    })


    wx.navigateBack({
      delta: 0,
    })
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
    this.setData({
      // teachers: app.globalData.teachers,
      // students: app.globalData.students,
      idx: options.idx,
      usertype: options.usertype
    })
    this.setUsers(this.data.usertype)
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
    // this.setUsers(this.data.usertype)
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