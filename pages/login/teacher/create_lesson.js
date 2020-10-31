// pages/login/teacher/create_lesson.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        toast: false,
        hideToast: false,
        showTip: false,
        inputValue: ""
    },

    getInput: function(e) {
        this.setData({
            inputValue: e.detail.value
        });
    },

    Confirm: function() {
        if (this.data.inputValue != "") {
            var pages = getCurrentPages();
            var currPage = pages[pages.length - 1];
            var prevPage = pages[pages.length - 2];
            var lesson = {name: this.data.inputValue, msg: 1, id: 1}
            var tmp_list = prevPage.data.lesson_list
            tmp_list.push(lesson)
            prevPage.setData({
                lesson_list: tmp_list
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