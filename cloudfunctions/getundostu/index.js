// 云函数入口文件
const cloud = require('wx-server-sdk')

cloud.init({
  env: 'softwarezzc-3g0dtyu4c6d676c8',
})
const db=cloud.database();

// 云函数入口函数
exports.main = async (event, context) => {
  db.collection("lessonlist").where({
    teacher_id:event.teacher_id
  }).get().then(res=>{
    console.log(res)
    var lesson_list=[]
    var lesson=''
    var lesson_name=''
    for(var i = 0;i<res.data.length;i++){
        lesson=res.data[i]
        lesson_name=lesson.name
        var assignment_list=[]
        var assignment_name=''
        var assignment_id=''
        for(var j=0;j<lesson.assign_id.length;j++){
            assignment_name=lesson.assignname[j]
            console.log(assignment_name)
            assignment_id=lesson.assign_id[j]
            var student_list=[]
            db.collection("StuAssign").where({
                assignment_id:assignment_id
            }).get().then(res=>{
                console.log(assignment_name,res)
                var student =''
                for(var k=0;k<res.data.length;k++){
                    student = res.data[k]
                    console.log(student)
                    if(student.status=="未批改"){
                        student_list.push(student)
                    }
                }
            })
            var assignment={
                assignment_name:assignment_name,
                assignment_id:assignment_id,
                student_list:student_list
            }
            assignment_list.push(assignment)
            console.log("nmsl",assignment_list)
        }
        
        var newlesson={
            lesson_name:lesson_name,
            assignment_list:assignment_list
        }
        lesson_list.push(newlesson)
    }
    return lesson_list;
})
}