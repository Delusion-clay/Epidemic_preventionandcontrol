package com.it.spider.datasource.crawler;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.it.spider.datasource.bean.CovidBean;
import com.it.spider.datasource.util.HttpUtils;
import com.it.spider.datasource.util.TimeUtils;
import org.jsoup.Jsoup;
import org.jsoup.nodes.Document;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.kafka.core.KafkaTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Component;

import java.util.List;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

/**
 * @description:
 * @author: Delusion
 * @date: 2021-04-24 21:44
 */
@Component
public class DataCrawler {

    @Autowired
    private KafkaTemplate kafkaTemplate;

//    @Scheduled(initialDelay = 1000,fixedDelay = 1000*60*60*24)
    //@Scheduled(cron="* * * * * ?")//每隔1s执行
    //@Scheduled(cron="0 0 8 * * ?")//每天的8点定时执行
    //@Scheduled(cron="0/5 * * * * ?")//每隔5s执行
    public void Crawling() throws Exception {
        System.out.println("执行开始");
        String datetime = TimeUtils.format(System.currentTimeMillis(), "yyyy-MM-dd");
        //爬取指定页面
        String html = HttpUtils.getHtml("https://ncov.dxy.cn/ncovh5/view/pneumonia");
        //System.out.println(html);
        //解析页面中的指定内容-即id为getAreaStat的标签中的全国疫情数据
        Document doc = Jsoup.parse(html);
        String text = doc.select("script[id=getAreaStat]").toString();
        //System.out.println(text);
        //使用正则表达式获取json格式的疫情数据
        String pattern = "\\[(.*)\\]";
        Pattern reg = Pattern.compile(pattern);
        Matcher matcher = reg.matcher(text);
        String jsonStr = "";
        if(matcher.find()){
            jsonStr = matcher.group(0);
            //System.out.println(jsonStr);
        }
        //对json数据进行更近一步的解析
        //将第一层json(省份数据)解析为JavaBean
        List<CovidBean> pCovidBeans = JSON.parseArray(jsonStr, CovidBean.class);
        for (CovidBean pBean : pCovidBeans) {//pBean为省份
            //System.out.println(pBean);
            //先设置时间字段
            pBean.setDatetime(datetime);
            //获取cities
            String citysStr = pBean.getCities();
            //将第二层json(城市数据)解析为JavaBean
            List<CovidBean> covidBeans = JSON.parseArray(citysStr, CovidBean.class);
            for (CovidBean bean : covidBeans) {//bean为城市
                //System.out.println(bean);
                bean.setDatetime(datetime);
                bean.setPid(pBean.getLocationId());//把省份的id作为城市的pid
                bean.setProvinceShortName(pBean.getProvinceShortName());
                //System.out.println(bean);
                //后续需要将城市疫情数据发送给Kafka
                //将JavaBean转为jsonStr再发送给Kafka
                String beanStr = JSON.toJSONString(bean);
                System.out.println(beanStr);
                kafkaTemplate.send("epidemic", bean.getPid(), beanStr);
            }
            //获取第一层json(省份数据)中的每一天的统计数据
            String statisticsDataUrl = pBean.getStatisticsData();
            String statisticsDataStr = HttpUtils.getHtml(statisticsDataUrl);
            //获取statisticsDataStr中的data字段对应的数据
            JSONObject jsonObject = JSON.parseObject(statisticsDataStr);
            String dataStr = jsonObject.getString("data");
            //System.out.println(dataStr);
            //将爬取解析出来的每一天的数据设置回省份pBean中的StatisticsData字段中
            pBean.setStatisticsData(dataStr);
            pBean.setCities(null);
            //System.out.println(pBean);
            //将省份疫情数据发送给Kafka
            String pBeanStr = JSON.toJSONString(pBean);
            System.out.println(pBeanStr);
            kafkaTemplate.send("epidemic",pBean.getLocationId(),pBeanStr);
        }
        //Thread.sleep(10000000);
    }
}
