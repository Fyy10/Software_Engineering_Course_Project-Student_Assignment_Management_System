// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'softwarezzc-3g0dtyu4c6d676c8',
})
const db = cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  return await db.collection("StuAssign").doc(event.stuass_id).update({
    data:{
      status:event.score
    }
  })
}