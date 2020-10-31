// pages/teacher/teacher.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        inputShowed: false,
        inputVal: "",
        match_list: [],
        lesson_list: [
            {
                name: "课程1",
                msg: 114,
                id: 10492
            },
            {
                name: "课程2",
                msg: 514,
                id: 170001
            },
            {
                name: "课程3",
                msg: 2333,
                id: 1919
            },
            {
                name: "操作系统",
                msg: 1,
                id: 1551
            },
            {
                name: "软件工程",
                msg: 60,
                id: 15
            },
            {
                name: "人工智能",
                msg: 32,
                id: 1050
            },
            {
                name: "汇编语言",
                msg: 74,
                id: 55
            }
        ]
    },

    CreateLesson: function() {
        wx.navigateTo({
          url: './create_lesson',
        })
    },
    openLoading: function() {
        this.setData({
            loading: true
        });
        setTimeout(() => {
            this.setData({
                hideLoading: true
            });
            setTimeout(() => {
                this.setData({
                    loading: false,
                    hideLoading: false,
                });
            }, 300);
        }, 3000);
    },
    showInput: function () {
        this.setData({
            inputShowed: true
        });
    },
    hideInput: function () {
        this.setData({
            inputVal: "",
            inputShowed: false
        });
    },
    clearInput: function () {
        this.setData({
            inputVal: ""
        });
    },
    inputTyping: function (e) {
        var tmp = e.detail.value;
        this.setData({
            inputVal: tmp,
            match_list: SearchString(this.data.lesson_list, tmp)
        });
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
        console.log(this.data.lesson_list)
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
});

// get match_list
function SearchString(list, keyWord) {
    var arr = [];
    for (var i = 0; i < list.length; i++) {
      if (list[i].name.match(keyWord) != null) {
        arr.push(list[i].name);
      }
    }
    return arr;
}
