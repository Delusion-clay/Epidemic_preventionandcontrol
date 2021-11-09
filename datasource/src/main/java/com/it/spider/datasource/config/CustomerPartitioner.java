package com.it.spider.datasource.config;

import org.apache.kafka.clients.producer.Partitioner;
import org.apache.kafka.common.Cluster;

import java.util.Map;

/**
 * Desc 自定义分区器指定分区规则
 */
public class CustomerPartitioner implements Partitioner {
    //根据参数按照指定的规则进行分区,返回分区编号即可
    @Override
    public int partition(String topic, Object key, byte[] keyBytes, Object value, byte[] valueBytes, Cluster cluster) {
        Integer k  = (Integer)key;
        Integer num = cluster.partitionCountForTopic(topic);
        int partiton = k % num;
        return partiton;
    }

    @Override
    public void close() {

    }

    @Override
    public void configure(Map<String, ?> map) {

    }
}
