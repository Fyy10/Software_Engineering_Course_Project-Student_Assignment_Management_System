// pages/teacher/give_score.js
const db=wx.cloud.database()//连接数据库
Page({

    /**
     * 页面的初始数据
     */
    data: {
        teacher_id:'',
        lesson_list: []
        //     {
        //         lesson_name: "操作系统",
        //         assignment_list: [{assignment_name: '作业1', student_list: ['zcc', 'fyy']}, {assignment_name: '作业2', student_list: ['fyy']}]
        //     },
        //     {
        //         lesson_name: "软件工程",
        //         assignment_list: [{assignment_name: '需求分析', student_list: ['zzc']}, {assignment_name: '大项目', student_list: ['fyy']}]
        //     }
        // ]
    },

    getLessons(){
        db.collection("lessonlist").where({
            teacher_id:this.data.teacher_id
        }).get()
        .then(res=>{
            console.log(res.data)
            this.setData({
                lesson_list:res.data
            })
        })
    },
    getstudent(){
        wx.cloud.callFunction({
            name:"getundostu",
            data:{
                teacher_id:this.data.teacher_id
            }
        }).then(res=>{
            console.log(res)
        })
    },
    




    setAll(){
        db.collection("lessonlist").where({
            teacher_id:this.data.teacher_id
        }).get().then(res=>{
            console.log(res)
            var lesson_list=[]
            var lesson=''
            var lesson_name=''
            for(var i = 0;i<res.data.length;i++){
                lesson=lessons[i]
                lesson_name=lesson.name
                var assignment_list=[]
                var assignment_name=''
                var assignment_id=''
                for(var j=0;j<lesson.assign_id.length;j++){
                    assignment_name=lesson.assignname[j]
                    console.log(assignment_name)
                    assignment_id=lesson.assign_id[j]
                    var student_list=[]
                    db.collection("StuAssign").where({
                        assignment_id:assignment_id
                    }).get().then(res=>{
                        console.log(assignment_name,res)
                        var student =''
                        for(var k=0;k<res.data.length;k++){
                            student = res.data[k]
                            console.log(student)
                            if(student.status=="未批改"){
                                student_list.push(student)
                            }
                        }
                    })
                    var assignment={
                        assignment_name:assignment_name,
                        assignment_id:assignment_id,
                        student_list:student_list
                    }
                    assignment_list.push(assignment)
                    console.log("nmsl",assignment_list)
                }
                
                var newlesson={
                    lesson_name:lesson_name,
                    assignment_list:assignment_list
                }
                lesson_list.push(newlesson)
            }
            this.setData({
                lesson_list:lesson_list
            })
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teacher_id:options.teacher_id
        })
        // this.setAll()
        this.getstudent()
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