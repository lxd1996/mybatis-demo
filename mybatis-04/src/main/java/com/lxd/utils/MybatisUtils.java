package com.lxd.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.IOException;
import java.io.InputStream;

/**
 * @ClassName MybatisUtils
 * @Description TODO
 * @Author lxd
 * @Date 2021/4/4 11:08
 * @Version 1.0
 **/
public class MybatisUtils {

    public static SqlSession getSqlsession() throws IOException {
        //FileInputStream is = new FileInputStream(new File("E:/mybatisSecond/mybatis-01/src/main/resources/mybatis-config.xml"));
        String mybatisxml = "mybatis-config.xml";
        InputStream is = Resources.getResourceAsStream(mybatisxml);
        SqlSessionFactoryBuilder sqlSessionFactoryBuilder = new SqlSessionFactoryBuilder();
        //autoCommit 自动提交
        return sqlSessionFactoryBuilder.build(is).openSession(true);
    }
}
