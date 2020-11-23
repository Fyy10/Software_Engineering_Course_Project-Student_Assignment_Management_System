// pages/login/teacher/lesson/assignment/student_submission.js
const db = wx.cloud.database()

Page({

    /**
     * 页面的初始数据
     */
    data: {
        score: null,
        toast: false,
        hideToast: false,
        student_id: '',
        assignment_disc: '',
        assignment_name: '',
        stuass_id: '',
        imgurl: [],
    },

    previewImg: function (e) {
        wx.previewImage({
            current: e.currentTarget.dataset.src,
            urls: this.data.imgurl,
        })
    },

    getInput: function (e) {
        this.setData({
            score: e.detail.value
        })
    },

    Submit: function () {
        wx.cloud.callFunction({
            name: "upscore",
            data: {
                score: this.data.score,
                stuass_id: this.data.stuass_id
            }
        }).then(res => {
            console.log(res)
        })
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
    },

    getstuassign(){
        db.collection("StuAssign").doc(this.data.stuass_id).get()
        .then(res=>{
            this.setData({
                imgurl:res.data.img
            })
          
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        this.setData({
            student_id: options.student,
            assignment_disc: options.assignment_disc,
            assignment_name: options.assignment_name,
            stuass_id: options.stuass_id
        })
        this.getstuassign()

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