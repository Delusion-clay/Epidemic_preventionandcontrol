showpieLinex();

function showpieLinex() {
    var myChartLine = echarts.init(document.getElementById('pright'));
    let minAngle = 30;// 最小扇形区域为30
    for ( let i = 0; i < obj.data.length; i++ ) { //某项数据为0时，最小扇形区域为0
        if ( obj.data[ i ].value === 0 ) {
            minAngle = 0;
            break;
        }
    }
    const pieValue = obj.data.map( v => {
        return v.value;
    } )
    const sum = pieValue.reduce( ( prev, cur ) => {//数据值的总和
        return prev + cur;
    }, 0 );

    const sum2 = pieValue.reduce( ( prev, cur ) => {
        if ( cur < sum / 12 && cur > 0 ) {//某个值大于0小于总和的1/12即30时，按30计算和
            return prev + sum / 12;
        }
        return prev + cur;
    }, 0 );
    let initPieValue = pieValue[ 0 ];// 初始值
    if ( initPieValue < sum / 12 && initPieValue > 0 ) {
        initPieValue = sum / 12;
    }
    const option = {
        tooltip: {
            show: false,
            trigger: 'item',
            formatter: '{a} <br/>{b}: {c} ({d}%)'
        },
        legend: {
            show: false,
            orient: 'vertical',
            x: 'left'
        },
        color: [ '#44bbf8', '#93e588', '#ffd87b', '#f88071' ],
        series: [
            {
                name: '',
                type: 'pie',
                radius: [ '45%', '79%' ],
                clockWise: false,
                startAngle: 167 - ( initPieValue / sum2 * 360 / 2 ),
                minAngle: minAngle,
                avoidLabelOverlap: false,
                itemStyle: {
                    emphasis: {
                        radius: [ '46%', '100%' ]
                    }
                },
                label: {
                    normal: {
                        show: false,
                        position: 'center'
                    },
                    emphasis: {
                        show: false,
                        textStyle: {
                            fontSize: '30',
                            fontWeight: 'bold'
                        }
                    }
                },
                labelLine: {
                    normal: {
                        show: false
                    }
                },
                data: obj.data
            }
        ]
    };
    myChart.setOption( option );
    if ( minAngle === 30 ) {  //最小扇形区域30时
        myChart.dispatchAction( { type: 'highlight', seriesIndex: 0, dataIndex: 0 } );
    }

    let preDataIndex = 0;
    myChart.on( 'click', ( v ) => {
        if ( v.dataIndex === preDataIndex ) {
            myChart.dispatchAction( {
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: v.dataIndex
            } );
            return;
        }
        const sum1 = pieValue.reduce( ( prev, cur, index ) => {
            if ( index < v.dataIndex ) {
                if ( cur < sum / 12 && cur > 0 ) {
                    return prev + sum / 12; // 饼图的扇形最小角度设置为30，占圆的1/12
                }
                return prev + cur;
            }
            return prev;
        }, 0 );
        let curPieValue = pieValue[ v.dataIndex ];
        if ( curPieValue < sum / 12 && curPieValue > 0 ) {
            curPieValue = sum / 12;
        }
        option.series[ 0 ].startAngle = 167 - ( sum1 / sum2 * 360 + curPieValue / sum2 * 360 / 2 );// 开始渲染图形的角度
        myChart.setOption( option );
        preDataIndex = v.dataIndex;
        window.setTimeout( () => {
            myChart.dispatchAction( {
                type: 'highlight',
                seriesIndex: 0,
                dataIndex: v.dataIndex
            } );
        }, 400 );

        this.mrkName = v.data.name;
        this.mrkValue = v.data.value;
    } );
    // var tips = 0;
    // var m = 0;
    //
    // function loading() {
    //     return [
    //         {
    //             value: tips,
    //             itemStyle: {
    //                 normal: {
    //                     color: 'rgba(0,0,0,0)',
    //                 }
    //             }
    //         },
    //         {
    //             value: m,
    //             itemStyle: {
    //                 normal: {
    //                     borderWidth: 5,
    //                     borderColor: {
    //                         type: 'linear',
    //                         x: 0,
    //                         y: 0,
    //                         // x2: 0,
    //                         // y2: 4,
    //                         colorStops: [{
    //                             offset: 0,
    //                             color: 'rgba(255,255,255,0.7)' // 0% 处的颜色
    //                         }, {
    //                             offset: 0.25,
    //                             color: 'rgba(255,25,25,1)' // 0% 处的颜色
    //                         }, {
    //                             offset: 0.5,
    //                             color: 'rgba(255,25,255,1)' // 0% 处的颜色
    //                         }, {
    //                             offset: 0.75,
    //                             color: 'rgba(25,255,255,1)' // 0% 处的颜色
    //                         }, {
    //                             offset: 1,
    //                             color: 'rgba(55,55,255,1)' // 100% 处的颜色
    //                         }],
    //                         globalCoord: false,
    //                     },
    //                     color: 'rgba(255,255,255,0)',
    //                     shadowBlur: 30,
    //                     shadowColor: 'rgba(255,255,255,1)'
    //                 }
    //             }
    //         }, {
    //             value: 100 - tips,
    //             itemStyle: {
    //                 normal: {
    //                     color: 'rgba(0,0,0,0)',
    //                 }
    //             }
    //         }];
    // }
    //
    // setInterval(function () {
    //     if (tips == 100) {
    //         tips = 0;
    //         m = 0;
    //     } else if (tips <= 10) {
    //         ++tips;
    //         ++m
    //     } else if (tips >= 90) {
    //         ++tips;
    //         --m
    //     } else {
    //         ++tips;
    //     }
    //
    //     myChartLine.setOption(
    //         {
    //             animation: false,
    //             animationThreshold: 100,
    //             animationDurationUpdate: function (idx) {
    //                 // 越往后的数据延迟越大
    //                 return idx * 1000;
    //             },
    //             series: [{
    //                 name: 'loading',
    //                 type: 'pie',
    //                 // minAngle: 15,//最小角度
    //                 // startAngleo0:270, //起始角度
    //                 radius: ['80px', '75px'],
    //                 center: ['50%', '50%'],
    //                 hoverAnimation: false,
    //                 label: {
    //                     normal: {
    //                         show: false,
    //                     }
    //                 },
    //                 data: loading()
    //             }]
    //         })
    // }, 50);

}