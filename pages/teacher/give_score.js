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

    setAll(){
        db.collection("lessonlist").where({
            teacher_id:this.data.teacher_id
        }).get().then(res=>{
            console.log(res)
            for(var i = 0;i<res.data.length;i++){
                var lesson=res.data[i]
                var lesson_name=lesson.name
                for(var j = 0; j<lesson.assign_id.length;j++){
                    var assignment_name=lesson.assignname[j]
                    db.collection("StuAssign").where({
                        
                    })
                }
            }
        })

    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teacher_id:options.teacher_id
        })
        this.setAll()
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