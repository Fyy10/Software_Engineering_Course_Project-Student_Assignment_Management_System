// pages/adduser/adduser.js
const app = getApp()
const db=wx.cloud.database()//连接数据库
Page({

  /**
   * 页面的初始数据
   */
  data: {
    usertype: '',
    name: '',
    id: '',
    password: '',
    files: [],
    uploaded: 0,
    error: ''
  },
  chooseImage: function (e) {
      var that = this;
      wx.chooseImage({
          sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
          sourceType: ['album', 'camera'], // 可以指定来源是相册还是相机，默认二者都有
          success: function (res) {
              // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
              that.setData({
                  files: that.data.files.concat(res.tempFilePaths)
              });
              that.setData({
                uploaded: 1
              })
          }
      })
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
    if (this.data.name != "" && this.data.id != "" && this.data.password != "" && this.data.avatar != "") {
      if (this.data.usertype == 0) {
        var newTeacher = {
          name: this.data.name,
          id: this.data.id,
          password: this.data.password,
          avatar: this.data.files[0]
        }
        //app.globalData.teachers.push(newTeacher)
        //判断是否学号学工号重复
        db.collection("teacherlist").where({
          id:newTeacher.id
        }).get()
        .then(res=>{
          console.log(res)
          this.setData ({
            error: ''
          })
          if(res.data.length!=0){
            console.log(res.data)
            this.setData ({
              error: '该用户已存在'
            })
          }
          else{
            //上传新老师信息到数据库
            db.collection("teacherlist").add({
              data:newTeacher
            })
            wx.showToast({
              title: '添加成功',
            })
          }
        })
      } else {
        var newStudent = {
          name: this.data.name,
          id: this.data.id,
          password: this.data.password,
          avatar: this.data.files[0]
        }
        // app.globalData.students.push(newStudent)
        //判断是否学号学工号重复
        db.collection("studentlist").where({
          id:newStudent.id
        }).get()
        .then(res=>{
          console.log(res)
          this.setData ({
            error: ''
          })
          if(res.data.length!=0){
            console.log(res.data)
            this.setData ({
              error: '该用户已存在'
            })
          }
          else{
            //上传新学生信息到数据库
            db.collection("studentlist").add({
              data:newStudent
            })
            wx.showToast({
              title: '添加成功',
            })
          }
        })
      }
      setTimeout(function () {
        wx.navigateBack({
          delta: 0,
        })
      }, 700)
      //返回的太快了！！！
    } else {
      this.setData ({
        error: '请重新键入'
      })
    }
  },
  // 选择excel表格 
  chooseExcel(){
    let that = this
    wx.chooseMessageFile({
      count: 1,
      type:'file',
      success(res){
        let path = res.tempFiles[0].path;
        console.log("选择excel成功", path)
        that.uploadExcel(path);
      }
    })
  },
  //上传excel到云存储
  uploadExcel(path){
    let that = this
    wx.cloud.uploadFile({
      cloudPath:new Date().getTime() + '.xls',
      filePath:path,//文件路径
      success:res=>{
        console.log("上传成功", res.fileID)
        that.jiexi(res.fileID)
      },
      fail:err=>{
        console.log("上传失败",err)
      }
    })
  },
  //解析excel数据并上传到云数据库
  //!!!还没有做前端的反馈，用户没有头像，也无法更改头像
  jiexi(fileId){
    console.log("开始解析")
    wx.cloud.callFunction({
      name:"excel",
      data:{
        fileID:fileId,
        usertype:this.data.usertype
      },
      success(res){
        console.log("解析并上传成功", res)
      },
      fail(res){
        console.log("解析失败",res)
      }
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      usertype: options.usertype
    })
    if (this.data.usertype == 0) {
      wx.setNavigationBarTitle({
        title: '添加老师',
      })
    } else {
      wx.setNavigationBarTitle({
        title: '添加学生',
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