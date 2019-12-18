function chianVisforStudent(dataMap,s_grade) {
    let maxNum = 0;
    for (let dm=0; dm<dataMap.length; dm++){
        if (dataMap[dm].value > maxNum){
            maxNum = dataMap[dm].value;
        }
    }
    for (let dm=0; dm<dataMap.length; dm++){
        if (dataMap[dm].value < maxNum){
            dataMap[dm].value = dataMap[dm].value * 3.5;
        }
    }
    /*
    "nativeIfo": [
        {name: '北京',value: randomData() },{name: '天津',value: randomData() },
        {name: '上海',value: randomData() },{name: '重庆',value: randomData() },
        {name: '河北',value: randomData() },{name: '河南',value: randomData() },
        {name: '云南',value: randomData() },{name: '辽宁',value: randomData() },
        {name: '黑龙江',value: randomData() },{name: '湖南',value: randomData() },
        {name: '安徽',value: randomData() },{name: '山东',value: randomData() },
        {name: '新疆',value: randomData() },{name: '江苏',value: randomData() },
        {name: '浙江',value: randomData() },{name: '江西',value: randomData() },
        {name: '湖北',value: randomData() },{name: '广西',value: randomData() },
        {name: '甘肃',value: randomData() },{name: '山西',value: randomData() },
        {name: '内蒙古',value: randomData() },{name: '陕西',value: randomData() },
        {name: '吉林',value: randomData() },{name: '福建',value: randomData() },
        {name: '贵州',value: randomData() },{name: '广东',value: randomData() },
        {name: '青海',value: randomData() },{name: '西藏',value: randomData() },
        {name: '四川',value: randomData() },{name: '宁夏',value: randomData() },
        {name: '海南',value: randomData() },{name: '台湾',value: randomData() },
        {name: '香港',value: randomData() },{name: '澳门',value: randomData() },{name: '南海诸岛',value: randomData() }
    ];
    */
    var myChart = echarts.init(document.getElementById("student_origin"));
    let option = {
        title: {
            text: s_grade + "生源地分布信息",
            left: "3%",
            top: "2%"
        },
        tooltip: {
            formatter:function(params,ticket, callback){
                // return params.seriesName+'<br />'+params.name+'：'+params.value
                if (params.value != maxNum){
                    return params.name+'：'+parseInt(params.value/3.5);
                }
                return params.name+'：'+params.value;
            }//数据格式化
        },
        visualMap: {
            min: 0,
            max: maxNum,
            left: '5%',
            top: 'center',
            text: ['高','低'],//取值范围的文字
            inRange: {
                color: ['#fafad2', '#ff0000']//取值范围的颜色
            },
            hoverLink: false,
            show:true//图注
        },
        geo: {
            map: 'china',
            roam: false,//不开启缩放和平移
            zoom:1.15,//视角缩放比例（指的是整个地图是正常地图的缩放情况）
            label: {
                normal: {
                    show: true,
                    fontSize:'10',
                    color: 'rgba(0,0,0,0.7)'
                }
            },
            itemStyle: {
                normal:{
                    borderColor: 'rgba(0, 0, 0, 0.2)'
                },
                emphasis:{
                    // areaColor: '#F3B329',//鼠标选择区域颜色
                    shadowOffsetX: 0,  // 边界阴影部分朝向那边
                    shadowOffsetY: 0,
                    shadowBlur: 20, // 阴影范围
                    borderWidth: 0, // 边界粗细程度
                    shadowColor: 'rgba(0, 0, 0, 0.5)'
                }
            }
        },
        series: [{
            name: '中国',
            type: 'map',
            geoIndex: 0,
            data:dataMap
        }]
    };

    myChart.setOption(option, true);
}

