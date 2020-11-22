// pages/student/join_lesson.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      inputShowed: false,
      inputVal: "",
      
      match_list: [],
      new_lesson_list: [
          {
              name: "计算机网络安全",
              teacher:"牛伟纳"
          },
          {
            name: "计算机网络安全",
            teacher:"王强"
        }],
      toast: false,
      hideToast: false,
      showTip: false,
     
      // radioChange(e) {
      //   const items = this.data.new_lesson_list
      //   for (let i = 0, len = items.length; i < len; ++i) {
      //       if(items[i].checked ="true")
      //           match_list.push(items[i])
      //   }
   
      // }
  },

  JoinLesson: function() {

  },
  Confirm: function() {
    if (this.data.inputValue != "") {
        var pages = getCurrentPages();
        var currPage = pages[pages.length - 1];
        var prevPage = pages[pages.length - 2];
        var tmp_list = prevPage.data.lesson_list;
        var items = this.data.match_list;

        for (let i = 0, len = items.length; i < len; ++i) {
            if(items[i].checked ="true")
                tmp_list.push(items[i]);
        }

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
},

closeTip: function() {
    this.setData({
        showTip: false
    })
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
          match_list: SearchString(this.data.new_lesson_list, tmp)
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
      console.log(this.data.new_lesson_list)
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
      arr.push(list[i]);
    }
  }
  return arr;
}
