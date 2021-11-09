package com.it.spider.controller;

import com.it.spider.bean.Result;
import com.it.spider.mapper.CovidMapper;
import org.apache.commons.lang3.time.FastDateFormat;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Map;

/**
 * @description: 返回前端数据
 * @author: Delusion
 * @date: 2021-04-29 14:22
 */
//http://localhost:8080/covid/getCovidTimeData
@RestController
@RequestMapping("covid")
public class DataController {
    @Autowired
    private CovidMapper covidMapper;

    /**
     * 接收前端请求返回全国疫情汇总数据
     */
    @RequestMapping("getNationalData")
    public Result getNationalData(){
        String datetime = FastDateFormat.getInstance("yyyy-MM-dd").format(System.currentTimeMillis());
        Map<String, Object> data = covidMapper.getNationalData(datetime).get(0);
        System.out.println(data);
        Result result = Result.success(data);
        return result;
    }

    //getNationalMapData
    /**
     * 查询全国各省份累计确诊数据并返回
     */
    @RequestMapping("getNationalMapData")
    public Result getNationalMapData(){
        String datetime = FastDateFormat.getInstance("yyyy-MM-dd").format(System.currentTimeMillis());
        List<Map<String, Object>> data =  covidMapper.getNationalMapData(datetime);
        System.out.println(data);
        return Result.success(data);
    }
//    @RequestMapping("getNationalMapData")
//    public List<Map<String, Object>> getNationalMapData(){
//        String datetime = FastDateFormat.getInstance("yyyy-MM-dd").format(System.currentTimeMillis());
//        List<Map<String, Object>> data =  covidMapper.getNationalMapData(datetime);
//        System.out.println(data);
//        return data;
//    }


    //getCovidTimeData
    /**
     * 查询全国每一天的疫情数据并返回
     */
    @RequestMapping("getCovidTimeData")
    public Result getCovidTimeData(){
        List<Map<String, Object>> data =  covidMapper.getCovidTimeData();
        return Result.success(data);
    }


    //getCovidImportData
    /**
     * 查询各省份境外输入病例数量
     */
    @RequestMapping("getCovidImportData")
    public Result getCovidImportData(){
        String datetime = FastDateFormat.getInstance("yyyy-MM-dd").format(System.currentTimeMillis());
        List<Map<String, Object>> data = covidMapper.getCovidImportData(datetime);
        return  Result.success(data);
    }

    //getCovidWz
    /**
     * 查询各物资使用情况
     */
    @RequestMapping("getCovidWz")
    public Result getCovidWz(){
        List<Map<String, Object>> data = covidMapper.getCovidWz();
        return Result.success(data);
    }
    /**
     * 查询各物资使用情况
     */
    @RequestMapping("getCovidTOPN")
    public Result getCovidTOPN(){
        String datetime = FastDateFormat.getInstance("yyyy-MM-dd").format(System.currentTimeMillis());
        List<Map<String, Object>> data = covidMapper.getCovidTOPN(datetime);
        return Result.success(data);
    }
}