function gender_distribution(data,s_grade) {
    let option = {
        title: {
            text: s_grade + "男女比例"
        },
        tooltip: {
            trigger: 'item',
            formatter: "{b}: {c} ({d}%)" //{a} <br/>
        },
        legend: {
            orient: 'vertical',
            x: 'left',
            y: 'middle',
            data:['男','女']
        },
        series: [
            {
                name:'班级男女比例',
                type:'pie',
                radius: ['45%', '70%'],
                avoidLabelOverlap: false,
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: true,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: true
                    }
                },
                data: data
                    /*[
                    {value:335, name:'男'},
                    {value:310, name:'女'}
                ]*/
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("gender_distribution"));
    myChart.setOption(option, true);
}

function nation_distribution(data, s_grade) {
    let option = {
        title : {
            text: s_grade + '民族分布情况'
            // x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{b} : {c} ({d}%)"   // {a} <br/>
        },
        legend: {
            orient: 'vertical',
            left: 0,
            top: 'middle',
            data: data.map( (d) => d.name)
        },
        series : [
            {
                name: '民族分布',
                type: 'pie',
                radius : '62%',
                center: ['52%', '58%'],
                data: data,
                    /*[
                    {value:852, name:'汉族'},
                    {value:310, name:'壮族'},
                    {value:234, name:'回族'},
                    {value:135, name:'满族'},
                    {value:109, name:'维吾尔族'},
                    {value:86, name:'苗族'},
                    {value:72, name:'其他'}
                ],*/
                itemStyle: {
                    emphasis: {
                        shadowBlur: 10,
                        shadowOffsetX: 0,
                        shadowColor: 'rgba(0, 0, 0, 0.5)'
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("nation_distribution"));
    myChart.setOption(option, true);
}

function grade_student_score(classes,scores,chart_title) {
    var data = echarts.dataTool.prepareBoxplotData(scores);
    let scoreMin = scores[0][0];
    let scoreMax = 100;
    for (let i=0;i<classes.length;i++) {
        for (let j = 0; j < scores[i].length; j++) {
            if (scores[i][j] > scoreMax){
                scoreMax = scores[i][j];
            } else if (scores[i][j] < scoreMin){
                scoreMin = scores[i][j];
            }
        }
    }
    if (scoreMax > 120) {
        scoreMax = 150;
    } else if (scoreMax > 100) {
        scoreMax = 120;
    }
    let option = {
        title: [
            {
                text: chart_title + '考试各班成绩分布图',
                left: 'center',
            }
            /*,
            {
                text: 'upper: Q3 + 1.5 * IQR \nlower: Q1 - 1.5 * IQR',
                borderColor: '#999',
                borderWidth: 1,
                textStyle: {
                    fontSize: 14
                },
                left: '10%',
                top: '90%'
            }*/
        ],
        tooltip: {
            trigger: 'item',
            axisPointer: {
                type: 'shadow'
            }
        },
        grid: {
            left: '10%',
            right: '10%',
            bottom: '15%'
        },
        xAxis: {
            type: 'category',
            data: classes,
            boundaryGap: true,
            nameGap: 30,
            splitArea: {
                show: false
            },
            axisLabel: {
                rotate: 45,
                fontSize: 10 // 默认 12
            },
            splitLine: {
                show: false
            }
        },
        yAxis: {
            type: 'value',
            name: '分数',
            splitArea: {
                show: true
            },
            min: scoreMin > 10 ? parseInt(scoreMin/10) * 10 - 10 : 0,
            max: scoreMax
        },
        series: [
            {
                name: 'boxplot',
                type: 'boxplot',
                data: data.boxData,
                tooltip: {
                    formatter: function (param) {
                        return [
                            '班级: ' + param.name,
                            'upper: ' + param.data[5],
                            'Q3: ' + param.data[4],
                            '中值: ' + param.data[3],
                            'Q1: ' + param.data[2],
                            'lower: ' + param.data[1]
                        ].join('<br/>');
                    }
                }
            },
            {
                name: 'outlier',
                type: 'scatter',
                data: data.outliers
            }
        ]
    };

    var myChart = echarts.init(document.getElementById("grade_score"));
    myChart.setOption(option, true);
}

function grade_student_score_bar(classes,scores,chart_title, max = 100) {
    let data = [[],[],[],[],[]];
    for (let i=0; i<5;i++){
        for (let j=0; j<classes.length;j++){
            data[i].push(0);
        }
    }
    for (let i=0;i<classes.length;i++){
        for (let j=0; j<scores[i].length;j++){
            if (scores[i][j]>=90){
                data[4][i]++;
            }else if(scores[i][j]>=80){
                data[3][i]++;
            }else if(scores[i][j]>=70){
                data[2][i]++;
            }else if(scores[i][j]>=60){
                data[1][i]++;
            }else {
                data[0][i]++;
            }
            /*
            switch (parseInt(scores[i][j]/inter)) {
                case 0: data[0][i]++; break;
                case 1: data[1][i]++; break;
                case 2: data[2][i]++; break;
                case 3: data[3][i]++; break;
                default: data[4][i]++; break;
            }
            */
        }
    }
    let option = {
        title: [{
                text: chart_title + '考试各班成绩段人数分布图',
                left: 'center'
        }],
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data: ['优', '良','常','可','差'],
            right: '90px'
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        yAxis:  {
            type: 'value'
        },
        xAxis: {
            type: 'category',
            data: classes
        },
        series: [
            {
                name: '差',
                type: 'bar',
                stack: '总量',
                color: 'orangered',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: data[0]
            },
            {
                name: '可',
                type: 'bar',
                stack: '总量',
                color: 'lightsalmon',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: data[1]
            },
            {
                name: '常',
                type: 'bar',
                stack: '总量',
                color: 'greenyellow',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: data[2]
            },
            {
                name: '良',
                type: 'bar',
                stack: '总量',
                color: 'lightblue',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: data[3]
            },
            {
                name: '优',
                type: 'bar',
                stack: '总量',
                color: 'lightgreen',
                label: {
                    normal: {
                        show: true,
                        position: 'insideRight'
                    }
                },
                data: data[4]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("grade_score_bar"));
    myChart.setOption(option, true);
}

function consumption_day_polar(data) {
    option = {
        /*
        title:[{
            text: "学生日消费情况",
            left:"center"
        }],
        */
        tooltip:{
            // trigger: 'axis'
        },
        angleAxis: {
            type: 'category',
            data: ['6', '7', '8', '9', '10', '11', '12','13','14','15','16','17','18'],
            z: 10,
            splitLine: {
                show: true,
                lineStyle: {
                    color: '#999',
                    type: 'dashed'
                }
            },
            // startAngle:105
        },
        radiusAxis: {
            axisLabel: {
                // rotate: 15
            }
        },
        polar: {
        },
        series: [{
            type: 'bar',
            data: data.accommodation,
            coordinateSystem: 'polar',
            name: '住宿',
            stack: 'a'
        }, {
            type: 'bar',
            data: data.noAccommodation,
            coordinateSystem: 'polar',
            name: '非住宿',
            stack: 'a'
        }, {
            type: 'bar',
            data: data.man,
            coordinateSystem: 'polar',
            name: '男生',
            stack: 'b'
        }, {
            type: 'bar',
            data: data.woman,
            coordinateSystem: 'polar',
            name: '女生',
            stack: 'b'
        }],
        legend: {
            show: true,
            orient: 'vertical',
            right: 15,
            top:"center",
            data: ['住宿', '非住宿', '男生','女生']
        }
    };

    var myChart = echarts.init(document.getElementById("consumption_day"));
    myChart.setOption(option, true);
}

function consumption_month_funnel() {
    let option = {
        /*
        title: {
            text: '学生月平均消费区间段分布情况',
            right: 'center',
            top: 'top'
        },
        */
        tooltip: {
            trigger: 'item',
            formatter:function(params,ticket, callback){
                return params.name+'<br>'+params.value+": "+ (params.value/1731 * 100).toFixed(2) +"%";
            }//数据格式化
        },
        toolbox: {
            orient: 'vertical',
            top: 'center',
            feature: {
                dataView: {readOnly: false},
                restore: {},
                saveAsImage: {}
            }
        },
        legend: {
            orient: 'vertical',
            top: "middle",
            left: '8%',
            data: ['0-100','100-200','200-300','300-400','400-500','500-600','600-700','700-800','>800']
        },
        calculable: true,
        series: [
            {
                name: '漏斗图',
                type: 'funnel',
                width: '40%',
                height: '40%',
                left: '28%',
                top: '55%',
                data:[
                    {value: 43, name:'0-100'},
                    {value: 151, name:'100-200'},
                    {value: 370, name:'200-300'},
                    {value: 463, name:'300-400'}
                ]
            },
            {
                name: '金字塔',
                type: 'funnel',
                width: '40%',
                height: '50%',
                left: '28%',
                top: '5%',
                sort: 'ascending',
                data:[
                    {value: 417, name:'400-500'},
                    {value: 186, name:'500-600'},
                    {value: 70, name:'600-700'},
                    {value: 23, name:'700-800'},
                    {value: 8, name:'>800'}
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("consumption_month"));
    myChart.setOption(option, true);
}

function select7_3() {
    var coursedata = ['物理','化学','生物','地理','政治','技术','历史'];
    let option = {
        title : {
            text: '高考7选3单科选取玫瑰图',
            x:'center'
        },
        tooltip : {
            trigger: 'item',
            formatter: "{a} <br/>{b} : {c} ({d}%)"
        },
        legend: {
            x : 'center',
            y : 'bottom',
            data: coursedata
        },

        calculable : true,
        series : [
            {
                name:'面积模式',
                type:'pie',
                radius : [30, 110],
                center : ['50%', '50%'],
                roseType : 'area',
                data:[
                    {value:257, name:'物理'},
                    {value:242, name:'化学'},
                    {value:237, name:'生物'},
                    {value:172, name:'地理'},
                    {value:116, name:'政治'},
                    {value:112, name:'技术'},
                    {value:85, name:'历史'}
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("select_73_one"));
    myChart.setOption(option, true);

    let data = [];
    $.ajax({
        type: "post",
        url: "http://192.168.2.161:8080//xuankao/sum/numOfCombination",
        success: function (arg) {
            if (arg.message === "SUCCESS"){
                for (let i=0;i<arg.data.length;i++){
                    let tmp = arg.data[i]["allCourse"].split(",");
                    tmp.push(arg.data[i]["num"]);
                    data.push(tmp);
                }
                select7_3_three(data,coursedata);
            }else{
                alert(arg.message);  // 失败则输入错误信息
            }
        }
    });
}

function select7_3_three(data,coursedata) {
    // console.log(data);
    // data = [["物理", "生物", "化学", 63],["物理", "历史", "化学", 8],["化学", "政治", "地理", 7]];
    //data = data.slice(0,10);
    let option = {
        title:{
            text: '高考7选3组合选取平行图',
            x:'center'
        },
        tooltip: {
            trigger: "item",
            show: "true",
            formatter:function(params,ticket, callback){
                // return params.seriesName+'<br />'+params.name+'：'+params.value
                return "params.name+'：'+params.value"
            }//数据格式化
        },
        parallelAxis: [
            {
                dim: 0,
                name: '课程1',
                type: 'category',
                data: coursedata
            },
            {
                dim: 1,
                name: '课程2',
                type: 'category',
                data: coursedata
            },
            {
                dim: 2,
                name: '课程3',
                type: 'category',
                data: coursedata
            },
            {
                dim: 3,
                name: '人数',
                type: 'value'
            }
        ],
        series: {
            type: 'parallel',
            lineStyle: {
                width: 3
            },
            data: data,
            tooltip: {
                trigger: "item",
                show: "true",
                formatter:function(params,ticket, callback){
                    // return params.seriesName+'<br />'+params.name+'：'+params.value
                    return "params.name+'：'+params.value"
                }//数据格式化
            },
        }
    };
    var myChart_three = echarts.init(document.getElementById("select_73_three"));
    myChart_three.setOption(option, true);
}

function student_consumption_lines(data) {
    let option = {
        color: ['#5793f3', '#d14a61', '#675bba'],
        tooltip: {
        },
        legend: {
            data:['此学生平均', '总学生平均']
        },
        grid: {
            top: 70,
            bottom: 50
        },
        xAxis: [
            {
                type: 'category',
                axisTick: {
                    alignWithLabel: true
                },
                data: ["2018-07", "2018-08", "2018-09", "2018-10", "2018-11", "2018-12", "2019-01"]
            }
        ],
        yAxis: [
            {
                type: 'value'
            }
        ],
        series: [
            {
                name:'此学生平均',
                type:'line',
                smooth: true,
                data: data['student']
            },
            {
                name:'总学生平均',
                type:'line',
                smooth: true,
                data: data['avg']
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("student_avg_consumption"));
    myChart.setOption(option, true);
}

function student_score_radar() {
    let option = {
        title: {
            left:"center",
            text: '123高一上学期各科成绩雷达图'
        },
        tooltip: {

        },
        legend: {
            orient: 'vertical',
            top: "middle",
            left: '2%',
            data:['考试1','考试2','考试3']
        },
        radar: [
            {
                // shape: 'circle',
                name: {
                    textStyle: {
                        color: '#fff',
                        fontSize:16,
                        backgroundColor: '#999',
                        borderRadius: 3,
                        padding: [5, 3]
                    }
                },
                indicator: [
                    {text: '语文', min:60, max: 100},
                    {text: '数学', min:60, max: 100},
                    {text: '英语', min:60, max: 100},
                    {text: '物理', min:60, max: 100},
                    {text: '化学', min:60, max: 100},
                    {text: '生物', min:60, max: 100}
                ],
                radius: '71%',
                center: ['52%','52%'],
            }
        ],
        series: [
            {
                type: 'radar',
                data: [
                    {
                        value: [85, 90, 90, 95, 95,78],
                        name: '考试1'
                    },
                    {
                        value: [95, 80, 95, 90, 93,68],
                        name: '考试2'
                    },
                    {
                        value: [90, 88, 78, 96, 88,88],
                        name: '考试3'
                    }
                ]
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("single_student_score"));
    myChart.setOption(option, true);
}

function student_course_line() {
    let option = {
        title: {
            text: '123语文考试成绩变化折线图',
            left: '3%'
        },
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            data:['班级平均成绩','学生成绩']
        },
        grid: {
            left: 40,
            right: 70
        },
        /*
        // 设置canvas内部表格的内距
	   	grid:{
                  x:50,
                  y:50,
                  x2:50,
                  y2:60,
                  borderWidth:10
	     }
        toolbox: {
            show: true,
            feature: {
                dataZoom: {
                    yAxisIndex: 'none'
                },
                dataView: {readOnly: false},
                magicType: {type: ['line', 'bar']},
                restore: {},
                saveAsImage: {}
            }
        },
        */
        xAxis:  {
            type: 'category',
            boundaryGap: false,
            data: ['高一上期中','高一上期末','高一下期中','高一下期末','高二上期中','高二上期末','高二下期中','高二下期末',
                '高三上期中','高三上期末','高三下期中','高三下期末'],
            axisLabel: {
                rotate: 45,
                fontSize: 10 // 默认 12
            }
        },
        yAxis: {
            type: 'value',
            min: 7,
            axisLabel: {
                formatter: '{value}'
            }
        },
        series: [
            {
                name:'班级平均成绩',
                type:'line',
                data:[11, 11, 15, 13, 12, 13, 10,11, 11, 15, 13, 9.5],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        label: {
                            normal: {
                                position: 'end',
                                formatter: '{b}: {c}'
                            }
                        },
                        name: 'avg'
                    }]
                }
            },
            {
                name:'学生成绩',
                type:'line',
                data:[15, 12, 12, 15,13, 12, 13, 11, 12, 12, 16, 11.5],
                markPoint: {
                    data: [
                        {type: 'max', name: '最大值'},
                        {type: 'min', name: '最小值'}
                    ]
                },
                markLine: {
                    data: [{
                        type: 'average',
                        label: {
                            normal: {
                                position: 'end',
                                formatter: '{b}: {c}'
                            }
                        },
                        name: 'avg'
                    }]
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("single_student_course"));
    myChart.setOption(option, true);
}

function kaoqin_share_dataset_line_pie(data) {
    setTimeout(function () {
        let option = {
            legend: {},
            tooltip: {
                trigger: 'axis',
                showContent: true
            },
            dataset: {
                source: data
                 /*[
                    ['date', '周一', '周二', '周三', '周四', '周五', '周六'],
                    ['迟到_晚到', 41, 30, 65.1, 53.3, 83.8, 98.7],
                    ['校徽_早退', 86, 92, 85.7, 83.1, 73.4, 55.1],
                    ['操场考勤机', 24, 67, 79.5, 86.4, 65.2, 82.5],
                    ['移动考勤机', 55, 67, 69.2, 72.4, 53.9, 39.1],
                    ['移考勤机', 45, 47, 49.2, 42.4, 43.9, 49.1]
                ]*/
            },
            xAxis: {type: 'category'},
            yAxis: {gridIndex: 0},
            grid: {top: '55%'},
            series: [
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {type: 'line', smooth: true, seriesLayoutBy: 'row'},
                {
                    type: 'pie',
                    id: 'pie',
                    radius: '32%',
                    center: ['50%', '30%'],
                    label: {
                        formatter: '{b}: {@2012} ({d}%)'
                    },
                    encode: {
                        itemName: 'date',
                        value: '2012',
                        tooltip: '2012'
                    }
                }
            ]
        };
        var myChart = echarts.init(document.getElementById("kaoqin_allStudent"));
        myChart.on('updateAxisPointer', function (event) {
            var xAxisInfo = event.axesInfo[0];
            if (xAxisInfo) {
                var dimension = xAxisInfo.value + 1;
                myChart.setOption({
                    series: {
                        id: 'pie',
                        label: {
                            formatter: '{b}: {@[' + dimension + ']} ({d}%)'
                        },
                        encode: {
                            value: dimension,
                            tooltip: dimension
                        }
                    }
                });
            }
        });
        myChart.setOption(option, true);
    });
}

function course_faculty_bar(select_term_faculty,data) {
    let option = {
        title: {
            text: select_term_faculty + "学期各学科师资力量柱状图",
            left: '5%'
        },
        tooltip : {
            trigger: 'axis',
            axisPointer : {            // 坐标轴指示器，坐标轴触发有效
                type : 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
            }
        },
        legend: {
            data:['高一','高二','高三']
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        xAxis : [
            {
                type : 'category',
                data : ['语文','数学','英语','物理','化学','生物','政治','历史','地理','技术']
            }
        ],
        yAxis : [
            {
                type : 'value'
            }
        ],
        series : [
            {
                name:'高一',
                type:'bar',
                data:data['高一'],
                label: {
                    normal: {show: true}
                }
            },
            {
                name:'高二',
                type:'bar',
                data:data['高二'],
                markLine : {
                    lineStyle: {
                        normal: {
                            type: 'dashed'
                        }
                    },
                    data : [
                        [{type : 'min'}, {type : 'max'}]
                    ]
                },
                label: {
                    normal: {show: true}
                }
            },
            {
                name:'高三',
                type:'bar',
                //barGap: 0,
                //barWidth : 5,
                //stack: '搜索引擎',
                data:data['高三'],
                label: {
                    normal: {
                        show: true
                    }
                }
            }
        ]
    };
    var myChart = echarts.init(document.getElementById("course_faculty"));
    myChart.setOption(option, true);
}
