$(function () {
    map();

    function map() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('map_1'));
        var data = [
            {name: '海门', value: 69},
            {name: '鄂尔多斯', value: 12},
            {name: '招远', value: 12},
            {name: '舟山', value: 12},
        ];
        var geoCoordMap = {
            '海门': [121.15, 31.89],
            '鄂尔多斯': [109.781327, 39.608266],
            '招远': [120.38, 37.35],
            '舟山': [122.207216, 29.985295],
        };
        var convertData = function (data) {
            var res = [];
            for (var i = 0; i < data.length; i++) {
                var geoCoord = geoCoordMap[data[i].name];
                if (geoCoord) {
                    res.push({
                        name: data[i].name,
                        value: geoCoord.concat(data[i].value)
                    });
                }
            }
            return res;
        };

        option = {
            tooltip: {
                trigger: 'item',
                formatter: function (params) {
                    return params.seriesName + '<br />' + params.name + '：' + params.value
                    // if(typeof(params.value)[2] == "undefined"){
                    // 	return params.name + ' : ' + params.value;
                    // }else{
                    // 	return params.name + ' : ' + params.value[2];
                    // }
                }
            },
            geo: {
                map: 'china',
                roam: true,//开启其放大缩小
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
            }
            ,
            series: [
                {
                    name: '确诊人数',
                    type: 'map',
                    coordinateSystem: 'geo',
                    show: true,
                    data: convertData(data),
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

        myChart.setOption(option);
        window.addEventListener("resize", function () {
            myChart.resize();
        });
    }

})

