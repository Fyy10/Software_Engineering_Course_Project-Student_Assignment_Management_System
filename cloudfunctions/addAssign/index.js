// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'softwarezzc-3g0dtyu4c6d676c8',
})
const db=cloud.database();
const _=db.command

// 云函数入口函数
exports.main = async (event, context) => {
  console.log(event)
  await db.collection("assignmentlist").add({
    data:{
      name:event.name,
      disc:event.disc,
      lesson_id:event.lesson_id,
      // students:{//课程中添加学生的信息，信息存储在作业数据库or学生数据库
      //   students_id:event.students_id,
      //   students_name:,
      //   students_grade:
      // }
    }
  }).then(res=>{
    console.log(res)
    console.log(event.lesson_id)
    db.collection("lessonlist").doc(event.lesson_id)
    .update({
        data:{
            assignname:_.push(event.name),
            assign_id:_.push(res._id)
        }
    })
})
}