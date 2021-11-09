package com.it.spider.util

import java.sql.{Connection, DriverManager, PreparedStatement}

import org.apache.spark.sql.{ForeachWriter, Row}

abstract class BaseJdbcSink(sql: String) extends ForeachWriter[Row] {
  def realProcess(str: String, row: Row)

  var conn: Connection = _
  var ps: PreparedStatement = _

  //开启连接
  override def open(partitionId: Long, version: Long): Boolean = {
    conn = DriverManager.getConnection("jdbc:mysql://hadoop-101:3306/bigdata?useSSL=false&characterEncoding=UTF-8", "root", "_Qq3pw34w9bqa")
    true
  }

  //处理数据--将数据存入到MySQL
  override def process(value: Row): Unit = {
      realProcess(sql,value)
  }

  //关闭连接
  override def close(errorOrNull: Throwable): Unit = {
    if (conn != null) {
      conn.close()
    }
    if (ps != null) {
      ps.close()
    }
  }
}
