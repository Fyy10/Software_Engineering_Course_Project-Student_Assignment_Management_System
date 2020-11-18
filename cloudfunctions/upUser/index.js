// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'softwarezzc-3g0dtyu4c6d676c8',
})
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  //本函数要求更新一个用户的信息，传入的参数有用户名、密码、学工号组成的data对象以及idx
  //1.判断是老师还是学生
  //2.对对应的用户通过idx定位，更新其相应的信息
  // var newUserInfo=event.newUserInfo;
  var _id=event._id;
  var name=event.name;
  var id=event.id;
  var password=event.password;
  // var idx=event.idx;
  var usertype=event.usertype;
  // var userlist="";
  // console.log(idx)
  var userlist=usertype==0?"teacherlist":"studentlist";
  // console.log("running")
  return await db.collection(userlist).doc(_id)
  .update({
    data:{
      id:id,
      name:name,
      password:password
    }
  })

}