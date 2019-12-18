$("#nav-1 a").on("click", function() {
    var position = $(this)
        .parent()
        .position();
    var width = $(this)
        .parent()
        .width();
    $("#nav-1 .slide1").css({ opacity: 1, left: +position.left, width: width });
    $(".system_module").css({display: "none"}).eq($(this)[0].name).css({display: "block"});
});

$("#nav-1 a").on("mouseover", function() {
    var position = $(this)
        .parent()
        .position();
    var width = $(this)
        .parent()
        .width();
    $("#nav-1 .slide2")
        .css({
            opacity: 1,
            left: +position.left,
            width: width
        })
        .addClass("squeeze");
});

$("#nav-1 a").on("mouseout", function() {
    $("#nav-1 .slide2")
        .css({ opacity: 0 })
        .removeClass("squeeze");
});

var currentWidth = $("#nav-1 .system_nav")
    .find(".active")
    .parent("li")
    .width();
var current = $(".system_nav .active").position();
$("#nav-1 .slide1").css({ left: +current.left, width: currentWidth });


function student_origin() {
    let s_grade = $("#select_grade").val();
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//student/nation/zongheOfGrade",
        dataType: "json",
        data: {
            grade: s_grade
            // class: s_class
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                chianVisforStudent(arg.data.nativeInfo,s_grade);
                gender_distribution(arg.data.sexInfo,s_grade);
                nation_distribution(arg.data.nationInfo,s_grade);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function grage_course() {
    let select_grade_score = $('#select_grade_score').val();
    let select_type_score = $('#select_type_score').val();
    let select_course_score = $('#select_course_score').val();
    let chart_title = select_grade_score + select_course_score + select_type_score;
    // console.log(select_grade_score,select_type_score,select_course_score);
    /*
    var data = [
        {
            "class": "1班",
            "score": randomData(100,88)
        },
        {
            "class": "2班",
            "score": randomData(100,95)
        },
        {
            "class": "3班",
            "score": randomData(100,77)
        },
        {
            "class": "4班",
            "score": randomData(100)
        }
    ];
    */

    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//chengji/scoreOfClass",
        dataType: "json",
        data: {
            grade: select_grade_score,
            exam_kind: select_type_score,
            subject: select_course_score
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                let data = arg.data;
                let classes = [];
                let scores = [];
                for (let i=0;i<data.length;i++){
                    classes.push(data[i].className);
                    scores.push(data[i].scores);
                }
                grade_student_score(classes,scores,chart_title);
                grade_student_score_bar(classes,scores,chart_title,100);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function consumption_day() {
    let s_date = $("#dtp_input1").val();
    /*
    let accommodation = [];
    let gender = [];
    accommodation.push(randomData(12,15));
    accommodation.push(randomData(12,6));
    gender.push(randomData(12,12));
    gender.push(randomData(12,9));
    */
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//consumption/zhusu/consumptionByZhusuAndSex",
        dataType: "json",
        data: {
            date: s_date
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                consumption_day_polar(arg.data);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function student_avg_consumption() {
    let studentId = $("#studentId").val();
    let year = $("#year").val();
    // console.log(studentId, year);
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//stu/month/consumption/studentConsumption",
        dataType: "json",
        data: {
            studentId: studentId
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                student_consumption_lines(arg.data);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function single_student_score() {
    let single_studentId = $("#single_studentId").val();
    let select_term = $("#select_term").val();
    student_score_radar();
}

function single_student_course() {
    let single_studentId2 = $("#single_studentId2").val();
    let select_course = $("#select_course").val();
    student_course_line()
}

function kaoqin_allStudent() {
    let dtp_input2 = $("#dtp_input2").val();
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//kaoqin/sum/recentKaoqin",
        dataType: "json",
        data: {
            date: dtp_input2
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                let before14date = dateBeforeDays(dtp_input2);
                before14date.splice(0,0,'date');
                let data = [before14date];
                arg.data["校徽校服"].splice(0,0,'校徽校服'); data.push(arg.data["校徽校服"]);
                arg.data["进校迟到"].splice(0,0,'进校迟到'); data.push(arg.data["进校迟到"]);
                arg.data["操场考勤"].splice(0,0,'操场考勤'); data.push(arg.data["操场考勤"]);
                arg.data["请假离校"].splice(0,0,'请假离校'); data.push(arg.data["请假离校"]);
                arg.data["早退"].splice(0,0,'早退'); data.push(arg.data["早退"]);
                kaoqin_share_dataset_line_pie(data);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function course_faculty() {
    let select_term_faculty = $("#select_term_faculty").val();
    // console.log(select_term_faculty);
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//teacher/num/teacherNumMap",
        dataType: "json",
        data: {
            term: select_term_faculty
        },
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                course_faculty_bar(select_term_faculty,arg.data);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function randomData(num=1,max=100) {
    if (num === 1){
        return Math.round(Math.random()*max);
    }
    var arr = [];
    for (let i = 0; i<num; i++){
        arr.push(Math.round(Math.random()*max))
    }
    return arr;
}

function dateBeforeDays(str_date, num=14){
    let date = new Date(str_date);
    let str_date_arr = [];
    for (let i=0; i<num; i++){
        date = new Date(date.getTime() - 1000*60*60*24);
        str_date_arr.push(date.getFullYear()+"-" + (date.getMonth()+1) + '-' + date.getDate());
    }
    return str_date_arr.reverse();
}