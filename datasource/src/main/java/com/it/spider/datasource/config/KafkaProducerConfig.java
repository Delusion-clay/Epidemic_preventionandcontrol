package com.it.spider.datasource.config;

import org.apache.kafka.clients.producer.ProducerConfig;
import org.apache.kafka.common.serialization.IntegerSerializer;
import org.apache.kafka.common.serialization.StringSerializer;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.kafka.core.DefaultKafkaProducerFactory;
import org.springframework.kafka.core.KafkaTemplate;

import java.util.HashMap;
import java.util.Map;

/**
 * Desc KafkaTemplate配置类
 */

@Configuration
public class KafkaProducerConfig {
    @Value("${spring.kafka.bootstrap-servers}")
    private String bootstrap_servers;
    @Value("${spring.kafka.producer.retries}")
    private String retries_config;
    @Value("${spring.kafka.producer.batch-size}")
    private String batch_size_config;
    @Value("${kafka.linger_ms_config}")
    private String linger_ms_config;
    @Value("${spring.kafka.producer.buffer-memory}")
    private String buffer_memory_config;

    @Bean
    public KafkaTemplate  getKafkaTemplate(){
        Map<String,Object> configs = new HashMap<>();
        configs.put(ProducerConfig.BOOTSTRAP_SERVERS_CONFIG,bootstrap_servers);
        configs.put(ProducerConfig.RETRIES_CONFIG,retries_config);
        configs.put(ProducerConfig.BATCH_SIZE_CONFIG,batch_size_config);
        configs.put(ProducerConfig.LINGER_MS_CONFIG,linger_ms_config);
        configs.put(ProducerConfig.BUFFER_MEMORY_CONFIG,buffer_memory_config);
        //设置发送到Kafka中的消息的Key/Value序列化类型,指定为<locationId:Integer,Value:String>
        configs.put(ProducerConfig.KEY_SERIALIZER_CLASS_CONFIG, IntegerSerializer.class);
        configs.put(ProducerConfig.VALUE_SERIALIZER_CLASS_CONFIG, StringSerializer.class);
        //指定自定义分区器
        configs.put(ProducerConfig.PARTITIONER_CLASS_CONFIG, CustomerPartitioner.class);
        DefaultKafkaProducerFactory producerFactory = new DefaultKafkaProducerFactory(configs);
        return new KafkaTemplate(producerFactory);
    }

}
