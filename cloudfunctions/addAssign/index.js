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
      lesson_id:event.lesson_id
    }
  }).then(res=>{
    console.log(res)
    console.log(event.lesson_id)
    var assignment_id=res._id
    db.collection("lessonlist").doc(event.lesson_id)
    .update({
        data:{
            assignname:_.push(event.name),
            assign_id:_.push(res._id)
        }
    })
    db.collection("StuLesson").where({
      lesson_id:event.lesson_id
    }).get().then(res=>{
      console.log(res.data[0])
      for(var i=0;i<res.data.length;i++){
        db.collection("StuAssign").add({
          data:{
            assignment_id:assignment_id,
            assignment_name:event.name,
            student_id:res.data[i].student_id,
            student_name:res.data[i].student_name,
            status:"未完成",
            img:""
          }
        }).then(res=>{
          console.log("添加学生作业成功",res)
        })
      }
    })
})
}