// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'softwarezzc-3g0dtyu4c6d676c8',
})
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  // 删除数据库中该用户的字段
  var _id=event._id;
  var usertype=event.usertype;
  var userlist=usertype==0?"teacherlist":"studentlist";
  return await db.collection(userlist).doc(_id).remove()
}