// pages/login/teacher/create_lesson.js
const db=wx.cloud.database()//连接数据库

Page({

    /**
     * 页面的初始数据
     */
    data: {
        toast: false,
        hideToast: false,
        showTip: false,
        inputValue: "",
        teacher_id:""
    },

    getInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        });
    },
    generateUuid: function (length=6){
        //随机生成不重复的课程号
        return Number(Math.random().toString().substr(3, length) + Date.now()).toString(10).substr(3, length);
    },

    Confirm: function() {
        if (this.data.inputValue != "") {
            var lid=this.generateUuid()
            console.log(lid)
            var lesson = {name: this.data.inputValue, msg: 1, id: lid, assignname:[], assign_id:[],teacher_id:this.data.teacher_id,students_id:[]}
            db.collection("lessonlist").add({
                data:lesson
            })
            // show success message
            this.setData({
                toast: true
            });
            setTimeout(() => {
                this.setData({
                    hideToast: true
                });
                setTimeout(() => {
                    this.setData({
                        toast: false,
                        hideToast: false,
                    });
                    wx.navigateBack({
                        delta: 0,
                      })          
                }, 300);
            }, 1000);    
        }
        else {
            // empty course name
            this.setData({
                showTip: true
            })
        }
    },

    closeTip: function() {
        this.setData({
            showTip: false
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            teacher_id:options.teacher_id
        })
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