//login.js
//获取应用实例
const db=wx.cloud.database()

Page({
  data: {
    username: '',
    password: '',
    error: '',
    adminusername: 'admin',
    adminpassword: 'adminadmin',
    // teacherusername: 'teacher',
    // teacherpassword: 'teacherteacher',
    teacherusernames:[],
    teacherpasswords:[],
    teachers_id:[],
    studentusernames:[],//'student',
    studentpasswords: [],//'studentstudent',
    students_id:[]
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
    } else if (this.data.username == '') {
      this.setData({
        error: '请输入用户名'
     })
    } else if (this.data.password == '') {
      this.setData({
        error: '请输入密码'
      })
    } else{
      var teacherflag=false
      var studentflag=false
      for(var i=0; i<this.data.teacherusernames.length; i++){
        if (this.data.username == this.data.teacherusernames[i] && this.data.password == this.data.teacherpasswords[i]){
          teacherflag=true
          var teacher_id=this.data.teachers_id[i]
          wx.showToast({
            title: '欢迎您！老师'
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../teacher/teacher?teacher_id='+teacher_id,//添加传入的参数
            })
          }, 700)
        }
      }
      for(var i=0; i<this.data.studentusernames.length; i++){
        if (this.data.username == this.data.studentusernames[i] && this.data.password == this.data.studentpasswords[i]){
          studentflag=true
          var student_id=this.data.students_id[i]
          wx.showToast({
            title: '欢迎您！学生'
          })
          setTimeout(function () {
            wx.redirectTo({
              url: '../index/index?student_id='+student_id,//添加传入的参数
            })
          }, 700)
        }
      }
      if(teacherflag==false&&studentflag==false){
        this.setData({
          error: '用户名或密码错误'
        })
      }
    }  
  },

  /**
  * 生命周期函数--监听页面加载
  */
  onLoad: function (options) {
    db.collection("studentlist").get()
    .then(res=>{
      console.log(res)
      for(var index in res.data){
        this.data.studentusernames.push(res.data[index].name)
        this.data.studentpasswords.push(res.data[index].password)
        this.data.students_id.push(res.data[index]._id)
      }
    })
    db.collection("teacherlist").get()
    .then(res=>{
      console.log(res)
      for(var index in res.data){
        this.data.teacherusernames.push(res.data[index].name)
        this.data.teacherpasswords.push(res.data[index].password)
        this.data.teachers_id.push(res.data[index]._id)
      }
    })
  }
})
