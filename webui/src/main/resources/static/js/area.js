var dataList=[
];
var myChart = echarts.init(document.getElementById('map_1'));
function randomValue() {
    return Math.round(Math.random()*1000);
}
$.getJSON("http://localhost:8080/covid/getNationalData", function (data) {
    var map = data.data;
    $("#datetime").html(map.datetime);
    $(".que").html(map.currentConfirmedCount);
    $("#confirmedCount").html(map.confirmedCount);
    $("#suspectedCount").html(map.suspectedCount);
    $("#curedCount").html(map.curedCount);
    $("#deadCount").html(map.deadCount)
});
option = {
    tooltip: {
        formatter:function(params,ticket, callback){
            return params.seriesName+'<br />'+params.name+'：'+params.value+ '人'
        }//数据格式化
    },
    visualMap: {
        min: 0,
        max: 1500,
        right: '12%',
        bottom: '-15%',
        textStyle:{
            color:"#fff"
        },
        text: ['多','少'],
        inRange: {
            color: ['#81BEF7', '#5882FA', '#2E64FE','#0101DF','#7401DF']
            // color: ['#ffe5bf', '#ffa372', '#ff7e86','#ee1216','#B22222']
        },
        show:true
    },
    geo: {
        map: 'china',
        roam: true,//开启缩放和平移
        // zoom:1.23,//视角缩放比例
        label: {
            normal: {
                show: true,  //省份名称
                color: '#fff'
            },
            emphasis: {
                show: true,
            }
        },
        itemStyle: {
            normal: {
                areaColor: '#4c60ff',
                borderColor: '#002097'
            },
            emphasis: {
                areaColor: '#293fff'
            }
        }
    },
    series : [
        {
            name: '确诊人数',
            type: 'map',
            geoIndex: 0,
            data:dataList,
            symbolSize: function (val) {
                return val[2] / 15;
            },
            label: {
                normal: {
                    formatter: '{b}',
                    position: 'right',
                    show: true
                },
                emphasis: {
                    show: true
                }
            },
            itemStyle: {
                normal: {
                    color: '#ffeb7b'
                }
            }
        }
    ]
};
$.getJSON('http://localhost:8080/covid/getNationalMapData', function (data) {
    //alert(data);
    myChart.setOption({
        series:[{
            data:data.data
        }]
    })
});
myChart.setOption(option);
window.addEventListener("resize", function () {
    myChart.resize();
});

// myChart.on('click', function (params) {
//     alert(params.name);
// });