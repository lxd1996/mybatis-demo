package com.lxd.utils;

import com.alibaba.druid.pool.DruidDataSource;
import org.apache.ibatis.datasource.pooled.PooledDataSourceFactory;
import org.apache.ibatis.datasource.unpooled.UnpooledDataSourceFactory;

/**
 * @author: xd.liu
 * @date: 2023/12/6
 */
public class DruidDataSrc extends UnpooledDataSourceFactory {
    public DruidDataSrc(){
        this.dataSource = new DruidDataSource();
    }
}
