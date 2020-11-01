//login.js
//获取应用实例

Page({data: {
    username: '',
    password: '',
    error: '',
    adminusername: 'admin',
    adminpassword: 'adminadmin',
    teacherusername: 'teacher',
    teacherpassword: 'teacherteacher',
    studentusername: 'student',
    studentpassword: 'studentstudent',
  },
  //事件处理函数
  inputUsername: function (e) {
    this.setData({
        username: e.detail.value
    })
  },
  inputPassword: function (e) {
    this.setData({
        password: e.detail.value
    })
  },
  submitForm() {
    if (this.data.username == this.data.adminusername && this.data.password == this.data.adminpassword) {
      wx.showToast({
        title: '欢迎您！管理员'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../admin/admin',
        })
      }, 700)
    } else if (this.data.username == this.data.teacherusername && this.data.password == this.data.teacherpassword){
      wx.showToast({
        title: '欢迎您！老师'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../teacher/teacher',
        })
      }, 700)
    } else if (this.data.username == this.data.studentusername && this.data.password == this.data.studentpassword){
      wx.showToast({
        title: '欢迎您！学生'
      })
      setTimeout(function () {
        wx.redirectTo({
          url: '../index/index',
        })
      }, 700)
    } else if (this.data.username == '') {
      this.setData({
        error: '请输入用户名'
     })
    } else if (this.data.password == '') {
      this.setData({
        error: '请输入密码'
      })
    } else {
      this.setData({
        error: '用户名或密码错误'
      })
    }
  }
})
