package com.lxd.utils;

import org.apache.ibatis.io.Resources;
import org.apache.ibatis.session.SqlSession;
import org.apache.ibatis.session.SqlSessionFactory;
import org.apache.ibatis.session.SqlSessionFactoryBuilder;

import java.io.*;

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
        return sqlSessionFactoryBuilder.build(is).openSession();
    }
}
