//package com.it.spider.datasource.crawler;
//
//import com.it.spider.datasource.util.HttpUtils;
//import com.it.spider.datasource.util.TimeUtils;
//import org.jsoup.Jsoup;
//import org.jsoup.nodes.Document;
//import org.jsoup.select.Elements;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.kafka.core.KafkaTemplate;
//import org.springframework.scheduling.annotation.Scheduled;
//import org.springframework.stereotype.Component;
//
//import java.util.List;
//import java.util.regex.Matcher;
//import java.util.regex.Pattern;
//
///**
// * @description:
// * @author: Delusion
// * @date: 2021-05-11 9:30
// */
////@Component
//public class NewsGenerator {
////    @Autowired
////    private KafkaTemplate kafkaTemplate;
//
////    @Scheduled(initialDelay = 1000,fixedDelay = 1000*60*60*24)
//    //@Scheduled(cron="* * * * * ?")//每隔1s执行
//    //@Scheduled(cron="0 0 8 * * ?")//每天的8点定时执行
//    //@Scheduled(cron="0/5 * * * * ?")//每隔5s执行
//    public static void Crawling() throws Exception {
//        String datetime = TimeUtils.format(System.currentTimeMillis(), "yyyy-MM-dd");
//        //爬取指定页面
//        String html = HttpUtils.getHtml("https://voice.baidu.com/act/newpneumonia/newpneumonia/?from=osari_pc_3#tab1");
//        System.out.println(html);
//        Document doc = Jsoup.parse(html);
//        String string = doc.getElementsByClass("Virus_1-1-301_2CVyXP").toString();
//        System.out.println(doc.select(".main .Virus_1-1-301_2CVyXP"));
//        System.out.println(string);
//        elements.forEach(x -> {
//            System.out.println(x.toString());
//        });
//    }
//
//    public static void main(String[] args) throws Exception {
//        Crawling();
//    }
//}
