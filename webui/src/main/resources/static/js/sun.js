var myChart = echarts.init(document.getElementById('sun'));
var option;

var colors = ['#79c7f1', '#e89863', '#de62ce', '#2EFEF7', '#2EFE9A'];
var bgColor = '#fff';

var itemStyle = {
    star5: {
        color: colors[0]
    },
    star4: {
        color: colors[1]
    },
    star3: {
        color: colors[2]
    },
    star2: {
        color: colors[3]
    }
};

var data = [{
    name: '积极',
    itemStyle: {
        color: colors[1]
    },
    children: [{
        name: '非常肯定',
        children: [{
            name: '5☆',
            children: [{
                name: '中国政府紧急援助老挝抗击新冠肺炎物资'
            }, {
                name: '西藏再部署：坚决把疫情阻击在国门之外'
            }, {
                name: '内蒙古：助力新冠疫苗接种 红十字会志愿者在行动'
            }]
        }, {
            name: '4☆',
            children: [{
                name: '福建新冠疫苗研发应急攻关项目顺利通过验收'
            }, {
                name: '广西各高校陆续开展大规模疫苗接种工作'
            }, {
                name: '云南省抗议美术、摄影作品全身巡展昆明站开展'
            }]
        }, {
            name: '3☆',
            children: [{
                name: '世卫组织肯定中国疫情防控成果'
            }]
        }]
    }, {
        name: '肯定',
        children: [{
            name: '5☆',
            children: [{
                name: '中国援助孟加拉国的新冠疫苗抵达达卡'
            }]
        }, {
            name: '4☆',
            children: [{
                name: '广东疾控回应1支新冠疫苗打2人'
            }, {
                name: '天津明星药企正研发吸入式新冠疫苗'
            }]
        }, {
            name: '3☆',
            children: [{
                name: '安徽合肥笔架山街道多举措推进新冠疫苗接种工作'
            }]
        }]
    }]
}, {
    name: '消极',
    itemStyle: {
        color: colors[2]
    },
    children: [{
        name: '非常不好',
        children: [{
            name: '5☆',
            children: [{
                name: '福建新增确诊病例2例、无症状感染者1例'
            }]
        }, {
            name: '4☆',
            children: [{
                name: ''
            }, {
                name: '内蒙古现有境外输入确诊病例3例'
            }]
        }, {
            name: '3☆',
            children: [{
                name: '江苏新增境外输入确诊病例1例'
            }]
        }]
    }, {
        name: '否定',
        children: [{
            name: '5☆',
            children: [{
                name: '四川5月11日新冠肺炎新增“1+1”'
            }]
        }, {
            name: '4☆',
            children: [{
                name: '中国台湾地区疫情警戒或将升级至3级'
            }, {
                name: '台湾疫情升温台积电急挫后反弹'
            }]
        }]
    }, {
        name: '中立',
        children: [{
            name: '5☆',
            children: [{
                name: '云南瑞丽：5月11日20日起，持7天核酸检测阴性证明可离瑞'
            }]
        }, {
            name: '4☆',
            children: [{
                name: '湖南已有460多万人次接种过新冠疫苗'
            }, {
                name: '2021年5月10日湖北省新冠疫情情况 & 停电公告'
            }]
        }, {
            name: '3☆'
        }, {
            name: '2☆',
            children: [{
                name: '中国国药授权阿联酋在本地灌装的新冠疫苗开始分发'
            }]
        }]
    }, {
        name: '不明白',
        children: [{
            name: '4☆',
            children: [{
                name: '美媒刊文炒作塞舌尔疫情质疑中国疫苗'
            }]
        }]
    }]
}];

for (var j = 0; j < data.length; ++j) {
    var level1 = data[j].children;
    for (var i = 0; i < level1.length; ++i) {
        var block = level1[i].children;
        var Score = [];
        var ScoreId;
        for (var star = 0; star < block.length; ++star) {
            var style = (function (name) {
                switch (name) {
                    case '5☆':
                        ScoreId = 0;
                        return itemStyle.star5;
                    case '4☆':
                        ScoreId = 1;
                        return itemStyle.star4;
                    case '3☆':
                        ScoreId = 2;
                        return itemStyle.star3;
                    case '2☆':
                        ScoreId = 3;
                        return itemStyle.star2;
                }
            })(block[star].name);

            block[star].label = {
                color: style.color,
                downplay: {
                    opacity: 0.5
                }
            };

            if (block[star].children) {
                style = {
                    opacity: 1,
                    color: style.color
                };
                block[star].children.forEach(function (data) {
                    data.value = 1;
                    data.itemStyle = style;

                    data.label = {
                        color: style.color
                    };

                    var value = 1;
                    if (ScoreId === 0 || ScoreId === 3) {
                        value = 5;
                    }

                    if (Score[ScoreId]) {
                        Score[ScoreId].value += value;
                    } else {
                        Score[ScoreId] = {
                            color: colors[ScoreId],
                            value: value
                        };
                    }
                });
            }
        }

        level1[i].itemStyle = {
            color: data[j].itemStyle.color
        };
    }
}

option = {
    // backgroundColor: bgColor,
    color: colors,
    series: [{
        type: 'sunburst',
        center: ['25%', '40%'],
        data: data,
        sort: function (a, b) {
            if (a.depth === 1) {
                return b.getValue() - a.getValue();
            } else {
                return a.dataIndex - b.dataIndex;
            }
        },
        label: {
            rotate: 'radial',
            color: bgColor
        },
        itemStyle: {
            borderColor: bgColor,
            borderWidth: 2
        },
        levels: [{}, {
            r0: 0,
            r: 40,
            label: {
                rotate: 0
            }
        }, {
            r0: 40,
            r: 105
        }, {
            r0: 115,
            r: 140,
            itemStyle: {
                shadowBlur: 2,
                shadowColor: colors[2],
                color: 'transparent'
            },
            label: {
                rotate: 'tangential',
                fontSize: 10,
                color: colors[0]
            }
        }, {
            r0: 140,
            r: 145,
            itemStyle: {
                shadowBlur: 80,
                shadowColor: colors[0]
            },
            label: {
                position: 'outside',
                textShadowBlur: 5,
                textShadowColor: '#333'
            },
            downplay: {
                label: {
                    opacity: 0.5
                }
            }
        }]
    }]
};

option && myChart.setOption(option);

