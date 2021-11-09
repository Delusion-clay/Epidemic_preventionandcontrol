$(function () {
    echarts_1();
    echarts_2();
    echarts_4();
    echarts_5();

    function echarts_1() {
        /*--------------------救援物资-----------------------------*/
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart1'));

        myChart.setOption({
            tooltip: {},
            legend: {
                textStyle: {
                    color: '#fff'
                }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            dataset: {
                dimensions: ['name', '采购', '下拨', '捐赠', '消耗', '需求', '库存'],
                source: []
            },
            xAxis: {
                data: [],
                type: 'category',
                axisLine: {
                    lineStyle: {
                        color: '#fff',
                    }
                },
                axisTick: {
                    // show: false
                    alignWithLabel: true
                },
                axisLabel: {
                    interval: 1, //代表显示所有x轴标签显示
                }
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        type: 'solid',
                        color: '#fff',//线的颜色
                        width: '0.5'
                    }
                }
            },
            series: [{
                type: 'bar',
                stack: "one",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#7401DF'
                        }, {
                            offset: 1,
                            color: '#01A9DB'
                        }]),
                    }
                },
                barGap: '5%'
                // data: []
            }, {
                type: 'bar',
                stack: "one",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#fff'
                        }, {
                            offset: 1,
                            color: '#01A9DB'
                        }]),
                    }
                }
                // data: []
            }, {
                type: 'bar',
                stack: "one",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#D7DF01'
                        }, {
                            offset: 1,
                            color: '#01A9DB'
                        }]),
                    }
                }
                // data: []
            }, {
                type: 'bar',
                stack: "two",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FF4000'
                        }, {
                            offset: 1,
                            color: '#01A9DB'
                        }]),
                    }
                }
                // data: []
            }, {
                type: 'bar',
                stack: "two",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#7401DF'
                        }, {
                            offset: 1,
                            color: '#fff'
                        }]),
                    }
                }
                // data: []
            }, {
                type: 'bar',
                stack: "two",
                itemStyle: {
                    normal: {
                        color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [{
                            offset: 0,
                            color: '#FF0080'
                        }, {
                            offset: 1,
                            color: '#01A9DB'
                        }]),
                    }
                }
                // data: []
            }]
        });
        var xdata = [];//x轴
        setInterval(function () {
            $.getJSON("http://localhost:8080/covid/getCovidWz", function (data) {
                var arr = data.data;
                xdata = [];
                for (var i = 0; i < arr.length; i++) {
                    xdata.push(arr[i].name)
                }
                myChart.setOption({
                    dataset: {
                        source: data.data.temp_avg
                    },
                    xAxis: {
                        data: xdata
                    }
                })
            })
        }, 2000)



    }

    function echarts_2() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart2'));

        option = {
            //  backgroundColor: '#00265f',
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
                // axisPointer: { type: 'shadow' }
            },
            legend: {
                type: 'scroll',
                orient: 'vertical',
                right: -5,
                // top: 10,
                // bottom: 10,
                textStyle: {
                    color: '#fff'
                },

            },
            series: [
                {
                    name: '境外输入',
                    type: 'pie',
                    emphasis: {
                        itemStyle: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    },
                    data: [          // 数据数组，name 为数据项名称，value 为数据项值
                        {value: 235, name: '北京'},
                        {value: 274, name: '上海'},
                        {value: 310, name: '湖北'},
                        {value: 335, name: '湖南'},
                        {value: 400, name: '武汉'},
                        {value: 100, name: '重庆'},
                        {value: 274, name: '广东'},
                        {value: 310, name: '四川'},
                        {value: 335, name: '贵州'},
                        {value: 400, name: '云南'}
                    ],
                    color: ['#fff', '#00FF40', '#C8FE2E', '#01A9DB', '#2E2EFE', '#FA5858', '#FF0080', '#AC58FA', '#00FFFF', '#FF0040']
                }
            ]
        };

        // 使用刚指定的配置项和数据显示图表。
        myChart.setOption(option);

        $.getJSON('http://localhost:8080/covid/getCovidImportData', function (data) {
            myChart.setOption({
                series: [{
                    data: data.data
                }]
            })
        })
    }

    function echarts_4() {
        // 基于准备好的dom，初始化echarts实例
        var myLineChart = echarts.init(document.getElementById("echart4"));
        myLineChart.setOption({
            tooltip: {
                trigger: 'axis'
            },
            legend: {
                data: ['新增确诊', '累计确诊', '疑似病例', '累计治愈', '累计死亡'],
                textStyle: {
                    color: '#fff'
                }
            },
            dataset: {
                // 这里指定了维度名的顺序，从而可以利用默认的维度到坐标轴的映射。
                dimensions: ['dateId', '新增确诊', '累计确诊', '疑似病例', '累计治愈', '累计死亡'],
                source: []
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                boundaryGap: false,
                data: [],
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                },
            },
            yAxis: {
                type: 'value',
                axisLine: {
                    lineStyle: {
                        color: '#fff'
                    }
                }
            },
            series: [
                {type: 'line'},
                {type: 'line'},
                {type: 'line'},
                {type: 'line'},
                {type: 'line'}
            ]
        });

        var xdata2 = [];//x轴
        $.getJSON('http://localhost:8080/covid/getCovidTimeData', function (data) {
            var arr = data.data;
            for (var i = 0; i < arr.length; i++) {
                xdata2.push(arr[i].dateId)
            }
            myLineChart.setOption({
                dataset: {
                    source: data.data
                },
                xAxis: {
                    data: xdata2
                }
            })
        })
    }

    function echarts_5() {
        // 基于准备好的dom，初始化echarts实例
        var myChart = echarts.init(document.getElementById('echart5'));
        var option;

        option = {
            tooltip: {
                trigger: 'item',
                formatter: '{a} <br/>{b} : {c} ({d}%)'
                // axisPointer: { type: 'shadow' }
            },
            legend: {
                top: 'top',
                type: 'scroll',
                orient: 'vertical',
                right: -5,
                // top: 10,
                // bottom: 10,
                textStyle: {
                    color: '#fff'
                },
            },
            series: [
                {
                    name: '累计确诊',
                    type: 'pie',
                    radius: [50, 120],
                    center: ['50%', '54%'],
                    roseType: 'area',
                    itemStyle: {
                        borderRadius: 10
                    },
                    data: [
                        {value: 40, name: 'rose 1'},
                        {value: 38, name: 'rose 2'},
                        {value: 32, name: 'rose 3'},
                        {value: 30, name: 'rose 4'},
                        {value: 28, name: 'rose 5'},
                        {value: 26, name: 'rose 6'},
                        {value: 22, name: 'rose 7'},
                        {value: 18, name: 'rose 8'},
                        {value: 24, name: 'rose 9'},
                        {value: 15, name: 'rose 10'}
                    ],
                    color: ['#fff', '#00FF40', '#C8FE2E', '#01A9DB', '#2E2EFE', '#FA5858', '#FF0080', '#AC58FA', '#00FFFF', '#FF0040']
                }
            ]
        };
        $.getJSON('http://localhost:8080/covid/getCovidTOPN', function (data) {
            myChart.setOption({
                series: [{
                    data: data.data
                }]
            })
        });
        option && myChart.setOption(option);

    }

});


















